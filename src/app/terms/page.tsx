import type { Metadata } from 'next';
import { PAGE_SEO, seoTitle } from '@/data/seo';
import { PageHero } from '@/components/PageHero';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = { title: seoTitle(PAGE_SEO.terms), description: PAGE_SEO.terms.description, alternates: { canonical: '/terms' } };

const sections = [
  ['About these terms', `These terms cover the use of this website and orders placed with ${COMPANY.name}, ${COMPANY.address}, Pakistan. Anything agreed in writing in your quotation or order confirmation takes priority over these general terms.`],
  ['Using this website', 'Product descriptions, photographs and guides are for general information. Photographs show typical examples and may include stock images; the final pack is always made to the specification agreed with you.'],
  ['Quotations', 'Prices depend on material, size, quantity, print and finish. A quotation is valid for the period stated on it. Board and paper prices can change, so a quotation that has expired may need to be re-confirmed before production.'],
  ['Artwork and proofs', 'You are responsible for the content of your artwork, including spelling, barcodes, product and legal information, and for having the right to use any logos, images and trademarks you send us. Nothing goes to press until you approve a proof, and errors in an approved proof are not our responsibility.'],
  ['Colour and finish', 'Printed colours can vary slightly between screen and print, between materials, and from one production run to the next. If colour matching is critical, ask for a physical proof or a reference standard before production.'],
  ['Quantities', 'Printing and converting involve some setup waste, so the delivered quantity can vary slightly from the quantity ordered. The accepted variation and how it is invoiced are confirmed in your quotation.'],
  ['Payment and lead times', 'Payment terms, any advance payment and the expected lead time are set out in your quotation. Lead times start once artwork is approved and any advance has been received.'],
  ['Delivery and claims', 'Delivery arrangements and costs are confirmed with your order. Please check your goods on arrival and tell us about any damage, shortage or defect in writing within 7 days, with photographs, so we can put it right.'],
  ['Your artwork and our tooling', 'Your designs remain yours. We may keep printing plates, dies and files to make repeat orders easier, and we will not use your artwork for anyone else. We may show finished packaging in our portfolio unless you ask us not to.'],
  ['Liability', 'Our responsibility for a faulty order is limited to reprinting the affected packaging or refunding the price paid for it. We are not liable for indirect losses such as lost sales or profit.'],
  ['Law', 'These terms are governed by the laws of Pakistan, and the courts of Lahore have jurisdiction.'],
  ['Questions', `Email ${COMPANY.email} or call ${COMPANY.phone} if anything here is unclear.`],
];

export default function TermsPage() {
  return (
    <main>
      <PageHero kicker="Terms" title={<>Clear terms, <span className="accent">no surprises</span></>} description="The ground rules for using this website and ordering printed packaging from ALL PACK." />
      <section className="container-x pb-28 pt-16">
        <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {sections.map(([h, b]) => (
            <div key={h} className="grid gap-3 py-8 sm:grid-cols-[200px_1fr]"><h2 className="text-[17px] font-medium">{h}</h2><p className="leading-relaxed text-secondary">{b}</p></div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-sm text-muted">Last updated November 2026.</p>
      </section>
    </main>
  );
}
