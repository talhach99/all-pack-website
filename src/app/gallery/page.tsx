import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { GalleryGrid } from '@/components/GalleryGrid';

export const metadata: Metadata = { title: 'Gallery', description: 'Explore the ALL PACK range: mailer boxes, rigid gift boxes, food packaging, bags, pouches, labels and more.', alternates: { canonical: '/gallery' } };

export default function GalleryPage() {
  return (
    <main>
      <PageHero kicker="Gallery" title={<>Designed to be <span className="accent">noticed.</span></>} description="A look across our range. Tap any piece to see it larger, then make it yours.">
        <Link href="/quote" className="btn-dark">Start your project <ArrowRight size={16} /></Link>
      </PageHero>
      <section className="container-x pb-28"><GalleryGrid /></section>
    </main>
  );
}
