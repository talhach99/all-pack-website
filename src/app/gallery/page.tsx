import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { GalleryGrid } from '@/components/GalleryGrid';
import { ClientWork } from '@/components/ClientWork';
import { SectionHead } from '@/components/Section';
import { quoteLink } from '@/lib/company';
import { WhatsAppIcon } from '@/components/FloatingContact';

export const metadata: Metadata = { title: 'Gallery', description: 'Explore the ALL PACK range: mailer boxes, rigid gift boxes, food packaging, bags, pouches, labels and more.', alternates: { canonical: '/gallery' } };

export default function GalleryPage() {
  return (
    <main>
      <PageHero kicker="Gallery" title={<>Designed to be <span className="accent">noticed</span></>} description="A look across our range. Tap any piece to see it larger, then make it yours.">
        <a href={quoteLink()} target="_blank" rel="noopener noreferrer" className="btn-dark"><WhatsAppIcon size={18} /> Start your project on WhatsApp</a>
      </PageHero>
      <section className="container-x pt-16">
        <SectionHead kicker="Formats and finishes" title="What comes off our line" sub="Folding cartons, rigid boxes, bakery packs and printed shippers, finished in-house." />
        <ClientWork />
      </section>
      <section className="container-x pb-28 pt-20">
        <SectionHead kicker="Our range" title="Formats we make" />
        <GalleryGrid />
      </section>
    </main>
  );
}
