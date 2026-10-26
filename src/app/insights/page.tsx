import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { articles } from '@/data/articles';
import { Photo } from '@/components/Photo';

export const metadata: Metadata = { title: 'Insights', description: 'Practical guides on choosing boxes, materials and preparing print-ready packaging artwork.', alternates: { canonical: '/insights' } };
const covers = ['ind_ecommerce', 'fin_kraft', 'fin_print'];

export default function InsightsPage() {
  return (
    <main>
      <PageHero kicker="Insights" title={<>Good ideas, <span className="accent">well packed.</span></>} description="Practical packaging advice for founders, makers and growing brands." />
      <section className="container-x pb-28">
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * .06}>
              <Link href={`/insights/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-paper-light transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="aspect-[4/3] overflow-hidden"><Photo name={covers[i % covers.length]} alt="" sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-medium text-muted">{a.category} · {a.readMinutes} min read</p>
                  <h2 className="mt-3 font-display text-2xl leading-snug">{a.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{a.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">Read article <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
