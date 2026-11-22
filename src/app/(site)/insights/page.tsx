/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { getSite, pageMeta } from '@/lib/site';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { readMinutes } from '@/data/articles';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('insights', '/insights'); }

export default async function InsightsPage() {
  const { articles, copy: t } = await getSite();
  return (
    <main>
      <PageHero kicker="Guides" title={t['insights.title']} description={t['insights.lead']} />
      <section className="container-x pb-28 pt-16">
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * .06}>
              <Link href={`/insights/${a.slug}`} className="group card flex h-full flex-col transition-colors hover:border-[#C9CFDC]">
                <div className="relative aspect-[16/10] border-b border-line bg-card"><img src={a.hero.src} alt={a.hero.alt} width={a.hero.width} height={a.hero.height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain p-5" /></div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="meta">{String(i + 1).padStart(2, '0')} · {a.category} · {readMinutes(a)} min read</p>
                  <h2 className="mt-4 text-[21px] leading-snug group-hover:text-brand">{a.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{a.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-semibold text-brand">Read the guide <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
