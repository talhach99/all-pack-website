'use client';
import { useEffect, useState } from 'react';

/** "On this page" list for long guides. Highlights the section currently in view. */
export function ArticleToc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map(i => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: '-120px 0px -60% 0px' });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <ol className="grid gap-0.5 border-l border-[#E2DCCD]">
      {items.map(i => {
        const on = i.id === active;
        return (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={on ? 'location' : undefined} className={`-ml-px block border-l-2 py-1.5 pl-4 text-[14px] leading-snug transition-colors ${on ? 'border-[#2B43F0] font-semibold text-[#0B0D12]' : 'border-transparent text-[#6E685C] hover:text-[#0B0D12]'}`}>{i.text}</a>
          </li>
        );
      })}
    </ol>
  );
}
