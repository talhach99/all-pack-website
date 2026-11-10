import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Photo } from './Photo';
import { Eyebrow } from './Section';

/** Dark navy page header used across inner pages. */
export function PageHero({ kicker, title, description, children, aside, image, imageAlt = '', crumbs }: {
  kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode; aside?: React.ReactNode; image?: string; imageAlt?: string;
  crumbs?: { text: string; href?: string }[];
}) {
  const split = Boolean(aside || image);
  return (
    <section className="grain-dark relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10 opacity-[.14] [background-image:radial-gradient(#8FA6FF_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(60%_70%_at_80%_30%,#000,transparent)]" aria-hidden="true" />
      <div className="absolute -right-40 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-brand/35 blur-[140px]" aria-hidden="true" />
      <div className="container-x pb-16 pt-10 sm:pb-20 sm:pt-12">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-1.5 text-[13px] text-cream/55">
          <Link href="/" className="hover:text-white">Home</Link>
          {(crumbs || [{ text: kicker }]).map(c => (
            <span key={c.text} className="flex items-center gap-1.5"><ChevronRight size={13} />{c.href ? <Link href={c.href} className="hover:text-white">{c.text}</Link> : <span className="text-cream/85">{c.text}</span>}</span>
          ))}
        </nav>
        <div className={split ? 'grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16' : ''}>
          <div>
            <div className="anim-up"><Eyebrow light>{kicker}</Eyebrow></div>
            <h1 className="anim-up d1 mt-6 max-w-4xl text-[clamp(2.5rem,4.8vw,4rem)] font-semibold leading-[1.05] tracking-[-.035em] text-white [&_.accent]:text-[#8FA6FF]">{title}</h1>
            {description && <p className="anim-up d2 mt-6 max-w-2xl text-[17px] leading-relaxed text-cream/70 sm:text-lg">{description}</p>}
            {children && <div className="anim-up d3 mt-9 flex flex-wrap gap-3">{children}</div>}
          </div>
          {image && (
            <div className="anim-up d3 relative pb-4 pl-4 pt-4">
              <div className="absolute bottom-0 left-0 right-6 top-0 rounded-[14px] border border-cyan/50" aria-hidden="true" />
              <div className="anim-float relative aspect-[5/4] overflow-hidden rounded-[14px] bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,.7)]"><Photo name={image} alt={imageAlt} priority /></div>
            </div>
          )}
          {aside && !image && aside}
        </div>
      </div>
    </section>
  );
}
