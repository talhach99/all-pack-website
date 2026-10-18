"use client";
import Link from "next/link";
import { ArrowUpRight, Eye, Plus, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useInquiry } from "./Providers";
import { ProductArt } from "./ProductArt";
export function ProductCard({product,onQuickView}:{product:Product;onQuickView?:(product:Product)=>void}){
 const inquiry=useInquiry();const selected=inquiry.items.includes(product.slug);const reduced=useReducedMotion();
 return <motion.article whileHover={reduced?undefined:{y:-7}} transition={{duration:.26}} className="group surface-card flex h-full flex-col overflow-hidden">
  <Link href={`/products/${product.slug}`} className="block aspect-[1.25] overflow-hidden" aria-label={`View ${product.name}`}><div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.035]"><ProductArt model={product.model} hue={product.hue} name={product.name} className="h-full w-full"/></div></Link>
  <div className="flex flex-1 flex-col p-5 sm:p-6"><div className="mb-2 flex items-start justify-between gap-2"><span className="text-[10px] font-semibold uppercase tracking-[.15em] text-skybrand">{product.category}</span>{product.featured&&<span className="rounded-full bg-soft px-2 py-1 text-[10px] font-semibold text-muted">FEATURED</span>}</div><Link href={`/products/${product.slug}`} className="text-[1.18rem] font-bold leading-snug tracking-tight transition-colors hover:text-skybrand">{product.name}</Link><p className="mb-5 mt-3 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>
   <div className="mt-auto flex items-center gap-2 border-t border-line pt-4"><button type="button" onClick={()=>inquiry.add(product.slug)} className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold transition-colors ${selected?'bg-[#E5F3EC] text-[#177B4E]':'bg-[#303C85] text-white hover:bg-[#26377c]'}`}>{selected?<><Check size={15}/> Added</>:<><Plus size={15}/> Add to inquiry</>}</button>{onQuickView?<button type="button" aria-label={`Quick view ${product.name}`} onClick={()=>onQuickView(product)} className="rounded-full border border-line p-2.5 text-ink hover:bg-soft"><Eye size={16}/></button>:<Link href={`/products/${product.slug}`} aria-label={`Details for ${product.name}`} className="rounded-full border border-line p-2.5 hover:bg-soft"><ArrowUpRight size={16}/></Link>}</div>
  </div>
 </motion.article>
}
