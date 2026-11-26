'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Baby,
  Calendar,
  Clock,
  HeartHandshake,
  Hospital,
  MapPin,
  MessageCircle,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Syringe,
} from 'lucide-react';
import { ScallopedDivider } from '@/components/brand/ScallopedDivider';
import { LeadMagnetCard } from '@/components/blog/LeadMagnetCard';
import { BLOG_POSTS } from '@/data/blog-posts';

const ORGANIC_EASE = [0.22, 1, 0.36, 1] as const;

type StageKey = 'recien_nacido' | 'lactantes' | 'infancia';

const STAGES: { key: StageKey; label: string }[] = [
  { key: 'recien_nacido', label: 'Recién Nacido' },
  { key: 'lactantes', label: 'Lactantes 1–12m' },
  { key: 'infancia', label: 'Infancia' },
];

const SERVICES_BY_STAGE: Record<
  StageKey,
  {
    title: string;
    description: string;
    frequency: string;
    bgClass: string;
    icon: React.ReactNode;
  }[]
> = {
  recien_nacido: [
    {
      title: 'Control de Niño Sano',
      description:
        'Valoración integral de peso, talla, ictericia, reflejos y tamiz neonatal en sus primeros días.',
      frequency: 'Cada 2–4 semanas',
      bgClass: 'bg-sage-green/35',
      icon: <Stethoscope className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Vacunación',
      description:
        'Revisión y aplicación oportuna de esquema inicial (BCG, Hepatitis B) con registro digital.',
      frequency: 'Al nacer',
      bgClass: 'bg-dusty-blue/30',
      icon: <Syringe className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Lactancia Materna',
      description:
        'Asesoría de agarre, postura, producción de leche y resolución de dudas sin juicios.',
      frequency: 'Primeras 72 h',
      bgClass: 'bg-primary-pink/35',
      icon: <Baby className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Urgencias Pediátricas',
      description:
        'Orientación prioritaria ante fiebre, dificultad respiratoria o signos de alarma.',
      frequency: 'Atención 24/7',
      bgClass: 'bg-warm-sand/45',
      icon: <ShieldPlus className="w-5 h-5 text-slate-ink" />,
    },
  ],
  lactantes: [
    {
      title: 'Control de Niño Sano',
      description:
        'Seguimiento mensual de curvas OMS, hitos del desarrollo motor y alimentación complementaria.',
      frequency: 'Mensual',
      bgClass: 'bg-sage-green/35',
      icon: <Stethoscope className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Vacunación',
      description:
        'Esquema completo de 2, 4, 6 y 12 meses con recordatorios personalizados por WhatsApp.',
      frequency: '2 · 4 · 6 · 12 m',
      bgClass: 'bg-dusty-blue/30',
      icon: <Syringe className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Lactancia y Destete',
      description:
        'Acompañamiento en transición a sólidos, banco de leche y lactancia prolongada.',
      frequency: 'Según necesidad',
      bgClass: 'bg-primary-pink/35',
      icon: <Baby className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Urgencias Pediátricas',
      description:
        'Atención oportuna de cuadros respiratorios, fiebre o infecciones gastrointestinales.',
      frequency: 'Atención 24/7',
      bgClass: 'bg-warm-sand/45',
      icon: <ShieldPlus className="w-5 h-5 text-slate-ink" />,
    },
  ],
  infancia: [
    {
      title: 'Control de Niño Sano',
      description:
        'Evaluación anual de crecimiento, visión, audición, nutrición y salud escolar.',
      frequency: 'Cada 6–12 meses',
      bgClass: 'bg-sage-green/35',
      icon: <Stethoscope className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Vacunación',
      description:
        'Refuerzos de cartilla nacional y vacunas complementarias recomendadas por edad.',
      frequency: 'Refuerzos',
      bgClass: 'bg-dusty-blue/30',
      icon: <Syringe className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Orientación Familiar',
      description:
        'Guía en hábitos de sueño, alimentación selectiva y prevención de accidentes.',
      frequency: 'Orientación',
      bgClass: 'bg-primary-pink/35',
      icon: <HeartHandshake className="w-5 h-5 text-slate-ink" />,
    },
    {
      title: 'Urgencias Pediátricas',
      description:
        'Valoración médica rápida en Hospital MAC ante síntomas agudos o lesiones.',
      frequency: 'Atención 24/7',
      bgClass: 'bg-warm-sand/45',
      icon: <ShieldPlus className="w-5 h-5 text-slate-ink" />,
    },
  ],
};

export default function LandingPage() {
  const [activeStage, setActiveStage] = useState<StageKey>('recien_nacido');

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section
        id="inicio"
        className="relative pt-10 pb-20 md:pt-16 md:pb-28 px-4 sm:px-6"
      >
        {/* Formas pastel flotantes sutiles */}
        <motion.div
          animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -left-24 w-80 h-80 rounded-full bg-sage-green/30 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 -right-24 w-96 h-96 rounded-full bg-primary-pink/30 blur-3xl pointer-events-none"
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Columna izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: ORGANIC_EASE }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-slate-ink/10 text-xs font-medium text-slate-ink shadow-xs">
              <span className="w-2 h-2 rounded-full bg-sage-green" />
              <span>Pediatría con calidez · Puebla</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-ink leading-[1.12] tracking-tight">
              Cuidando el{' '}
              <span className="relative inline-block">
                <span className="relative z-10">crecimiento</span>
                <span className="absolute bottom-1 inset-x-0 h-3 bg-warm-sand/55 -z-0 rounded-full" />
              </span>{' '}
              y{' '}
              <span className="italic text-slate-ink/85 underline decoration-primary-pink decoration-4 underline-offset-4">
                bienestar
              </span>{' '}
              de tu pequeño
            </h1>

            <p className="text-base sm:text-lg text-slate-ink/80 max-w-xl leading-relaxed">
              Medicina pediátrica basada en evidencia, con tiempo para
              escucharte. Acompaño a tu familia desde el primer día de vida
              hasta la adolescencia.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="#ubicacion"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-pink text-slate-ink font-medium text-sm shadow-sm hover:brightness-95 active:scale-[0.98] transition-all"
              >
                <span>Agendar Valoración</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/522214432870"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-slate-ink/15 text-slate-ink font-medium text-sm hover:bg-white/80 transition"
              >
                <MessageCircle className="w-4 h-4 text-sage-green" />
                <span>221 443 2870</span>
              </a>
            </div>

            {/* Badges de confianza */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 max-w-lg">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/85 border border-slate-ink/10 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-dusty-blue/30 flex items-center justify-center shrink-0">
                  <Hospital className="w-5 h-5 text-slate-ink" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-ink">
                    Hospital MAC Torre I
                  </p>
                  <p className="text-xs text-slate-ink/70">Consultorio 819</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/85 border border-slate-ink/10 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-primary-pink/35 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-slate-ink" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-ink">
                    Atención Personalizada
                  </p>
                  <p className="text-xs text-slate-ink/70">
                    Consultas sin prisas
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha: Marco circular orgánico */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: ORGANIC_EASE }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border-4 border-sage-green/60 bg-white p-3 shadow-[0_20px_60px_rgba(61,74,69,0.08)] flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-bg-bone">
                <img
                  src="/images/hero-pediatra.jpg"
                  alt="Dra. Perla Yareli Núñez García revisando a un bebé en consulta"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tarjeta flotante superior */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-8 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-ink/10 shadow-md"
              >
                <p className="text-xs font-semibold text-slate-ink">
                  ★★★★★ Familias que confían
                </p>
              </motion.div>

              {/* Tarjeta flotante inferior */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-2 sm:-right-6 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-ink/10 shadow-md flex items-center gap-2.5"
              >
                <span className="w-8 h-8 rounded-full bg-sage-green/40 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-slate-ink" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-ink/60 font-semibold">
                    Agenda en línea
                  </p>
                  <p className="text-xs font-semibold text-slate-ink">
                    Sincronizada con TimeTree
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ScallopedDivider fillColor="#FFFFFF" />

      {/* SERVICIOS INTERACTIVOS POR ETAPA */}
      <section id="servicios" className="bg-white py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink/60">
              Servicios
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-ink">
              Atención pensada para cada etapa
            </h2>
            <p className="text-sm sm:text-base text-slate-ink/75">
              Elige la etapa de tu pequeño y descubre cómo te acompaño en cada
              consulta.
            </p>
          </div>

          {/* Tabs animados */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-full bg-bg-bone border border-slate-ink/10">
              {STAGES.map((stage) => {
                const isActive = activeStage === stage.key;
                return (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={() => setActiveStage(stage.key)}
                    className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-slate-ink'
                        : 'text-slate-ink/65 hover:text-slate-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeStageTab"
                        transition={{ duration: 0.35, ease: ORGANIC_EASE }}
                        className="absolute inset-0 rounded-full bg-primary-pink shadow-xs"
                      />
                    )}
                    <span className="relative z-10">{stage.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tarjetas de servicio */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: ORGANIC_EASE }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {SERVICES_BY_STAGE[activeStage].map((service) => (
                <div
                  key={service.title}
                  className={`rounded-3xl p-6 ${service.bgClass} border border-slate-ink/5 flex flex-col justify-between space-y-5`}
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-xs">
                      {service.icon}
                    </div>
                    <h3 className="font-serif text-xl text-slate-ink">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-ink/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="px-3 py-1 rounded-full bg-white/80 text-[11px] font-medium text-slate-ink">
                      {service.frequency}
                    </span>
                    <Link
                      href="#ubicacion"
                      className="text-xs font-semibold text-slate-ink hover:underline"
                    >
                      Agendar →
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <ScallopedDivider fillColor="#FAF9F6" />

      {/* BLOG EDUCATIVO & LEAD MAGNET */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-bg-bone">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink/60">
                Blog Educativo
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-ink mt-1">
                Guías claras para mamás y papás
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-ink hover:underline inline-flex items-center gap-1"
            >
              <span>Ver todos los artículos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {BLOG_POSTS.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-3xl bg-white border border-slate-ink/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 w-full overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-ink/65">
                        <span
                          className="px-3 py-1 rounded-full font-medium text-slate-ink"
                          style={{ backgroundColor: `${post.accentColor}55` }}
                        >
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-serif text-xl text-slate-ink group-hover:underline">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-ink/75 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-ink">
                      Leer guía <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="lg:col-span-4">
              <LeadMagnetCard compact />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN UBICACIÓN */}
      <section id="ubicacion" className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[2rem] bg-bg-bone border border-slate-ink/10 p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink/60">
                Ubicación y Citas
              </p>
              <h2 className="font-serif text-3xl text-slate-ink">
                Consultorio 819, Torre I
                <br />
                Hospital MAC Puebla
              </h2>
              <p className="text-sm text-slate-ink/80 leading-relaxed">
                Agenda tu valoración pediátrica con horarios sincronizados en
                tiempo real o escríbenos directamente por WhatsApp.
              </p>

              <div className="space-y-2 text-sm text-slate-ink/85 pt-2">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-pink shrink-0" />
                  <span>Hospital MAC Puebla · Torre I, Consultorio 819</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sage-green shrink-0" />
                  <span>Lun–Vie 9:00–19:00 · Sáb 9:00–14:00</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=Hospital+MAC+Puebla"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white border border-slate-ink/15 text-slate-ink font-medium text-sm hover:bg-white/70 transition"
              >
                <MapPin className="w-4 h-4" />
                <span>Abrir en Google Maps</span>
              </a>

              <a
                href="https://wa.me/522214432870?text=Hola%20Dra.%20Perla,%20me%20gustar%C3%ADa%20agendar%20una%20valoraci%C3%B3n%20pedi%C3%A1trica."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary-pink text-slate-ink font-medium text-sm shadow-sm hover:brightness-95 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Agendar por WhatsApp · 221 443 2870</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
