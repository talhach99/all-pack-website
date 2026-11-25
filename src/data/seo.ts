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
    title: 'Custom Packaging Boxes & Printing | ALL PACK USA & Pakistan',
    description: 'Custom printed boxes, mailers, pouches, labels and DTF apparel for brands in the USA and Pakistan. Free digital proof, quotes in USD or PKR. ISO 9001 certified.',
  },
  products: {
    title: 'Custom Boxes, Mailers, Pouches & Labels',
    description: 'Custom folding cartons, rigid gift boxes, mailer and shipping boxes, pouches, labels, and DTF apparel, made to your size for brands in the USA and Pakistan.',
  },
  industries: {
    title: 'Packaging for Pharma, Food, Beauty & E-commerce',
    description: 'Custom packaging built for your industry: pharmaceutical cartons, food-grade boxes, premium beauty boxes, e-commerce mailers and heavy-duty corrugated boxes.',
  },
  about: {
    absolute: true,
    title: 'About ALL PACK | Packaging in Boston and Lahore',
    description: 'For 25+ years ALL PACK has printed packaging for leading brands, with offices in Boston and Lahore serving the USA and Pakistan. ISO 9001 and Halal certified.',
  },
  why: {
    title: 'Why ALL PACK: Certified Packaging Printers',
    description: 'ISO 9001:2015 and Halal certified, with Heidelberg offset printing and finishing in one Lahore facility. How ALL PACK keeps color and delivery on target.',
  },
  contact: {
    absolute: true,
    title: 'Get a Custom Packaging Quote | Contact ALL PACK',
    description: 'Send your product size, quantity and artwork by form, WhatsApp or email, and our Boston or Lahore team will reply with a clear quote within one business day.',
  },
  faq: {
    title: 'Packaging FAQ: Quantities, Lead Times, Artwork',
    description: 'How ALL PACK quotes, proofs and produces custom packaging: order quantities, custom sizes, artwork files, lead times, food-grade board and delivery in Pakistan.',
  },
  insights: {
    title: 'Packaging Blog: Guides, Costs and Ideas',
    description: 'Packaging guides from a Lahore printer: custom box types and ordering, what printed boxes cost in Pakistan, and pharmaceutical carton printing explained.',
  },
  finishes: {
    title: 'Packaging Finishes: Foil, Spot UV & Embossing',
    description: 'Compare matte, gloss and soft-touch lamination, spot UV, foil stamping, embossing and window cut-outs, plus the boards and films we print on for your brand.',
  },
  how: {
    title: 'How Ordering Custom Packaging Works',
    description: 'From specs to delivery in four steps: quotes in USD or PKR, digital proofs, sizing and artwork guides, lead times and payment for the USA and Pakistan.',
  },
  shipping: {
    title: 'Shipping Policy',
    description: 'How ALL PACK ships custom packaging to customers in the USA and Pakistan: delivery times, shipping costs, tracking, and what to do if an order arrives damaged.',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How ALL PACK handles the information you share through this website and by WhatsApp or email: what we receive, why we use it, and how to have it corrected.',
  },
  terms: {
    title: 'Terms of Service',
    description: 'The terms that apply to using the ALL PACK website and ordering printed packaging: quotations, artwork and proofs, color tolerance, quantities and delivery.',
  },
} satisfies Record<string, Seo>;

export const ARTICLE_SEO: Record<string, Seo> = {
  'custom-packaging-boxes-lahore': {
    title: "Custom Packaging Boxes in Lahore: Buyer's Guide",
    description: 'Compare folding cartons, rigid, mailer and corrugated boxes, choose the right board and finish, and learn how to order custom packaging in Lahore.',
  },
  'custom-box-printing-cost-pakistan': {
    title: 'Custom Box Printing Cost in Pakistan Explained',
    description: 'What decides the price of custom printed boxes in Pakistan: size, board, print, finishes and quantity, plus how to get an accurate quotation fast.',
  },
  'pharmaceutical-carton-printing-pakistan': {
    title: 'Pharmaceutical Carton Printing in Pakistan',
    description: 'How to specify medicine cartons: SBS board, structures, batch-coding areas, leaflets and the quality checks that keep every batch matching approved artwork.',
  },
};

/** Builds a Next.js title value from an Seo entry. */
export const seoTitle = (s: Seo) => (s.absolute ? { absolute: s.title } : s.title);
