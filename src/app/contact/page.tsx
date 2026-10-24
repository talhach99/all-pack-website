import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { QuoteForm } from '@/components/QuoteForm';
import { Reveal } from '@/components/Reveal';
import { COMPANY, mapsEmbed, mapsLink, phoneLink, whatsappLink } from '@/lib/company';

export const metadata: Metadata = { title: 'Contact', description: 'Call, WhatsApp, email or visit ALL PACK in Lahore for custom packaging and printing.', alternates: { canonical: '/contact' } };

export default function ContactPage() {
  const call = phoneLink();
  const cards = [
    call && { icon: Phone, label: 'Call', value: COMPANY.phone, href: call, ext: false },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with the team', href: whatsappLink() || '#', ext: true },
    { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}`, ext: false },
    { icon: MapPin, label: 'Visit', value: 'Lakshmi Chowk, Lahore', href: mapsLink, ext: true },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string; ext: boolean }[];
  return (
    <main>
      <PageHero kicker="Contact" title={<>Let&apos;s talk <span className="accent">packaging.</span></>} description="Call, message or drop by. Or send your brief below and we'll come back with a clear quote." />
      <section className="container-x">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * .05}>
              <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex h-full flex-col justify-between rounded-4xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist text-brand transition-colors group-hover:bg-ink group-hover:text-white"><c.icon size={21} /></span><ArrowUpRight size={18} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
                <div className="mt-10"><p className="text-sm text-muted">{c.label}</p><p className="mt-1 break-all font-display text-lg font-semibold tracking-tight">{c.value}</p></div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal><QuoteForm compact /></Reveal>
          <Reveal delay={.1} className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-4xl border border-line bg-white">
              <iframe title="Map to ALL PACK office, Lahore" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[380px] w-full border-0 grayscale-[.3]" src={mapsEmbed} />
              <div className="p-6">
                <p className="text-sm text-muted">Office</p>
                <address className="mt-1 not-italic leading-relaxed">{COMPANY.address}</address>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">Get directions <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <p className="rounded-3xl bg-mist p-5 text-sm text-muted">Planning a visit? Call or WhatsApp ahead so the right person is there to meet you.</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
