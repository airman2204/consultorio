import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { MonogramPn } from '@/components/brand/MonogramPn';
import { ScallopedDivider } from '@/components/brand/ScallopedDivider';

export function Footer() {
  return (
    <footer className="relative bg-warm-sand/35 text-slate-ink mt-16">
      <ScallopedDivider fillColor="#F4EBDD" className="w-full h-8 md:h-12 -mt-8 md:-mt-12" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Marca */}
          <div className="space-y-4">
            <MonogramPn className="w-12 h-12" showText />
            <p className="font-serif text-xl text-slate-ink leading-snug">
              Con ciencia, paciencia y{' '}
              <span className="italic text-slate-ink/80">mucho cariño.</span>
            </p>
            <p className="text-xs text-slate-ink/70">
              Atención pediátrica integral en Puebla, México.
            </p>
          </div>

          {/* Consultorio */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-ink/70">
              Consultorio
            </h3>
            <p className="flex items-start gap-2.5 text-sm text-slate-ink/90">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-ink/70" />
              <span>
                Consultorio 819, Torre I, Hospital MAC
                <br />
                Puebla, Pue., México
              </span>
            </p>
            <p className="flex items-center gap-2.5 text-sm text-slate-ink/90">
              <Clock className="w-4 h-4 shrink-0 text-slate-ink/70" />
              <span>Lun–Vie 9:00–19:00 · Sáb 9:00–14:00</span>
            </p>
            <a
              href="https://wa.me/522214432870"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-primary-pink text-slate-ink text-sm font-medium hover:brightness-95 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp 221 443 2870</span>
            </a>
          </div>

          {/* Cumplimiento COFEPRIS */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-ink/70">
              Credenciales &amp; COFEPRIS
            </h3>
            <div className="rounded-3xl bg-white/90 border border-slate-ink/10 p-4 space-y-2 text-xs text-slate-ink/85 shadow-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-ink">
                <ShieldCheck className="w-4 h-4 text-sage-green shrink-0" />
                <span>Aviso de Publicidad COFEPRIS</span>
              </div>
              <p>
                <span className="font-medium">Institución Educativa:</span>{' '}
                [Universidad / Institución que expidió el título]
              </p>
              <p>
                <span className="font-medium">Cédula Profesional:</span>{' '}
                [0000000]
              </p>
              <p>
                <span className="font-medium">Cédula de Especialidad:</span>{' '}
                [0000000]
              </p>
              <p>
                <span className="font-medium">Clave COFEPRIS:</span>{' '}
                [000000000000]
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-ink/65">
          <p>
            © 2026 Dra. Perla Yareli Núñez García. Todos
            los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="hover:text-slate-ink transition">
              Blog Educativo
            </Link>
            <span>·</span>
            <a
              href="mailto:perl.pediatra@gmail.com"
              className="hover:text-slate-ink transition"
            >
              perl.pediatra@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
