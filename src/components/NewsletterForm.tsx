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
  if (state === 'done') return <p role="status" className="mt-5 flex items-center gap-2 text-sm text-emerald-300"><Check size={16} /> {message}</p>;
  return (
    <form onSubmit={submit} className="mt-5">
      <div className="flex rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-white/40">
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input id="nl-email" type="email" name="email" required maxLength={200} placeholder="you@company.com" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40" />
        <button type="submit" disabled={state === 'sending'} className="btn-white btn-sm !min-h-10" aria-label="Sign up">{state === 'sending' ? '…' : <>Sign up <ArrowRight size={15} /></>}</button>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="mt-3 flex items-start gap-2 text-xs text-white/50">
        <input type="checkbox" name="consent" value="yes" required className="mt-0.5 accent-sky" />
        <span>I agree to receive occasional emails from ALL PACK and can unsubscribe any time.</span>
      </label>
      {state === 'error' && <p role="alert" className="mt-2 text-xs text-rose-300">{message}</p>}
    </form>
  );
}
