'use client';

import React from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  MessageCircle,
  Sparkles,
  UserPlus,
} from 'lucide-react';

interface TimelineSlot {
  hour: string;
  type: 'appointment' | 'timetree' | 'available';
  patientId?: string;
  patientName?: string;
  stage?: string;
  isNewWeb?: boolean;
}

const DAILY_SLOTS: TimelineSlot[] = [
  { hour: '09:00 AM', type: 'available' },
  {
    hour: '09:45 AM',
    type: 'timetree',
  },
  {
    hour: '10:30 AM',
    type: 'appointment',
    patientId: 'demo-mateo',
    patientName: 'Mateo García Méndez',
    stage: 'Control de Niño Sano',
    isNewWeb: true,
  },
  {
    hour: '11:15 AM',
    type: 'appointment',
    patientId: 'demo-emilia',
    patientName: 'Emilia López',
    stage: 'Vacunación 4 meses',
    isNewWeb: false,
  },
  { hour: '12:00 PM', type: 'available' },
  { hour: '12:45 PM', type: 'timetree' },
  { hour: '04:00 PM', type: 'available' },
  {
    hour: '04:45 PM',
    type: 'appointment',
    patientId: 'demo-mateo',
    patientName: 'Sofía Hernández',
    stage: 'Lactancia Materna',
    isNewWeb: true,
  },
  { hour: '05:30 PM', type: 'available' },
];

export default function AgendaPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink/60">
            Consultorio 819 · Torre I
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-slate-ink mt-1">
            Agenda del Día &amp; Citas
          </h1>
        </div>
        <Link
          href="/agendar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-ink text-bg-bone text-xs font-medium self-start hover:opacity-90 transition"
        >
          <span>+ Nueva Cita Web</span>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-3xl bg-white border border-slate-ink/10 p-5 flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-2xl bg-sage-green/45 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-5 h-5 text-slate-ink" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-ink">3</p>
            <p className="text-xs text-slate-ink/70">Citas Hoy</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-ink/10 p-5 flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-2xl bg-dusty-blue/40 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-slate-ink" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-ink">4</p>
            <p className="text-xs text-slate-ink/70">Horas Libres Cons. 819</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-ink/10 p-5 flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-2xl bg-primary-pink/45 flex items-center justify-center shrink-0">
            <UserPlus className="w-5 h-5 text-slate-ink" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-ink">2</p>
            <p className="text-xs text-slate-ink/70">Pacientes Nuevos Web</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-ink/10 p-5 flex items-center gap-4 shadow-xs">
          <div className="w-11 h-11 rounded-2xl bg-warm-sand/55 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-slate-ink" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-ink">100%</p>
            <p className="text-xs text-slate-ink/70">Recordatorios WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Línea de tiempo */}
      <div className="rounded-3xl bg-white border border-slate-ink/10 p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl text-slate-ink">
            Horario del Consultorio (9:00 AM – 6:00 PM)
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-ink/75">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-sage-green" />
              Cita confirmada
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-dusty-blue" />
              Bloque TimeTree
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-dashed border-slate-ink/40" />
              Disponible
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {DAILY_SLOTS.map((slot) => (
            <div
              key={slot.hour}
              className="flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <span className="w-24 text-xs font-semibold text-slate-ink/65 shrink-0">
                {slot.hour}
              </span>

              {slot.type === 'appointment' && (
                <div className="flex-1 rounded-2xl bg-sage-green/40 border border-sage-green p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-slate-ink">
                        {slot.patientName}
                      </p>
                      {slot.isNewWeb && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-pink/60 text-[10px] font-semibold text-slate-ink">
                          <Sparkles className="w-3 h-3" /> Nuevo · Web
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-ink/75">{slot.stage}</p>
                  </div>

                  <Link
                    href={`/dashboard/pacientes/${slot.patientId}`}
                    className="px-4 py-2 rounded-full bg-white text-slate-ink text-xs font-medium shadow-xs hover:bg-bg-bone transition self-start sm:self-center"
                  >
                    Abrir Expediente →
                  </Link>
                </div>
              )}

              {slot.type === 'timetree' && (
                <div className="flex-1 rounded-2xl bg-dusty-blue/30 border border-dusty-blue p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-ink">
                      Horario Ocupado · Consultorio Compartido
                    </p>
                    <p className="text-xs text-slate-ink/70">
                      Bloqueo externo sincronizado desde TimeTree
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/75 text-[11px] font-medium text-slate-ink">
                    TimeTree
                  </span>
                </div>
              )}

              {slot.type === 'available' && (
                <div className="flex-1 rounded-2xl border border-dashed border-slate-ink/20 p-3.5 text-xs text-slate-ink/50">
                  Disponible para reserva web o manual
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
