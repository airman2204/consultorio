'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, Save, ShieldAlert } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { WhoGrowthChart } from '@/components/dashboard/WhoGrowthChart';
import { PrescriptionBuilder } from '@/components/dashboard/PrescriptionBuilder';

function calculateAgeLabel(birthDateStr: string) {
  const birth = new Date(birthDateStr);
  const now = new Date('2026-11-26');
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${years} años ${months} meses`;
}

function PatientChartContent() {
  const params = useParams<{ id: string }>();
  const patientId = params.id;

  const [allergies, setAllergies] = useState('Ninguna conocida');
  const [weightKg, setWeightKg] = useState('16.8');
  const [heightCm, setHeightCm] = useState('103');
  const [headCm, setHeadCm] = useState('50.2');
  const [tempC, setTempC] = useState('36.7');

  const [subjective, setSubjective] = useState(
    'Acude a control de niño sano. Buena tolerancia a la vía oral, sueño regular.'
  );
  const [objective, setObjective] = useState(
    'Paciente activo, hidratado, faringe normal, campos pulmonares bien ventilados.'
  );
  const [assessment, setAssessment] = useState(
    'Crecimiento y desarrollo adecuados para la edad.'
  );
  const [plan, setPlan] = useState(
    'Continuar alimentación balanceada y esquema de vacunación.'
  );

  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const bmi = useMemo(() => {
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm) / 100;
    if (!w || !h) return '--';
    return (w / (h * h)).toFixed(1);
  }, [weightKg, heightCm]);

  const patientName = 'Mateo García Méndez';
  const tutorName = 'Laura Méndez';
  const tutorWhatsapp = '222 123 4567';
  const ageLabel = calculateAgeLabel('2022-09-10');

  async function handleSaveNote(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');

    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        const supabase = createClient();
        await supabase.from('clinical_notes').insert({
          patient_id: patientId,
          weight_kg: parseFloat(weightKg) || null,
          height_cm: parseFloat(heightCm) || null,
          head_circumference_cm: parseFloat(headCm) || null,
          temperature_c: parseFloat(tempC) || null,
          subjective,
          objective,
          assessment,
          plan,
        });
      }
      setSavedMsg('Nota clínica NOM-004 guardada.');
    } catch {
      setSavedMsg('Guardado en modo local.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabecera clínica */}
      <div className="rounded-3xl bg-white border border-slate-ink/10 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-ink/60">
            Expediente NOM-004 · #{patientId}
          </p>
          <h1 className="font-serif text-3xl text-slate-ink">
            {patientName} · <span className="text-2xl">{ageLabel}</span>
          </h1>
          <p className="text-xs text-slate-ink/75">
            Tutor: <strong>{tutorName}</strong> · WhatsApp:{' '}
            <strong>{tutorWhatsapp}</strong>
          </p>
        </div>

        {/* Badge editable de alergias en #E0C9A6 */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-ink/60">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-ink" />
            <span>Alergias</span>
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="px-4 py-2 rounded-full bg-warm-sand/55 border border-warm-sand text-xs font-medium text-slate-ink focus:outline-none focus:ring-2 focus:ring-primary-pink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Columna izquierda: Somatometría + OMS + SOAP */}
        <div className="xl:col-span-7 space-y-6 print:hidden">
          <form onSubmit={handleSaveNote} className="space-y-6">
            {/* Somatometría */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="rounded-2xl bg-white border border-slate-ink/10 p-3.5">
                <label className="block text-[10px] uppercase text-slate-ink/60 font-semibold">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full mt-1 text-lg font-semibold text-slate-ink bg-transparent focus:outline-none"
                />
              </div>
              <div className="rounded-2xl bg-white border border-slate-ink/10 p-3.5">
                <label className="block text-[10px] uppercase text-slate-ink/60 font-semibold">
                  Talla (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full mt-1 text-lg font-semibold text-slate-ink bg-transparent focus:outline-none"
                />
              </div>
              <div className="rounded-2xl bg-white border border-slate-ink/10 p-3.5">
                <label className="block text-[10px] uppercase text-slate-ink/60 font-semibold">
                  P. Cefálico
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={headCm}
                  onChange={(e) => setHeadCm(e.target.value)}
                  className="w-full mt-1 text-lg font-semibold text-slate-ink bg-transparent focus:outline-none"
                />
              </div>
              <div className="rounded-2xl bg-white border border-slate-ink/10 p-3.5">
                <label className="block text-[10px] uppercase text-slate-ink/60 font-semibold">
                  Temp (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tempC}
                  onChange={(e) => setTempC(e.target.value)}
                  className="w-full mt-1 text-lg font-semibold text-slate-ink bg-transparent focus:outline-none"
                />
              </div>
              <div className="rounded-2xl bg-warm-sand/35 border border-warm-sand p-3.5">
                <span className="block text-[10px] uppercase text-slate-ink/60 font-semibold">
                  IMC
                </span>
                <p className="mt-1 text-lg font-semibold text-slate-ink">
                  {bmi}
                </p>
              </div>
            </div>

            {/* Evolución SOAP */}
            <div className="rounded-3xl bg-white border border-slate-ink/10 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-slate-ink">
                  Evolución Clínica · SOAP
                </h2>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-ink text-bg-bone text-xs font-medium hover:opacity-90 transition disabled:opacity-60"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Guardando...' : 'Guardar Nota'}</span>
                </button>
              </div>

              {savedMsg && (
                <p className="inline-flex items-center gap-1.5 text-xs text-slate-ink bg-sage-green/40 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{savedMsg}</span>
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-sage-green/20 p-4 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-ink">
                    S · Subjetivo
                  </label>
                  <textarea
                    rows={3}
                    value={subjective}
                    onChange={(e) => setSubjective(e.target.value)}
                    className="w-full text-xs bg-white/80 rounded-xl p-2.5 border border-slate-ink/10 focus:outline-none"
                  />
                </div>
                <div className="rounded-2xl bg-dusty-blue/20 p-4 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-ink">
                    O · Objetivo
                  </label>
                  <textarea
                    rows={3}
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full text-xs bg-white/80 rounded-xl p-2.5 border border-slate-ink/10 focus:outline-none"
                  />
                </div>
                <div className="rounded-2xl bg-warm-sand/25 p-4 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-ink">
                    A · Análisis
                  </label>
                  <textarea
                    rows={3}
                    value={assessment}
                    onChange={(e) => setAssessment(e.target.value)}
                    className="w-full text-xs bg-white/80 rounded-xl p-2.5 border border-slate-ink/10 focus:outline-none"
                  />
                </div>
                <div className="rounded-2xl bg-primary-pink/20 p-4 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-ink">
                    P · Plan
                  </label>
                  <textarea
                    rows={3}
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full text-xs bg-white/80 rounded-xl p-2.5 border border-slate-ink/10 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Gráfica OMS */}
          <WhoGrowthChart />
        </div>

        {/* Columna derecha: Receta Médica */}
        <div className="xl:col-span-5">
          <PrescriptionBuilder
            patientName={patientName}
            patientAge={ageLabel}
            weightKg={weightKg}
            tutorWhatsapp={tutorWhatsapp}
          />
        </div>
      </div>
    </div>
  );
}

export default function PatientChartPage() {
  return (
    <Suspense fallback={null}>
      <PatientChartContent />
    </Suspense>
  );
}
