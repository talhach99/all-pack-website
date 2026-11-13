import type { Metadata } from 'next';
import { Ruler, Palette, Truck } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SectionHead } from '@/components/Section';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { categoryFromSlug, products } from '@/lib/products';
import { quoteLink, whatsappLink } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Printed folding cartons, rigid gift boxes, shipping boxes, pizza, burger and bakery boxes, bags, pouches and labels from ALL PACK. Made to measure in Lahore.',
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
      <PageHero kicker="Products" title={<>Packaging for every product you sell</>} description="Every format is printed and finished in our Lahore plant, made to your size. Tap + on any product to add it to one combined quote." crumbs={[{ text: 'Products' }]}>
        <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
      </PageHero>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead kicker="Catalogue" title={`All ${products.length} packaging formats`} className="mb-8" />
          <ProductCatalog initialCategory={initial} />
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-x">
          <SectionHead kicker="Made for you" title="Don't see the exact pack you need?" sub="Most of what we make is custom. Send a size, a photo or a sketch and we will engineer the right structure for it." />
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {custom.map(c => (
              <div key={c.t} className="border-t border-ink/10 pt-6">
                <c.icon size={18} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium">{c.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={whatsappLink('Hello ALL PACK, I need a custom packaging size.') || quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Send a photo on WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
