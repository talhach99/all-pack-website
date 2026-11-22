'use client';
import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, LogOut } from 'lucide-react';
import type { CopyField } from '@/data/copy';
import { api } from './api';
import { COLLECTIONS } from './schema';
import { CollectionEditor } from './Editors';
import { Enquiries } from './Enquiries';
import { MediaLibrary } from './Media';
import { PagesPanel, SeoPanel, SettingsPanel } from './Panels';
import { btnLine, Toast } from './ui';

type Obj = Record<string, unknown>;
type Content = {
  dbConnected: boolean;
  overrides: { company?: Record<string, string>; copy?: Record<string, string>; collections?: Record<string, Obj[]>; seo?: Record<string, { title: string; description: string }> };
  defaults: { company: Record<string, string>; copy: CopyField[]; collections: Record<string, Obj[]>; seo: Record<string, { title: string; description: string }> };
};

const TABS = [
  { id: 'enquiries', label: 'Enquiries' },
  { id: 'settings', label: 'Contact details' },
  { id: 'pages', label: 'Page text' },
  ...COLLECTIONS.map(c => ({ id: c.key, label: c.title })),
  { id: 'seo', label: 'Search (SEO)' },
  { id: 'images', label: 'Images' },
  { id: 'help', label: 'Help' },
];

export function AdminApp() {
  const [tab, setTab] = useState('enquiries');
  const [data, setData] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: 'ok' | 'err' }>({ msg: '', kind: 'ok' });
  const [newCount, setNewCount] = useState(0);
  const [loadErr, setLoadErr] = useState('');
  const [rev, setRev] = useState(0);

  const say = useCallback((msg: string, kind: 'ok' | 'err' = 'ok') => { setToast({ msg, kind }); setTimeout(() => setToast({ msg: '', kind }), 3500); }, []);
  const load = useCallback(async () => { try { setData(await api<Content>('/api/admin/content')); } catch (e) { setLoadErr((e as Error).message); } }, []);
  useEffect(() => { load(); }, [load]);

  /** Saves one section and refreshes the stored copy. Resolves true on success so editors can clear their "unsaved" flag. */
  const save = async (body: Obj, done = 'Saved. The website is updated.'): Promise<boolean> => {
    setSaving(true);
    try { await api('/api/admin/content', { method: 'PUT', body }); await load(); setRev(r => r + 1); say(done); return true; }
    catch (e) { say((e as Error).message, 'err'); return false; }
    finally { setSaving(false); }
  };

  const logout = async () => { await api('/api/admin/logout', { method: 'POST' }).catch(() => null); location.reload(); };

  if (loadErr) return <p className="p-8 text-red-700">{loadErr}</p>;
  if (!data) return <p className="p-8 text-muted">Loading…</p>;
  const eff = (k: string): Obj[] => (data.overrides.collections?.[k] ?? data.defaults.collections[k]) as Obj[];
  const col = COLLECTIONS.find(c => c.key === tab);

  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <p className="whitespace-nowrap font-display text-[18px] font-semibold text-navy">ALL PACK <span className="font-normal text-muted">admin</span></p>
          <div className="flex gap-2"><a href="/" target="_blank" rel="noopener noreferrer" className={btnLine}><ExternalLink size={15} /> <span className="hidden sm:inline">View website</span><span className="sm:hidden">Site</span></a><button type="button" className={btnLine} onClick={logout}><LogOut size={15} /> <span className="hidden sm:inline">Sign out</span><span className="sm:hidden">Exit</span></button></div>
        </div>
        <nav aria-label="Admin sections" className="mx-auto max-w-6xl overflow-x-auto px-4 [scrollbar-width:none]">
          <ul className="flex gap-1">
            {TABS.map(t => (
              <li key={t.id}><button type="button" onClick={() => setTab(t.id)} aria-current={tab === t.id ? 'page' : undefined} className={`whitespace-nowrap border-b-2 px-3.5 py-3 text-[14px] font-semibold transition-colors ${tab === t.id ? 'border-navy text-navy' : 'border-transparent text-muted hover:text-ink'}`}>
                {t.label}{t.id === 'enquiries' && newCount > 0 && <span className="ml-2 rounded-full bg-rule px-2 py-0.5 text-[11px] text-white">{newCount}</span>}
              </button></li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {!data.dbConnected && tab !== 'help' && <p className="mb-6 rounded-xl bg-amber-50 p-4 text-[14px] text-amber-900">The database is not connected yet, so changes cannot be saved. Open the Help tab for the one-time setup.</p>}
        <h1 className="mb-6 text-[26px] font-semibold">{TABS.find(t => t.id === tab)?.label}</h1>
        {tab === 'enquiries' && <Enquiries onCount={setNewCount} />}
        {tab === 'settings' && <SettingsPanel key={rev} defaults={data.defaults.company} saved={data.overrides.company ?? {}} saving={saving} onSave={v => save({ company: v })} onReset={() => save({ company: null }, 'Original details restored.')} />}
        {tab === 'pages' && <PagesPanel key={rev} fields={data.defaults.copy} saved={data.overrides.copy ?? {}} saving={saving} onSave={v => save({ copy: v })} onReset={() => save({ copy: null }, 'Original wording restored.')} />}
        {col && <CollectionEditor key={`${col.key}-${rev}`} def={col} items={eff(col.key)} isCustom={!!data.overrides.collections?.[col.key]} saving={saving}
          onSave={list => save({ collections: { [col.key]: list } })} onReset={() => save({ collections: { [col.key]: null } }, 'Original list restored.')} />}
        {tab === 'seo' && <SeoPanel key={rev} defaults={data.defaults.seo} saved={data.overrides.seo ?? {}} articles={eff('articles') as unknown as { slug: string; title: string; excerpt: string }[]} saving={saving} onSave={v => save({ seo: v })} onReset={() => save({ seo: null }, 'Original titles restored.')} />}
        {tab === 'images' && <MediaLibrary />}
        {tab === 'help' && <Help />}
      </main>
      <Toast {...toast} />
    </div>
  );
}

function Help() {
  const li = 'mt-2 leading-relaxed';
  return (
    <div className="max-w-3xl space-y-8 text-[15px] text-secondary">
      <section><h2 className="text-[18px] font-semibold text-ink">How this works</h2>
        <ul className={`${li} list-disc space-y-1.5 pl-5`}>
          <li><b>Enquiries</b>: everything visitors send through the Contact page form. Use the WhatsApp, email and call buttons to reply, then mark the enquiry as Contacted or Closed.</li>
          <li><b>Contact details</b>: phone, WhatsApp, email and address. They update everywhere at once.</li>
          <li><b>Page text</b>: headings, paragraphs and pictures of each page, including the homepage hero.</li>
          <li><b>Products, Industries, Clients, FAQs, Machines, Guides</b>: add, edit, reorder or remove items.</li>
          <li><b>Images</b>: upload pictures once, then pick them in any picture field. Large pictures are reduced automatically.</li>
          <li>Changes go live as soon as you press <b>Save changes</b>. “Restore original” returns a section to the wording the site shipped with.</li>
        </ul></section>
      <section><h2 className="text-[18px] font-semibold text-ink">Changing the admin ID or password</h2>
        <p className={li}>In Cloudflare open Workers → all-pack-website → Settings → Variables and secrets, and edit <code className="rounded bg-white px-1.5 py-0.5">ADMIN_USERNAME</code> and <code className="rounded bg-white px-1.5 py-0.5">ADMIN_PASSWORD</code>. Everyone is signed out when the password changes.</p></section>
      <section><h2 className="text-[18px] font-semibold text-ink">Good to know</h2>
        <ul className={`${li} list-disc space-y-1.5 pl-5`}><li>Anyone who knows your ID and password can change the site, so choose a long password and do not share it.</li><li>After 8 wrong attempts the sign-in pauses for 15 minutes.</li><li>You are signed out automatically after 12 hours.</li></ul></section>
    </div>
  );
}
