/**
 * Homepage content. Photos are free Unsplash images, hotlinked as Unsplash asks
 * (images.unsplash.com is allowed in the CSP). Machine photos are stand-ins until
 * the owner's own photos of the presses are added.
 */
export const unsplash = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  pressRollers: 'photo-1758183961426-88d64eb5f787', // Aleksandr Galichkin
  pressOperator: 'photo-1663433567177-9f94be0bff4c', // Anthony Roberts
  pressFactory: 'photo-1663433541063-ddab084d1126', // Anthony Roberts
  pressDark: 'photo-1581508512961-0e3b9524db40', // Lennert Naessens
  cutter: 'photo-1693031630146-568e2f72db0e', // Geri Sakti
  labels: 'photo-1773525912464-d2640e7aff9c', // Anthony Roberts
  qcLoupe: 'photo-1715154470884-1c2be0b0129f', // Jakub Żerdzicki
  pharmaBox: 'photo-1550572017-4fcdbb59cc32', // Brett Jordan
  pharmaPills: 'photo-1471864190281-a93a3070b6de', // freestocks
  vials: 'photo-1576671081837-49000212a370', // National Cancer Institute
  bakery: 'photo-1720091382934-fc9fdff94857', // Isabelle Tombleson
  coffeeBags: 'photo-1633533452148-a9657d2c9a5f', // MK +2
  giftBoxes: 'photo-1764650909534-ebe7b1206466', // David Trinks
  cartonStack: 'photo-1624137527136-66e631bdaa0e', // Kadarius Seegars
  mailer: 'photo-1585221330389-24fb30535ec7', // Packhelp
  printedBoxes: 'photo-1617825295690-28ae56c56135', // Tarah Dane
  paperBags: 'photo-1513884923967-4b182ef167ab', // freestocks
  warehouse: 'photo-1553413077-190dd305871c', // Ruchindra Gunasekara
  rackBoxes: 'photo-1587293852726-70cdb56c2866', // CHUTTERSNAP
} as const;

export const tickerPoints = [
  'More than 25 years of printing',
  'In-house Heidelberg offset printing',
  'Printed to approved artwork',
  'Die-cutting, lamination and gluing',
  'Trusted by pharma and food brands',
  'Clear quotes before print',
  'Delivery across Pakistan',
];

/** What we print, grouped the way buyers think about it. Formats link to their product pages. */
export const sectors = [
  {
    name: 'Pharmaceutical',
    d: 'Cartons, inserts and labels printed to your approved artwork, with the exact text and colour your regulator signed off.',
    img: '/work/aloram-carton.webp', contain: true,
    formats: [['Folding cartons', '/products/folding-cartons'], ['Labels and stickers', '/products/labels-stickers'], ['Corrugated shippers', '/products/corrugated-shipping-boxes']],
    href: '/industries/pharmaceutical',
  },
  {
    name: 'Food and bakery',
    d: 'Cake, rusk and confectionery cartons, window boxes and bread wrappers for bakeries and food brands.',
    img: '/work/citi-queen-cake-mango.webp', contain: false,
    formats: [['Cake and bakery boxes', '/products/cake-boxes'], ['Folding cartons', '/products/folding-cartons'], ['Takeaway containers', '/products/takeaway-containers']],
    href: '/industries/bakeries',
  },
  {
    name: 'Retail and e-commerce',
    d: 'Rigid gift boxes, printed mailers, paper bags and shipping cartons for brands that sell in shops and online.',
    img: unsplash(IMG.giftBoxes, 900), contain: false,
    formats: [['Rigid gift boxes', '/products/rigid-gift-boxes'], ['E-commerce mailers', '/products/ecommerce-mailer-boxes'], ['Paper bags', '/products/kraft-shopping-bags']],
    href: '/industries/e-commerce',
  },
];

export const machines = [
  { name: 'Heidelberg 4-colour offset', type: 'Four-colour sheetfed offset', d: 'All four process colours in a single pass, for sharp, consistent colour across long carton runs.', best: ['Pharma cartons', 'Food cartons', 'Retail packaging'], img: IMG.pressRollers },
  { name: 'Heidelberg GTO 52', type: 'Small-format offset', d: 'A precise small-format press for labels, inserts, leaflets and shorter runs that still need offset quality.', best: ['Labels', 'Leaflets and inserts', 'Short runs'], img: IMG.pressOperator },
  { name: 'Solna 125', type: 'Offset press', d: 'A workhorse offset press that adds capacity for larger orders and keeps delivery dates on schedule.', best: ['Volume runs', 'Wrappers', 'Cartons'], img: IMG.pressDark },
  { name: 'Finishing line', type: 'Post-press', d: 'Die-cutting, creasing, lamination, varnish and gluing, so every sheet leaves as a finished box.', best: ['Die-cutting and creasing', 'Lamination and varnish', 'Folding and gluing'], img: IMG.cutter },
];

export const steps = [
  { t: 'Send your brief', d: 'Product, size and quantity on WhatsApp or email. A photo or an old box is enough to start.' },
  { t: 'Proof and price', d: 'We suggest the board, structure and finish, and confirm the price and delivery date in writing.' },
  { t: 'Print and finish', d: 'Printed on our own presses, then die-cut, laminated and glued.' },
  { t: 'Delivered', d: 'Checked against the proof, packed by quantity and delivered across Pakistan.' },
];

export const reasons = [
  { t: 'Machines in house', d: 'Printing and finishing under one roof, so colour, quality and dates stay in our hands.' },
  { t: 'Printed to approved artwork', d: 'Pharmaceutical and food clients rely on exact text, colour and batch-to-batch consistency.' },
  { t: 'One supplier', d: 'From the label to the shipping carton, one team and one point of contact.' },
  { t: 'Straight answers', d: 'A clear yes or no on what will work, and a price before anything is printed.' },
];
