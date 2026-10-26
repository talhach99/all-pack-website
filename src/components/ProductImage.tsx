import type { Product } from '@/lib/products';
import { Photo } from './Photo';

export function ProductImage({ product, className = '', imgClassName = '', priority = false, sizes }: { product: Pick<Product, 'model' | 'name' | 'materials'>; className?: string; imgClassName?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-paper-deep ${className}`}>
      <Photo name={product.model} alt={`${product.name} by ALL PACK`} priority={priority} className={imgClassName} sizes={sizes} />
    </div>
  );
}
