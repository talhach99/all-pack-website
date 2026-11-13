/* eslint-disable @next/next/no-img-element */
import { clientWork, workImage } from '@/data/work';

/** Grid of formats and finishes we print: photo, then format and spec. */
export function ClientWork({ limit }: { limit?: number }) {
  const items = limit ? clientWork.slice(0, limit) : clientWork;
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-5">
      {items.map(w => (
        <li key={w.photo}>
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-ink/[.08] bg-mist">
              <img src={workImage(w.photo)} alt={w.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3">
              <span className="block text-[15px] font-medium leading-snug text-ink">{w.title}</span>
              <span className="mt-1 block text-[14px] text-muted">{w.detail}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
