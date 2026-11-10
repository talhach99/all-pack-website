import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Atlas-style numbered eyebrow: (01) LABEL ——— */
export function Eyebrow({ n, children, light = false }: { n?: number | string; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[.18em] ${light ? 'text-cyan' : 'text-brand'}`}>
      {n !== undefined && (
        <span className={`grid h-8 w-8 place-items-center rounded-full border text-[11px] tracking-normal ${light ? 'border-white/25 text-white' : 'border-brand/30 text-brand'}`}>{String(n).padStart(2, '0')}</span>
      )}
      {children}
      <span className={`h-px w-10 ${light ? 'bg-white/25' : 'bg-brand/30'}`} aria-hidden="true" />
    </p>
  );
}

/** Section heading: eyebrow + title on the left, optional pill action on the right. */
export function SectionHead({ n, kicker, title, sub, action, light = false, className = 'mb-12' }: {
  n?: number | string; kicker: string; title: React.ReactNode; sub?: React.ReactNode; action?: { text: string; href: string }; light?: boolean; className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div className="max-w-3xl">
        <Eyebrow n={n} light={light}>{kicker}</Eyebrow>
        <h2 className={`h-section mt-5 ${light ? '!text-white' : ''}`}>{title}</h2>
        {sub && <p className={`mt-4 max-w-2xl text-[17px] leading-relaxed ${light ? 'text-cream/70' : 'text-muted'}`}>{sub}</p>}
      </div>
      {action && <PillLink href={action.href} light={light}>{action.text}</PillLink>}
    </div>
  );
}

export function PillLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition ${light ? 'border-white/25 bg-white text-ink hover:bg-cream' : 'border-ink/20 bg-white text-ink hover:border-ink'}`}>
      {children} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
