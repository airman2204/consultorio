'use client';

import React, { useState } from 'react';
import { FileDown, CheckCircle2, Loader2 } from 'lucide-react';

export function LeadMagnetCard({ compact = false }: { compact?: boolean }) {
  const [tutorName, setTutorName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [babyBirthDate, setBabyBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorName,
          whatsapp,
          babyBirthDate,
          resourceSlug: 'checklist-pediatrico-0-12m',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No pudimos procesar tu solicitud.');
      } else {
        setDownloadUrl(data.downloadUrl);
      }
    } catch {
      setError('Ocurrió un error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`rounded-3xl bg-warm-sand/55 border border-warm-sand p-6 ${
        compact ? '' : 'md:p-8'
      } shadow-sm`}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-slate-ink text-xs font-medium mb-3">
        <FileDown className="w-3.5 h-3.5" />
        <span>PDF gratuito</span>
      </div>

      <h3 className="font-serif text-xl md:text-2xl text-slate-ink leading-snug mb-2">
        Descarga gratis: Checklist Pediátrico en PDF
      </h3>
      <p className="text-sm text-slate-ink/80 mb-5">
        Tamiz, vacunas y hitos de 0 a 12 meses. Recibe también recordatorios
        oportunos para su control de niño sano.
      </p>

      {downloadUrl ? (
        <div className="rounded-2xl bg-white/90 p-4 space-y-3 border border-sage-green">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-ink">
            <CheckCircle2 className="w-5 h-5 text-sage-green shrink-0" />
            <span>¡Listo! Tu guía está lista para descargar.</span>
          </div>
          <a
            href={downloadUrl}
            download="Checklist-Pediatrico-Dra-Perla-Nunez.pdf"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-pink text-slate-ink text-sm font-medium hover:brightness-95 transition"
          >
            <FileDown className="w-4 h-4" />
            <span>Descargar PDF ahora</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            placeholder="Tu nombre (mamá o papá)"
            value={tutorName}
            onChange={(e) => setTutorName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-full bg-white/95 border border-slate-ink/10 text-sm text-slate-ink placeholder:text-slate-ink/45 focus:outline-none focus:ring-2 focus:ring-primary-pink"
          />
          <input
            type="tel"
            required
            placeholder="WhatsApp (ej. 221 443 2870)"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full px-4 py-2.5 rounded-full bg-white/95 border border-slate-ink/10 text-sm text-slate-ink placeholder:text-slate-ink/45 focus:outline-none focus:ring-2 focus:ring-primary-pink"
          />
          <div>
            <label className="block text-[11px] font-medium text-slate-ink/70 ml-3 mb-1">
              Fecha de nacimiento de tu bebé
            </label>
            <input
              type="date"
              required
              value={babyBirthDate}
              onChange={(e) => setBabyBirthDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white/95 border border-slate-ink/10 text-sm text-slate-ink focus:outline-none focus:ring-2 focus:ring-primary-pink"
            />
          </div>

          {error && <p className="text-xs text-red-700 px-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-pink text-slate-ink text-sm font-medium hover:brightness-95 active:scale-[0.98] transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generando guía...</span>
              </>
            ) : (
              <span>Quiero mi checklist</span>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-ink/60">
            Sin spam. Solo contenido útil para tu bebé.
          </p>
        </form>
      )}
    </div>
  );
}
