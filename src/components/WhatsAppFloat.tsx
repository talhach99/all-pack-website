import { MessageCircle, Phone } from 'lucide-react';
import { COMPANY, phoneLink, whatsappLink, QUOTE_MESSAGE } from '@/lib/company';

/** Fixed, accessible call and WhatsApp entry points on every page. */
export function WhatsAppFloat() {
  const call = phoneLink();
  const chat = whatsappLink(QUOTE_MESSAGE);
  if (!call && !chat) return null;
  return <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 sm:bottom-6 sm:right-7" aria-label="Contact ALL PACK">
    {call && <a href={call} aria-label={`Call ALL PACK at ${COMPANY.phone}`} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#BCCBE8] bg-white px-4 text-sm font-bold text-[#293C81] shadow-[0_12px_36px_rgba(30,53,103,.22)] transition hover:-translate-y-1 hover:bg-[#eff5ff] focus-visible:outline-offset-4 sm:min-h-14 sm:px-5">
      <Phone size={18} aria-hidden="true"/><span>Call Now</span>
    </a>}
    {chat && <a href={chat} target="_blank" rel="noopener noreferrer" aria-label="Chat with ALL PACK on WhatsApp" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#138B50] px-4 text-sm font-bold text-white shadow-[0_12px_36px_rgba(17,116,68,.29)] transition hover:-translate-y-1 hover:bg-[#087B44] focus-visible:outline-offset-4 sm:min-h-14 sm:px-5">
      <MessageCircle size={19} aria-hidden="true"/><span>WhatsApp</span>
    </a>}
  </div>;
}
