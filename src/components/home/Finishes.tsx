'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LogoMark } from '../Logo';
import { Reveal } from '../Reveal';

const finishes = [
  { id: 'matte', name: 'Matte lamination', text: 'A calm, glare-free surface with a modern, understated look. Our most popular all-rounder.' },
  { id: 'gloss', name: 'Gloss lamination', text: 'Rich, saturated colour and a reflective shine that makes photography and bold graphics pop.' },
  { id: 'soft', name: 'Soft-touch', text: 'A velvety, tactile coating that customers notice the moment they pick the box up.' },
  { id: 'foil', name: 'Foil stamping', text: 'Metallic gold, silver or coloured foil on logos and details for an unmistakably premium cue.' },
  { id: 'kraft', name: 'Natural kraft', text: 'Honest, earthy and recyclable-looking. Perfect with a single-colour print for a crafted feel.' },
];

export function Finishes() {
  const [active, setActive] = useState(0);
  const f = finishes[active];
  const markLight = f.id !== 'kraft';
  return (
    <section className="dark-section grain section" id="finishes">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="kicker">Print &amp; finishing</p>
            <h2 className="h-section mt-6">The finish is what they <span className="accent">feel.</span></h2>
            <p className="lead mt-6 max-w-[48ch]">Choose from finishes that change how your packaging looks, feels and photographs. Tap through to preview.</p>
            <div role="tablist" aria-label="Finishes" className="mt-10 flex flex-wrap gap-2.5">
              {finishes.map((x, i) => (
                <button
                  key={x.id} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
                  className={`h-11 rounded-full border px-5 text-sm font-semibold transition-all duration-300 ${i === active ? 'border-cream bg-cream text-ink' : 'border-cream/15 text-cream/60 hover:border-cream/40 hover:text-cream'}`}
                >{x.name}</button>
              ))}
            </div>
            <div className="mt-8 min-h-[110px]" aria-live="polite">
              <h3 className="font-display text-3xl font-light text-cream">{f.name}</h3>
              <p className="mt-2 max-w-[44ch] text-cream/60">{f.text}</p>
            </div>
          </Reveal>

          <Reveal delay={.1}>
            <div className="relative mx-auto grid aspect-square w-full max-w-[520px] place-items-center [perspective:1300px]">
              <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(212,176,122,.22),transparent_72%)]" aria-hidden="true" />
              <div className="absolute bottom-[13%] h-8 w-[58%] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,.6),transparent)] blur-md" aria-hidden="true" />
              <span className="absolute left-1/2 top-[7%] z-[2] -translate-x-1/2 whitespace-nowrap rounded-full border border-cream/15 bg-ink/60 px-4 py-2 text-xs tracking-wide text-cream/60">Mailer box · {f.name}</span>
              <div className="box3d z-[1] animate-spin3d hover:[animation-play-state:paused]" data-f={f.id} aria-hidden="true">
                <div className="face f-top"><div className="print"><LogoMark light={markLight} className="h-8 w-8 sm:h-10 sm:w-10" /><span className="word font-display text-lg tracking-[.06em] sm:text-2xl">ALL PACK</span></div></div>
                <div className="face f-bot" />
                <div className="face f-front"><div className="print"><span className="word text-[9px] font-semibold tracking-[.3em] sm:text-[13px]">THE PACKAGING EXPERTS</span></div></div>
                <div className="face f-back"><div className="print"><span className="word font-display text-base tracking-[.06em] sm:text-xl">ALL PACK</span></div></div>
                <div className="face f-l"><div className="print"><LogoMark light={markLight} className="h-7 w-7 sm:h-9 sm:w-9" /></div></div>
                <div className="face f-r"><div className="print"><LogoMark light={markLight} className="h-7 w-7 sm:h-9 sm:w-9" /></div></div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 sm:mt-28">
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[28px] border border-cream/10 bg-[linear-gradient(120deg,#1D2640,#141B2E)] p-8 sm:p-14 lg:grid-cols-[1.3fr_1fr]">
            <div className="pointer-events-none absolute inset-0 opacity-[.05] [background-image:linear-gradient(to_right,#EFE9DD_1px,transparent_1px),linear-gradient(to_bottom,#EFE9DD_1px,transparent_1px)] [background-size:60px_60px] [mask-image:linear-gradient(90deg,transparent,#000_60%)]" aria-hidden="true" />
            <div className="relative">
              <p className="kicker">ALL PACK 3D Studio</p>
              <h3 className="mt-5 font-display text-[clamp(2rem,3.6vw,3.1rem)] font-light leading-tight text-cream">Design your box. Spin it in <em className="text-brass-light">3D.</em></h3>
              <p className="mt-4 max-w-[48ch] text-cream/60">Pick a style, set the dimensions, choose colour and finish, and watch it come to life. Then send the spec to us with one click.</p>
              <Link href="/studio" className="btn-white mt-8">Open the studio <ArrowRight size={16} /></Link>
            </div>
            <dl className="relative rounded-2xl border border-cream/10 bg-black/20 px-6 py-3 text-sm">
              {[['Style', 'Mailer box'], ['Dimensions', '25 × 18 × 10 cm'], ['Finish', 'Navy · Soft-touch · Printed inside']].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-dashed border-cream/10 py-3.5 last:border-0">
                  <dt className="text-cream/55">{k}</dt><dd className="text-right font-semibold text-cream">{v}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between py-3.5">
                <dt className="text-cream/55">Colour</dt>
                <dd className="flex gap-2">{['#1B2A5C', '#B98A57', '#F4EFE6', '#0D1220'].map(c => <i key={c} className="h-[18px] w-[18px] rounded-full shadow-[0_0_0_2px_#141B2E,0_0_0_3px_rgba(239,233,221,.15)]" style={{ background: c }} />)}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
