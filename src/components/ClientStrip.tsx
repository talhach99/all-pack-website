/* eslint-disable @next/next/no-img-element */
import { CLIENTS } from '@/lib/company';

/** Client logos on a quiet grid, in greyscale until hovered. */
export function ClientLogos({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {CLIENTS.map(c => (
        <li key={c.name} title={c.name} className="group flex h-24 w-[calc(50%-6px)] items-center justify-center rounded-2xl sm:w-[calc(33.333%-8px)] lg:w-[calc(14.285%-10.3px)] border border-line bg-white px-5 transition-colors hover:border-[#C9CFDC]">
          {c.logo
            ? <img src={c.logo} alt={c.name} loading="lazy" className="max-h-12 w-auto max-w-full object-contain opacity-70 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0" />
            : <span className="text-center text-[14px] font-semibold leading-tight text-secondary">{c.name}</span>}
        </li>
      ))}
    </ul>
  );
}
