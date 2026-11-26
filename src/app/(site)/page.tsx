/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { preload } from 'react-dom';
import { getSite, pageMeta } from '@/lib/site';
import { MOSAIC, PRINT_ROWS, P } from '@/data/home';
import { HeroSlider, MarketSection, Newsletter } from '@/components/ap/HomeClient';
import { OfficesSection } from '@/components/ap/Offices';
import { FaqAccordion } from '@/components/FaqAccordion';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('home', '/'); }

export default async function Home() {
  const { clients, links, company, copy, heroSlides: HERO_SLIDES, homeFaqs } = await getSite();
  const logos = clients.filter(c => c.logo);
  const wa = links.whatsappLink();
  if (HERO_SLIDES[0]) preload(HERO_SLIDES[0].image, { as: 'image', fetchPriority: 'high', ...(HERO_SLIDES[0].srcSet ? { imageSrcSet: HERO_SLIDES[0].srcSet, imageSizes: '(max-width: 1024px) 100vw, 800px' } : {}) });
  return (
    <main className="ap">
      {HERO_SLIDES.length > 0 && <HeroSlider slides={HERO_SLIDES} />}

      {/* Client logos */}
      <section className="border-b border-[#EDEEF1] bg-white px-5 py-7">
        <div className="mx-auto flex max-w-[1392px] items-center gap-8">
          <div className="hidden shrink-0 border-r border-[#0B0D12] pr-8 sm:block">
            <p className="text-[15px] font-extrabold">Trusted by {logos.length}+ brands</p>
            <p className="text-[13px] text-[#5C6272]">across the USA and Pakistan</p>
          </div>
          <div className="ap-loopwrap ap-fade min-w-0 flex-1 overflow-hidden">
            <div className="ap-loop items-center gap-14" style={{ animationDuration: '45s' }}>
              {[...logos, ...logos].map((c, i) => <img key={i} src={c.logo} alt={i < logos.length ? c.name : ''} width={130} height={44} loading="lazy" className="ap-mono h-11 w-auto max-w-[130px] shrink-0 object-contain" />)}
            </div>
          </div>
        </div>
      </section>

      <MarketSection />

      {/* Product mosaic */}
      <section className="px-4 py-20 sm:px-5 sm:py-28">
        <div className="mx-auto mb-8 flex max-w-[1100px] flex-wrap items-end justify-between gap-4">
          <div><span className="ap-kicker">Products</span><h2 className="mt-2.5 text-[36px] leading-none sm:text-[48px]">Packaging for every product</h2></div>
          <Link href="/products" className="ap-ul font-bold">View the full catalog</Link>
        </div>
        <div className="mx-auto grid max-w-[1100px] auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:auto-rows-[260px] lg:grid-cols-4 lg:gap-5">
          <div className="ap-rv relative col-span-2 row-span-2 flex flex-col justify-center gap-4 overflow-hidden rounded-xl bg-[#0A208C] p-7 text-white sm:row-span-1 sm:p-8">
            <svg width="220" height="220" viewBox="0 0 46 46" aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-10 opacity-20"><path d="M23 6 40 38H6Z" fill="#22C3EE" /></svg>
            <div className="relative"><h3 className="text-[28px] leading-[1.08] !text-white sm:text-[30px] lg:text-[32px]">Turn every box into your brand</h3><p className="mt-2.5 text-[16px] leading-[1.5] text-[#C8D0F5]">Choose from our full range of packaging styles, printed to order.</p></div>
            <Link href="/products" className="ap-btn relative z-10 !min-h-[46px] shrink-0 self-start bg-[#22C3EE] font-extrabold text-[#0A208C]">Explore all products <span className="ap-go">›</span></Link>
          </div>
          {MOSAIC.map(t => (
            <Link key={t.name} href="/products" className={`ap-card ap-rv relative overflow-hidden rounded-xl border ${t.white ? 'border-[#E6E8EE] bg-white' : 'border-transparent bg-[#F2F3F5]'}`}>
              <img src={t.src} alt={t.name} width={520} height={520} loading="lazy" className={`ap-img absolute inset-0 h-full w-full ${t.fit === 'contain' ? 'object-contain px-3 pb-10 pt-3 sm:px-5 sm:pb-14 sm:pt-6' : 'object-cover'}`} />
              <span className="ap-chip absolute bottom-2.5 left-2.5 max-w-[calc(100%-20px)] rounded-md bg-white px-2 py-1 text-[12px] font-extrabold leading-tight sm:bottom-3.5 sm:left-3.5 sm:px-2.5 sm:py-1.5 sm:text-[13px]">{t.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* What we print */}
      <section className="px-4 pb-20 sm:px-5 sm:pb-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="ap-rv mb-10 text-center"><span className="ap-kicker">What we print</span><h2 className="mt-2.5 text-[36px] leading-none sm:text-[48px]">Three ways to print your brand</h2><p className="mx-auto mt-3.5 max-w-[560px] text-[17px] leading-[1.6] text-[#4A5060]">Flexible pouches, DTF transfers for apparel and offset printing for boxes and labels, all from one team.</p></div>
          <div className="flex flex-col gap-5">
            {PRINT_ROWS.map(row => (
              <div key={row.title} className="ap-rv rounded-3xl p-5 sm:p-12" style={{ background: row.bg }}>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-[620px]"><span className="ap-kicker">{row.kicker}</span><h3 className="mt-2.5 text-[30px] leading-[1.05] sm:text-[38px]">{row.title}</h3><p className="mt-3 text-[16px] leading-[1.6] text-[#4A5060]">{row.text}</p></div>
                  <Link href="/contact" className="ap-ul font-bold">{row.link}</Link>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                  {row.cards.map((cd, k) => (
                    <div key={cd.name} className="ap-card ap-lift flex flex-col gap-3 rounded-[18px] bg-white p-3 sm:gap-3.5 sm:rounded-[20px] sm:p-5">
                      <span className="hidden h-[38px] w-[38px] place-items-center rounded-full bg-[#ECEFFD] text-[14px] font-extrabold text-[#0A208C] sm:grid">0{k + 1}</span>
                      <div className="h-[150px] overflow-hidden rounded-[12px] sm:h-[240px] sm:rounded-[14px]"><img src={cd.src} alt={`ALL PACK ${cd.name}`} width={480} height={480} loading="lazy" className={`ap-img h-full w-full ${cd.fit === 'contain' ? 'object-contain' : 'object-cover'}`} /></div>
                      <h4 className="text-[15px] leading-tight sm:text-[17px]">{cd.name}</h4>
                      {cd.desc && <p className="hidden text-[14px] leading-[1.55] text-[#5C6272] sm:block">{cd.desc}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F4F5F8] px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto max-w-[1200px]">
          <div className="mx-auto mb-14 max-w-[640px] text-center"><span className="ap-kicker">How it works</span><h2 className="mt-3 text-[36px] leading-[1.05] sm:text-[48px]">From brief to doorstep in four steps</h2><p className="mt-4 text-[17px] leading-[1.6] text-[#5C6272]">One dedicated contact, clear pricing and a proof before anything prints.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard n="01" title="Share your specs" text="Send size, quantity and ship-to location by WhatsApp, email or our form." bg="#E7F7FC">
              <div className="ap-img max-w-[85%] self-start rounded-[14px_14px_14px_4px] bg-white px-3 py-2.5 text-[12px] leading-[1.45] shadow">Hi! We need 2,000 mailer boxes, 10 × 8 × 4 in, shipping to Texas.</div>
              <div className="max-w-[80%] self-end rounded-[14px_14px_4px_14px] bg-[#2B43F0] px-3 py-2.5 text-[12px] leading-[1.45] text-white">Great, sending options and pricing today.</div>
            </StepCard>
            <StepCard n="02" title="Get your quote" text="We recommend structure, material and finish, with a clear, itemized price." bg="#ECEFFD">
              <div className="ap-img flex w-full flex-col gap-2 rounded-[14px] bg-white px-4 py-3.5 text-[12px] shadow">
                <div className="flex justify-between font-extrabold"><span>Quote #1042</span><span className="text-[#2B43F0]">USD</span></div>
                <div className="flex justify-between text-[#5C6272]"><span>Mailer box, E-flute</span><span>2,000</span></div>
                <div className="flex justify-between text-[#5C6272]"><span>Matte lamination</span><span>✓</span></div>
                <div className="h-px bg-[#EDEEF1]" /><div className="flex justify-between font-extrabold"><span>Unit price</span><span>Quoted</span></div>
              </div>
            </StepCard>
            <StepCard n="03" title="Approve your proof" text="Review a digital proof, or a physical sample, before production starts." bg="#F3EEE6">
              <div className="relative h-full w-full"><img src={P('off-food')} alt="Proof of an ALL PACK food box" width={400} height={300} loading="lazy" className="ap-img h-full w-full rounded-xl object-cover" /><span className="absolute right-2 top-2 rotate-[4deg] rounded-full bg-[#16A34A] px-3 py-1.5 text-[12px] font-extrabold text-white">Approved ✓</span></div>
            </StepCard>
            <StepCard n="04" title="Receive your order" text="Printed, inspected and delivered to your door in the USA or Pakistan." bg="#0A208C">
              <div className="ap-img flex w-full flex-col gap-2.5 rounded-[14px] bg-white px-4 py-3.5 text-[12px]">
                <div className="flex justify-between font-extrabold"><span>Order #1042</span><span className="text-[#16A34A]">Delivered</span></div>
                <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#2B43F0]" /><span className="h-[3px] flex-1 rounded bg-[#2B43F0]" /><span className="h-2.5 w-2.5 rounded-full bg-[#2B43F0]" /><span className="h-[3px] flex-1 rounded bg-[#2B43F0]" /><span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" /></div>
                <div className="flex justify-between text-[11px] text-[#5C6272]"><span>Printed</span><span>Shipped</span><span>At your door</span></div>
              </div>
            </StepCard>
          </div>
          <div className="mt-10 text-center"><Link href="/how-it-works" className="ap-btn ap-dark">See how ordering works <span className="ap-go">›</span></Link></div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-5 sm:py-28"><div className="mx-auto max-w-[1200px]"><Newsletter /></div></section>

      <OfficesSection t={copy} c={{ wa, waUS: links.whatsappUS(), usPhone: company.usPhone, pkPhone: company.phone, email: company.email }} />

      {/* FAQ */}
      <section className="px-5 pt-20 sm:pt-28">
        <div className="ap-rv mx-auto max-w-[860px]">
          <div className="mb-10 text-center"><span className="ap-kicker">FAQ</span><h2 className="mt-2.5 text-[36px] leading-none sm:text-[48px]">Questions, answered</h2></div>
          <FaqAccordion faqs={homeFaqs} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 py-24 text-center sm:py-32">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-7">
          <h2 className="text-[44px] leading-[.98] sm:text-[80px]">Let’s make your box.</h2>
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-[#5C6272] sm:text-[19px]">Share your product size and quantity. We will come back with a structure, a proof and a price.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="ap-btn ap-blue">Get a quote</Link>
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="ap-btn ap-ghost">Message us on WhatsApp</a>}
          </div>
        </div>
      </section>
    </main>
  );
}

function StepCard({ n, title, text, bg, children }: { n: string; title: string; text: string; bg: string; children: React.ReactNode }) {
  return (
    <div className="ap-card ap-lift flex flex-col overflow-hidden rounded-[20px] bg-white">
      <div className="flex h-[200px] flex-col justify-center gap-2 p-5" style={{ background: bg }}>{children}</div>
      <div className="flex flex-col gap-2 p-6"><span className="text-[13px] font-extrabold text-[#2B43F0]">STEP {n}</span><h3 className="text-[20px]">{title}</h3><p className="text-[14px] leading-[1.6] text-[#5C6272]">{text}</p></div>
    </div>
  );
}
