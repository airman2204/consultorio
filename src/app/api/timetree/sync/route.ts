import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface ParsedEvent {
  external_event_id: string;
  title: string;
  start_time: string;
  end_time: string;
}

function parseIcsDate(raw: string): string | null {
  const clean = raw.trim();
  const match = clean.match(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/
  );
  if (!match) return null;
  const [, y, m, d, hh, mm, ss, z] = match;
  return `${y}-${m}-${d}T${hh}:${mm}:${ss}${z || '-06:00'}`;
}

function parseIcsEvents(icsText: string): ParsedEvent[] {
  const blocks = icsText.split('BEGIN:VEVENT').slice(1);
  const events: ParsedEvent[] = [];

  for (const block of blocks) {
    const endIdx = block.indexOf('END:VEVENT');
    const content = endIdx >= 0 ? block.slice(0, endIdx) : block;

    const uid = content.match(/UID:(.+)/)?.[1]?.trim();
    const summary =
      content.match(/SUMMARY:(.+)/)?.[1]?.trim() ||
      'Horario Ocupado - Consultorio Compartido';
    const dtStartRaw = content.match(/DTSTART[^:]*:(.+)/)?.[1];
    const dtEndRaw = content.match(/DTEND[^:]*:(.+)/)?.[1];

    if (!dtStartRaw || !dtEndRaw) continue;
    const startIso = parseIcsDate(dtStartRaw);
    const endIso = parseIcsDate(dtEndRaw);
    if (!startIso || !endIso) continue;

    events.push({
      external_event_id: uid || `${startIso}-${endIso}`,
      title: summary,
      start_time: new Date(startIso).toISOString(),
      end_time: new Date(endIso).toISOString(),
    });
  }

  return events;
}

export async function POST() {
  try {
    const feedUrl =
      process.env.TIMETREE_CALENDAR_URL || 'https://timetr.ee/dl/reco';

    const res = await fetch(feedUrl, {
      headers: { Accept: 'text/calendar, text/plain, */*' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: 'No se pudo consultar el calendario TimeTree.' },
        { status: 502 }
      );
    }

    const text = await res.text();
    const events = text.includes('BEGIN:VEVENT') ? parseIcsEvents(text) : [];

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
      { ok: false, error: 'Error interno al sincronizar TimeTree.' },
      { status: 500 }
    );
  }
}
