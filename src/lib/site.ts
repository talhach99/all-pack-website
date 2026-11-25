import { cache } from 'react';
import { COMPANY, CLIENTS, makeLinks, formatPhonePK, type Client, type Company } from './company';
import { kvGet } from './db';
import { articles as defArticles, type Article } from '@/data/articles';
import { PAGE_SEO, ARTICLE_SEO, type Seo } from '@/data/seo';
import { COPY_DEFAULTS } from '@/data/copy';
import { HERO_SLIDES, CATALOG, NEW_ARRIVALS, INDUSTRIES, STEPS, HOME_FAQ, HOW_FAQ, type HeroSlide, type CatalogSection, type CatalogItem, type Industry, type OrderStep } from '@/data/home';

export type Faq = { q: string; a: string };

export const COMPANY_KEYS = ['name', 'tagline', 'email', 'phone', 'whatsapp', 'usPhone', 'usWhatsapp', 'usAddress', 'address', 'street', 'city', 'instagram', 'facebook', 'linkedin'] as const;
export type CompanyKey = (typeof COMPANY_KEYS)[number];

/** Lists the owner edits in the admin panel (one tab each). Defaults come from src/data/home.ts and friends. */
export type Collections = {
  heroSlides: HeroSlide[]; catalog: CatalogSection[]; newArrivals: CatalogItem[]; industries: Industry[]; steps: OrderStep[];
  homeFaqs: Faq[]; howFaqs: Faq[]; clients: Client[]; articles: Article[];
};
export const COLLECTION_KEYS: (keyof Collections)[] = ['heroSlides', 'catalog', 'newArrivals', 'industries', 'steps', 'homeFaqs', 'howFaqs', 'clients', 'articles'];
export type SeoMap = Record<string, { title: string; description: string }>;

/** What the owner has changed in the admin panel. Anything missing falls back to the built-in default. */
export type Overrides = { company?: Partial<Record<CompanyKey, string>>; copy?: Record<string, string>; collections?: Partial<Collections>; seo?: SeoMap };

export const defaultCollections = (): Collections => ({
  heroSlides: HERO_SLIDES, catalog: CATALOG, newArrivals: NEW_ARRIVALS, industries: INDUSTRIES, steps: STEPS,
  homeFaqs: HOME_FAQ, howFaqs: HOW_FAQ, clients: CLIENTS, articles: defArticles,
});
export const defaultSeo = (): SeoMap => {
  const m: SeoMap = {};
  for (const [k, v] of Object.entries(PAGE_SEO as Record<string, Seo>)) m[`page:${k}`] = { title: v.title, description: v.description };
  for (const [k, v] of Object.entries(ARTICLE_SEO)) m[`article:${k}`] = { title: v.title, description: v.description };
  return m;
};

export async function loadOverrides(): Promise<Overrides> {
  try { return (await kvGet<Overrides>('content')) ?? {}; } catch { return {}; }
}

export type Site = Collections & {
  company: Company; links: ReturnType<typeof makeLinks>; copy: Record<string, string>; seo: SeoMap;
  /** Title/description for a page (key such as "home") or guide ("article:slug"). */
  seoFor: (key: string) => Seo;
};

/** A slide keeps its phone-sized picture only while it uses one of the built-in hero photos. */
function fixSlides(list: HeroSlide[]): HeroSlide[] {
  return list.map(sl => ({ ...sl, srcSet: HERO_SLIDES.find(h => h.image === sl.image)?.srcSet ?? '', bg: sl.bg || '#EDE6DC', tab: sl.tab || sl.kicker }));
}

export function buildSite(o: Overrides): Site {
  const company: Company = { ...COMPANY };
  for (const k of COMPANY_KEYS) { const v = o.company?.[k]; if (typeof v === 'string' && v.trim() !== '') (company as Record<string, string>)[k] = v.trim(); }
  company.phone = formatPhonePK(company.phone);
  company.whatsapp = company.whatsapp.replace(/\D/g, '');
  company.usWhatsapp = company.usWhatsapp.replace(/\D/g, '');
  const d = defaultCollections(), c = o.collections ?? {};
  const copy: Record<string, string> = { ...COPY_DEFAULTS };
  for (const [k, v] of Object.entries(o.copy ?? {})) if (k in copy && typeof v === 'string' && v.trim() !== '') copy[k] = v;
  const seo: SeoMap = { ...defaultSeo(), ...(o.seo ?? {}) };
  const absolute = new Set(Object.entries(PAGE_SEO as Record<string, Seo>).filter(([, v]) => v.absolute).map(([k]) => k));
  return {
    company, links: makeLinks(company), copy, seo,
    heroSlides: fixSlides(c.heroSlides ?? d.heroSlides), catalog: c.catalog ?? d.catalog, newArrivals: c.newArrivals ?? d.newArrivals,
    industries: c.industries ?? d.industries, steps: c.steps ?? d.steps, homeFaqs: c.homeFaqs ?? d.homeFaqs, howFaqs: c.howFaqs ?? d.howFaqs,
    clients: c.clients ?? d.clients, articles: c.articles ?? d.articles,
    seoFor: key => {
      const s = seo[key.startsWith('article:') ? key : `page:${key}`] ?? { title: '', description: '' };
      return { title: s.title, description: s.description, ...(absolute.has(key) ? { absolute: true } : {}) };
    },
  };
}

/** The site as visitors should see it right now (built-in content plus the owner's saved changes). One database read per request. */
export const getSite = cache(async (): Promise<Site> => buildSite(await loadOverrides()));

export const seoTitleOf = (s: Seo) => (s.absolute ? { absolute: s.title } : s.title);

/** Search title, description and canonical address for a page, using the owner's saved wording. */
export async function pageMeta(key: string, path: string, extra: import('next').Metadata = {}): Promise<import('next').Metadata> {
  const s = (await getSite()).seoFor(key);
  return { title: seoTitleOf(s), description: s.description, alternates: { canonical: path }, ...extra };
}
