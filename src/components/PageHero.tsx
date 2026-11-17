import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Eyebrow } from './Section';

/**
 * Inner page header on the same teal-blue stage as the homepage.
 * Without `aside` it is a compact centred band; with `aside` it becomes a large split hero.
 */
export function PageHero({ kicker, title, description, children, crumbs, aside }: {
  kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode; crumbs?: { text: string; href?: string }[]; aside?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className={`container-x ${aside ? 'pb-16 pt-7 sm:pb-20 lg:pb-24' : 'pb-14 pt-7 sm:pb-16'}`}>
        <nav aria-label="Breadcrumb" className="crumbs flex flex-wrap items-center gap-1.5 text-[13px]">
          <Link href="/">Home</Link>
          {(crumbs || [{ text: kicker }]).map(c => (
            <span key={c.text} className="flex items-center gap-1.5"><ChevronRight size={14} strokeWidth={1.5} />{c.href ? <Link href={c.href}>{c.text}</Link> : <span className="text-white">{c.text}</span>}</span>
          ))}
        </nav>
        {aside ? (
          <div className="mt-10 grid items-center gap-12 lg:mt-12 lg:min-h-[440px] lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="hero-in">
              <Eyebrow light>{kicker}</Eyebrow>
              <h1 className="h-page mt-5">{title}</h1>
              {description && <p className="lead mt-6 max-w-xl">{description}</p>}
              {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
            </div>
            <div className="anim-up d2">{aside}</div>
          </div>
        ) : (
          <div className="hero-in mx-auto mt-10 max-w-3xl text-center sm:mt-12">
            <Eyebrow light>{kicker}</Eyebrow>
            <h1 className="h-page mt-5">{title}</h1>
            {description && <p className="lead mx-auto mt-5 max-w-2xl">{description}</p>}
            {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
