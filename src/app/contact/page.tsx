import type { Metadata } from 'next';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import { ArrowUpRight, Clock, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { QuoteForm } from '@/components/QuoteForm';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { Eyebrow } from '@/components/Section';
import { COMPANY, mapsLink, phoneLink, whatsappLink } from '@/lib/company';

export const metadata: Metadata = {
  title: seoTitle(PAGE_SEO.contact),
  description: PAGE_SEO.contact.description,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const call = phoneLink();
  const wa = whatsappLink();
  const methods = [
    { icon: WhatsAppIcon, label: 'WhatsApp', value: COMPANY.phone, note: 'Fastest way to reach us', href: wa || '#', ext: true },
    ...(call ? [{ icon: Phone, label: 'Call', value: COMPANY.phone, note: 'Speak to the team', href: call, ext: false }] : []),
    { icon: Mail, label: 'Email', value: COMPANY.email, note: 'For artwork and detailed briefs', href: `mailto:${COMPANY.email}`, ext: false },
  ];

  return (
    <main>
      {/* Header */}
      <section className="page-hero">
        <div className="container-x py-14 sm:py-20">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,4.4vw,3.5rem)] font-medium leading-[1.08] tracking-[-.03em] text-ink">Talk to the packaging team</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-secondary sm:text-lg">Call, message or email us, or send your brief with the form below. We reply to every enquiry within 24 hours.</p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {methods.map(m => (
              <a key={m.label} href={m.href} {...(m.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group rounded-xl border border-line bg-white p-5 transition-colors hover:border-ink/20">
                <span className="flex items-center justify-between text-[13px] text-muted">
                  <span className="flex items-center gap-2"><m.icon size={18} strokeWidth={1.5} /> {m.label}</span>
                  <ArrowUpRight size={16} strokeWidth={1.5} className="transition-colors group-hover:text-ink" />
                </span>
                <span className={`mt-4 block leading-snug text-ink ${m.label === 'Email' ? 'break-all text-[16px] font-medium' : 'font-mono text-[17px] tabular-nums'}`}>{m.value}</span>
                <span className="mt-1 block text-[13px] text-muted">{m.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + details — light */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
          <div>
            <Eyebrow>Your brief</Eyebrow>
            <h2 className="h-section mt-5">Send us the details</h2>
            <p className="mt-3 text-[16px] text-secondary">Tell us what you need. A rough size and quantity is enough to start.</p>
            <div className="mt-8"><QuoteForm compact /></div>
          </div>

          <aside className="space-y-5 lg:pt-2">
            <div className="rounded-xl border border-line p-6">
              <p className="flex items-center gap-2 text-[13px] text-muted"><MapPin size={16} strokeWidth={1.5} /> Office</p>
              <address className="mt-3 text-[16px] not-italic leading-relaxed text-ink">{COMPANY.address}</address>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand hover:underline">Open in Google Maps <ArrowUpRight size={16} strokeWidth={1.5} /></a>
              <p className="mt-4 border-t border-line pt-4 text-[14px] leading-relaxed text-secondary">Planning a visit? Call or WhatsApp ahead so the right person is there to meet you.</p>
            </div>

            <div className="rounded-xl border border-line p-6">
              <p className="flex items-center gap-2 text-[13px] text-muted"><Clock size={16} strokeWidth={1.5} /> Response time</p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink">We reply to every enquiry within 24 hours, usually much sooner on WhatsApp.</p>
            </div>

            <div className="rounded-xl bg-mist p-6">
              <p className="flex items-center gap-2 text-[13px] text-muted"><FileText size={16} strokeWidth={1.5} /> Helpful to include</p>
              <ul className="mt-4 space-y-2.5 text-[15px] text-ink">
                {['What you are packing', 'Approximate size and weight', 'Quantity you need', 'Your logo or artwork, if ready', 'When you need it delivered'].map(t => (
                  <li key={t} className="flex gap-2.5"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
