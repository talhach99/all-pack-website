import Link from 'next/link';

export function LogoMark({ className = 'h-9 w-9', light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 64 58" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={light ? 'apm-l' : 'apm'} x1="0" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor={light ? '#FFFFFF' : '#4F86C6'} />
          <stop offset="1" stopColor={light ? '#C9D8F2' : '#2B3A8C'} />
        </linearGradient>
      </defs>
      <path d="M32 2 62 55H2Z" fill={`url(#${light ? 'apm-l' : 'apm'})`} strokeLinejoin="round" />
      <path d="M26.5 46V22.5h9.2c5.6 0 8.8 3 8.8 7.6 0 4.7-3.3 7.7-8.8 7.7h-3.6V46Zm5.6-12.6h3.1c2.4 0 3.6-1.2 3.6-3.3s-1.2-3.2-3.6-3.2h-3.1Z" fill={light ? '#2B3A8C' : '#fff'} />
    </svg>
  );
}

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="ALL PACK — home" className={`group inline-flex shrink-0 items-center gap-2.5 ${className}`}>
      <LogoMark light={light} className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[-8deg]" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] font-bold tracking-[.06em] ${light ? 'text-white' : 'text-ink'}`}>
          ALL <span className={light ? 'text-sky-light' : 'text-sky'}>PACK</span>
        </span>
        <span className={`mt-1 text-[8.5px] font-semibold uppercase tracking-[.28em] ${light ? 'text-white/60' : 'text-muted'}`}>The Packaging Experts</span>
      </span>
    </Link>
  );
}
