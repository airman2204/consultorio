'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonogramPn } from '@/components/brand/MonogramPn';

const NAV_LINKS = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Blog', href: '/blog' },
  { label: 'Ubicación', href: '/#ubicacion' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <nav
          aria-label="Navegación principal"
          className="flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 rounded-full bg-bg-bone/80 backdrop-blur-md border border-slate-ink/10 shadow-[0_8px_30px_rgba(61,74,69,0.06)]"
        >
          <Link href="/" className="shrink-0">
            <MonogramPn className="w-10 h-10" showText />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-ink/80 hover:text-slate-ink hover:bg-white/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/agendar"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-pink text-slate-ink text-sm font-medium shadow-sm hover:brightness-95 active:scale-[0.98] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Valoración</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-full text-slate-ink hover:bg-white/70 transition-colors"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-2 p-4 rounded-3xl bg-bg-bone/95 backdrop-blur-md border border-slate-ink/10 shadow-lg flex flex-col gap-2"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-ink hover:bg-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/agendar"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-pink text-slate-ink text-sm font-medium"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Valoración</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
