import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/renders/shipping.webp" alt="" className="w-72 opacity-90" />
      <p className="kicker mt-6">Error 404</p>
      <h1 className="h-section mt-4">This box is <span className="accent">empty.</span></h1>
      <p className="lead mt-4 max-w-md">The page you&apos;re looking for has moved or never existed.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="btn-dark">Back home <ArrowRight size={16} /></Link><Link href="/products" className="btn-light">Browse products</Link></div>
    </main>
  );
}
