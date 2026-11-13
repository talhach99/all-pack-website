import type { Metadata } from 'next';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Photo } from '@/components/Photo';
import { SectionHead } from '@/components/Section';
import { industries } from '@/data/industries';
import { quoteLink } from '@/lib/company';
import { ClientStrip } from '@/components/ClientStrip';
import { WhatsAppIcon } from '@/components/FloatingContact';

export const metadata: Metadata = {
  title: seoTitle(PAGE_SEO.industries),
  description: PAGE_SEO.industries.description,
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
      <PageHero kicker="Industries" title={<>Packaging built for the way you sell</>} description="Every industry asks something different of its packaging. Pick yours to see what we recommend and why." image="ind_restaurants" imageAlt="Pizza boxes by ALL PACK">
        <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
      </PageHero>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead kicker="Who we pack for" title={`${industries.length} industries, one packaging partner`} action={{ text: 'Browse all products', href: '/products' }} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(ind => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-ink/20">
                <div className="relative aspect-[4/3] overflow-hidden bg-mist"><Photo name={ind.image} alt={`Packaging for ${ind.name}`} sizes="(min-width: 1024px) 33vw, 50vw" className="" /></div>
                <div className="flex flex-1 items-start justify-between gap-4 p-5">
                  <div>
                    <h2 className="text-[17px] font-medium text-ink transition-colors group-hover:text-brand">{ind.name}</h2>
                    <p className="mt-1 text-[14px] leading-relaxed text-secondary">{ind.short}</p>
                  </div>
                  <ArrowUpRight size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-brand" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-x">
          <SectionHead kicker="Our approach" title="How we tailor packaging to your industry" />
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <li key={a.t} className="border-t border-ink/10 pt-6">
                <span className="meta tabular-nums">0{i + 1}</span>
                <h3 className="mt-4 text-[17px] font-medium">{a.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">{a.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 border-t border-ink/10 pt-8">
            <ClientStrip />
          </div>
        </div>
      </section>
    </main>
  );
}
