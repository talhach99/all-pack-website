import { Reveal } from './Reveal';
import { Photo } from './Photo';

export function PageHero({ kicker, title, description, children, aside, image, imageAlt = '' }: { kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode; aside?: React.ReactNode; image?: string; imageAlt?: string }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-14 sm:pb-20 sm:pt-20">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(180,138,79,.14),transparent)]" aria-hidden="true" />
      <div className={`container-x relative ${aside || image ? 'grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16' : ''}`}>
        <Reveal>
          <p className="kicker">{kicker}</p>
          <h1 className="h-display mt-6 max-w-5xl !text-[clamp(2.6rem,6vw,5.5rem)]">{title}</h1>
          {description && <p className="lead mt-7 max-w-2xl">{description}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
        {image && <Reveal delay={.12}><div className="aspect-[5/4] overflow-hidden rounded-[24px] shadow-plate"><Photo name={image} alt={imageAlt} priority /></div></Reveal>}
        {aside && !image && <Reveal delay={.15}>{aside}</Reveal>}
      </div>
    </section>
  );
}
