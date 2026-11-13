/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Clock, FileText, Layers, Mail, MapPin, Phone, Printer, ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { ClientLogos } from '@/components/ClientStrip';
import { CLIENTS, COMPANY, emailLink, phoneLink, quoteLink } from '@/lib/company';
import { products } from '@/lib/products';
import { IMG, homeIndustries, homeProducts, machines, tickerPoints, unsplash, whyTrust } from '@/data/home';

export const metadata: Metadata = {
  title: { absolute: 'ALL PACK — Printing & Packaging in Lahore' },
  description: 'Pharmaceutical cartons, food packaging, rigid boxes, corrugated shippers and labels, printed in house on Heidelberg offset presses in Lahore and delivered across Pakistan. 25+ years of experience.',
  alternates: { canonical: '/' },
};

const whyIcons = [Clock, Printer, ShieldCheck, Layers, FileText, Truck];

const stats = [
  { n: '25', sup: '+', d: 'Years of printing and packaging in Lahore' },
  { n: '3', sup: '', d: 'Offset presses: Heidelberg 4-colour, GTO 52 and Solna 125' },
  { n: String(CLIENTS.length), sup: '+', d: 'Brands in pharma, food, healthcare and retail' },
  { n: String(products.length), sup: '', d: 'Packaging formats, from labels to corrugated shippers' },
];

function Title({ kicker, title, sub, light = false }: { kicker: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
      <p className={`kicker ${light ? '!text-brand-light' : ''}`}>{kicker}</p>
      <h2 className={`mt-5 text-[clamp(2.25rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-[-.035em] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {sub && <p className={`mx-auto mt-5 max-w-2xl text-[18px] leading-relaxed ${light ? 'text-cyan' : 'text-secondary'}`}>{sub}</p>}
    </div>
  );
}

export default function Home() {
  const quote = quoteLink();
  const call = phoneLink();
  const faces = CLIENTS.filter(c => c.logo).slice(0, 5);

  return (
    <main>
      {/* 1 · Hero: light, one message, real proof */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(160deg,#FFFFFF_0%,#F4F7FF_45%,#E7EDFF_100%)]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 [background-image:radial-gradient(rgba(11,31,77,.12)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_70%_at_78%_40%,#000_0%,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -right-32 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(43,74,252,.18),rgba(43,74,252,0)_65%)]" />
        <div className="container-x grid items-center gap-12 pb-16 pt-12 sm:pb-24 sm:pt-16 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
          <div className="anim-up">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#D9E1FB] bg-white py-1.5 pl-1.5 pr-4 text-[14px] font-medium text-ink shadow-[0_6px_16px_-10px_rgba(11,31,77,.35)]">
              <b className="whitespace-nowrap rounded-full bg-navy px-2.5 py-1 text-[12px] font-semibold tracking-[.06em] text-white">ALL PACK</b>
              <span className="whitespace-nowrap">Printing and packaging · Lahore</span>
            </span>
            <h1 className="mt-7 text-[clamp(2.5rem,4.7vw,3.9rem)] font-semibold leading-[1.04] tracking-[-.035em] text-ink">
              Packaging that carries{' '}
              <span className="relative whitespace-nowrap text-brand">your brand<span aria-hidden="true" className="absolute inset-x-0 bottom-[.06em] -z-10 h-[.16em] rounded bg-brand/20" /></span>{' '}
              with confidence.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[19px] leading-[1.6] text-secondary">Pharmaceutical cartons, food packaging, rigid boxes, corrugated shippers and labels, printed in house on Heidelberg offset presses and delivered across Pakistan.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-brand h-[52px]">Request a quote <ArrowRight size={18} strokeWidth={2} /></a>
              <a href="#capabilities" className="btn-light h-[52px]">Explore our capabilities</a>
            </div>
            <div className="mt-10 flex max-w-[34rem] flex-col gap-4 border-t border-[#DCE3F5] pt-7 sm:flex-row sm:items-center">
              <div className="flex">
                {faces.map((c, i) => (
                  <span key={c.name} title={c.name} className={`grid h-11 w-11 place-items-center overflow-hidden rounded-full border-2 border-[#F4F7FF] bg-white shadow-[0_4px_10px_-6px_rgba(11,31,77,.4)] ${i ? '-ml-2.5' : ''}`}>
                    <img src={c.logo} alt="" className="h-8 w-8 object-contain" />
                  </span>
                ))}
              </div>
              <p className="text-[14px] leading-snug text-muted"><b className="font-semibold text-ink">Trusted by leading brands</b><br />Global Pharmaceuticals, Citi Pharma, Hoest, Sun Bread and more</p>
            </div>
          </div>

          <div className="anim-up d2 relative h-[380px] sm:h-[480px] lg:h-[560px]" aria-hidden="true">
            <span className="spin-slow absolute left-[8%] top-[6%] h-[120px] w-[120px] rounded-full border-[1.5px] border-dashed border-brand/45" />
            <div className="absolute right-0 top-0 h-[82%] w-[84%] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(11,31,77,.55)]">
              <img src={unsplash(IMG.pressRollers, 1600)} alt="" className="h-full w-full object-cover" fetchPriority="high" />
              <span className="absolute inset-0 bg-[linear-gradient(200deg,rgba(11,31,77,0)_45%,rgba(11,31,77,.55))]" />
            </div>
            <div className="absolute bottom-0 left-0 h-[46%] w-[44%] overflow-hidden rounded-[22px] border-8 border-white shadow-[0_30px_60px_-30px_rgba(11,31,77,.5)]">
              <img src={unsplash(IMG.pharmaBox, 900)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="float absolute left-0 top-[4%] flex items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 shadow-[0_24px_48px_-22px_rgba(11,31,77,.45)] sm:left-[16%] sm:top-[14%]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand"><Printer size={20} strokeWidth={1.75} /></span>
              <span><b className="block text-[15px] font-semibold text-ink">Heidelberg 4-colour</b><span className="block text-[13px] text-muted">Offset printing in house</span></span>
            </div>
            <div className="float absolute -right-3 bottom-[30%] hidden items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 shadow-[0_24px_48px_-22px_rgba(11,31,77,.45)] [animation-delay:-2s] sm:flex">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand"><ShieldCheck size={20} strokeWidth={1.75} /></span>
              <span><b className="block text-[15px] font-semibold text-ink">Approved artwork</b><span className="block text-[13px] text-muted">Exact text and colour</span></span>
            </div>
            <div className="float absolute bottom-[2%] right-[6%] rounded-2xl bg-navy px-5 py-4 text-white shadow-[0_24px_48px_-22px_rgba(11,31,77,.6)] [animation-delay:-4s]">
              <b className="block text-[34px] font-semibold leading-none tracking-[-.03em]">25+</b>
              <span className="mt-1 block text-[13px] text-brand-light">years on press</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Sliding points */}
      <section className="ticker overflow-hidden border-t border-[#1B3470] bg-navy" aria-label="Why ALL PACK">
        <div className="marquee-track flex w-max">
          {[0, 1].map(half => (
            <ul key={half} aria-hidden={half === 1 || undefined} className="flex shrink-0">
              {[...tickerPoints, ...tickerPoints].map((t, i) => (
                <li key={`${t}-${i}`} className="flex items-center whitespace-nowrap py-5 text-[13px] font-semibold uppercase tracking-[.16em] text-cream">
                  <span aria-hidden="true" className="mx-7 text-[10px] text-brand-light">◆</span>{t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* 3 · By the numbers */}
      <section className="bg-white pt-14 sm:pt-16">
        <div className="container-x">
          <dl className="grid overflow-hidden rounded-2xl border border-line shadow-plate sm:grid-cols-2 lg:grid-cols-[1.1fr_repeat(4,1fr)]">
            <div className="flex flex-col justify-center bg-navy p-7 text-white sm:col-span-2 lg:col-span-1">
              <dt className="text-[13px] font-semibold uppercase tracking-[.14em] text-brand-light">By the numbers</dt>
              <dd className="mt-2.5 text-[20px] font-semibold leading-snug">Built on experience. Trusted across industries.</dd>
            </div>
            {stats.map(s => (
              <div key={s.d} className="border-t border-line bg-white p-7 sm:border-l lg:border-t-0">
                <dt className="sr-only">{s.d}</dt>
                <dd className="text-[48px] font-semibold leading-none tracking-[-.04em] text-ink tabular-nums">{s.n}{s.sup && <sup className="ml-0.5 text-[22px] text-brand">{s.sup}</sup>}</dd>
                <dd className="mt-3 text-[14px] leading-snug text-muted">{s.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4 · About */}
      <section className="section bg-white" id="about">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="kicker">About ALL PACK</p>
            <h2 className="mt-5 text-[clamp(2.1rem,3.8vw,3rem)] font-semibold leading-[1.08] tracking-[-.03em]">A Lahore print house built on precision and trust.</h2>
            <p className="mt-5 text-[18px] leading-relaxed text-secondary">For more than 25 years ALL PACK has printed the cartons, wrappers and labels behind pharmaceutical, food and healthcare brands across Pakistan. Everything happens under one roof, from offset printing to the finished, glued box.</p>
            <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
              {['In-house offset printing', 'Printed to approved artwork', 'Die-cutting and finishing', 'Delivery across Pakistan'].map(t => (
                <li key={t} className="flex items-center gap-2.5 text-[15px] font-semibold"><Check size={18} strokeWidth={2.4} className="shrink-0 text-brand" />{t}</li>
              ))}
            </ul>
            <Link href="/about" className="btn-navy mt-9">More about us <ArrowRight size={18} strokeWidth={2} /></Link>
          </div>
          <div className="relative">
            <img src={unsplash(IMG.pressFactory, 1200)} alt="Print operator at an offset press" loading="lazy" className="aspect-[5/4] w-full rounded-2xl object-cover" />
            <div className="absolute -bottom-6 left-4 max-w-[230px] rounded-2xl border border-[#1E3466] bg-navy-deep px-6 py-5 text-white sm:-left-7">
              <b className="block text-[42px] font-semibold leading-none tracking-[-.03em]">25+</b>
              <span className="mt-1 block text-[14px] text-cyan">years of printing excellence in Lahore</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · Products */}
      <section className="section bg-mist" id="products">
        <div className="container-x">
          <Title kicker="Our products" title="Packaging for every product we print." sub="From pharmaceutical cartons to corrugated shippers, made to your size, artwork and finish." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeProducts.map((p, i) => (
              <Link key={p.t} href={p.href} className="rv group overflow-hidden rounded-2xl border border-line bg-white transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift" style={{ ['--rv-d' as string]: `${(i % 4) * 50}ms` }}>
                <div className="overflow-hidden"><img src={unsplash(p.img, 800)} alt={p.t} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" /></div>
                <div className="p-5">
                  <h3 className="text-[18px] font-semibold tracking-[-.02em]">{p.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.d}</p>
                  <span className="mt-3.5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">View details <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-11 text-center"><Link href="/products" className="btn-navy">View all {products.length} products <ArrowRight size={18} strokeWidth={2} /></Link></div>
        </div>
      </section>

      {/* 6 · Manufacturing capabilities: panels in one line, the hovered one widens */}
      <section className="section bg-navy-deep text-white" id="capabilities">
        <div className="container-x">
          <Title light kicker="Our manufacturing capabilities" title="The machinery behind every box." sub="Three offset presses and a complete finishing line, run by an experienced team in Lahore." />
          <div className="mach-row">
            {machines.map((m, i) => (
              <article key={m.name} tabIndex={0} className="mach-panel relative flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#1E3466] bg-graphite-card outline-none focus-visible:ring-2 focus-visible:ring-brand-light lg:min-h-[560px]">
                <div className="relative h-[260px] shrink-0 overflow-hidden">
                  <img src={unsplash(m.img, 1100)} alt={m.name} loading="lazy" className="h-full w-full scale-[1.02] object-cover" />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-graphite-card/0 to-graphite-card" />
                </div>
                <span aria-hidden="true" className="bar absolute left-7 top-7 z-10 h-[3px] w-9 bg-brand" />
                <span className="absolute right-5 top-5 z-10 rounded-md bg-navy-deep/60 px-2.5 py-1.5 text-[12px] font-semibold tracking-[.08em] backdrop-blur">0{i + 1}</span>
                <div className="flex flex-1 flex-col gap-2.5 px-7 pb-7 pt-1.5">
                  <span className="text-[13px] font-medium text-brand-light">{m.type}</span>
                  <h3 className="text-[25px] font-semibold tracking-[-.02em]">{m.name}</h3>
                  <p className="max-w-[26rem] text-[14.5px] leading-relaxed text-cyan">{m.d}</p>
                  <ul className="mt-auto grid gap-2 border-t border-[#24396E] pt-4">
                    {m.best.map(b => <li key={b} className="flex items-center gap-2 text-[14px] font-medium text-cream"><ArrowRight size={14} strokeWidth={2} className="text-brand" />{b}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Industries */}
      <section className="section bg-white" id="industries">
        <div className="container-x">
          <Title kicker="Industries we serve" title="Packaging made for every industry." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {homeIndustries.map((ind, i) => (
              <Link key={ind.name} href={ind.href} className="rv group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-navy p-6 text-white" style={{ ['--rv-d' as string]: `${(i % 3) * 60}ms` }}>
                <img src={unsplash(ind.img, 900)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(6,18,46,.92),rgba(6,18,46,.05)_62%)]" />
                <span>
                  <span className="block text-[12px] font-semibold uppercase tracking-[.12em] text-brand-light">{ind.label}</span>
                  <span className="mt-1.5 flex items-center gap-2 text-[23px] font-semibold tracking-[-.02em]">{ind.name} <ArrowRight size={18} strokeWidth={2} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · Why trust ALL PACK */}
      <section className="section bg-navy text-white">
        <div className="container-x">
          <Title light kicker="Why trust ALL PACK" title="Why brands stay with us for years." sub="We are a print house first. That is why our packaging looks right, fits right and arrives on time." />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {whyTrust.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <div key={w.t} className="bg-navy p-8 transition-colors duration-300 hover:bg-navy-2">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[.08]"><Icon size={22} strokeWidth={1.6} /></span>
                  <h3 className="mt-5 text-[20px] font-semibold tracking-[-.02em]">{w.t}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#B9C1D1]">{w.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9 · Trusted by: two rows sliding in opposite directions */}
      <section className="section bg-mist" id="clients">
        <div className="container-x"><Title kicker="Trusted by" title="Trusted by leading brands across Pakistan." /></div>
        <ClientLogos />
      </section>

      {/* 10 · Start your project */}
      <section className="bg-navy-deep text-white" id="contact">
        <div className="container-x grid items-center gap-10 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="kicker !text-brand-light">Start your project</p>
            <h2 className="mt-5 text-[clamp(2.4rem,4.6vw,3.75rem)] font-semibold leading-[1.04] tracking-[-.035em]">Let&rsquo;s package what you make.</h2>
            <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-cyan">Tell us your product, size and quantity. We&rsquo;ll recommend the right board and finish, with a clear price within one business day.</p>
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-brand mt-9 h-[52px]"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>
          </div>
          <div className="rounded-2xl border border-[#1B3470] bg-navy px-7 py-4 sm:px-10">
            {[
              { icon: Phone, k: 'Call or WhatsApp', v: COMPANY.phone, href: call || quote },
              { icon: Mail, k: 'Email', v: COMPANY.email, href: emailLink() },
              { icon: MapPin, k: 'Head office', v: COMPANY.address, href: undefined },
            ].map(c => {
              const body = (
                <>
                  <c.icon size={24} strokeWidth={1.6} className="shrink-0 text-brand-light" />
                  <span><span className="block text-[12px] font-semibold uppercase tracking-[.1em] text-brand-light">{c.k}</span><span className="mt-0.5 block break-all text-[18px] font-semibold">{c.v}</span></span>
                </>
              );
              return c.href
                ? <a key={c.k} href={c.href} className="flex items-center gap-4 border-b border-white/[.14] py-5 last:border-0 hover:text-brand-light">{body}</a>
                : <div key={c.k} className="flex items-center gap-4 border-b border-white/[.14] py-5 last:border-0">{body}</div>;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
