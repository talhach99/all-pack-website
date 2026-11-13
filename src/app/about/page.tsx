/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Handshake, PackageCheck, Palette, Ruler, ShieldCheck, Timer, Wallet } from 'lucide-react';
import { WhatsAppIcon } from '@/components/FloatingContact';
import { Eyebrow } from '@/components/Section';
import { COMPANY, phoneLink, quoteLink, whatsappLink } from '@/lib/company';
import { ClientStrip } from '@/components/ClientStrip';
import { industries } from '@/data/industries';
import { STOCK, stockUrl } from '@/lib/photos';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'ALL PACK is a Lahore packaging and printing company with more than 25 years of experience making boxes, bags, labels and printed packaging for businesses across Pakistan.',
  alternates: { canonical: '/about' },
};


const impact = [
  { icon: ShieldCheck, t: 'Protects the product', d: 'The right board, structure and fit, so goods arrive the way they left, whether they travel across town or across the country.' },
  { icon: Palette, t: 'Builds the brand', d: 'Print, colour and finish that make a product recognisable on a shelf, at a counter and on a customer’s doorstep.' },
  { icon: Wallet, t: 'Controls cost', d: 'Right-sized packs use less material, less void fill and less space in transit. Good packaging should save money, not just spend it.' },
  { icon: Timer, t: 'Keeps you on schedule', d: 'Clear specifications and realistic lead times, agreed before production, so launches and seasons are not left to chance.' },
];

const values = [
  { icon: Ruler, t: 'Fit first', d: 'Every pack starts with the product it has to hold.' },
  { icon: BadgeCheck, t: 'Quality you can check', d: 'Samples and proofs before a full run, not after.' },
  { icon: Handshake, t: 'Straight answers', d: 'Honest pricing and a clear yes or no on what will work.' },
  { icon: PackageCheck, t: 'One partner', d: 'From shipping carton to sticker, handled in one place.' },
];

const work = [
  { image: stockUrl(STOCK.pressRun, 800), t: 'Offset press run' },
  { image: stockUrl(STOCK.loupe, 800), t: 'Colour checked under a loupe' },
  { image: stockUrl(STOCK.printedCartons, 800), t: 'Printed folding cartons' },
  { image: stockUrl(STOCK.foilGiftBox, 800), t: 'Foil-stamped gift box' },
];

export default function AboutPage() {
  const wa = whatsappLink() || '/contact';
  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-x grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div className="anim-up">
            <Eyebrow>About ALL PACK</Eyebrow>
            <h1 className="mt-4 text-[clamp(2.25rem,4.4vw,3.5rem)] font-medium leading-[1.08] tracking-[-.03em] text-ink">More than 25 years of packaging that works as hard as your product</h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary sm:text-lg">ALL PACK is a Lahore packaging and printing company. For over a quarter of a century we have helped businesses protect what they make, present it with pride and get it to their customers in one piece.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
              <Link href="/products" className="btn-light">See what we make</Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            <div className="col-span-2 bg-white p-8"><dt className="sr-only">Years in packaging and print</dt><dd className="text-[64px] font-medium leading-none tracking-[-.03em] tabular-nums text-ink sm:text-[80px]">25+</dd><dd className="mt-3 text-[14px] text-muted">Years in packaging and print</dd></div>
            <div className="bg-white p-6"><dt className="sr-only">Packaging formats</dt><dd className="text-[32px] font-medium leading-none tabular-nums text-ink">22</dd><dd className="mt-2 text-[13px] text-muted">Packaging formats</dd></div>
            <div className="bg-white p-6"><dt className="sr-only">Industries served</dt><dd className="text-[32px] font-medium leading-none tabular-nums text-ink">{industries.length}</dd><dd className="mt-2 text-[13px] text-muted">Industries served</dd></div>
          </dl>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="h-section mt-5">Built on quality, trust and customers who keep coming back</h2>
          </div>
          <div className="space-y-5 text-[17px] leading-[1.8] text-secondary">
            <p>For more than 25 years, ALL PACK has been part of how Lahore’s businesses reach their customers. Bakeries, restaurants, pharmaceutical companies, retailers and online brands have trusted us with the one thing every product needs and every customer sees first: its packaging.</p>
            <p>We have grown alongside the businesses we serve. As they moved from local shops to nationwide delivery, from plain cartons to branded boxes, and from simple bags to premium gift packaging, we grew our range with them. Today that range covers 22 packaging formats, from heavy-duty shipping cartons to rigid gift boxes, printed bags and custom stickers.</p>
            <p>What has not changed is how we work. We listen to what the product needs, recommend what will genuinely work, quote clearly and deliver what we promised. That is why so many of our customers have stayed with us for years, and why so many new ones come to us by recommendation.</p>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section bg-mist">
        <div className="container-x">
          <Eyebrow>Why it matters</Eyebrow>
          <h2 className="h-section mt-5 max-w-3xl">Good packaging quietly does four jobs for your business</h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map(x => (
              <div key={x.t} className="border-t border-ink/10 pt-6">
                <x.icon size={18} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium">{x.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div className="min-w-0">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="h-section mt-5">Trusted across industries</h2>
            <p className="mt-5 text-[17px] leading-[1.8] text-secondary">Every industry asks something different of its packaging. Food needs to be safe and travel well. Medicine needs exact, approved print. E-commerce needs to survive the courier. Gifts need to feel special the moment they are held. Years of solving these problems is what we bring to every new order.</p>
            <div className="mt-8 border-t border-line pt-6">
              <ClientStrip label="Clients include" />
            </div>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {industries.map(i => (
              <li key={i.slug} className="bg-white">
                <Link href={`/industries/${i.slug}`} className="group flex h-full items-start justify-between gap-4 p-6 transition-colors hover:bg-mist">
                  <span><span className="block text-[16px] font-medium text-ink">{i.name}</span><span className="mt-1 block text-[14px] leading-relaxed text-secondary">{i.short}</span></span>
                  <ArrowRight size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-muted transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              </li>
            ))}
            <li className="bg-mist">
              <Link href="/contact" className="group flex h-full items-start justify-between gap-4 p-6">
                <span><span className="block text-[16px] font-medium text-ink">Don&apos;t see your industry?</span><span className="mt-1 block text-[14px] leading-relaxed text-secondary">Tell us what you make and we will suggest the right pack.</span></span>
                <ArrowRight size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-brand transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* How we work: the page's one dark band, carried by the photos */}
      <section className="section bg-ink text-white">
        <div className="container-x">
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="h-section mt-5 !text-white">The standards behind every order</h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(v => (
              <div key={v.t} className="border-t border-white/10 pt-6">
                <v.icon size={18} strokeWidth={1.5} className="text-cyan" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium text-white">{v.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cyan">{v.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {work.map(w => (
              <figure key={w.t} className="overflow-hidden rounded-xl bg-graphite-card">
                <img src={w.image} alt={w.t} loading="lazy" className="aspect-square w-full object-cover" />
                <figcaption className="px-4 py-3 text-[14px] font-medium text-white">{w.t}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-line bg-mist p-8 sm:p-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="h-section">Work with a team that has done this for 25 years</h2>
              <p className="mt-3 text-[17px] text-secondary">Tell us what you are packing. We will tell you what will work, and what it will cost.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
              <a href={phoneLink() || wa} className="btn-light font-mono tabular-nums">{COMPANY.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
