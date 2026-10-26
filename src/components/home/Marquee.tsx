const items = ['Mailer boxes', 'Rigid gift boxes', 'Folding cartons', 'Corrugated shippers', 'Pizza boxes', 'Bakery boxes', 'Paper cups', 'Kraft bags', 'Courier bags', 'Stand-up pouches', 'Labels & stickers', 'Branded tape', 'Tissue paper', 'Jewellery boxes'];

export function Marquee() {
  return (
    <div className="relative overflow-hidden bg-ink py-6 text-cream sm:py-7" aria-label="Packaging formats we produce">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map(k => (
          <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map(t => (
              <li key={t} className="flex items-center gap-12 whitespace-nowrap px-6 font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] font-light italic">
                {t}
                <span className="text-sm not-italic text-brass" aria-hidden="true">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
