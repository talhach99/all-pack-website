import { CLIENTS } from '@/lib/company';

/** Typeset client names (no logos are reproduced). */
export function ClientStrip({ dark = false, label = 'Trusted by' }: { dark?: boolean; label?: string }) {
  return (
    <div className={`flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-10 ${dark ? 'text-cream' : 'text-ink'}`}>
      <p className={`shrink-0 text-[11px] font-bold uppercase tracking-[.22em] ${dark ? 'text-cream/50' : 'text-muted'}`}>{label}</p>
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
        {CLIENTS.map((c, i) => (
          <li key={c} className={`font-display text-[1.45rem] leading-none ${dark ? 'text-cream/80' : 'text-ink/75'} ${i % 2 ? 'italic' : 'tracking-[.04em] uppercase !text-[1.05rem] font-medium'}`}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
