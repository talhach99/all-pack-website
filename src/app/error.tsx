'use client';
import Link from 'next/link';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="kicker">Something went wrong</p>
      <h1 className="h-section mt-4">We dropped that one.</h1>
      <p className="lead mt-4 max-w-md">Please try again. If it keeps happening, message us on WhatsApp.</p>
      <div className="mt-8 flex gap-3"><button onClick={reset} className="btn-dark">Try again</button><Link href="/" className="btn-light">Home</Link></div>
    </main>
  );
}
