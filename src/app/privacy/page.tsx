import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How ALL PACK handles the information you share through this website.', alternates: { canonical: '/privacy' } };

const sections = [
  ['What we collect', 'When you request a quote we receive the details you enter (name, email, phone, company, city, product requirements) and any artwork you upload. If you sign up for updates we receive your email address and your consent.'],
  ['How we use it', 'Only to respond to your enquiry, prepare quotations, and, if you opted in, send occasional packaging updates. We do not sell or rent your information.'],
  ['How it is delivered', 'Form submissions are sent to our team by email through Resend, an email delivery provider. The website does not keep a separate database of your enquiries.'],
  ['Your browser', 'Your quote list is saved in your own browser (local storage) so it survives a page refresh. Logos you try in the 3D Studio stay on your device and are not uploaded. The contact page shows an embedded Google Map, which is subject to Google’s own privacy policy.'],
  ['Your choices', `To access, correct or delete information you have sent us, or to stop receiving updates, email ${COMPANY.email}.`],
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero kicker="Privacy" title={<>Your data, <span className="accent">handled simply.</span></>} description="A short, plain-language explanation of what happens to the information you share with us." />
      <section className="container-x pb-28">
        <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {sections.map(([h, b]) => (
            <div key={h} className="grid gap-3 py-8 sm:grid-cols-[200px_1fr]"><h2 className="font-display text-lg font-semibold">{h}</h2><p className="leading-relaxed text-muted">{b}</p></div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-sm text-muted">Last updated October 2026.</p>
      </section>
    </main>
  );
}
