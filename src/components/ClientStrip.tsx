/* eslint-disable @next/next/no-img-element */
import { CLIENTS, type Client } from '@/lib/company';

function Logo({ c, onDark }: { c: Client; onDark: boolean }) {
  return (
    <li
      title={c.name}
      className={`flex h-20 ${c.wide ? 'w-72' : 'w-40'} shrink-0 items-center justify-center rounded-xl border px-4 py-3 ${onDark ? 'border-white/10 bg-white' : 'border-line bg-white'}`}
    >
      {c.logo ? (
        <img src={c.logo} alt={c.name} loading="lazy" className="max-h-14 w-auto max-w-full object-contain" />
      ) : (
        <span className="text-center text-[15px] font-medium leading-tight text-ink">{c.name}</span>
      )}
    </li>
  );
}

/** One row that slides right to left forever. Content is repeated so the loop has no gap. */
function Row({ items, onDark, duration, offset = 0 }: { items: Client[]; onDark: boolean; duration: number; offset?: number }) {
  const set = [...items, ...items]; // one "half" is wider than any screen
  return (
    <div className="logo-marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div className="logo-track flex w-max" style={{ animationDuration: `${duration}s`, animationDelay: `${-offset}s` }}>
        {[0, 1].map(half => (
          <ul key={half} aria-hidden={half === 1 || undefined} className="flex shrink-0 gap-4 pr-4">
            {set.map((c, i) => <Logo key={`${c.name}-${i}`} c={c} onDark={onDark} />)}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Client logos in two rows sliding right to left. Hover pauses; reduced-motion users see them still. */
export function ClientLogos({ onDark = false, className = '' }: { onDark?: boolean; align?: 'center' | 'start'; className?: string }) {
  const mid = Math.ceil(CLIENTS.length / 2);
  return (
    <div className={`grid gap-4 ${className}`}>
      <Row items={CLIENTS.slice(0, mid)} onDark={onDark} duration={40} />
      <Row items={CLIENTS.slice(mid)} onDark={onDark} duration={40} offset={8} />
    </div>
  );
}

/** Label plus logos, used under page sections. */
export function ClientStrip({ onDark = false, label = 'Trusted by' }: { onDark?: boolean; label?: string }) {
  return (
    <div>
      <p className={`mb-4 text-[13px] font-medium ${onDark ? 'text-cyan' : 'text-muted'}`}>{label}</p>
      <ClientLogos onDark={onDark} />
    </div>
  );
}
