import { COMPANY } from '@/lib/company';

export const faqs = [
  { q: 'What is your minimum order quantity?', a: 'Minimums depend on the format, board and print method, because offset printing carries a fixed setup cost per design. Tell us the quantity you have in mind and we will confirm what is practical and how the unit price changes with volume.' },
  { q: 'Can you make packaging to our exact dimensions?', a: 'Yes. Almost everything we produce is made to size. Send the length, width and height of the product, with its weight if it is heavy or fragile, and we will specify the structure and board around it.' },
  { q: 'How long does production take?', a: 'Lead time depends on the format, quantity and finishing, and starts once the proof is approved. It is confirmed in writing with your quotation, so you know the delivery date before you place the order.' },
  { q: 'Which artwork files do you need?', a: 'For production we need print-ready vector artwork, ideally a PDF or Adobe Illustrator file with fonts outlined and colors in CMYK or specified Pantone references. For a quotation, a logo or a photograph of existing packaging is enough.' },
  { q: 'Will we see a proof before printing?', a: 'Always. We prepare a dieline and a proof for your approval, and nothing goes to press until it is signed off. For color-critical work we can produce a physical proof.' },
  { q: 'Do you produce food-grade and pharmaceutical packaging?', a: 'Yes. We print food boxes, bakery cartons and wrappers on food-grade board, and pharmaceutical cartons and leaflets to approved artwork. ALL PACK is ISO 9001:2015 and Halal certified.' },
  { q: 'Which finishes are available?', a: 'Gloss and matte lamination, soft-touch lamination, spot UV, varnish, foil stamping, embossing and debossing, and window patching. We will recommend the finish that suits the product and the budget.' },
  { q: 'Do you deliver outside Lahore?', a: 'Yes, we deliver across Pakistan. Share your delivery city with your inquiry and the delivery arrangement will be included in your quotation.' },
  { q: 'Where is your office?', a: `Our head office is at ${COMPANY.address}. Visits are welcome by appointment; please message us on WhatsApp at ${COMPANY.phone} beforehand.` },
];
