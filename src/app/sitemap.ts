import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';
import { products } from '@/lib/products';
import { articles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.siteUrl;
  const routes = ['', '/products', '/studio', '/quote', '/gallery', '/about', '/insights', '/contact', '/faq', '/privacy'];
  return [
    ...routes.map(path => ({ url: `${base}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : path === '/products' ? .9 : .7 })),
    ...products.map(p => ({ url: `${base}/products/${p.slug}`, changeFrequency: 'monthly' as const, priority: .8, images: [`${base}/renders/${p.model}.webp`] })),
    ...articles.map(a => ({ url: `${base}/insights/${a.slug}`, changeFrequency: 'yearly' as const, priority: .5 })),
  ];
}
