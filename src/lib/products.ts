import data from '@/data/products.json';

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
};

export const products = data as Product[];
export const categories = [...new Set(products.map(p => p.category))];
export const materialFilters = [...new Set(products.flatMap(p => p.materials))].sort();
export const useFilters = [...new Set(products.flatMap(p => p.uses))].sort();
export const findProduct = (slug: string) => products.find(p => p.slug === slug);
/** Studio photograph of the product (1600 px wide). */
export const productImage = (p: Pick<Product, 'model'>) => `/photos/${p.model}.webp`;
/** Smaller (800 px) version for cards and thumbnails. */
export const productThumb = (p: Pick<Product, 'model'>) => `/photos/${p.model}-800.webp`;
export const photo = (name: string, small = false) => `/photos/${name}${small ? '-800' : ''}.webp`;
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
  'Shipping & E-Commerce': 'mailer',
  'Premium & Retail': 'gift',
  'Food & Beverage': 'pizza',
  'Bags & Flexible': 'bag',
  'Protection & Supplies': 'tape',
  'Labels & Print': 'label',
  'Specialty Packaging': 'produce',
};
export const categoryBlurb: Record<string, string> = {
  'Shipping & E-Commerce': 'Mailers and corrugated cartons built for the courier and designed for the unboxing.',
  'Premium & Retail': 'Rigid boxes, cartons and printed packs that make products look worth more.',
  'Food & Beverage': 'Pizza, bakery, burger and takeaway packaging for kitchens that care about presentation.',
  'Bags & Flexible': 'Paper bags, courier mailers and stand-up pouches carrying your brand out the door.',
  'Protection & Supplies': 'Branded tape and protective wrap that finish the job properly.',
  'Labels & Print': 'Stickers, labels and printed tissue: the small touches people remember.',
  'Specialty Packaging': 'Produce, jewellery, footwear and heavy-duty cargo formats.',
};
