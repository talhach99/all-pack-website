import type { Metadata } from 'next';
import { getSite, pageMeta } from '@/lib/site';
import { PageHero } from '@/components/PageHero';

export async function generateMetadata(): Promise<Metadata> { return pageMeta('shipping', '/shipping'); }

export default async function ShippingPage() {
  const { company } = await getSite();
  const sections: [string, string][] = [
    ['Where we ship', 'Our Boston office handles orders for customers in the United States, and our Lahore office handles orders across Pakistan. For other countries, contact us before ordering.'],
    ['Delivery times', 'Production begins once you approve your proof and payment. We confirm the production time and the expected delivery date in writing with every quote.'],
    ['Shipping costs', 'Shipping is quoted separately from production, based on the size, weight and destination of your order. The total is agreed before production starts.'],
    ['Tracking', 'When your order ships, we send the carrier name and tracking details by email or WhatsApp.'],
    ['Damaged or incorrect orders', `If any part of your order arrives damaged or does not match your approved proof, email ${company.email} as soon as possible after delivery, with photos, and we will work with you to put it right.`],
  ];
  return (
    <main className="ap">
      <PageHero kicker="Shipping" title="Shipping policy" description="How we deliver custom packaging to customers in the USA and Pakistan." />
      <section className="px-5 py-20">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10 text-[17px] leading-[1.75] text-[#2E3340]">
          {sections.map(([h, p]) => <div key={h}><h2 className="mb-2 text-[26px]">{h}</h2><p>{p}</p></div>)}
        </div>
      </section>
    </main>
  );
}
