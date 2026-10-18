"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Moon, ShoppingBag, Sun, Phone, X } from "lucide-react";
import { categories, products } from "@/lib/products";
import { useInquiry, useThemeMode } from "./Providers";
import { Logo } from "./Logo";
import { COMPANY, phoneLink } from "@/lib/company";
const nav=[{text:"About",href:"/about"},{text:"Studio",href:"/studio"},{text:"Gallery",href:"/gallery"},{text:"Insights",href:"/journal"},{text:"Contact",href:"/contact"}];
export function Header(){
 const path=usePathname(); const [scrolled,setScrolled]=useState(false); const [menu,setMenu]=useState(false); const {dark,toggle}=useThemeMode(); const inquiry=useInquiry(); const call=phoneLink();
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>22); f();window.addEventListener('scroll',f,{passive:true});return ()=>window.removeEventListener('scroll',f);},[]);
 useEffect(()=>setMenu(false),[path]);
 return <header className={`sticky top-0 z-50 border-b border-line/60 bg-paper/95 backdrop-blur-xl transition-all duration-300 ${scrolled?'shadow-soft':''}`}>
  <div className={`site-container flex items-center justify-between gap-4 transition-all duration-300 ${scrolled?'h-[70px]':'h-[86px]'}`}>
    <Logo />
    <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
      <div className="group relative"><Link href="/products" className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-skybrand ${path.startsWith('/products')?'text-skybrand':''}`}>Packaging <ChevronDown size={14}/></Link>
      <div className="invisible absolute left-1/2 top-full w-[690px] -translate-x-1/2 translate-y-4 rounded-[1.5rem] border border-line bg-paper p-7 opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100">
       <div className="mb-4 flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[.18em] text-muted">Explore by collection</p><Link href="/products" className="flex items-center gap-1 text-xs font-semibold text-skybrand">View all {products.length} products <ArrowUpRight size={13}/></Link></div>
       <div className="grid grid-cols-2 gap-2">{categories.map(cat=><Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="rounded-xl px-3 py-3 text-sm font-medium text-ink transition-colors hover:bg-soft hover:text-skybrand">{cat} <span className="float-right text-xs text-muted">{products.filter(p=>p.category===cat).length.toString().padStart(2,'0')}</span></Link>)}</div>
       <div className="mt-4 rounded-xl bg-soft p-4 text-xs text-muted">Need something different? <Link href="/studio" className="font-semibold text-skybrand">Build your own packaging concept →</Link></div>
      </div></div>
      {nav.map(x=><Link href={x.href} key={x.href} className={`text-sm font-semibold transition-colors hover:text-skybrand ${path===x.href?'text-skybrand':''}`}>{x.text}</Link>)}
    </nav>
    <div className="flex items-center gap-1 sm:gap-2"><button type="button" onClick={toggle} className="rounded-full p-2.5 hover:bg-soft" aria-label={dark?'Switch to light mode':'Switch to dark mode'}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button><button onClick={inquiry.open} className="relative rounded-full p-2.5 hover:bg-soft" aria-label={`Open inquiry basket, ${inquiry.items.length} items`}><ShoppingBag size={20}/>{inquiry.items.length>0&&<span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#303C85] px-0.5 text-[10px] text-white">{inquiry.items.length}</span>}</button>{call&&<a href={call} aria-label={`Call ALL PACK at ${COMPANY.phone}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-2 text-sm font-bold text-skybrand hover:bg-soft sm:px-3 xl:border xl:border-line xl:bg-paper xl:px-4"><Phone size={18}/><span className="hidden xl:inline">Call Now</span></a>}<Link href="/quote" className="btn-primary !hidden !min-h-10 !px-5 xl:!inline-flex">Get a quote <ArrowUpRight size={15}/></Link><button className="rounded-full p-2.5 lg:hidden" onClick={()=>setMenu(v=>!v)} aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu}>{menu?<X size={23}/>:<Menu size={23}/>}</button></div>
  </div>
  {menu&&<nav aria-label="Mobile navigation" className="max-h-[75vh] overflow-y-auto border-t border-line bg-paper px-5 py-5 lg:hidden"><div className="site-container !px-0 flex flex-col gap-2"><Link href="/products" className="rounded-xl px-4 py-3 font-semibold hover:bg-soft">All packaging products</Link>{nav.map(n=><Link href={n.href} key={n.href} className="rounded-xl px-4 py-3 font-semibold hover:bg-soft">{n.text}</Link>)}{call&&<a href={call} className="btn-outline"><Phone size={17}/> Call Now — {COMPANY.phone}</a>}<Link href="/quote" className="btn-primary mt-2">Get a free quote <ArrowUpRight size={16}/></Link></div></nav>}
 </header>
}
