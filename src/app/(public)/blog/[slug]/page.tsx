import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';
import { LeadMagnetCard } from '@/components/blog/LeadMagnetCard';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgressBar />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-ink/75 hover:text-slate-ink mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al blog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contenido principal */}
          <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-ink/10 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-ink/70">
              <span
                className="px-3 py-1 rounded-full font-medium text-slate-ink"
                style={{ backgroundColor: `${post.accentColor}66` }}
              >
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} de lectura</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-slate-ink leading-tight">
              {post.title}
            </h1>

            <p className="text-sm text-slate-ink/70">
              Por <strong className="text-slate-ink">Dra. Perla Yareli Núñez García</strong> · Pediatra
            </p>

            <div className="space-y-6 pt-2">
              {post.sections.map((section) => (
                <section key={section.heading} className="space-y-2.5">
                  <h2 className="font-serif text-2xl text-slate-ink">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-base text-slate-ink/85 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* Callout en #E0C9A6 */}
            <div className="rounded-3xl bg-warm-sand/45 border border-warm-sand p-6 space-y-3">
              <div className="flex items-center gap-2 font-serif text-xl text-slate-ink">
                <AlertTriangle className="w-5 h-5 text-slate-ink shrink-0" />
                <h3>{post.calloutTitle}</h3>
              </div>
              <ul className="space-y-2">
                {post.calloutItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-ink/90"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-ink shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <LeadMagnetCard compact />

            <div className="rounded-3xl bg-white border border-slate-ink/10 p-6 space-y-3 shadow-xs">
              <div className="flex items-start gap-2.5 text-sm text-slate-ink">
                <MapPin className="w-4 h-4 text-primary-pink shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Consultorio 819, Torre I</p>
                  <p className="text-xs text-slate-ink/70">
                    Hospital MAC · Puebla
                  </p>
                </div>
              </div>
              <Link
                href="/#ubicacion"
                className="inline-block text-xs font-semibold text-slate-ink hover:underline"
              >
                Agendar valoración →
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
