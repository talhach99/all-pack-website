import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { findIndustry, industries } from '@/data/industries';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { PageHero } from '@/components/PageHero';
import { Photo } from '@/components/Photo';
import { SectionHead } from '@/components/Section';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { whatsappLink } from '@/lib/company';

export function generateStaticParams() { return industries.map(i => ({ slug: i.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const ind = findIndustry(slug); if (!ind) return {};
  return { title: `${ind.name} Packaging`, description: `${ind.intro.split('. ')[0]}. Custom packaging for ${ind.name.toLowerCase()} from ALL PACK, Lahore.`, alternates: { canonical: `/industries/${slug}` }, openGraph: { images: [{ url: `/photos/${ind.image}.webp`, alt: `${ind.name} packaging` }] } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const ind = findIndustry(slug); if (!ind) notFound();
  const list = ind.products.map(s => products.find(p => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = industries.filter(i => i.slug !== ind.slug).slice(0, 4);
  return (
    <main>
      <PageHero kicker={`${ind.name} packaging`} title={ind.headline} description={ind.intro} image={ind.image} imageAlt={`Packaging for ${ind.name} by ALL PACK`} crumbs={[{ text: 'Industries', href: '/industries' }, { text: ind.name }]}>
        <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={17} /></Link>
        <a href={whatsappLink(`Hello ALL PACK, I need packaging for my ${ind.name.toLowerCase()} business.`) || '#'} target="_blank" rel="noopener noreferrer" className="btn border-[1.5px] border-white/40 text-white hover:border-white"><WhatsAppIcon size={17} /> WhatsApp us</a>
      </PageHero>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead n={1} kicker="What matters" title={`What ${ind.name.toLowerCase()} packaging needs to do.`} />
          <div className="grid gap-6 md:grid-cols-3">
            {ind.needs.map((n, i) => (
              <div key={n.t} className="rounded-[14px] border border-line bg-paper-deep p-7">
                <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white"><Check size={17} /></span><span className="text-[13px] font-semibold text-brand">0{i + 1}</span></div>
                <h3 className="mt-6 text-xl font-semibold">{n.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{n.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section grain-dark bg-ink text-white">
        <div className="container-x">
          <SectionHead n={2} kicker="Recommended" title={`Products for ${ind.name.toLowerCase()}.`} action={{ text: 'Full catalogue', href: '/products' }} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}</div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead n={3} kicker="Explore" title="Other industries we serve." action={{ text: 'All industries', href: '/industries' }} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map(o => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[14px]">
                <Photo name={o.image} alt={`Packaging for ${o.name}`} sizes="25vw" className="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-ink/0" />
                <p className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-lg font-semibold text-white">{o.name}<ArrowRight size={17} className="text-cyan" /></p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
