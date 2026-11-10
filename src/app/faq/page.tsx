import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { FaqAccordion } from '@/components/FaqAccordion';
import { faqs } from '@/data/faqs';
import { whatsappLink } from '@/lib/company';

export const metadata: Metadata = { title: 'FAQ', description: 'Answers about custom printed packaging from ALL PACK: minimum orders, custom sizes, artwork, lead times, food packaging and delivery.', alternates: { canonical: '/faq' } };

export default function FAQPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <PageHero kicker="FAQ" title={<>Questions, <span className="accent">answered</span></>} description="Everything you need to know before you order custom packaging." />
      <section className="container-x pb-28 pt-16">
        <div className="mx-auto max-w-4xl">
          <FaqAccordion />
          <div className="mt-16 rounded-2xl border border-line bg-mist p-8 text-center sm:p-12">
            <h2 className="text-[28px] font-medium">Still wondering about something?</h2>
            <p className="mx-auto mt-3 max-w-md text-secondary">Ask us directly. We&apos;re happy to talk through sizes, materials and finishes.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn-dark">Ask on WhatsApp</a>
              <Link href="/contact" className="btn-light">Contact us <ArrowRight size={16} strokeWidth={1.5} /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
