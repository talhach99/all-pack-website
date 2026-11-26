'use client';
import { useMemo, useState } from 'react';
import type { CopyField } from '@/data/copy';
import { ImageField } from './Media';
import { inputCls, Label, SaveBar } from './ui';

type Obj = Record<string, string>;
const COMPANY_FIELDS: { k: string; label: string; hint?: string }[] = [
  { k: 'phone', label: 'Phone number shown on the site', hint: 'For example 0321-8444590. It is shown as +92 321 8444590.' },
  { k: 'whatsapp', label: 'WhatsApp number', hint: 'Digits with country code and no plus sign, for example 923218444590. All WhatsApp buttons use this.' },
  { k: 'usPhone', label: 'Boston (USA) number shown on the site', hint: 'For example +1 313 729 1534.' },
  { k: 'usWhatsapp', label: 'Boston (USA) WhatsApp number', hint: 'Digits with country code and no plus sign, for example 13137291534.' },
  { k: 'usAddress', label: 'Boston office address (one line)', hint: 'For example Boston, Massachusetts' },
  { k: 'email', label: 'Email address' },
  { k: 'address', label: 'Address (one line, as shown on the site)' },
  { k: 'street', label: 'Street line (for Google)', hint: 'For example Royal Park, Lakshmi Chowk' },
  { k: 'city', label: 'City' },
  { k: 'name', label: 'Company name' },
  { k: 'tagline', label: 'Tagline' },
  { k: 'instagram', label: 'Instagram link (optional)', hint: 'Full address starting with https://' },
  { k: 'facebook', label: 'Facebook link (optional)' },
  { k: 'linkedin', label: 'LinkedIn link (optional)' },
];

/** Contact details used everywhere: header, footer, buttons, contact page and Google listing data. */
export function SettingsPanel({ defaults, saved, saving, onSave, onReset }: { defaults: Obj; saved: Obj; saving: boolean; onSave: (v: Obj) => Promise<boolean>; onReset: () => void }) {
  const [v, setV] = useState<Obj>({ ...defaults, ...saved });
  const [dirty, setDirty] = useState(false);
  return (
    <div>
      <p className="mb-6 max-w-3xl text-[15px] text-secondary">Change a detail here and every place it appears on the website updates: the header, footer, floating WhatsApp button, contact page and every “Request a quote” button.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        {COMPANY_FIELDS.map(f => <label key={f.k} className={`block ${['address'].includes(f.k) ? 'sm:col-span-2' : ''}`}><Label hint={f.hint}>{f.label}</Label><input className={inputCls} value={v[f.k] ?? ''} onChange={e => { setV({ ...v, [f.k]: e.target.value }); setDirty(true); }} /></label>)}
      </div>
      <SaveBar dirty={dirty} saving={saving} onSave={async () => { if (await onSave(v)) setDirty(false); }} onReset={Object.keys(saved).length ? onReset : undefined} resetLabel="Restore original details" />
    </div>
  );
}

/** All page wording and page pictures, grouped by page. */
export function PagesPanel({ fields, saved, saving, onSave, onReset }: { fields: CopyField[]; saved: Obj; saving: boolean; onSave: (v: Obj) => Promise<boolean>; onReset: () => void }) {
  const groups = useMemo(() => { const m = new Map<string, CopyField[]>(); fields.forEach(f => m.set(f.group, [...(m.get(f.group) ?? []), f])); return [...m.entries()]; }, [fields]);
  const [v, setV] = useState<Obj>(() => Object.fromEntries(fields.map(f => [f.key, saved[f.key] ?? f.def])));
  const [dirty, setDirty] = useState(false);
  const set = (k: string, val: string) => { setV(x => ({ ...x, [k]: val })); setDirty(true); };
  const diff = () => Object.fromEntries(fields.filter(f => v[f.key] !== f.def && v[f.key].trim() !== '').map(f => [f.key, v[f.key]]));
  return (
    <div>
      <p className="mb-6 max-w-3xl text-[15px] text-secondary">The words and pictures on each page. Clear a box to go back to the original wording. Product, industry, FAQ, client and guide lists have their own tabs.</p>
      <div className="grid gap-3">
        {groups.map(([g, fs], gi) => (
          <details key={g} className="rounded-xl border border-line bg-white" open={gi === 0}>
            <summary className="cursor-pointer list-none px-4 py-3.5 text-[15px] font-semibold sm:px-5">{g} <span className="font-normal text-muted">({fs.length})</span></summary>
            <div className="grid gap-5 border-t border-line p-4 sm:p-5">
              {fs.map(f => f.type === 'image'
                ? <div key={f.key}><Label hint={f.hint}>{f.label}</Label><ImageField value={v[f.key]} onChange={x => set(f.key, x)} /></div>
                : <label key={f.key} className="block"><Label hint={f.hint}>{f.label}</Label>
                    {f.type === 'long' ? <textarea className={inputCls} rows={Math.min(8, Math.max(3, Math.ceil(v[f.key].length / 80) + 1))} value={v[f.key]} onChange={e => set(f.key, e.target.value)} /> : <input className={inputCls} value={v[f.key]} onChange={e => set(f.key, e.target.value)} />}
                  </label>)}
            </div>
          </details>
        ))}
      </div>
      <SaveBar dirty={dirty} saving={saving} onSave={async () => { if (await onSave(diff())) setDirty(false); }} onReset={Object.keys(saved).length ? onReset : undefined} resetLabel="Restore all original wording" />
    </div>
  );
}

const PAGE_NAMES: Record<string, string> = { home: 'Home', products: 'Products', industries: 'Industries', finishes: 'Finishes', how: 'How it works', insights: 'Blog', about: 'About', offices: 'Offices', contact: 'Contact', shipping: 'Shipping policy', privacy: 'Privacy policy', terms: 'Terms of service' };

/** Titles and descriptions that appear in Google results and link previews. */
export function SeoPanel({ defaults, saved, articles, saving, onSave, onReset }: { defaults: Record<string, { title: string; description: string }>; saved: Record<string, { title: string; description: string }>; articles: { slug: string; title: string; excerpt: string }[]; saving: boolean; onSave: (v: Record<string, { title: string; description: string }>) => Promise<boolean>; onReset: () => void }) {
  const keys = [...Object.keys(defaults).filter(k => k.startsWith('page:')), ...articles.map(a => `article:${a.slug}`)];
  const base = (k: string) => saved[k] ?? defaults[k] ?? { title: articles.find(a => `article:${a.slug}` === k)?.title ?? '', description: articles.find(a => `article:${a.slug}` === k)?.excerpt ?? '' };
  const [v, setV] = useState(() => Object.fromEntries(keys.map(k => [k, base(k)])));
  const [dirty, setDirty] = useState(false);
  const set = (k: string, f: 'title' | 'description', val: string) => { setV(x => ({ ...x, [k]: { ...x[k], [f]: val } })); setDirty(true); };
  const diff = () => Object.fromEntries(keys.filter(k => JSON.stringify(v[k]) !== JSON.stringify(defaults[k])).map(k => [k, v[k]]));
  return (
    <div>
      <p className="mb-6 max-w-3xl text-[15px] text-secondary">What Google shows for each page. Aim for a title up to about 50 characters (“| ALL PACK” is added automatically) and a description of 140 to 160 characters.</p>
      <div className="grid gap-3">
        {keys.map(k => {
          const isArticle = k.startsWith('article:');
          const name = isArticle ? `Blog: ${articles.find(a => `article:${a.slug}` === k)?.title ?? k}` : PAGE_NAMES[k.slice(5)] ?? k;
          const e = v[k];
          return (
            <details key={k} className="rounded-xl border border-line bg-white">
              <summary className="cursor-pointer list-none px-4 py-3.5 text-[15px] font-semibold sm:px-5">{name}</summary>
              <div className="grid gap-4 border-t border-line p-4 sm:p-5">
                <label className="block"><Label>Title <span className={e.title.length > 50 ? 'text-amber-700' : 'text-muted'}>({e.title.length})</span></Label><input className={inputCls} value={e.title} onChange={x => set(k, 'title', x.target.value)} /></label>
                <label className="block"><Label>Description <span className={e.description.length < 140 || e.description.length > 160 ? 'text-amber-700' : 'text-green-700'}>({e.description.length})</span></Label><textarea className={inputCls} rows={3} value={e.description} onChange={x => set(k, 'description', x.target.value)} /></label>
              </div>
            </details>
          );
        })}
      </div>
      <SaveBar dirty={dirty} saving={saving} onSave={async () => { if (await onSave(diff())) setDirty(false); }} onReset={Object.keys(saved).length ? onReset : undefined} resetLabel="Restore all original titles" />
    </div>
  );
}
