import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';

const SLOT_DURATION_MINUTES = 45;
const CONSULTATION_HOURS = [
  '09:00',
  '09:45',
  '10:30',
  '11:15',
  '12:00',
  '12:45',
  '16:00',
  '16:45',
  '17:30',
  '18:15',
];

function overlaps(
  slotStart: Date,
  slotEnd: Date,
  blockStart: Date,
  blockEnd: Date
) {
  return slotStart < blockEnd && slotEnd > blockStart;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Parámetro date requerido en formato YYYY-MM-DD.' },
      { status: 400 }
    );
  }

  const dayStart = new Date(`${date}T00:00:00-06:00`);
  const dayEnd = new Date(`${date}T23:59:59-06:00`);

  let busyRanges: { start: Date; end: Date }[] = [];

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  ) {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createAdminClient()
      : createSupabaseClient(
          new URL(process.env.NEXT_PUBLIC_SUPABASE_URL.trim()).origin,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim()
        );

    const [timetreeRes, appointmentsRes] = await Promise.all([
      supabase
        .from('timetree_busy_blocks')
        .select('start_time, end_time')
        .lt('start_time', dayEnd.toISOString())
        .gt('end_time', dayStart.toISOString()),
      supabase
        .from('appointments')
        .select('start_time, end_time')
        .in('status', ['pending', 'confirmed', 'completed'])
        .lt('start_time', dayEnd.toISOString())
        .gt('end_time', dayStart.toISOString()),
    ]);

    if (timetreeRes.error) {
      console.error('timetree_busy_blocks error:', timetreeRes.error);
    }
    if (appointmentsRes.error) {
      console.error('appointments error:', appointmentsRes.error);
    }

    const external = (timetreeRes.data || []).map((b) => ({
      start: new Date(b.start_time),
      end: new Date(b.end_time),
    }));
    const internal = (appointmentsRes.data || []).map((a) => ({
      start: new Date(a.start_time),
      end: new Date(a.end_time),
    }));

    busyRanges = [...external, ...internal];
  }

  const slots = CONSULTATION_HOURS.map((timeStr) => {
    const slotStart = new Date(`${date}T${timeStr}:00-06:00`);
    const slotEnd = new Date(
      slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000
    );

    const isBusy = busyRanges.some((range) =>
      overlaps(slotStart, slotEnd, range.start, range.end)
    );

    return {
      label: timeStr,
      startTime: slotStart.toISOString(),
      endTime: slotEnd.toISOString(),
      status: isBusy ? ('busy' as const) : ('available' as const),
    };
  });

  return NextResponse.json({ date, slots });
}
