'use client';
import { useState } from 'react';
import { btnDark, inputCls, Label } from './ui';

export function Login() {
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr('');
    const d = new FormData(e.currentTarget);
    try {
      const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: d.get('username'), password: d.get('password') }) });
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      if (r.ok) { location.reload(); return; }
      setErr(j.error || 'Sign-in failed.');
    } catch { setErr('Could not reach the server.'); }
    setBusy(false);
  }
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-line bg-white p-7 shadow-lift">
        <p className="font-display text-[22px] font-semibold text-navy">ALL PACK <span className="font-normal text-muted">admin</span></p>
        <p className="mt-1 text-[14px] text-muted">Sign in to manage your website.</p>
        <label className="mt-6 block"><Label>ID</Label><input name="username" autoComplete="username" required autoFocus className={inputCls} /></label>
        <label className="mt-4 block"><Label>Password</Label><input name="password" type="password" autoComplete="current-password" required className={inputCls} /></label>
        {err && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[14px] text-red-700">{err}</p>}
        <button type="submit" disabled={busy} className={`${btnDark} mt-6 w-full`}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}
