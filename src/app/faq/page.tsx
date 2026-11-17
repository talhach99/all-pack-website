import type { Metadata } from 'next';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { FaqAccordion } from '@/components/FaqAccordion';
import { faqs } from '@/data/faqs';
import { whatsappLink } from '@/lib/company';

export const metadata: Metadata = { title: seoTitle(PAGE_SEO.faq),
  description: PAGE_SEO.faq.description, alternates: { canonical: '/faq' } };

export default function FAQPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <PageHero kicker="FAQ" title="Ordering custom packaging, explained" description="Order quantities, sizes, artwork, proofs, finishes and delivery: the questions we are asked most often before an order is placed." />
      <section className="container-x pb-28 pt-16">
        <div className="mx-auto max-w-4xl">
          <FaqAccordion />
          <div className="mt-16 rounded-3xl border border-line bg-mist p-8 text-center sm:p-12">
            <h2 className="text-[28px]">Have a question that is not listed?</h2>
            <p className="mx-auto mt-3 max-w-md text-secondary">Ask our team directly about sizes, board grades, finishes or lead times.</p>
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
