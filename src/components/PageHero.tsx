/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export type HeroImage = { src: string; alt: string; label?: string; cover?: boolean };

/**
 * Inner page hero (Nov 2026 redesign).
 * Ivory band with ink headline (navy accent words via .ap-accent), and a floating three-photo collage or a custom aside.
 */
export function PageHero({ kicker, title, description, children, crumbs, images, aside, stats }: {
  kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode;
  crumbs?: { text: string; href?: string }[]; images?: HeroImage[]; aside?: React.ReactNode; stats?: [string, string][]; tone?: 'dark' | 'light';
}) {
  const side = aside || (images && images.length >= 3 ? <Collage images={images} /> : null);
  return (
    <section className={`ap relative overflow-hidden bg-[#F6F3EC] px-5 ${side ? 'pb-16 pt-12 sm:pb-24 sm:pt-20' : 'pb-14 pt-12 sm:pb-20 sm:pt-20'}`}>
      <div className={`relative mx-auto grid max-w-[1200px] items-center gap-12 ${side ? 'lg:grid-cols-[1.1fr_.9fr]' : ''}`}>
        <div className="flex flex-col gap-5">
          <nav aria-label="Breadcrumb" className="ap-rise flex flex-wrap items-center gap-1.5 text-[14px] text-[#6E685C]">
            <Link href="/" className="ap-ul">Home</Link>
            {(crumbs || [{ text: kicker }]).map(c => (
              <span key={c.text} className="flex gap-1.5"><span aria-hidden="true">/</span>{c.href ? <Link href={c.href} className="ap-ul">{c.text}</Link> : <span aria-current="page" className="text-[#0B0D12]">{c.text}</span>}</span>
            ))}
          </nav>
          <span className="ap-rise inline-flex items-center gap-3 self-start text-[12px] font-extrabold uppercase tracking-[.14em] text-[#0A208C]">
            <span className="h-[2px] w-6 bg-[#0A208C]" />{kicker}
          </span>
          <h1 className="ap-rise ap-d1 max-w-[880px] text-[40px] leading-[1.02] tracking-[-.04em] sm:text-[56px] lg:text-[66px]">{title}</h1>
          {description && <p className="ap-rise ap-d2 max-w-[620px] text-[17px] leading-[1.6] text-[#4F4A40] sm:text-[19px]">{description}</p>}
          {children && <div className="ap-rise ap-d3 flex flex-wrap gap-2.5">{children}</div>}
          {stats && (
            <dl className="ap-rise ap-d3 mt-2 grid max-w-[560px] grid-cols-3 gap-4 border-t border-[#E2DCCD] pt-6">
              {stats.map(([k, v]) => <div key={k} className="flex flex-col-reverse"><dt className="mt-0.5 text-[13px] leading-snug text-[#6E685C]">{v}</dt><dd className="text-[24px] font-extrabold tracking-tight sm:text-[30px]">{k}</dd></div>)}
            </dl>
          )}
        </div>
        {side && <div className="ap-rise ap-d2 relative">{side}</div>}
      </div>
    </section>
  );
}

/** The three banner pictures for a page, from the admin's Page text tab (hero.<page>.img1…3 and their labels). */
export function heroImages(t: Record<string, string>, page: string, cover: boolean[] = []): HeroImage[] {
  return [1, 2, 3].map((n, i) => {
    const label = t[`hero.${page}.img${n}.label`] ?? '';
    return { src: t[`hero.${page}.img${n}`] ?? '', alt: label ? `ALL PACK ${label.toLowerCase()}` : 'ALL PACK packaging', label: label || undefined, cover: cover[i] ?? false };
  }).filter(im => im.src);
}

/** Chip link for hero rows on the ivory background. */
export const heroChip = 'rounded-full border border-[#D9D3C5] px-4 py-2.5 text-[14px] font-bold transition hover:border-[#0B0D12] hover:bg-[#0B0D12] hover:text-white';

const fit = (im: HeroImage) => `absolute inset-0 h-full w-full ${im.cover ? 'object-cover' : 'object-contain px-1 pb-9 pt-1 sm:px-2 sm:pb-11 sm:pt-2'}`;

/** Three photos: a tall one and two stacked, with floating name chips. */
function Collage({ images }: { images: HeroImage[] }) {
  const [a, b, c] = images;
  const chip = 'absolute bottom-3 left-3 rounded-full bg-[#F6F3EC] px-3 py-1.5 text-[12px] font-extrabold text-[#0B0D12] sm:text-[13px]';
  return (
    <div className="grid h-[300px] grid-cols-[1.15fr_1fr] gap-3 sm:h-[440px] sm:gap-4">
      <div className="ap-float relative overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-35px_rgba(60,45,20,.35)]">
        <img src={a.src} alt={a.alt} width={640} height={800} fetchPriority="high" className={fit(a)} />
        {a.label && <span className={chip}>{a.label}</span>}
      </div>
      <div className="grid h-full min-h-0 grid-rows-2 gap-3 pt-8 sm:gap-4 sm:pt-12">
        {[b, c].map((im, i) => (
          <div key={im.src} className="ap-float relative min-h-0 overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-35px_rgba(60,45,20,.35)]" style={{ animationDelay: `${(i + 1) * 1.2}s` }}>
            <img src={im.src} alt={im.alt} width={640} height={480} loading="lazy" className={fit(im)} />
            {im.label && <span className={chip}>{im.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** White card used as the hero aside. */
export function HeroCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[24px] bg-white p-6 shadow-[0_30px_60px_-35px_rgba(60,45,20,.35)] sm:p-8 ${className}`}>{children}</div>;
}

/** Banner heading from the admin Page text fields: heading plus navy accent words. */
export function heroTitle(copy: Record<string, string>, page: string): React.ReactNode {
  const accent = copy[`hero.${page}.accent`];
  return <>{copy[`hero.${page}.title`]}{accent && <> <span className="ap-accent">{accent}</span></>}</>;
}
