import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ProductCatalog } from '@/components/ProductCatalog';
import { categoryFromSlug, products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Packaging Products',
  description: `Browse ${products.length} custom packaging formats from ALL PACK: mailer boxes, rigid boxes, food packaging, bags, pouches, labels and more. Add to your list and request one quote.`,
  alternates: { canonical: '/products' },
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const { category } = await searchParams;
  const initial = categoryFromSlug(Array.isArray(category) ? category[0] : category);
  return (
    <main>
      <PageHero kicker="Products" title={<>Every kind of package. <span className="accent">One partner.</span></>} description="Browse by collection, material or industry. Tap + to add products to your quote list and get one combined price.">
        <Link href="/studio" className="btn-light">Or design one in 3D <ArrowRight size={16} /></Link>
      </PageHero>
      <section className="container-x pb-28">
        <ProductCatalog initialCategory={initial} />
      </section>
    </main>
  );
}
