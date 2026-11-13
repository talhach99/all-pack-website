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
  '25+ years of printing experience',
  'In-house Heidelberg offset printing',
  'Printed to approved artwork',
  'Die-cutting, lamination and gluing',
  'Trusted by pharma and food brands',
  'Clear quotes before print',
  'Delivery across Pakistan',
];

export const homeProducts = [
  { t: 'Pharmaceutical cartons', d: 'Tablet, syrup and tube cartons printed to approved artwork.', img: IMG.pharmaBox, href: '/industries/pharmaceutical' },
  { t: 'Food and bakery cartons', d: 'Cake, rusk and confectionery cartons with window options.', img: IMG.bakery, href: '/products/cake-boxes' },
  { t: 'Rigid gift boxes', d: 'Wrapped boxes, drawers and magnetic lids for premium gifting.', img: IMG.giftBoxes, href: '/products/rigid-gift-boxes' },
  { t: 'Folding cartons', d: 'Full-colour retail cartons for shelf-ready products.', img: IMG.printedBoxes, href: '/products/folding-cartons' },
  { t: 'Corrugated shipping boxes', d: 'Single and double wall cartons for transport and storage.', img: IMG.cartonStack, href: '/products/corrugated-shipping-boxes' },
  { t: 'E-commerce mailers', d: 'Printed mailer boxes that arrive in one piece.', img: IMG.mailer, href: '/products/ecommerce-mailer-boxes' },
  { t: 'Paper bags', d: 'Printed paper bags with rope or twisted handles.', img: IMG.paperBags, href: '/products/kraft-shopping-bags' },
  { t: 'Labels and stickers', d: 'Product labels and stickers in sheets or rolls.', img: IMG.labels, href: '/products/labels-stickers' },
];

export const machines = [
  { name: 'Heidelberg 4-colour offset', type: 'Four-colour sheetfed offset', d: 'All four process colours in a single pass, for sharp, consistent colour across long carton runs.', best: ['Pharma cartons', 'Food cartons', 'Retail packaging'], img: IMG.pressRollers },
  { name: 'Heidelberg GTO 52', type: 'Small-format offset', d: 'A precise small-format press for labels, inserts, leaflets and shorter runs that still need offset quality.', best: ['Labels', 'Leaflets and inserts', 'Short runs'], img: IMG.pressOperator },
  { name: 'Solna 125', type: 'Offset press', d: 'A workhorse offset press that adds capacity for larger orders and keeps delivery dates on schedule.', best: ['Volume runs', 'Wrappers', 'Cartons'], img: IMG.pressDark },
  { name: 'Finishing line', type: 'Post-press', d: 'Die-cutting, creasing, lamination, varnish and gluing, so every sheet leaves as a finished box.', best: ['Die-cutting and creasing', 'Lamination and varnish', 'Folding and gluing'], img: IMG.cutter },
];

export const homeIndustries = [
  { name: 'Pharmaceutical', label: 'Healthcare', img: IMG.pharmaPills, href: '/industries/pharmaceutical' },
  { name: 'Food and bakery', label: 'Food', img: IMG.bakery, href: '/industries/bakeries' },
  { name: 'FMCG and confectionery', label: 'Consumer goods', img: IMG.coffeeBags, href: '/products' },
  { name: 'Hospitals and healthcare', label: 'Healthcare', img: IMG.vials, href: '/industries/pharmaceutical' },
  { name: 'Retail and e-commerce', label: 'Retail', img: IMG.rackBoxes, href: '/industries/e-commerce' },
  { name: 'Industrial and logistics', label: 'Industrial', img: IMG.warehouse, href: '/industries' },
];

export const whyTrust = [
  { t: '25+ years on press', d: 'A quarter century of printing for brands across Pakistan. We know what holds up on the line and on the shelf.' },
  { t: 'Machines in house', d: 'Heidelberg 4-colour, GTO 52 and Solna 125 under one roof, so quality and timelines stay in our hands.' },
  { t: 'Printed to approved artwork', d: 'Pharmaceutical and food clients trust us with exact text, colour and batch consistency.' },
  { t: 'Print to finished box', d: 'Printing, die-cutting, lamination and gluing in one place. One supplier, one point of contact.' },
  { t: 'Clear quotes', d: 'Specification, price and delivery date confirmed in writing before anything is printed.' },
  { t: 'Delivered on time', d: 'Packed by quantity and delivered on the agreed date, across Pakistan.' },
];
