import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Eyebrow } from './Section';

/** Inner page header: breadcrumb, label, one large centred title and a supporting line. */
export function PageHero({ kicker, title, description, children, crumbs }: {
  kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode; crumbs?: { text: string; href?: string }[];
}) {
  return (
    <section className="page-hero">
      <div className="container-x pb-16 pt-8 sm:pb-20">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          {(crumbs || [{ text: kicker }]).map(c => (
            <span key={c.text} className="flex items-center gap-1.5"><ChevronRight size={14} strokeWidth={1.5} />{c.href ? <Link href={c.href} className="hover:text-ink">{c.text}</Link> : <span className="text-secondary">{c.text}</span>}</span>
          ))}
        </nav>
        <div className="anim-up mx-auto mt-12 max-w-3xl text-center sm:mt-14">
          <Eyebrow>{kicker}</Eyebrow>
          <h1 className="h-page mt-5">{title}</h1>
          {description && <p className="lead mx-auto mt-6 max-w-2xl">{description}</p>}
          {children && <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
