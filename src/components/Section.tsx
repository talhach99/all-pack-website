import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Quiet section label in sentence case. `n` is accepted for old call sites and ignored. */
export function Eyebrow({ children, light = false }: { n?: number | string; children: React.ReactNode; light?: boolean }) {
  return <p className={`kicker ${light ? '!text-brand-light' : ''}`}>{children}</p>;
}

/** Section heading: label + title on the left, optional text link on the right. */
export function SectionHead({ kicker, title, sub, action, light = false, className = 'mb-10 sm:mb-12' }: {
  n?: number | string; kicker: string; title: React.ReactNode; sub?: React.ReactNode; action?: { text: string; href: string }; light?: boolean; className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-4 ${className}`}>
      <div className="max-w-3xl">
        <Eyebrow light={light}>{kicker}</Eyebrow>
        <h2 className={`h-section mt-5 ${light ? '!text-white' : ''}`}>{title}</h2>
        {sub && <p className={`mt-4 max-w-2xl text-[18px] leading-relaxed ${light ? "text-cyan" : "text-secondary"}`}>{sub}</p>}
      </div>
      {action && <PillLink href={action.href} light={light}>{action.text}</PillLink>}
    </div>
  );
}

/** Text link with an arrow. Name kept for old call sites. */
export function PillLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`group inline-flex shrink-0 items-center gap-2 text-[15px] font-medium transition-colors ${light ? 'text-white hover:text-cyan-light' : 'text-ink hover:text-brand'}`}>
      {children} <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-150 group-hover:translate-x-0.5" />
    </Link>
  );
}
