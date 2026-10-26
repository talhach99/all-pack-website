import Link from 'next/link';

/** ALL PACK triangle mark. `light` = for dark backgrounds. */
export function LogoMark({ className = 'h-9 w-9', light = false }: { className?: string; light?: boolean }) {
  const shape = light ? '#F4EFE6' : '#0D1220';
  const letter = light ? '#0D1220' : '#F4EFE6';
  return (
    <svg viewBox="0 0 64 58" className={className} aria-hidden="true">
      <path d="M32 2 62 55H2Z" fill={shape} strokeLinejoin="round" />
      <path d="M26.5 46V22.5h9.2c5.6 0 8.8 3 8.8 7.6 0 4.7-3.3 7.7-8.8 7.7h-3.6V46Zm5.6-12.6h3.1c2.4 0 3.6-1.2 3.6-3.3s-1.2-3.2-3.6-3.2h-3.1Z" fill={letter} />
      <path d="M6 55h52" stroke="#B48A4F" strokeWidth="2.4" />
    </svg>
  );
}

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="ALL PACK — home" className={`group inline-flex shrink-0 items-center gap-3 ${className}`}>
      <LogoMark light={light} className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[-8deg]" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[21px] tracking-[.03em] ${light ? 'text-cream' : 'text-ink'}`} style={{ fontWeight: 480 }}>ALL PACK</span>
        <span className={`mt-1.5 text-[9px] font-semibold uppercase tracking-[.3em] ${light ? 'text-cream/55' : 'text-muted'}`}>The Packaging Experts</span>
      </span>
    </Link>
  );
}
