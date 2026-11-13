'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';

const jobs = [
  { image: '/work/citi-queen-cake-mango.webp', client: 'Citi', job: 'Queen Cake Mango', format: 'Printed carton', spec: '4-colour offset · gloss varnish', fit: 'cover' },
  { image: '/work/hoest-eclair.webp', client: 'Hoest', job: 'Eclair Milk Toffee', format: 'Window carton', spec: '4-colour offset · die-cut window', fit: 'cover' },
  { image: '/work/sun-bread-wrapper.webp', client: 'Sun Bread', job: 'White Bread', format: 'Bread wrapper', spec: 'Flexible film · full colour', fit: 'cover', focus: '50% 45%' },
  { image: '/work/bunnys-queen-cake.webp', client: "Bunny's", job: 'Queen Cake', format: 'Printed carton', spec: '4-colour offset · matte finish', fit: 'contain' },
] as const;

const swatches = ['#00A3E0', '#E6007E', '#FFD400', '#16171A', '#7FD1EF', '#F27FBE', '#FFE97F', '#8B8B8D'];

/** A press proof that cycles through real client jobs: crop marks, registration targets, colour bar and job ticket. */
export function HeroProof() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI(v => (v + 1) % jobs.length), 4500);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);
  const j = jobs[i];

  return (
    <div className="relative mx-auto w-full max-w-[540px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* sheets underneath */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-[3deg] rounded-[4px] bg-white/10" />
      <div aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1.4deg] rounded-[4px] bg-white/25" />

      <figure className="relative rotate-[-1deg] rounded-[4px] bg-white p-5 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] sm:p-7">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[.08em] text-muted">
          <span>ALL PACK · Press proof</span>
          <span className="tabular-nums">{String(i + 1).padStart(2, '0')} / {String(jobs.length).padStart(2, '0')}</span>
        </div>

        <div className="relative mt-5 px-4 sm:px-6">
          <span aria-hidden="true" className="reg-mark absolute -left-1 top-1/2 -translate-y-1/2 text-ink/50" />
          <span aria-hidden="true" className="reg-mark absolute -right-1 top-1/2 -translate-y-1/2 text-ink/50" />
          <div className="crop mx-3 my-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-mist">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={j.image}
                  src={j.image}
                  alt={`${j.client} ${j.job}, ${j.format.toLowerCase()} printed by ALL PACK`}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: .5, ease: [.22, 1, .36, 1] }}
                  style={'focus' in j ? { objectPosition: j.focus } : undefined}
                  className={`absolute inset-0 h-full w-full ${j.fit === 'cover' ? 'object-cover' : 'object-contain bg-white p-4'}`}
                  {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="mt-5 grid grid-cols-8 gap-px">
          {swatches.map(c => <span key={c} className="h-3" style={{ background: c }} />)}
        </div>

        <figcaption className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-dashed border-ink/20 pt-4 sm:grid-cols-4">
          {[['Client', j.client], ['Job', j.job], ['Format', j.format]].map(([k, v]) => (
            <div key={k}>
              <span className="block font-mono text-[10px] uppercase tracking-[.08em] text-muted">{k}</span>
              <span className="mt-1 block truncate text-[13px] font-medium">{v}</span>
            </div>
          ))}
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-[.08em] text-muted">Status</span>
            <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-[#1F8F4E]"><Check size={14} strokeWidth={2} /> Printed</span>
          </div>
        </figcaption>
        <p className="mt-3 font-mono text-[11px] text-muted">{j.spec}</p>
      </figure>

      <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Choose a client job">
        {jobs.map((x, n) => (
          <button key={x.image} type="button" role="tab" aria-selected={n === i} aria-label={`${x.client} ${x.job}`} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? 'w-8 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}
