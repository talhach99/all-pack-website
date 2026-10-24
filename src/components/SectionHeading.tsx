import { Reveal } from './Reveal';

export function SectionHeading({ kicker, title, description, center = false, className = '', children }: { kicker: string; title: React.ReactNode; description?: React.ReactNode; center?: boolean; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`mb-14 flex flex-col gap-6 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'} ${className}`}>
      <Reveal className={center ? 'max-w-3xl' : 'max-w-3xl'}>
        <p className="kicker mb-5">{kicker}</p>
        <h2 className="h-section">{title}</h2>
        {description && <p className={`lead mt-5 max-w-2xl ${center ? 'mx-auto' : ''}`}>{description}</p>}
      </Reveal>
      {children && <Reveal delay={.1} className="shrink-0">{children}</Reveal>}
    </div>
  );
}
