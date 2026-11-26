'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { HeroSlide, StripItem, Benefit } from '@/data/home';

/** Three different hero slides that change every 6 seconds, with labelled progress bars. */
export function HeroSlider({ slides: HERO_SLIDES }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0);
  const t = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = useCallback(() => { if (t.current) clearInterval(t.current); t.current = setInterval(() => setI(v => (v + 1) % HERO_SLIDES.length), 6000); }, [HERO_SLIDES.length]);
  useEffect(() => {
    // Autoplay only while the tab is visible, so background tabs don't keep re-rendering.
    const stop = () => { if (t.current) clearInterval(t.current); t.current = null; };
    const onVis = () => (document.hidden ? stop() : start());
    start(); document.addEventListener('visibilitychange', onVis);
    return () => { stop(); document.removeEventListener('visibilitychange', onVis); };
  }, [start]);
  const s = HERO_SLIDES[i % HERO_SLIDES.length];
  return (
    <section aria-roledescription="carousel" aria-label="Highlights" className="px-5 transition-colors duration-[900ms] sm:px-6" style={{ background: s.bg }}>
      <div className="relative mx-auto flex max-w-[1392px] flex-wrap items-center gap-8 pb-24 pt-8 sm:gap-12 sm:pb-28 sm:pt-12 lg:min-h-[640px]">
        <div key={`t${i}`} className="flex max-w-[520px] flex-[1_1_380px] flex-col gap-6">
          <span className="ap-rise self-start rounded-full bg-white/70 px-3.5 py-2 text-[13px] font-extrabold uppercase tracking-[.04em] text-[#0A208C]">{s.kicker}</span>
          <h1 className="ap-rise ap-d1 text-[40px] leading-[1] tracking-[-.04em] sm:text-[60px] lg:text-[72px]">{s.title}</h1>
          <p className="ap-rise ap-d2 text-[17px] leading-[1.6] text-[#2E3340] sm:text-[19px]">{s.text}</p>
          <div className="ap-rise ap-d3 flex flex-wrap gap-3">
            <Link href={s.href} className="ap-btn ap-dark">{s.cta} <span className="ap-go">›</span></Link>
            <Link href="/contact" className="ap-btn ap-white">Get a quote</Link>
          </div>
        </div>
        <div className={`relative h-[280px] w-full flex-[1.4_1_520px] sm:h-[440px] lg:h-[540px] overflow-hidden rounded-[22px] shadow-[0_40px_80px_-40px_rgba(11,13,18,.45)] sm:rounded-[28px] ${s.cutout ? 'bg-[#F8F3EC]' : ''}`}>
          <img key={`i${i}`} src={s.image} srcSet={s.srcSet || undefined} sizes="(max-width: 1024px) 100vw, 800px" alt={s.alt} width={1600} height={1100} fetchPriority={i === 0 ? 'high' : 'auto'} decoding="async" className={`ap-heroimg absolute inset-0 h-full w-full ${s.cutout ? 'object-contain p-5 drop-shadow-[0_24px_30px_rgba(60,45,20,.18)] sm:p-9' : 'object-cover'}`} />
        </div>
        <div className="absolute inset-x-0 bottom-6 grid grid-cols-3 gap-3 sm:bottom-8 sm:gap-5">
          {HERO_SLIDES.map((h, k) => (
            <button key={h.tab} type="button" onClick={() => { setI(k); start(); }} aria-label={`Show slide ${k + 1}: ${h.tab}`} aria-current={k === i} className="flex min-h-[44px] flex-col justify-end gap-2.5 text-left">
              <span className="block h-[3px] overflow-hidden rounded bg-[rgba(11,13,18,.15)]">{k === i && <span key={`p${i}`} className="ap-prog block h-full bg-[#0B0D12]" />}</span>
              <span className={`text-[12px] font-bold leading-tight sm:text-[14px] ${k === i ? 'text-[#0B0D12]' : 'text-[rgba(11,13,18,.5)]'}`}>0{k + 1}<span className="hidden sm:inline">&nbsp; {h.tab}</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<string, string> = {
  box: 'M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10',
  tag: 'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8ZM7.5 7.5h.01',
  truck: 'M3 7h11v10H3zM14 10h4l3 3v4h-7M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
};

/** "Order in the USA / Pakistan" switch, product strip and three benefits. */
export type MarketText = { us: string; pk: string; title: string; accent: string; usText: string; pkText: string; check1: string; check3: string };
export function MarketSection({ strip, benefits, t }: { strip: StripItem[]; benefits: Benefit[]; t: MarketText }) {
  const STRIP = strip.filter(p => p.src);
  const [m, setM] = useState(0);
  return (
    <section className="overflow-hidden bg-[#F4F5F8] pt-16 sm:pt-24">
      <div className="ap-wrap flex max-w-[900px] flex-col items-center gap-6 text-center">
        <div role="tablist" aria-label="Where you order" className="relative flex rounded-full border-[1.5px] border-[#0B0D12] bg-white p-1">
          <span aria-hidden="true" className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full bg-[#0B0D12] transition-[left] duration-500 ease-out" style={{ left: m === 0 ? 4 : '50%' }} />
          {[t.us, t.pk].map((l, k) => (
            <button key={l} role="tab" aria-selected={m === k} onClick={() => setM(k)} className={`relative min-h-11 min-w-[136px] flex-1 rounded-full px-3 text-[13px] font-bold sm:min-w-[170px] sm:px-5 sm:text-[14px] transition-colors duration-300 ${m === k ? 'text-white' : 'text-[#0B0D12]'}`}>{l}</button>
          ))}
        </div>
        <h2 className="text-[36px] leading-[1.02] sm:text-[64px]">{t.title} <span className="text-[#2B43F0]">{t.accent}</span></h2>
        <p className="max-w-[640px] text-[17px] leading-[1.55] text-[#4A5060] sm:text-[19px]">{m === 0 ? t.usText : t.pkText}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/products" className="ap-btn ap-blue">Explore products <span className="ap-go">›</span></Link>
          <Link href="/contact" className="ap-btn ap-ghost">Get a quote</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] font-semibold text-[#4A5060]">
          <span><span className="text-[#2B43F0]">✓</span> {t.check1}</span>
          <span><span className="text-[#2B43F0]">✓</span> {m === 0 ? 'Quotes in USD' : 'Quotes in PKR'}</span>
          <span><span className="text-[#2B43F0]">✓</span> {t.check3}</span>
        </div>
      </div>
      <div className="ap-loopwrap ap-fade mt-14 overflow-hidden [--fade:#F4F5F8]">
        <div className="ap-loop gap-5 py-2" style={{ animationDuration: '70s' }}>
          {[...STRIP, ...STRIP].map((p, k) => (
            <div key={k} className="ap-card relative h-[250px] w-[200px] shrink-0 sm:h-[300px] sm:w-[240px] overflow-hidden rounded-[20px] bg-white shadow-[0_1px_2px_rgba(11,13,18,.06),0_12px_28px_-18px_rgba(11,13,18,.35)]">
              <img src={p.src} alt={k < STRIP.length ? p.label : ''} width={480} height={600} loading="lazy" className="ap-img h-full w-full object-cover" />
              <span className="ap-chip absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-extrabold">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ap-wrap grid max-w-[1100px] gap-4 pb-16 pt-12 sm:gap-5 sm:pb-20 sm:pt-16 md:grid-cols-3">
        {benefits.map((b, bi) => (
          <div key={`${b.title}-${bi}`} className="ap-lift ap-rv flex flex-col gap-3 rounded-xl bg-white p-6 sm:p-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0B0D12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[b.icon] ?? ICONS.box} /></svg>
            <h3 className="text-[20px] !text-[#0A208C]">{b.title}</h3>
            <p className="text-[15px] leading-[1.6] text-[#4A5060]">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Email sign-up; stored in the admin inquiries inbox as a newsletter request. */
export function Newsletter({ title = 'Get packaging ideas and offers first.', text = 'New structures, finishes and seasonal offers, once a month. No spam.' }: { title?: string; text?: string }) {
  const shown = useRef(Date.now());
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  useEffect(() => { shown.current = Date.now(); }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setState('sending');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Newsletter subscriber', email: d.get('email'), whatsapp: '', message: 'Please add me to the ALL PACK newsletter.', website: d.get('website'), elapsed: Date.now() - shown.current, source: 'newsletter' }) });
      setState(res.ok ? 'done' : 'error');
    } catch { setState('error'); }
  }
  return (
    <div className="ap-rv flex flex-wrap items-center justify-between gap-6 rounded-[24px] bg-[#ECEFFD] px-6 py-10 sm:gap-8 sm:rounded-[28px] sm:px-14 sm:py-12">
      <div className="max-w-[560px]"><h2 className="text-[26px] leading-[1.1] sm:text-[36px]">{title}</h2><p className="mt-2.5 text-[16px] text-[#4A5060]">{text}</p></div>
      {state === 'done' ? <p className="text-[16px] font-bold text-[#166534]">Thanks, you are on the list.</p> : (
        <form onSubmit={submit} className="flex max-w-[520px] flex-[1_1_380px] flex-wrap gap-2.5">
          <label className="flex flex-[1_1_240px]"><span className="sr-only">Email address</span><input name="email" type="email" required placeholder="you@brand.com" className="h-14 w-full rounded-full border border-[#D5D8DF] bg-white px-5 text-[16px] outline-none focus:border-[#2B43F0]" /></label>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <button type="submit" disabled={state === 'sending'} className="ap-btn ap-blue h-14 w-full !rounded-full sm:w-auto">{state === 'sending' ? 'Signing up…' : 'Sign up'}</button>
          {state === 'error' && <p className="w-full text-[14px] text-red-700">Something went wrong. Please try again or message us on WhatsApp.</p>}
        </form>
      )}
    </div>
  );
}
