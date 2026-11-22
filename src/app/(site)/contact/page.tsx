import type { Metadata } from 'next';
import { getSite, pageMeta } from '@/lib/site';
import { ArrowUpRight, Clock, FileText, Mail, MapPin } from 'lucide-react';
import { QuoteForm } from '@/components/QuoteForm';
import { EnquiryForm } from '@/components/EnquiryForm';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { Eyebrow } from '@/components/Section';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('contact', '/contact'); }

export default async function ContactPage() {
  const { company: COMPANY, links, copy: t, families } = await getSite();
  const { mapsLink } = links;
  const wa = links.whatsappLink();
  const methods = [
    { icon: WhatsAppIcon, label: 'WhatsApp', value: COMPANY.phone, note: 'The quickest route to a quotation', href: wa || '#', ext: true },
    { icon: Mail, label: 'Email', value: COMPANY.email, note: 'For artwork files and detailed briefs', href: `mailto:${COMPANY.email}`, ext: false },
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="container-x pb-12 pt-10 sm:pb-16 sm:pt-14">
          <div className="hero-in mx-auto max-w-3xl text-center">
            <Eyebrow light>Contact</Eyebrow>
            <h1 className="h-page mt-5">{t['contact.title']}</h1>
            <p className="lead mx-auto mt-6 max-w-2xl">{t['contact.lead']}</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
            {methods.map(m => (
              <a key={m.label} href={m.href} {...(m.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group card p-5 transition-colors hover:border-[#C9CFDC] sm:p-6">
                <span className="flex items-center justify-between">
                  <span className="meta flex items-center gap-2"><m.icon size={16} strokeWidth={1.75} /> {m.label}</span>
                  <ArrowUpRight size={16} strokeWidth={1.5} className="text-muted transition-colors group-hover:text-navy" />
                </span>
                <span className="mt-3 block text-[16px] font-semibold sm:mt-4 sm:text-[17px] leading-snug [overflow-wrap:anywhere]">{m.value}</span>
                <span className="mt-1 block text-[14px] text-muted">{m.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + details — light */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
          <div>
            <Eyebrow>Enquiry</Eyebrow>
            <h2 id="enquiry" className="scroll-mt-32 mt-5 text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.1]">{t['contact.form.title']}</h2>
            <p className="mt-3 text-[16px] text-secondary">{t['contact.form.text']}</p>
            <div className="mt-8"><EnquiryForm /></div>

            <div className="mt-16 border-t border-line pt-14">
              <Eyebrow>Your brief</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1]">Prepare a detailed quotation brief</h2>
              <p className="mt-3 text-[16px] text-secondary">Prefer to send sizes and quantities straight to WhatsApp or email? Complete the details below.</p>
              <div className="mt-8"><QuoteForm compact families={families} whatsapp={COMPANY.whatsapp} email={COMPANY.email} /></div>
            </div>
          </div>

          <aside className="space-y-5 lg:pt-2">
            <div className="card p-6">
              <p className="meta flex items-center gap-2"><MapPin size={15} strokeWidth={1.75} /> Head office</p>
              <address className="mt-3 text-[16px] not-italic leading-relaxed text-ink">{COMPANY.address}</address>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand hover:underline">Open in Google Maps <ArrowUpRight size={16} strokeWidth={1.5} /></a>
              <p className="mt-4 border-t border-line pt-4 text-[14px] leading-relaxed text-secondary">{t['contact.visit']}</p>
            </div>

            <div className="card p-6">
              <p className="meta flex items-center gap-2"><Clock size={15} strokeWidth={1.75} /> Response time</p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink">Every enquiry receives a reply within 24 hours, and usually sooner on WhatsApp.</p>
            </div>

            <div className="rounded-2xl bg-mist p-6">
              <p className="meta flex items-center gap-2"><FileText size={15} strokeWidth={1.75} /> For an accurate quotation</p>
              <ul className="mt-4 space-y-2.5 text-[15px] text-ink">
                {['The product and its weight', 'Finished size (length × width × height)', 'Quantity per design', 'Artwork or logo, if available', 'Required delivery date'].map(t => (
                  <li key={t} className="flex gap-2.5"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
