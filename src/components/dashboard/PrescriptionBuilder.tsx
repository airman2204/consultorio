'use client';

import React, { useState } from 'react';
import { FileDown, MessageCircle, Plus, Trash2 } from 'lucide-react';
import { MonogramPn } from '@/components/brand/MonogramPn';

interface MedicationItem {
  id: string;
  name: string;
  indication: string;
}

interface PrescriptionBuilderProps {
  patientName: string;
  patientAge: string;
  weightKg: string;
  tutorWhatsapp: string;
}

export function PrescriptionBuilder({
  patientName,
  patientAge,
  weightKg,
  tutorWhatsapp,
}: PrescriptionBuilderProps) {
  const [meds, setMeds] = useState<MedicationItem[]>([
    {
      id: '1',
      name: 'Paracetamol solución oral 100 mg/ml',
      indication: 'Dar 2.5 ml cada 6 horas en caso de fiebre > 38.0 °C.',
    },
  ]);
  const [newMed, setNewMed] = useState('');
  const [newIndication, setNewIndication] = useState('');
  const [careNotes, setCareNotes] = useState(
    'Mantener hidratación constante y vigilar datos de alarma.'
  );

  function addMedication(e: React.FormEvent) {
    e.preventDefault();
    if (!newMed.trim() || !newIndication.trim()) return;
    setMeds((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newMed.trim(),
        indication: newIndication.trim(),
      },
    ]);
    setNewMed('');
    setNewIndication('');
  }

  function removeMedication(id: string) {
    setMeds((prev) => prev.filter((m) => m.id !== id));
  }

  function handlePrintPdf() {
    window.print();
  }

  function buildWhatsAppLink() {
    const cleanPhone = tutorWhatsapp.replace(/\D/g, '');
    const lines = [
      `*Receta Médica - Dra. Perla Yareli Núñez García (Pediatra)*`,
      `Paciente: ${patientName} (${patientAge})`,
      `Peso: ${weightKg || '--'} kg`,
      ``,
      `*Indicaciones:*`,
      ...meds.map((m, i) => `${i + 1}. ${m.name}: ${m.indication}`),
      ``,
      `Cuidados generales: ${careNotes}`,
    ].join('\n');

    return `https://wa.me/52${cleanPhone}?text=${encodeURIComponent(lines)}`;
  }

  return (
    <div id="receta" className="space-y-4">
      {/* Formulario rápido para agregar medicamentos */}
      <form
        onSubmit={addMedication}
        className="rounded-3xl bg-white border border-slate-ink/10 p-5 shadow-xs space-y-3 print:hidden"
      >
        <h3 className="font-serif text-lg text-slate-ink">
          Agregar a la receta
        </h3>
        <input
          type="text"
          placeholder="Medicamento y presentación"
          value={newMed}
          onChange={(e) => setNewMed(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-bg-bone border border-slate-ink/10 text-xs focus:outline-none focus:ring-2 focus:ring-primary-pink"
        />
        <input
          type="text"
          placeholder="Dosis, frecuencia y duración"
          value={newIndication}
          onChange={(e) => setNewIndication(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-bg-bone border border-slate-ink/10 text-xs focus:outline-none focus:ring-2 focus:ring-primary-pink"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sage-green/60 text-slate-ink text-xs font-medium hover:bg-sage-green transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Agregar medicamento</span>
        </button>
      </form>

      {/* Vista previa membretada */}
      <div className="rounded-3xl bg-white border border-slate-ink/10 overflow-hidden shadow-sm">
        {/* Barra superior de 4 colores del Brandbook */}
        <div className="grid grid-cols-4 h-2">
          <div className="bg-sage-green" />
          <div className="bg-primary-pink" />
          <div className="bg-warm-sand" />
          <div className="bg-dusty-blue" />
        </div>

        <div className="p-6 space-y-5">
          {/* Encabezado oficial */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-ink/10 pb-4">
            <MonogramPn className="w-11 h-11" showText />
            <div className="text-right text-[10px] text-slate-ink/70 leading-relaxed">
              <p>Hospital MAC Torre I · Cons. 819</p>
              <p>Tel: 221 443 2870 · Puebla, Pue.</p>
              <p>Céd. Prof: [0000000] · Céd. Esp: [0000000]</p>
            </div>
          </div>

          {/* Datos del paciente */}
          <div className="grid grid-cols-3 gap-2 text-xs bg-bg-bone rounded-2xl p-3">
            <div>
              <span className="text-slate-ink/60 block text-[10px]">
                Paciente
              </span>
              <strong className="text-slate-ink">{patientName}</strong>
            </div>
            <div>
              <span className="text-slate-ink/60 block text-[10px]">Edad</span>
              <strong className="text-slate-ink">{patientAge}</strong>
            </div>
            <div>
              <span className="text-slate-ink/60 block text-[10px]">Peso</span>
              <strong className="text-slate-ink">{weightKg || '--'} kg</strong>
            </div>
          </div>

          {/* Rx */}
          <div className="space-y-3">
            <p className="font-serif italic text-2xl text-slate-ink">Rx</p>
            <ol className="space-y-2.5 text-xs">
              {meds.map((med, idx) => (
                <li
                  key={med.id}
                  className="flex items-start justify-between gap-2 pb-2 border-b border-slate-ink/5"
                >
                  <div>
                    <p className="font-semibold text-slate-ink">
                      {idx + 1}. {med.name}
                    </p>
                    <p className="text-slate-ink/75 mt-0.5">{med.indication}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedication(med.id)}
                    className="text-slate-ink/40 hover:text-red-600 print:hidden"
                    aria-label="Eliminar medicamento"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Cuidados generales */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-slate-ink/60 font-semibold">
              Indicaciones generales
            </label>
            <textarea
              rows={2}
              value={careNotes}
              onChange={(e) => setCareNotes(e.target.value)}
              className="w-full text-xs text-slate-ink bg-bg-bone/70 rounded-xl p-2.5 border border-slate-ink/10 focus:outline-none print:border-none print:bg-transparent print:p-0"
            />
          </div>

          {/* Acciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 print:hidden">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-ink text-bg-bone text-xs font-medium hover:opacity-90 transition"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar PDF</span>
            </button>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary-pink text-slate-ink text-xs font-medium hover:brightness-95 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
