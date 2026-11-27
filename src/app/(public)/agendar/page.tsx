'use client';

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  MessageCircle,
  RefreshCw,
} from 'lucide-react';

interface Slot {
  label: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'busy';
}

type ServiceStage = 'recien_nacido' | 'lactantes' | 'infancia' | 'urgencia';

const STAGE_OPTIONS: { value: ServiceStage; label: string }[] = [
  { value: 'recien_nacido', label: 'Recién Nacido' },
  { value: 'lactantes', label: 'Lactantes (1–12m)' },
  { value: 'infancia', label: 'Infancia' },
  { value: 'urgencia', label: 'Urgencia Pediátrica' },
];

export default function AgendarPage() {
  const [selectedDate, setSelectedDate] = useState('2026-11-27');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [tutorName, setTutorName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [patientName, setPatientName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [serviceStage, setServiceStage] =
    useState<ServiceStage>('recien_nacido');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmedId, setConfirmedId] = useState('');

  useEffect(() => {
    let active = true;
    async function loadAvailability() {
      setLoadingSlots(true);
      setSelectedSlot(null);
      try {
        const res = await fetch(`/api/availability?date=${selectedDate}`);
        const data = await res.json();
        if (active && res.ok) {
          setSlots(data.slots || []);
        }
      } catch {
        if (active) setSlots([]);
      } finally {
        if (active) setLoadingSlots(false);
      }
    }
    loadAvailability();
    return () => {
      active = false;
    };
  }, [selectedDate]);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) {
      setError('Selecciona un horario disponible.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorName,
          whatsapp,
          patientName,
          birthDate,
          serviceStage,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo confirmar la cita.');
      } else {
        setConfirmedId(data.appointmentId);
      }
    } catch {
      setError('Error de conexión al confirmar la cita.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink/60">
            Agenda tu valoración
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-slate-ink mt-1">
            Elige tu horario y recibe confirmación por WhatsApp
          </h1>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-green/40 text-slate-ink text-xs font-medium self-start">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Disponibilidad en tiempo real</span>
        </div>
      </div>

      {confirmedId ? (
        <div className="rounded-3xl bg-white border border-sage-green p-8 md:p-10 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-sage-green mx-auto" />
          <h2 className="font-serif text-3xl text-slate-ink">
            ¡Cita confirmada!
          </h2>
          <p className="text-sm text-slate-ink/80">
            Enviamos los detalles y la ubicación del{' '}
            <strong>Consultorio 819, Torre I, Hospital MAC</strong> a tu
            WhatsApp ({whatsapp}).
          </p>
          <p className="text-xs text-slate-ink/60">
            Folio de referencia: {confirmedId}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendario y horarios */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-ink/10 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-ink/60 mb-1.5">
                  Selecciona el día
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2.5 rounded-full bg-bg-bone border border-slate-ink/15 text-sm text-slate-ink focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-ink/75">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-sage-green" />
                  Disponible
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary-pink" />
                  Seleccionado
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-ink/15" />
                  Ocupado
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-ink/60 mb-3">
                Horarios disponibles (45 min)
              </h2>

              {loadingSlots ? (
                <div className="py-10 flex items-center justify-center text-sm text-slate-ink/65 gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Consultando disponibilidad...</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {slots.map((slot) => {
                    const isSelected =
                      selectedSlot?.startTime === slot.startTime;
                    const isBusy = slot.status === 'busy';

                    return (
                      <button
                        key={slot.startTime}
                        type="button"
                        disabled={isBusy}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 px-4 rounded-2xl text-sm font-medium transition-all ${
                          isBusy
                            ? 'bg-slate-ink/10 text-slate-ink/35 cursor-not-allowed line-through'
                            : isSelected
                              ? 'bg-primary-pink text-slate-ink shadow-sm scale-[1.02]'
                              : 'bg-sage-green/45 text-slate-ink hover:bg-sage-green/70'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Formulario + Vista previa en vivo */}
          <div className="lg:col-span-5 space-y-6">
            <form
              onSubmit={handleConfirm}
              className="rounded-3xl bg-white border border-slate-ink/10 p-6 shadow-xs space-y-4"
            >
              <h2 className="font-serif text-2xl text-slate-ink">Tus datos</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Nombre mamá / papá"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                  className="px-4 py-2.5 rounded-full bg-bg-bone border border-slate-ink/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp (221...)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="px-4 py-2.5 rounded-full bg-bg-bone border border-slate-ink/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
                <input
                  type="text"
                  required
                  placeholder="Nombre del bebé"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="px-4 py-2.5 rounded-full bg-bg-bone border border-slate-ink/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  title="Fecha de nacimiento del bebé"
                  className="px-4 py-2.5 rounded-full bg-bg-bone border border-slate-ink/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <select
                value={serviceStage}
                onChange={(e) =>
                  setServiceStage(e.target.value as ServiceStage)
                }
                className="w-full px-4 py-2.5 rounded-full bg-bg-bone border border-slate-ink/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-pink"
              >
                {STAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <textarea
                rows={2}
                placeholder="Notas opcionales (síntomas, dudas...)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-bg-bone border border-slate-ink/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-pink"
              />

              {error && <p className="text-xs text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={submitting || !selectedSlot}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary-pink text-slate-ink font-medium text-sm shadow-sm hover:brightness-95 transition disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirmando...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirmar por WhatsApp</span>
                  </>
                )}
              </button>
            </form>

            {/* Vista previa en vivo del pase de cita */}
            <div className="rounded-3xl bg-slate-ink text-bg-bone p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs opacity-75">
                <span>Vista previa · Pase de cita</span>
                <span>WhatsApp Automático</span>
              </div>
              <p className="font-serif text-lg">
                {patientName || 'Tu pequeño'} ·{' '}
                {STAGE_OPTIONS.find((s) => s.value === serviceStage)?.label}
              </p>
              <div className="space-y-1.5 text-xs opacity-90">
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary-pink" />
                  <span>{selectedDate}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sage-green" />
                  <span>
                    {selectedSlot
                      ? `${selectedSlot.label} hrs (45 min)`
                      : 'Selecciona un horario'}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-warm-sand" />
                  <span>Consultorio 819, Torre I, Hospital MAC Puebla</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
