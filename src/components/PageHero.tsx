/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export type HeroImage = { src: string; alt: string; label?: string; cover?: boolean };

/**
 * Inner page hero (Nov 2026 redesign).
 * - dark (default): navy night band with dot grid, brand glows and a floating three-photo collage or a custom aside.
 * - light: mist band with dot grid, for policy pages.
 */
export function PageHero({ kicker, title, description, children, crumbs, images, aside, stats, tone = 'dark' }: {
  kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode;
  crumbs?: { text: string; href?: string }[]; images?: HeroImage[]; aside?: React.ReactNode; stats?: [string, string][]; tone?: 'dark' | 'light';
}) {
  const dark = tone === 'dark';
  const side = aside || (images && images.length >= 3 ? <Collage images={images} /> : null);
  return (
    <section className={`ap relative overflow-hidden px-5 ${dark ? 'bg-[#070B1F] text-white' : 'bg-[#F4F5F8]'} ${side ? 'pb-16 pt-12 sm:pb-24 sm:pt-20' : 'pb-14 pt-12 sm:pb-20 sm:pt-20'}`}>
      <div aria-hidden="true" className={`absolute inset-0 [background-size:22px_22px] [mask-image:radial-gradient(ellipse_80%_70%_at_30%_40%,#000_25%,transparent_75%)] ${dark ? '[background-image:radial-gradient(rgba(255,255,255,.08)_1.2px,transparent_1.2px)]' : '[background-image:radial-gradient(rgba(10,32,140,.09)_1.2px,transparent_1.2px)]'}`} />
      <div aria-hidden="true" className={`absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full blur-[110px] ${dark ? 'bg-[#2B43F0]/35' : 'bg-[#2B43F0]/10'}`} />
      <div aria-hidden="true" className={`absolute -bottom-48 right-[-10%] h-[460px] w-[460px] rounded-full blur-[120px] ${dark ? 'bg-[#22C3EE]/20' : 'bg-[#22C3EE]/15'}`} />

      <div className={`relative mx-auto grid max-w-[1200px] items-center gap-12 ${side ? 'lg:grid-cols-[1.1fr_.9fr]' : ''}`}>
        <div className="flex flex-col gap-5">
          <nav aria-label="Breadcrumb" className={`ap-rise flex flex-wrap items-center gap-1.5 text-[14px] ${dark ? 'text-[#A9B1C7]' : 'text-[#5C6272]'}`}>
            <Link href="/" className="ap-ul">Home</Link>
            {(crumbs || [{ text: kicker }]).map(c => (
              <span key={c.text} className="flex gap-1.5"><span aria-hidden="true">/</span>{c.href ? <Link href={c.href} className="ap-ul">{c.text}</Link> : <span aria-current="page" className={dark ? 'text-white' : 'text-[#0B0D12]'}>{c.text}</span>}</span>
            ))}
          </nav>
          <span className={`ap-rise inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[.1em] ${dark ? 'border-white/15 bg-white/[.06] text-[#22C3EE]' : 'border-[#DDE2F3] bg-white text-[#2B43F0]'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />{kicker}
          </span>
          <h1 className={`ap-rise ap-d1 max-w-[880px] text-[38px] leading-[1.02] tracking-[-.04em] sm:text-[56px] lg:text-[66px] ${dark ? '!text-white' : ''}`}>{title}</h1>
          {description && <p className={`ap-rise ap-d2 max-w-[620px] text-[17px] leading-[1.6] sm:text-[19px] ${dark ? 'text-[#C3CAE0]' : 'text-[#4A5060]'}`}>{description}</p>}
          {children && <div className="ap-rise ap-d3 flex flex-wrap gap-2.5">{children}</div>}
          {stats && (
            <dl className={`ap-rise ap-d3 mt-2 grid max-w-[560px] grid-cols-3 gap-4 border-t pt-6 ${dark ? 'border-white/10' : 'border-[#E0E3EA]'}`}>
              {stats.map(([k, v]) => <div key={k} className="flex flex-col-reverse"><dt className={`mt-0.5 text-[13px] leading-snug ${dark ? 'text-[#A9B1C7]' : 'text-[#5C6272]'}`}>{v}</dt><dd className={`text-[24px] font-extrabold tracking-tight sm:text-[30px] ${dark ? 'text-white' : ''}`}>{k}</dd></div>)}
            </dl>
          )}
        </div>
        {side && <div className="ap-rise ap-d2 relative">{side}</div>}
      </div>
    </section>
  );
}

const fit = (im: HeroImage) => `absolute inset-0 h-full w-full ${im.cover ? 'object-cover' : 'object-contain px-1 pb-9 pt-1 sm:px-2 sm:pb-11 sm:pt-2'}`;

/** Three photos: a tall one and two stacked, with floating name chips. */
function Collage({ images }: { images: HeroImage[] }) {
  const [a, b, c] = images;
  const chip = 'absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-extrabold text-[#0B0D12] shadow-sm backdrop-blur sm:text-[13px]';
  return (
    <div className="grid h-[300px] grid-cols-[1.15fr_1fr] gap-3 sm:h-[440px] sm:gap-4">
      <div className="ap-float relative overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
        <img src={a.src} alt={a.alt} width={640} height={800} fetchPriority="high" className={fit(a)} />
        {a.label && <span className={chip}>{a.label}</span>}
      </div>
      <div className="grid h-full min-h-0 grid-rows-2 gap-3 pt-8 sm:gap-4 sm:pt-12">
        {[b, c].map((im, i) => (
          <div key={im.src} className="ap-float relative min-h-0 overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]" style={{ animationDelay: `${(i + 1) * 1.2}s` }}>
            <img src={im.src} alt={im.alt} width={640} height={480} loading="lazy" className={fit(im)} />
            {im.label && <span className={chip}>{im.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** A glass card used as the hero aside on dark heroes. */
export function HeroCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[.08] to-white/[.03] p-6 text-white backdrop-blur sm:p-8 ${className}`}>{children}</div>;
}
