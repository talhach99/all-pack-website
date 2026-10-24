'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Box, Layers, Palette, Sparkles } from 'lucide-react';
import { whatsappLink } from '@/lib/company';

const ease = [.16, 1, .3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, .6], [1, reduced ? 1 : 0]);
  const words = ['Packaging', 'that', 'sells'];

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_10%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[-260px] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(58,127,192,.18),transparent)]" aria-hidden="true" />

      <motion.div style={{ opacity: fade }} className="container-x relative text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease }} className="chip mx-auto mb-8 !py-2 !pl-2 !pr-4 shadow-card">
          <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Lahore</span>
          Custom packaging &amp; print, made to order
        </motion.p>
        <h1 className="h-display mx-auto max-w-[14ch]">
          {words.map((w, i) => (
            <motion.span key={w} className="inline-block" initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .9, delay: .08 * i, ease }}>
              {w}&nbsp;
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          <motion.span className="accent inline-block pr-2" initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: .3, ease }}>
            before it&rsquo;s opened.
          </motion.span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .45, ease }} className="lead mx-auto mt-7 max-w-xl">
          Boxes, bags, labels and printed packaging, built around your product and finished to make your brand impossible to ignore.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .55, ease }} className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className="btn-dark">Get a free quote <ArrowRight size={17} /></Link>
          <Link href="/products" className="btn-light">Explore products</Link>
          <a href={whatsappLink() || '#'} target="_blank" rel="noopener noreferrer" className="btn-ghost hidden sm:inline-flex">or WhatsApp us</a>
        </motion.div>
      </motion.div>

      <div className="container-x relative mt-10 sm:mt-6">
        <motion.div style={{ scale, y }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: .35, ease }} className="relative mx-auto max-w-[1180px]">
          <img src="/renders/hero.webp" alt="A collection of ALL PACK branded packaging: mailer box, rigid gift box, carton, paper bag and coffee cups" width={1800} height={1300} fetchPriority="high" className="relative z-[1] mx-auto w-full" />
          <FloatChip className="left-[2%] top-[18%] hidden sm:flex" delay={.9} icon={<Box size={16} />} title="Any size" sub="Made to measure" />
          <FloatChip className="right-[4%] top-[8%] hidden sm:flex" delay={1.05} icon={<Palette size={16} />} title="Your brand" sub="Full-colour print" float={2} />
          <FloatChip className="bottom-[16%] left-[6%] hidden md:flex" delay={1.2} icon={<Sparkles size={16} />} title="Foil & soft-touch" sub="Premium finishes" float={1} />
          <FloatChip className="bottom-[10%] right-[3%] hidden md:flex" delay={1.35} icon={<Layers size={16} />} title="22 formats" sub="One supplier" float={3} />
        </motion.div>
      </div>
    </section>
  );
}

function FloatChip({ className, icon, title, sub, delay, float = 0 }: { className: string; icon: React.ReactNode; title: string; sub: string; delay: number; float?: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, delay, ease }} className={`absolute z-[2] ${className}`}>
      <div className="flex animate-float items-center gap-3 rounded-2xl border border-white/80 bg-white/75 py-2.5 pl-2.5 pr-4 shadow-lift backdrop-blur-xl" style={{ animationDelay: `${float * -1.5}s` }}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white">{icon}</span>
        <span className="text-left leading-tight"><span className="block text-sm font-semibold">{title}</span><span className="block text-xs text-muted">{sub}</span></span>
      </div>
    </motion.div>
  );
}
