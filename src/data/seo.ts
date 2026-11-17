/**
 * Search titles and descriptions for every page, in one place so they are easy to review.
 *
 * Rules:
 * - Titles lead with what people search for ("custom boxes", "packaging company Lahore"), name Lahore or
 *   Pakistan where searchers do, and stay within 60 characters including the " | ALL PACK" suffix
 *   (49 before it). Titles marked `absolute` already carry the brand and get no suffix.
 * - Descriptions run 140–160 characters: what the page offers, one concrete proof (Heidelberg offset,
 *   in-house finishing, 25+ years, ISO 9001 and Halal) and a clear next step. No two are alike.
 * Run `npm run seo:check` to verify lengths and duplicates.
 */

export type Seo = { title: string; description: string; absolute?: boolean };

export const PAGE_SEO = {
  home: {
    absolute: true,
    title: 'ALL PACK | Packaging & Printing Company in Lahore',
    description: 'Custom printed cartons, rigid boxes, mailer boxes, paper bags and labels, produced on Heidelberg offset presses in Lahore. ISO 9001 and Halal certified.',
  },
  products: {
    title: 'Custom Printed Boxes, Cartons, Bags & Labels',
    description: 'Pharmaceutical and folding cartons, rigid gift boxes, mailer and shipping boxes, food boxes, paper bags and labels, made to your size and printed in Lahore.',
  },
  industries: {
    title: 'Packaging for Pharma, Food & Retail Brands',
    description: 'Printed packaging for pharmaceutical, food and bakery, confectionery, cosmetics, restaurant and healthcare brands across Pakistan, produced in Lahore.',
  },
  about: {
    absolute: true,
    title: 'About ALL PACK | Packaging Printers in Lahore',
    description: 'For over 25 years ALL PACK has printed packaging for Pakistani brands, with Heidelberg offset printing and in-house finishing. ISO 9001 and Halal certified.',
  },
  contact: {
    absolute: true,
    title: 'Contact ALL PACK | Request a Packaging Quote',
    description: 'Send your product size, quantity and artwork on WhatsApp or by email and receive a specification and price within 24 hours. Royal Park, Lakshmi Chowk, Lahore.',
  },
  faq: {
    title: 'Packaging FAQ: Quantities, Lead Times, Artwork',
    description: 'How ALL PACK quotes, proofs and produces custom packaging: order quantities, custom sizes, artwork files, lead times, food-grade board and delivery in Pakistan.',
  },
  insights: {
    title: 'Packaging Guides: Box Styles, Board & Artwork',
    description: 'Practical guides from a Lahore packaging printer on choosing a box structure, kraft versus white board, and preparing artwork that prints correctly first time.',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How ALL PACK handles the information you share through this website and by WhatsApp or email: what we receive, why we use it, and how to have it corrected.',
  },
  terms: {
    title: 'Terms of Service',
    description: 'The terms that apply to using the ALL PACK website and ordering printed packaging: quotations, artwork and proofs, colour tolerance, quantities and delivery.',
  },
} satisfies Record<string, Seo>;

export const ARTICLE_SEO: Record<string, Seo> = {
  'choose-the-right-shipping-box': {
    title: 'How to Choose the Right Shipping Box',
    description: 'Single wall or double wall? How to size, specify and brand a shipping box so your product arrives intact, explained by a packaging manufacturer in Lahore.',
  },
  'kraft-vs-white-cardboard': {
    title: 'Kraft vs White Board: Which Suits Your Brand?',
    description: 'How kraft and white paperboard change print colour, texture and finish, and how to choose between them for your cartons, mailers and bags. A practical guide.',
  },
  'prepare-packaging-artwork': {
    title: 'Packaging Artwork Checklist Before Printing',
    description: 'Dielines, bleed, safe areas, barcodes, fonts and proofs: a print-side checklist that gets your packaging artwork ready for press without costly corrections.',
  },
};

/** Builds a Next.js title value from an Seo entry. */
export const seoTitle = (s: Seo) => (s.absolute ? { absolute: s.title } : s.title);
