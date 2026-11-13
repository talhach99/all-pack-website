'use client';
import { useMemo, useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { WhatsAppIcon } from './FloatingContact';
import { emailLink, whatsappLink } from '@/lib/company';

const what = ['Printed cartons', 'Pharma cartons', 'Rigid gift boxes', 'Corrugated boxes', 'Mailer boxes', 'Paper bags', 'Labels & stickers', 'Something else'];
const qty = ['Under 1,000', '1,000 – 5,000', '5,000 – 20,000', '20,000+', 'Not sure yet'];
const finish = ['Full colour', 'Foil stamping', 'Soft-touch', 'Kraft / plain', 'Help me choose'];

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="font-mono text-[12px] uppercase tracking-[.08em] text-muted">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map(o => {
          const on = o === value;
          return (
            <button key={o} type="button" aria-pressed={on} onClick={() => onChange(on ? '' : o)}
              className={`h-10 rounded-[10px] border px-3.5 text-[14px] transition-colors ${on ? 'border-ink bg-ink text-white' : 'border-line bg-white text-secondary hover:border-ink/30 hover:text-ink'}`}>
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Three taps build a quote request; it opens WhatsApp (or email) with the message already written. */
export function QuoteBuilder() {
  const [w, setW] = useState('');
  const [q, setQ] = useState('');
  const [f, setF] = useState('');
  const [size, setSize] = useState('');

  const message = useMemo(() => {
    const lines = ['Hello ALL PACK, I would like a quotation.'];
    if (w) lines.push(`Packaging: ${w}`);
    if (q) lines.push(`Quantity: ${q}`);
    if (f) lines.push(`Finish: ${f}`);
    if (size.trim()) lines.push(`Size / details: ${size.trim()}`);
    return lines.join('\n');
  }, [w, q, f, size]);

  const wa = whatsappLink(message);
  const ready = [w, q, f].filter(Boolean).length;

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[1.25fr_.75fr]">
      <div className="grid gap-7 p-6 sm:p-8">
        <Chips label="1 · What do you need?" options={what} value={w} onChange={setW} />
        <Chips label="2 · How many?" options={qty} value={q} onChange={setQ} />
        <Chips label="3 · Finish" options={finish} value={f} onChange={setF} />
        <label className="block">
          <span className="font-mono text-[12px] uppercase tracking-[.08em] text-muted">4 · Size or details (optional)</span>
          <input value={size} onChange={e => setSize(e.target.value)} maxLength={160} placeholder="e.g. 20 × 12 × 6 cm, for a 500 g cake" className="input mt-3" />
        </label>
      </div>

      {/* job ticket preview */}
      <div className="flex flex-col border-t border-dashed border-ink/20 bg-mist p-6 sm:p-8 lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[12px] uppercase tracking-[.08em] text-muted">Your quote ticket</span>
          <span className="font-mono text-[12px] tabular-nums text-muted">{ready}/3</span>
        </div>
        <div aria-hidden="true" className="mt-3 h-1 overflow-hidden rounded-full bg-line"><div className="cmyk-bar h-full transition-[width] duration-300" style={{ width: `${(ready / 3) * 100}%` }} /></div>
        <pre className="mt-5 flex-1 whitespace-pre-wrap rounded-xl border border-line bg-white p-4 font-mono text-[13px] leading-relaxed text-ink" aria-live="polite">{message}</pre>
        <div className="mt-5 grid gap-2">
          <a href={wa || emailLink('Packaging quote request', message)} target="_blank" rel="noopener noreferrer" className="btn-brand"><WhatsAppIcon size={18} /> Send on WhatsApp <ArrowRight size={16} strokeWidth={1.75} /></a>
          <a href={emailLink('Packaging quote request', message)} className="btn-light"><Mail size={18} strokeWidth={1.5} /> Send by email instead</a>
        </div>
        <p className="mt-3 text-center text-[13px] text-muted">A real person replies within one business day.</p>
      </div>
    </div>
  );
}
