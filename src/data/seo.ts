/**
 * Search titles and descriptions for every page, kept in one place so they are easy to review.
 *
 * Rules used here:
 * - Titles: the main keyword first, Lahore/Pakistan where people search that way, 60 characters or fewer
 *   including the " | ALL PACK" suffix (49 characters before it). Titles marked `absolute` already name ALL PACK.
 * - Descriptions: 140–160 characters, say what the page offers, include a proof point
 *   (own presses, 25+ years, ISO 9001 / Halal) and end with a reason to click.
 * Run `npm run seo:check` to verify lengths.
 */

export type Seo = { title: string; description: string; absolute?: boolean };

export const PAGE_SEO = {
  home: {
    absolute: true,
    title: 'ALL PACK | Printing & Packaging Company in Lahore',
    description: 'Custom printed cartons, rigid boxes, labels and corrugated packaging, made on our own presses in Lahore. 25+ years, ISO 9001 and Halal certified. Get a quote.',
  },
  products: {
    title: 'Custom Packaging Boxes & Printed Cartons',
    description: 'Folding cartons, rigid gift boxes, shipping boxes, pizza and bakery boxes, bags, pouches and labels. Made to your size and printed in Lahore. Ask for a quote.',
  },
  industries: {
    title: 'Packaging by Industry: Pharma, Food & Retail',
    description: 'Packaging for pharmaceutical, food, bakery, restaurant, beauty, e-commerce, fashion and produce brands. See what ALL PACK recommends for your industry.',
  },
  about: {
    absolute: true,
    title: 'About ALL PACK | 25+ Years of Packaging in Lahore',
    description: 'ALL PACK has printed packaging in Lahore for more than 25 years, on Heidelberg offset presses with in-house finishing. ISO 9001 and Halal certified.',
  },
  contact: {
    absolute: true,
    title: 'Contact ALL PACK | Packaging Quotes in Lahore',
    description: 'Call, WhatsApp or email ALL PACK for a packaging quote, or visit us at Royal Park, Lakshmi Chowk, Lahore. Send your size, quantity and artwork to start.',
  },
  insights: {
    title: 'Packaging Guides: Boxes, Materials & Artwork',
    description: 'Practical guides from a Lahore packaging printer: choosing the right shipping box, kraft vs white board, and getting your artwork ready for print.',
  },
  faq: {
    title: 'Custom Packaging FAQ: MOQ, Sizes & Lead Times',
    description: 'Answers on minimum order quantities, custom box sizes, artwork files, lead times, food-safe packaging and delivery outside Lahore. Ask us if yours is missing.',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How ALL PACK handles the information you send through this website: what we collect, why, who processes it, and how to have it corrected or deleted.',
  },
  terms: {
    title: 'Terms of Service',
    description: 'The terms for using the ALL PACK website and ordering printed packaging: quotations, artwork and proofs, colour, quantities, payment and delivery.',
  },
} satisfies Record<string, Seo>;

/** Product pages, keyed by product slug (src/data/products.json). */
export const PRODUCT_SEO: Record<string, Seo> = {
  'corrugated-shipping-boxes': {
    title: 'Corrugated Shipping Boxes & Cartons, Lahore',
    description: 'Single-wall and double-wall corrugated boxes for shipping and storage, made to your size with optional printing. Strong cartons from ALL PACK, Lahore.',
  },
  'ecommerce-mailer-boxes': {
    title: 'Custom Mailer Boxes for E-commerce in Pakistan',
    description: 'Printed self-locking mailer boxes that survive the courier and open like a gift. Custom sizes, kraft or white board, made in Lahore by ALL PACK. Get a quote.',
  },
  'fruit-produce-boxes': {
    title: 'Fruit & Vegetable Boxes: Vented Cartons',
    description: 'Vented corrugated cartons for fruit, vegetables and produce, sized to the crop and built to stack and breathe. Brand printing from ALL PACK, Lahore.',
  },
  'packaging-tape': {
    title: 'Branded Packaging Tape with Logo Printing',
    description: 'Plain and custom printed packaging tape for sealing cartons and courier parcels. Put your logo on every box you dispatch. Order from ALL PACK, Lahore.',
  },
  'folding-cartons': {
    title: 'Folding Cartons: Pharma, Food & Cosmetic Boxes',
    description: 'Printed tuck-end and crash-lock folding cartons for medicines, food and cosmetics, produced on Heidelberg presses in Lahore. ISO 9001 certified. Get a quote.',
  },
  'rigid-gift-boxes': {
    title: 'Rigid Gift Boxes: Magnetic & Drawer Boxes',
    description: 'Premium rigid boxes with magnetic, drawer or lift-off lids, wrapped and finished with foil or soft-touch lamination. Made to your size by ALL PACK, Lahore.',
  },
  'shoe-boxes': {
    title: 'Custom Shoe Boxes & Apparel Packaging',
    description: 'Branded shoe boxes and apparel cartons that stack neatly in store and look good at home. Custom sizes, print and finishes from ALL PACK, Lahore. Get a quote.',
  },
  'pizza-boxes': {
    title: 'Custom Pizza Boxes Printed in Lahore, 7" to 16"',
    description: 'Printed corrugated pizza boxes from 7" to 16" that keep the base crisp and your brand on the table. Food-safe board, made by ALL PACK, Lahore. Get a quote.',
  },
  'burger-boxes': {
    title: 'Burger Boxes, Fries Scoops & Fast Food Packaging',
    description: 'Grease-resistant burger clamshells, fries scoops and meal boxes printed with your brand. Food-safe board for restaurants, made by ALL PACK in Lahore.',
  },
  'cake-boxes': {
    title: 'Cake Boxes & Bakery Packaging, Custom Printed',
    description: 'Cake, pastry and sweets boxes with optional windows, printed with your bakery brand. Food-safe board and custom sizes from ALL PACK, Lahore. Get a quote.',
  },
  'kraft-shopping-bags': {
    title: 'Printed Paper & Kraft Shopping Bags',
    description: 'Kraft and art paper carrier bags, flat or gusseted, printed with your logo and brand colours. A plastic-free bag for shops and brands, from ALL PACK, Lahore.',
  },
  'standup-pouches': {
    title: 'Stand-up Pouches & Zipper Bags, Custom Printed',
    description: 'Stand-up pouches with zip or heat-seal closures for dry foods, snacks and refills, printed with your brand. Custom sizes from ALL PACK, Lahore. Get a quote.',
  },
  'labels-stickers': {
    title: 'Product Labels & Stickers Printing in Lahore',
    description: 'Printed product labels, seals and stickers on paper or synthetic stock, in sheets or rolls and custom shapes. For food, beauty and retail. ALL PACK, Lahore.',
  },
};

/** Industry pages, keyed by industry slug (src/data/industries.ts). */
export const INDUSTRY_SEO: Record<string, Seo> = {
  'e-commerce': {
    title: 'E-commerce Packaging: Mailer & Shipping Boxes',
    description: 'Mailer boxes, shipping cartons and branded tape for online stores in Pakistan. Packaging that survives the courier and makes unboxing memorable.',
  },
  restaurants: {
    title: 'Restaurant & Takeaway Packaging in Lahore',
    description: 'Pizza boxes, burger boxes, fries scoops and paper bags for restaurants and takeaways. Food-safe, grease-resistant and printed with your brand in Lahore.',
  },
  bakeries: {
    title: 'Bakery Packaging: Cake & Pastry Boxes',
    description: 'Cake boxes, pastry boxes and bread packaging printed for bakeries across Pakistan. Food-safe board and custom sizes, trusted by Citi Bread and Sun Bread.',
  },
  beauty: {
    title: 'Cosmetic Boxes & Beauty Packaging, Pakistan',
    description: 'Printed cosmetic cartons, rigid boxes and labels for skincare, makeup and personal care. Foil and soft-touch finishes, made by ALL PACK in Lahore.',
  },
  pharmaceutical: {
    title: 'Pharmaceutical Packaging & Carton Printing',
    description: 'Medicine cartons, labels and shippers printed to approved artwork in an ISO 9001 plant in Lahore. Trusted by Global Pharma, Citi Pharma and Don Valley.',
  },
  fashion: {
    title: 'Fashion & Footwear Packaging: Shoe & Gift Boxes',
    description: 'Shoe boxes, rigid gift boxes and paper shopping bags for fashion, footwear and jewellery brands. A boutique feel, printed and finished in Lahore.',
  },
  agriculture: {
    title: 'Fruit & Produce Packaging: Corrugated Cartons',
    description: 'Vented corrugated cartons for fruit, vegetables and agricultural produce, built to stack and travel through the supply chain. Made by ALL PACK, Lahore.',
  },
};

/** Guide pages, keyed by article slug (src/data/articles.ts). */
export const ARTICLE_SEO: Record<string, Seo> = {
  'choose-the-right-shipping-box': {
    title: 'How to Choose the Right Shipping Box',
    description: 'Single wall or double wall? How to size, choose and brand a shipping box so your product arrives safely, explained by a Lahore packaging manufacturer.',
  },
  'kraft-vs-white-cardboard': {
    title: 'Kraft vs White Cardboard: Which Fits Your Brand?',
    description: 'How kraft and white paperboard change print colour, texture and feel, and how to choose between them for your boxes. A practical packaging guide.',
  },
  'prepare-packaging-artwork': {
    title: 'Packaging Artwork Checklist Before Printing',
    description: 'Dielines, bleed, safe areas, barcodes, fonts and proofs: a simple checklist to get your packaging artwork print-ready before it goes to press.',
  },
};

/** Builds a Next.js title value from an Seo entry. */
export const seoTitle = (s: Seo) => (s.absolute ? { absolute: s.title } : s.title);
