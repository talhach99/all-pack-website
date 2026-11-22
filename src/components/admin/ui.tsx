'use client';
import { useState } from 'react';

export const inputCls = 'w-full rounded-lg border border-line bg-white px-3 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/10';
export const btn = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[14px] font-semibold transition-colors disabled:opacity-50';
export const btnDark = `${btn} bg-navy text-white hover:bg-[#1a2160]`;
export const btnLine = `${btn} border border-line bg-white text-ink hover:border-navy`;
export const btnDanger = `${btn} border border-red-200 bg-white text-red-700 hover:bg-red-50`;

export function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return <span className="mb-1.5 block text-[13px] font-semibold text-ink">{children}{hint && <span className="ml-2 font-normal text-muted">{hint}</span>}</span>;
}

export function Toast({ msg, kind }: { msg: string; kind: 'ok' | 'err' }) {
  if (!msg) return null;
  return <div role="status" className={`fixed bottom-5 left-1/2 z-[300] -translate-x-1/2 rounded-xl px-5 py-3 text-[14px] font-semibold shadow-lift ${kind === 'ok' ? 'bg-navy text-white' : 'bg-red-600 text-white'}`}>{msg}</div>;
}

/** Save bar shown at the bottom of an editor: stays visible while scrolling. */
export function SaveBar({ dirty, saving, onSave, onReset, resetLabel = 'Restore original wording' }: { dirty: boolean; saving: boolean; onSave: () => void; onReset?: () => void; resetLabel?: string }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
      <p className="text-[13px] text-muted">{dirty ? 'You have unsaved changes.' : 'All changes saved.'}</p>
      <div className="flex gap-2">
        {onReset && (confirm
          ? <><button type="button" className={btnDanger} onClick={() => { setConfirm(false); onReset(); }}>Yes, restore</button><button type="button" className={btnLine} onClick={() => setConfirm(false)}>Cancel</button></>
          : <button type="button" className={btnLine} onClick={() => setConfirm(true)}>{resetLabel}</button>)}
        <button type="button" className={btnDark} disabled={!dirty || saving} onClick={onSave}>{saving ? 'Saving…' : 'Save changes'}</button>
      </div>
    </div>
  );
}
