/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const img = (name: string) => `/images/home/${name}.webp`;

const styles = [
  { slug: 'ecommerce-mailer-boxes', name: 'Mailer boxes', image: 'mailer-boxes' },
  { slug: 'rigid-gift-boxes', name: 'Rigid gift boxes', image: 'rigid-drawer-box' },
  { slug: 'corrugated-shipping-boxes', name: 'Shipping cartons', image: 'shipping-carton' },
  { slug: 'folding-cartons', name: 'Folding cartons', image: 'folding-carton' },
  { slug: 'takeaway-containers', name: 'Food boxes', image: 'food-boxes' },
  { slug: 'cake-boxes', name: 'Bakery boxes', image: 'bakery-box' },
  { slug: 'kraft-shopping-bags', name: 'Paper bags', image: 'paper-bag' },
  { slug: 'labels-stickers', name: 'Labels and stickers', image: 'stickers' },
];

/** Photo cards for the main packaging styles, each linking to its product page. */
export function BoxStyles() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
      {styles.map(s => (
        <Link key={s.name} href={`/products/${s.slug}`} className="group block">
          <span className="block aspect-[1.05] overflow-hidden rounded-xl bg-mist">
            <img src={img(s.image)} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
          </span>
          <span className="mt-3 flex items-center justify-between gap-2">
            <span className="text-[15px] font-medium text-ink transition-colors group-hover:text-brand">{s.name}</span>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-brand" />
          </span>
        </Link>
      ))}
    </div>
  );
}
