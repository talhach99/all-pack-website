import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';
import { articles } from '@/data/articles';
import { families } from '@/data/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.siteUrl;
  const pages: [string, number][] = [['', 1], ['/products', .9], ['/industries', .8], ['/about', .7], ['/contact', .7], ['/insights', .6], ['/faq', .6], ['/privacy', .2], ['/terms', .2]];
  return [
    ...pages.map(([path, priority]) => ({
      url: `${base}${path}`, changeFrequency: 'monthly' as const, priority,
      ...(path === '/products' ? { images: families.map(f => `${base}${f.image}`) } : path === '' ? { images: [`${base}/renders/packaging-range.webp`] } : {}),
    })),
    ...articles.map(a => ({ url: `${base}/insights/${a.slug}`, changeFrequency: 'yearly' as const, priority: .5 })),
  ];
}
