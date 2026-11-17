/**
 * The ALL PACK product range: eight formats, all shown on one page (/products#slug).
 * Images are studio renders in /public/renders, made for ALL PACK, so every format is shown the same way.
 */
export type Family = {
  slug: string;
  name: string;
  label: string;
  short: string;
  description: string;
  image: string;
  alt: string;
  specs: { title: string; items: string[] }[];
};

export const families: Family[] = [
  {
    slug: 'pharmaceutical-cartons',
    name: 'Pharmaceutical cartons',
    label: 'Pharmaceutical',
    short: 'Unit cartons, leaflets and inserts',
    description: 'Unit cartons, leaflets and inserts printed to approved artwork. Every reprint is matched to the signed proof, so text stays legible and colour stays consistent from one batch to the next, as regulated products require.',
    image: '/renders/pharmaceutical-cartons.webp',
    alt: 'Printed pharmaceutical tablet carton in white and navy',
    specs: [
      { title: 'Styles', items: ['Tuck-end', 'Crash-lock bottom', 'Sleeve', 'Leaflets and inserts'] },
      { title: 'Board', items: ['SBS', 'Duplex board'] },
      { title: 'Finishes', items: ['Gloss or matte varnish', 'UV coating', 'Embossing'] },
    ],
  },
  {
    slug: 'folding-cartons',
    name: 'Folding cartons',
    label: 'Food and retail',
    short: 'Food, confectionery and cosmetic cartons',
    description: 'Printed cartons for biscuits, bakery, confectionery and cosmetics, made to your dimensions. Lamination, spot UV and foil are applied in-house, so the finish on the shelf matches the proof you approved.',
    image: '/renders/folding-cartons.webp',
    alt: 'Printed folding carton for a biscuit brand',
    specs: [
      { title: 'Styles', items: ['Tuck-end', 'Window', 'Display', 'Sleeve'] },
      { title: 'Board', items: ['SBS', 'Duplex board', 'Kraft board'] },
      { title: 'Finishes', items: ['Lamination', 'Spot UV', 'Foil stamping', 'Embossing', 'Window patching'] },
    ],
  },
  {
    slug: 'rigid-gift-boxes',
    name: 'Rigid gift boxes',
    label: 'Premium',
    short: 'Lid and base, magnetic and drawer boxes',
    description: 'Board-wrapped boxes for gifting, product launches and premium ranges. Each box is built around the product, with a fitted insert that holds every item in place and a wrap finished to the standard of the brand inside.',
    image: '/renders/rigid-gift-boxes.webp',
    alt: 'Navy rigid gift box with a gold band and foil logo',
    specs: [
      { title: 'Styles', items: ['Lid and base', 'Magnetic closure', 'Drawer', 'Book-style'] },
      { title: 'Wrap', items: ['Printed art paper', 'Specialty paper', 'Kraft paper'] },
      { title: 'Finishes', items: ['Foil stamping', 'Debossing', 'Soft-touch lamination'] },
    ],
  },
  {
    slug: 'mailer-boxes',
    name: 'Mailer boxes',
    label: 'E-commerce',
    short: 'Printed self-locking mailers',
    description: 'Self-locking corrugated mailers that withstand courier handling and open well. Print on the outside, the inside or both, so the first thing a customer sees after delivery is your brand.',
    image: '/renders/mailer-boxes.webp',
    alt: 'Open kraft mailer box with a white interior',
    specs: [
      { title: 'Styles', items: ['Roll-end tuck front', 'Tab-lock', 'Printed interior'] },
      { title: 'Board', items: ['E-flute corrugated', 'B-flute corrugated', 'Kraft or white liner'] },
      { title: 'Print', items: ['One colour', 'Full colour'] },
    ],
  },
  {
    slug: 'corrugated-shipping-boxes',
    name: 'Corrugated shipping boxes',
    label: 'Transit',
    short: '3-ply and 5-ply cartons',
    description: 'Shipping cartons for storage, distribution and outbound orders, specified by product weight and stacking load. Supplied plain, or printed with your logo and handling marks.',
    image: '/renders/corrugated-shipping-boxes.webp',
    alt: 'Two kraft corrugated shipping boxes printed with the ALL PACK logo',
    specs: [
      { title: 'Styles', items: ['Regular slotted carton', 'Die-cut carton', 'Partitions'] },
      { title: 'Board', items: ['3-ply corrugated', '5-ply corrugated'] },
      { title: 'Print', items: ['Plain', 'Logo and handling marks'] },
    ],
  },
  {
    slug: 'food-boxes',
    name: 'Food boxes',
    label: 'Food service',
    short: 'Pizza, cake, burger and bakery boxes',
    description: 'Pizza, cake, burger and bakery boxes in food-grade board, sized to the product and printed with your brand. Made for restaurants, bakeries and caterers who need a box that carries well and presents better.',
    image: '/renders/food-boxes.webp',
    alt: 'Stacked white food boxes printed with a restaurant brand',
    specs: [
      { title: 'Styles', items: ['Pizza box', 'Cake box', 'Burger box', 'Bakery box'] },
      { title: 'Board', items: ['Food-grade board', 'E-flute corrugated'] },
      { title: 'Finishes', items: ['Varnish', 'Window patching'] },
    ],
  },
  {
    slug: 'paper-bags',
    name: 'Paper bags',
    label: 'Retail',
    short: 'Printed shopping and carry bags',
    description: 'Printed shopping bags for retail, pharmacy and hospitality, with rope or twisted-paper handles and reinforced bases. A carry bag travels further than any other piece of your packaging, so it is printed to the same standard.',
    image: '/renders/paper-bags.webp',
    alt: 'White paper shopping bag with navy rope handles and the ALL PACK logo',
    specs: [
      { title: 'Styles', items: ['Rope handle', 'Twisted-paper handle', 'Flat handle'] },
      { title: 'Paper', items: ['Kraft paper', 'Art card'] },
      { title: 'Finishes', items: ['Lamination', 'Foil stamping'] },
    ],
  },
  {
    slug: 'labels-stickers',
    name: 'Labels and stickers',
    label: 'Labelling',
    short: 'Product labels, wrappers and seals',
    description: 'Product labels, wrappers and seals printed in sheets or rolls. Colour is matched to the rest of your packaging, so the label on the jar and the carton around it read as one brand.',
    image: '/renders/labels-stickers.webp',
    alt: 'Jar with a printed product label beside a roll of labels',
    specs: [
      { title: 'Formats', items: ['Product labels', 'Wrappers', 'Seals', 'Roll labels'] },
      { title: 'Stock', items: ['Art paper', 'Chromo paper'] },
      { title: 'Finishes', items: ['Varnish', 'Lamination', 'Die-cut shapes'] },
    ],
  },
];

export type Sector = { slug: string; name: string; summary: string; detail: string; formats: string[]; clients: string[] };

/** Sectors ALL PACK serves. Client names are the owner's own client list. */
export const sectors: Sector[] = [
  {
    slug: 'pharmaceutical',
    name: 'Pharmaceutical',
    summary: 'Cartons, leaflets and labels printed to approved artwork, batch after batch.',
    detail: 'Regulated packaging leaves no room for drift. Artwork is checked against the approved file, proofed before production and matched on every reprint, so dosage text, batch panels and brand colours stay exactly as signed off.',
    formats: ['Pharmaceutical cartons', 'Leaflets and inserts', 'Labels'],
    clients: ['Global Pharmaceuticals', 'Don Valley Pharmaceuticals', 'Citi Pharma'],
  },
  {
    slug: 'food-and-bakery',
    name: 'Food and bakery',
    summary: 'Cartons, wrappers and boxes for bread, cakes, biscuits and snacks.',
    detail: 'Bakery and snack brands reorder often and in volume. We hold colour across repeat runs and plan production around your dispatch schedule, from rusk wrappers to cake cartons.',
    formats: ['Folding cartons', 'Labels and wrappers', 'Food boxes'],
    clients: ['Citi Bread', 'Sun Bread', "Bunny's"],
  },
  {
    slug: 'confectionery',
    name: 'Confectionery',
    summary: 'Shelf-ready cartons with foil, UV and window finishes.',
    detail: 'Confectionery competes on the shelf. Bright four-colour print, foil and spot UV give cartons the finish they need, and display styles let retailers stock them straight from the box.',
    formats: ['Folding cartons', 'Display cartons', 'Labels'],
    clients: ['Hoest'],
  },
  {
    slug: 'cosmetics',
    name: 'Cosmetics and personal care',
    summary: 'Premium cartons and rigid boxes for beauty and personal care.',
    detail: 'Beauty packaging is judged on touch as much as print. Soft-touch lamination, foil stamping and fitted inserts give cosmetic and fragrance ranges a finish worthy of the product.',
    formats: ['Folding cartons', 'Rigid gift boxes', 'Labels'],
    clients: ['Gipsy Cosmetics'],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants and food service',
    summary: 'Branded takeaway boxes and bags for daily service.',
    detail: 'Takeaway packaging is used every day and seen in every delivery. We supply printed food boxes and carry bags in quantities that keep pace with service.',
    formats: ['Food boxes', 'Paper bags', 'Labels and stickers'],
    clients: ["Max's Chicken & Burgers", 'Meatler'],
  },
  {
    slug: 'healthcare',
    name: 'Hospitals and healthcare',
    summary: 'Printed packaging and stationery for hospitals and clinics.',
    detail: 'Hospitals and teaching institutions rely on consistent printed material for pharmacy, patient and administrative use, delivered on schedule.',
    formats: ['Paper bags', 'Labels', 'Cartons'],
    clients: ['National Hospital & Medical Centre', 'Pak Red Crescent Teaching Hospital'],
  },
  {
    slug: 'e-commerce',
    name: 'E-commerce and retail',
    summary: 'Mailers, shipping cartons and bags for brands that deliver.',
    detail: 'For online and retail brands the box is the first physical contact with the customer. Printed mailers and shipping cartons protect the order and present the brand when it is opened.',
    formats: ['Mailer boxes', 'Corrugated shipping boxes', 'Paper bags'],
    clients: [],
  },
];

/** Production steps and presses (the site never states how many presses there are). */
export const process = [
  { step: 'Prepress', title: 'Dielines and proofs', text: 'We prepare the dieline, check artwork and colour, and supply a proof for your approval before a single sheet is printed.' },
  { step: 'Printing', title: 'Offset printing', text: 'Heidelberg four-colour offset gives accurate, repeatable colour, from the first run to every reorder.' },
  { step: 'Finishing', title: 'Converting and finishing', text: 'Lamination, UV and foil, then die-cutting, creasing and gluing, all completed in the same facility.' },
  { step: 'Dispatch', title: 'Inspection and delivery', text: 'Each batch is counted, inspected and packed, then delivered on the date confirmed with your order.' },
];

export const presses = [
  { name: 'Heidelberg four-colour offset', use: 'Full-colour cartons and long runs' },
  { name: 'Heidelberg GTO 52', use: 'Labels, leaflets and shorter runs' },
  { name: 'Solna 125', use: 'Additional capacity for volume orders' },
];
