import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendAppointmentNotifications } from '@/lib/notifications/whatsapp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      tutorName,
      whatsapp,
      patientName,
      birthDate,
      serviceStage,
      startTime,
      endTime,
      notes,
    } = body as {
      tutorName?: string;
      whatsapp?: string;
      patientName?: string;
      birthDate?: string;
      serviceStage?: 'recien_nacido' | 'lactantes' | 'infancia' | 'urgencia';
      startTime?: string;
      endTime?: string;
      notes?: string;
    };

    if (
      !tutorName?.trim() ||
      !whatsapp?.trim() ||
      !patientName?.trim() ||
      !birthDate?.trim() ||
      !serviceStage ||
      !startTime ||
      !endTime
    ) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios para confirmar la cita.' },
        { status: 400 }
      );
    }

    const cleanWhatsapp = whatsapp.replace(/\s+/g, '');
    let appointmentId = `sim-${Date.now()}`;

    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createAdminClient();

      // 1. Verificar disponibilidad en timetree_busy_blocks y appointments
      const [busyExternal, busyInternal] = await Promise.all([
        supabase
          .from('timetree_busy_blocks')
          .select('id')
          .lt('start_time', endTime)
          .gt('end_time', startTime)
          .limit(1),
        supabase
          .from('appointments')
          .select('id')
          .in('status', ['pending', 'confirmed', 'completed'])
          .lt('start_time', endTime)
          .gt('end_time', startTime)
          .limit(1),
      ]);

      if (
        (busyExternal.data && busyExternal.data.length > 0) ||
        (busyInternal.data && busyInternal.data.length > 0)
      ) {
        return NextResponse.json(
          { error: 'Ese horario acaba de ser ocupado. Elige otro disponible.' },
          { status: 409 }
        );
      }

      // 2. Upsert tutor
      const { data: tutorData, error: tutorErr } = await supabase
        .from('tutors')
        .upsert(
          { full_name: tutorName.trim(), whatsapp: cleanWhatsapp },
          { onConflict: 'whatsapp' }
        )
        .select('id')
        .single();

      if (tutorErr || !tutorData) {
        return NextResponse.json(
          { error: 'No se pudo registrar al tutor.' },
          { status: 500 }
        );
      }

      // 3. Crear o vincular paciente
      const { data: existingPatient } = await supabase
        .from('patients')
        .select('id')
        .eq('tutor_id', tutorData.id)
        .ilike('full_name', patientName.trim())
        .maybeSingle();

      let patientId = existingPatient?.id;

      if (!patientId) {
        const { data: newPatient, error: patErr } = await supabase
          .from('patients')
          .insert({
            tutor_id: tutorData.id,
            full_name: patientName.trim(),
            birth_date: birthDate,
          })
          .select('id')
          .single();

        if (patErr || !newPatient) {
          return NextResponse.json(
            { error: 'No se pudo registrar al paciente.' },
            { status: 500 }
          );
        }
        patientId = newPatient.id;
      }

      // 4. Registrar cita
      const { data: appointment, error: appErr } = await supabase
        .from('appointments')
        .insert({
          tutor_id: tutorData.id,
          patient_id: patientId,
          service_stage: serviceStage,
          start_time: startTime,
          end_time: endTime,
          status: 'confirmed',
          notes: notes?.trim() || null,
        })
        .select('id')
        .single();

      if (appErr || !appointment) {
        return NextResponse.json(
          { error: 'No se pudo confirmar la cita en este horario.' },
          { status: 409 }
        );
      }

      appointmentId = appointment.id;

      // 5. Notificaciones WhatsApp
      const notif = await sendAppointmentNotifications({
        tutorName: tutorName.trim(),
        tutorWhatsapp: cleanWhatsapp,
        patientName: patientName.trim(),
        serviceStage,
        startTimeIso: startTime,
      });

      if (notif.parentNotified) {
        await supabase
          .from('appointments')
          .update({ whatsapp_notified: true })
          .eq('id', appointmentId);
      }
    } else {
      await sendAppointmentNotifications({
        tutorName: tutorName.trim(),
        tutorWhatsapp: cleanWhatsapp,
        patientName: patientName.trim(),
        serviceStage,
        startTimeIso: startTime,
      });
    }

    return NextResponse.json({
      ok: true,
      appointmentId,
    });
  } catch {
    return NextResponse.json(
      { error: 'Solicitud inválida.' },
      { status: 400 }
    );
  }
}
