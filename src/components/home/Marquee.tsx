const items = ['Mailer boxes', 'Rigid gift boxes', 'Folding cartons', 'Corrugated shippers', 'Pizza boxes', 'Bakery boxes', 'Paper cups', 'Kraft bags', 'Courier bags', 'Stand-up pouches', 'Labels & stickers', 'Branded tape', 'Tissue paper', 'Jewellery boxes'];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-6" aria-label="Packaging formats we produce">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map(k => (
          <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map(t => (
              <li key={t} className="flex items-center gap-8 px-4 font-display text-xl font-medium tracking-tight text-ink/70 sm:text-2xl">
                {t}
                <svg viewBox="0 0 10 9" className="h-2.5 w-2.5 text-sky" aria-hidden="true"><path d="M5 0 10 9H0Z" fill="currentColor" /></svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
