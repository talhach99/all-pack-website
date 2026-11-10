/* eslint-disable @next/next/no-img-element */
import { clientWork, workImage } from '@/data/work';

/** Grid of packaging printed for real clients: photo, then brand, product and format as a job ticket. */
export function ClientWork({ limit }: { limit?: number }) {
  const items = limit ? clientWork.slice(0, limit) : clientWork;
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-5">
      {items.map(w => (
        <li key={w.image}>
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line bg-white">
              <img
                src={workImage(w.image)}
                alt={`${w.brand} ${w.product}, ${w.format.toLowerCase()} printed by ALL PACK`}
                loading="lazy"
                style={w.focus ? { objectPosition: w.focus } : undefined}
                className={`h-full w-full ${w.fit === 'cover' ? 'object-cover' : 'object-contain p-3'}`}
              />
            </div>
            <figcaption className="mt-3">
              <span className="block text-[15px] font-medium leading-snug text-ink">{w.brand} {w.product}</span>
              <span className="meta mt-1 block">{w.format}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
