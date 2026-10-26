// Artwork painters for ALL PACK house-sample packaging.
// Every painter: (g, w, h, L) — use L.fill(color, kind) for styles so the same painter also
// produces roughness/metal (pbr) and height (emboss) layers. kind: 'ink' | 'foil' | 'spot' | 'emboss' | 'deboss'.
import { C, mark, wordmark, text, foilGradient } from './tex.js';

const sp = (g, s) => { if ('letterSpacing' in g) g.letterSpacing = `${s}px`; };
export function monogram(g, w, h, L, { color, cell = 160, size = .32, alpha = 1, offset = true, rotate = 0 }) {
  g.save(); g.globalAlpha = alpha; if (rotate) { g.translate(w / 2, h / 2); g.rotate(rotate); g.translate(-w / 2, -h / 2); }
  for (let y = -cell; y < h + cell; y += cell * .866) {
    const row = Math.round(y / (cell * .866));
    for (let x = -cell; x < w + cell; x += cell) mark(g, x + (offset && row % 2 ? cell / 2 : 0), y, cell * size, L.fill(color));
  }
  g.restore();
}
/** Foil text helper: fills with gradient in colour mode, metal in pbr, raised in height. */
export function foilText(g, L, str, x, y, opts = {}) {
  const { size = 40 } = opts; const style = L.foil(x - size * 3, y - size, x + size * 3, y + size, opts.tone);
  text(g, str, x, y, { ...opts, fill: style });
}
export function foilMark(g, L, x, y, s, tone, counter = null) { mark(g, x, y, s, L.foil(x - s, y - s, x + s, y + s, tone), counter); }

export const ART = {
  /* corrugated shipper: one-colour flexo */
  shipFront: (g, w, h, L) => {
    const ink = L.fill('#1d1a17'); const x = w * .08;
    mark(g, x + h * .13, h * .58, h * .2, ink);
    text(g, 'ALL PACK', x + h * .3, h * .62, { size: h * .13, font: 'Fraunces', weight: 480, fill: ink, align: 'left', spacing: h * .006 });
    text(g, 'THE PACKAGING EXPERTS', x + h * .31, h * .69, { size: h * .028, weight: 700, fill: ink, align: 'left', spacing: h * .008 });
    g.fillStyle = ink; g.fillRect(x, h * .8, w - 2 * x, h * .004);
    text(g, 'HANDLE WITH CARE', x, h * .87, { size: h * .028, weight: 700, fill: ink, align: 'left', spacing: h * .006 });
    text(g, 'LAHORE · PAKISTAN', w - x, h * .87, { size: h * .028, weight: 700, fill: ink, align: 'right', spacing: h * .006 });
  },
  shipSide: (g, w, h, L) => {
    const ink = L.fill('#1d1a17');
    g.fillStyle = ink;
    for (const dx of [-.065, .065]) { const x = w * (.18 + dx), s = h * .045; g.beginPath(); g.moveTo(x, h * .12); g.lineTo(x + s, h * .2); g.lineTo(x + s * .33, h * .2); g.lineTo(x + s * .33, h * .28); g.lineTo(x - s * .33, h * .28); g.lineTo(x - s * .33, h * .2); g.lineTo(x - s, h * .2); g.closePath(); g.fill(); }
    g.strokeStyle = ink; g.lineWidth = h * .006; g.strokeRect(w * .08, h * .08, w * .2, h * .24);
    g.beginPath(); g.arc(w * .78, h * .76, h * .12, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(w * .78, h * .76, h * .095, 0, Math.PI * 2); g.stroke();
    text(g, 'ALL PACK', w * .78, h * .75, { size: h * .03, weight: 800, fill: ink, spacing: 2 });
    text(g, 'LAHORE · PK', w * .78, h * .79, { size: h * .02, weight: 700, fill: ink, spacing: 2 });
    text(g, 'SINGLE WALL · B-FLUTE', w * .78, h * .92, { size: h * .02, weight: 700, fill: ink, spacing: 2 });
  },
  seamTop: (g, w, h, L) => { g.fillStyle = L.fill('rgba(60,38,16,.55)', 'deboss'); g.fillRect(0, h * .5 - 2, w, 4); },
  /* vertical brand tape: width = tape width, height = length */
  tape: (g, w, h, L, { bg = C.navy, fg = C.cream, accent = C.brass } = {}) => {
    g.fillStyle = L.fill(bg); g.fillRect(0, 0, w, h);
    g.save(); g.translate(w / 2, 0); g.rotate(Math.PI / 2);
    for (let x = w * .4; x < h; x += w * 4.4) {
      mark(g, x + w * .28, w * .04, w * .42, L.fill(fg));
      text(g, 'ALL PACK', x + w * .62, w * .19, { size: w * .38, font: 'Fraunces', weight: 500, fill: L.fill(fg), align: 'left', spacing: 3 });
      text(g, 'THE PACKAGING EXPERTS', x + w * 2.65, w * .12, { size: w * .15, weight: 700, fill: L.fill(accent), align: 'left', spacing: 3 });
    }
    g.restore();
  },
  /* mailer: navy outside, foil lid */
  mailerLid: (g, w, h, L) => {
    foilMark(g, L, w * .5, h * .42, h * .2, 'gold');
    foilText(g, L, 'ALL PACK', w * .5, h * .66, { size: h * .1, font: 'Fraunces', weight: 450, spacing: h * .006 });
    foilText(g, L, 'THE PACKAGING EXPERTS', w * .5, h * .72, { size: h * .026, weight: 700, spacing: h * .008 });
  },
  mailerInside: (g, w, h, L) => {
    g.fillStyle = L.fill(C.cream); g.fillRect(0, 0, w, h);
    monogram(g, w, h, L, { color: 'rgba(28,43,99,.16)', cell: Math.min(w, h) * .14, size: .34 });
  },
  mailerFront: (g, w, h, L) => { text(g, 'ALLPACK.PK', w * .5, h * .62, { size: h * .14, weight: 700, fill: L.fill('rgba(244,239,230,.75)'), spacing: h * .03 }); },
  thankYou: (g, w, h, L) => {
    g.fillStyle = L.fill(C.cream); g.fillRect(0, 0, w, h);
    g.strokeStyle = L.fill(C.navy); g.lineWidth = w * .006; g.strokeRect(w * .06, h * .06, w * .88, h * .88);
    mark(g, w * .5, h * .3, h * .14, L.fill(C.navy));
    text(g, 'Thank you', w * .5, h * .56, { size: h * .13, font: 'Fraunces', weight: 380, italic: true, fill: L.fill(C.navy) });
    text(g, 'FOR CHOOSING ALL PACK', w * .5, h * .7, { size: h * .036, weight: 700, fill: L.fill(C.brass), spacing: h * .01 });
  },
  seal: (g, w, h, L, { bg = C.navy, tone = 'gold' } = {}) => {
    g.fillStyle = L.fill(bg); g.fillRect(0, 0, w, h);
    g.strokeStyle = L.foil(0, 0, w, h, tone); g.lineWidth = w * .02; g.beginPath(); g.arc(w / 2, h / 2, w * .4, 0, 7); g.stroke();
    foilMark(g, L, w / 2, h * .46, h * .32, tone);
    foilText(g, L, 'ALL PACK', w / 2, h * .74, { size: h * .09, weight: 800, spacing: h * .02, tone });
  },
  tissue: (g, w, h, L, { bg = '#F7F5F0', color = 'rgba(28,43,99,.55)' } = {}) => { g.fillStyle = L.fill(bg); g.fillRect(0, 0, w, h); monogram(g, w, h, L, { color, cell: w * .16, size: .3 }); },
  /* rigid box lid */
  rigidLid: (g, w, h, L, { tone = 'gold', tag = true } = {}) => {
    foilMark(g, L, w * .5, h * .4, h * .22, tone);
    foilText(g, L, 'ALL PACK', w * .5, h * .67, { size: h * .1, font: 'Fraunces', weight: 450, spacing: h * .008, tone });
    if (tag) foilText(g, L, 'THE PACKAGING EXPERTS', w * .5, h * .735, { size: h * .026, weight: 700, spacing: h * .01, tone });
  },
  /* folding carton (cosmetic line) */
  cartonFront: (g, w, h, L, { name = 'Essentials', sub = 'RESTORING FACE OIL', vol = '30 ml · 1.0 fl oz', band = C.navy } = {}) => {
    g.fillStyle = L.fill(C.cream); g.fillRect(0, 0, w, h);
    g.fillStyle = L.fill(band); g.fillRect(0, h * .62, w, h * .38);
    g.fillStyle = L.foil(0, h * .6, w, h * .64); g.fillRect(0, h * .615, w, h * .008);
    mark(g, w * .5, h * .16, w * .16, L.fill(C.navy));
    text(g, 'ALL PACK', w * .5, h * .27, { size: w * .07, weight: 700, fill: L.fill(C.navy), spacing: w * .03 });
    text(g, name, w * .5, h * .44, { size: w * .15, font: 'Fraunces', weight: 380, italic: true, fill: L.fill(C.navy) });
    text(g, sub, w * .5, h * .51, { size: w * .045, weight: 700, fill: L.fill(C.brass), spacing: w * .015 });
    foilText(g, L, vol, w * .5, h * .9, { size: w * .05, weight: 600, spacing: w * .01 });
  },
  cartonSide: (g, w, h, L, { band = C.navy } = {}) => {
    g.fillStyle = L.fill(C.cream); g.fillRect(0, 0, w, h); g.fillStyle = L.fill(band); g.fillRect(0, h * .62, w, h * .38);
    g.fillStyle = L.foil(0, h * .6, w, h * .64); g.fillRect(0, h * .615, w, h * .008);
    const ink = L.fill('rgba(28,43,99,.75)');
    ['INGREDIENTS', 'Squalane, Jojoba seed oil,', 'Rosehip seed oil, Vitamin E,', 'Bergamot peel oil.', '', 'MADE TO ORDER BY', 'ALL PACK · LAHORE'].forEach((t, i) => text(g, t, w * .12, h * (.12 + i * .045), { size: w * .07, weight: i === 0 || i === 5 ? 800 : 500, fill: ink, align: 'left', spacing: 1 }));
  },
  cartonTop: (g, w, h, L, { band = C.navy } = {}) => { g.fillStyle = L.fill(C.cream); g.fillRect(0, 0, w, h); g.fillStyle = L.fill('rgba(28,43,99,.5)', 'deboss'); g.fillRect(0, h * .88, w, 3); },
  /* full-bleed pattern for 'custom printed' */
  pattern: (g, w, h, L, { palette = ['#1C2B63', '#B48A4F', '#E9D8BE', '#8FB3DA', '#C9644B'], cell = 200, seed = 3 } = {}) => {
    let s = seed; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    g.fillStyle = L.fill('#F4EFE6'); g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += cell) for (let x = 0; x < w; x += cell) {
      const c = palette[Math.floor(r() * palette.length)], k = Math.floor(r() * 5); g.fillStyle = L.fill(c, c === '#B48A4F' ? 'foil' : 'ink');
      if (c === '#B48A4F') g.fillStyle = L.foil(x, y, x + cell, y + cell);
      g.beginPath();
      if (k === 0) { g.moveTo(x, y); g.lineTo(x + cell, y); g.lineTo(x, y + cell); }
      else if (k === 1) { g.arc(x, y + cell, cell, -Math.PI / 2, 0); g.lineTo(x, y + cell); }
      else if (k === 2) { g.arc(x + cell / 2, y + cell / 2, cell * .36, 0, 7); }
      else if (k === 3) { g.rect(x, y + cell / 2, cell, cell / 2); }
      else { g.moveTo(x + cell / 2, y + cell * .1); g.lineTo(x + cell * .9, y + cell * .9); g.lineTo(x + cell * .1, y + cell * .9); }
      g.fill();
    }
  },
  patternLabel: (g, w, h, L) => {
    g.fillStyle = L.fill('#F4EFE6'); g.beginPath(); g.roundRect(w * .2, h * .36, w * .6, h * .28, h * .02); g.fill();
    mark(g, w * .5, h * .45, h * .09, L.fill(C.navy));
    text(g, 'ALL PACK', w * .5, h * .57, { size: h * .07, font: 'Fraunces', weight: 480, fill: L.fill(C.navy), spacing: 4 });
  },
  /* food */
  pizzaTop: (g, w, h, L, { ink = '#7B2E22' } = {}) => {
    const c = L.fill(ink);
    g.strokeStyle = c; g.lineWidth = w * .012; g.beginPath(); g.arc(w / 2, h / 2, w * .3, 0, 7); g.stroke(); g.lineWidth = w * .004; g.beginPath(); g.arc(w / 2, h / 2, w * .275, 0, 7); g.stroke();
    mark(g, w / 2, h * .42, w * .12, c);
    text(g, 'Hot & Fresh', w / 2, h * .57, { size: w * .07, font: 'Fraunces', weight: 420, italic: true, fill: c });
    text(g, 'WOOD-FIRED · HANDMADE', w / 2, h * .63, { size: w * .022, weight: 800, fill: c, spacing: w * .006 });
    g.save(); g.translate(w / 2, h / 2); for (let i = 0; i < 24; i++) { g.rotate(Math.PI * 2 / 24); g.fillStyle = c; g.beginPath(); g.arc(0, -w * .335, w * .006, 0, 7); g.fill(); } g.restore();
    text(g, 'PACKED BY ALL PACK  ·  ALLPACK.PK', w / 2, h * .93, { size: w * .018, weight: 700, fill: c, spacing: w * .005, alpha: .8 });
  },
  pizzaSide: (g, w, h, L, { ink = '#7B2E22' } = {}) => { text(g, 'HOT & FRESH  ·  OPEN HERE  ·  HOT & FRESH', w / 2, h * .62, { size: h * .32, weight: 800, fill: L.fill(ink), spacing: h * .05 }); },
  burger: (g, w, h, L) => { const c = L.fill('#2A2220'); mark(g, w * .5, h * .42, h * .3, c); text(g, 'SMASH CLUB', w * .5, h * .78, { size: h * .11, weight: 800, fill: c, spacing: h * .02 }); },
  liner: (g, w, h, L) => { g.fillStyle = L.fill('#F3EEE4'); g.fillRect(0, 0, w, h); g.fillStyle = L.fill('rgba(123,46,34,.55)'); for (let y = 0; y < h; y += w / 10) for (let x = 0; x < w; x += w / 10) { g.beginPath(); g.arc(x + ((y / (w / 10)) % 2 ? w / 20 : 0), y, w * .006, 0, 7); g.fill(); } },
  cakeLid: (g, w, h, L) => {
    g.fillStyle = L.fill('#FBF7F2'); g.fillRect(0, 0, w, h);
    text(g, 'Pâtisserie', w * .5, h * .17, { size: h * .085, font: 'Fraunces', weight: 380, italic: true, fill: L.fill('#8A3B4A') });
    text(g, 'BAKED FRESH DAILY', w * .5, h * .9, { size: h * .03, weight: 800, fill: L.fill('#8A3B4A'), spacing: h * .01 });
  },
  cakeSide: (g, w, h, L) => { g.fillStyle = L.fill('#FBF7F2'); g.fillRect(0, 0, w, h); g.fillStyle = L.fill('#E8C3C8'); for (let x = 0; x < w; x += h * .3) g.fillRect(x, 0, h * .15, h); text(g, 'Pâtisserie', w / 2, h * .62, { size: h * .32, font: 'Fraunces', weight: 400, italic: true, fill: L.fill('#8A3B4A') }); },
  noodle: (g, w, h, L) => { const c = L.fill('#2A2220'); text(g, 'WOK', w * .5, h * .58, { size: h * .2, font: 'Fraunces', weight: 600, fill: c, spacing: h * .02 }); text(g, '& ROLL', w * .5, h * .7, { size: h * .06, weight: 800, fill: L.fill('#9E3A2B'), spacing: h * .03 }); },
  cup: (g, w, h, L, { bg = C.cream, fg = C.navy } = {}) => { g.fillStyle = L.fill(bg); g.fillRect(0, 0, w, h); monogram(g, w, h, L, { color: fg, cell: h * .2, size: .3, alpha: .9 }); },
  cupPlain: (g, w, h, L, { bg = '#F5F2EB', fg = C.navy } = {}) => { g.fillStyle = L.fill(bg); g.fillRect(0, 0, w, h); for (const x of [w * .25, w * .75]) { mark(g, x, h * .42, h * .16, L.fill(fg)); text(g, 'ALL PACK', x, h * .58, { size: h * .07, font: 'Fraunces', weight: 480, fill: L.fill(fg), spacing: 4 }); } },
  sleeve: (g, w, h, L) => { for (const x of [w * .25, w * .75]) { text(g, 'BREW', x, h * .62, { size: h * .32, font: 'Fraunces', weight: 500, fill: L.fill('#2A2220'), spacing: h * .04 }); } },
  /* bags */
  bagFront: (g, w, h, L, { ink = '#1d1a17', foil = false } = {}) => {
    const fill = foil ? L.foil(0, h * .3, w, h * .7) : L.fill(ink);
    mark(g, w * .5, h * .4, w * .2, fill);
    text(g, 'ALL PACK', w * .5, h * .58, { size: w * .1, font: 'Fraunces', weight: 470, fill, spacing: w * .006 });
    text(g, 'THE PACKAGING EXPERTS', w * .5, h * .625, { size: w * .028, weight: 700, fill, spacing: w * .01 });
  },
  bagFold: (g, w, h, L, { shade = .16 } = {}) => { // gusset fold shading line
    g.fillStyle = L.fill(`rgba(0,0,0,${shade})`, 'deboss'); g.fillRect(w * .5 - 2, h * .0, 4, h * .78);
    g.save(); g.translate(w * .5, h * .78); g.rotate(.62); g.fillRect(-2, 0, 4, w * .6); g.restore(); g.save(); g.translate(w * .5, h * .78); g.rotate(-.62); g.fillRect(-2, 0, 4, w * .6); g.restore();
  },
  poly: (g, w, h, L) => {
    g.fillStyle = L.fill(C.navy); g.fillRect(0, 0, w, h);
    mark(g, w * .5, h * .43, w * .14, L.fill(C.cream));
    text(g, 'ALL PACK', w * .5, h * .56, { size: w * .075, font: 'Fraunces', weight: 470, fill: L.fill(C.cream), spacing: w * .005 });
    text(g, 'SHIPPED WITH CARE', w * .5, h * .6, { size: w * .022, weight: 700, fill: L.fill(C.brass), spacing: w * .01 });
  },
  pouch: (g, w, h, L, { bg = C.cream, band = C.navy, name = 'Single Origin', sub = 'WHOLE BEAN COFFEE', weight = 'NET WT 250 G' } = {}) => {
    g.fillStyle = L.fill(bg); g.fillRect(0, 0, w, h);
    g.fillStyle = L.fill(band); g.fillRect(0, h * .6, w, h * .4);
    g.fillStyle = L.foil(0, h * .58, w, h * .62); g.fillRect(0, h * .595, w, h * .006);
    mark(g, w * .5, h * .24, w * .13, L.fill(band));
    text(g, 'ALL PACK', w * .5, h * .34, { size: w * .06, weight: 800, fill: L.fill(band), spacing: w * .02 });
    text(g, name, w * .5, h * .47, { size: w * .11, font: 'Fraunces', weight: 380, italic: true, fill: L.fill(band) });
    text(g, sub, w * .5, h * .53, { size: w * .035, weight: 700, fill: L.fill(C.brass), spacing: w * .012 });
    text(g, weight, w * .5, h * .9, { size: w * .035, weight: 700, fill: L.fill(bg), spacing: w * .012 });
  },
  /* labels */
  roundLabel: (g, w, h, L, { bg = C.navy, fg = C.cream, word = 'HANDMADE', tone = 'gold' } = {}) => {
    g.fillStyle = L.fill(bg); g.fillRect(0, 0, w, h);
    g.strokeStyle = L.foil(0, 0, w, h, tone); g.lineWidth = w * .015; g.beginPath(); g.arc(w / 2, h / 2, w * .42, 0, 7); g.stroke();
    mark(g, w / 2, h * .42, h * .3, L.fill(fg));
    text(g, word, w / 2, h * .72, { size: h * .075, weight: 800, fill: L.fill(fg), spacing: h * .02 });
  },
  sheet: (g, w, h, L) => { g.fillStyle = L.fill('#F6F3EC'); g.fillRect(0, 0, w, h); },
  /* produce */
  produceSide: (g, w, h, L) => {
    const c = L.fill('#2F4A2A');
    text(g, 'FRESH', w * .5, h * .5, { size: h * .32, font: 'Fraunces', weight: 520, fill: c, spacing: h * .04 });
    text(g, 'GROWN IN PUNJAB  ·  PACKED BY ALL PACK', w * .5, h * .78, { size: h * .08, weight: 800, fill: c, spacing: h * .02 });
  },
  /* shoe */
  shoeLid: (g, w, h, L) => {
    const ink = L.fill(C.cream);
    mark(g, w * .5, h * .4, h * .2, ink); text(g, 'ALL PACK', w * .5, h * .64, { size: h * .1, font: 'Fraunces', weight: 450, fill: ink, spacing: h * .01 });
    text(g, 'ATELIER  ·  LAHORE', w * .5, h * .72, { size: h * .03, weight: 700, fill: L.fill(C.brass), spacing: h * .012 });
  },
  shoeLidSide: (g, w, h, L) => { text(g, 'ALL PACK  ·  ATELIER', w * .12, h * .62, { size: h * .32, weight: 700, fill: L.fill(C.cream), align: 'left', spacing: h * .06 }); text(g, 'EU 42  ·  UK 8', w * .88, h * .62, { size: h * .3, weight: 700, fill: L.fill(C.brass), align: 'right', spacing: h * .04 }); },
  pharmaFront: (g, w, h, L, { name = 'Vitamin C', dose = '500 mg', count = '30 TABLETS', accent = '#1F7A8C' } = {}) => {
    g.fillStyle = L.fill('#FFFFFF'); g.fillRect(0, 0, w, h);
    g.fillStyle = L.fill(accent); g.fillRect(0, h * .72, w, h * .28); g.fillStyle = L.fill(C.navy); g.fillRect(0, h * .7, w, h * .02);
    g.fillStyle = L.fill(accent); g.beginPath(); g.moveTo(w, 0); g.lineTo(w, h * .32); g.lineTo(w * .55, 0); g.closePath(); g.fill();
    text(g, 'SAMPLE CARTON', w * .08, h * .1, { size: w * .045, weight: 800, fill: L.fill(C.navy), align: 'left', spacing: w * .01 });
    text(g, name, w * .08, h * .36, { size: w * .13, weight: 800, fill: L.fill(C.navy), align: 'left' });
    text(g, dose, w * .08, h * .46, { size: w * .1, weight: 500, fill: L.fill(accent), align: 'left' });
    text(g, count, w * .08, h * .62, { size: w * .05, weight: 700, fill: L.fill('#555a66'), align: 'left', spacing: w * .01 });
    text(g, 'Printed by ALL PACK · Lahore', w * .08, h * .88, { size: w * .045, weight: 600, fill: L.fill('#ffffff'), align: 'left' });
  },
  pharmaSide: (g, w, h, L, { accent = '#1F7A8C' } = {}) => {
    g.fillStyle = L.fill('#FFFFFF'); g.fillRect(0, 0, w, h); g.fillStyle = L.fill(accent); g.fillRect(0, h * .72, w, h * .28);
    for (let i = 0; i < 9; i++) { g.fillStyle = L.fill('rgba(40,44,56,.55)'); g.fillRect(w * .1, h * (.12 + i * .05), w * (i % 3 === 2 ? .5 : .8), h * .012); }
    for (let i = 0; i < 28; i++) { g.fillStyle = L.fill('#111'); g.fillRect(w * (.15 + i * .025), h * .6, w * (i % 3 ? .008 : .014), h * .06); }
  },
  bottleLabel: (g, w, h, L, { name = 'Botanical', sub = 'BODY OIL · 100 ML', bg = '#F6F2EA' } = {}) => {
    g.fillStyle = L.fill(bg); g.fillRect(0, 0, w, h);
    mark(g, w * .5, h * .25, h * .16, L.fill(C.navy));
    text(g, 'ALL PACK', w * .5, h * .42, { size: h * .07, weight: 800, fill: L.fill(C.navy), spacing: h * .02 });
    text(g, name, w * .5, h * .63, { size: h * .17, font: 'Fraunces', weight: 380, italic: true, fill: L.fill(C.navy) });
    foilText(g, L, sub, w * .5, h * .8, { size: h * .055, weight: 700, spacing: h * .015 });
  },
};
