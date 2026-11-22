import { guard } from '@/lib/auth';
import { getDb, kvSet } from '@/lib/db';
import { COMPANY } from '@/lib/company';
import { COPY } from '@/data/copy';
import { COMPANY_KEYS, defaultCollections, defaultSeo, loadOverrides, type Collections, type Overrides } from '@/lib/site';

export const dynamic = 'force-dynamic';
const noStore = { 'cache-control': 'no-store' };

export async function GET(req: Request) {
  const denied = await guard(req); if (denied) return denied;
  const db = await getDb();
  const company: Record<string, string> = {};
  for (const k of COMPANY_KEYS) company[k] = String((COMPANY as Record<string, unknown>)[k] ?? '');
  return Response.json({ dbConnected: !!db, overrides: await loadOverrides(), defaults: { company, copy: COPY, collections: defaultCollections(), seo: defaultSeo() } }, { headers: noStore });
}

const UNSAFE = /^\s*(javascript|data|vbscript):/i;
function clean(v: unknown, depth = 0): unknown {
  if (depth > 12) throw new Error('Content is nested too deeply');
  if (typeof v === 'string') { if (UNSAFE.test(v)) throw new Error('A link or image address is not allowed'); return v.slice(0, 20000); }
  if (typeof v === 'number' || typeof v === 'boolean' || v === null) return v;
  if (Array.isArray(v)) return v.slice(0, 500).map(x => clean(x, depth + 1));
  if (typeof v === 'object') { const o: Record<string, unknown> = {}; for (const [k, x] of Object.entries(v as object)) if (k !== '__proto__') o[k] = clean(x, depth + 1); return o; }
  return undefined;
}

const COLLECTION_KEYS: (keyof Collections)[] = ['families', 'sectors', 'faqs', 'machines', 'reasons', 'process', 'principles', 'clients', 'articles'];
const slugify = (s: string) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

/** Replaces whole sections. Sending null for a section (or a key) puts it back to the built-in default. */
export async function PUT(req: Request) {
  const denied = await guard(req); if (denied) return denied;
  if (!(await getDb())) return Response.json({ error: 'The database is not connected yet, so changes cannot be saved.' }, { status: 503 });
  let body: Partial<Record<'company' | 'copy' | 'collections' | 'seo', unknown>>;
  try { body = await req.json(); } catch { return Response.json({ error: 'Invalid request' }, { status: 400 }); }
  if (JSON.stringify(body).length > 1_500_000) return Response.json({ error: 'Too much content in one save' }, { status: 413 });
  const next: Overrides = await loadOverrides();
  try {
    if ('company' in body) {
      if (body.company === null) delete next.company;
      else { const o: Record<string, string> = {}; for (const k of COMPANY_KEYS) { const v = (body.company as Record<string, unknown>)?.[k]; if (typeof v === 'string' && v.trim()) o[k] = String(clean(v.trim())); } next.company = o; }
    }
    if ('copy' in body) {
      if (body.copy === null) delete next.copy;
      else {
        const known = new Set(COPY.map(c => c.key)); const o: Record<string, string> = {};
        for (const [k, v] of Object.entries((body.copy ?? {}) as Record<string, unknown>)) if (known.has(k) && typeof v === 'string' && v.trim()) o[k] = String(clean(v));
        next.copy = o;
      }
    }
    if ('seo' in body) {
      if (body.seo === null) delete next.seo;
      else {
        const valid = new Set(Object.keys(defaultSeo())); const o: Record<string, { title: string; description: string }> = {};
        for (const [k, v] of Object.entries((body.seo ?? {}) as Record<string, { title?: unknown; description?: unknown }>)) {
          if (!valid.has(k) && !k.startsWith('article:')) continue;
          if (typeof v?.title === 'string' && typeof v?.description === 'string') o[k] = { title: String(clean(v.title)), description: String(clean(v.description)) };
        }
        next.seo = o;
      }
    }
    if ('collections' in body) {
      const inc = (body.collections ?? {}) as Record<string, unknown>;
      const cur: Partial<Collections> = { ...(next.collections ?? {}) };
      for (const k of COLLECTION_KEYS) {
        if (!(k in inc)) continue;
        if (inc[k] === null) { delete cur[k]; continue; }
        if (!Array.isArray(inc[k])) throw new Error(`${k} must be a list`);
        let list = clean(inc[k]) as Record<string, unknown>[];
        if (k === 'families' || k === 'sectors' || k === 'articles') {
          const seen = new Set<string>();
          list = list.map(x => {
            let s = slugify(String(x.slug || x.name || x.title || '')) || `item-${seen.size + 1}`; const base = s; let n = 2;
            while (seen.has(s)) s = `${base}-${n++}`;
            seen.add(s); return { ...x, slug: s };
          });
        }
        if (k === 'articles') {
          const today = new Date().toISOString().slice(0, 10);
          const before = (cur.articles ?? defaultCollections().articles) as unknown as Record<string, unknown>[];
          list = list.map(a => {
            const old = before.find(b => b.slug === a.slug);
            const same = old && JSON.stringify({ ...old, updatedAt: '' }) === JSON.stringify({ ...a, updatedAt: '' });
            return { ...a, publishedAt: (a.publishedAt as string) || today, updatedAt: same ? (old.updatedAt as string) : today };
          });
        }
        (cur as Record<string, unknown>)[k] = list;
      }
      next.collections = cur;
    }
  } catch (e) { return Response.json({ error: (e as Error).message }, { status: 400 }); }
  await kvSet('content', next);
  return Response.json({ ok: true, overrides: next }, { headers: noStore });
}
