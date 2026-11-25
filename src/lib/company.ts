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
  address: 'Lahore, Pakistan',
  street: 'Royal Park, Lakshmi Chowk',
  city: 'Lahore',
  country: 'Pakistan',
  phone: formatPhonePK(process.env.NEXT_PUBLIC_PHONE || '0321-8444590'),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923218444590').replace(/\D/g, ''),
  /** Boston office (USA): shown as +1 313 729 1534, WhatsApp link uses the digits. */
  usPhone: '+1 313 729 1534',
  usWhatsapp: '13137291534',
  usAddress: 'Boston, Massachusetts',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://allpackpk.com').replace(/\/$/, ''),
};

/** Clients who have trusted ALL PACK with their packaging (list and logos supplied by the owner). */
export type Client = { name: string; logo?: string; wide?: boolean };
export const CLIENTS: Client[] = [
  { name: 'Global Pharmaceuticals', logo: '/clients/global-pharmaceuticals.webp', wide: true },
  { name: 'Don Valley Pharmaceuticals', logo: '/clients/don-valley.webp', wide: true },
  { name: 'Citi Bread', logo: '/clients/citi-bread.webp' },
  { name: 'Sun Bread', logo: '/clients/sun-bread.webp' },
  { name: "Bunny's", logo: '/clients/bunnys.webp' },
  { name: 'Amson', logo: '/clients/amson.svg' },
  { name: 'Citi Pharma', logo: '/clients/citi-pharma.webp' },
  { name: 'Bio-Labs', logo: '/clients/bio-labs.webp', wide: true },
  { name: 'Dyson', logo: '/clients/dyson.webp' },
  { name: 'McOlson Research Laboratories', logo: '/clients/mcolson.webp', wide: true },
  { name: 'Pak Red Crescent Teaching Hospital', logo: '/clients/red-crescent.webp' },
  { name: 'National Hospital & Medical Centre', logo: '/clients/national-hospital.webp' },
  { name: 'Doctors Hospital & Medical Centre', logo: '/clients/doctors-hospital.webp', wide: true },
  { name: 'Hoest', logo: '/clients/hoest.webp' },
  { name: 'Meatler', logo: '/clients/meatler.webp' },
  { name: "Max's Chicken & Burgers", logo: '/clients/maxs.webp' },
];

export const QUOTE_MESSAGE = 'Hello ALL PACK, I would like a quotation for custom packaging.';
export const QUOTE_SUBJECT = 'Packaging quote request';

export type Company = typeof COMPANY;

/** Contact links built from the company details, so changes made in the admin panel reach every button. */
export function makeLinks(company: Company) {
  const whatsappLink = (message: string = QUOTE_MESSAGE): string | null =>
    company.whatsapp ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}` : null;
  const whatsappUS = (message: string = QUOTE_MESSAGE): string | null =>
    company.usWhatsapp ? `https://wa.me/${company.usWhatsapp}?text=${encodeURIComponent(message)}` : null;
  const phoneLink = (): string | null => {
    if (!company.phone) return null;
    const raw = company.phone.trim();
    const digits = raw.replace(/\D/g, '');
    if (raw.startsWith('+')) return `tel:+${digits}`;
    if (/^0\d{10}$/.test(digits)) return `tel:+92${digits.slice(1)}`;
    if (/^92\d{10}$/.test(digits)) return `tel:+${digits}`;
    return `tel:${digits}`;
  };
  const emailLink = (subject: string = QUOTE_SUBJECT, body = ''): string =>
    `mailto:${company.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
  const quoteLink = (message?: string): string => whatsappLink(message) || emailLink();
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`;
  return { whatsappLink, whatsappUS, phoneLink, emailLink, quoteLink, mapsLink, mapsEmbed };
}
export type Links = ReturnType<typeof makeLinks>;
