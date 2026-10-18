import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';
import { products } from '@/lib/products';
import { articles } from '@/data/articles';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.siteUrl.replace(/\/$/, '');
  const routes = ['', '/about', '/products', '/studio', '/gallery', '/journal', '/contact', '/faq', '/quote'];
  return [
    ...routes.map(path => ({url:`${base}${path}`,changeFrequency:'monthly' as const,priority:path===''?1:path==='/products'?.9:.7})),
    ...products.map(product=>({url:`${base}/products/${product.slug}`,changeFrequency:'monthly' as const,priority:.65})),
    ...articles.map(article=>({url:`${base}/journal/${article.slug}`,changeFrequency:'yearly' as const,priority:.55})),
  ];
}
