/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { ClientLogos } from '@/components/ClientStrip';
import { ClientWork } from '@/components/ClientWork';
import { CLIENTS, COMPANY, emailLink, phoneLink, quoteLink } from '@/lib/company';
import { products } from '@/lib/products';
import { IMG, machines, reasons, sectors, steps, tickerPoints, unsplash } from '@/data/home';

export const metadata: Metadata = {
  title: { absolute: 'ALL PACK — Printing & Packaging in Lahore' },
  description: 'Cartons, labels, rigid boxes and corrugated packaging printed in Lahore on our own Heidelberg and Solna presses, for pharmaceutical, food and retail brands across Pakistan. More than 25 years of experience.',
  alternates: { canonical: '/' },
};

/** Left-aligned section heading with an optional link on the right. */
function Head({ label, title, sub, link, light = false }: { label: string; title: string; sub?: string; link?: { text: string; href: string }; light?: boolean }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
      <div className="max-w-2xl">
        <p className={`text-[15px] font-medium ${light ? 'text-brand-light' : 'text-brand-dark'}`}>{label}</p>
        <h2 className={`mt-3 text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-.025em] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {sub && <p className={`mt-4 text-[17px] leading-relaxed ${light ? 'text-cyan' : 'text-secondary'}`}>{sub}</p>}
      </div>
      {link && (
        <Link href={link.href} className={`group inline-flex items-center gap-1.5 text-[15px] font-medium transition-colors ${light ? 'text-white hover:text-brand-light' : 'text-ink hover:text-brand'}`}>
          {link.text} <ArrowRight size={16} strokeWidth={1.75} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const quote = quoteLink();
  const call = phoneLink();

  return (
    <main>
      {/* 1 · Hero: what we do, for whom, and one real visual */}
      <section className="border-b border-ink/[.08] bg-[#F5F7FA]">
        <div className="container-x grid items-center gap-12 py-16 sm:py-20 lg:min-h-[calc(100svh-84px-60px)] lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-16">
          <div className="anim-up">
            <p className="text-[15px] font-medium text-brand-dark">Printers and packaging makers in Lahore</p>
            <h1 className="mt-5 text-[clamp(2.5rem,4.6vw,3.9rem)] font-medium leading-[1.06] tracking-[-.03em] text-ink">Cartons, labels and boxes printed for Pakistan&rsquo;s pharma and food brands</h1>
            <p className="mt-6 max-w-[36rem] text-[19px] leading-[1.6] text-secondary">For more than 25 years ALL PACK has printed packaging on its own Heidelberg and Solna presses, from approved pharmaceutical cartons to bakery boxes and shipping cartons.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-brand"><WhatsAppIcon size={18} /> Request a quote</a>
              <Link href="/products" className="btn-light">See what we print</Link>
            </div>
          </div>
          <div className="anim-up d2 overflow-hidden rounded-2xl bg-soft">
            <img src={unsplash(IMG.pressRollers, 1600)} alt="Ink rollers on an offset printing press" width={1600} height={1200} fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* 2 · Points, sliding right to left */}
      <section className="ticker overflow-hidden bg-navy" aria-label="Why ALL PACK">
        <div className="marquee-track flex w-max">
          {[0, 1].map(half => (
            <ul key={half} aria-hidden={half === 1 || undefined} className="flex shrink-0">
              {[...tickerPoints, ...tickerPoints].map((t, i) => (
                <li key={`${t}-${i}`} className="flex h-[60px] items-center whitespace-nowrap text-[15px] font-medium text-cream">
                  <span aria-hidden="true" className="mx-8 h-1.5 w-1.5 rotate-45 bg-brand-light" />{t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* 3 · Clients, as proof right after the promise */}
      <section className="bg-white py-20 sm:py-24" id="clients">
        <div className="container-x">
          <Head label="Trusted by" title="Printing for pharmaceutical, food and healthcare brands across Pakistan" />
        </div>
        <ClientLogos />
      </section>

      {/* 4 · What we print, by sector */}
      <section className="section border-t border-ink/[.08] bg-[#F5F7FA]" id="products">
        <div className="container-x">
          <Head label="What we print" title="Packaging for the industries we know best" link={{ text: `All ${products.length} products`, href: '/products' }} />
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr_1fr]">
            {sectors.map((s, i) => (
              <article key={s.name} className="flex flex-col overflow-hidden rounded-2xl border border-ink/[.08] bg-white">
                <div className={`overflow-hidden ${s.contain ? 'bg-white' : 'bg-soft'}`}>
                  <img src={s.img} alt="" loading="lazy" className={`w-full ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'} ${s.contain ? 'object-contain p-8' : 'object-cover'}`} />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-[22px] font-medium tracking-[-.02em]">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-secondary">{s.d}</p>
                  <ul className="mt-5 border-t border-ink/[.08]">
                    {s.formats.map(([t, href]) => (
                      <li key={href} className="border-b border-ink/[.08]">
                        <Link href={href} className="group flex h-11 items-center justify-between text-[15px] text-ink transition-colors hover:text-brand">{t}<ArrowRight size={16} strokeWidth={1.75} className="text-muted transition-colors group-hover:text-brand" /></Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand hover:text-brand-dark">{s.name} packaging <ArrowRight size={16} strokeWidth={1.75} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Manufacturing capabilities, with the numbers that matter */}
      <section className="section bg-navy-deep text-white" id="capabilities">
        <div className="container-x">
          <div className="mb-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <p className="text-[15px] font-medium text-brand-light">Our manufacturing capabilities</p>
              <h2 className="mt-3 text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-.025em]">Three offset presses and a full finishing line, under one roof</h2>
            </div>
            <dl className="grid grid-cols-3 border-t border-white/10 pt-6">
              {[['25+', 'years on press'], ['3', 'offset presses'], [`${CLIENTS.length}+`, 'brands served']].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-[36px] font-medium leading-none tracking-[-.02em] tabular-nums">{n}</dd>
                  <dd className="mt-2 text-[14px] text-cyan">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mach-row">
            {machines.map(m => (
              <article key={m.name} tabIndex={0} className="mach-panel relative flex sm:min-h-[500px] flex-col overflow-hidden rounded-2xl border border-white/[.08] bg-graphite-card outline-none focus-visible:ring-2 focus-visible:ring-brand-light lg:min-h-[540px]">
                <div className="relative h-[240px] shrink-0 overflow-hidden">
                  <img src={unsplash(m.img, 1100)} alt="" loading="lazy" className="h-full w-full object-cover" />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-graphite-card/0 to-graphite-card" />
                </div>
                <span aria-hidden="true" className="bar absolute left-7 top-7 h-[3px] w-9 bg-brand" />
                <div className="flex flex-1 flex-col px-7 pb-7">
                  <p className="text-[14px] text-brand-light">{m.type}</p>
                  <h3 className="mt-2 text-[24px] font-medium tracking-[-.02em]">{m.name}</h3>
                  <p className="mt-3 max-w-[26rem] text-[15px] leading-relaxed text-cyan">{m.d}</p>
                  <ul className="mt-auto grid gap-2 border-t border-white/[.08] pt-4 text-[14px] text-cream">
                    {m.best.map(b => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Real jobs off our presses */}
      <section className="section bg-white" id="work">
        <div className="container-x">
          <Head label="Printed for our clients" title="Real jobs for real brands, no mock-ups" sub="Cartons, wrappers and labels we have printed for bakeries, confectioners and pharmaceutical companies." link={{ text: 'See all our work', href: '/gallery' }} />
          <ClientWork />
        </div>
      </section>

      {/* 7 · How we work, and why brands stay */}
      <section className="section border-t border-ink/[.08] bg-[#F5F7FA]">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[15px] font-medium text-brand-dark">How an order runs</p>
            <h2 className="mt-3 text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-.025em]">From your brief to delivered boxes</h2>
            <ol className="mt-10 border-t border-ink/[.08]">
              {steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[48px_1fr] gap-x-2 border-b border-ink/[.08] py-6">
                  <span className="text-[15px] font-medium tabular-nums text-brand-dark">0{i + 1}</span>
                  <span><span className="block text-[18px] font-medium">{s.t}</span><span className="mt-1.5 block text-[15px] leading-relaxed text-secondary">{s.d}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-[15px] font-medium text-brand-dark">Why brands stay with us</p>
            <h2 className="mt-3 text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-.025em]">A print house first, so the details get done right</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {reasons.map(r => (
                <div key={r.t} className="rounded-2xl border border-ink/[.08] bg-white p-6">
                  <h3 className="text-[18px] font-medium">{r.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-secondary">{r.d}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">More about ALL PACK <ArrowRight size={16} strokeWidth={1.75} className="transition-transform duration-150 group-hover:translate-x-0.5" /></Link>
          </div>
        </div>
      </section>

      {/* 8 · Start your project */}
      <section className="bg-navy text-white" id="contact">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="text-[15px] font-medium text-brand-light">Start your project</p>
            <h2 className="mt-3 text-[clamp(2.25rem,4.2vw,3.5rem)] font-medium leading-[1.06] tracking-[-.03em]">Let&rsquo;s package what you make</h2>
            <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-cyan">Send your product, size and quantity. We&rsquo;ll suggest the right board and finish, with a clear price within one business day.</p>
            <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-white mt-9"><WhatsAppIcon size={18} /> Request a quote on WhatsApp</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-navy-deep px-7 py-2 sm:px-9">
            {[
              { icon: Phone, k: 'Call or WhatsApp', v: COMPANY.phone, href: call || quote },
              { icon: Mail, k: 'Email', v: COMPANY.email, href: emailLink() },
              { icon: MapPin, k: 'Head office', v: COMPANY.address, href: undefined },
            ].map(c => {
              const body = (
                <>
                  <c.icon size={18} strokeWidth={1.5} className="shrink-0 text-cyan" />
                  <span><span className="block text-[13px] text-cyan">{c.k}</span><span className="mt-0.5 block break-all text-[17px] font-medium">{c.v}</span></span>
                </>
              );
              return c.href
                ? <a key={c.k} href={c.href} className="flex items-center gap-4 border-b border-white/10 py-5 transition-colors last:border-0 hover:text-brand-light">{body}</a>
                : <div key={c.k} className="flex items-center gap-4 border-b border-white/10 py-5 last:border-0">{body}</div>;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
