import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';
import { products, productImage } from '@/lib/products';
import { photoUrl } from '@/lib/photos';
import { articles } from '@/data/articles';
import { industries } from '@/data/industries';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.siteUrl;
  const absolute = (u: string) => (u.startsWith('http') ? u : `${base}${u}`);
  const routes = ['', '/products', '/industries', '/about', '/insights', '/contact', '/faq', '/privacy', '/terms'];
  return [
    ...routes.map(path => ({ url: `${base}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : path === '/products' ? .9 : .7 })),
    ...products.map(p => ({ url: `${base}/products/${p.slug}`, changeFrequency: 'monthly' as const, priority: .8, images: [absolute(productImage(p))] })),
    ...industries.map(i => ({ url: `${base}/industries/${i.slug}`, changeFrequency: 'monthly' as const, priority: .8, images: [absolute(photoUrl(i.image))] })),
    ...articles.map(a => ({ url: `${base}/insights/${a.slug}`, changeFrequency: 'yearly' as const, priority: .5 })),
  ];
}
