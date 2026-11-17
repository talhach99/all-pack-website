import type { Metadata } from 'next';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import { PageHero } from '@/components/PageHero';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = { title: seoTitle(PAGE_SEO.privacy),
  description: PAGE_SEO.privacy.description, alternates: { canonical: '/privacy' } };

const sections = [
  ['What we receive', 'This website does not collect enquiries itself. When you contact us by WhatsApp, email or phone, or prepare a brief with the form on the contact page (which opens WhatsApp or your email app), we receive the details you choose to send: your name, company, contact details, product requirements and any artwork.'],
  ['How we use it', 'Only to answer your enquiry, prepare quotations and fulfil orders. We do not sell, rent or share your information for marketing.'],
  ['Analytics', 'We use Cloudflare Web Analytics to count visits and understand which pages are useful. It sets no cookies, does not track you across other websites and does not identify you personally. This website sets no advertising or tracking cookies.'],
  ['Third-party services', 'Messages sent by WhatsApp or email are also subject to the privacy terms of those services. Links to Google Maps open Google’s own website.'],
  ['Your choices', `To see, correct or delete information you have sent us, email ${COMPANY.email}.`],
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero kicker="Privacy" title="Privacy policy" description="A plain-language account of the information we receive through this website and how it is used." />
      <section className="container-x pb-28 pt-16">
        <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {sections.map(([h, b]) => (
            <div key={h} className="grid gap-3 py-8 sm:grid-cols-[200px_1fr]"><h2 className="text-[17px]">{h}</h2><p className="leading-relaxed text-secondary">{b}</p></div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-sm text-muted">Last updated November 2026.</p>
      </section>
    </main>
  );
}
