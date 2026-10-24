/* eslint-disable @next/next/no-img-element */
import type { Product } from '@/lib/products';
import { productImage } from '@/lib/products';

export function ProductImage({ product, className = '', imgClassName = '', priority = false, warm }: { product: Pick<Product, 'model' | 'name' | 'materials'>; className?: string; imgClassName?: string; priority?: boolean; warm?: boolean }) {
  const isWarm = warm ?? product.materials.some(m => /kraft|corrugated/i.test(m));
  return (
    <div className={`relative overflow-hidden ${isWarm ? 'tile-warm' : 'tile'} ${className}`}>
      <img
        src={productImage(product)} alt={`${product.name} by ALL PACK`} width={1200} height={900}
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"
        className={`h-full w-full object-contain ${imgClassName}`}
      />
    </div>
  );
}
