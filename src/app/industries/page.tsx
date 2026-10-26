import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { ClientStrip } from '@/components/ClientStrip';
import { industries } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Packaging by Industry',
  description: 'Custom packaging for e-commerce, restaurants, bakeries, cafés, beauty, pharmaceutical, fashion, jewellery and agriculture from ALL PACK, Lahore.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <main>
      <PageHero kicker="Industries" title={<>Packaging built for the way <span className="accent">you sell.</span></>} description="Every industry asks something different of its packaging. Pick yours to see what we recommend and why." image="ind_restaurants" imageAlt="Pizza boxes, burger clamshells and noodle boxes by ALL PACK">
        <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={16} /></Link>
      </PageHero>
      <section className="container-x pb-10"><div className="border-y border-line py-8"><ClientStrip /></div></section>
      <section className="container-x pb-28 pt-10">
        <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * .06}>
              <Link href={`/industries/${ind.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-[18px]"><Photo name={ind.image} alt={`Packaging for ${ind.name}`} sizes="(min-width: 1024px) 33vw, 50vw" className="transition-transform duration-[1.4s] group-hover:scale-[1.05]" /></div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div><h2 className="font-display text-[1.6rem] leading-tight group-hover:text-brass-dark">{ind.name}</h2><p className="mt-2 text-[15px] leading-relaxed text-muted">{ind.short}</p></div>
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-cream"><ArrowUpRight size={17} /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
