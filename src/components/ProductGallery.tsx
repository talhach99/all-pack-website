'use client';
import { useState } from 'react';
import { Photo } from './Photo';

export function ProductGallery({ images }: { images: { name: string; alt: string; label?: string }[] }) {
  const [i, setI] = useState(0);
  const cur = images[i];
  return (
    <div>
      <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-paper-deep">
        {images.map((im, k) => (
          <div key={im.name} className={`absolute inset-0 transition-opacity duration-500 ${k === i ? 'opacity-100' : 'opacity-0'}`} aria-hidden={k !== i}>
            <Photo name={im.name} alt={im.alt} priority={k === 0} sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
        ))}
        {cur.label && <p className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3.5 py-1.5 text-xs font-semibold text-ink/80 backdrop-blur">{cur.label}</p>}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3" role="tablist" aria-label="Product photos">
          {images.map((im, k) => (
            <button key={im.name} role="tab" aria-selected={k === i} aria-label={`Show photo ${k + 1}: ${im.alt}`} onClick={() => setI(k)}
              className={`aspect-[5/4] overflow-hidden rounded-xl border-2 transition-all ${k === i ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'}`}>
              <Photo name={im.name} alt="" sizes="160px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
