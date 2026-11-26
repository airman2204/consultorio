'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  FileText,
  MapPin,
  RefreshCw,
  Stethoscope,
  Users,
} from 'lucide-react';
import { MonogramPn } from '@/components/brand/MonogramPn';

const NAV_ITEMS = [
  {
    label: 'Agenda del Día',
    href: '/dashboard/agenda',
    icon: CalendarDays,
  },
  {
    label: 'Pacientes',
    href: '/dashboard/pacientes/demo-mateo',
    icon: Users,
  },
  {
    label: 'Expediente Clínico',
    href: '/dashboard/pacientes/demo-mateo',
    icon: Stethoscope,
  },
  {
    label: 'Recetario',
    href: '/dashboard/pacientes/demo-mateo#receta',
    icon: FileText,
  },
];

function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1.5" aria-label="Menú clínico">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href.split('#')[0];
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary-pink/65 text-slate-ink'
                : 'text-slate-ink/75 hover:bg-bg-bone hover:text-slate-ink'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-bone text-slate-ink flex flex-col lg:flex-row">
      {/* Sidebar izquierdo */}
      <aside className="w-full lg:w-68 bg-white border-b lg:border-b-0 lg:border-r border-slate-ink/10 p-5 flex flex-col justify-between shrink-0 print:hidden">
        <div className="space-y-6">
          <Link href="/" className="block">
            <MonogramPn className="w-10 h-10" showText />
          </Link>

          <div className="rounded-2xl bg-bg-bone p-3.5 border border-slate-ink/10">
            <p className="text-xs font-semibold text-slate-ink">
              Dra. Perla Núñez
            </p>
            <p className="text-[11px] text-slate-ink/65">Pediatra · NOM-004</p>
          </div>

          <Suspense fallback={null}>
            <SidebarNav />
          </Suspense>
        </div>

        <div className="mt-6 space-y-3">
          <div className="inline-flex w-full items-center justify-center gap-2 px-3 py-2 rounded-full bg-sage-green/40 text-xs font-medium text-slate-ink">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sincronizado con TimeTree</span>
          </div>

          <div className="rounded-2xl bg-sage-green/25 p-3.5 text-xs text-slate-ink/85 flex items-start gap-2">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Consultorio 819 · Torre I, Hospital MAC Puebla</span>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
