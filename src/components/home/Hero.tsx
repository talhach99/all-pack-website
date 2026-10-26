'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { whatsappLink } from '@/lib/company';
import { WhatsAppIcon } from '../FloatingContact';

const ease = [.16, 1, .3, 1] as const;

export function Hero() {
  const lines = [<>Packaging that</>, <>sells <em className="accent">before</em></>, <>it&rsquo;s opened.</>];
  return (
    <section className="relative isolate overflow-hidden bg-[#ECE6DA]">
      {/* photograph: full-bleed on desktop, below the copy on mobile */}
      <motion.div initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease }} className="absolute inset-0 -z-10 hidden lg:block">
        <img src="/photos/hero.webp" srcSet="/photos/hero-1200.webp 1200w, /photos/hero.webp 2400w" sizes="100vw" alt="ALL PACK custom packaging: an open printed mailer box, a foil-stamped rigid gift box, a kraft shopping bag, a cosmetic carton and branded paper cups" className="h-full w-full object-cover object-[70%_50%]" fetchPriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#ECE6DA_0%,rgba(236,230,218,.92)_28%,rgba(236,230,218,0)_52%)]" />
      </motion.div>

      <div className="container-x grid min-h-[min(86vh,820px)] items-center py-16 lg:py-24">
        <div className="max-w-[600px]">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease }} className="kicker">Custom packaging &amp; printing · Lahore</motion.p>
          <h1 className="h-display mt-7 !text-[clamp(3rem,6.6vw,6.4rem)]">
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[.08em]">
                <motion.span className="inline-block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: .12 + i * .12, ease }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .5, ease }} className="lead mt-8 max-w-[46ch] !text-ink/70">
            Boxes, bags, labels and printed packaging, built around your product and finished to make your brand impossible to ignore.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .6, ease }} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={16} /></Link>
            <Link href="/products" className="btn-light !bg-paper-light">Explore products</Link>
            <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink/70 transition-colors hover:text-ink">
              <span className="text-[#1F9D55]"><WhatsAppIcon size={18} /></span> or WhatsApp us
            </a>
          </motion.div>
        </div>
      </div>

      <div className="aspect-[4/3] overflow-hidden lg:hidden">
        <img src="/photos/hero-1200.webp" alt="" aria-hidden="true" className="h-full w-full object-cover object-[78%_50%]" />
      </div>
    </section>
  );
}
