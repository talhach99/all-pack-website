'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { phoneLink, whatsappLink } from '@/lib/company';

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42a9.4 9.4 0 0 1 9.42 9.43c0 5.2-4.23 9.42-9.42 9.42m8.02-17.45A11.27 11.27 0 0 0 12.05.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.95 1.52 5.66L.62 23.62l6.02-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.31-8.01" />
    </svg>
  );
}

/** WhatsApp bubble on desktop; sticky action bar on mobile. */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const path = usePathname();
  const wa = whatsappLink();
  const call = phoneLink();
  useEffect(() => {
    const f = () => setVisible(window.scrollY > 400);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  if (!wa) return null;
  return (
    <>
      <a
        href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat with ALL PACK on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-2.5 rounded-full bg-[#1F9D55] pl-4 pr-5 text-white shadow-[0_18px_40px_-14px_rgba(31,157,85,.75)] transition-transform duration-300 hover:-translate-y-0.5 sm:flex"
      >
        <WhatsAppIcon />
        <span className="whitespace-nowrap text-sm font-semibold">WhatsApp us</span>
      </a>
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 p-3 backdrop-blur-xl transition-transform duration-300 sm:hidden ${visible && path !== '/quote' ? 'translate-y-0' : 'translate-y-full'}`} style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
        <div className="grid grid-cols-[auto_auto_1fr] gap-2">
          {call && <a href={call} aria-label="Call ALL PACK" className="grid h-12 w-12 place-items-center rounded-full border border-line"><Phone size={19} /></a>}
          <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ALL PACK" className="grid h-12 w-12 place-items-center rounded-full bg-[#1F9D55] text-white"><WhatsAppIcon size={20} /></a>
          <Link href="/quote" className="btn-dark">Get a free quote</Link>
        </div>
      </div>
    </>
  );
}
