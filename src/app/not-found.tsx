/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiteChrome } from '@/components/SiteChrome';

export default function NotFound() {
  return (
    <SiteChrome><main className="container-x flex min-h-[78vh] flex-col items-center justify-center py-20 text-center">
      <img src="/renders/mailer-boxes.webp" alt="" className="w-64" />
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="h-section mt-4">This page could not be found</h1>
      <p className="lead mt-4 max-w-md">The page may have moved when we reorganised the site. Our full product range is now on one page.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/products" className="btn-primary">View the product range <ArrowRight size={16} /></Link><Link href="/" className="btn-outline">Return to the homepage</Link></div>
    </main></SiteChrome>
  );
}
