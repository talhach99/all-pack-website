import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Photo } from '@/components/Photo';
import { SectionHead } from '@/components/Section';
import { industries } from '@/data/industries';
import { CLIENTS } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Packaging by Industry',
  description: 'Custom packaging for e-commerce, restaurants, bakeries, cafés, beauty, pharmaceutical, fashion, jewellery and agriculture from ALL PACK, Lahore.',
  alternates: { canonical: '/industries' },
};

const approach = [
  { t: 'Understand the product', d: 'Weight, shape, shelf life and how it is stored, stacked and shipped.' },
  { t: 'Match the structure', d: 'The right board grade, closure and inserts for the job it has to do.' },
  { t: 'Design for the customer', d: 'Print and finish chosen for where the pack is seen: shelf, counter or doorstep.' },
  { t: 'Deliver on schedule', d: 'Clear lead times agreed up front, so launches and seasons run on time.' },
];

export default function IndustriesPage() {
  return (
    <main>
      <PageHero kicker="Industries" title={<>Packaging built for the way you sell.</>} description="Every industry asks something different of its packaging. Pick yours to see what we recommend and why." image="ind_restaurants" imageAlt="Pizza boxes by ALL PACK">
        <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={17} /></Link>
      </PageHero>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead n={1} kicker="Who we pack for" title={`${industries.length} industries, one packaging partner.`} action={{ text: 'Browse all products', href: '/products' }} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group flex flex-col rounded-[14px] border border-line bg-paper-deep p-3 transition lift hover:border-brand/40 hover:bg-white hover:shadow-card">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white"><Photo name={ind.image} alt={`Packaging for ${ind.name}`} sizes="(min-width: 1024px) 33vw, 50vw" className="transition-transform duration-700 group-hover:scale-[1.04]" /></div>
                <div className="flex flex-1 items-start justify-between gap-4 px-3 pb-3 pt-5">
                  <div>
                    <p className="text-[12px] font-semibold text-brand">{String(i + 1).padStart(2, '0')}</p>
                    <h2 className="mt-1 text-[20px] font-semibold underline-offset-4 group-hover:underline">{ind.name}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{ind.short}</p>
                  </div>
                  <span className="mt-6 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white transition group-hover:border-brand group-hover:bg-brand group-hover:text-white"><ArrowUpRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section grain-dark bg-ink text-white">
        <div className="container-x">
          <SectionHead n={2} kicker="Our approach" title="How we tailor packaging to your industry." light />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <li key={a.t} className="border-t border-white/10 pt-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-[14px] font-semibold">{i + 1}</span>
                <h3 className="mt-5 text-xl font-semibold text-white">{a.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cream/65">{a.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-3 border-t border-white/10 pt-8">
            <span className="text-[12px] font-semibold uppercase tracking-[.16em] text-cyan">Trusted by</span>
            {CLIENTS.map(c => <span key={c} className="text-lg font-semibold text-white/55">{c}</span>)}
          </div>
        </div>
      </section>
    </main>
  );
}
