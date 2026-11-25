'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { STRIP, BENEFITS, type HeroSlide } from '@/data/home';
import { useNow, formatTime, hourIn } from './Clock';

/** Three different hero slides that change every 6 seconds, with labelled progress bars. */
export function HeroSlider({ slides: HERO_SLIDES }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0);
  const t = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = useCallback(() => { if (t.current) clearInterval(t.current); t.current = setInterval(() => setI(v => (v + 1) % HERO_SLIDES.length), 6000); }, [HERO_SLIDES.length]);
  useEffect(() => { start(); return () => { if (t.current) clearInterval(t.current); }; }, [start]);
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
export function MarketSection() {
  const [m, setM] = useState(0);
  return (
    <section className="overflow-hidden bg-[#F4F5F8] pt-16 sm:pt-24">
      <div className="ap-wrap flex max-w-[900px] flex-col items-center gap-6 text-center">
        <div role="tablist" aria-label="Where you order" className="relative flex rounded-full border-[1.5px] border-[#0B0D12] bg-white p-1">
          <span aria-hidden="true" className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full bg-[#0B0D12] transition-[left] duration-500 ease-out" style={{ left: m === 0 ? 4 : '50%' }} />
          {['Order in the USA', 'Order in Pakistan'].map((l, k) => (
            <button key={l} role="tab" aria-selected={m === k} onClick={() => setM(k)} className={`relative min-h-11 min-w-[136px] flex-1 rounded-full px-3 text-[13px] font-bold sm:min-w-[170px] sm:px-5 sm:text-[14px] transition-colors duration-300 ${m === k ? 'text-white' : 'text-[#0B0D12]'}`}>{l}</button>
          ))}
        </div>
        <h2 className="text-[36px] leading-[1.02] sm:text-[64px]">Custom packaging that fits your <span className="text-[#2B43F0]">brand</span>.</h2>
        <p className="max-w-[640px] text-[17px] leading-[1.55] text-[#4A5060] sm:text-[19px]">{m === 0 ? 'Branded boxes for your products, quoted and supported by our Boston team and delivered across the US.' : 'Branded boxes for your products, made and delivered by our Lahore team across Pakistan.'}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/products" className="ap-btn ap-blue">Explore products <span className="ap-go">›</span></Link>
          <Link href="/contact" className="ap-btn ap-ghost">Get a quote</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] font-semibold text-[#4A5060]">
          <span><span className="text-[#2B43F0]">✓</span> Free digital proof</span>
          <span><span className="text-[#2B43F0]">✓</span> {m === 0 ? 'Quotes in USD' : 'Quotes in PKR'}</span>
          <span><span className="text-[#2B43F0]">✓</span> Any size, any quantity</span>
        </div>
      </div>
      <div className="ap-loopwrap ap-fade mt-14 overflow-hidden">
        <div className="ap-loop gap-5 py-2" style={{ animationDuration: '70s' }}>
          {[...STRIP, ...STRIP].map((p, k) => (
            <div key={k} className="ap-card relative h-[250px] w-[200px] shrink-0 sm:h-[300px] sm:w-[240px] overflow-hidden rounded-[20px] bg-white shadow-[0_1px_2px_rgba(11,13,18,.06),0_12px_28px_-18px_rgba(11,13,18,.35)]">
              <img src={p.src} alt={k < STRIP.length ? p.label : ''} width={480} height={600} loading="lazy" className="ap-img h-full w-full object-cover" />
              <span className="ap-chip absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-extrabold backdrop-blur">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ap-wrap grid max-w-[1100px] gap-4 pb-16 pt-12 sm:gap-5 sm:pb-20 sm:pt-16 md:grid-cols-3">
        {BENEFITS.map(b => (
          <div key={b.title} className="ap-lift ap-rv flex flex-col gap-3 rounded-xl bg-white p-6 sm:p-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0B0D12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[b.icon]} /></svg>
            <h3 className="text-[20px] !text-[#0A208C]">{b.title}</h3>
            <p className="text-[15px] leading-[1.6] text-[#4A5060]">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const SUN = 'M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z';
const MOON = 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z';

/** Boston and Lahore offices with live local time, day/night icon and open status. */
export function Offices({ wa, waUS, usPhone, pkPhone }: { wa: string | null; waUS: string | null; usPhone: string; pkPhone: string }) {
  const now = useNow();
  const offices = [
    { city: 'Boston', region: 'USA · Massachusetts', tz: 'America/New_York', dot: '#22C3EE', text: 'Quotes, artwork support and delivery for American brands, in your time zone and priced in US dollars.', tags: ['US orders', 'Quotes in USD', 'Eastern Time'], cta: 'Contact Boston', phone: usPhone, wa: waUS },
    { city: 'Lahore', region: 'Pakistan · Punjab', tz: 'Asia/Karachi', dot: '#7F8CFF', text: 'Our production home, handling quotes, printing and delivery for brands across Pakistan.', tags: ['Production', 'Quotes in PKR', 'Pakistan Time'], cta: 'Contact Lahore', phone: pkPhone, wa },
  ];
  let apart = 10;
  if (now) { try { const f = (tz: string) => new Date(new Date(now).toLocaleString('en-US', { timeZone: tz })).getTime(); apart = Math.round(Math.abs(f('Asia/Karachi') - f('America/New_York')) / 3600000); } catch { /* keep default */ } }
  return (
    <section id="offices" className="relative scroll-mt-24 overflow-hidden bg-[#070B1F] px-5 py-20 text-white sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,.09)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_30%,transparent_75%)]" />
      <div className="ap-rv relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="ap-kicker !text-[#22C3EE]">Two offices · One standard</span>
          <h2 className="mt-3.5 text-[34px] leading-[1.02] !text-white sm:text-[60px]">Close to your customers.<br /><span className="text-[#7F8CFF]">Close to every order.</span></h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-[1.6] text-[#A9B1C7]">Our teams in Boston and Lahore work as one, so there is always someone moving your order forward.</p>
        </div>
        <div className="relative my-6 h-[140px] sm:my-8 sm:h-[200px]">
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs><linearGradient id="apRoute" x1="0" x2="1"><stop offset="0" stopColor="#22C3EE" /><stop offset="1" stopColor="#7F8CFF" /></linearGradient></defs>
            <path d="M160 160 C 360 0, 640 0, 840 160" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="2" />
            <path className="ap-flow" d="M160 160 C 360 0, 640 0, 840 160" fill="none" stroke="url(#apRoute)" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 14" />
          </svg>
          <span className="ap-pulse absolute left-[16%] top-[112px] sm:top-[160px] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22C3EE]" />
          <span className="ap-pulse absolute left-[84%] top-[112px] sm:top-[160px] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7F8CFF]" />
          <span className="absolute left-1/2 top-[30px] -translate-x-1/2 whitespace-nowrap rounded-full text-[12px] sm:top-[52px] border border-white/15 bg-white/10 px-3.5 py-2 text-[13px] font-bold text-[#DDE3F5] backdrop-blur">{apart} hours apart · always in touch</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {offices.map(o => {
            const h = now ? hourIn(o.tz, now) : 12, day = h >= 7 && h < 19, open = h >= 9 && h < 18;
            return (
              <div key={o.city} className="ap-lift flex flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[.07] to-white/[.02] p-6 backdrop-blur sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: o.dot }} /><span className="text-[13px] font-bold uppercase tracking-[.08em] text-[#A9B1C7]">{o.region}</span></div>
                    <h3 className="mt-2 text-[38px] !text-white sm:text-[48px]">{o.city}</h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={o.dot} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d={day ? SUN : MOON} /></svg><span suppressHydrationWarning className="text-[26px] font-extrabold tabular-nums tracking-tight sm:text-[34px]">{now ? formatTime(o.tz, now) : ''}</span></div>
                    {now && <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-extrabold ${open ? 'bg-green-500/15 text-[#4ADE80]' : 'bg-white/10 text-[#A9B1C7]'}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{open ? 'Open now' : 'Replies next business day'}</span>}
                  </div>
                </div>
                <p className="text-[16px] leading-[1.65] text-[#C9D0E3]">{o.text}</p>
                <div className="flex flex-wrap gap-2">{o.tags.map(t => <span key={t} className="rounded-full border border-white/15 px-3 py-1.5 text-[13px] font-semibold text-[#DDE3F5]">{t}</span>)}</div>
                <div className="flex flex-wrap gap-2.5">
                  <Link href="/contact" className="ap-btn ap-white !min-h-[44px] text-[14px]">{o.cta}</Link>
                  {o.wa && <a href={o.wa} target="_blank" rel="noopener noreferrer" className="ap-btn ap-ghost-light !min-h-[44px] text-[14px]">WhatsApp {o.phone}</a>}
                </div>
              </div>
            );
          })}
        </div>
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
