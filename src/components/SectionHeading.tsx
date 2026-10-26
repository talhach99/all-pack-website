import { Reveal } from './Reveal';

export function SectionHeading({ kicker, title, description, center = false, className = '', children, dark = false }: { kicker: string; title: React.ReactNode; description?: React.ReactNode; center?: boolean; className?: string; children?: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`mb-14 flex flex-col gap-8 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'} ${className}`}>
      <Reveal className="max-w-3xl">
        <p className="kicker">{kicker}</p>
        <h2 className={`h-section mt-6 ${dark ? '!text-cream' : ''}`}>{title}</h2>
        {description && center && <p className="lead mx-auto mt-6 max-w-2xl">{description}</p>}
      </Reveal>
      {(children || (description && !center)) && (
        <Reveal delay={.1} className="max-w-[40ch] shrink-0">
          {description && !center && <p className="lead">{description}</p>}
          {children && <div className={description && !center ? 'mt-6' : ''}>{children}</div>}
        </Reveal>
      )}
    </div>
  );
}
