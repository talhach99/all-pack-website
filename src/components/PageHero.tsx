import { Reveal } from './Reveal';

export function PageHero({ kicker, title, description, children, aside }: { kicker: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(58,127,192,.16),transparent)]" aria-hidden="true" />
      <div className={`container-x relative ${aside ? 'grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]' : ''}`}>
        <Reveal>
          <p className="kicker mb-6">{kicker}</p>
          <h1 className="h-display max-w-5xl !text-[clamp(2.6rem,6.2vw,5.75rem)]">{title}</h1>
          {description && <p className="lead mt-7 max-w-2xl">{description}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
        {aside && <Reveal delay={.15}>{aside}</Reveal>}
      </div>
    </section>
  );
}
