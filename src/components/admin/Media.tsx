'use client';
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Trash2, Upload, X } from 'lucide-react';
import { api, uploadImage } from './api';
import { btnDanger, btnDark, btnLine, inputCls, Label } from './ui';

type Item = { id: string; name: string; size: number; url: string };

function useLibrary() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const load = useCallback(async () => { try { setItems((await api<{ items: Item[] }>('/api/admin/media')).items); } catch (e) { setErr((e as Error).message); } }, []);
  useEffect(() => { load(); }, [load]);
  const upload = async (files: FileList | File[]): Promise<string | null> => {
    setBusy(true); setErr(''); let last: string | null = null;
    try { for (const f of Array.from(files)) last = await uploadImage(f); await load(); } catch (e) { setErr((e as Error).message); }
    setBusy(false); return last;
  };
  return { items, busy, err, load, upload, setErr };
}

/** The Images tab: everything uploaded so far, with upload and delete. */
export function MediaLibrary({ onPick }: { onPick?: (url: string) => void }) {
  const lib = useLibrary();
  const file = useRef<HTMLInputElement>(null);
  const [del, setDel] = useState('');
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={btnDark} disabled={lib.busy} onClick={() => file.current?.click()}><Upload size={16} /> {lib.busy ? 'Uploading…' : 'Upload pictures'}</button>
        <input ref={file} type="file" accept="image/*" multiple hidden onChange={async e => { const f = e.target.files; if (f?.length) { const u = await lib.upload(f); if (u && onPick && f.length === 1) onPick(u); } e.target.value = ''; }} />
        <p className="text-[13px] text-muted">Pictures are resized automatically (longest side 1600 px) and saved as WebP.</p>
      </div>
      {lib.err && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[14px] text-red-700">{lib.err}</p>}
      {lib.items.length === 0 && !lib.err && <p className="mt-8 text-center text-[15px] text-muted">No uploaded pictures yet. The site’s built-in pictures are not listed here.</p>}
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {lib.items.map(m => (
          <li key={m.id} className="overflow-hidden rounded-xl border border-line bg-white">
            <button type="button" onClick={() => onPick?.(m.url)} className={`relative block aspect-square w-full bg-card ${onPick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}>
              <img src={m.url} alt={m.name} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-2" />
            </button>
            <div className="p-2.5">
              <p className="truncate text-[12px] font-medium" title={m.name}>{m.name}</p>
              <p className="text-[11px] text-muted">{Math.round(m.size / 1024)} KB</p>
              {!onPick && (del === m.id
                ? <div className="mt-2 flex gap-1"><button className={`${btnDanger} !px-2 !py-1 text-[12px]`} onClick={async () => { await api(`/api/admin/media?id=${m.id}`, { method: 'DELETE' }); setDel(''); lib.load(); }}>Delete</button><button className={`${btnLine} !px-2 !py-1 text-[12px]`} onClick={() => setDel('')}>Keep</button></div>
                : <div className="mt-2 flex gap-1"><button className={`${btnLine} !px-2 !py-1 text-[12px]`} onClick={() => navigator.clipboard?.writeText(location.origin + m.url)}>Copy link</button><button aria-label="Delete picture" className={`${btnLine} !px-2 !py-1`} onClick={() => setDel(m.id)}><Trash2 size={13} /></button></div>)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Picture field: preview, choose from the library, upload, or type an address. */
export function ImageField({ value, onChange, hint }: { value: string; onChange: (v: string) => void; hint?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg border border-line bg-card">{value ? <img src={value} alt="" className="absolute inset-0 h-full w-full object-contain p-1" /> : <span className="grid h-full place-items-center text-[11px] text-muted">No picture</span>}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2"><button type="button" className={btnLine} onClick={() => setOpen(true)}>Choose or upload…</button>{value && <button type="button" className={btnLine} onClick={() => onChange('')}>Remove</button>}</div>
          <input value={value} onChange={e => onChange(e.target.value)} placeholder="/renders/… or /media/…" className={`${inputCls} mt-2 !py-1.5 text-[13px]`} aria-label="Picture address" />
          {hint && <p className="mt-1 text-[12px] text-muted">{hint}</p>}
        </div>
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Choose a picture" className="fixed inset-0 z-[200] grid place-items-center bg-black/50 p-4">
          <div className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-lift sm:p-6">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-[18px] font-semibold">Choose a picture</h3><button type="button" aria-label="Close" className="rounded-lg p-2 hover:bg-mist" onClick={() => setOpen(false)}><X size={18} /></button></div>
            <MediaLibrary onPick={u => { onChange(u); setOpen(false); }} />
            <div className="mt-6 border-t border-line pt-4"><Label hint="(for the site’s built-in pictures)">Or type an address</Label><p className="text-[13px] text-muted">Use the address box next to the preview, for example /renders/mailer-boxes.webp.</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
