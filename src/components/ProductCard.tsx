'use client';
import Link from 'next/link';
import { ArrowRight, Check, Plus } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useInquiry } from './Providers';
import { ProductImage } from './ProductImage';

export function ProductCard({ product, priority = false, index }: { product: Product; priority?: boolean; index?: number }) {
  const inquiry = useInquiry();
  const selected = inquiry.has(product.slug);
  return (
    <article className="group relative flex h-full flex-col rounded-[14px] border border-line bg-paper-deep p-3 transition lift hover:border-brand/40 hover:bg-white hover:shadow-card">
      <Link href={`/products/${product.slug}`} className="relative block overflow-hidden rounded-xl bg-white" aria-label={product.name} tabIndex={-1}>
        <ProductImage product={product} priority={priority} className="aspect-[5/4]" imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </Link>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <p className="text-[12px] font-semibold text-brand">{index !== undefined ? `${String(index + 1).padStart(2, '0')} · ` : ''}{product.category}</p>
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <h3 className="text-[19px] font-semibold leading-snug">
            <Link href={`/products/${product.slug}`} className="underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline">{product.name}</Link>
          </h3>
          <button
            type="button" onClick={() => (selected ? inquiry.remove(product.slug) : inquiry.add(product.slug, false))}
            aria-pressed={selected} aria-label={selected ? `Remove ${product.name} from quote list` : `Add ${product.name} to quote list`}
            title={selected ? 'In your quote list' : 'Add to quote list'}
            className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${selected ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-ink'}`}
          >
            {selected ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
        <p className="mt-2 line-clamp-2 flex-1 text-[15px] leading-relaxed text-muted">{product.description}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">Sizes and options <ArrowRight size={15} className="text-brand transition-transform group-hover:translate-x-1" /></p>
      </div>
    </article>
  );
}
