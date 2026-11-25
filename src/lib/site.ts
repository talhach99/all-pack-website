import { cache } from 'react';
import { COMPANY, CLIENTS, makeLinks, formatPhonePK, type Client, type Company } from './company';
import { kvGet } from './db';
import { families as defFamilies, sectors as defSectors, machines as defMachines, reasons as defReasons, process as defProcess, principles as defPrinciples, type Family, type Sector } from '@/data/catalog';
import { faqs as defFaqs } from '@/data/faqs';
import { articles as defArticles, type Article } from '@/data/articles';
import { PAGE_SEO, ARTICLE_SEO, type Seo } from '@/data/seo';
import { COPY_DEFAULTS } from '@/data/copy';

export type Faq = { q: string; a: string };
export type Machine = { name: string; type: string; text: string; best: string[]; image: string };
export type Reason = { badge: 'iso' | 'halal' | '25+' | 'factory'; title: string; text: string };
export type Step = { step: string; title: string; text: string };
export type Principle = { title: string; text: string };

export const COMPANY_KEYS = ['name', 'tagline', 'email', 'phone', 'whatsapp', 'usPhone', 'usWhatsapp', 'usAddress', 'address', 'street', 'city', 'instagram', 'facebook', 'linkedin'] as const;
export type CompanyKey = (typeof COMPANY_KEYS)[number];

export type Collections = {
  families: Family[]; sectors: Sector[]; faqs: Faq[]; machines: Machine[]; reasons: Reason[]; process: Step[]; principles: Principle[]; clients: Client[]; articles: Article[];
};
export type SeoMap = Record<string, { title: string; description: string }>;

/** What the owner has changed in the admin panel. Anything missing falls back to the built-in default. */
export type Overrides = { company?: Partial<Record<CompanyKey, string>>; copy?: Record<string, string>; collections?: Partial<Collections>; seo?: SeoMap };

export const defaultCollections = (): Collections => ({
  families: defFamilies, sectors: defSectors, faqs: defFaqs, machines: defMachines as Machine[], reasons: defReasons, process: defProcess, principles: defPrinciples, clients: CLIENTS, articles: defArticles,
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
    families: c.families ?? d.families, sectors: c.sectors ?? d.sectors, faqs: c.faqs ?? d.faqs, machines: c.machines ?? d.machines,
    reasons: c.reasons ?? d.reasons, process: c.process ?? d.process, principles: c.principles ?? d.principles, clients: c.clients ?? d.clients, articles: c.articles ?? d.articles,
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
