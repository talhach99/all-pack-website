/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite, pageMeta } from '@/lib/site';
import { FINISHES, METHODS, FINISH_GUIDE } from '@/data/home';
import { heroChip, heroImages, heroTitle, PageHero } from '@/components/PageHero';
import { FinishPreview } from '@/components/ap/FinishPreview';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('finishes', '/finishes'); }

export default async function FinishesPage() {
  const { links, copy: t, materials: MATERIALS } = await getSite();
  const wa = links.whatsappLink();
  return (
    <main className="ap">
      <PageHero kicker="Finishes" title={heroTitle(t, 'finishes')} description={t['hero.finishes.lead']} images={heroImages(t, 'finishes')}>
        <a href="#finishes" className={heroChip}>Coatings &amp; effects</a><a href="#materials" className={heroChip}>Materials</a>
      </PageHero>
      <FinishPreview />

      <section id="finishes" className="scroll-mt-24 px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto max-w-[1200px]">
          <div className="mb-10 max-w-[720px]"><span className="ap-kicker">All finishes</span><h2 className="mt-3 text-[36px] leading-[1.05] sm:text-[44px]">Coatings and effects</h2><p className="mt-3.5 text-[17px] leading-[1.6] text-[#5C6272]">Every finish is applied in-house and checked against your approved proof.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FINISHES.map(f => (
              <div key={f.name} className="ap-lift flex flex-col overflow-hidden rounded-[20px] border border-[#E6E8EE] bg-white">
                <div className="flex h-[150px] items-center justify-center" style={{ background: f.face }}><span className="text-[20px] font-extrabold" style={{ color: f.ink, textShadow: f.shadow }}>ALL PACK</span></div>
                <div className="flex flex-col gap-2 p-5"><div className="flex items-baseline justify-between"><h3 className="text-[18px]">{f.name}</h3><span className="text-[14px] font-extrabold text-[#2B43F0]">{f.cost}</span></div><p className="text-[14px] leading-[1.55] text-[#5C6272]">{f.desc}</p><p className="text-[13px] text-[#8A93A8]">Best for: {f.best}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="materials" className="scroll-mt-24 bg-[#F4F5F8] px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto max-w-[1200px]">
          <div className="mb-10 max-w-[720px]"><span className="ap-kicker">Materials</span><h2 className="mt-3 text-[36px] leading-[1.05] sm:text-[44px]">Choose your board and film</h2><p className="mt-3.5 text-[17px] leading-[1.6] text-[#5C6272]">The right material protects your product and sets the tone for your brand.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MATERIALS.filter(m => m.src).map((m, mi) => (
              <div key={`${m.name}-${mi}`} className="ap-card ap-lift flex flex-col overflow-hidden rounded-[20px] bg-white">
                <div className="h-[170px] overflow-hidden" style={{ background: m.bg }}><img src={m.src} alt={m.name} width={400} height={340} loading="lazy" className={`ap-img h-full w-full ${m.fit === 'contain' ? 'object-contain p-4' : 'object-cover'}`} /></div>
                <div className="flex flex-col gap-1.5 p-5"><h3 className="text-[17px]">{m.name}</h3><p className="text-[14px] leading-[1.55] text-[#5C6272]">{m.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <div className="ap-rv mx-auto flex max-w-[1200px] flex-wrap gap-12">
          <div className="flex-[1_1_440px]">
            <span className="ap-kicker">Print methods</span><h2 className="mb-8 mt-3 text-[36px] leading-[1.05] sm:text-[44px]">How we print</h2>
            <div className="border-t border-[#E6E8EE]">
              {METHODS.map((m, k) => <div key={m.name} className="flex gap-5 border-b border-[#E6E8EE] py-5"><span className="pt-1 text-[13px] font-extrabold text-[#2B43F0]">0{k + 1}</span><div><h3 className="text-[19px]">{m.name}</h3><p className="mt-1 text-[15px] leading-[1.6] text-[#5C6272]">{m.text}</p></div></div>)}
            </div>
          </div>
          <div className="flex-[1_1_440px] rounded-3xl bg-[#ECEFFD] p-8 sm:p-10">
            <span className="ap-kicker">Quick guide</span><h3 className="mb-6 mt-3 text-[30px]">Which finish should I choose?</h3>
            <div className="flex flex-col gap-3.5">{FINISH_GUIDE.map(([q, a]) => <div key={q} className="flex flex-wrap justify-between gap-4 rounded-[14px] bg-white px-4 py-4"><span className="text-[15px] font-semibold text-[#4A5060]">{q}</span><span className="text-[15px] font-extrabold">{a}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-28">
        <div className="ap-rv mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-7 rounded-[24px] bg-[#0A208C] p-7 text-white sm:rounded-[28px] sm:p-16">
          <div className="max-w-[620px]"><h2 className="text-[36px] leading-[1.05] !text-white sm:text-[44px]">Not sure which finish fits?</h2><p className="mt-3 text-[17px] leading-[1.6] text-[#C8D0F5]">Tell us about your product and budget, and we will recommend a finish and send samples.</p></div>
          <div className="flex flex-wrap gap-2.5"><Link href="/contact" className="ap-btn ap-white font-extrabold text-[#0A208C]">Start your quote</Link>{wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="ap-btn ap-ghost-light">WhatsApp us</a>}</div>
        </div>
      </section>
    </main>
  );
}
