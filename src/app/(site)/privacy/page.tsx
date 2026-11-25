import type { Metadata } from 'next';
import { getSite, pageMeta } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { PolicyCard } from '@/components/PolicyCard';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('privacy', '/privacy'); }

const sectionsFor = (COMPANY: { email: string; phone: string; name: string; address: string }) => [
  ['What we receive', 'When you send the inquiry form on the contact page, we store your name, email address, WhatsApp number and message so that we can reply. When you contact us by WhatsApp, email or phone, or prepare a brief with the quotation brief form (which opens WhatsApp or your email app), we receive the details you choose to send: your name, company, contact details, product requirements and any artwork.'],
  ['How we use it', 'Only to answer your inquiry, prepare quotations and fulfill orders. Inquiries are visible only to ALL PACK staff who manage the website. We do not sell, rent or share your information for marketing.'],
  ['Analytics', 'We use Cloudflare Web Analytics to count visits and understand which pages are useful. It sets no cookies, does not track you across other websites and does not identify you personally. This website sets no advertising or tracking cookies.'],
  ['Third-party services', 'Messages sent by WhatsApp or email are also subject to the privacy terms of those services. Links to Google Maps open Google’s own website.'],
  ['Your choices', `To see, correct or delete information you have sent us, email ${COMPANY.email}.`],
];

export default async function PrivacyPage() {
  const { company: COMPANY } = await getSite();
  const sections = sectionsFor(COMPANY);
  return (
    <main>
      <PageHero kicker="Privacy" title="Privacy policy" description="A plain-language account of the information we receive through this website and how it is used." aside={<PolicyCard email={COMPANY.email} />} />
      <section className="container-x pb-20 sm:pb-28 pt-16">
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
