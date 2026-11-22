'use client';
import { useCallback, useEffect, useState } from 'react';
import { Mail, MessageCircle, Phone, Trash2 } from 'lucide-react';
import { api } from './api';
import { btnDanger, btnLine, inputCls } from './ui';

export type Enquiry = { id: number; created_at: number; name: string; email: string; whatsapp: string; message: string; status: 'new' | 'contacted' | 'closed'; note: string; source: string };

/** Pakistani local numbers (03xx…) become international so wa.me opens the right chat. */
export const waDigits = (raw: string) => { const d = raw.replace(/\D/g, ''); return /^0\d{10}$/.test(d) ? `92${d.slice(1)}` : d.replace(/^00/, ''); };
const when = (t: number) => new Date(t).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Karachi' });
const TONE: Record<string, string> = { new: 'bg-brand/10 text-brand', contacted: 'bg-amber-100 text-amber-800', closed: 'bg-mist text-muted' };

export function Enquiries({ onCount }: { onCount: (n: number) => void }) {
  const [items, setItems] = useState<Enquiry[] | null>(null);
  const [db, setDb] = useState(true);
  const [filter, setFilter] = useState<'all' | Enquiry['status']>('all');
  const [err, setErr] = useState('');
  const [del, setDel] = useState<number | null>(null);

  const load = useCallback(async () => {
    try { const r = await api<{ items: Enquiry[]; dbConnected: boolean }>('/api/admin/enquiries'); setItems(r.items); setDb(r.dbConnected); onCount(r.items.filter(i => i.status === 'new').length); setErr(''); } catch (e) { setErr((e as Error).message); }
  }, [onCount]);
  useEffect(() => { load(); const t = setInterval(load, 60000); return () => clearInterval(t); }, [load]);

  const patch = async (id: number, body: Partial<Pick<Enquiry, 'status' | 'note'>>) => {
    setItems(v => v?.map(i => (i.id === id ? { ...i, ...body } : i)) ?? v);
    try { await api('/api/admin/enquiries', { method: 'PATCH', body: { id, ...body } }); if (body.status) load(); } catch (e) { setErr((e as Error).message); }
  };

  if (!db) return <p className="rounded-xl bg-amber-50 p-5 text-[15px] text-amber-900">The database is not connected yet, so enquiries cannot be stored. See the setup note on the Help tab.</p>;
  if (!items) return <p className="text-muted">{err || 'Loading…'}</p>;
  const shown = items.filter(i => filter === 'all' || i.status === filter);
  const count = (s: string) => items.filter(i => i.status === s).length;
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {([['all', `All (${items.length})`], ['new', `New (${count('new')})`], ['contacted', `Contacted (${count('contacted')})`], ['closed', `Closed (${count('closed')})`]] as const).map(([k, l]) => (
          <button key={k} type="button" onClick={() => setFilter(k)} className={`rounded-full border px-4 py-1.5 text-[14px] font-medium ${filter === k ? 'border-navy bg-navy text-white' : 'border-line bg-white hover:border-navy'}`}>{l}</button>
        ))}
        <button type="button" onClick={load} className={`${btnLine} ml-auto !py-1.5`}>Refresh</button>
      </div>
      {err && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-[14px] text-red-700">{err}</p>}
      {shown.length === 0 && <p className="rounded-xl border border-dashed border-line p-10 text-center text-[15px] text-muted">{items.length ? 'No enquiries in this view.' : 'No enquiries yet. They appear here as soon as a visitor sends the form on your Contact page.'}</p>}
      <ul className="grid gap-4">
        {shown.map(q => {
          const wa = waDigits(q.whatsapp);
          const reply = `Hello ${q.name}, this is ALL PACK. Thank you for your enquiry. `;
          return (
            <li key={q.id} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0"><p className="text-[17px] font-semibold">{q.name}</p><p className="text-[13px] text-muted">{when(q.created_at)}{q.source && q.source !== 'contact' ? ` · ${q.source}` : ''}</p></div>
                <span className={`rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wide ${TONE[q.status]}`}>{q.status}</span>
              </div>
              <p className="mt-3 whitespace-pre-wrap rounded-xl bg-mist p-4 text-[15px] leading-relaxed [overflow-wrap:anywhere]">{q.message}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a className={btnLine} href={`https://wa.me/${wa}?text=${encodeURIComponent(reply)}`} target="_blank" rel="noopener noreferrer" onClick={() => q.status === 'new' && patch(q.id, { status: 'contacted' })}><MessageCircle size={16} /> WhatsApp {q.whatsapp}</a>
                <a className={btnLine} href={`mailto:${q.email}?subject=${encodeURIComponent('Your enquiry to ALL PACK')}`} onClick={() => q.status === 'new' && patch(q.id, { status: 'contacted' })}><Mail size={16} /> {q.email}</a>
                <a className={btnLine} href={`tel:+${wa}`}><Phone size={16} /> Call</a>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-[180px_1fr]">
                <select aria-label="Status" className={inputCls} value={q.status} onChange={e => patch(q.id, { status: e.target.value as Enquiry['status'] })}>
                  <option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
                </select>
                <input aria-label="Private note" className={inputCls} defaultValue={q.note} placeholder="Private note (only you see this)" onBlur={e => e.target.value !== q.note && patch(q.id, { note: e.target.value })} />
              </div>
              <div className="mt-3 text-right">
                {del === q.id ? <><button className={`${btnDanger} !py-1.5`} onClick={async () => { await api(`/api/admin/enquiries?id=${q.id}`, { method: 'DELETE' }); setDel(null); load(); }}>Delete for good</button> <button className={`${btnLine} !py-1.5`} onClick={() => setDel(null)}>Keep</button></>
                  : <button className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-red-700" onClick={() => setDel(q.id)}><Trash2 size={14} /> Delete</button>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
