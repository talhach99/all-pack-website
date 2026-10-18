import type {Metadata} from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageIntro } from '@/components/PageIntro';
import { FaqAccordion } from '@/components/FaqAccordion';
export const metadata:Metadata={title:'Frequently Asked Questions',description:'Questions about ALL PACK custom printed boxes, order quantities, packaging design, delivery and quotations.',alternates:{canonical:'/faq'}};
export default function FAQPage(){return <main><PageIntro eyebrow="HELPFUL ANSWERS" title={<>The details, <span className="gradient-text">made simple.</span></>} description="Common questions about custom boxes, printing, artwork and starting an enquiry."/><section className="site-container section-pad"><div className="mx-auto max-w-4xl"><FaqAccordion/><div className="mt-12 rounded-[1.7rem] bg-soft p-8 text-center sm:p-12"><h2 className="text-2xl font-bold">Have a different question?</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted">We'd be happy to review your dimensions, material requirements and finishing ideas.</p><Link className="btn-primary mt-6" href="/contact">Contact ALL PACK <ArrowUpRight size={17}/></Link></div></div></section></main>}
