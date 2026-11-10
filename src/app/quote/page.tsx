import type { Metadata } from 'next';
import { Clock, FileCheck2, MessageCircle, Phone } from 'lucide-react';
import { Eyebrow } from '@/components/Section';
import { QuoteForm } from '@/components/QuoteForm';
import { Reveal } from '@/components/Reveal';
import { COMPANY, phoneLink, whatsappLink } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Get a Free Quote',
  description: 'Tell ALL PACK what you need: products, quantity, size and artwork. Get a clear specification and a free, no-obligation packaging quote.',
  alternates: { canonical: '/quote' },
};

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const { product } = await searchParams;
  const slug = (Array.isArray(product) ? product[0] : product || '').slice(0, 80);
  const call = phoneLink();
  return (
    <main className="grain-dark relative isolate overflow-hidden bg-ink pb-28 pt-14 text-white sm:pt-20">
      <div className="absolute inset-0 -z-10 opacity-[.14] [background-image:radial-gradient(#8FA6FF_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(60%_70%_at_80%_30%,#000,transparent)]" aria-hidden="true" />
      <div className="absolute -left-40 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-brand/35 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow light>Free quote</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,4.6vw,3.9rem)] font-semibold leading-[1.05] tracking-[-.035em] text-white">Tell us what you&apos;re <span className="text-[#8FA6FF]">packing.</span></h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-cream/70">Two minutes is all it takes. The more you share, the more accurate your quote, but a rough idea is a perfectly good start.</p>
          <ul className="mt-10 space-y-5">
            {[
              { icon: FileCheck2, t: 'Clear specification', d: 'Material, structure and finish spelled out.' },
              { icon: Clock, t: 'Lead time confirmed', d: 'Know when it arrives before you commit.' },
              { icon: MessageCircle, t: 'Real conversation', d: 'Questions answered by the team on phone or WhatsApp.' },
            ].map(x => (
              <li key={x.t} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white"><x.icon size={20} /></span>
                <span><span className="block font-semibold">{x.t}</span><span className="text-sm text-cream/60">{x.d}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-[14px] border border-white/10 bg-white/[.05] p-6">
            <p className="text-sm text-cream/60">Prefer to talk?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {call && <a href={call} className="btn btn-sm border border-white/30 text-white hover:border-white"><Phone size={15} /> {COMPANY.phone}</a>}
              <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-[#1F9D55] text-white hover:bg-[#178a45]"><MessageCircle size={15} /> WhatsApp</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={.1}><div className="rounded-[14px] bg-white p-2 text-ink sm:p-3"><QuoteForm prefillProduct={slug} /></div></Reveal>
      </div>
    </main>
  );
}
