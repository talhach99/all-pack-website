import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</p>;
}

/** Centred section heading: label, one large title, optional supporting line. */
export function SectionHead({ kicker, title, sub, light = false, className = 'mb-14 sm:mb-16', as: H = 'h2' }: {
  kicker: string; title: React.ReactNode; sub?: React.ReactNode; light?: boolean; className?: string; as?: 'h1' | 'h2';
}) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <Eyebrow light={light}>{kicker}</Eyebrow>
      <H className={`h-section mt-5 ${light ? '!text-white' : ''}`}>{title}</H>
      {sub && <p className={`mx-auto mt-5 max-w-2xl text-[17px] leading-[1.65] sm:text-[18px] ${light ? 'text-cyan' : 'text-secondary'}`}>{sub}</p>}
    </div>
  );
}

export function ArrowLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-brand ${className}`}>
      {children} <ArrowRight size={16} strokeWidth={1.75} className="transition-transform duration-150 group-hover:translate-x-0.5" />
    </Link>
  );
}
