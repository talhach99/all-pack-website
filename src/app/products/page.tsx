/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import { families } from '@/data/catalog';
import { COMPANY, emailLink, quoteLink } from '@/lib/company';
import { PageHero } from '@/components/PageHero';
import { Eyebrow } from '@/components/Section';
import { WhatsAppIcon } from '@/components/FloatingContact';

export const metadata: Metadata = {
  title: seoTitle(PAGE_SEO.products),
  description: PAGE_SEO.products.description,
  alternates: { canonical: '/products' },
  openGraph: { images: [{ url: '/renders/packaging-range.webp', alt: 'ALL PACK printed packaging range' }] },
};

export default function ProductsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ALL PACK packaging range',
    itemListElement: families.map((f, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Product', name: f.name, description: f.description, image: `${COMPANY.siteUrl}${f.image}`, url: `${COMPANY.siteUrl}/products#${f.slug}`, brand: { '@type': 'Brand', name: COMPANY.name } },
    })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <PageHero
        kicker="Products"
        title="Custom packaging, specified and printed in Lahore."
        description="Eight packaging formats, each made to your dimensions, board grade and artwork. Choose a format below, send your requirements and receive a specification and price within 24 hours."
      />

      <nav aria-label="Product formats" className="sticky top-[76px] z-30 border-b border-line bg-white/95 backdrop-blur sm:top-[88px] lg:top-[144px]">
        <ul className="container-x no-scrollbar flex gap-2 overflow-x-auto py-3 lg:justify-center">
          {families.map(f => <li key={f.slug} className="shrink-0"><a href={`#${f.slug}`} className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[13.5px] font-medium text-ink-soft transition-colors hover:border-navy hover:text-navy">{f.name}</a></li>)}
        </ul>
      </nav>

      <div className="container-x">
        {families.map((f, i) => {
          const msg = `Hello ALL PACK, I would like a quotation for ${f.name.toLowerCase()}.\nSize:\nQuantity:\nPrint and finish:`;
          return (
            <section key={f.slug} id={f.slug} aria-labelledby={`${f.slug}-h`} className="grid items-center gap-10 border-b border-line py-16 last:border-0 sm:py-20 lg:grid-cols-2 lg:gap-16">
              <div className={`relative flex aspect-[5/4] items-center justify-center rounded-3xl bg-card p-6 sm:p-8 ${i % 2 ? 'lg:order-2' : ''}`}>
                <span className="meta absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-brand">{String(i + 1).padStart(2, '0')} / {String(families.length).padStart(2, '0')}</span>
                <img src={f.image} alt={f.alt} loading={i < 2 ? 'eager' : 'lazy'} className="max-h-full w-auto object-contain" />
              </div>
              <div>
                <Eyebrow>{f.label}</Eyebrow>
                <h2 id={`${f.slug}-h`} className="mt-4 text-[clamp(2rem,3.2vw,2.6rem)] leading-[1.08]">{f.name}</h2>
                <p className="lead mt-5">{f.description}</p>
                <dl className="mt-8 divide-y divide-line border-y border-line">
                  {f.specs.map(s => (
                    <div key={s.title} className="grid gap-3 py-4 sm:grid-cols-[130px_1fr]">
                      <dt className="pt-1 text-[14px] font-semibold">{s.title}</dt>
                      <dd><ul className="flex flex-wrap gap-2">{s.items.map(it => <li key={it} className="chip">{it}</li>)}</ul></dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={quoteLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Quote on WhatsApp</a>
                  <a href={emailLink(`Quotation: ${f.name}`, msg)} className="btn-outline"><Mail size={17} strokeWidth={1.75} /> Email your artwork</a>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="container-x pb-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-navy p-8 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.4rem)] !text-white">Unsure which format suits your product?</h2>
            <p className="mt-3 max-w-xl text-[17px] text-cyan">Send a photograph and the product dimensions. We will recommend a structure, board grade and finish, and quote for it.</p>
          </div>
          <a href={quoteLink('Hello ALL PACK, I would like advice on packaging for my product.')} target="_blank" rel="noopener noreferrer" className="btn-white shrink-0"><WhatsAppIcon size={18} /> Ask on WhatsApp</a>
        </div>
      </section>
    </main>
  );
}
