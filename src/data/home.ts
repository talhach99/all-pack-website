/**
 * Content for the redesigned site (Nov 2026): homepage sections, product catalog, finishes,
 * ordering details and offices. Photos live in public/photos/ and public/renders/ (owner-supplied).
 * Copy is formal and specific: no invented figures. Placeholders in [brackets] await the owner's numbers.
 */

/** Photos and renders, 640px versions for tiles and cards (full-size files are kept for the hero). */
export const P = (f: string) => `/photos/${f}-sm.webp`;
const SM_RENDERS = new Set(['folding-cartons-v2', 'mailer-boxes', 'corrugated-shipping-boxes', 'pharmaceutical-cartons-v2', 'food-boxes-v2', 'labels-stickers-v2', 'paper-bags', 'rigid-gift-boxes']);
export const R = (f: string) => `/renders/${f}${SM_RENDERS.has(f) ? '-sm' : ''}.webp`;
/** Hero photo: full size plus a 900px version for phones. */
export const HERO = (f: string) => ({ src: `/photos/${f}.webp`, srcSet: `/photos/${f}-md.webp 900w, /photos/${f}.webp 1600w` });

export type HeroSlide = { kicker: string; title: string; text: string; cta: string; href: string; image: string; srcSet: string; alt: string; bg: string; tab: string; cutout?: boolean };
export const HERO_SLIDES: HeroSlide[] = [
  { kicker: 'Custom packaging · USA and Pakistan', title: 'Packaging as premium as what’s inside.', text: 'Cosmetic cartons, drawer boxes and rigid gift boxes, made to your size and finished with foil, embossing or soft-touch.', cta: 'Shop packaging', href: '/products', image: '/photos/hero-cosmetic-v2.webp', srcSet: '/photos/hero-cosmetic-v2-sm.webp 800w, /photos/hero-cosmetic-v2.webp 1600w', alt: 'ALL PACK cosmetic packaging: navy lipstick and serum cartons, a drawer box with ribbon pull, a white organic care box and a teal rigid gift box with gold foil', bg: '#EFE6DC', tab: 'Premium packaging' },
  { kicker: 'One design, every product', title: 'Make it once. Wear it, carry it, frame it.', text: 'Put your artwork on tees, sweatshirts, totes and prints, then ship it all in boxes made by ALL PACK.', cta: 'Explore products', href: '/products', image: HERO('hero2').src, srcSet: HERO('hero2').srcSet, alt: 'Model with a printed tote beside a matching hoodie, tee, cap and poster', bg: '#CDBFEA', tab: 'Apparel and bags' },
  { kicker: 'From sample to scale', title: 'Start with one. Scale to thousands.', text: 'Approve a sample first, then grow your run with the same quality, supported from Boston and Lahore.', cta: 'Start your order', href: '/contact', image: HERO('hero3').src, srcSet: HERO('hero3').srcSet, alt: 'Man in a printed tee beside a rack of custom shirts', bg: '#EDCBB2', tab: 'Sample to scale' },
];

export const STRIP = [
  { label: 'T-shirt', src: P('tshirt') }, { label: 'Ceramic mug', src: P('mug-leaves') }, { label: 'Tote bag', src: P('tote') },
  { label: 'Cushion', src: P('pillow') }, { label: 'Stand-up pouch', src: P('pouch1') }, { label: 'Phone case', src: P('phonecase') },
  { label: 'Blanket', src: P('blanket') }, { label: 'Sweatshirt', src: P('sweat') }, { label: 'Color mug', src: P('mug-waves') }, { label: 'Poster', src: P('poster') },
];

export const BENEFITS = [
  { title: 'Made to your spec', text: 'Any size, board and finish. Every structure starts from your product, so it fits and protects.', icon: 'box' },
  { title: 'Better prices at volume', text: 'Unit prices drop as your order grows. Ask for tiered pricing with your quote.', icon: 'tag' },
  { title: 'Delivered on schedule', text: 'Clear lead times agreed up front, with delivery to your door in the USA or Pakistan.', icon: 'truck' },
] as const;

export type Tile = { name: string; src: string; fit?: 'cover' | 'contain'; white?: boolean };
export const MOSAIC: Tile[] = [
  { name: 'T-shirts', src: P('tshirt') }, { name: 'Ceramic mugs', src: P('mug-leaves') }, { name: 'Cushions', src: P('pillow') }, { name: 'Tote bags', src: P('tote') },
  { name: 'Phone cases', src: P('phonecase') }, { name: 'Blankets', src: P('blanket') }, { name: 'Color mugs', src: P('mug-waves') }, { name: 'Posters and wall art', src: P('poster') },
  { name: 'Sweatshirts', src: P('sweat') }, { name: 'Custom apparel', src: P('tees') },
  { name: 'Pouches', src: P('pouch1'), fit: 'contain', white: true }, { name: 'Food boxes', src: R('food-boxes-v2'), fit: 'contain' },
  { name: 'Corrugated shipping boxes', src: R('corrugated-shipping-boxes'), fit: 'contain' }, { name: 'E-commerce and mailer boxes', src: R('mailer-boxes'), fit: 'contain' },
];

export type PrintCard = { name: string; src: string; desc?: string; fit: 'cover' | 'contain' };
export const PRINT_ROWS: { kicker: string; title: string; text: string; link: string; bg: string; cards: PrintCard[] }[] = [
  { kicker: '01 · Flexible packaging', title: 'Printed pouches, four ways', text: 'Food, snacks, powders and liquids, sealed, branded and ready for the shelf.', link: 'Get pouch pricing', bg: '#F4F5F8', cards: [
    { name: 'Stand-up pouch', src: P('pouch1'), fit: 'contain' }, { name: 'Four-side seal pouch with handle', src: P('pouch2'), fit: 'contain' },
    { name: 'Flat-bottom pouch', src: P('pouch3'), fit: 'contain' }, { name: 'Spout pouch with cap', src: P('pouch4'), fit: 'contain' },
  ] },
  { kicker: '02 · DTF printing', title: 'DTF transfers for apparel', text: 'Direct-to-film printing puts full-color designs on tees, hoodies, totes and caps, with a soft, flexible finish that lasts wash after wash.', link: 'Get DTF pricing', bg: '#F6F3FC', cards: [
    { name: 'T-shirts', src: P('tshirt'), desc: 'Logos and artwork on cotton tees, with crisp edges and a soft feel.', fit: 'cover' },
    { name: 'Sweatshirts and hoodies', src: P('sweat'), desc: 'Chest logos and full designs that stay flexible on heavier fleece.', fit: 'cover' },
    { name: 'Tote bags', src: P('tote'), desc: 'Bold, full-color prints on canvas totes for retail and events.', fit: 'cover' },
    { name: 'Team and brand apparel', src: P('tees'), desc: 'Matching sets for staff, launches and merch drops, from samples to bulk.', fit: 'cover' },
  ] },
  { kicker: '03 · Offset printing', title: 'Offset printing', text: 'Sharp, consistent color on long runs of cartons, labels and leaflets, printed in-house for brands that need volume and precision.', link: 'Get offset pricing', bg: '#F2F7F5', cards: [
    { name: 'Corrugated shipping boxes', src: P('off-corr'), desc: 'Printed 3- and 5-ply cartons that protect goods in storage and transit.', fit: 'contain' },
    { name: 'Pharmaceutical boxes', src: P('off-pharma'), desc: 'Clean, legible cartons with space for batch codes, dosage and expiry.', fit: 'contain' },
    { name: 'Food boxes', src: P('off-food'), desc: 'Food-grade board and inks for bakery, snack and takeaway packaging.', fit: 'contain' },
    { name: 'Rigid gift boxes', src: P('off-rigid'), desc: 'Premium lift-off lid boxes with foil, wraps and bands for launches and gifting.', fit: 'contain' },
  ] },
];

export const HOME_FAQ = [
  { q: 'Is there a minimum order?', a: 'Minimums depend on the box style and print method. Tell us your quantity and we will suggest the most cost-effective option.' },
  { q: 'How long does an order take?', a: 'Production starts once you approve your proof. We confirm the exact lead time and delivery date with your quote.' },
  { q: 'Do you deliver in the USA and Pakistan?', a: 'Yes. Our Boston office handles US orders and our Lahore office handles orders across Pakistan, with delivery to your door.' },
  { q: 'Can I get a sample before ordering?', a: 'Every order starts with a free digital proof, and we can send a physical sample before your full run.' },
  { q: 'What files do I need to send?', a: 'A print-ready PDF or AI file on our dieline. No artwork yet? Our team can place your logo and colors for you.' },
];

/* ---------- Products page ---------- */
export type CatalogItem = { name: string; src?: string; fit?: 'cover' | 'contain' };
export type CatalogSection = { id: string; title: string; desc: string; banner?: string; items: CatalogItem[] };
const r = (name: string, file: string): CatalogItem => ({ name, src: R(file), fit: 'contain' });
const c = (name: string, file: string): CatalogItem => ({ name, src: P(file), fit: 'cover' });
const w = (name: string, file: string): CatalogItem => ({ name, src: P(file), fit: 'contain' });
export const CATALOG: CatalogSection[] = [
  { id: 'folding', title: 'Folding cartons', desc: 'Retail, cosmetic and supplement cartons in any size.', items: [r('Tuck-end cartons', 'folding-cartons-v2'), r('Cosmetic cartons', 'packaging-range-800'), { name: 'Window cartons' }, { name: 'Sleeve and drawer boxes' }] },
  { id: 'rigid', title: 'Rigid gift boxes', desc: 'Premium lift-off lid boxes for launches and gifting.', items: [w('Lift-off lid gift box', 'off-rigid'), r('Gift box with band', 'rigid-gift-boxes')] },
  { id: 'mailer', title: 'Mailer boxes', desc: 'E-commerce mailers that ship safely and open beautifully.', items: [r('Roll-end mailers', 'mailer-boxes'), { name: 'Subscription boxes' }] },
  { id: 'shipping', title: 'Shipping boxes', desc: 'Corrugated cartons for storage, freight and fulfilment.', items: [w('3-ply and 5-ply cartons', 'off-corr'), r('Printed shipping boxes', 'corrugated-shipping-boxes'), { name: 'Industrial boxes' }] },
  { id: 'pharma', title: 'Pharmaceutical', desc: 'Compliant cartons and inserts for regulated lines.', items: [w('Pharma cartons', 'off-pharma'), r('Tablet cartons', 'pharmaceutical-cartons-v2'), { name: 'Inserts and leaflets' }] },
  { id: 'food', title: 'Food and bakery', desc: 'Food-grade boxes for bakery, snack and takeaway brands.', items: [w('Takeaway boxes', 'off-food'), r('Window food boxes', 'food-boxes-v2'), { name: 'Cake and cupcake boxes' }, { name: 'Burger boxes' }] },
  { id: 'pouches', title: 'Pouches', desc: 'Printed flexible pouches for food, powders and liquids.', items: [w('Stand-up pouch', 'pouch1'), w('Four-side seal pouch with handle', 'pouch2'), w('Flat-bottom pouch', 'pouch3'), w('Spout pouch with cap', 'pouch4')] },
  { id: 'labels', title: 'Labels and stickers', desc: 'Product labels on rolls or sheets, in any shape.', items: [r('Roll labels', 'labels-stickers-v2'), { name: 'Sheet stickers' }, { name: 'Die-cut labels' }] },
  { id: 'bags', title: 'Paper bags', desc: 'Branded retail and gift bags.', items: [r('Retail paper bags', 'paper-bags')] },
  { id: 'stationery', title: 'Stationery and brand print', desc: 'The finishing touches that travel with your packaging.', items: [c('Notebooks and journals', 'notebook'), c('Business cards', 'bizcards'), w('Hang tags', 'hangtags'), c('Thank-you cards', 'thankyou')] },
  { id: 'apparel', title: 'DTF apparel', desc: 'Full-color DTF prints on tees, fleece and bags.', banner: HERO('hero3').src, items: [c('T-shirts', 'tshirt'), c('Sweatshirts', 'sweat'), c('Tote bags', 'tote'), c('Team and brand apparel', 'tees'), { name: 'Hoodies' }, { name: 'Caps' }] },
  { id: 'home', title: 'Home and gifts', desc: 'Printed homeware and gifts for your brand or store.', banner: HERO('hero1').src, items: [c('Posters and wall art', 'poster'), c('Ceramic mugs', 'mug-leaves'), c('Color mugs', 'mug-waves'), c('Cushions', 'pillow'), c('Blankets', 'blanket'), c('Phone cases', 'phonecase')] },
];
export const NEW_ARRIVALS: CatalogItem[] = [w('Stand-up pouch', 'pouch1'), w('Spout pouch with cap', 'pouch4'), w('Lift-off lid gift box', 'off-rigid'), c('Thank-you cards', 'thankyou'), w('Hang tags', 'hangtags'), c('Notebooks and journals', 'notebook'), w('Flat-bottom pouch', 'pouch3'), w('Takeaway boxes', 'off-food')];

/* ---------- Industries ---------- */
export type Industry = { id: string; name: string; kicker: string; short: string; desc: string; long: string; points: string[]; products: string[]; src: string; fit: 'cover' | 'contain'; bg: string };
export const INDUSTRIES: Industry[] = [
  { id: 'pharma', name: 'Pharmaceutical & Health', kicker: 'Pharmaceutical & health', short: 'pharma packaging', desc: 'Compliant cartons, inserts and labels with room for batch and expiry data.', long: 'Pharmaceutical and healthcare packaging has to be precise, legible and consistent on every run. We print cartons, inserts and labels to your approved artwork, with space for batch numbers, expiry dates and dosage information.', points: ['Batch, expiry and dosage panels on every carton', 'Inserts and leaflets matched to your cartons', 'Consistent color from run to run'], products: ['Medicine cartons', 'Inserts and leaflets', 'Product labels'], src: P('off-pharma'), fit: 'cover' as const, bg: '#FFFFFF' },
  { id: 'food', name: 'Food & Beverage', kicker: 'Food & beverage', short: 'food packaging', desc: 'Food-grade board and inks for bakery, snack and takeaway brands.', long: 'From bakeries to takeaway brands, food packaging has to be safe, sturdy and good-looking. We use food-grade board and inks, and design boxes that hold their shape from kitchen to customer.', points: ['Food-grade board and inks', 'Grease-resistant options for baked and fried foods', 'Easy-lock structures for fast packing'], products: ['Takeaway boxes', 'Bakery and cake boxes', 'Pouches'], src: P('off-food'), fit: 'cover' as const, bg: '#FFFFFF' },
  { id: 'beauty', name: 'Beauty & Personal Care', kicker: 'Beauty & personal care', short: 'beauty packaging', desc: 'Premium finishes like foil, embossing and soft-touch lamination.', long: 'Beauty customers judge the product by its box. We produce premium cartons and sets with finishes that look and feel special on the shelf and in the unboxing.', points: ['Foil stamping, embossing and spot UV', 'Soft-touch and matte laminations', 'Inserts that hold bottles and jars securely'], products: ['Cosmetic cartons', 'Gift sets', 'Sleeves'], src: R('packaging-range-800'), fit: 'contain' as const, bg: '#EEEAFB' },
  { id: 'ecommerce', name: 'E-commerce', kicker: 'E-commerce', short: 'e-commerce packaging', desc: 'Right-sized mailers that protect products and reduce shipping costs.', long: 'Online brands need packaging that protects products in transit and still delivers a great unboxing. We size mailers to your products to reduce empty space and shipping costs.', points: ['Right-sized to cut dimensional-weight charges', 'Printed inside and out', 'Sturdy E-flute and B-flute options'], products: ['Mailer boxes', 'Shipping boxes', 'Pouches'], src: R('mailer-boxes'), fit: 'contain' as const, bg: '#E8F7FC' },
  { id: 'retail', name: 'Retail & Gifting', kicker: 'Retail & gifting', short: 'gift packaging', desc: 'Rigid gift boxes and shelf-ready cartons that stand out in store.', long: 'For launches, seasonal sets and premium retail, presentation matters. We build rigid gift boxes and shelf-ready cartons that make your brand stand out in store.', points: ['Rigid lift-off lid and drawer boxes', 'Wraps, bands and ribbon details', 'Shelf-ready display cartons'], products: ['Rigid gift boxes', 'Display cartons', 'Paper bags'], src: P('off-rigid'), fit: 'cover' as const, bg: '#ECEFFD' },
  { id: 'industrial', name: 'Industrial', kicker: 'Industrial', short: 'industrial packaging', desc: 'Heavy-duty corrugated boxes for parts, tools and bulk shipments.', long: 'Heavy and fragile goods need strength first. We produce corrugated boxes in 3-ply and 5-ply board, sized for parts, tools and bulk shipments.', points: ['3-ply standard and 5-ply heavy-duty board', 'Custom sizes for parts and equipment', 'Printed handling and branding marks'], products: ['Corrugated boxes', 'Heavy-duty cartons', 'Dividers'], src: P('off-corr'), fit: 'cover' as const, bg: '#FFFFFF' },
];

/* ---------- Finishes ---------- */
export const FINISHES = [
  { name: 'Matte lamination', short: 'Matte', desc: 'Soft, glare-free surface with a modern, understated look.', best: 'Cosmetics, retail cartons', cost: '$', face: '#1F2A44', ink: '#E8ECF6', shadow: 'none' },
  { name: 'Gloss lamination', short: 'Gloss', desc: 'Bright, vivid color with a reflective shine that pops on shelf.', best: 'Food, consumer goods', cost: '$', face: 'linear-gradient(135deg,#2B43F0 0%,#7E8FF8 40%,#2B43F0 70%,#1E30B8 100%)', ink: '#FFFFFF', shadow: '0 1px 0 rgba(255,255,255,.4)' },
  { name: 'Soft-touch', short: 'Soft-touch', desc: 'Velvety, premium feel that invites customers to pick it up.', best: 'Beauty, gift boxes', cost: '$$', face: '#2A2F3A', ink: '#C9CEDA', shadow: 'none' },
  { name: 'Spot UV', short: 'Spot UV', desc: 'Raised gloss on selected areas like your logo or pattern.', best: 'Logos, premium cartons', cost: '$$', face: '#1A2133', ink: '#3E4B6E', shadow: '0 0 1px #9AA8D6, 0 2px 6px rgba(154,168,214,.6)' },
  { name: 'Foil stamping', short: 'Foil', desc: 'Metallic gold, silver or colored foil pressed into the board.', best: 'Gift boxes, launches', cost: '$$$', face: '#0A208C', ink: '#F3D58A', shadow: '0 1px 0 #B8892E, 0 0 12px rgba(243,213,138,.35)' },
  { name: 'Embossing', short: 'Embossing', desc: 'Raised logo or pattern you can see and feel.', best: 'Rigid boxes, cosmetics', cost: '$$$', face: '#EEF0F5', ink: '#EEF0F5', shadow: '-1px -1px 1px #FFFFFF, 2px 2px 3px rgba(10,32,140,.35)' },
  { name: 'Debossing', short: 'Debossing', desc: 'Pressed-in detail for a subtle, crafted look.', best: 'Kraft boxes, sleeves', cost: '$$', face: '#C9A77C', ink: '#B08A5E', shadow: '1px 1px 0 rgba(255,255,255,.35), -1px -1px 1px rgba(59,42,23,.35)' },
  { name: 'Window cut-out', short: 'Window', desc: 'Die-cut window with clear film to show the product inside.', best: 'Food, toys, retail', cost: '$$', face: 'linear-gradient(#FFFFFF 0 30%, #DDEBF7 30% 70%, #FFFFFF 70%)', ink: '#0A208C', shadow: 'none' },
];
export const MATERIALS = [
  { name: 'White board (SBS)', desc: 'Bright, smooth board for crisp full-color print on retail and pharma cartons.', src: P('off-pharma'), fit: 'cover' as const, bg: '#FFFFFF' },
  { name: 'Kraft board', desc: 'Natural, uncoated brown board with an earthy, eco-friendly look.', src: R('mailer-boxes'), fit: 'contain' as const, bg: '#F3EEE6' },
  { name: 'Corrugated (3- and 5-ply)', desc: 'Fluted board for strength in shipping, storage and heavy goods.', src: P('off-corr'), fit: 'cover' as const, bg: '#FFFFFF' },
  { name: 'Rigid board', desc: 'Thick, non-folding board wrapped in printed paper for premium gift boxes.', src: P('off-rigid'), fit: 'cover' as const, bg: '#ECEFFD' },
  { name: 'Pouch films', desc: 'Laminated flexible films with zip, handle and spout options.', src: P('pouch1'), fit: 'contain' as const, bg: '#FFFFFF' },
];
export const METHODS = [
  { name: 'Offset printing', text: 'Sharp, consistent CMYK and Pantone color for cartons, labels and leaflets, ideal for larger runs.' },
  { name: 'DTF printing', text: 'Full-color transfers for apparel and bags, with a soft, durable finish.' },
  { name: 'Inside printing', text: 'Add a message, pattern or color inside your mailer or carton for a memorable unboxing.' },
];
export const FINISH_GUIDE = [
  ['I want a premium, luxury feel', 'Soft-touch + foil'], ['I want colors to really pop', 'Gloss lamination'], ['I want an eco, natural look', 'Kraft + debossing'],
  ['I want my logo to stand out', 'Spot UV or embossing'], ['I want to show the product', 'Window cut-out'],
];

/* ---------- How it works ---------- */
export type OrderStep = { n: string; title: string; time: string; send: string[]; get: string[] };
export const STEPS: OrderStep[] = [
  { n: '01', title: 'Share your specs', time: 'Same day', send: ['Product size and quantity', 'Box style, if you know it', 'Ship-to address (USA or Pakistan)'], get: ['A reply from your dedicated contact', 'Questions to confirm the details'] },
  { n: '02', title: 'Get your quote', time: 'Within one business day', send: ['Any preferred finish or material', 'Target budget, if you have one'], get: ['Recommended structure and material', 'Itemized quote in USD or PKR', 'Price breaks for larger quantities'] },
  { n: '03', title: 'Approve your proof', time: '1 to 2 business days', send: ['Print-ready artwork, or your logo and brand colors'], get: ['A digital proof on your dieline', 'A physical sample, if requested'] },
  { n: '04', title: 'Receive your order', time: 'Production + shipping', send: ['Your approval and payment'], get: ['Printed, inspected packaging', 'Tracking details', 'Delivery to your door, warehouse or 3PL'] },
];
export const ARTWORK = [['File type', 'PDF or AI (vector)'], ['Image resolution', '300 dpi or higher'], ['Bleed', '0.125 in (3 mm)'], ['Color mode', 'CMYK, plus Pantone if needed'], ['Fonts', 'Outlined or embedded']];
export const REGIONS = [
  { name: 'USA', office: 'Boston office', dark: true, rows: [['Minimum order', 'From 500 units'], ['Production time', '12 to 15 business days'], ['Shipping to the US', '5 to 8 business days'], ['Quotes in', 'US dollars (USD)']], pay: ['Visa', 'Mastercard', 'American Express', 'PayPal', 'Stripe'] },
  { name: 'Pakistan', office: 'Lahore office', dark: false, rows: [['Minimum order', 'From 1,000 units'], ['Production time', '10 to 12 business days'], ['Delivery in Pakistan', '2 to 4 business days'], ['Quotes in', 'Pakistani rupees (PKR)']], pay: ['Bank transfer'] },
];
export const HOW_FAQ = [
  { q: 'What is the minimum order?', a: 'Most orders start from 500 units in the USA and 1,000 units in Pakistan. Minimums vary with the box style and print method, so tell us your quantity and we will suggest the most cost-effective option.' },
  { q: 'How long does an order take?', a: 'Production takes 12 to 15 business days for US orders and 10 to 12 for Pakistan, starting once you approve your proof and payment. Shipping to the US takes 5 to 8 business days, and delivery in Pakistan 2 to 4. We confirm the exact dates with your quote.' },
  { q: 'Which payment methods do you accept?', a: 'In the USA we accept Visa, Mastercard, American Express, PayPal and Stripe. In Pakistan we accept bank transfer.' },
  { q: 'Can I get a sample first?', a: 'Yes. Every order includes a free digital proof, and we can send a physical sample before your full run.' },
  { q: 'Do you help with design?', a: 'Yes. If you do not have print-ready artwork, our team can place your logo and brand colors on the dieline for you.' },
  { q: 'Do you ship to my area?', a: 'Our Boston office handles orders across the USA, and our Lahore office handles orders across Pakistan.' },
];
