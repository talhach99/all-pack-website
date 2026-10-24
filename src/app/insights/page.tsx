import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { articles } from '@/data/articles';

export const metadata: Metadata = { title: 'Insights', description: 'Practical guides on choosing boxes, materials and preparing print-ready packaging artwork.', alternates: { canonical: '/insights' } };
const covers = ['shipping', 'printed', 'label'];

export default function InsightsPage() {
  return (
    <main>
      <PageHero kicker="Insights" title={<>Good ideas, <span className="accent">well packed.</span></>} description="Practical packaging advice for founders, makers and growing brands." />
      <section className="container-x pb-28">
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * .06}>
              <Link href={`/insights/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className={`${i === 0 ? 'tile-warm' : 'tile'} aspect-[4/3]`}><img src={`/renders/${covers[i % covers.length]}.webp`} alt="" loading="lazy" className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-medium text-muted">{a.category} · {a.readMinutes} min read</p>
                  <h2 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight">{a.title}</h2>
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
