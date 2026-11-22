import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { company, families, articles, copy } = await getSite();
  const base = company.siteUrl;
  const pages: [string, number][] = [['', 1], ['/products', .9], ['/industries', .8], ['/why-all-pack', .8], ['/about', .7], ['/contact', .7], ['/insights', .7], ['/faq', .6], ['/privacy', .2], ['/terms', .2]];
  return [
    ...pages.map(([path, priority]) => ({
      url: `${base}${path}`, changeFrequency: 'monthly' as const, priority,
      ...(path === '/products' ? { images: families.map(f => `${base}${f.image}`) } : path === '' ? { images: [`${base}${copy['home.heroImage']}`] } : {}),
    })),
    ...articles.map(a => ({ url: `${base}/insights/${a.slug}`, lastModified: new Date(a.updatedAt), changeFrequency: 'monthly' as const, priority: .7, images: [`${base}${a.hero.src}`] })),
  ];
}
