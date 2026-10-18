"use client";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, CheckCircle2, PackageOpen, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { products } from '@/lib/products';
import { COMPANY, phoneLink, whatsappLink, QUOTE_MESSAGE } from '@/lib/company';
const BoxScene=dynamic(()=>import('./BoxScene'),{ssr:false,loading:()=> <div className="h-full w-full animate-pulse rounded-full bg-[#bed4f5]/25"/>});
export function Hero(){const reduced=useReducedMotion();const call=phoneLink();const chat=whatsappLink(QUOTE_MESSAGE);return <section className="hero-gradient relative isolate min-h-[690px] overflow-hidden"><div aria-hidden="true" className="mesh-grid pointer-events-none absolute inset-0 opacity-65"/>
 <div className="site-container relative grid min-h-[690px] items-center gap-8 pb-24 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:py-10">
  <motion.div initial={reduced?false:{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.75}} className="relative z-10 lg:pb-8"><p className="eyebrow"><span className="h-2 w-2 rounded-full bg-[#3E8AC4]"/> LAHORE-BASED PRINTING & PACKAGING</p><h1 className="display max-w-[720px]">Every great product deserves <span className="gradient-text">a great first impression.</span></h1><p className="lead mt-8 max-w-[550px]">From your first sketch to the finished box, explore packaging that protects your product and presents your brand beautifully.</p>
  <div className="mt-9 flex flex-wrap items-center gap-3"><Link href="/quote" className="btn-primary">Get a free quote <ArrowUpRight size={18}/></Link><Link href="/products" className="btn-outline">Explore packaging <PackageOpen size={17}/></Link></div>
  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-[#2C428A] dark:text-[#A9CEFA]">
    {call && <a href={call} className="inline-flex items-center gap-2 hover:underline"><Phone size={17}/> Call Now: {COMPANY.phone}</a>}
    {chat && <a href={chat} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><MessageCircle size={17}/> Chat on WhatsApp <ArrowUpRight size={14}/></a>}
  </div>
  <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted"><span className="flex items-center gap-2"><CheckCircle2 className="text-skybrand" size={16}/> Custom sizes & styles</span><span className="flex items-center gap-2"><CheckCircle2 className="text-skybrand" size={16}/> Print & finishing choices</span><span className="flex items-center gap-2"><CheckCircle2 className="text-skybrand" size={16}/> Quote-led ordering</span></div>
  </motion.div>
  <div className="relative h-[390px] min-w-0 sm:h-[470px] lg:h-[610px]"><div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#eff6ff]/75 to-[#b7cefa]/50 blur-2xl"/><div className="absolute inset-0"><BoxScene/></div>
   <motion.div animate={reduced?{}:{y:[0,-10,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} className="absolute left-0 top-[12%] rounded-2xl border border-white/60 bg-white/80 p-3.5 shadow-card backdrop-blur-md sm:left-1 sm:p-4"><span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#4563A2]"><Sparkles size={13}/> Make it yours</span><p className="text-xs font-semibold text-[#1d315c] sm:text-sm">Designed around your brand</p></motion.div>
   <motion.div animate={reduced?{}:{y:[0,10,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut',delay:.5}} className="absolute bottom-[13%] right-1 rounded-2xl border border-white/70 bg-white/85 px-5 py-3 shadow-card backdrop-blur-md"><p className="text-[10px] uppercase tracking-[.2em] text-[#5d7394]">Packaging concepts</p><p className="mt-1 text-2xl font-black text-[#303C85]">{products.length} <span className="text-sm font-medium">and growing</span></p></motion.div>
  </div>
 </div>
 <Link href="#collections" aria-label="Scroll to product collections" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-skybrand"><ChevronDown size={25}/></Link>
 </section>}
