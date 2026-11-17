import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import { principles, process, sectors } from '@/data/catalog';
import { Machines } from '@/components/Machines';
import { faqs } from '@/data/faqs';
import { emailLink, quoteLink } from '@/lib/company';
import { PageHero } from '@/components/PageHero';
import { Eyebrow, SectionHead } from '@/components/Section';
import { Reasons } from '@/components/Reasons';
import { ClientLogos } from '@/components/ClientStrip';
import { WhatsAppIcon } from '@/components/FloatingContact';

export const metadata: Metadata = { title: seoTitle(PAGE_SEO.why), description: PAGE_SEO.why.description, alternates: { canonical: '/why-all-pack' } };

const inHouse = [
  { title: 'One point of responsibility', text: 'Prepress, printing, finishing and dispatch are handled by one team. When something needs attention, there is one company accountable for it.' },
  { title: 'Colour controlled at the press', text: 'Your approved proof is checked against the printed sheet on our own Heidelberg presses, not against a subcontractor’s interpretation of it.' },
  { title: 'Reorders that match', text: 'Plates, dielines and colour references are kept on file, so a reorder is produced to the same standard as the first run.' },
  { title: 'Schedules we can commit to', text: 'Delivery dates are planned against our own production capacity, which is why we confirm them in writing with every quotation.' },
];

export default function WhyPage() {
  const answered = faqs.slice(0, 5);
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: answered.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <PageHero
        kicker="Why ALL PACK"
        title="Why brands keep their packaging with ALL PACK."
        description="Certified processes, our own presses and more than 25 years of production experience. Here is what that means for the cartons, boxes and labels you put in front of your customers."
      >
        <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Request a quote</a>
        <Link href="/products" className="btn-outline">View the product range</Link>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <SectionHead kicker="Credentials" title="Proof, not promises." sub="The certifications and experience our clients’ own quality audits look for." />
          <Reasons />
        </div>
      </section>

      <section className="section dark-section">
        <div className="container-x">
          <SectionHead light kicker="In-house production" title="What one facility means for your order." sub="Printing, finishing and converting take place under one roof in Lahore. Nothing is handed to a subcontractor." />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {inHouse.map((x, i) => (
              <div key={x.title} className="border-t border-white/15 pt-7">
                <p className="font-mono text-[12.5px] text-brand-light">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-[20px] !text-white">{x.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cyan">{x.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-16"><Machines /></div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead kicker="How we work" title="Four principles behind every order." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <div key={p.title} className="card p-7">
                <p className="meta">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 text-[19px]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">{p.text}</p>
              </div>
            ))}
          </div>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.step} className="bg-mist p-7">
                <p className="meta text-brand">{String(i + 1).padStart(2, '0')} / {p.step}</p>
                <h3 className="mt-3 text-[18px]">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-secondary">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-y border-line bg-mist">
        <div className="container-x">
          <SectionHead kicker="Our clients" title="Trusted by pharmaceutical, food and healthcare brands." sub={`We produce for ${sectors.slice(0, 4).map(s => s.name.toLowerCase()).join(', ')} and more.`} className="mb-12" />
        </div>
        <ClientLogos />
        <div className="mt-12 text-center"><Link href="/industries" className="btn-outline">See the industries we serve</Link></div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Before you order</Eyebrow>
            <h2 className="h-section mt-5">Questions buyers ask us first.</h2>
            <p className="lead mt-5">The full list of answers is on our <Link href="/faq" className="font-semibold text-brand hover:underline">FAQ page</Link>.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-primary"><WhatsAppIcon size={18} /> Ask on WhatsApp</a>
              <a href={emailLink()} className="btn-outline"><Mail size={17} strokeWidth={1.75} /> Email us</a>
            </div>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {answered.map(f => (
              <div key={f.q} className="py-6">
                <dt className="font-display text-[18px] font-semibold">{f.q}</dt>
                <dd className="mt-2 text-[15.5px] leading-relaxed text-secondary">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
