/* eslint-disable @next/next/no-img-element */
import { machines } from '@/data/catalog';

/** Manufacturing capabilities: one photo card per press or line. Scrolls sideways on small screens. */
export function Machines() {
  return (
    <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {machines.map((m, i) => (
        <li key={m.name} className="machine-card group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-white/10 bg-white text-ink sm:w-auto">
          <div className="relative aspect-[4/3.4] overflow-hidden bg-card">
            <img src={m.image} alt={`${m.name}: ${m.type.toLowerCase()}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <span className="absolute left-5 top-5 font-mono text-[13px] tracking-[.12em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.45)]">/ {String(i + 1).padStart(2, '0')}</span>
          </div>
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <p className="text-[13px] font-semibold text-brand">{m.type}</p>
            <h3 className="mt-2 text-[22px] leading-tight">{m.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">{m.text}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-5">{m.best.map(b => <li key={b} className="chip">{b}</li>)}</ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
