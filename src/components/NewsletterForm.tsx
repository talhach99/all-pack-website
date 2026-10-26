'use client';
import { FormEvent, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function NewsletterForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setState('sending');
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', body: new FormData(form) });
      const data = (await res.json()) as { ok: boolean; message: string };
      if (!res.ok || !data.ok) throw new Error(data.message);
      setState('done'); setMessage(data.message); form.reset();
    } catch (err) {
      setState('error'); setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }
  if (state === 'done') return <p role="status" className="flex items-center gap-2 text-sm text-brass-light"><Check size={16} /> {message}</p>;
  return (
    <form onSubmit={submit}>
      <div className="flex border-b border-cream/30 pb-2 transition-colors focus-within:border-brass-light">
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input id="nl-email" type="email" name="email" required maxLength={200} placeholder="Email address" className="min-w-0 flex-1 bg-transparent py-3 text-[17px] text-cream outline-none placeholder:text-cream/40" />
        <button type="submit" disabled={state === 'sending'} className="inline-flex items-center gap-2 px-1 text-[15px] font-semibold text-brass-light transition-colors hover:text-cream" aria-label="Sign up">{state === 'sending' ? '…' : <>Sign up <ArrowRight size={15} /></>}</button>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="mt-4 flex items-start gap-2.5 text-[13px] text-cream/50">
        <input type="checkbox" name="consent" value="yes" required className="mt-0.5 accent-brass" />
        <span>I agree to receive occasional emails from ALL PACK and can unsubscribe any time.</span>
      </label>
      {state === 'error' && <p role="alert" className="mt-2 text-xs text-rose-300">{message}</p>}
    </form>
  );
}
