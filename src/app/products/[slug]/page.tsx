import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronRight, MessageCircle, Ruler, Layers, Sparkles, Users } from 'lucide-react';
import { findProduct, products, productImage, categorySlug } from '@/lib/products';
import { ProductImage } from '@/components/ProductImage';
import { ProductCard } from '@/components/ProductCard';
import { AddToQuoteButton } from '@/components/AddToQuoteButton';
import { Reveal } from '@/components/Reveal';
import { COMPANY, whatsappLink } from '@/lib/company';

export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = findProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — Custom Printed`,
    description: `${p.description} Custom sizes, materials and printing from ALL PACK, Lahore. Request a free quote.`,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { images: [{ url: productImage(p), width: 1200, height: 900, alt: p.name }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = findProduct(slug);
  if (!p) notFound();
  const related = [...products.filter(x => x.category === p.category && x.slug !== p.slug), ...products.filter(x => x.category !== p.category && x.featured)].slice(0, 3);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.fullDescription, category: p.category,
    image: `${COMPANY.siteUrl}${productImage(p)}`, brand: { '@type': 'Brand', name: COMPANY.name }, url: `${COMPANY.siteUrl}/products/${p.slug}`,
  };
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Products', item: `${COMPANY.siteUrl}/products` },
    { '@type': 'ListItem', position: 2, name: p.category, item: `${COMPANY.siteUrl}/products?category=${categorySlug(p.category)}` },
    { '@type': 'ListItem', position: 3, name: p.name, item: `${COMPANY.siteUrl}/products/${p.slug}` },
  ] };
  const specs = [
    { icon: Layers, title: 'Materials', items: p.materials },
    { icon: Ruler, title: 'Sizes & formats', items: p.sizes },
    { icon: Sparkles, title: 'Print & finishing', items: p.customization },
    { icon: Users, title: 'Ideal for', items: p.uses },
  ];
  return (
    <main className="pt-24 sm:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, crumbs]).replace(/</g, '\\u003c') }} />
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 py-4 text-sm text-muted">
          <Link href="/products" className="hover:text-ink">Products</Link><ChevronRight size={14} />
          <Link href={`/products?category=${categorySlug(p.category)}`} className="hover:text-ink">{p.category}</Link><ChevronRight size={14} />
          <span className="text-ink">{p.name}</span>
        </nav>
        <div className="grid gap-10 pb-20 pt-4 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal><ProductImage product={p} priority className="aspect-[4/3.4] rounded-5xl border border-line" imgClassName="p-6 sm:p-10" /></Reveal>
          </div>
          <Reveal delay={.08} className="lg:py-6">
            <p className="kicker mb-5">{p.category}</p>
            <h1 className="font-display text-[clamp(2.4rem,4.6vw,4rem)] font-semibold leading-[1.02] tracking-[-.04em]">{p.name}</h1>
            <p className="lead mt-6">{p.fullDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/quote?product=${p.slug}`} className="btn-dark">Get a quote <ArrowRight size={17} /></Link>
              <AddToQuoteButton slug={p.slug} />
            </div>
            <a href={whatsappLink(`Hello ALL PACK, I'm interested in ${p.name}. Can you share options and a quote?`) || '#'} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
              <MessageCircle size={16} className="text-[#1FA855]" /> Ask about this product on WhatsApp
            </a>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {specs.map(s => (
                <div key={s.title} className="rounded-3xl border border-line bg-white p-5">
                  <div className="mb-3 flex items-center gap-2"><s.icon size={17} className="text-sky" /><h2 className="text-sm font-semibold">{s.title}</h2></div>
                  <ul className="space-y-1.5">{s.items.map(item => <li key={item} className="flex items-start gap-2 text-sm text-muted"><Check size={14} className="mt-1 shrink-0 text-brand" />{item}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-3xl bg-mist px-5 py-4 text-sm">
              <span className="text-muted">Minimum order</span><span className="font-semibold">{p.moq}</span>
            </div>
          </Reveal>
        </div>
      </div>
      <section className="border-t border-line bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="h-section !text-[clamp(2rem,3.6vw,3rem)]">You might also <span className="accent">like.</span></h2>
            <Link href="/products" className="btn-light">All products <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{related.map(x => <ProductCard key={x.slug} product={x} />)}</div>
        </div>
      </section>
    </main>
  );
}
