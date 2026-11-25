'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type Errors = Partial<Record<'name' | 'email' | 'whatsapp' | 'message', string>>;

/** Stored inquiry: the visitor's name, email, WhatsApp number and question reach the admin inbox, so ALL PACK can reply. */
export function EnquiryForm({ source = 'contact' }: { source?: string }) {
  const shown = useRef(Date.now());
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  const [fieldErr, setFieldErr] = useState<Errors>({});
  useEffect(() => { shown.current = Date.now(); }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setState('sending'); setError(''); setFieldErr({});
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: d.get('name'), email: d.get('email'), whatsapp: d.get('whatsapp'), message: d.get('message'), website: d.get('website'), elapsed: Date.now() - shown.current, source }),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; field?: keyof Errors };
      if (res.ok && j.ok) { form.reset(); setState('done'); return; }
      if (j.field) setFieldErr({ [j.field]: j.error });
      setError(j.error || 'Something went wrong. Please try again.');
    } catch { setError('We could not reach the server. Please check your connection and try again.'); }
    setState('idle');
  }

  if (state === 'done') {
    return (
      <div role="status" className="card p-8 text-center sm:p-10">
        <CheckCircle2 size={40} strokeWidth={1.5} className="mx-auto text-brand" aria-hidden="true" />
        <h3 className="mt-4 text-[22px]">Thank you, your inquiry has been received</h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-secondary">Our team will contact you on WhatsApp or by email, usually within 24 hours.</p>
        <button type="button" onClick={() => setState('idle')} className="btn-outline mt-6">Send another inquiry</button>
      </div>
    );
  }

  const input = (bad?: string) => `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-navy ${bad ? 'border-red-500' : 'border-line'}`;
  return (
    <form onSubmit={submit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-semibold">Your name
          <input name="name" required autoComplete="name" maxLength={120} placeholder="Full name" className={input(fieldErr.name)} aria-invalid={!!fieldErr.name} />
          {fieldErr.name && <span className="mt-1 block text-[13px] font-normal text-red-600">{fieldErr.name}</span>}
        </label>
        <label className="block text-[14px] font-semibold">WhatsApp number
          <input name="whatsapp" required type="tel" inputMode="tel" autoComplete="tel" maxLength={40} placeholder="+1 or +92 number" className={input(fieldErr.whatsapp)} aria-invalid={!!fieldErr.whatsapp} />
          {fieldErr.whatsapp && <span className="mt-1 block text-[13px] font-normal text-red-600">{fieldErr.whatsapp}</span>}
        </label>
        <label className="block text-[14px] font-semibold sm:col-span-2">Email
          <input name="email" required type="email" autoComplete="email" maxLength={200} placeholder="you@company.com" className={input(fieldErr.email)} aria-invalid={!!fieldErr.email} />
          {fieldErr.email && <span className="mt-1 block text-[13px] font-normal text-red-600">{fieldErr.email}</span>}
        </label>
        <label className="block text-[14px] font-semibold sm:col-span-2">Your message
          <textarea name="message" required rows={5} maxLength={4000} placeholder="Tell us what you need: product, size, quantity, or any question." className={`${input(fieldErr.message)} resize-y`} aria-invalid={!!fieldErr.message} />
          {fieldErr.message && <span className="mt-1 block text-[13px] font-normal text-red-600">{fieldErr.message}</span>}
        </label>
      </div>
      {/* Honeypot: hidden from people, filled in by simple bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">{error}</p>}
      <button type="submit" disabled={state === 'sending'} className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto">{state === 'sending' ? 'Sending…' : <>Send inquiry <ArrowRight size={16} strokeWidth={1.75} /></>}</button>
      <p className="mt-4 text-[13px] leading-relaxed text-muted">We use these details only to reply to your inquiry. See our privacy policy.</p>
    </form>
  );
}
