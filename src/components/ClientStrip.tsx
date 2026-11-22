/* eslint-disable @next/next/no-img-element */
import type { Client } from '@/lib/company';
import { getSite } from '@/lib/site';

function Tile({ c }: { c: Client }) {
  return (
    <li title={c.name} className="flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-5">
      {c.logo
        ? <img src={c.logo} alt={c.name} loading="lazy" className={`${c.wide ? 'max-h-10' : 'max-h-12'} w-auto max-w-full object-contain`} />
        : <span className="text-center text-[14px] font-semibold leading-tight text-secondary">{c.name}</span>}
    </li>
  );
}

/** One endlessly sliding row. The list is repeated so the loop has no gap. */
function Row({ items, reverse = false, duration = 40 }: { items: Client[]; reverse?: boolean; duration?: number }) {
  const set = [...items, ...items];
  return (
    <div className="logo-marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div className="logo-track flex w-max" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        {[0, 1].map(half => (
          <ul key={half} aria-hidden={half === 1 || undefined} className="flex shrink-0 gap-3 pr-3">
            {set.map((c, i) => <Tile key={`${c.name}-${i}`} c={c} />)}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Client logos in two sliding rows: the top row moves left, the bottom row moves right. Hover pauses; reduced motion keeps them still. */
export async function ClientLogos({ className = '' }: { className?: string }) {
  const CLIENTS = (await getSite()).clients;
  if (!CLIENTS.length) return null;
  const mid = Math.ceil(CLIENTS.length / 2);
  return (
    <div className={`grid gap-3 ${className}`}>
      <Row items={CLIENTS.slice(0, mid)} />
      <Row items={CLIENTS.slice(mid)} reverse />
    </div>
  );
}
