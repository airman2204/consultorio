import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface TimeTreeEvent {
  id: string;
  title?: string;
  start_at: number;
  end_at: number;
  deactivated_at: number | null;
}

async function syncFromTimeTreeSession(sessionId: string) {
  const headers = {
    Cookie: `_session_id=${sessionId}`,
    'X-Timetreea': 'web/2.1.0/en',
  };

  const calRes = await fetch('https://timetreeapp.com/api/v1/calendars?since=0', {
    headers,
    cache: 'no-store',
  });

  if (!calRes.ok) {
    throw new Error(`TimeTree calendars error: ${calRes.status}`);
  }

  const calData = (await calRes.json()) as {
    calendars?: { id: number; name: string }[];
  };

  const targetCalendarId =
    process.env.TIMETREE_CALENDAR_ID || calData.calendars?.[0]?.id;

  if (!targetCalendarId) {
    return [];
  }

  const evRes = await fetch(
    `https://timetreeapp.com/api/v1/calendar/${targetCalendarId}/events/sync`,
    { headers, cache: 'no-store' }
  );

  if (!evRes.ok) {
    throw new Error(`TimeTree events error: ${evRes.status}`);
  }

  const evData = (await evRes.json()) as { events?: TimeTreeEvent[] };
  const activeEvents = (evData.events || []).filter(
    (ev) => ev.deactivated_at === null && ev.start_at && ev.end_at
  );

  return activeEvents.map((ev) => ({
    external_event_id: ev.id,
    title: ev.title || 'Horario Ocupado - Consultorio Compartido',
    start_time: new Date(ev.start_at).toISOString(),
    end_time: new Date(ev.end_at).toISOString(),
  }));
}

async function handleSync() {
  try {
    const sessionId = process.env.TIMETREE_SESSION_COOKIE;
    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: 'TIMETREE_SESSION_COOKIE no configurada.' },
        { status: 400 }
      );
    }

    const events = await syncFromTimeTreeSession(sessionId);

    if (
      events.length > 0 &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createAdminClient();
      const { error } = await supabase.from('timetree_busy_blocks').upsert(
        events.map((ev) => ({
          ...ev,
          synced_at: new Date().toISOString(),
        })),
        { onConflict: 'external_event_id' }
      );

      if (error) {
        console.error('Error upserting timetree_busy_blocks:', error);
        return NextResponse.json(
          { ok: false, error: 'Error al guardar bloques en Supabase.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      syncedCount: events.length,
    });
  } catch (err) {
    console.error('TimeTree sync error:', err);
    return NextResponse.json(
      { ok: false, error: 'Error al sincronizar con TimeTree.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return handleSync();
}

export async function POST() {
  return handleSync();
}
