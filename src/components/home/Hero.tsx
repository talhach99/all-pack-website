'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Box, Layers, Palette, Sparkles } from 'lucide-react';
import { whatsappLink } from '@/lib/company';
import { categories, products } from '@/lib/products';
import { WhatsAppIcon } from '../FloatingContact';

const ease = [.16, 1, .3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const lines = [<>Packaging</>, <>that sells <em className="accent">before</em></>, <>it&rsquo;s opened.</>];

  return (
    <section ref={ref} className="grain relative overflow-hidden pt-32 sm:pt-40">
      <div className="pointer-events-none absolute -right-64 -top-56 h-[900px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(180,138,79,.2),transparent_70%)]" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr]">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease }} className="kicker">
              Lahore · Custom packaging &amp; print, made to order
            </motion.p>
            <h1 className="h-display mt-7 !text-[clamp(3.2rem,7.4vw,7rem)]">
              {lines.map((l, i) => (
                <span key={i} className="block overflow-hidden pb-[.06em]">
                  <motion.span className="inline-block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: .1 + i * .12, ease }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .5, ease }} className="lead mt-8 max-w-[52ch]">
              Boxes, bags, labels and printed packaging, built around your product and finished to make your brand impossible to ignore.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .6, ease }} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={16} /></Link>
              <Link href="/products" className="btn-light">Explore products</Link>
              <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[15px] font-semibold text-muted transition-colors hover:text-ink">
                <span className="text-[#1F9D55]"><WhatsAppIcon size={18} /></span> or WhatsApp us
              </a>
            </motion.div>
          </div>

          <motion.div style={{ y }} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: .25, ease }} className="relative mx-auto w-full max-w-[620px]">
            <div className="relative aspect-[1/1.02] overflow-hidden rounded-[28px] rounded-br-[200px] bg-[linear-gradient(160deg,#FBF8F2_0%,#ECE5D6_100%)] shadow-plate">
              <img src="/renders/hero.webp" alt="A collection of ALL PACK branded packaging: mailer box, rigid gift box, carton, paper bag and coffee cups" width={1800} height={1300} fetchPriority="high" className="h-full w-full scale-[1.04] animate-float object-cover mix-blend-multiply" />
            </div>
            <FloatChip className="-left-3 top-[14%] sm:-left-8" delay={.8} icon={<Box size={17} />} title="Any size" sub="Made to measure" />
            <FloatChip className="-right-2 top-[5%] sm:-right-6" delay={.95} icon={<Palette size={17} />} title="Your brand" sub="Full-colour print" />
            <FloatChip className="-right-4 bottom-[24%] hidden sm:flex sm:-right-8" delay={1.1} icon={<Sparkles size={17} />} title="Foil & soft-touch" sub="Premium finishes" />
            <FloatChip className="-bottom-5 left-[6%]" delay={1.25} icon={<Layers size={17} />} title={`${products.length} formats`} sub="One supplier" />
          </motion.div>
        </div>

        <div className="mt-24 grid border-t border-line sm:mt-28 sm:grid-cols-3">
          {[
            [String(products.length), 'packaging formats, one supplier'],
            [String(categories.length).padStart(2, '0'), 'collections, from carton to sticker'],
            ['1:1', 'talk directly to the team on phone or WhatsApp'],
          ].map(([n, t], i) => (
            <div key={t} className={`flex items-baseline gap-5 py-7 ${i ? 'border-t border-line sm:border-l sm:border-t-0 sm:pl-8' : ''}`}>
              <span className="font-display text-5xl font-light leading-none">{n}</span>
              <span className="max-w-[22ch] text-sm text-muted">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatChip({ className, icon, title, sub, delay }: { className: string; icon: React.ReactNode; title: string; sub: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay, ease }} className={`absolute z-[2] flex ${className}`}>
      <div className="flex items-center gap-3 rounded-2xl bg-white/80 py-2.5 pl-2.5 pr-4 shadow-lift backdrop-blur-xl">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-brass-light sm:h-10 sm:w-10">{icon}</span>
        <span className="text-left leading-tight"><span className="block text-[13px] font-bold sm:text-sm">{title}</span><span className="block text-xs text-muted">{sub}</span></span>
      </div>
    </motion.div>
  );
}
