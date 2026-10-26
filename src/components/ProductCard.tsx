'use client';
import Link from 'next/link';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useInquiry } from './Providers';
import { ProductImage } from './ProductImage';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const inquiry = useInquiry();
  const selected = inquiry.has(product.slug);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-paper-light transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <Link href={`/products/${product.slug}`} className="relative block overflow-hidden" aria-label={product.name}>
        <ProductImage product={product} priority={priority} className="aspect-[4/3.2]" imgClassName="p-5 mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-[1.06]" />
        <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-1 place-items-center rounded-full bg-paper-light/90 opacity-0 shadow-card backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[.18em] text-brass">{product.category}</p>
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-normal leading-snug sm:text-[1.6rem]">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">{product.name}</Link>
          </h3>
          <button
            type="button" onClick={() => (selected ? inquiry.remove(product.slug) : inquiry.add(product.slug, false))}
            aria-pressed={selected} aria-label={selected ? `Remove ${product.name} from quote list` : `Add ${product.name} to quote list`}
            className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${selected ? 'border-ink bg-ink text-brass-light' : 'border-line bg-paper-light text-ink hover:border-ink'}`}
          >
            {selected ? <Check size={17} /> : <Plus size={17} />}
          </button>
        </div>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">{product.description}</p>
      </div>
    </article>
  );
}
