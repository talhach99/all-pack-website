'use client';
import Link from 'next/link';
import { ArrowRight, Check, Plus } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useInquiry } from './Providers';
import { ProductImage } from './ProductImage';

/**
 * Product card. Colours are set on the card itself so it reads the same
 * on white, grey or dark sections (titles used to inherit white on dark bands).
 */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean; index?: number }) {
  const inquiry = useInquiry();
  const selected = inquiry.has(product.slug);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink transition-colors hover:border-ink/20">
      <Link href={`/products/${product.slug}`} className="relative block bg-mist" aria-label={product.name} tabIndex={-1}>
        <ProductImage product={product} priority={priority} className="aspect-[5/4]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[13px] text-muted">{product.category}</p>
        <div className="mt-1 flex items-start justify-between gap-4">
          <h3 className="text-[17px] font-medium leading-snug text-ink">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] hover:text-brand">{product.name}</Link>
          </h3>
          <button
            type="button" onClick={() => (selected ? inquiry.remove(product.slug) : inquiry.add(product.slug, false))}
            aria-pressed={selected} aria-label={selected ? `Remove ${product.name} from quote list` : `Add ${product.name} to quote list`}
            title={selected ? 'In your quote list' : 'Add to quote list'}
            className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors ${selected ? 'border-brand bg-brand text-white' : 'border-line bg-white text-secondary hover:border-ink/30 hover:text-ink'}`}
          >
            {selected ? <Check size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
          </button>
        </div>
        <p className="mt-2 line-clamp-2 flex-1 text-[14px] leading-relaxed text-secondary">{product.description}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">Sizes and options <ArrowRight size={16} strokeWidth={1.5} className="text-muted transition-transform duration-150 group-hover:translate-x-0.5" /></p>
      </div>
    </article>
  );
}
