/** Show Pakistani numbers in international form: 0321-8444590 or 923218444590 -> +92 321 8444590. */
export function formatPhonePK(raw: string): string {
  const d = raw.replace(/\D/g, '');
  const local = /^0\d{10}$/.test(d) ? d.slice(1) : /^92\d{10}$/.test(d) ? d.slice(2) : '';
  return local ? `+92 ${local.slice(0, 3)} ${local.slice(3)}` : raw.trim();
}

/** Brand, email and address from the ALL PACK letterhead; mobile number supplied by the owner. */
export const COMPANY = {
  name: 'ALL PACK',
  tagline: 'The Packaging Experts',
  email: 'allpackprinters@gmail.com',
  address: 'Royal Park, Lakshmi Chowk, Lahore',
  street: 'Royal Park, Lakshmi Chowk',
  city: 'Lahore',
  country: 'Pakistan',
  phone: formatPhonePK(process.env.NEXT_PUBLIC_PHONE || '0321-8444590'),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923218444590').replace(/\D/g, ''),
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.allpack.com.pk').replace(/\/$/, ''),
};

/** Clients who have trusted ALL PACK with their packaging (list and logos supplied by the owner). */
export type Client = { name: string; logo?: string; wide?: boolean };
export const CLIENTS: Client[] = [
  { name: 'Global Pharmaceuticals', logo: '/clients/global-pharmaceuticals.webp', wide: true },
  { name: 'Don Valley Pharmaceuticals', logo: '/clients/don-valley.webp', wide: true },
  { name: 'Citi Bread', logo: '/clients/citi-bread.webp' },
  { name: 'Sun Bread', logo: '/clients/sun-bread.webp' },
  { name: 'Gipsy Cosmetics' },
  { name: "Bunny's", logo: '/clients/bunnys.webp' },
  { name: 'Amson', logo: '/clients/amson.svg' },
  { name: 'Citi Pharma', logo: '/clients/citi-pharma.webp' },
  { name: 'Pak Red Crescent Teaching Hospital', logo: '/clients/red-crescent.webp' },
  { name: 'National Hospital & Medical Centre', logo: '/clients/national-hospital.webp' },
  { name: 'Hoest', logo: '/clients/hoest.webp' },
  { name: 'Meatler', logo: '/clients/meatler.webp' },
  { name: "Max's Chicken & Burgers", logo: '/clients/maxs.webp' },
];

export const QUOTE_MESSAGE = 'Hello ALL PACK, I would like a quotation for custom packaging.';

export function whatsappLink(message: string = QUOTE_MESSAGE): string | null {
  if (!COMPANY.whatsapp) return null;
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Normalise Pakistan local mobile numbers into international tel: links. */
export function phoneLink(): string | null {
  if (!COMPANY.phone) return null;
  const raw = COMPANY.phone.trim();
  const digits = raw.replace(/\D/g, '');
  if (raw.startsWith('+')) return `tel:+${digits}`;
  if (/^0\d{10}$/.test(digits)) return `tel:+92${digits.slice(1)}`;
  if (/^92\d{10}$/.test(digits)) return `tel:+${digits}`;
  return `tel:${digits}`;
}

/** Quotes go to WhatsApp first, email as the fallback. There is no quote form in the main flow. */
export const QUOTE_SUBJECT = 'Packaging quote request';
export function emailLink(subject: string = QUOTE_SUBJECT, body = ''): string {
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
}
export function quoteLink(message?: string): string {
  return whatsappLink(message) || emailLink();
}

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`;
