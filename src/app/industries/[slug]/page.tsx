import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { findIndustry, industries } from '@/data/industries';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { whatsappLink } from '@/lib/company';

export function generateStaticParams() { return industries.map(i => ({ slug: i.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const ind = findIndustry(slug); if (!ind) return {};
  return { title: `${ind.name} Packaging`, description: `${ind.intro.split('. ')[0]}. Custom packaging for ${ind.name.toLowerCase()} from ALL PACK, Lahore.`, alternates: { canonical: `/industries/${slug}` }, openGraph: { images: [{ url: `/photos/${ind.image}.webp`, width: 1600, height: 1200, alt: `${ind.name} packaging` }] } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const ind = findIndustry(slug); if (!ind) notFound();
  const list = ind.products.map(s => products.find(p => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = industries.filter(i => i.slug !== ind.slug).slice(0, 4);
  return (
    <main>
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 py-6 text-sm text-muted">
          <Link href="/" className="hover:text-ink">Home</Link><ChevronRight size={14} />
          <Link href="/industries" className="hover:text-ink">Industries</Link><ChevronRight size={14} />
          <span className="text-ink">{ind.name}</span>
        </nav>
        <section className="grid items-center gap-10 pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="kicker">{ind.name} packaging</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-light leading-[1.02]">{ind.headline}</h1>
            <p className="lead mt-7 max-w-[56ch]">{ind.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={16} /></Link>
              <a href={whatsappLink(`Hello ALL PACK, I need packaging for my ${ind.name.toLowerCase()} business.`) || '#'} target="_blank" rel="noopener noreferrer" className="btn-light"><span className="text-[#1F9D55]"><WhatsAppIcon size={17} /></span> WhatsApp us</a>
            </div>
          </Reveal>
          <Reveal delay={.1}><div className="aspect-[4/3] overflow-hidden rounded-[24px] shadow-plate"><Photo name={ind.image} alt={`Packaging for ${ind.name} by ALL PACK`} priority sizes="(min-width: 1024px) 50vw, 100vw" /></div></Reveal>
        </section>
      </div>

      <section className="dark-section grain py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <Reveal><p className="kicker">What matters</p><h2 className="h-section mt-6 !text-[clamp(2rem,3.6vw,3.2rem)]">What {ind.name.toLowerCase()} packaging <span className="accent">needs to do.</span></h2></Reveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {ind.needs.map((n, i) => (
              <Reveal key={n.t} delay={i * .06}>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-brass-light"><Check size={17} /></span>
                <h3 className="mt-5 font-display text-[1.4rem] text-cream">{n.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cream/60">{n.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal><p className="kicker">Recommended</p><h2 className="h-section mt-6 !text-[clamp(2rem,3.8vw,3.4rem)]">Products for <span className="accent">{ind.name.toLowerCase()}.</span></h2></Reveal>
            <Link href="/products" className="btn-light">Full catalogue <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{list.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * .06} className="h-full"><ProductCard product={p} /></Reveal>)}</div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-light py-20">
        <div className="container-x">
          <h2 className="font-display text-3xl font-light">Other industries</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map(o => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[16px]">
                <Photo name={o.image} alt={`Packaging for ${o.name}`} sizes="25vw" className="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(13,18,32,.75))]" />
                <p className="absolute bottom-4 left-4 font-display text-xl text-cream">{o.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
