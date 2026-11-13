import type { Metadata } from 'next';
import { INDUSTRY_SEO, seoTitle } from '@/data/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { findIndustry, industries } from '@/data/industries';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { PageHero } from '@/components/PageHero';
import { Photo } from '@/components/Photo';
import { SectionHead } from '@/components/Section';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { emailLink, quoteLink, whatsappLink } from '@/lib/company';

export function generateStaticParams() { return industries.map(i => ({ slug: i.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const ind = findIndustry(slug); if (!ind) return {};
  const seo = INDUSTRY_SEO[slug] ?? { title: `${ind.name} Packaging`, description: `${ind.intro.split('. ')[0]}. Custom packaging from ALL PACK, Lahore.` };
  return { title: seoTitle(seo), description: seo.description, alternates: { canonical: `/industries/${slug}` }, openGraph: { images: [{ url: `/photos/${ind.image}.webp`, alt: `${ind.name} packaging` }] } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const ind = findIndustry(slug); if (!ind) notFound();
  const list = ind.products.map(s => products.find(p => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = industries.filter(i => i.slug !== ind.slug).slice(0, 4);
  return (
    <main>
      <PageHero kicker={`${ind.name} packaging`} title={ind.headline} description={ind.intro} image={ind.image} imageAlt={`Packaging for ${ind.name} by ALL PACK`} crumbs={[{ text: 'Industries', href: '/industries' }, { text: ind.name }]}>
        <a href={quoteLink(`Hello ALL PACK, I need packaging for my ${ind.name.toLowerCase()} business.`)} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
        <a href={emailLink(`${ind.name} packaging quote`)} className="btn-light"><Mail size={18} strokeWidth={1.5} /> Email your brief</a>
      </PageHero>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead kicker="What matters" title={`What ${ind.name.toLowerCase()} packaging needs to do`} />
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {ind.needs.map(n => (
              <div key={n.t} className="border-t border-ink/10 pt-6">
                <Check size={18} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium">{n.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">{n.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-x">
          <SectionHead kicker="Recommended" title={`Products for ${ind.name.toLowerCase()}`} action={{ text: 'Full catalogue', href: '/products' }} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}</div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead kicker="Explore" title="Other industries we serve" action={{ text: 'All industries', href: '/industries' }} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map(o => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-xl">
                <Photo name={o.image} alt={`Packaging for ${o.name}`} sizes="25vw" className="" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-ink/0" />
                <p className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[16px] font-medium text-white">{o.name}<ArrowRight size={16} strokeWidth={1.5} /></p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
