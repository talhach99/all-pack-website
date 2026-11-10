import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronRight, Layers, Ruler, Sparkles, Users } from 'lucide-react';
import { findProduct, products, productImage, categorySlug, finishShot } from '@/lib/products';
import { industries } from '@/data/industries';
import { ProductCard } from '@/components/ProductCard';
import { ProductGallery } from '@/components/ProductGallery';
import { AddToQuoteButton } from '@/components/AddToQuoteButton';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Eyebrow, SectionHead } from '@/components/Section';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { COMPANY, whatsappLink } from '@/lib/company';

export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = findProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — Custom Printed`,
    description: `${p.description} Custom sizes, materials and printing from ALL PACK, Lahore. Request a free quote.`,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { images: [{ url: productImage(p), width: 1600, height: 1280, alt: p.name }] },
  };
}

const steps = [
  ['Share your brief', 'Product, quantity, rough size and a photo if you have one.'],
  ['Get a clear quote', 'Material, structure, finish, price and lead time spelled out.'],
  ['Approve the proof', 'Nothing is printed until you are happy with the artwork.'],
  ['Production & handover', 'Printed, finished and packed, ready for your product.'],
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = findProduct(slug);
  if (!p) notFound();
  const related = [...products.filter(x => x.category === p.category && x.slug !== p.slug), ...products.filter(x => x.category !== p.category && x.featured)].slice(0, 3);
  const inds = industries.filter(i => i.products.includes(p.slug));
  const fin = finishShot(p);
  const gallery = [
    { name: p.model, alt: `${p.name} by ALL PACK`, label: 'Sample' },
    { name: fin.name, alt: fin.label, label: fin.label },
    ...inds.slice(0, 2).map(i => ({ name: i.image, alt: `${p.name} in a ${i.name.toLowerCase()} setting`, label: `For ${i.name}` })),
  ];
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
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, crumbs]).replace(/</g, '\\u003c') }} />
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 py-6 text-sm text-muted">
          <Link href="/" className="hover:text-ink">Home</Link><ChevronRight size={14} />
          <Link href="/products" className="hover:text-ink">Products</Link><ChevronRight size={14} />
          <Link href={`/products?category=${categorySlug(p.category)}`} className="hover:text-ink">{p.category}</Link><ChevronRight size={14} />
          <span className="text-ink">{p.name}</span>
        </nav>
        <div className="grid gap-10 pb-20 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <div className="lg:sticky lg:top-40 lg:self-start"><Reveal><ProductGallery images={gallery} /></Reveal></div>
          <Reveal delay={.08} className="lg:pt-2">
            <Eyebrow>{p.category}</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.4rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-.03em]">{p.name}</h1>
            <p className="lead mt-6">{p.fullDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/quote?product=${p.slug}`} className="btn-dark">Get a quote <ArrowRight size={17} /></Link>
              <AddToQuoteButton slug={p.slug} />
            </div>
            <a href={whatsappLink(`Hello ALL PACK, I'm interested in ${p.name}. Can you share options and a quote?`) || '#'} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
              <span className="text-[#1F9D55]"><WhatsAppIcon size={17} /></span> Ask about this product on WhatsApp
            </a>

            <dl className="mt-10 divide-y divide-line border-y border-line">
              {specs.map(s => (
                <div key={s.title} className="grid gap-3 py-5 sm:grid-cols-[170px_1fr]">
                  <dt className="flex items-center gap-2.5 text-sm font-semibold"><s.icon size={16} className="text-brand" /> {s.title}</dt>
                  <dd><ul className="flex flex-wrap gap-2">{s.items.map(item => <li key={item} className="rounded-full border border-line bg-paper-light px-3 py-1 text-[13.5px] text-ink/80">{item}</li>)}</ul></dd>
                </div>
              ))}
              <div className="grid gap-3 py-5 sm:grid-cols-[170px_1fr]"><dt className="text-sm font-semibold">Minimum order</dt><dd className="text-[15px] text-ink/80">{p.moq}</dd></div>
            </dl>

            {inds.length > 0 && (
              <div className="mt-8">
                <p className="text-sm font-semibold">Popular with</p>
                <div className="mt-3 flex flex-wrap gap-2">{inds.map(i => <Link key={i.slug} href={`/industries/${i.slug}`} className="chip hover:border-ink">{i.name}</Link>)}</div>
              </div>
            )}
          </Reveal>
        </div>
      </div>

      <section className="section grain-dark bg-ink text-white">
        <div className="container-x">
          <SectionHead n={1} kicker="How ordering works" title="From brief to box in four steps." sub="A clear specification and a clear price before anything is printed." light />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <li key={t} className="border-t border-white/10 pt-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-[14px] font-semibold">{i + 1}</span>
                <h3 className="mt-5 text-xl font-semibold text-white">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cream/65">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div><Eyebrow n={2}>Questions</Eyebrow><h2 className="h-section mt-5">Before you order.</h2></div>
          <Reveal delay={.08}><FaqAccordion limit={5} /></Reveal>
        </div>
      </section>

      <section className="section grain-dark bg-ink text-white">
        <div className="container-x">
          <SectionHead n={3} kicker="Related" title="You might also need." action={{ text: 'All products', href: '/products' }} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((x, i) => <ProductCard key={x.slug} product={x} index={i} />)}</div>
        </div>
      </section>
    </main>
  );
}
