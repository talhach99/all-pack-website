/**
 * Guides (blog). Written for search, answer engines and AI assistants:
 * - `summary` is the direct answer, shown first and used as the article description.
 * - Headings are phrased as the sub-questions people ask; each section opens with its answer.
 * - `faqs` render on the page and as FAQPage structured data.
 * - Inline links use [text](/path). Images are the studio renders in public/renders/ (no stock photos).
 * Keep facts consistent with the rest of the site: no invented figures, no counts of presses.
 */
import { US_ARTICLES } from './articles-us';

export type Block =
  | string
  | { ul: string[] }
  | { ol: string[] }
  | { table: { head: string[]; rows: string[][]; caption?: string } }
  | { img: { src: string; alt: string; width: number; height: number; caption: string } }
  /** Highlighted advice box. */
  | { tip: { title: string; text: string } }
  /** Large pull statement. */
  | { quote: string }
  /** Numbered process strip (title + one-line explanation per step). */
  | { steps: { title: string; text: string }[] };

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  summary: string;
  /** Four or five bullet points shown in the "Key takeaways" box at the top. */
  takeaways?: string[];
  /** Which office the article's quote buttons go to: 'us' (Boston) or 'pk' (Lahore). */
  market?: 'us' | 'pk';
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  /** cover: the picture is a full photo that fills its frame (no padding). */
  hero: { src: string; alt: string; width: number; height: number; cover?: boolean };
  sections: { heading: string; body: Block[] }[];
  faqs: { q: string; a: string }[];
  related: string[];
};

const PK_ARTICLES: Article[] = [
  {
    slug: 'custom-packaging-boxes-lahore',
    title: 'Custom Packaging Boxes in Lahore: Types, Materials and How to Order',
    category: "Buyer's guide",
    excerpt: 'Which custom box suits your product, how to choose board and finishes, and how to order printed packaging in Lahore with confidence.',
    summary: "Custom packaging boxes are made to your product's dimensions, board grade and artwork. In Lahore the main choices are folding cartons for retail products, rigid boxes for premium gifting, mailer boxes for e-commerce and corrugated boxes for shipping. Choose the structure by how the product is sold, then the board by weight and protection, then the print finish by brand.",
    keywords: ['custom packaging boxes Lahore', 'custom printed boxes Pakistan', 'packaging company in Lahore', 'box manufacturer Lahore', 'folding cartons', 'rigid gift boxes', 'mailer boxes'],
    publishedAt: '2026-11-21',
    updatedAt: '2026-11-21',
    hero: { src: '/renders/packaging-range-1400.webp', alt: 'A range of custom printed packaging boxes made by ALL PACK in Lahore', width: 1400, height: 872 },
    sections: [
      {
        heading: 'What are custom packaging boxes?',
        body: [
          "Custom packaging boxes are boxes cut, printed and finished to a specific brief instead of being bought from a stock catalog. The brief fixes the internal dimensions, the board, the printed artwork and the finishing, so the box fits one product closely and carries one brand.",
          "For a business in Lahore the practical benefit is control. A close fit reduces movement and damage in transit, printed branding turns every parcel or shelf into advertising, and repeat orders match the first one because the dieline and the approved proof stay on file.",
        ],
      },
      {
        heading: 'Which type of custom box is right for your product?',
        body: [
          'Choose the structure by how the product is sold and handled, not by price alone. A biscuit brand, a jeweler and an online clothing store each need a different box, even if the board is similar. The table summarizes the six formats most Pakistani brands ask for.',
          {
            table: {
              caption: 'Custom box formats compared',
              head: ['Box type', 'Best for', 'Usual board', 'Main advantage'],
              rows: [
                ['Folding carton', 'Biscuits, cosmetics, supplements, retail goods', 'SBS or duplex board', 'Economical in volume, ships flat'],
                ['Pharmaceutical carton', 'Tablets, syrups, leaflets and inserts', 'SBS or duplex board', 'Exact text and consistent color'],
                ['Rigid gift box', 'Jewelry, apparel, corporate gifts', 'Rigid board with printed wrap', 'Premium look and feel'],
                ['Mailer box', 'E-commerce orders, subscriptions', 'E-flute corrugated or kraft', 'Prints inside and out, self-locking'],
                ['Corrugated shipping box', 'Dispatch cartons and bulk freight', 'Single or double wall corrugated', 'Protection in transit'],
                ['Food box', 'Pizza, cake, burger and bakery', 'Food-grade board', 'Suitable for food contact'],
              ],
            },
          },
          'Each format is covered, with styles, board and finishes, on the [products page](/products). If you are unsure between two formats, send the product dimensions and weight and we will recommend one.',
          { img: { src: '/renders/mailer-boxes.webp', alt: 'Open kraft mailer box with a white interior', width: 1155, height: 964, caption: 'A mailer box: printed inside and out, it protects the product and presents it when opened.' } },
        ],
      },
      {
        heading: 'How do you choose the right board?',
        body: [
          'Board decides how the box looks, how much it protects and what it costs. Match it to the weight of the product and to the print quality you need.',
          {
            ul: [
              'SBS (solid bleached sulfate) board has a clean white surface that prints sharp, saturated color. It suits pharmaceutical, cosmetic and retail cartons.',
              'Duplex board has a white printed face and a gray back. It is a cost-efficient choice for biscuits, tea, toys and other dry goods.',
              'Kraft board has a natural brown surface that gives an honest, earthy look. Colors print slightly darker and softer than on white board.',
              'E-flute corrugated board is thin enough to print well yet stiff enough to ship, which is why it is the usual choice for mailer boxes.',
            ],
          },
          'Heavier or fragile products need a stronger board or a double wall. Tell us the weight and how the box will travel, and we will specify the grade.',
        ],
      },
      {
        heading: 'What printing and finishing options are available?',
        body: [
          'Most custom boxes are printed by offset lithography. It reproduces fine detail and holds color across repeat runs, using CMYK process colors with Pantone references where a brand color must match exactly. Because offset carries a fixed setup cost per design, the unit price falls as quantity rises.',
          'Finishing changes how the box feels and how long it lasts. The common options are gloss, matte and soft-touch lamination, varnish, spot UV, foil stamping, embossing and debossing, and window patching for food and gift boxes. A single well-chosen finish, such as foil on the logo alone, often does more for a brand than covering the whole box.',
        ],
      },
      {
        heading: 'How do you order custom packaging boxes in Lahore?',
        body: [
          'The process is straightforward when the brief is clear. These are the seven steps from first message to delivery.',
          {
            ol: [
              'Measure the product (length, width, height) and note its weight.',
              'Pick the box format and board from the table above.',
              'Send the dimensions, quantity, number of print colors and finishes you want, along with your logo or a photo of existing packaging.',
              'Receive the quotation, which confirms the lead time and delivery arrangement in writing.',
              'Review the dieline and proof prepared for your artwork.',
              'Approve the proof. Nothing is printed until it is signed off.',
              'Production, finishing and delivery follow, in Lahore or across Pakistan.',
            ],
          },
          'You can start on [WhatsApp or by email](/contact) with a logo and the product size.',
        ],
      },
      {
        heading: 'What should you look for in a packaging manufacturer?',
        body: [
          'Look for evidence that the same people control printing, finishing and quality. Four checks separate a dependable supplier from a broker:',
          {
            ul: [
              'In-house printing and finishing, so no step is passed to a subcontractor and delivery dates stay predictable.',
              'A documented quality system. ALL PACK is ISO 9001:2015 certified, and Halal certified for food-contact packaging.',
              'A proof process that ends in your signature, with reprints matched to the approved proof.',
              'Track record with regulated and repeat-order customers. ALL PACK has printed for pharmaceutical, bakery and hospital clients for more than 25 years.',
            ],
          },
          'Our production office is in Lahore, and visits are welcome by appointment. See [why brands choose ALL PACK](/about).',
        ],
      },
    ],
    faqs: [
      { q: 'What is the minimum order quantity for custom boxes?', a: 'It depends on the format, board and print method, because offset printing carries a fixed setup cost per design. Share the quantity you have in mind and ALL PACK will confirm what is practical and how the unit price changes with volume.' },
      { q: 'Can custom boxes be made to exact dimensions?', a: 'Yes. Almost everything is made to size. Send the length, width and height of the product, and its weight if it is heavy or fragile, and the structure and board are specified around it.' },
      { q: 'How long does production take?', a: 'Lead time depends on the format, quantity and finishing, and starts once the proof is approved. It is confirmed in writing with the quotation so you know the delivery date before ordering.' },
      { q: 'Which artwork files are needed?', a: 'Print-ready vector artwork, ideally a PDF or Adobe Illustrator file with fonts outlined and colors in CMYK or Pantone. For a quotation, a logo or a photograph of existing packaging is enough.' },
      { q: 'Do you deliver outside Lahore?', a: 'Yes, ALL PACK delivers across Pakistan. Include your delivery city with the inquiry and the arrangement is added to the quotation.' },
    ],
    related: ['custom-box-printing-cost-pakistan', 'pharmaceutical-carton-printing-pakistan'],
  },

  {
    slug: 'custom-box-printing-cost-pakistan',
    title: 'How Much Do Custom Printed Boxes Cost in Pakistan? 8 Factors That Set the Price',
    category: 'Pricing guide',
    excerpt: 'There is no single price per box. These eight factors decide what custom printed boxes cost, and how to get an accurate quotation.',
    summary: 'The price of custom printed boxes in Pakistan depends on eight factors: box size and structure, board, print colors and coverage, finishes, quantity, tooling, artwork changes and delivery. Quantity and board usually move the unit price most, because setup cost is shared across the run. Send exact dimensions, quantity and finishes to get an accurate quotation.',
    keywords: ['custom printed boxes price Pakistan', 'packaging printing cost Lahore', 'box printing cost', 'packaging quotation Pakistan', 'custom box minimum order', 'offset printing cost'],
    publishedAt: '2026-11-21',
    updatedAt: '2026-11-21',
    hero: { src: '/renders/rigid-gift-boxes.webp', alt: 'Navy rigid gift box with a gold band and foil logo', width: 1400, height: 741 },
    sections: [
      {
        heading: 'Why is there no fixed price for custom boxes?',
        body: [
          'A custom box is manufactured to one brief, so its price is built from that brief. Two boxes that look similar can cost very differently once the board, the print coverage and the finish are counted. This is why a responsible printer asks for dimensions, quantity and artwork before quoting, rather than publishing a single rate.',
          'The useful question is therefore not "what does a box cost?" but "which choices move the price, and by how much?" The eight factors below answer it in the order they usually matter.',
        ],
      },
      {
        heading: '1. Box size and structure',
        body: [
          'Size sets how much board each box consumes, and structure sets how much work it takes to make. A plain tuck-end carton is quick to cut and fold. A rigid box is assembled in stages and costs more per unit. A box that is even a few millimeters larger than needed also wastes board across the whole run, so measure the product accurately.',
        ],
      },
      {
        heading: '2. Board type and thickness',
        body: [
          'SBS board prints the cleanest color and costs more than duplex board with a gray back. Kraft suits natural looks, and corrugated adds strength with extra material. Choosing a heavier grade than the product needs raises the price without improving the result, so match the board to the weight and the way the box will travel.',
        ],
      },
      {
        heading: '3. Print colors and coverage',
        body: [
          'A one-color logo on kraft is far simpler than full-color artwork across every panel. Each additional spot color, and each panel printed inside as well as outside, adds ink and printing time. Brand colors specified as Pantone references print consistently but may add a color to the job.',
        ],
      },
      {
        heading: '4. Finishes: lamination, UV, foil and embossing',
        body: [
          'Every finish is an extra process. Varnish is the lightest. Lamination, spot UV, foil stamping and embossing each add material, tooling or handling. Use them where they earn their place: foil on the logo alone, for example, gives a premium signal without finishing the entire surface.',
        ],
      },
      {
        heading: '5. Quantity and setup cost',
        body: [
          'Offset printing carries a fixed setup cost per design: plates, make-ready and color matching. That cost is shared across the run, so unit price falls as quantity rises. Ordering a larger run of a stable design is usually cheaper per box than repeated small runs, provided you can store the stock.',
        ],
      },
      {
        heading: '6. Dieline and cutting tools',
        body: [
          'A box needs a dieline, the flat pattern that shows every cut and fold. A new structure needs a cutting die made for it, while a standard structure may reuse one. Reusing a die across reorders is one reason repeat orders cost less than the first.',
        ],
      },
      {
        heading: '7. Artwork preparation and changes',
        body: [
          'Print-ready artwork, with fonts outlined, colors set up correctly and bleed added, avoids correction time. Changes after the proof is approved can mean new plates, so check text, spelling and barcodes before signing off. See the [artwork requirements](/how-it-works#artwork) for the file formats we need.',
        ],
      },
      {
        heading: '8. Lead time and delivery',
        body: [
          'Urgent jobs can need overtime or re-planned production time, and delivery to another city adds freight. Lead time starts when the proof is approved, so approving promptly is the cheapest way to save time.',
        ],
      },
      {
        heading: 'How do you get an accurate quotation?',
        body: [
          'A quotation is only as exact as the brief behind it. Send these details and you will usually receive a firm figure rather than a range:',
          {
            ul: [
              'Product dimensions (length × width × height) and weight.',
              'The box format you prefer, or a photo of the product so we can suggest one.',
              'Quantity, and whether you expect to reorder.',
              'Number of colors and any special finishes such as foil, spot UV or embossing.',
              'Your logo or existing artwork, and the delivery city.',
            ],
          },
          'Send these through [WhatsApp or email](/contact). The quotation confirms the lead time and delivery arrangement in writing.',
          { img: { src: '/renders/rigid-gift-boxes.webp', alt: 'Rigid gift box with a gold band and foil logo on the lid', width: 1400, height: 741, caption: 'A rigid box with foil costs more than a plain folding carton, so use premium finishes where customers will notice them.' } },
        ],
      },
      {
        heading: 'Which mistakes make custom boxes cost more than they should?',
        body: [
          'Most avoidable cost comes from late or unclear decisions rather than from the box itself. These are the mistakes we see most often:',
          {
            ul: [
              'Guessing the product size, then discovering the box is too tight or too loose and remaking it.',
              'Choosing a premium finish for every panel instead of the one area customers notice.',
              'Changing text, colors or barcodes after the proof is approved, which can mean new plates.',
              'Comparing quotations that specify different boards, finishes or quantities, so the lowest figure is not like for like.',
              'Ordering a very small run of a design that will clearly be reordered, paying the setup cost again each time.',
            ],
          },
          'A short written specification, with board, colors, finishes and quantity listed line by line, makes quotations comparable and prevents surprises on the invoice.',
        ],
      },
      {
        heading: 'How can you reduce packaging cost without weakening the box?',
        body: [
          {
            ul: [
              'Standardize sizes across products so one die and one board serve several items.',
              'Print fewer colors, or use one strong brand color with white space.',
              'Choose one meaningful finish instead of several.',
              'Order the quantity you will actually use over a season, not the smallest run.',
              'Approve the proof on time and avoid late artwork changes.',
            ],
          },
          'None of these lowers protection or print quality. They remove cost that the customer never sees.',
        ],
      },
    ],
    faqs: [
      { q: 'How much do custom printed boxes cost in Pakistan?', a: 'It depends on size, board, print, finish and quantity, so there is no single rate. The most reliable way to learn the price is to send dimensions, quantity and finishes and receive a written quotation.' },
      { q: 'Is a larger order cheaper per box?', a: 'Usually yes. Offset printing has a fixed setup cost per design, and a larger run spreads it across more boxes, so the unit price falls as quantity rises.' },
      { q: 'Which finish adds the most cost?', a: 'Foil stamping, embossing and soft-touch lamination are the more expensive finishes. Varnish is the lightest. A single targeted finish usually gives the best value.' },
      { q: 'Does the quotation include delivery?', a: 'The delivery arrangement is included in the quotation. Share your delivery city when you inquire.' },
      { q: 'Can I get a quotation before sending final artwork?', a: 'Yes. For a quotation, your logo or a photograph of existing packaging is enough. Final print-ready files are needed for production.' },
    ],
    related: ['custom-packaging-boxes-lahore', 'pharmaceutical-carton-printing-pakistan'],
  },

  {
    slug: 'pharmaceutical-carton-printing-pakistan',
    title: 'Pharmaceutical Carton Printing in Pakistan: What Manufacturers Should Look For',
    category: 'Pharmaceutical packaging',
    excerpt: 'How to specify pharmaceutical cartons: board, structure, coding areas, leaflets and the checks that keep every batch matching the approved artwork.',
    summary: 'A pharmaceutical carton protects the medicine, identifies it and carries the regulated text. The printer must reproduce approved artwork exactly, keep color consistent between batches and leave clean areas for batch coding. Choose SBS or duplex board, a structure such as tuck-end or crash-lock, and a printer with a documented quality system such as ISO 9001:2015.',
    keywords: ['pharmaceutical carton printing Pakistan', 'medicine packaging Lahore', 'pharma packaging manufacturer', 'tablet carton printing', 'leaflet and insert printing', 'SBS board cartons', 'pharmaceutical packaging printing'],
    publishedAt: '2026-11-21',
    updatedAt: '2026-11-21',
    hero: { src: '/renders/pharmaceutical-cartons-v2.webp', alt: 'Printed pharmaceutical tablet carton in white and navy', width: 1400, height: 649 },
    sections: [
      {
        heading: 'What does a pharmaceutical carton do?',
        body: [
          'A pharmaceutical carton has three jobs. It protects the product from light, handling and damage. It identifies the medicine clearly so the right product reaches the right patient. And it carries the regulated information that must stay legible for the life of the product.',
          'Because of the third job, pharmaceutical printing is judged differently from retail packaging. A beautiful carton with one wrong character is a failed carton. The standard is accuracy first, appearance second.',
        ],
      },
      {
        heading: 'What information must the carton carry?',
        body: [
          'The exact content of each carton is set by the product registration and the labeling rules that apply to it, and your regulatory affairs team confirms it. The printer reproduces approved artwork; it does not write or alter the text. Typical elements include:',
          {
            ul: [
              'Product name, strength and dosage form.',
              'Composition and pack size.',
              'Storage conditions and any warnings.',
              'Manufacturer name and address, and registration details where required.',
              'Barcode or code areas for tracking.',
              'A space for batch number, manufacturing date and expiry date.',
            ],
          },
          'Check every item against the approved artwork before you sign the proof, because the proof is the reference for the whole print run.',
        ],
      },
      {
        heading: 'Which board and structure suit medicine cartons?',
        body: [
          'Most medicine cartons use SBS board, whose clean white surface prints small text and fine color tints sharply. Duplex board, with a gray back, is a lower-cost option for products where appearance is less critical. The structure then depends on how the pack is filled and opened.',
          {
            table: {
              caption: 'Common pharmaceutical carton choices',
              head: ['Choice', 'Typical use', 'Why it is used'],
              rows: [
                ['SBS board', 'Tablets, capsules, ointments', 'Sharp small text and consistent color'],
                ['Duplex board', 'Cost-sensitive generic ranges', 'Economical with a printable white face'],
                ['Tuck-end carton', 'Blister packs, bottles, tubes', 'Simple to fill and reclose'],
                ['Crash-lock bottom', 'Bottles and heavier packs', 'Self-assembling, holds weight'],
                ['Leaflet or insert', 'Patient information', 'Folded paper carried inside the carton'],
              ],
            },
          },
          'See the available styles on the [pharmaceutical cartons page](/products#pharma).',
        ],
      },
      {
        heading: 'How is color and text kept consistent between batches?',
        body: [
          'Consistency comes from process, not luck. The printer prepares a dieline and a proof for approval, and every reprint is matched to the signed proof, so the carton in the third batch looks like the carton in the first. For color-critical work a physical proof is the safest reference.',
          'Design choices help too. Keep body text large enough to stay legible after printing, keep strong contrast between text and background, and avoid fine type reversed out of a dark solid, where small errors in registration show first.',
        ],
      },
      {
        heading: 'Why leave a clean area for batch coding?',
        body: [
          'Batch number, manufacturing date and expiry date are normally applied after printing, by inkjet or hot-foil coding on your packing line. Ink and foil do not adhere well to a varnished or laminated surface, so the coding panel should be left uncoated or specified with the coding method in mind.',
          'Agree the position and size of that area with your packing team before the artwork is finalized. It is a small decision that prevents smudged codes, rejected batches and costly reprints.',
        ],
      },
      {
        heading: 'What finishes are suitable for pharmaceutical cartons?',
        body: [
          'Varnish protects against scuffing in transit. Lamination adds durability and a premium feel. Spot UV, foil stamping and embossing can highlight a brand name or help distinguish similar products on a pharmacy shelf. Use finishes sparingly, keep them away from the coding area and from text that must stay legible, and confirm each choice on the proof.',
          { img: { src: '/renders/labels-stickers-v2.webp', alt: 'Jar with a printed product label beside a roll of labels', width: 1367, height: 1052, caption: 'Labels and stickers follow the same rule as cartons: print exactly what has been approved.' } },
        ],
      },
      {
        heading: 'How should you prepare pharmaceutical carton artwork?',
        body: [
          'Good preparation shortens approval and prevents errors reaching print. Send print-ready vector artwork, ideally a PDF or Adobe Illustrator file, with fonts outlined and colors set in CMYK or as Pantone references. Add the dieline supplied for your structure and keep all text inside the safe area so nothing is lost at the fold or cut.',
          'Barcodes need particular care. Keep them at the size and contrast your scanners require, print them in a dark color on a light background, and never scale them to fit a panel. Finally, have the artwork checked by the people responsible for regulatory approval before it is sent for proofing.',
        ],
      },
      {
        heading: 'Which mistakes cause pharmaceutical cartons to be rejected?',
        body: [
          {
            ul: [
              'Approving a proof without proofreading every line against the registered text.',
              'Varnishing or laminating the area where batch and expiry codes are applied.',
              'Using type too small or too light to stay legible after printing.',
              'Letting an older version of the artwork be printed after a change.',
              'Changing board or supplier mid-product without checking the effect on print and packing-line performance.',
            ],
          },
          'Each of these is avoidable with a version-controlled approval step and one named person who signs the proof.',
        ],
      },
      {
        heading: 'How do you choose a pharmaceutical carton printer?',
        body: [
          'Ask how the printer controls the things that can go wrong:',
          {
            ul: [
              'A documented quality system. ALL PACK is ISO 9001:2015 certified.',
              'A proof and sign-off process, so nothing is printed without your approval.',
              'Color matching to the approved proof on every reprint.',
              'In-house printing and finishing, so no step is handed to an unknown subcontractor.',
              'Experience with regulated customers. ALL PACK has printed cartons and leaflets for pharmaceutical clients for more than 25 years.',
            ],
          },
          'See how this fits the wider sector on our [pharmaceutical industry page](/industries#pharma), or [send your artwork or a sample carton](/contact) for a quotation.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you print pharmaceutical cartons to approved artwork?', a: 'Yes. ALL PACK prints pharmaceutical cartons and leaflets to approved artwork. A dieline and a proof are prepared for your approval, and nothing is printed until it is signed off.' },
      { q: 'Which board is used for medicine cartons?', a: 'SBS board is the usual choice for its clean white surface and sharp print. Duplex board is an economical alternative. Your requirements and budget decide which is suitable.' },
      { q: 'Can leaflets and inserts be printed with the cartons?', a: 'Yes. Leaflets and inserts are part of the pharmaceutical range, so cartons and patient information can be produced together and kept in step.' },
      { q: 'How do you keep color consistent across reprints?', a: 'Every reprint is matched to the signed proof, so text and color stay consistent from one batch to the next. For color-critical work, a physical proof can be produced.' },
      { q: 'Is ALL PACK certified?', a: 'ALL PACK is ISO 9001:2015 certified for quality management and Halal certified for food-contact packaging.' },
    ],
    related: ['custom-packaging-boxes-lahore', 'custom-box-printing-cost-pakistan'],
  },
];

/** Newest first: the US-market guides, then the Pakistan guides. */
export const articles: Article[] = [...US_ARTICLES, ...PK_ARTICLES];

export const getArticle = (slug: string) => articles.find(a => a.slug === slug);

/** Words in the visible article text (sections and FAQs), used for reading time and structured data. */
export function wordCount(a: Article): number {
  const t = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').split(/\s+/).filter(Boolean).length;
  let n = t(a.summary) + (a.takeaways ?? []).reduce((x, i) => x + t(i), 0);
  for (const s of a.sections) {
    n += t(s.heading);
    for (const b of s.body) {
      if (typeof b === 'string') n += t(b);
      else if ('ul' in b) n += b.ul.reduce((x, i) => x + t(i), 0);
      else if ('ol' in b) n += b.ol.reduce((x, i) => x + t(i), 0);
      else if ('table' in b) n += [...b.table.head, ...b.table.rows.flat()].reduce((x, i) => x + t(i), 0);
      else if ('tip' in b) n += t(b.tip.title) + t(b.tip.text);
      else if ('quote' in b) n += t(b.quote);
      else if ('steps' in b) n += b.steps.reduce((x, i) => x + t(i.title) + t(i.text), 0);
    }
  }
  for (const f of a.faqs) n += t(f.q) + t(f.a);
  return n;
}
export const readMinutes = (a: Article) => Math.max(1, Math.round(wordCount(a) / 220));
export const slugify = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
