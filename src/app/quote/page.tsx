import type { Metadata } from 'next';
import { Clock, FileCheck2, MessageCircle, Phone } from 'lucide-react';
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
    <main className="relative overflow-hidden pb-28 pt-14 sm:pt-20">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_40%_at_30%_0%,black,transparent)]" aria-hidden="true" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="kicker">Free quote</p>
          <h1 className="h-display mt-6 !text-[clamp(2.6rem,5.4vw,5rem)]">Tell us what you&apos;re <span className="accent">packing.</span></h1>
          <p className="lead mt-6 max-w-md">Two minutes is all it takes. The more you share, the more accurate your quote, but a rough idea is a perfectly good start.</p>
          <ul className="mt-10 space-y-5">
            {[
              { icon: FileCheck2, t: 'Clear specification', d: 'Material, structure and finish spelled out.' },
              { icon: Clock, t: 'Lead time confirmed', d: 'Know when it arrives before you commit.' },
              { icon: MessageCircle, t: 'Real conversation', d: 'Questions answered by the team on phone or WhatsApp.' },
            ].map(x => (
              <li key={x.t} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-paper-deep text-brass-dark"><x.icon size={20} /></span>
                <span><span className="block font-semibold">{x.t}</span><span className="text-sm text-muted">{x.d}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-[20px] border border-line bg-paper-light p-6">
            <p className="text-sm text-muted">Prefer to talk?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {call && <a href={call} className="btn-light btn-sm"><Phone size={15} /> {COMPANY.phone}</a>}
              <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-[#1F9D55] text-white hover:bg-[#178a45]"><MessageCircle size={15} /> WhatsApp</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={.1}><QuoteForm prefillProduct={slug} /></Reveal>
      </div>
    </main>
  );
}
