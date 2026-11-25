import type { Article } from './articles';

/**
 * Guides written for US buyers (Boston office). US English, formal tone.
 * Facts must match the rest of the site: minimum order, production and shipping times come from
 * the US row in REGIONS (src/data/home.ts). No invented prices; cost sections explain what drives
 * the price and point readers to a quotation. Trade rules (tariffs, de minimis, carrier divisors)
 * were checked on 25 November 2026; review them when updating these articles.
 */
export const US_ARTICLES: Article[] = [
  {
    slug: 'custom-packaging-manufacturer-for-us-brands',
    title: 'Why US Brands Are Sourcing Custom Packaging From Overseas Manufacturers',
    category: 'Sourcing guide',
    market: 'us',
    excerpt: 'Cost, quality, lead times and import rules: an honest guide for US brands weighing an overseas custom packaging manufacturer, and what a local US contact changes.',
    summary: 'US brands source custom packaging overseas to get lower unit costs on printed boxes, a wider choice of finishes and responsive minimum order quantities. The trade-offs are longer lead times, freight and import duties. The arrangement works best with a certified manufacturer that proofs every job, quotes in US dollars and gives you a contact in your own time zone.',
    takeaways: [
      'Overseas manufacturing usually lowers the unit cost of printed packaging, but compare landed cost (unit price, freight, duties and brokerage), not the ex-factory price alone.',
      'Quality depends on process, not geography: ask for ISO 9001 certification, a signed digital proof and a physical sample before the full run.',
      'Plan around the calendar. Production and freight add weeks, so reorder before stock runs low and keep a buffer for peak season.',
      'Since August 2025, low-value commercial shipments no longer enter the US duty-free, so every import needs a proper customs entry.',
      'A US office, US dollar quotes and Eastern Time support remove most of the friction of buying from abroad.',
    ],
    keywords: ['custom packaging manufacturer for US brands', 'overseas packaging supplier', 'custom boxes from Pakistan', 'packaging sourcing USA', 'wholesale custom packaging', 'offshore packaging manufacturer', 'custom printed boxes USA'],
    publishedAt: '2026-11-25',
    updatedAt: '2026-11-25',
    hero: { src: '/renders/corrugated-shipping-boxes.webp', alt: 'ALL PACK branded corrugated shipping boxes ready for export to the USA', width: 1385, height: 884 },
    sections: [
      {
        heading: 'Why are US brands looking overseas for custom packaging?',
        body: [
          'Most US brands start looking overseas for one reason: the price of printed packaging at home has climbed faster than their margins. Board, ink, labor and freight have all become more expensive, and domestic converters often reserve their best pricing for very large accounts. A growing brand that orders a few thousand boxes at a time can find itself paying premium prices without premium service.',
          'Price is only the starting point, however. Brands that move part of their packaging overseas usually stay for four reasons:',
          {
            ul: [
              '**Unit cost.** Lower labor and overhead costs mean the same printed carton or mailer can be produced for less, even after freight.',
              '**Finishing choice.** Foil stamping, embossing, soft-touch lamination, spot UV, custom inserts and rigid boxes are routine work for an experienced overseas plant rather than special requests.',
              '**Accessible minimums.** Many overseas manufacturers accept runs in the hundreds or low thousands, which suits brands testing a new product or a seasonal design.',
              '**Capacity.** When domestic plants are booked solid ahead of the holidays, an overseas partner adds capacity without forcing you to compromise on the brief.',
            ],
          },
          'None of this makes overseas sourcing right for every order. Very urgent jobs, extremely bulky low-value cartons and packaging that changes every week are often better made close to the warehouse. For most branded cartons, mailers, rigid boxes, labels and pouches, though, the economics favor a capable overseas manufacturer.',
        ],
      },
      {
        heading: 'Is overseas packaging actually cheaper once you add freight and duties?',
        body: [
          'Overseas packaging is usually cheaper on a landed basis for printed, finished packaging, but the only way to know for your order is to compare landed cost. Landed cost is everything you pay to get the boxes into your warehouse: the unit price, freight, customs duties, brokerage fees and local delivery.',
          'Ex-factory prices from abroad can look dramatically lower than domestic quotes. That gap narrows once freight and duties are added, and the narrowing is largest for products that are bulky and light. A flat-packed folding carton ships efficiently; a fully assembled rigid box takes up far more space for the same number of units.',
          {
            table: {
              caption: 'What makes up landed cost',
              head: ['Cost element', 'What it covers', 'How to keep it down'],
              rows: [
                ['Unit price', 'Board, printing, finishing, die-cutting, gluing and packing', 'Standardize sizes, limit special finishes to where they show'],
                ['Tooling', 'Cutting dies and embossing or foil plates for a new design', 'Paid once per design; reuse the same dieline for reorders'],
                ['Freight', 'Air or ocean transport to your door or a US port', 'Ship flat where possible and consolidate orders'],
                ['Duties and fees', 'US customs duty on the product plus processing fees', 'Classify the goods correctly and check current rates before ordering'],
                ['Brokerage', 'Customs broker filing the import entry', 'Agree in advance who arranges and pays for it'],
              ],
            },
          },
          'The factors that move the unit price itself are the same anywhere in the world: box size, board grade, number of print colors, how much of the surface is printed, finishes, and quantity. Because setup work is shared across the run, the unit price falls as the quantity rises. We explain each of these in detail in our guide to [what custom printed boxes cost](/blog/custom-box-printing-cost-pakistan).',
          { tip: { title: 'Ask for an itemized quotation', text: 'A good overseas quotation separates the unit price, tooling, freight and delivery terms. If a supplier will only give you one lump sum, you cannot compare it fairly with a domestic quote, and you cannot see where the savings come from.' } },
          'At ALL PACK we do not publish a fixed price list, because two boxes of the same size can differ widely in cost depending on board and finish. Instead, US buyers receive an itemized quotation in US dollars with tiered pricing, so you can see how the unit price changes at 1,000, 2,500 or 5,000 pieces before you commit.',
        ],
      },
      {
        heading: 'How do you judge the quality of an overseas packaging supplier?',
        body: [
          'Judge an overseas packaging supplier by its process, not by its photographs. Polished images prove very little; a documented quality system, a proof you sign and a sample you can hold prove a great deal. The best suppliers make these checks easy because they rely on them too.',
          'Use this checklist before you place a first order:',
          {
            ul: [
              '**Certification.** ISO 9001 shows that the manufacturer runs a documented quality management system with controlled procedures and records. ALL PACK is ISO 9001:2015 certified, and Halal certified for food-contact packaging.',
              '**In-house production.** Ask which steps are done in-house. A manufacturer that prints, finishes and converts under one roof controls color, schedule and quality far better than a broker who passes your job to subcontractors.',
              '**Digital proof.** You should receive a proof showing your artwork on the dieline, with dimensions, colors and finishes marked. Nothing should be printed until you sign it.',
              '**Physical sample.** For a new structure or a color-critical brand, a physical sample before the full run is worth the short delay.',
              '**Color references.** Brand colors should be specified as Pantone references where an exact match matters, not left to interpretation.',
              '**Track record.** Ask which industries the supplier serves and how long it has been operating. ALL PACK has more than 25 years of experience and produces packaging for pharmaceutical, food, healthcare and consumer brands.',
            ],
          },
          { quote: 'Quality is not a question of where packaging is made. It is a question of whether the process is controlled, documented and signed off before the press starts.' },
          'Watch for warning signs as well: reluctance to share a proof, vague answers about board grades, quotations that change after approval, and no single contact who owns your order. Each of these tends to show up again later as a delay or a defect.',
        ],
      },
      {
        heading: 'How long does it take to get custom packaging from overseas?',
        body: [
          'Lead time from overseas has three parts: pre-production, production and shipping. Pre-production covers the quotation, artwork, proof and any sample. Production starts the day you approve the proof. Shipping depends on the mode you choose.',
          'For US orders, ALL PACK works to a published guide of 12 to 15 business days for production after proof approval and 5 to 8 business days for shipping to the US. The exact schedule for each order is confirmed in writing on the quotation, so you can plan a launch date around it rather than hoping for the best.',
          {
            steps: [
              { title: 'Brief and quotation', text: 'Send product size, quantity and finishes; receive an itemized USD quote.' },
              { title: 'Artwork and proof', text: 'We place your artwork on the dieline and send a digital proof.' },
              { title: 'Optional sample', text: 'A physical sample for new structures or color-critical work.' },
              { title: 'Production', text: 'Printing, finishing and converting begin once the proof is signed.' },
              { title: 'Shipping and delivery', text: 'Packed, documented and shipped to your US address.' },
            ],
          },
          'The practical lesson is simple: reorder earlier than you would from a local supplier. Set a reorder point that covers production and shipping time plus a safety margin, and place holiday orders well before the fourth-quarter rush, when freight capacity tightens worldwide.',
          { tip: { title: 'Keep the dieline on file', text: 'Reorders move much faster than first orders. Once your dieline, board and colors are approved, a repeat run skips most of the pre-production stage and is matched to the signed proof.' } },
        ],
      },
      {
        heading: 'What do tariffs and import rules mean for overseas packaging?',
        body: [
          'Every commercial shipment of packaging entering the US now needs a proper customs entry, and duties may apply depending on the product and its country of origin. The rules have changed often since 2025, so check current rates for your specific order before you commit, and treat any figure you read online, including here, as a starting point.',
          'Three points are worth understanding:',
          {
            ul: [
              '**De minimis is suspended.** Low-value shipments of $800 or less used to enter the US duty-free. That exemption was suspended for commercial shipments from all countries on August 29, 2025, and US Customs and Border Protection has since made the suspension indefinite in its regulations ([Federal Register notice](https://www.federalregister.gov/documents/2026/06/24/2026-12670/indefinite-suspension-of-the-de-minimis-exemption-for-merchandise-arriving-through-all-modes-other)). Small sample shipments and full orders alike are now filed as regular entries.',
              '**Country-level tariffs change.** In July 2026 the US introduced new Section 301 tariffs on imports from 60 trading partners. Pakistan was placed in the lower 10 percent category, alongside countries such as Canada, Mexico and the United Kingdom.',
              '**Classification matters.** Packaging is classified under the Harmonized Tariff Schedule according to what it is made of and how it is constructed. Correct classification decides the duty rate, so agree it with your customs broker at the start.',
            ],
          },
          'Delivery terms decide who handles these costs. Your quotation should state clearly whether the price covers delivery to your door, to a US port, or ends at the factory, and who acts as importer of record. Agreeing this in writing before production avoids surprise invoices when the goods arrive.',
          { tip: { title: 'Talk to a licensed customs broker', text: 'For regular imports, a licensed US customs broker is worth the fee. They will confirm the classification, the current duty rate and the paperwork your shipment needs before it leaves the factory.' } },
        ],
      },
      {
        heading: 'Why does a US office matter when you buy from overseas?',
        body: [
          'A US office removes the three biggest frustrations of buying overseas: time zones, currency and accountability. You speak to someone during your working day, you receive quotes and invoices in US dollars, and you have a named contact responsible for your order from brief to delivery.',
          'ALL PACK runs two offices for this reason. The Boston, Massachusetts office handles US quotations, artwork support and delivery, working on Eastern Time and quoting in US dollars. The Lahore, Pakistan office is the production hub, where printing, finishing and converting take place.',
          'The roughly 10-hour time difference between Boston and Lahore works in your favor. Questions you send at the end of your day can be answered by the production team overnight, and proofs revised while you sleep are often waiting for you in the morning. In effect, your packaging project moves forward around the clock.',
          'Accountability is the less visible benefit. When a question comes up about board, color or delivery, you do not need to chase a sales agent in another hemisphere or wait for a reply that arrives at midnight. One contact owns the order, relays your feedback to production and confirms each stage in writing. For a brand managing launches, inventory and marketing at the same time, that single line of communication is often worth as much as the cost savings.',
          'Payment is also familiar. US customers can pay by Visa, Mastercard, American Express, PayPal or Stripe, so there is no need to arrange international bank transfers for every order. You can find both offices and their contact details on our [offices page](/contact).',
        ],
      },
      {
        heading: 'How does ordering custom packaging from ALL PACK work?',
        body: [
          'Ordering is designed to feel like working with a local supplier. A dedicated contact guides each step, and nothing goes to print until you have approved it.',
          {
            ol: [
              'Send your product dimensions, weight, target quantity and any finishes you have in mind, together with your logo or existing packaging. You can use WhatsApp, email or the enquiry form.',
              'Receive an itemized quotation in US dollars with tiered volume pricing and the production and delivery schedule in writing.',
              'If you have no print-ready artwork, our team places your logo and brand colors on the dieline for you.',
              'Review the free digital proof and, if you wish, request a physical sample.',
              'Approve the proof. Production starts only after your sign-off.',
              'Your order is printed, finished, packed and shipped to your US address.',
            ],
          },
          'The minimum order for US customers starts from 500 units, which makes it practical to launch a new product or test a seasonal design without committing to tens of thousands of boxes. The full process is described on our [how it works page](/how-it-works).',
        ],
      },
      {
        heading: 'Which types of packaging are best to source overseas?',
        body: [
          'Printed, finished packaging that ships flat delivers the clearest savings when sourced overseas. The more design and finishing work a box involves, the larger the gap between overseas and domestic pricing tends to be.',
          {
            table: {
              caption: 'Packaging types and how well they suit overseas sourcing',
              head: ['Packaging type', 'Typical use', 'Fit for overseas sourcing'],
              rows: [
                ['Folding cartons', 'Cosmetics, supplements, retail goods', 'Excellent: ships flat, detailed printing and finishes'],
                ['Mailer boxes', 'E-commerce and subscription brands', 'Excellent: printed inside and out, ships flat'],
                ['Rigid gift boxes', 'Premium products and gifting', 'Very good: hand-finished work at a lower cost'],
                ['Labels and stickers', 'Product, shipping and seal labels', 'Excellent: light and compact to ship'],
                ['Stand-up pouches', 'Coffee, snacks, supplements', 'Very good: flat and lightweight'],
                ['Plain shipping cartons', 'Warehouse and bulk freight', 'Weaker: bulky and low in value, often better made locally'],
              ],
            },
          },
          { img: { src: '/renders/folding-cartons-v2.webp', alt: 'Printed folding cartons with the ALL PACK logo', width: 1266, height: 1394, caption: 'Folding cartons ship flat and carry detailed printing, which makes them one of the best candidates for overseas sourcing.' } },
          'You can see each format, with its styles, materials and finishes, on our [products page](/products), and compare finishes such as foil, embossing and soft-touch on the [finishes page](/finishes).',
        ],
      },
      {
        heading: 'What questions should you ask an overseas packaging supplier?',
        body: [
          'The right questions, asked before the first order, reveal more about a supplier than any brochure. Send these with your enquiry and compare how clearly each supplier answers:',
          {
            ol: [
              'Which steps of my order are done in-house, and which, if any, are subcontracted?',
              'Which quality certifications do you hold, and can you share the certificate?',
              'Will I receive a digital proof on the dieline before production, and can I request a physical sample?',
              'What board grade and flute do you recommend for my product, and why?',
              'Is the quotation itemized, in US dollars, with tooling, freight and delivery terms shown separately?',
              'What production and shipping schedule will you confirm in writing?',
              'Who is my contact, and during which hours can I reach them?',
              'How do you make sure reorders match the first run?',
            ],
          },
          'A capable manufacturer answers all eight quickly and specifically. Hesitation on the proof, the board or the schedule is usually a sign of how the rest of the order will go.',
          'It also helps to start with a smaller first order. Many brands place an initial run of one or two designs, check the quality and the delivery against the written schedule, and then move more of their packaging once the supplier has proved itself. Minimum orders from 500 units make that kind of trial practical.',
        ],
      },
      {
        heading: 'Is overseas packaging the right choice for your brand?',
        body: [
          'Overseas packaging is the right choice when your designs are stable, your volumes are predictable and you can plan a few weeks ahead. In that situation you gain lower unit costs and a wider choice of finishes without giving up quality, provided the manufacturer proofs every job and stands behind it.',
          'It is less suitable when you need boxes within days, when designs change constantly, or when the packaging is so bulky and inexpensive that freight outweighs the savings. Many brands combine the two: they source their branded cartons and mailers overseas and buy plain shipping cartons locally.',
          'If you would like to compare an overseas quotation with what you pay today, send us your current specification. We will return an itemized quotation in US dollars so you can make the decision on real numbers.',
        ],
      },
    ],
    faqs: [
      { q: 'Is it cheaper to make custom packaging overseas?', a: 'For printed and finished packaging it usually is, even after freight and duties, because labor and overhead costs are lower. Compare landed cost, which includes the unit price, tooling, freight, duties and brokerage, rather than the ex-factory price alone.' },
      { q: 'How long does custom packaging from overseas take to reach the US?', a: 'At ALL PACK, production takes 12 to 15 business days after proof approval and shipping to the US takes 5 to 8 business days. The exact schedule for your order is confirmed in writing on the quotation.' },
      { q: 'What is the minimum order for custom packaging?', a: 'For US customers, ALL PACK accepts orders from 500 units. Larger quantities reduce the unit price because setup costs are shared across more pieces.' },
      { q: 'Do I have to pay import duties on packaging from Pakistan?', a: 'Duties may apply depending on the product classification and current tariff rules, and duty-free de minimis entry is no longer available for commercial shipments. Confirm the current rate for your order with a licensed customs broker before production.' },
      { q: 'How can I check quality before the full order is produced?', a: 'Approve a digital proof that shows your artwork on the dieline, and request a physical sample for new structures or color-critical brands. Production starts only after you sign off.' },
      { q: 'Can I get a quotation in US dollars?', a: 'Yes. The Boston office prepares US quotations in US dollars on Eastern Time, with tiered volume pricing and the delivery schedule in writing.' },
      { q: 'What payment methods are accepted for US orders?', a: 'US customers can pay by Visa, Mastercard, American Express, PayPal or Stripe.' },
      { q: 'Is ALL PACK certified?', a: 'ALL PACK is ISO 9001:2015 certified for quality management and Halal certified for food-contact packaging, with more than 25 years of experience in printing and packaging.' },
      { q: 'What if I do not have print-ready artwork?', a: 'Send your logo and brand colors. Our team places them on the dieline and prepares a proof for your approval, so you do not need a designer to get started.' },
    ],
    related: ['custom-mailer-boxes-shopify-dtc-brands', 'custom-box-printing-cost-pakistan'],
  },
  {
    slug: 'custom-mailer-boxes-shopify-dtc-brands',
    title: 'Custom Mailer Boxes for Shopify and DTC Brands in the USA: The Complete Guide',
    category: 'E-commerce guide',
    market: 'us',
    excerpt: 'Styles, materials, sizing for lower shipping costs, printing and finishes: everything a Shopify or direct-to-consumer brand needs to know before ordering custom mailer boxes.',
    summary: 'A custom mailer box is a self-locking corrugated box printed with your brand, made to fit your product. For Shopify and DTC brands, the right mailer protects the order, keeps dimensional shipping charges down and turns the unboxing into a brand moment. Choose the style first, then the board, then the size, and spend on finishes only where the customer will see them.',
    takeaways: [
      'Mailer boxes ship flat, fold without tape and print inside and out, which is why they are the standard for DTC brands.',
      'E-flute corrugated board suits most products up to a few pounds; heavier or fragile items need a stronger flute.',
      'Size the box to the product. Since July 2026, USPS, UPS and FedEx all use a dimensional divisor of 139, so empty space costs money.',
      'Inside printing and one well-placed finish often create more impact than covering the whole box.',
      'Order in tiers: the unit price falls as quantity rises, and reorders are matched to the approved proof.',
    ],
    keywords: ['custom mailer boxes for Shopify brands', 'custom mailer boxes USA', 'DTC packaging', 'branded shipping boxes', 'e-commerce mailer boxes', 'printed mailer boxes wholesale', 'custom subscription boxes'],
    publishedAt: '2026-11-25',
    updatedAt: '2026-11-25',
    hero: { src: '/renders/mailer-boxes.webp', alt: 'Open kraft mailer box with a white printed interior', width: 1155, height: 964 },
    sections: [
      {
        heading: 'What is a custom mailer box?',
        body: [
          'A custom mailer box is a corrugated box with a hinged lid and locking tabs that folds from a single flat sheet, then closes without tape. It is cut to your product’s dimensions and printed with your branding, often on both the outside and the inside.',
          'It helps to separate a mailer box from a regular shipping carton. A regular slotted carton is designed for protection and stacking; it is sealed with tape, opened with a knife and thrown away. A mailer is designed to be opened by hand and kept for a moment longer. It has a cleaner shape, folded edges instead of raw flaps, and a smooth printing surface. For DTC brands, that difference in experience is the whole point.',
          'Mailers are the default for direct-to-consumer brands because they do two jobs at once. They are strong enough to travel through carrier networks on their own, so there is no need for an outer shipping carton, and they open like a presentation box, so the customer’s first impression is your brand rather than plain brown cardboard. They also arrive flat, which saves storage space in your warehouse or fulfillment center.',
        ],
      },
      {
        heading: 'Why does packaging matter so much for Shopify and DTC brands?',
        body: [
          'For an online brand, the mailer box is the first physical contact a customer has with your business. In a store, shelf, staff and setting all shape the experience. Online, the box arrives alone on a doorstep and has to carry the brand by itself.',
          'Branded packaging pays off in three ways:',
          {
            ul: [
              '**Perceived value.** A product that arrives in a well-made, printed box feels more premium than the same product in a plain carton, which supports your price point.',
              '**Repeat purchases.** A memorable unboxing makes the brand easier to recall when the customer is ready to buy again, especially when the box includes a reorder prompt or a discount code.',
              '**Organic reach.** Customers share attractive packaging in photos and videos. Every shared unboxing is free exposure to people who trust the person posting it.',
            ],
          },
          { quote: 'In e-commerce, the box is the storefront. It is the one part of the shopping experience the customer can hold.' },
          'None of this requires an expensive box. It requires a deliberate one: the right size, a clean design and a few details chosen with care.',
        ],
      },
      {
        heading: 'Which mailer box style should you choose?',
        body: [
          'Choose the style by how the box will be packed and how much presentation you want. The tuck-front mailer suits most brands; the others solve specific problems.',
          {
            table: {
              caption: 'Mailer box styles compared',
              head: ['Style', 'How it closes', 'Best for', 'Consideration'],
              rows: [
                ['Tuck-front mailer', 'Lid tucks into the front with side locking tabs', 'Apparel, cosmetics, accessories, subscriptions', 'The most versatile and widely used style'],
                ['Roll-end tuck-top', 'Rolled double walls with a tuck-in lid', 'Heavier products and premium presentation', 'Uses more board, so slightly higher unit cost'],
                ['Mailer with sleeve', 'Standard mailer slid into a printed sleeve', 'Gift sets and limited editions', 'Two components, more assembly time'],
                ['Two-piece mailer', 'Separate lid and base', 'Luxury products and influencer kits', 'Most premium feel, highest cost'],
                ['Mailer with insert', 'Any style plus a die-cut insert', 'Fragile items and multi-product kits', 'Insert holds products in place in transit'],
              ],
            },
          },
          'If you are unsure, start with a tuck-front mailer in E-flute board. It is economical, ships well and leaves budget for printing and one standout finish. You can compare these structures on our [products page](/products).',
        ],
      },
      {
        heading: 'What material is best for custom mailer boxes?',
        body: [
          'E-flute corrugated board is the best all-round material for mailer boxes. It is thin enough to fold crisply and print sharply, yet stiff enough to protect most DTC products in transit. Heavier or more fragile products need a thicker flute or a stronger liner.',
          'Corrugated board is made of a fluted inner layer between two flat liners. The flute size decides the balance between print quality and strength:',
          {
            table: {
              caption: 'Corrugated board options for mailer boxes',
              head: ['Board', 'Thickness', 'Strengths', 'Best for'],
              rows: [
                ['E-flute', 'Thin (about 1/16 in)', 'Crisp folds, smooth print surface, light weight', 'Most DTC products up to a few pounds'],
                ['B-flute', 'Medium (about 1/8 in)', 'More crush resistance and cushioning', 'Heavier items, glass, candles'],
                ['E/B double wall', 'Thick', 'Maximum strength in a mailer format', 'Heavy or high-value products'],
              ],
            },
          },
          'The outer liner affects the look. White liners give bright, accurate color and suit full-coverage designs. Kraft liners have a natural brown finish that suits minimalist and eco-focused brands; colors printed on kraft appear deeper and softer. Many brands combine a kraft exterior with a printed white interior, which gives an understated outside and a vivid reveal when the lid opens.',
          { tip: { title: 'Tell us the weight', text: 'The most useful number for choosing board is the packed weight of the order, including any inserts. Share it with your enquiry and we will recommend the lightest board that protects the product, so you do not pay to ship extra material.' } },
        ],
      },
      {
        heading: 'How should you size a mailer box to lower shipping costs?',
        body: [
          'Size the mailer as close to the product as protection allows, because carriers charge by the larger of actual weight and dimensional weight. Every extra inch of empty space can push a light parcel into a higher billing bracket.',
          'Dimensional weight is calculated by multiplying length, width and height in inches and dividing by a divisor. UPS and FedEx use a divisor of 139 for daily rates. From July 12, 2026, USPS also moved from 166 to 139 for packages larger than one cubic foot, and it now rounds every fractional inch up. In practice, all three major carriers now penalize oversized boxes in a similar way.',
          'Consider a light apparel order weighing 2 pounds:',
          {
            table: {
              caption: 'Worked example: the same product in two box sizes',
              head: ['Box size (inches)', 'Volume', 'Dimensional weight (÷139)', 'Billed as'],
              rows: [
                ['14 × 12 × 6', '1,008 cubic inches', '7.3 lb', '8 lb (UPS and FedEx)'],
                ['12 × 10 × 4', '480 cubic inches', '3.5 lb', '4 lb (UPS and FedEx)'],
              ],
            },
          },
          'Cutting the box down by a few inches halves the billable weight in this example, on every single order. Over thousands of shipments a year, a right-sized custom mailer can save more than the box itself costs. This is one of the strongest arguments for a custom size over a stock box.',
          'To size correctly, measure the product (or the product plus its insert) and add a small allowance, typically about 1/8 inch on each dimension, so it slides in without force. Always state whether the dimensions you send are internal or external; mailer sizes are normally specified as internal dimensions.',
        ],
      },
      {
        heading: 'What printing and finishing options make a mailer stand out?',
        body: [
          'Mailer boxes are usually printed by offset lithography, which reproduces fine detail and consistent color across reorders. Brand colors are matched using Pantone references where exactness matters.',
          'The biggest design decision is where to print:',
          {
            ul: [
              '**Outside only.** The most economical option. Strong for logo-led designs and kraft boxes.',
              '**Inside only.** A plain or kraft exterior with a fully printed interior creates a surprise reveal and keeps the parcel discreet on the doorstep.',
              '**Inside and outside.** The full brand experience, ideal for gifting and subscription boxes.',
            ],
          },
          'Finishes add texture and protection. Matte lamination gives a modern, smooth surface; soft-touch adds a velvety feel; gloss makes colors vivid; spot UV adds a shine to selected areas; foil stamping and embossing lift a logo off the surface. Lamination also helps the box resist scuffs in transit.',
          { img: { src: '/renders/rigid-gift-boxes.webp', alt: 'Navy box with a gold band and foil-stamped logo', width: 1400, height: 741, caption: 'A single foil-stamped logo can lift a simple design without the cost of full-coverage finishing.' } },
          'The most effective mailers rarely use every option. One finish, applied to the logo or a short message, usually delivers more impact than covering the whole box. You can see and compare each finish on our [finishes page](/finishes).',
        ],
      },
      {
        heading: 'How do inserts, tissue and printed extras complete the unboxing?',
        body: [
          'The box is the frame; what sits inside completes the picture. A few low-cost additions turn a delivery into an experience:',
          {
            ul: [
              '**Die-cut inserts** hold products in place, prevent movement and present items like a retail display. They are essential for glass, cosmetics and multi-product kits.',
              '**Custom stickers and seal labels** close tissue paper neatly and repeat your logo at the moment of opening.',
              '**Thank-you cards and leaflets** add a personal note, care instructions, a reorder code or a prompt to share the unboxing.',
              '**Printed sleeves and bands** dress up a standard mailer for launches and holidays without changing the box itself.',
            ],
          },
          'ALL PACK produces labels, stickers, leaflets and stationery alongside the boxes, so the whole unboxing kit can be printed to the same color standard and shipped together.',
        ],
      },
      {
        heading: 'What determines the price of custom mailer boxes?',
        body: [
          'The price of a custom mailer box is set by its specification and the quantity ordered, so there is no single price per box. Understanding the drivers lets you decide where to spend and where to save.',
          {
            table: {
              caption: 'What drives the unit price of a mailer box',
              head: ['Factor', 'Effect on price', 'How to manage it'],
              rows: [
                ['Size', 'Larger boxes use more board', 'Right-size to the product; it also cuts shipping'],
                ['Board and flute', 'Stronger or double-wall board costs more', 'Use the lightest board that protects the product'],
                ['Print coverage', 'Inside and outside printing adds a pass', 'Print inside only for a discreet exterior with a reveal'],
                ['Number of colors', 'More colors or Pantone matches add setup', 'Build the design around one or two brand colors'],
                ['Finishes', 'Each finish adds a process step', 'Apply one finish to the logo rather than the whole box'],
                ['Inserts and extras', 'Each component adds material and labor', 'Add inserts only where products need protection'],
                ['Quantity', 'Setup cost is shared across the run', 'Order in tiers; the unit price falls as quantity rises'],
                ['Tooling', 'A cutting die is made for each new size', 'Paid once; reorders reuse the same die'],
              ],
            },
          },
          'Rather than relying on a generic price list, request an itemized quotation for your exact specification. ALL PACK quotes US customers in US dollars with tiered volume pricing, so you can see how the unit price changes at different quantities and choose the order size that suits your cash flow. Our [pricing guide](/blog/custom-box-printing-cost-pakistan) explains each factor in more depth.',
          { tip: { title: 'Get two tiers quoted', text: 'Ask for prices at two or three quantities, such as 1,000 and 2,500 pieces. The difference in unit price often makes the larger order the better value, especially for a design you will reorder.' } },
        ],
      },
      {
        heading: 'How do you prepare artwork for a custom mailer box?',
        body: [
          'Artwork for a mailer box is designed on a dieline, the flat template that shows every panel, fold and cut. Your design must follow the dieline so that logos land on the right panel and nothing important disappears into a fold.',
          {
            ul: [
              'Supply vector files (PDF or AI) for logos and text, and images at 300 dpi or higher.',
              'Set the file to CMYK and list any Pantone colors that must match exactly.',
              'Extend backgrounds 0.125 inch (3 mm) beyond the cut line as bleed.',
              'Keep text and logos at least 0.125 inch inside the cut and fold lines.',
              'Outline or embed all fonts.',
            ],
          },
          'If you do not have a designer, send your logo and brand colors. Our team places them on the dieline and prepares a free digital proof for your approval. Full artwork specifications are listed on our [how it works page](/how-it-works).',
        ],
      },
      {
        heading: 'How do custom mailer boxes work with Shopify fulfillment and 3PLs?',
        body: [
          'Custom mailers fit smoothly into Shopify fulfillment, whether you pack orders yourself or use a third-party logistics (3PL) provider, as long as you plan for three practical details.',
          {
            ul: [
              '**Packing speed.** Tuck-front mailers fold in seconds without tape, which matters when a 3PL charges by the minute or by the pick. Ask your 3PL whether it prefers a particular closure before you finalize the style.',
              '**Shipping settings.** Enter the exact external dimensions and empty weight of each mailer as a custom package in Shopify. Accurate box data gives accurate shipping rates at checkout, so you do not undercharge customers or lose margin to dimensional weight.',
              '**Storage and receiving.** Mailers arrive flat and packed in cartons by size. Agree with your 3PL how they should be labeled on arrival, and keep one box size per SKU group so packers always reach for the right one.',
            ],
          },
          'Many brands settle on two or three standard mailer sizes that cover most of their catalog. Fewer sizes mean simpler inventory, larger order quantities per size and a lower unit price, while each size still fits its products closely enough to control shipping costs.',
        ],
      },
      {
        heading: 'What mistakes should DTC brands avoid with mailer boxes?',
        body: [
          'Most problems with custom mailers come from a handful of avoidable decisions made before the order is placed:',
          {
            ul: [
              '**Ordering by eye.** Guessing the size leads to boxes that are too tight to close or so large that products rattle and shipping costs rise. Measure the packed product and send exact internal dimensions.',
              '**Choosing board for looks alone.** A beautiful box that crushes in transit costs more in replacements than it saves. Tell the manufacturer the packed weight and how the parcel will travel.',
              '**Overdesigning.** Too many colors, finishes and messages compete with each other. A clear logo, one brand color and one finish usually look more confident.',
              '**Ignoring the inside.** The interior is what the customer sees at the moment of opening. Even a simple printed message inside the lid adds a memorable touch.',
              '**Skipping the proof.** Approving artwork without checking it on the dieline is how logos end up across a fold. Review every panel before you sign.',
              '**Reordering too late.** Running out of branded boxes forces a switch to plain cartons in the middle of a campaign. Set a reorder point that covers production and shipping time.',
            ],
          },
        ],
      },
      {
        heading: 'Are custom mailer boxes recyclable?',
        body: [
          'Corrugated mailer boxes are made from paper-based board, which is widely accepted in curbside recycling programs across the US. That makes them a straightforward choice for brands that want packaging customers can dispose of responsibly.',
          'A few choices keep a mailer easy to recycle. Kraft board and water-based coatings keep the box close to plain paper. Paper inserts can replace plastic ones for many products. Heavy plastic laminates and mixed-material add-ons are harder to recycle, so use them sparingly and only where they add real value. A short printed note asking customers to flatten and recycle the box is a simple way to show the brand cares.',
        ],
      },
      {
        heading: 'How do you order custom mailer boxes from ALL PACK?',
        body: [
          'Ordering follows a short, controlled process, managed by the Boston office on Eastern Time:',
          {
            steps: [
              { title: 'Send your brief', text: 'Product size, packed weight, quantity, style and finishes.' },
              { title: 'Receive a USD quote', text: 'Itemized, with tiered pricing and the schedule in writing.' },
              { title: 'Approve the proof', text: 'A free digital proof, plus an optional physical sample.' },
              { title: 'Production', text: '12 to 15 business days after proof approval.' },
              { title: 'Delivery', text: '5 to 8 business days to your US address.' },
            ],
          },
          'Orders for US customers start from 500 units, and payment can be made by Visa, Mastercard, American Express, PayPal or Stripe. Reorders are matched to your approved proof, so every batch of mailers looks like the last.',
        ],
      },
    ],
    faqs: [
      { q: 'How much do custom mailer boxes cost?', a: 'The price depends on size, board, print coverage, number of colors, finishes, inserts and quantity. The unit price falls as quantity rises because setup costs are shared. Send your specification for an itemized quotation in US dollars.' },
      { q: 'What size mailer box do I need?', a: 'Measure the product, or the product with its insert, and add about 1/8 inch to each dimension. Keep the box as close to the product as protection allows to avoid dimensional weight charges.' },
      { q: 'Are mailer boxes strong enough to ship without an outer carton?', a: 'Yes. Corrugated mailers are designed to travel through carrier networks on their own. E-flute suits most products; heavier or fragile items need B-flute or double-wall board.' },
      { q: 'What is the minimum order for custom mailer boxes?', a: 'ALL PACK accepts US orders from 500 units. Larger quantities lower the unit price.' },
      { q: 'Can mailer boxes be printed on the inside?', a: 'Yes. You can print outside only, inside only, or both. Inside printing is a popular way to create a branded reveal while keeping the exterior simple.' },
      { q: 'How long does it take to receive custom mailer boxes in the US?', a: 'Production takes 12 to 15 business days after proof approval and shipping to the US takes 5 to 8 business days. The schedule for your order is confirmed in writing.' },
      { q: 'Kraft or white mailer boxes: which is better?', a: 'White board gives brighter, more accurate color for full-coverage designs. Kraft gives a natural, understated look that suits minimalist and eco-focused brands. Many brands use a kraft exterior with a printed white interior.' },
      { q: 'Do you help with mailer box design?', a: 'Yes. Send your logo and brand colors and our team places them on the dieline and prepares a free digital proof for approval.' },
      { q: 'Can I get a sample before ordering in bulk?', a: 'Yes. Every order includes a free digital proof, and a physical sample can be produced before the full run for new structures or color-critical designs.' },
    ],
    related: ['custom-packaging-manufacturer-for-us-brands', 'custom-packaging-boxes-lahore'],
  },
];
