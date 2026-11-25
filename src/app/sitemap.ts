import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/site';
import { CATALOG, HERO_SLIDES } from '@/data/home';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { company, articles } = await getSite();
  const base = company.siteUrl;
  const pages: [string, number][] = [['', 1], ['/products', .9], ['/industries', .8], ['/finishes', .8], ['/how-it-works', .8], ['/blog', .7], ['/about', .7], ['/contact', .7], ['/privacy', .2], ['/terms', .2], ['/shipping', .2]];
  return [
    ...pages.map(([path, priority]) => ({
      url: `${base}${path}`, changeFrequency: 'monthly' as const, priority,
      ...(path === '/products' ? { images: CATALOG.flatMap(s => s.items).filter(i => i.src).map(i => `${base}${i.src}`) } : path === '' ? { images: HERO_SLIDES.map(h => `${base}${h.image}`) } : {}),
    })),
    ...articles.map(a => ({ url: `${base}/blog/${a.slug}`, lastModified: new Date(a.updatedAt), changeFrequency: 'monthly' as const, priority: .7, images: [`${base}${a.hero.src}`] })),
  ];
}
