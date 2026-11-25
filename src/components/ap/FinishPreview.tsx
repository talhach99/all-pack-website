'use client';
import { useState } from 'react';
import { FINISHES } from '@/data/home';

/** Tap a finish to see it on a box. */
export function FinishPreview() {
  const [i, setI] = useState(0);
  const f = FINISHES[i];
  return (
    <section className="bg-[#0B0D12] px-5 py-28 text-white">
      <div className="ap-rv mx-auto flex max-w-[1200px] flex-wrap items-center gap-14">
        <div className="flex flex-[1_1_420px] flex-col gap-5">
          <span className="ap-kicker !text-[#22C3EE]">Try it</span>
          <h2 className="text-[38px] leading-[1.02] !text-white sm:text-[48px]">Preview a finish on your box.</h2>
          <p className="text-[16px] leading-[1.6] text-[#A9B1C7]">Tap a finish to see how it looks.</p>
          <div className="flex flex-wrap gap-2">
            {FINISHES.map((x, k) => (
              <button key={x.name} type="button" aria-pressed={k === i} onClick={() => setI(k)} className={`min-h-11 rounded-full border border-[#2A3148] px-4 text-[14px] font-bold transition-colors ${k === i ? 'bg-white text-[#0B0D12]' : 'text-white hover:border-white/50'}`}>{x.short}</button>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 border-t border-[#23262F] pt-4">
            <span className="text-[20px] font-extrabold">{f.name}</span>
            <span className="text-[15px] leading-[1.6] text-[#C9D0E3]">{f.desc}</span>
            <span className="text-[13px] text-[#8A93A8]">Best for: {f.best} · Cost: {f.cost}</span>
          </div>
        </div>
        <div className="flex h-[440px] flex-[1_1_460px] items-center justify-center rounded-[28px] bg-[#141A2E]">
          <div className="ap-float flex h-[300px] w-[230px] flex-col items-center justify-center gap-1.5 rounded-[10px] shadow-[30px_30px_60px_rgba(0,0,0,.45)] transition-[background] duration-500" style={{ background: f.face }}>
            <span className="text-[30px] font-extrabold tracking-tight transition-colors duration-500" style={{ color: f.ink, textShadow: f.shadow }}>ALL PACK</span>
            <span className="text-[10px] font-bold tracking-[.2em] opacity-80" style={{ color: f.ink }}>THE PACKAGING EXPERTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
