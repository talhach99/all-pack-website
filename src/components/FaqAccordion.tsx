'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export const questions = [
 { question:'Can I order packaging with my own logo and design?', answer:'Yes, you can request branded packaging, custom colours and print finishes. Share your artwork and packaging requirements to discuss the appropriate production options.' },
 { question:'What is the minimum order quantity?', answer:'Minimum quantities vary by product, material, printing process and dimensions. Contact ALL PACK with your required packaging style and quantity to confirm what is available.' },
 { question:'Can you make custom box sizes?', answer:'You can request made-to-measure dimensions. Include length, width and height along with the product weight and intended use; the team can review what can be manufactured.' },
 { question:'How long will my order take?', answer:'Production and delivery timing depends on product type, order volume, artwork approval and destination. ALL PACK will need to confirm your project details before giving an accurate lead time.' },
 { question:'Do you offer food packaging?', answer:'The website includes illustrative concepts for pizza boxes, burger boxes, bakery boxes and takeaway containers. Ask the team to confirm the available materials and their suitability for your particular food-contact application.' },
 { question:'Can I upload a logo or artwork?', answer:'Yes. The quote form accepts PNG, JPG or PDF artwork up to 4 MB. For print production, a vector PDF or other approved high-resolution design file may be requested later.' },
 { question:'Are the design studio prices final?', answer:'No. The studio displays hypothetical planning ranges, not actual ALL PACK pricing. All costs, stock availability and specifications must be formally quoted by ALL PACK.' },
 { question:'Can I request several products at once?', answer:'Yes. Add different products to your inquiry basket, then send a single combined quote request specifying approximate quantities and sizes for each one.' },
 { question:'Does ALL PACK deliver outside Lahore?', answer:'Delivery locations, shipping charges and transit times are not confirmed here. Please include your city and desired delivery date so the team can advise.' },
 { question:'Where is the ALL PACK office?', answer:'Office No. 33, Ali Arcade, 7 Royal Park, Lakshmi Chowk, Lahore, Pakistan. Email allpackprinters@gmail.com before visiting to confirm hours and availability.' },
];
export function FaqAccordion(){const [open,setOpen]=useState<number|null>(0);const reduced=useReducedMotion();return <div className="divide-y divide-line overflow-hidden rounded-[1.7rem] border border-line bg-paper shadow-soft">
{questions.map((item,i)=><section key={item.question} className="px-5 sm:px-8"><h2><button type="button" className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-semibold transition-colors hover:text-skybrand sm:text-lg" aria-expanded={open===i} aria-controls={`faq-answer-${i}`} onClick={()=>setOpen(v=>v===i?null:i)}><span>{item.question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft text-skybrand">{open===i?<Minus size={18}/>:<Plus size={18}/>}</span></button></h2><AnimatePresence initial={false}>{open===i&&<motion.div id={`faq-answer-${i}`} key="answer" initial={reduced?false:{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={reduced?undefined:{height:0,opacity:0}} transition={{duration:.25}} className="overflow-hidden"><p className="max-w-3xl pb-7 pr-7 text-sm leading-7 text-muted sm:text-base">{item.answer}</p></motion.div>}</AnimatePresence></section>)}
</div>}
