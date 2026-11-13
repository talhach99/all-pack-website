import data from '@/data/products.json';
import { photoUrl } from './photos';

export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  materials: string[];
  sizes: string[];
  customization: string[];
  moq: string;
  uses: string[];
  hue: string;
  model: string;
  featured?: boolean;
  /** Extra selling points shown on the product page. */
  features?: [string, string][];
  /** Photo names for the product gallery (first is the main photo). */
  gallery?: string[];
};

export const products = data as Product[];
export const categories = [...new Set(products.map(p => p.category))];
export const materialFilters = [...new Set(products.flatMap(p => p.materials))].sort();
export const useFilters = [...new Set(products.flatMap(p => p.uses))].sort();
export const findProduct = (slug: string) => products.find(p => p.slug === slug);
/** Studio photograph of the product (1600 px wide). */
export const productImage = (p: Pick<Product, 'model'>) => photoUrl(p.model);
/** Smaller (800 px) version for cards and thumbnails. */
export const productThumb = (p: Pick<Product, 'model'>) => photoUrl(p.model, true);
export const photo = (name: string, small = false) => photoUrl(name, small);
/** Close-up finish photography that best matches a product's materials. */
export function finishShot(p: Pick<Product, 'materials' | 'category'>): { name: string; label: string } {
  const m = p.materials.join(' ').toLowerCase();
  if (/rigid|art paper/.test(m)) return { name: 'fin_foil', label: 'Foil stamping on a wrapped rigid lid' };
  if (/kraft|corrugated/.test(m)) return { name: 'fin_kraft', label: 'One-colour print on natural kraft board' };
  if (/film|laminate|polyethylene|bopp/.test(m)) return { name: 'fin_soft', label: 'Soft-touch matte finish' };
  return { name: 'fin_print', label: 'Full-colour print with metallic accents' };
}
export const categorySlug = (c: string) => c.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const categoryFromSlug = (s?: string) => categories.find(c => categorySlug(c) === s || c === s) || '';

/** Hero product per collection, used for collection imagery. */
export const categoryCover: Record<string, string> = {
  'Shipping boxes': 'mailer',
  'Cartons and gift boxes': 'carton',
  'Food packaging': 'pizza',
  'Bags, pouches and labels': 'label',
};
export const categoryBlurb: Record<string, string> = {
  'Shipping boxes': 'Corrugated shippers, mailers and produce cartons built for the courier and the warehouse.',
  'Cartons and gift boxes': 'Printed folding cartons and rigid gift boxes that make products look worth more.',
  'Food packaging': 'Pizza, burger and bakery boxes for kitchens that care about presentation.',
  'Bags, pouches and labels': 'Paper bags, stand-up pouches and labels that carry the brand out the door.',
};
