import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tutorName, whatsapp, babyBirthDate, resourceSlug } = body as {
      tutorName?: string;
      whatsapp?: string;
      babyBirthDate?: string;
      resourceSlug?: string;
    };

    if (!tutorName?.trim() || !whatsapp?.trim() || !babyBirthDate?.trim()) {
      return NextResponse.json(
        { error: 'Por favor completa nombre, WhatsApp y fecha de nacimiento.' },
        { status: 400 }
      );
    }

    const cleanWhatsapp = whatsapp.replace(/\s+/g, '');
    const slug = resourceSlug || 'checklist-pediatrico-0-12m';

    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createAdminClient();

      const { error: leadError } = await supabase.from('lead_magnets').insert({
        tutor_name: tutorName.trim(),
        whatsapp: cleanWhatsapp,
        baby_birth_date: babyBirthDate,
        resource_slug: slug,
      });

      if (leadError) {
        console.error('Error inserting lead_magnets:', leadError);
        return NextResponse.json(
          { error: 'No se pudo registrar la descarga.' },
          { status: 500 }
        );
      }

      const { error: tutorError } = await supabase.from('tutors').upsert(
        {
          full_name: tutorName.trim(),
          whatsapp: cleanWhatsapp,
        },
        { onConflict: 'whatsapp' }
      );

      if (tutorError) {
        console.error('Error upserting tutor:', tutorError);
      }
    }

    return NextResponse.json({
      ok: true,
      downloadUrl: '/guides/checklist-pediatrico.pdf',
    });
  } catch {
    return NextResponse.json(
      { error: 'Solicitud inválida.' },
      { status: 400 }
    );
  }
}
