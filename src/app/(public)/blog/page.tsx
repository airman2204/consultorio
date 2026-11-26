'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';
import { LeadMagnetCard } from '@/components/blog/LeadMagnetCard';

const CATEGORIES = [
  'Todos',
  'Fiebre y Urgencias',
  'Alimentación',
  'Recién Nacido',
] as const;

export default function BlogIndexPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === 'Todos' || post.category === activeCategory;
      const matchesQuery =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-block px-4 py-1 rounded-full bg-sage-green/45 text-slate-ink text-xs font-medium">
          Blog · Pediatría
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-slate-ink">
          Guías de Pediatría para Papás
        </h1>
        <p className="text-sm sm:text-base text-slate-ink/75">
          Consejos prácticos y basados en evidencia para cada etapa de tu bebé.
        </p>

        {/* Buscador */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-ink/45 absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos, síntomas, vacunas..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-ink/10 text-sm text-slate-ink placeholder:text-slate-ink/45 focus:outline-none focus:ring-2 focus:ring-primary-pink"
          />
        </div>

        {/* Filtros animados */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'bg-white text-slate-ink/75 hover:text-slate-ink border border-slate-ink/10'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="blogCategoryPill"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 rounded-full bg-slate-ink"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de artículos */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-sm text-slate-ink/65 py-10">
          No encontramos artículos con ese filtro.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl bg-white border border-slate-ink/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className="h-3 w-full"
                  style={{ backgroundColor: post.accentColor }}
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-ink/65">
                    <span className="px-3 py-1 rounded-full bg-bg-bone font-medium text-slate-ink">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl text-slate-ink group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-ink/75">{post.excerpt}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-pink/70 text-slate-ink text-xs font-medium">
                  Leer guía <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Banner Lead Magnet */}
      <div className="max-w-2xl mx-auto">
        <LeadMagnetCard />
      </div>
    </div>
  );
}
