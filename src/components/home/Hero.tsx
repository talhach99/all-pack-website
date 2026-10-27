/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { products } from '@/lib/products';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#ECE6DA]">
      <div className="absolute inset-0 -z-10 hidden lg:block">
        <img src="/photos/hero.webp" srcSet="/photos/hero-1200.webp 1200w, /photos/hero.webp 2400w" sizes="100vw" alt="ALL PACK custom packaging: printed mailer box, foil-stamped rigid gift box, kraft shopping bag and branded paper cups" className="h-full w-full object-cover object-[72%_50%]" fetchPriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#ECE6DA_0%,rgba(236,230,218,.94)_30%,rgba(236,230,218,0)_55%)]" />
      </div>
      <div className="container-x grid min-h-[560px] items-center py-14 lg:min-h-[600px] lg:py-20">
        <div className="max-w-[560px]">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[12.5px] font-bold text-brand shadow-sm">Lahore&apos;s custom packaging &amp; printing partner</p>
          <h1 className="mt-5 text-[clamp(2.4rem,4.8vw,3.9rem)] font-extrabold leading-[1.05] tracking-[-.035em] text-ink">Custom boxes &amp; packaging that sells before it&rsquo;s opened.</h1>
          <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink/70">Boxes, bags, labels and printed packaging, made to measure and finished to make your brand impossible to ignore. Everything you need, all in one place.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className="btn-dark !min-h-[3.25rem] !px-7 text-[15.5px]">Request a Quote <ArrowRight size={17} /></Link>
            <Link href="/products" className="btn-light !min-h-[3.25rem] !px-7 text-[15.5px]">Choose Packaging Style</Link>
          </div>
          <ul className="mt-8 grid gap-2 text-[14.5px] font-semibold text-ink/80 sm:grid-cols-2">
            {['Any size, made to measure', 'Full-colour print & foil', `${products.length} packaging formats`, 'Free, no-obligation quotes'].map(t => <li key={t} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-white"><Check size={12} strokeWidth={3} /></span>{t}</li>)}
          </ul>
        </div>
      </div>
      <div className="aspect-[4/3] overflow-hidden lg:hidden"><img src="/photos/hero-1200.webp" alt="" aria-hidden="true" className="h-full w-full object-cover object-[78%_50%]" /></div>
    </section>
  );
}
