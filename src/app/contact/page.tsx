import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageIntro } from '@/components/PageIntro';
import { QuoteForm } from '@/components/QuoteForm';
import { COMPANY, phoneLink, whatsappLink, QUOTE_MESSAGE } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Contact Our Packaging Team',
  description: 'Contact ALL PACK in Lahore for custom packaging, printing, boxes and bulk packaging quotation enquiries.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const mapsQuery = encodeURIComponent(COMPANY.address);
  const whatsapp = whatsappLink(QUOTE_MESSAGE);
  const call = phoneLink();
  return <main>
    <PageIntro eyebrow="WE'D LOVE TO HEAR YOUR IDEA" title={<>Let's make your next <span className="gradient-text">package exceptional.</span></>} description="Send your dimensions, packaging idea, artwork or an approximate order quantity. We'll review your enquiry and discuss the best next step." />
    <section className="site-container section-pad grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
      <div className="space-y-5">
        <div className="surface-card p-7 sm:p-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f0fc] text-[#303C85]"><MapPin size={23} /></div>
          <h2 className="mb-4 text-2xl font-bold">Visit or contact ALL PACK</h2>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-skybrand">LAHORE OFFICE</p>
          <address className="not-italic text-sm leading-7 text-muted">{COMPANY.address}</address>
          <a className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-skybrand hover:underline" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}>See map & directions <ArrowUpRight size={16} /></a>
        </div>
        <div className="surface-card space-y-5 p-7 sm:p-8">
          <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-4 hover:text-skybrand"><Mail size={23} className="mt-1 shrink-0 text-skybrand"/><span><span className="block text-xs font-semibold uppercase tracking-widest text-muted">Email</span><span className="mt-1 block break-all text-sm font-semibold">{COMPANY.email}</span></span></a>
          {COMPANY.phone ? <a href={call || undefined} className="flex items-start gap-4 hover:text-skybrand"><Phone size={23} className="mt-1 shrink-0 text-skybrand"/><span><span className="block text-xs font-semibold uppercase tracking-widest text-muted">Phone</span><span className="mt-1 block text-sm font-semibold">{COMPANY.phone}</span></span></a> : <p className="text-sm leading-6 text-muted">For the official telephone number, please contact us by email. A verified number can be added to this page later.</p>}
          <div className="flex flex-wrap gap-3">{call && <a href={call} className="btn-outline flex-1"><Phone size={18}/> Call Now</a>}{whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1"><MessageCircle size={19}/> WhatsApp</a>}</div>
          <div className="flex items-start gap-4 border-t border-line pt-5"><Clock3 size={23} className="mt-1 shrink-0 text-skybrand"/><div><p className="text-xs font-semibold uppercase tracking-widest text-muted">Business hours</p><p className="mt-1 text-sm leading-6 text-muted">Please email ahead to confirm opening hours and arrange a visit.</p></div></div>
        </div>
        <div className="rounded-2xl border border-line bg-soft p-6"><p className="text-sm font-semibold">Just browsing?</p><p className="mt-2 text-sm leading-6 text-muted">Explore materials and structures first, or preview your own box in our design studio.</p><Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-skybrand" href="/studio">Explore the Studio <ArrowUpRight size={16}/></Link></div>
      </div>
      <div><QuoteForm /></div>
    </section>
    <section className="site-container pb-24"><div className="mb-6"><p className="eyebrow">FIND US IN LAHORE</p><h2 className="text-3xl font-bold tracking-tight">Your next visit starts here.</h2></div><div className="overflow-hidden rounded-[1.8rem] border border-line bg-soft shadow-soft"><iframe title="ALL PACK office area map, Lahore" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[350px] w-full border-0 sm:h-[440px]" src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`} /><div className="flex flex-col justify-between gap-3 border-t border-line bg-paper p-5 text-sm text-muted sm:flex-row sm:items-center"><p>Map points to the address shown on ALL PACK's letterhead. Please confirm the exact entrance before visiting.</p><a href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} target="_blank" rel="noopener noreferrer" className="shrink-0 font-semibold text-skybrand">Open in Maps ↗</a></div></div></section>
  </main>;
}
