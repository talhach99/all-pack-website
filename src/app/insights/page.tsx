import type { Metadata } from 'next';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { articles } from '@/data/articles';

export const metadata: Metadata = { title: seoTitle(PAGE_SEO.insights),
  description: PAGE_SEO.insights.description, alternates: { canonical: '/insights' } };

export default function InsightsPage() {
  return (
    <main>
      <PageHero kicker="Guides" title="Packaging guides from the press floor." description="Practical advice on choosing a box structure, selecting board and preparing artwork that prints correctly first time." />
      <section className="container-x pb-28 pt-16">
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * .06}>
              <Link href={`/insights/${a.slug}`} className="group card flex h-full flex-col transition-colors hover:border-[#C9CFDC]">
                                <div className="flex flex-1 flex-col p-7">
                  <p className="meta">{String(i + 1).padStart(2, '0')} · {a.category} · {a.readMinutes} min read</p>
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
