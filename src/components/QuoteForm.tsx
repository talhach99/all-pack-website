'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, FileUp, Loader2, Mail, MessageCircle, X } from 'lucide-react';
import { COMPANY, whatsappLink } from '@/lib/company';
import { products } from '@/lib/products';
import { useInquiry } from './Providers';

const MAX = 4 * 1024 * 1024;
type Status = 'idle' | 'sending' | 'success' | 'error';

export function QuoteForm({ prefillProduct = '', studioSpec = '', compact = false }: { prefillProduct?: string; studioSpec?: string; compact?: boolean }) {
  const inquiry = useInquiry();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [drag, setDrag] = useState(false);
  const [started, setStarted] = useState(0);
  const [snapshot, setSnapshot] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { setStarted(Date.now()); }, []);
  useEffect(() => {
    if (prefillProduct && products.some(p => p.slug === prefillProduct) && !inquiry.has(prefillProduct)) inquiry.add(prefillProduct, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillProduct]);

  const selected = useMemo(() => inquiry.items.map(s => products.find(p => p.slug === s)).filter(Boolean) as typeof products, [inquiry.items]);
  const productSpec = [...selected.map(p => p.name), ...(studioSpec ? [`Studio design: ${studioSpec}`] : [])].join(' | ');

  function pick(f: File | undefined | null) {
    setFileError('');
    if (!f) { setFile(null); return; }
    if (!/\.(png|jpe?g|pdf)$/i.test(f.name)) { setFileError('Please choose a PNG, JPG or PDF.'); return; }
    if (f.size > MAX) { setFileError('That file is over 4 MB. Send larger files on WhatsApp or email.'); return; }
    setFile(f);
  }

  function summary(form: HTMLFormElement) {
    const d = new FormData(form);
    const lines = [
      'Hello ALL PACK, I would like a quote.',
      productSpec && `Products: ${productSpec}`,
      `Quantity: ${d.get('quantity') || '-'}`,
      d.get('dimensions') && `Size: ${d.get('dimensions')}`,
      d.get('city') && `City: ${d.get('city')}`,
      d.get('notes') && `Details: ${d.get('notes')}`,
      `Name: ${d.get('name') || '-'}${d.get('company') ? ` (${d.get('company')})` : ''}`,
      d.get('phone') && `Phone: ${d.get('phone')}`,
      d.get('email') && `Email: ${d.get('email')}`,
    ].filter(Boolean);
    return lines.join('\n');
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setSnapshot(summary(form));
    setStatus('sending'); setMessage('');
    const payload = new FormData(form);
    payload.set('products', productSpec);
    payload.set('t', String(started));
    payload.delete('artwork');
    if (file) payload.set('artwork', file);
    try {
      const res = await fetch('/api/quote', { method: 'POST', body: payload });
      const data = (await res.json().catch(() => ({ ok: false, message: 'Unexpected server response.' }))) as { ok: boolean; message: string };
      if (!res.ok || !data.ok) throw new Error(data.message || 'Could not send your request.');
      setStatus('success'); setMessage(data.message); form.reset(); setFile(null); inquiry.clear();
    } catch (err) {
      setStatus('error'); setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  const waFallback = whatsappLink(snapshot || `Hello ALL PACK, I would like a quote. ${productSpec}`);
  const mailFallback = `mailto:${COMPANY.email}?subject=${encodeURIComponent('Quote request')}&body=${encodeURIComponent(snapshot)}`;

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: .1 }} className="grid h-20 w-20 place-items-center rounded-full bg-brand text-white shadow-glow"><Check size={36} /></motion.span>
        <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight">Brief received.</h2>
        <p className="lead mt-3 max-w-md">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn-light">Keep browsing</Link>
          <button className="btn-ghost" onClick={() => setStatus('idle')}>Send another</button>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate={false} className={`card ${compact ? 'p-6 sm:p-8' : 'p-6 sm:p-10'}`}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset>
        <legend className="mb-5 flex items-center gap-3 font-display text-xl font-semibold tracking-tight"><span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs text-white">1</span> What do you need?</legend>
        {selected.length > 0 || studioSpec ? (
          <div className="mb-5 flex flex-wrap gap-2">
            {selected.map(p => (
              <span key={p.slug} className="chip !bg-mist !pr-1.5">
                {p.name}
                <button type="button" onClick={() => inquiry.remove(p.slug)} aria-label={`Remove ${p.name}`} className="grid h-5 w-5 place-items-center rounded-full hover:bg-white"><X size={12} /></button>
              </span>
            ))}
            {studioSpec && <span className="chip !bg-mist">Studio design attached</span>}
          </div>
        ) : null}
        <label className="mb-5 block">
          <span className="label">Add a product <span className="font-normal text-muted">(optional)</span></span>
          <select className="input" value="" onChange={e => { if (e.target.value) inquiry.add(e.target.value, false); }}>
            <option value="">Choose from {products.length} products…</option>
            {products.filter(p => !inquiry.has(p.slug)).map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
          </select>
        </label>
        <div className="grid gap-5 sm:grid-cols-3">
          <label><span className="label">Quantity *</span><input className="input" name="quantity" type="number" inputMode="numeric" min={1} max={10000000} defaultValue={500} required /></label>
          <label><span className="label">Size (L × W × H)</span><input className="input" name="dimensions" maxLength={180} placeholder="e.g. 25 × 18 × 10 cm" /></label>
          <label><span className="label">Delivery city</span><input className="input" name="city" maxLength={80} placeholder="Lahore" autoComplete="address-level2" /></label>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="mb-5 flex items-center gap-3 font-display text-xl font-semibold tracking-tight"><span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs text-white">2</span> Tell us about the project</legend>
        <label className="block"><span className="label">Project details *</span>
          <textarea name="notes" className="input min-h-[140px] resize-y" minLength={5} maxLength={5000} required placeholder="What are you packing? Any material, print, finish or deadline in mind?" />
        </label>
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); }}
          className={`mt-5 flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed p-6 text-center transition-colors ${drag ? 'border-brand bg-mist' : 'border-line'}`}
        >
          {file ? (
            <div className="flex items-center gap-3 text-sm">
              <FileUp size={18} className="text-brand" /><span className="font-medium">{file.name}</span><span className="text-muted">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ''; }} className="grid h-7 w-7 place-items-center rounded-full hover:bg-soft" aria-label="Remove file"><X size={14} /></button>
            </div>
          ) : (
            <>
              <FileUp size={22} className="text-muted" />
              <p className="text-sm"><button type="button" className="font-semibold text-brand underline-offset-4 hover:underline" onClick={() => fileRef.current?.click()}>Upload artwork or a reference photo</button> <span className="text-muted">or drag it here</span></p>
              <p className="text-xs text-muted">PNG, JPG or PDF · up to 4 MB · optional</p>
            </>
          )}
          <input ref={fileRef} type="file" name="artwork" accept="image/png,image/jpeg,application/pdf,.png,.jpg,.jpeg,.pdf" className="sr-only" aria-label="Artwork file" onChange={e => pick(e.target.files?.[0])} />
          {fileError && <p role="alert" className="text-xs font-medium text-rose-600">{fileError}</p>}
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="mb-5 flex items-center gap-3 font-display text-xl font-semibold tracking-tight"><span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs text-white">3</span> Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label><span className="label">Name *</span><input className="input" required minLength={2} maxLength={120} name="name" autoComplete="name" /></label>
          <label><span className="label">Email *</span><input className="input" required name="email" type="email" maxLength={200} autoComplete="email" placeholder="you@company.com" /></label>
          <label><span className="label">Phone / WhatsApp</span><input className="input" name="phone" type="tel" maxLength={50} autoComplete="tel" placeholder="03xx xxxxxxx" /></label>
          <label><span className="label">Company / brand</span><input className="input" name="company" maxLength={150} autoComplete="organization" /></label>
        </div>
      </fieldset>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} role="alert" className="overflow-hidden">
            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-900">We couldn&apos;t send that online.</p>
              <p className="mt-1 text-sm text-amber-900/80">{message} Your details are ready to send another way:</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {waFallback && <a href={waFallback} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-[#1FA855] text-white hover:bg-[#178a45]"><MessageCircle size={16} /> Send on WhatsApp</a>}
                <a href={mailFallback} className="btn-light btn-sm"><Mail size={16} /> Send by email</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex flex-col items-stretch gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">No payment, no commitment. We&apos;ll reply with a specification and price.</p>
        <button type="submit" disabled={status === 'sending'} className="btn-dark shrink-0">
          {status === 'sending' ? <><Loader2 size={17} className="animate-spin" /> Sending…</> : <>Send my brief <ArrowRight size={17} /></>}
        </button>
      </div>
    </form>
  );
}
