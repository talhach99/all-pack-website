/** Brand, email and address from the ALL PACK letterhead; mobile number supplied by the owner. */
export const COMPANY = {
  name: 'ALL PACK',
  tagline: 'The Packaging Experts',
  email: 'allpackprinters@gmail.com',
  address: 'Office No. 33, Ali Arcade, 7 Royal Park, Lakshmi Chowk, Lahore, Pakistan',
  street: 'Office No. 33, Ali Arcade, 7 Royal Park, Lakshmi Chowk',
  city: 'Lahore',
  country: 'Pakistan',
  phone: process.env.NEXT_PUBLIC_PHONE || '0321-8444590',
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923218444590').replace(/\D/g, ''),
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.allpack.com.pk').replace(/\/$/, ''),
};

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

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`;
