'use client';
import { Check, Plus } from 'lucide-react';
import { useInquiry } from './Providers';

export function AddToQuoteButton({ slug, className = 'btn-light' }: { slug: string; className?: string }) {
  const inquiry = useInquiry();
  const has = inquiry.has(slug);
  return (
    <button type="button" onClick={() => (has ? inquiry.open() : inquiry.add(slug))} className={className} aria-pressed={has}>
      {has ? <><Check size={17} /> In your quote list</> : <><Plus size={17} /> Add to quote list</>}
    </button>
  );
}
