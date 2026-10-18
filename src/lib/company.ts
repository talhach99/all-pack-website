/** Brand, email and address from ALL PACK letterhead; mobile number supplied separately by owner.
 * Unverified social links and historical business claims remain blank. */
export const COMPANY = {
  name: "ALL PACK",
  tagline: "The Packaging Experts",
  brandPromise: "Made to protect. Designed to impress.", // proposed marketing copy, not an official historical claim
  email: "allpackprinters@gmail.com",
  websiteOnLetterhead: "www.allpack.com.pk",
  address: "Office No. 33, Ali Arcade, 7 Royal Park, Lakshmi Chowk, Lahore, Pakistan",
  city: "Lahore",
  country: "Pakistan",
  phone: process.env.NEXT_PUBLIC_PHONE || "0321-8444590",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923218444590").replace(/\D/g, ""),
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export function whatsappLink(message: string): string | null {
  if (!COMPANY.whatsapp) return null;
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const QUOTE_MESSAGE = "Hello ALL PACK, I would like a quotation for custom packaging.";

/** Normalize Pakistan local mobile numbers into globally usable tel: links. */
export function phoneLink(): string | null {
  if (!COMPANY.phone) return null;
  const raw = COMPANY.phone.trim();
  const digits = raw.replace(/\D/g, "");
  if (raw.startsWith("+")) return `tel:+${digits}`;
  if (/^0[0-9]{10}$/.test(digits)) return `tel:+92${digits.slice(1)}`;
  if (/^92[0-9]{10}$/.test(digits)) return `tel:+${digits}`;
  return `tel:${digits}`;
}
