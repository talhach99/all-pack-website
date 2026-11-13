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
        <ProductImage product={product} priority={priority} className="aspect-square sm:aspect-[5/4]" sizes="(min-width: 1024px) 33vw, 50vw" />
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <p className="hidden text-[13px] text-muted sm:block">{product.category}</p>
        <div className="flex items-start justify-between gap-2 sm:mt-1 sm:gap-4">
          <h3 className="text-[15px] font-medium leading-snug text-ink sm:text-[17px]">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] hover:text-brand">{product.name}</Link>
          </h3>
          <button
            type="button" onClick={() => (selected ? inquiry.remove(product.slug) : inquiry.add(product.slug, false))}
            aria-pressed={selected} aria-label={selected ? `Remove ${product.name} from quote list` : `Add ${product.name} to quote list`}
            title={selected ? 'In your quote list' : 'Add to quote list'}
            className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${selected ? 'border-brand bg-brand text-white' : 'border-line bg-white text-secondary hover:border-ink/30 hover:text-ink'}`}
          >
            {selected ? <Check size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
          </button>
        </div>
        <div className="mt-2 hidden flex-1 sm:block"><p className="line-clamp-2 text-[14px] leading-relaxed text-secondary">{product.description}</p></div>
        <p className="mt-4 hidden items-center gap-1.5 text-[14px] font-medium text-ink sm:inline-flex">Sizes and options <ArrowRight size={16} strokeWidth={1.5} className="text-muted transition-transform duration-150 group-hover:translate-x-0.5" /></p>
      </div>
    </article>
  );
}
