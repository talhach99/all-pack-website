import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Photo } from './Photo';
import { Eyebrow } from './Section';

/** Inner page header on the mist ground, with an optional proof-style photo. */
export function PageHero({ kicker, title, description, children, aside, image, imageAlt = '', crumbs }: {
  kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode; aside?: React.ReactNode; image?: string; imageAlt?: string;
  crumbs?: { text: string; href?: string }[];
}) {
  const split = Boolean(aside || image);
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x pb-16 pt-8 sm:pb-20 sm:pt-10">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          {(crumbs || [{ text: kicker }]).map(c => (
            <span key={c.text} className="flex items-center gap-1.5"><ChevronRight size={14} strokeWidth={1.5} />{c.href ? <Link href={c.href} className="hover:text-ink">{c.text}</Link> : <span className="text-secondary">{c.text}</span>}</span>
          ))}
        </nav>
        <div className={split ? 'grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16' : ''}>
          <div className="anim-up">
            <Eyebrow>{kicker}</Eyebrow>
            <h1 className="mt-3 max-w-4xl text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-[1.06] tracking-[-.03em] text-ink">{title}</h1>
            {description && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary sm:text-lg">{description}</p>}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </div>
          {image && (
            <div className="crop m-3 sm:m-4">
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-white"><Photo name={image} alt={imageAlt} priority /></div>
            </div>
          )}
          {aside && !image && aside}
        </div>
      </div>
    </section>
  );
}
