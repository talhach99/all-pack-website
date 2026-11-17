'use client';
import { useMemo, useRef, useState } from 'react';
import { ArrowRight, Mail, Paperclip, X } from 'lucide-react';
import { COMPANY, whatsappLink } from '@/lib/company';
import { families } from '@/data/catalog';

/**
 * The brief is not sent through the website. It is written up as a plain message and
 * opened in WhatsApp or the visitor's email app, so it reaches ALL PACK directly.
 */
export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  const selected = useMemo(() => items.map(s => families.find(p => p.slug === s)).filter(Boolean) as typeof families, [items]);
  const productSpec = selected.map(p => p.name).join(', ');

  function summary(form: HTMLFormElement) {
    const d = new FormData(form);
    return [
      'Hello ALL PACK, I would like a quotation for printed packaging.',
      productSpec && `Products: ${productSpec}`,
      `Quantity: ${d.get('quantity') || '-'}`,
      d.get('dimensions') && `Size: ${d.get('dimensions')}`,
      d.get('city') && `Delivery city: ${d.get('city')}`,
      d.get('notes') && `Details: ${d.get('notes')}`,
      `Name: ${d.get('name') || '-'}${d.get('company') ? ` (${d.get('company')})` : ''}`,
      d.get('phone') && `Phone: ${d.get('phone')}`,
    ].filter(Boolean).join('\n');
  }

  function send(channel: 'whatsapp' | 'email') {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const text = summary(form);
    const url = channel === 'whatsapp'
      ? whatsappLink(text)
      : `mailto:${COMPANY.email}?subject=${encodeURIComponent('Packaging quote request')}&body=${encodeURIComponent(text)}`;
    if (!url) return;
    if (channel === 'whatsapp') window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
    setSent(true);
  }

  return (
    <form ref={formRef} onSubmit={e => { e.preventDefault(); send('whatsapp'); }} className={`card ${compact ? 'p-6 sm:p-8' : 'p-6 sm:p-10'}`}>
      <fieldset>
        <legend className="mb-5 flex items-baseline gap-3 font-display text-[19px] font-semibold"><span className="meta tabular-nums">01</span> Format and quantity</legend>
        {selected.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {selected.map(p => (
              <span key={p.slug} className="chip gap-1.5 !bg-mist !pr-1.5">
                {p.name}
                <button type="button" onClick={() => setItems(v => v.filter(x => x !== p.slug))} aria-label={`Remove ${p.name}`} className="grid h-5 w-5 place-items-center rounded-full hover:bg-white"><X size={12} /></button>
              </span>
            ))}
          </div>
        )}
        <label className="mb-5 block">
          <span className="label">Packaging format <span className="font-normal text-muted">(optional)</span></span>
          <select className="input" value="" onChange={e => { const v = e.target.value; if (v) setItems(x => (x.includes(v) ? x : [...x, v])); }}>
            <option value="">Choose a format…</option>
            {families.filter(p => !items.includes(p.slug)).map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
          </select>
        </label>
        <div className="grid gap-5 sm:grid-cols-3">
          <label><span className="label">Quantity *</span><input className="input" name="quantity" type="number" inputMode="numeric" min={1} max={10000000} defaultValue={500} required /></label>
          <label><span className="label">Size (L × W × H)</span><input className="input" name="dimensions" maxLength={180} placeholder="e.g. 25 × 18 × 10 cm" /></label>
          <label><span className="label">Delivery city</span><input className="input" name="city" maxLength={80} placeholder="Lahore" autoComplete="address-level2" /></label>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="mb-5 flex items-baseline gap-3 font-display text-[19px] font-semibold"><span className="meta tabular-nums">02</span> Specification</legend>
        <label className="block"><span className="label">Project details *</span>
          <textarea name="notes" className="input min-h-[140px] resize-y" minLength={5} maxLength={2000} required placeholder="The product, the board or finish you have in mind, number of print colours and your required delivery date." />
        </label>
        <p className="mt-4 flex items-start gap-2 text-sm text-muted"><Paperclip size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" /> Have artwork or a reference photo? Attach it in the WhatsApp chat or email once it opens.</p>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="mb-5 flex items-baseline gap-3 font-display text-[19px] font-semibold"><span className="meta tabular-nums">03</span> Contact details</legend>
        <div className="grid gap-5 sm:grid-cols-3">
          <label><span className="label">Name *</span><input className="input" required minLength={2} maxLength={120} name="name" autoComplete="name" /></label>
          <label><span className="label">Phone</span><input className="input" name="phone" type="tel" maxLength={50} autoComplete="tel" placeholder="+92 3xx xxxxxxx" /></label>
          <label><span className="label">Company / brand</span><input className="input" name="company" maxLength={150} autoComplete="organization" /></label>
        </div>
      </fieldset>

      <div className="mt-10 border-t border-line pt-8">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button type="button" onClick={() => send('email')} className="btn-light shrink-0"><Mail size={17} strokeWidth={1.5} /> Send by email</button>
          <button type="submit" className="btn-dark shrink-0">Send on WhatsApp <ArrowRight size={17} /></button>
        </div>
        <p className="mt-4 text-sm text-muted sm:text-right">
          {sent ? 'Your brief is ready in WhatsApp or your email app. Press send there and we’ll reply within 24 hours.' : 'We reply within 24 hours with a specification and price. There is no obligation to order.'}
        </p>
      </div>
    </form>
  );
}
