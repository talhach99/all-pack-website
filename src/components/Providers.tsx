"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/products";
import { CursorAccent } from "./CursorAccent";

const ThemeContext = createContext({ dark:false, toggle: () => {} });
export function useThemeMode(){ return useContext(ThemeContext); }
const InquiryContext = createContext<{items:string[],add:(slug:string)=>void,remove:(slug:string)=>void,clear:()=>void,open:()=>void} | null>(null);
export function useInquiry(){const v=useContext(InquiryContext); if(!v) throw new Error('Inquiry provider unavailable');return v;}

export function Providers({children}:{children:React.ReactNode}){
  const [dark,setDark]=useState(false);
  const [items,setItems]=useState<string[]>([]);
  const [drawer,setDrawer]=useState(false);
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{
    setDark(localStorage.getItem('allpack-theme')==='dark');
    try { const saved=JSON.parse(localStorage.getItem('allpack-inquiry-v1')||'[]'); if(Array.isArray(saved)) setItems(saved.filter(x=>typeof x==='string'&&products.some(p=>p.slug===x))); }catch{}
    setHydrated(true);
  },[]);
  useEffect(()=>{if(hydrated){document.documentElement.classList.toggle('dark',dark);localStorage.setItem('allpack-theme',dark?'dark':'light');}},[dark,hydrated]);
  useEffect(()=>{if(hydrated) localStorage.setItem('allpack-inquiry-v1',JSON.stringify(items));},[items,hydrated]);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis=new Lenis({duration:1.15, smoothWheel:true, wheelMultiplier:.9});
    const tick=(time:number)=>lenis.raf(time*1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    lenis.on('scroll',ScrollTrigger.update);
    return ()=>{gsap.ticker.remove(tick);lenis.destroy();};
  },[]);
  useEffect(()=>{
    if(!drawer) return;
    const onEscape=(e:KeyboardEvent)=>{if(e.key==='Escape') setDrawer(false);};
    document.addEventListener('keydown',onEscape);
    return ()=>document.removeEventListener('keydown',onEscape);
  },[drawer]);
  const add=useCallback((slug:string)=>{setItems(v=>v.includes(slug)?v:[...v,slug]);setDrawer(true);},[]);
  const remove=useCallback((slug:string)=>setItems(v=>v.filter(s=>s!==slug)),[]);
  const clear=useCallback(()=>setItems([]),[]);
  const inquiry=useMemo(()=>({items,add,remove,clear,open:()=>setDrawer(true)}),[items,add,remove,clear]);
  return <ThemeContext.Provider value={{dark,toggle:()=>setDark(v=>!v)}}><InquiryContext.Provider value={inquiry}>
    {children}
    <CursorAccent/>
    <AnimatePresence>{drawer&&<>
      <motion.div className="fixed inset-0 z-[89] bg-[#0D1530]/50 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDrawer(false)} aria-hidden="true" />
      <motion.aside role="dialog" aria-modal="true" aria-label="Quote inquiry basket" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:29,stiffness:260}} className="fixed bottom-0 right-0 top-0 z-[90] flex w-full max-w-md flex-col bg-paper p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-line pb-5"><div><p className="eyebrow !mb-1">YOUR SHORTLIST</p><h2 className="text-2xl font-bold">Inquiry basket <span className="text-muted">({items.length})</span></h2></div><button className="rounded-full p-2 hover:bg-soft" onClick={()=>setDrawer(false)} aria-label="Close basket"><X size={21}/></button></div>
        <div className="flex-1 overflow-y-auto py-5">{items.length===0?<div className="flex h-full flex-col items-center justify-center gap-3 text-center"><ShoppingBag className="text-skybrand" size={43}/><h3 className="text-xl font-semibold">Your shortlist is empty</h3><p className="text-sm text-muted">Add products to request one combined quotation.</p><Link href="/products" className="btn-primary mt-2" onClick={()=>setDrawer(false)}>Explore products <ArrowRight size={16}/></Link></div>:<div className="space-y-3">{items.map(slug=>{const p=products.find(v=>v.slug===slug); if(!p)return null;return <div key={slug} className="flex items-center justify-between gap-3 rounded-xl border border-line p-4"><div><p className="font-semibold">{p.name}</p><p className="mt-1 text-xs text-muted">{p.category}</p></div><button aria-label={`Remove ${p.name}`} onClick={()=>remove(slug)} className="rounded-full p-2 text-muted hover:bg-soft"><Trash2 size={17}/></button></div>})}</div>}</div>
        {items.length>0&&<div className="space-y-3 border-t border-line pt-5"><Link href="/quote" className="btn-primary w-full" onClick={()=>setDrawer(false)}>Request a combined quote <ArrowRight size={16}/></Link><button className="btn-outline w-full" onClick={clear}>Clear basket</button><div className="flex items-center gap-2 text-xs text-muted"><Check size={14}/> No payment required. Prices confirmed after review.</div></div>}
      </motion.aside>
    </>}</AnimatePresence>
  </InquiryContext.Provider></ThemeContext.Provider>;
}
