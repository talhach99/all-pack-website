// Procedural paper/board textures and brand artwork painted on canvases.
import * as THREE from 'three';

export const C = {
  navy: '#1C2B63', ink: '#0D1220', brass: '#B48A4F', cream: '#F4EFE6', paper: '#F6F3EC', kraft: '#B98D5F', kraftDark: '#8E663F',
  royal: '#2B3A8C', sky: '#8FB3DA', blush: '#E9C9C3', sage: '#B9C3A8', clay: '#C98B6B', charcoal: '#2A2B2E',
};

export async function loadFonts() {
  const faces = [
    new FontFace('Fraunces', 'url(/fonts/fraunces-latin-opsz-normal.woff2)', { weight: '100 900', style: 'normal' }),
    new FontFace('Fraunces', 'url(/fonts/fraunces-latin-opsz-italic.woff2)', { weight: '100 900', style: 'italic' }),
    new FontFace('Manrope', 'url(/fonts/manrope-latin-wght-normal.woff2)', { weight: '200 800', style: 'normal' }),
  ];
  for (const f of faces) { await f.load(); document.fonts.add(f); }
}

export function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

/** Tileable multi-octave value noise -> Float32Array in 0..1 */
function valueNoise(size, cells, octaves = 4, seed = 7, persistence = .5) {
  const out = new Float32Array(size * size); const r = rng(seed); let amp = 1, total = 0;
  for (let o = 0; o < octaves; o++) {
    const n = cells << o; const grid = new Float32Array(n * n); for (let i = 0; i < grid.length; i++) grid[i] = r();
    for (let y = 0; y < size; y++) {
      const gy = y / size * n, y0 = Math.floor(gy), fy = gy - y0, sy = fy * fy * (3 - 2 * fy), y1 = (y0 + 1) % n;
      for (let x = 0; x < size; x++) {
        const gx = x / size * n, x0 = Math.floor(gx), fx = gx - x0, sx = fx * fx * (3 - 2 * fx), x1 = (x0 + 1) % n;
        const a = grid[y0 * n + x0], b = grid[y0 * n + x1], c = grid[y1 * n + x0], d = grid[y1 * n + x1];
        out[y * size + x] += amp * ((a * (1 - sx) + b * sx) * (1 - sy) + (c * (1 - sx) + d * sx) * sy);
      }
    }
    total += amp; amp *= persistence;
  }
  for (let i = 0; i < out.length; i++) out[i] /= total; return out;
}
function noiseCanvas(size, cells, octaves, seed, lo, hi, tint = [1, 1, 1], persistence = .5) {
  const c = canvas(size, size), g = c.getContext('2d'), id = g.createImageData(size, size), n = valueNoise(size, cells, octaves, seed, persistence);
  for (let i = 0; i < n.length; i++) { const v = lo + (hi - lo) * n[i]; id.data[i * 4] = v * tint[0]; id.data[i * 4 + 1] = v * tint[1]; id.data[i * 4 + 2] = v * tint[2]; id.data[i * 4 + 3] = 255; }
  g.putImageData(id, 0, 0); return c;
}

const cache = {};
/** Shared tileable detail layers. */
export function layers() {
  if (cache.ready) return cache;
  cache.mottle = noiseCanvas(512, 3, 5, 11, 0, 255, [1, 1, 1], .55);          // large tonal variation
  cache.grain = noiseCanvas(1024, 64, 3, 23, 0, 255, [1, 1, 1], .6);         // fine paper grain
  // fibres (for kraft): many short strokes
  const f = canvas(1024, 1024), g = f.getContext('2d'); g.fillStyle = '#808080'; g.fillRect(0, 0, 1024, 1024); const r = rng(5);
  for (let i = 0; i < 26000; i++) { const x = r() * 1024, y = r() * 1024, a = r() * Math.PI, l = 4 + r() * 22; const v = r() > .5 ? 255 : 0; g.strokeStyle = `rgba(${v},${v},${v},${.05 + r() * .12})`; g.lineWidth = .4 + r() * 1.3; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); }
  cache.fibres = f;
  // linen weave (for rigid box wrap)
  const l = canvas(512, 512), lg = l.getContext('2d'); lg.fillStyle = '#808080'; lg.fillRect(0, 0, 512, 512); const r2 = rng(9);
  for (let y = 0; y < 512; y += 4) { lg.fillStyle = `rgba(255,255,255,${.06 + r2() * .1})`; lg.fillRect(0, y, 512, 2); }
  for (let x = 0; x < 512; x += 4) { lg.fillStyle = `rgba(0,0,0,${.05 + r2() * .08})`; lg.fillRect(x, 0, 2, 512); }
  cache.linen = l;
  cache.ready = true; return cache;
}

function tile(g, img, w, h, scale = 1, alpha = 1, op = 'source-over') {
  g.save(); g.globalAlpha = alpha; g.globalCompositeOperation = op;
  const pat = g.createPattern(img, 'repeat'); pat.setTransform(new DOMMatrix().scale(scale)); g.fillStyle = pat; g.fillRect(0, 0, w, h); g.restore();
}

/* ---------- brand marks ---------- */
const TRI = new Path2D('M32 2 62 55H2Z');
const PEE = new Path2D('M26.5 46V22.5h9.2c5.6 0 8.8 3 8.8 7.6 0 4.7-3.3 7.7-8.8 7.7h-3.6V46Zm5.6-12.6h3.1c2.4 0 3.6-1.2 3.6-3.3s-1.2-3.2-3.6-3.2h-3.1Z');
/** Draw the triangle-P mark centred at (x,y) with height s. counter = colour of the P (null = knock-out). */
export function mark(g, x, y, s, fill, counter = null) {
  g.save(); g.translate(x - s * 32 / 53, y - s * 28.5 / 53); g.scale(s / 53, s / 53);
  if (counter) { g.fillStyle = fill; g.fill(TRI); g.fillStyle = counter; g.fill(PEE, 'evenodd'); }
  else { const p = new Path2D(); p.addPath(TRI); p.addPath(PEE); g.fillStyle = fill; g.fill(p, 'evenodd'); }
  g.restore();
}
export function wordmark(g, x, y, size, fill, { tagline = true, align = 'center', tagFill } = {}) {
  g.save(); g.fillStyle = fill; g.textAlign = align; g.textBaseline = 'alphabetic';
  g.font = `480 ${size}px Fraunces`; if ('letterSpacing' in g) g.letterSpacing = `${size * .04}px`;
  g.fillText('ALL PACK', x, y);
  if (tagline) { g.font = `600 ${size * .2}px Manrope`; if ('letterSpacing' in g) g.letterSpacing = `${size * .065}px`; g.fillStyle = tagFill || fill; g.globalAlpha = .9; g.fillText('THE PACKAGING EXPERTS', x, y + size * .48); }
  g.restore();
}
export function text(g, str, x, y, { size = 40, font = 'Manrope', weight = 600, fill = '#000', align = 'center', spacing = 0, italic = false, alpha = 1, baseline = 'alphabetic' } = {}) {
  g.save(); g.globalAlpha = alpha; g.fillStyle = fill; g.textAlign = align; g.textBaseline = baseline; g.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; if ('letterSpacing' in g) g.letterSpacing = `${spacing}px`; g.fillText(str, x, y); g.restore();
}
export function foilGradient(g, x0, y0, x1, y1, tone = 'gold') {
  const gr = g.createLinearGradient(x0, y0, x1, y1);
  const stops = tone === 'silver' ? ['#8d9198', '#eef0f3', '#a4a8ae', '#f6f7f9'] : tone === 'rose' ? ['#9b6150', '#f2c9b5', '#b77965', '#f7dccf'] : ['#8f6a2f', '#f0d595', '#a87b39', '#f6e2ad'];
  stops.forEach((c, i) => gr.addColorStop(i / (stops.length - 1), c)); return gr;
}

/**
 * Printed surface. painter(g, w, h, L) draws artwork; L.mode is 'color' | 'pbr' | 'height'.
 *  - in 'color' use real colours; L.foil(...) returns a foil gradient
 *  - in 'pbr'  everything is drawn as base unless wrapped in L.special(kind) -> sets fill for foil/spot-gloss
 *  - in 'height' draw emboss areas via L.special('emboss')
 * Painters should call L.fill(color, kind) to get a fillStyle for the current mode.
 */
export function surface({ w = 1024, h = 1024, base = '#ffffff', stock = 'white', painter = null, finish = 'matte', repeat = null, seed = 1, flute = 0 } = {}) {
  const L_flute = flute;
  const Ls = layers();
  const make = (mode) => {
    const c = canvas(w, h), g = c.getContext('2d');
    const rough = { matte: .72, gloss: .2, soft: .9, uncoated: .88, kraft: .92, linen: .85, velvet: 1 }[finish] ?? .7;
    if (mode === 'color') { g.fillStyle = base; g.fillRect(0, 0, w, h); }
    else if (mode === 'pbr') { g.fillStyle = `rgb(0,${Math.round(rough * 255)},0)`; g.fillRect(0, 0, w, h); }
    else { g.fillStyle = '#808080'; g.fillRect(0, 0, w, h); }
    // stock texture
    if (mode === 'color') {
      if (stock === 'kraft') { tile(g, Ls.mottle, w, h, 1.6, .22, 'overlay'); tile(g, Ls.fibres, w, h, .9, .55, 'overlay'); }
      if (L_flute) for (let x = 0; x < w; x += L_flute) { g.fillStyle = 'rgba(0,0,0,.018)'; g.fillRect(x, 0, L_flute * .5, h); }
      else if (stock === 'linen') { tile(g, Ls.linen, w, h, .7, .35, 'overlay'); tile(g, Ls.mottle, w, h, 2, .08, 'overlay'); }
      else if (stock === 'soft') { tile(g, Ls.mottle, w, h, 2, .06, 'overlay'); }
      else { tile(g, Ls.mottle, w, h, 2, .07, 'overlay'); tile(g, Ls.grain, w, h, 1, .05, 'overlay'); }
    } else if (mode === 'height') {
      if (stock === 'kraft') { tile(g, Ls.fibres, w, h, .7, 1); tile(g, Ls.grain, w, h, .3, .45); }
      if (L_flute) for (let x = 0; x < w; x += L_flute) { g.fillStyle = 'rgba(255,255,255,.10)'; g.fillRect(x, 0, L_flute * .5, h); }
      else if (stock === 'linen') tile(g, Ls.linen, w, h, .7, 1);
      else if (stock === 'corrugated') { tile(g, Ls.grain, w, h, 1, .7); }
      else tile(g, Ls.grain, w, h, .35, stock === 'soft' ? .25 : finish === 'gloss' ? .12 : .5);
    } else if (mode === 'pbr' && finish !== 'gloss') { tile(g, Ls.mottle, w, h, 3, .08, 'overlay'); }
    if (painter) {
      const L = { mode, w, h,
        fill: (color, kind = 'ink') => {
          if (mode === 'color') return color;
          if (mode === 'pbr') return kind === 'foil' ? 'rgb(0,80,185)' : kind === 'spot' ? 'rgb(0,30,0)' : `rgb(0,${Math.round(Math.min(1, rough + (finish === 'gloss' ? 0 : -.05)) * 255)},0)`;
          return kind === 'emboss' || kind === 'foil' ? '#c8c8c8' : kind === 'deboss' ? '#404040' : 'rgba(0,0,0,0)';
        },
        foil: (x0, y0, x1, y1, tone) => mode === 'color' ? foilGradient(g, x0, y0, x1, y1, tone) : mode === 'pbr' ? 'rgb(0,80,185)' : '#b0b0b0',
        draw: (kind) => mode === 'color' || (mode === 'pbr' && (kind === 'foil' || kind === 'spot')) || (mode === 'height' && (kind === 'emboss' || kind === 'foil' || kind === 'deboss')),
      };
      g.save(); painter(g, w, h, L); g.restore();
    }
    if (mode === 'color' && stock === 'kraft') tile(g, Ls.fibres, w, h, .9, .25, 'overlay'); // ink sinks into fibres
    const t = new THREE.CanvasTexture(c); t.anisotropy = 16;
    if (mode === 'color') t.colorSpace = THREE.SRGBColorSpace;
    if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
    return t;
  };
  const map = make('color'), pbr = make('pbr'), bump = make('height');
  const params = { map, roughnessMap: pbr, metalnessMap: pbr, roughness: 1, metalness: 1, bumpMap: bump, bumpScale: finish === 'kraft' || stock === 'kraft' ? .55 : stock === 'linen' ? .9 : .45 };
  if (finish === 'gloss') Object.assign(params, { clearcoat: 1, clearcoatRoughness: .06 });
  if (finish === 'soft') Object.assign(params, { sheen: .6, sheenRoughness: .8, sheenColor: new THREE.Color('#8a8a8a') });
  if (finish === 'velvet') Object.assign(params, { sheen: 1, sheenRoughness: .45, sheenColor: new THREE.Color('#ffffff') });
  return new THREE.MeshPhysicalMaterial(params);
}

/** Plain stock material (edges, insides) without artwork. */
export function stock(kind, color, opts = {}) {
  const base = color || { kraft: C.kraft, white: '#F3F1EA', corrugated: '#C7A276', grey: '#9C9A94' }[kind] || '#fff';
  return surface({ w: 512, h: 512, base, stock: kind === 'corrugated' ? 'kraft' : kind, finish: kind === 'kraft' || kind === 'corrugated' ? 'kraft' : opts.finish || 'uncoated', repeat: opts.repeat || [2, 2] });
}

/** Corrugated cut-edge: liners with fluting between (for visible board edges). */
export function fluteEdge(color = '#C9A47A', repeat = [8, 1]) {
  const c = canvas(256, 64), g = c.getContext('2d'); g.fillStyle = '#B48B5E'; g.fillRect(0, 0, 256, 64);
  g.fillStyle = color; g.fillRect(0, 0, 256, 10); g.fillRect(0, 54, 256, 10);
  g.strokeStyle = '#D9BC95'; g.lineWidth = 5; g.beginPath(); for (let x = 0; x <= 256; x += 2) { const y = 32 + Math.sin(x / 256 * Math.PI * 2 * 4) * 19; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  g.fillStyle = 'rgba(60,35,10,.35)'; for (let k = 0; k < 4; k++) { const cx = (k + .25) * 64; g.beginPath(); g.ellipse(cx, 22, 9, 9, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(cx + 32, 42, 9, 9, 0, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat);
  return new THREE.MeshStandardMaterial({ map: t, roughness: .95 });
}
