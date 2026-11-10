import type { Metadata } from 'next';
import { ArrowUpRight, Clock, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { QuoteForm } from '@/components/QuoteForm';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { Eyebrow } from '@/components/Section';
import { COMPANY, mapsLink, phoneLink, whatsappLink } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Call, WhatsApp, email or visit ALL PACK in Lahore for custom packaging and printing. Send your brief for a free quote.',
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
      {/* Header — dark */}
      <section className="bg-ink text-white">
        <div className="container-x py-16 sm:py-20">
          <Eyebrow light>Contact</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-.035em] text-white">Talk to the packaging team</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-cream/70 sm:text-lg">Call, message or email us, or send your brief with the form below. We reply to every enquiry within 24 hours.</p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {methods.map(m => (
              <a key={m.label} href={m.href} {...(m.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[.04] p-6 transition hover:border-cyan hover:bg-white/[.07]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white"><m.icon size={20} /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between text-[13px] font-semibold text-cyan">{m.label}<ArrowUpRight size={16} className="text-cream/50 transition group-hover:text-white" /></span>
                  <span className="mt-1.5 block break-all text-lg font-semibold text-white">{m.value}</span>
                  <span className="mt-0.5 block text-[14px] text-cream/60">{m.note}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + details — light */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
          <div>
            <Eyebrow n={1}>Your brief</Eyebrow>
            <h2 className="h-section mt-5">Send us the details</h2>
            <p className="mt-3 text-[16px] text-muted">Tell us what you need. A rough size and quantity is enough to start.</p>
            <div className="mt-8"><QuoteForm compact /></div>
          </div>

          <aside className="space-y-5 lg:pt-2">
            <div className="rounded-xl border border-line p-7">
              <p className="flex items-center gap-2 text-[13px] font-medium text-brand"><MapPin size={16} /> Office</p>
              <address className="mt-3 text-[16px] not-italic leading-relaxed text-ink">{COMPANY.address}</address>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand hover:underline">Open in Google Maps <ArrowUpRight size={15} /></a>
              <p className="mt-4 border-t border-line pt-4 text-[14px] leading-relaxed text-muted">Planning a visit? Call or WhatsApp ahead so the right person is there to meet you.</p>
            </div>

            <div className="rounded-xl border border-line p-7">
              <p className="flex items-center gap-2 text-[13px] font-medium text-brand"><Clock size={16} /> Response time</p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink">We reply to every enquiry within 24 hours, usually much sooner on WhatsApp.</p>
            </div>

            <div className="rounded-xl bg-paper-deep p-7">
              <p className="flex items-center gap-2 text-[13px] font-medium text-brand"><FileText size={16} /> Helpful to include</p>
              <ul className="mt-4 space-y-2.5 text-[15px] text-ink">
                {['What you are packing', 'Approximate size and weight', 'Quantity you need', 'Your logo or artwork, if ready', 'When you need it delivered'].map(t => (
                  <li key={t} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
