interface AppointmentNotificationPayload {
  tutorName: string;
  tutorWhatsapp: string;
  patientName: string;
  serviceStage: string;
  startTimeIso: string;
}

const STAGE_LABELS: Record<string, string> = {
  recien_nacido: 'Recién Nacido',
  lactantes: 'Lactantes (1–12m)',
  infancia: 'Infancia',
  urgencia: 'Urgencia Pediátrica',
};

function formatDateTimeMx(iso: string) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  }).format(new Date(iso));
}

async function sendWhatsAppText(to: string, body: string) {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId) {
    console.info(`[WhatsApp Simulación] Para ${to}:\n${body}\n`);
    return { simulated: true, ok: true };
  }

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${phoneId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to.replace(/\D/g, ''),
        type: 'text',
        text: { body },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error('WhatsApp API error:', errText);
    return { simulated: false, ok: false };
  }

  return { simulated: false, ok: true };
}

/**
 * Envía confirmación al papá/mamá con ubicación exacta y alerta al administrador
 * del consultorio para apartar la hora en TimeTree.
 */
export async function sendAppointmentNotifications(
  payload: AppointmentNotificationPayload
) {
  const formattedDate = formatDateTimeMx(payload.startTimeIso);
  const stageLabel = STAGE_LABELS[payload.serviceStage] || payload.serviceStage;

  const parentMessage = [
    `¡Hola, ${payload.tutorName}! 🌸`,
    `La cita de *${payload.patientName}* con la *Dra. Perla Yareli Núñez García* está confirmada.`,
    ``,
    `📅 *Fecha y hora:* ${formattedDate}`,
    `🩺 *Motivo:* ${stageLabel}`,
    `📍 *Ubicación:* Consultorio 819, Torre I, Hospital MAC, Puebla.`,
    `🗺️ Google Maps: https://maps.google.com/?q=Hospital+MAC+Puebla`,
    ``,
    `Si necesitas reprogramar, escríbenos por este medio.`,
  ].join('\n');

  const adminPhone = process.env.WHATSAPP_ADMIN_PHONE || '2214432870';
  const adminMessage = [
    `🔔 *Nueva cita web - Apartar en TimeTree*`,
    `Paciente: ${payload.patientName}`,
    `Tutor: ${payload.tutorName} (${payload.tutorWhatsapp})`,
    `Fecha y hora: ${formattedDate}`,
    `Motivo: ${stageLabel}`,
    `Por favor bloquea este horario en TimeTree (https://timetr.ee/dl/reco).`,
  ].join('\n');

  const [parentResult, adminResult] = await Promise.all([
    sendWhatsAppText(payload.tutorWhatsapp, parentMessage),
    sendWhatsAppText(adminPhone, adminMessage),
  ]);

  return {
    parentNotified: parentResult.ok,
    adminNotified: adminResult.ok,
  };
}
