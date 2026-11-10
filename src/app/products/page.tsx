import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Ruler, Palette, Truck } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SectionHead } from '@/components/Section';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { categoryFromSlug, categories, products } from '@/lib/products';
import { quoteLink, whatsappLink } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Shop Packaging',
  description: 'Browse 22 packaging formats from ALL PACK: shipping cartons, mailer boxes, rigid gift boxes, food packaging, bags, pouches, labels and stickers. Made to measure in Lahore.',
  alternates: { canonical: '/products' },
};

const custom = [
  { icon: Ruler, t: 'Any size', d: 'Every format can be made to your exact dimensions, so the pack fits the product.' },
  { icon: Palette, t: 'Your print and finish', d: 'Full colour, foil, soft-touch or natural kraft, matched to your brand.' },
  { icon: Truck, t: 'Delivered nationwide', d: 'Packed and delivered on the agreed date, anywhere in Pakistan.' },
];

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { category } = await searchParams;
  const initial = categoryFromSlug(Array.isArray(category) ? category[0] : category);
  return (
    <main>
      <PageHero kicker="Shop" title={<>Packaging for every product you sell</>} description="Browse by collection, material or industry. Tap + on any product to add it to your quote list and get one combined price." crumbs={[{ text: 'Shop' }]}
        aside={
          <dl className="grid grid-cols-2 gap-4">
            {[[String(products.length), 'Packaging formats'], [String(categories.length), 'Collections'], ['Any', 'Custom size'], ['24h', 'Quote reply']].map(([n, l]) => (
              <div key={l} className="rounded-xl border border-line bg-white p-6"><dt className="sr-only">{l}</dt><dd className="text-[32px] font-medium leading-none tabular-nums text-ink">{n}</dd><dd className="mt-2 text-[13px] text-muted">{l}</dd></div>
            ))}
          </dl>
        }>
        <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
      </PageHero>

      <section className="section bg-white !pt-14">
        <div className="container-x">
          <SectionHead n={1} kicker="Catalogue" title="Browse the full range" className="mb-8" />
          <ProductCatalog initialCategory={initial} />
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="container-x">
          <SectionHead n={2} kicker="Made for you" title="Don't see the exact pack you need?" sub="Most of what we make is custom. Send a size, a photo or a sketch and we will engineer the right structure for it." action={{ text: 'Start a custom quote', href: quoteLink() }} light />
          <div className="grid gap-6 md:grid-cols-3">
            {custom.map((c, i) => (
              <div key={c.t} className="rounded-xl border border-white/10 bg-white/[.04] p-7">
                <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand"><c.icon size={20} /></span><span className="text-[13px] font-semibold text-cyan">0{i + 1}</span></div>
                <h3 className="mt-6 text-xl font-semibold text-white">{c.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cream/65">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={whatsappLink('Hello ALL PACK, I need a custom packaging size.') || '/contact'} target="_blank" rel="noopener noreferrer" className="btn border-[1.5px] border-white/40 text-white hover:border-white"><WhatsAppIcon size={17} /> Send a photo on WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
