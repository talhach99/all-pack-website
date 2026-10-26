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
    <article className="group relative flex h-full flex-col">
      <Link href={`/products/${product.slug}`} className="relative block overflow-hidden rounded-[20px]" aria-label={product.name} tabIndex={-1}>
        <ProductImage product={product} priority={priority} className="aspect-[5/4]" imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.045]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-ink/75 backdrop-blur">{product.category}</span>
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.45rem] font-normal leading-snug">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] hover:text-brass-dark">{product.name}</Link>
          </h3>
          <button
            type="button" onClick={() => (selected ? inquiry.remove(product.slug) : inquiry.add(product.slug, false))}
            aria-pressed={selected} aria-label={selected ? `Remove ${product.name} from quote list` : `Add ${product.name} to quote list`}
            title={selected ? 'In your quote list' : 'Add to quote list'}
            className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${selected ? 'border-ink bg-ink text-brass-light' : 'border-line bg-paper-light text-ink hover:border-ink'}`}
          >
            {selected ? <Check size={17} /> : <Plus size={17} />}
          </button>
        </div>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">{product.description}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink/80 transition-colors group-hover:text-brass-dark">View options &amp; sizes <ArrowUpRight size={15} /></p>
      </div>
    </article>
  );
}
