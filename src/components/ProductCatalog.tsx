"use client";
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowRight, X, Plus, Check } from 'lucide-react';
import { products, categories, materialFilters, useFilters, type Product } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { ProductArt } from './ProductArt';
import { useInquiry } from './Providers';
import Link from 'next/link';
export function ProductCatalog({initialCategory=''}:{initialCategory?:string}){
 const [query,setQuery]=useState('');const [cat,setCat]=useState(initialCategory);const [material,setMaterial]=useState('');const [use,setUse]=useState('');const [preview,setPreview]=useState<Product|null>(null);const inquiry=useInquiry();
 useEffect(()=>{if(!preview)return;const esc=(e:KeyboardEvent)=>{if(e.key==='Escape')setPreview(null)};window.addEventListener('keydown',esc);return ()=>window.removeEventListener('keydown',esc)},[preview]);
 const visible=useMemo(()=>products.filter(p=>(!cat||p.category===cat)&&(!material||p.materials.includes(material))&&(!use||p.uses.includes(use))&&`${p.name} ${p.description} ${p.category} ${p.uses.join(' ')}`.toLowerCase().includes(query.toLowerCase().trim())),[cat,material,use,query]);
 const reset=()=>{setCat('');setMaterial('');setUse('');setQuery('');};
 return <>
 <div className="mb-8 grid gap-4 rounded-[1.5rem] border border-line bg-soft/70 p-4 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:p-5">
  <label className="relative"><span className="sr-only">Search products</span><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"/><input className="input !pl-11" placeholder="Search packaging..." value={query} onChange={e=>setQuery(e.target.value)}/></label>
  <label><span className="sr-only">Filter category</span><select className="input" value={cat} onChange={e=>setCat(e.target.value)}><option value="">All categories</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
  <label><span className="sr-only">Filter material</span><select className="input" value={material} onChange={e=>setMaterial(e.target.value)}><option value="">All materials</option>{materialFilters.map(m=><option key={m}>{m}</option>)}</select></label>
  <label><span className="sr-only">Filter use</span><select className="input" value={use} onChange={e=>setUse(e.target.value)}><option value="">All industries</option>{useFilters.map(u=><option key={u}>{u}</option>)}</select></label>
 </div>
 <div className="mb-7 flex items-center justify-between gap-3 text-sm text-muted"><span className="inline-flex items-center gap-2"><SlidersHorizontal size={16}/> Showing {visible.length} of {products.length} concepts</span>{(cat||material||use||query)&&<button onClick={reset} className="font-semibold text-skybrand hover:underline">Reset filters</button>}</div>
 <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"> <AnimatePresence mode="popLayout">{visible.map(p=><motion.div layout key={p.slug} initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.92}} transition={{duration:.24}}><ProductCard product={p} onQuickView={setPreview}/></motion.div>)}</AnimatePresence></motion.div>
 {visible.length===0&&<div className="rounded-3xl border border-dashed border-line py-24 text-center"><h3 className="text-xl font-semibold">No matching products</h3><p className="mt-2 text-muted">Try another search or clear the filters.</p><button onClick={reset} className="btn-outline mt-5">Reset filters</button></div>}
 <AnimatePresence>{preview&&<motion.div className="fixed inset-0 z-[95] grid place-items-center overflow-y-auto bg-[#09132c]/65 p-4 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)setPreview(null)}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div role="dialog" aria-modal="true" aria-label={`${preview.name} quick view`} className="relative grid w-full max-w-3xl overflow-hidden rounded-[1.8rem] bg-paper shadow-2xl md:grid-cols-2" initial={{scale:.94,y:20}} animate={{scale:1,y:0}} exit={{scale:.96,y:20}}><button onClick={()=>setPreview(null)} aria-label="Close quick view" className="absolute right-4 top-4 z-10 rounded-full bg-paper p-2 shadow-soft"><X size={19}/></button><ProductArt name={preview.name} model={preview.model} hue={preview.hue} className="min-h-[310px]"/><div className="p-8"><p className="eyebrow">{preview.category}</p><h2 className="mb-4 text-2xl font-bold">{preview.name}</h2><p className="mb-5 text-sm leading-7 text-muted">{preview.description}</p><p className="mb-2 text-xs font-bold uppercase tracking-wider">Popular materials</p><p className="mb-5 text-sm text-muted">{preview.materials.join(', ')}</p><p className="mb-5 text-xs text-muted">Minimum order: confirmed by inquiry</p><button onClick={()=>{inquiry.add(preview.slug);setPreview(null)}} className="btn-primary w-full">{inquiry.items.includes(preview.slug)?<Check size={16}/>:<Plus size={16}/>} {inquiry.items.includes(preview.slug)?'Already in basket':'Add to inquiry'}</button><Link href={`/products/${preview.slug}`} className="btn-outline mt-3 w-full" onClick={()=>setPreview(null)}>Full product details <ArrowRight size={16}/></Link></div></motion.div></motion.div>}</AnimatePresence>
 </>;
}
