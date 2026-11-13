/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { ClientLogos } from '@/components/ClientStrip';
import { ClientWork } from '@/components/ClientWork';
import { Certifications } from '@/components/Certifications';
import { CLIENTS, COMPANY, emailLink, phoneLink, quoteLink } from '@/lib/company';
import { products } from '@/lib/products';
import { machines, reasons, sectors, steps, tickerPoints, unsplash } from '@/data/home';
import { STOCK } from '@/lib/photos';

export const metadata: Metadata = {
  title: seoTitle(PAGE_SEO.home),
  description: PAGE_SEO.home.description,
  alternates: { canonical: '/' },
};

/** Centred section heading: one large title naming the topic, one supporting line, optional link. */
function Head({ title, sub, link, light = false }: { title: string; sub?: string; link?: { text: string; href: string }; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-y-6 text-center sm:mb-14">
      <div>
        <h2 className={`text-[clamp(2.25rem,4.4vw,3.4rem)] font-medium leading-[1.08] tracking-[-.03em] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
        <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-brand" />
        {sub && <p className={`mx-auto mt-5 max-w-2xl text-[18px] leading-relaxed ${light ? 'text-cyan' : 'text-secondary'}`}>{sub}</p>}
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
        <div className="container-x grid items-center gap-10 py-10 sm:gap-12 sm:py-20 lg:min-h-[calc(100svh-84px-60px)] lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-16">
          <div className="anim-up">
            <p className="text-[15px] font-medium text-brand-dark">Printers and packaging makers in Lahore</p>
            <h1 className="mt-4 text-[clamp(2.15rem,4.6vw,3.9rem)] sm:mt-5 font-medium leading-[1.06] tracking-[-.03em] text-ink">Carton, label and box printing for Pakistan&rsquo;s pharma and food brands</h1>
            <p className="mt-5 max-w-[36rem] text-[17px] leading-[1.6] text-secondary sm:mt-6 sm:text-[19px]">For more than 25 years ALL PACK has printed packaging on its own Heidelberg and Solna presses, from approved pharmaceutical cartons to bakery boxes and shipping cartons.</p>
            <div className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="btn-brand"><WhatsAppIcon size={18} /> Request a quote</a>
              <Link href="/products" className="btn-light">See what we print</Link>
            </div>
          </div>
          <div className="anim-up d2 overflow-hidden rounded-2xl bg-soft">
            <img src={unsplash(STOCK.cleanPlant, 1600)} alt="A pallet of printed cartons ready for dispatch" width={1600} height={1200} fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
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
          <Head title="Our Clients" sub="Printing for pharmaceutical, food and cosmetic brands across Pakistan." />
        </div>
        <ClientLogos />
      </section>

      {/* 4 · What we print, by sector */}
      <section className="section border-t border-ink/[.08] bg-[#F5F7FA]" id="products">
        <div className="container-x">
          <Head title="Packaging We Print" sub="Packaging for the industries we know best, from medicine cartons to bakery boxes." link={{ text: `All ${products.length} products`, href: '/products' }} />
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr]">
            {sectors.map((s, i) => (
              <article key={s.name} className="flex w-[86%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink/[.08] bg-white sm:w-auto">
                <div className={`overflow-hidden ${s.contain ? 'bg-white' : 'bg-soft'}`}>
                  <img src={s.img} alt="" loading="lazy" className={`w-full aspect-[16/10] ${i === 0 ? '' : 'lg:aspect-[4/3]'} ${s.contain ? 'object-contain p-8' : 'object-cover'}`} />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
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
          <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-8 text-center sm:mb-12 sm:gap-10">
            <div>
              <h2 className="text-[clamp(2.25rem,4.4vw,3.4rem)] font-medium leading-[1.08] tracking-[-.03em]">Our Printing Machinery</h2>
              <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-brand-light" />
              <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-relaxed text-cyan">Three offset presses and a full finishing line, under one roof in Lahore.</p>
            </div>
            <dl className="grid w-full max-w-xl grid-cols-3 border-t border-white/10 pt-6">
              {[['25+', 'years on press'], ['3', 'offset presses'], [`${CLIENTS.length}+`, 'brands served']].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-[36px] font-medium leading-none tracking-[-.02em] tabular-nums">{n}</dd>
                  <dd className="mt-2 text-[14px] text-cyan">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mach-row no-scrollbar">
            {machines.map(m => (
              <article key={m.name} tabIndex={0} className="mach-panel relative flex sm:min-h-[500px] flex-col overflow-hidden rounded-2xl border border-white/[.08] bg-graphite-card outline-none focus-visible:ring-2 focus-visible:ring-brand-light lg:min-h-[540px]">
                <div className="relative h-[190px] shrink-0 overflow-hidden sm:h-[240px]">
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

      {/* 6 · Formats and finishes */}
      <section className="section bg-white" id="work">
        <div className="container-x">
          <Head title="Our Printing Work" sub="Folding cartons, rigid boxes, bakery packs and printed shippers, finished in-house with foil, lamination and die-cutting." link={{ text: 'Browse all products', href: '/products' }} />
          <ClientWork />
        </div>
      </section>

      {/* 7 · How we work, and why brands stay */}
      <section className="section border-t border-ink/[.08] bg-[#F5F7FA]">
        <div className="container-x">
          <Head title="Why Choose ALL PACK" sub="A print house first, so the details get done right, from your brief to delivered boxes." />
        </div>
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="text-[22px] font-medium tracking-[-.015em]">How an order runs</h3>
            <ol className="mt-6 border-t border-ink/[.08]">
              {steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[48px_1fr] gap-x-2 border-b border-ink/[.08] py-6">
                  <span className="text-[15px] font-medium tabular-nums text-brand-dark">0{i + 1}</span>
                  <span><span className="block text-[18px] font-medium">{s.t}</span><span className="mt-1.5 block text-[15px] leading-relaxed text-secondary">{s.d}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-[22px] font-medium tracking-[-.015em]">Why brands stay with us</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {reasons.map(r => (
                <div key={r.t} className="rounded-2xl border border-ink/[.08] bg-white p-6">
                  <h4 className="text-[18px] font-medium">{r.t}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-secondary">{r.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[15px] font-medium text-brand-dark">Certified</p>
            <div className="mt-4"><Certifications /></div>
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
                  <span><span className="block text-[13px] text-cyan">{c.k}</span><span className="mt-0.5 block break-words text-[17px] font-medium [overflow-wrap:anywhere]">{c.v}</span></span>
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
