import { STOCK, stockUrl } from '@/lib/photos';

/**
 * Formats and finishes we print. Stock photography for now (Unsplash); swap each
 * `photo` for the owner's own job photos when they arrive.
 */
export type Work = { photo: string; title: string; detail: string };

export const clientWork: Work[] = [
  { photo: STOCK.printedCartons, title: 'Printed folding cartons', detail: 'Four-colour offset on SBS board' },
  { photo: STOCK.pharmaCarton, title: 'Pharmaceutical carton', detail: 'Blister-pack carton with insert' },
  { photo: STOCK.windowBox, title: 'Window bakery box', detail: 'Die-cut window, food-safe board' },
  { photo: STOCK.cupcakeBox, title: 'Cake box with insert', detail: 'Folding box with cupcake divider' },
  { photo: STOCK.cosmeticCartons, title: 'Cosmetic cartons', detail: 'Matte black with metallic accents' },
  { photo: STOCK.foilGiftBox, title: 'Foil-stamped gift box', detail: 'Gold foil on coloured board' },
  { photo: STOCK.drawerBox, title: 'Rigid drawer box', detail: 'Kraft-wrapped sleeve and tray' },
  { photo: STOCK.gableBox, title: 'Gable box with handle', detail: 'One-colour print on kraft' },
  { photo: STOCK.printedTape, title: 'Printed packing tape', detail: 'Your logo on every shipper' },
  { photo: STOCK.printedKraft, title: 'Printed kraft mailers', detail: 'Mailer boxes in bulk runs' },
];

export const workImage = (ref: string, w = 800) => stockUrl(ref, w);
