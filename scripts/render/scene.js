// Procedural product renders for ALL PACK.
// Run with `node scripts/render/render.mjs` (needs Playwright + Chromium). Outputs public/renders/*.webp
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const NAVY = '#26337A', BLUE = '#3A7FC0', SKY = '#9CC3EA', INK = '#0E1838', GOLD = '#C9A35B';

/* ---------- textures ---------- */
function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); draw(g, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}
function noise(g, w, h, amt, alpha = 0.06) {
  for (let i = 0; i < amt; i++) {
    g.fillStyle = Math.random() > .5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    g.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 3, 1);
  }
}
function fibres(g, w, h, base) {
  g.fillStyle = base; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 2200; i++) {
    g.strokeStyle = `rgba(${Math.random() > .5 ? '90,55,20' : '255,235,200'},${Math.random() * .12})`;
    g.lineWidth = Math.random() * 1.4; g.beginPath();
    const x = Math.random() * w, y = Math.random() * h; g.moveTo(x, y);
    g.lineTo(x + (Math.random() - .5) * 26, y + (Math.random() - .5) * 26); g.stroke();
  }
  noise(g, w, h, 9000, .05);
}
function mark(g, x, y, s, fg = '#fff', bg = null) {
  // triangle "P" mark from the ALL PACK letterhead
  g.save(); g.translate(x, y);
  g.beginPath(); g.moveTo(0, -s * .55); g.lineTo(s * .55, s * .42); g.lineTo(-s * .55, s * .42); g.closePath();
  g.fillStyle = fg; g.fill();
  g.fillStyle = bg || NAVY; g.font = `800 ${s * .52}px "DejaVu Sans", Arial, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('P', 0, s * .12); g.restore();
}
function wordmark(g, x, y, size, color = '#fff', tagline = true) {
  g.save(); g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `800 ${size}px "DejaVu Sans", Arial, sans-serif`;
  if ('letterSpacing' in g) g.letterSpacing = `${size * .08}px`;
  g.fillText('ALL PACK', x, y);
  if (tagline) {
    g.font = `500 ${size * .22}px "DejaVu Sans", Arial, sans-serif`;
    if ('letterSpacing' in g) g.letterSpacing = `${size * .09}px`;
    g.globalAlpha = .8; g.fillText('THE PACKAGING EXPERTS', x, y + size * .78);
  }
  g.restore();
}
const T = {};
function tex() {
  T.kraft = canvasTex(1024, 1024, (g, w, h) => fibres(g, w, h, '#C29467'));
  T.kraftLight = canvasTex(1024, 1024, (g, w, h) => fibres(g, w, h, '#D4AE84'));
  T.white = canvasTex(512, 512, (g, w, h) => { g.fillStyle = '#F5F4F0'; g.fillRect(0, 0, w, h); noise(g, w, h, 4000, .025); });
  T.navy = canvasTex(512, 512, (g, w, h) => { g.fillStyle = NAVY; g.fillRect(0, 0, w, h); noise(g, w, h, 3000, .03); });
  T.kraftLogo = canvasTex(1024, 1024, (g, w, h) => { fibres(g, w, h, '#C29467'); g.globalAlpha = .88; mark(g, w / 2, h * .38, 260, INK, '#C29467'); wordmark(g, w / 2, h * .7, 92, INK); });
  T.kraftShip = canvasTex(1024, 1024, (g, w, h) => {
    fibres(g, w, h, '#C29467'); g.globalAlpha = .85; mark(g, w * .28, h * .3, 170, INK, '#C29467');
    g.fillStyle = INK; g.font = '800 64px "DejaVu Sans",Arial'; g.textAlign = 'left'; g.fillText('ALL PACK', w * .42, h * .32);
    g.font = '500 22px "DejaVu Sans",Arial'; g.fillText('THE PACKAGING EXPERTS', w * .42, h * .37);
    g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(w * .12, h * .62, w * .76, h * .22);
    g.font = '700 34px "DejaVu Sans",Arial'; g.textAlign = 'center'; g.fillText('HANDLE WITH CARE  ·  THIS SIDE UP', w / 2, h * .74);
    for (const dx of [-1, 1]) { g.beginPath(); const x = w / 2 + dx * 300; g.moveTo(x, h * .645); g.lineTo(x - 22, h * .69); g.lineTo(x + 22, h * .69); g.fill(); }
  });
  T.navyLogo = canvasTex(1024, 1024, (g, w, h) => { g.fillStyle = NAVY; g.fillRect(0, 0, w, h); noise(g, w, h, 4000, .025); mark(g, w / 2, h * .38, 250, '#fff'); wordmark(g, w / 2, h * .7, 88, '#fff'); });
  T.navyGold = canvasTex(1024, 1024, (g, w, h) => { g.fillStyle = '#1D2862'; g.fillRect(0, 0, w, h); noise(g, w, h, 4000, .02); const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#E9D29A'); gr.addColorStop(.5, '#B88C3F'); gr.addColorStop(1, '#F1DDA8'); mark(g, w / 2, h * .42, 230, gr, '#1D2862'); wordmark(g, w / 2, h * .72, 80, gr); });
  T.pattern = canvasTex(1024, 1024, (g, w, h) => {
    g.fillStyle = '#F4F6FB'; g.fillRect(0, 0, w, h);
    const s = 128; for (let y = -1; y < h / s + 1; y++) for (let x = -1; x < w / s + 1; x++) {
      const cx = x * s + (y % 2 ? s / 2 : 0), cy = y * s; g.fillStyle = (x + y) % 3 === 0 ? BLUE : (x + y) % 3 === 1 ? NAVY : SKY;
      g.beginPath(); g.moveTo(cx, cy - 34); g.lineTo(cx + 36, cy + 28); g.lineTo(cx - 36, cy + 28); g.closePath(); g.fill();
    }
    g.fillStyle = 'rgba(244,246,251,.94)'; g.fillRect(w * .18, h * .36, w * .64, h * .3); wordmark(g, w / 2, h * .48, 84, NAVY);
  });
  T.patternInner = canvasTex(512, 512, (g, w, h) => { g.fillStyle = '#EAF1FA'; g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(58,127,192,.35)'; for (let y = 0; y < h; y += 64) for (let x = 0; x < w; x += 64) { g.beginPath(); g.moveTo(x + 32, y + 18); g.lineTo(x + 46, y + 42); g.lineTo(x + 18, y + 42); g.fill(); } }, [2, 2]);
  T.cartonFront = canvasTex(512, 1024, (g, w, h) => {
    g.fillStyle = '#F7F7F4'; g.fillRect(0, 0, w, h);
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, NAVY); gr.addColorStop(1, BLUE);
    g.fillStyle = gr; g.fillRect(0, h * .52, w, h * .48);
    g.fillStyle = SKY; g.fillRect(0, h * .5, w, h * .02);
    mark(g, w / 2, h * .26, 150, NAVY, '#F7F7F4');
    g.fillStyle = NAVY; g.font = '800 56px "DejaVu Sans",Arial'; g.textAlign = 'center'; g.fillText('ALL PACK', w / 2, h * .41);
    g.fillStyle = '#fff'; g.font = '300 44px "DejaVu Serif",serif'; g.fillText('Essentials', w / 2, h * .66);
    g.font = '500 18px "DejaVu Sans",Arial'; g.globalAlpha = .8; g.fillText('PREMIUM  ·  CARTON  ·  01', w / 2, h * .72);
  });
  T.pizzaTop = canvasTex(1024, 1024, (g, w, h) => {
    g.fillStyle = '#F5F2EC'; g.fillRect(0, 0, w, h); noise(g, w, h, 6000, .03);
    g.strokeStyle = NAVY; g.lineWidth = 14; g.beginPath(); g.arc(w / 2, h / 2, 330, 0, Math.PI * 2); g.stroke();
    g.lineWidth = 4; g.beginPath(); g.arc(w / 2, h / 2, 300, 0, Math.PI * 2); g.stroke();
    mark(g, w / 2, h * .42, 170, NAVY, '#F5F2EC');
    g.fillStyle = NAVY; g.font = '800 70px "DejaVu Sans",Arial'; g.textAlign = 'center'; g.fillText('HOT & FRESH', w / 2, h * .62);
    g.font = '500 24px "DejaVu Sans",Arial'; g.fillText('PACKED BY ALL PACK', w / 2, h * .67);
  });
  T.cup = canvasTex(1024, 512, (g, w, h) => {
    g.fillStyle = '#F7F6F2'; g.fillRect(0, 0, w, h);
    g.fillStyle = NAVY; for (let i = 0; i < 4; i++) { mark(g, w * (i + .5) / 4, h * .45, 120, NAVY, '#F7F6F2'); }
  });
  T.sleeve = canvasTex(1024, 256, (g, w, h) => { fibres(g, w, h, '#BD8F62'); g.fillStyle = INK; g.font = '800 54px "DejaVu Sans",Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ALL PACK  ·  BREW  ·  ALL PACK  ·  BREW', w / 2, h / 2); });
  T.bagFront = canvasTex(1024, 1024, (g, w, h) => { fibres(g, w, h, '#C69A6D'); g.globalAlpha = .9; mark(g, w / 2, h * .42, 230, INK, '#C69A6D'); wordmark(g, w / 2, h * .66, 82, INK); });
  T.poly = canvasTex(1024, 1024, (g, w, h) => { const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#2E3E8F'); gr.addColorStop(1, '#3C86C6'); g.fillStyle = gr; g.fillRect(0, 0, w, h); mark(g, w / 2, h * .42, 220, '#fff', '#334898'); wordmark(g, w / 2, h * .66, 74, '#fff'); });
  T.pouch = canvasTex(1024, 1024, (g, w, h) => {
    g.fillStyle = '#EDF3FB'; g.fillRect(0, 0, w, h);
    g.fillStyle = NAVY; g.fillRect(0, h * .58, w, h * .42);
    g.fillStyle = BLUE; g.beginPath(); g.moveTo(0, h * .58); g.bezierCurveTo(w * .3, h * .5, w * .7, h * .66, w, h * .56); g.lineTo(w, h * .6); g.bezierCurveTo(w * .7, h * .7, w * .3, h * .54, 0, h * .63); g.fill();
    mark(g, w / 2, h * .3, 170, NAVY, '#EDF3FB'); g.fillStyle = NAVY; g.font = '800 64px "DejaVu Sans",Arial'; g.textAlign = 'center'; g.fillText('ALL PACK', w / 2, h * .46);
    g.fillStyle = '#fff'; g.font = '300 52px "DejaVu Serif",serif'; g.fillText('Roasted Blend', w / 2, h * .78); g.font = '500 22px "DejaVu Sans",Arial'; g.fillText('NET WT 250 G', w / 2, h * .84);
  });
  T.tape = canvasTex(1024, 128, (g, w, h) => { g.fillStyle = NAVY; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = '800 54px "DejaVu Sans",Arial'; g.textBaseline = 'middle'; for (let x = 20; x < w; x += 340) { g.fillText('ALL PACK', x, h / 2); } }, [3, 1]);
  T.tapeKraft = canvasTex(1024, 128, (g, w, h) => { g.fillStyle = '#B98A5A'; g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(40,30,20,.75)'; g.font = '800 54px "DejaVu Sans",Arial'; g.textBaseline = 'middle'; for (let x = 20; x < w; x += 340) g.fillText('ALL PACK', x, h / 2); }, [3, 1]);
  T.bubbles = canvasTex(512, 512, (g, w, h) => { g.fillStyle = '#CFE3F5'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 32) for (let x = 0; x < w; x += 32) { const ox = (y / 32) % 2 ? 16 : 0; const gr = g.createRadialGradient(x + ox + 12, y + 12, 2, x + ox + 16, y + 16, 14); gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(.6, 'rgba(200,225,248,.6)'); gr.addColorStop(1, 'rgba(120,160,200,.3)'); g.fillStyle = gr; g.beginPath(); g.arc(x + ox + 16, y + 16, 13, 0, 7); g.fill(); } }, [6, 2]);
  T.bubbleBump = canvasTex(512, 512, (g, w, h) => { g.fillStyle = '#000'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 32) for (let x = 0; x < w; x += 32) { const ox = (y / 32) % 2 ? 16 : 0; const gr = g.createRadialGradient(x + ox + 16, y + 16, 0, x + ox + 16, y + 16, 14); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#000'); g.fillStyle = gr; g.beginPath(); g.arc(x + ox + 16, y + 16, 14, 0, 7); g.fill(); } }, [6, 2]);
  T.label = (bg, fg, text) => canvasTex(512, 512, (g, w, h) => { g.fillStyle = bg; g.fillRect(0, 0, w, h); mark(g, w / 2, h * .38, 150, fg, bg); g.fillStyle = fg; g.font = '800 54px "DejaVu Sans",Arial'; g.textAlign = 'center'; g.fillText(text, w / 2, h * .74); });
  T.tissue = canvasTex(1024, 1024, (g, w, h) => { g.fillStyle = '#F3F6FC'; g.fillRect(0, 0, w, h); g.globalAlpha = .55; for (let y = 0; y < h; y += 160) for (let x = 0; x < w; x += 160) mark(g, x + ((y / 160) % 2 ? 80 : 0) + 40, y + 60, 70, BLUE, '#F3F6FC'); }, [1.4, 1.4]);
  T.cakeTop = canvasTex(1024, 1024, (g, w, h) => { g.fillStyle = '#FAF6F2'; g.fillRect(0, 0, w, h); g.fillStyle = '#E8B7C3'; g.fillRect(0, h * .82, w, h * .18); g.fillStyle = NAVY; g.font = 'italic 300 86px "DejaVu Serif",serif'; g.textAlign = 'center'; g.fillText('Patisserie', w / 2, h * .9 + 12); });
  T.shoeLid = canvasTex(1024, 1024, (g, w, h) => { g.fillStyle = INK; g.fillRect(0, 0, w, h); noise(g, w, h, 4000, .03); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.strokeRect(40, 40, w - 80, h - 80); mark(g, w / 2, h * .42, 190, '#fff', INK); wordmark(g, w / 2, h * .66, 70, '#fff'); });
  T.velvet = canvasTex(256, 256, (g, w, h) => { g.fillStyle = '#1F2B66'; g.fillRect(0, 0, w, h); noise(g, w, h, 6000, .05); });
  T.orange = canvasTex(256, 256, (g, w, h) => { g.fillStyle = '#F08A24'; g.fillRect(0, 0, w, h); noise(g, w, h, 5000, .06); });
  T.bottleLabel = canvasTex(1024, 512, (g, w, h) => { g.fillStyle = '#F6F4EE'; g.fillRect(0, 0, w, h); g.fillStyle = NAVY; g.fillRect(0, 0, w, 26); g.fillRect(0, h - 26, w, 26); mark(g, w * .25, h * .45, 150, NAVY, '#F6F4EE'); g.font = '800 70px "DejaVu Sans",Arial'; g.textAlign = 'center'; g.fillText('ALL PACK', w * .25, h * .78); g.font = 'italic 300 64px "DejaVu Serif",serif'; g.fillText('Botanical', w * .75, h * .5); g.font = '500 22px "DejaVu Sans",Arial'; g.fillText('BODY OIL · 100 ML', w * .75, h * .62); });
  T.takeaway = canvasTex(1024, 512, (g, w, h) => { g.fillStyle = '#F6F3EC'; g.fillRect(0, 0, w, h); g.fillStyle = NAVY; for (let i = 0; i < 4; i++) { const x = w * (i + .5) / 4; mark(g, x, h * .42, 130, NAVY, '#F6F3EC'); } g.fillStyle = BLUE; g.fillRect(0, h * .78, w, h * .06); });
}

/* ---------- materials ---------- */
const M = {
  std: (o) => new THREE.MeshStandardMaterial({ roughness: .78, metalness: 0, ...o }),
  phys: (o) => new THREE.MeshPhysicalMaterial({ roughness: .5, ...o }),
};
const edgeKraft = () => M.std({ color: '#B98B5E', roughness: .95 });

/* ---------- builders ---------- */
function shadowy(o) { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; }
function rbox(w, h, d, mats, r = .03) {
  const geo = new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2.1, h / 2.1, d / 2.1));
  return new THREE.Mesh(geo, mats);
}
function faces({ px, nx, py, ny, pz, nz }) { return [px, nx, py, ny, pz, nz]; }
/** Open-top tray: walls with outer/inner materials. */
function tray(w, h, d, outer, inner, t = .03, edge) {
  const g = new THREE.Group(); edge = edge || outer;
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(w, t, d), faces({ px: edge, nx: edge, py: inner, ny: outer, pz: edge, nz: edge }));
  bottom.position.y = t / 2; g.add(bottom);
  const wall = (len, rotY, x, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(len, h, t), faces({ px: edge, nx: edge, py: edge, ny: edge, pz: outer, nz: inner }));
    m.rotation.y = rotY; m.position.set(x, h / 2, z); g.add(m);
  };
  wall(w, 0, 0, d / 2 - t / 2); wall(w, Math.PI, 0, -d / 2 + t / 2);
  wall(d - 2 * t, Math.PI / 2, w / 2 - t / 2, 0); wall(d - 2 * t, -Math.PI / 2, -w / 2 + t / 2, 0);
  return g;
}
/** hinged flat lid that opens around the back edge */
function hingedLid(w, d, t, top, under, edge, angle, overhang = 0) {
  const pivot = new THREE.Group();
  const lid = new THREE.Mesh(new THREE.BoxGeometry(w + overhang, t, d + overhang), faces({ px: edge, nx: edge, py: top, ny: under, pz: edge, nz: edge }));
  lid.position.set(0, t / 2, d / 2); pivot.add(lid); pivot.rotation.x = -angle; return pivot;
}
function lathe(points, mat, seg = 96) { return new THREE.Mesh(new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), seg), mat); }

const B = {};
function tapeV() { const t = T.tape.clone(); t.center.set(.5, .5); t.rotation = Math.PI / 2; t.repeat.set(2, 1); t.needsUpdate = true; return t; }
B.shipping = () => {
  const g = new THREE.Group();
  const side = M.std({ map: T.kraft }), logo = M.std({ map: T.kraftShip });
  const box = rbox(2.6, 1.9, 2.0, faces({ px: M.std({ map: T.kraftLogo }), nx: side, py: side, ny: side, pz: logo, nz: side }), .02); box.position.y = .95; g.add(box);
  const tape = new THREE.Mesh(new THREE.BoxGeometry(.5, .006, 2.04), M.std({ map: tapeV(), roughness: .35 })); tape.position.y = 1.903; g.add(tape);
  const tapeF = new THREE.Mesh(new THREE.BoxGeometry(.5, .45, .006), M.std({ map: tapeV(), roughness: .35 })); tapeF.position.set(0, 1.68, 1.003); g.add(tapeF);
  const small = rbox(1.5, 1.1, 1.3, M.std({ map: T.kraftLogo }), .02); small.position.set(2.3, .55, .3); small.rotation.y = -.35; g.add(small);
  return g;
};
B.cargo = () => {
  const g = new THREE.Group(); const side = M.std({ map: T.kraft }); const logo = M.std({ map: T.kraftShip });
  const mk = (x, y, z, ry, s = 1) => { const b = rbox(2.2 * s, 1.5 * s, 1.8 * s, faces({ px: side, nx: side, py: side, ny: side, pz: logo, nz: side }), .02); b.position.set(x, y + .75 * s, z); b.rotation.y = ry; g.add(b); const strap = new THREE.Mesh(new THREE.BoxGeometry(.08, 1.5 * s + .01, 1.8 * s + .01), M.std({ color: '#1E2A66', roughness: .5 })); strap.position.copy(b.position); strap.rotation.y = ry; strap.position.x += Math.cos(ry) * .6 * s; strap.position.z -= Math.sin(ry) * .6 * s; g.add(strap); };
  mk(0, 0, 0, 0); mk(2.35, 0, .15, -.06); mk(1.1, 1.5, .05, .12);
  return g;
};
B.mailer = () => {
  const g = new THREE.Group(); const outer = M.std({ map: T.navy, roughness: .6 }); const inner = M.std({ map: T.patternInner, roughness: .8 }); const edge = M.std({ color: '#E8E4DA' });
  const w = 2.8, h = .9, d = 2.2, t = .035;
  const base = tray(w, h, d, outer, inner, t, edge); g.add(base);
  const lid = hingedLid(w, d, t, M.std({ map: T.navyLogo, roughness: .55 }), inner, edge, 1.95);
  lid.position.set(0, h, -d / 2); g.add(lid);
  const tuck = new THREE.Mesh(new THREE.BoxGeometry(w * .9, .35, t), faces({ px: edge, nx: edge, py: edge, ny: edge, pz: inner, nz: outer }));
  tuck.position.set(0, .17 + t, d - t); lid.children[0].add(tuck); tuck.position.set(0, -.17, d / 2);
  // tissue inside
  const tissue = new THREE.Mesh(new THREE.PlaneGeometry(w * .92, d * .9, 40, 30), M.std({ map: T.tissue, side: THREE.DoubleSide, roughness: .9 }));
  const p = tissue.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 4.1) * .04 + Math.cos(p.getY(i) * 5.3) * .035 + Math.random() * .01);
  tissue.geometry.computeVertexNormals(); tissue.rotation.x = -Math.PI / 2; tissue.position.y = h * .82; g.add(tissue);
  const card = new THREE.Mesh(new THREE.BoxGeometry(.9, .02, .9), faces({ px: edge, nx: edge, py: M.std({ map: T.label(NAVY, '#fff', 'THANK YOU') }), ny: edge, pz: edge, nz: edge })); card.position.set(.3, h * .88, .25); card.rotation.y = .25; card.rotation.z = .05; g.add(card);
  return g;
};
B.gift = () => {
  const g = new THREE.Group(); const lidMat = M.std({ map: T.navyGold, roughness: .42 }); const side = M.std({ color: '#1D2862', roughness: .45 });
  const base = rbox(2.4, 1.0, 2.4, side, .02); base.position.y = .5; g.add(base);
  const lid = rbox(2.48, .55, 2.48, faces({ px: side, nx: side, py: lidMat, ny: side, pz: side, nz: side }), .02);
  lid.position.set(0, 1.05 + .18, 0); lid.rotation.set(.0, 0, 0); g.add(lid);
  const ribbon = new THREE.Mesh(new THREE.BoxGeometry(.26, 1.01, 2.42), M.phys({ color: GOLD, roughness: .3, metalness: .5, sheen: 1 })); ribbon.position.set(-.75, .5, 0); g.add(ribbon);
  const ribbonL = new THREE.Mesh(new THREE.BoxGeometry(.26, .56, 2.5), M.phys({ color: GOLD, roughness: .3, metalness: .5 })); ribbonL.position.set(-.75, 1.23, 0); g.add(ribbonL);
  const small = rbox(1.2, .7, 1.2, faces({ px: M.std({ color: '#F1EDE4' }), nx: M.std({ color: '#F1EDE4' }), py: M.std({ map: T.navyLogo }), ny: side, pz: M.std({ color: '#F1EDE4' }), nz: side }), .02); small.position.set(2.0, .35, .6); small.rotation.y = .5; g.add(small);
  return g;
};
B.jewellery = () => {
  const g = new THREE.Group(); const side = M.std({ color: '#1D2862', roughness: .45 }); const vel = M.std({ map: T.velvet, roughness: 1 });
  const base = tray(1.6, .7, 1.6, side, vel, .06); g.add(base);
  const cushion = rbox(1.46, .5, 1.46, vel, .15); cushion.position.y = .35; g.add(cushion);
  const lid = hingedLid(1.6, 1.6, .25, M.std({ map: T.navyGold, roughness: .4 }), vel, side, 1.75); lid.position.set(0, .7, -.8); g.add(lid);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.26, .045, 32, 96), M.phys({ color: '#E2C178', metalness: 1, roughness: .18 })); ring.position.set(0, .82, .1); ring.rotation.x = -.25; g.add(ring);
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(.11), M.phys({ color: '#E8F3FF', metalness: 0, roughness: 0, transmission: .9, ior: 2.4, thickness: .3 })); gem.position.set(0, 1.12, .03); g.add(gem);
  const pouch = rbox(1.1, .12, .8, M.std({ map: T.navyLogo, roughness: .9 }), .06); pouch.position.set(1.7, .06, .5); pouch.rotation.y = -.4; g.add(pouch);
  return g;
};
B.shoe = () => {
  const g = new THREE.Group(); const side = M.std({ color: '#F0EEE8' }); const inner = M.std({ map: T.tissue });
  const base = tray(3.0, 1.1, 1.9, side, inner, .04); g.add(base);
  const lid = rbox(3.08, .3, 1.98, faces({ px: M.std({ color: INK }), nx: M.std({ color: INK }), py: M.std({ map: T.shoeLid, roughness: .5 }), ny: side, pz: M.std({ color: INK }), nz: M.std({ color: INK }) }), .015);
  lid.position.set(.15, 1.55, -.55); lid.rotation.set(-.55, .12, .04); g.add(lid);
  const tissue = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.8, 40, 30), M.std({ map: T.tissue, side: THREE.DoubleSide }));
  const p = tissue.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 3) * .08 + Math.cos(p.getY(i) * 4) * .06);
  tissue.geometry.computeVertexNormals(); tissue.rotation.x = -Math.PI / 2; tissue.position.y = .98; g.add(tissue);
  return g;
};
B.printed = () => {
  const g = new THREE.Group(); const pat = M.std({ map: T.pattern, roughness: .55 });
  const b = rbox(2.2, 2.2, 2.2, pat, .02); b.position.y = 1.1; b.rotation.y = .1; g.add(b);
  const b2 = rbox(1.4, 1.0, 1.4, pat, .02); b2.position.set(2.05, .5, .55); b2.rotation.y = -.5; g.add(b2);
  return g;
};
B.carton = () => {
  const g = new THREE.Group(); const front = M.std({ map: T.cartonFront, roughness: .5 }); const side = M.std({ color: '#F7F7F4', roughness: .5 }); const navy = M.std({ map: T.navy, roughness: .5 });
  const mk = (x, z, ry, s) => { const b = rbox(1.1 * s, 2.2 * s, .75 * s, faces({ px: navy, nx: navy, py: side, ny: side, pz: front, nz: navy }), .01); b.position.set(x, 1.1 * s, z); b.rotation.y = ry; g.add(b); const flap = new THREE.Mesh(new THREE.BoxGeometry(1.1 * s, .01, .3 * s), side); flap.position.set(0, 1.1 * s + .12 * s, -.36 * s); flap.rotation.x = -1.0; b.add(flap); };
  mk(0, 0, .15, 1); mk(1.35, .35, -.25, .85); mk(-1.25, .4, .45, .78);
  return g;
};
B.bottle = () => {
  const g = new THREE.Group();
  const glass = M.phys({ color: '#8C5420', roughness: .08, transmission: .55, thickness: .6, ior: 1.5, clearcoat: 1 });
  const prof = [[0, 0], [.55, 0], [.6, .05], [.6, 1.6], [.55, 1.8], [.25, 2.05], [.2, 2.25], [0, 2.25]];
  const mk = (x, z, s, glassMat, capColor) => {
    const b = lathe(prof, glassMat); b.scale.setScalar(s); b.position.set(x, 0, z); g.add(b);
    const lbl = new THREE.Mesh(new THREE.CylinderGeometry(.605, .605, .9, 96, 1, true), M.std({ map: T.bottleLabel, roughness: .7 })); lbl.position.y = .8; b.add(lbl);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(.24, .24, .32, 48), M.std({ color: capColor, roughness: .35 })); cap.position.y = 2.38; b.add(cap);
  };
  mk(0, 0, 1, glass, NAVY);
  mk(1.35, .5, .78, M.phys({ color: '#E9EEF6', roughness: .15, transmission: .2, clearcoat: 1 }), '#1A1A1A');
  const jar = lathe([[0, 0], [.7, 0], [.75, .05], [.75, .8], [.6, .9], [0, .9]], M.phys({ color: '#F2F4F8', roughness: .2, clearcoat: 1 })); jar.position.set(-1.35, 0, .55); g.add(jar);
  const jl = new THREE.Mesh(new THREE.CylinderGeometry(.66, .66, .3, 64), M.std({ color: NAVY, roughness: .3, metalness: .2 })); jl.position.set(-1.35, 1.03, .55); g.add(jl);
  return g;
};
B.pizza = () => {
  const g = new THREE.Group(); const top = M.std({ map: T.pizzaTop }); const side = M.std({ map: T.kraft }); const white = M.std({ color: '#F2EFE8' });
  const closed = (y, ry) => { const b = rbox(2.8, .3, 2.8, faces({ px: side, nx: side, py: top, ny: side, pz: side, nz: side }), .01); b.position.y = y; b.rotation.y = ry; g.add(b); };
  closed(.15, 0); closed(.45, .15);
  const open = new THREE.Group(); open.position.set(.15, .6, .2); open.rotation.y = -.1; g.add(open);
  open.add(tray(2.8, .3, 2.8, side, white, .02));
  const crust = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, .1, 64), M.std({ color: '#E2A04C', roughness: .9 })); crust.position.y = .08; open.add(crust);
  const sauce = new THREE.Mesh(new THREE.CylinderGeometry(1.06, 1.06, .1, 64), M.std({ color: '#D9B25B', roughness: .8 })); sauce.position.y = .1; open.add(sauce);
  for (let i = 0; i < 16; i++) { const a = i * 2.4, r = .25 + (i % 5) * .17; const pep = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, .03, 24), M.std({ color: '#A3301F' })); pep.position.set(Math.cos(a) * r, .16, Math.sin(a) * r); open.add(pep); }
  const lid = hingedLid(2.8, 2.8, .02, white, top, side, 1.25); lid.position.set(0, .3, -1.4); open.add(lid);
  return g;
};
B.burger = () => {
  const g = new THREE.Group(); const k = M.std({ map: T.kraftLogo }); const s = M.std({ map: T.kraft });
  const mk = (x, z, ry) => { const base = tray(1.5, .65, 1.5, s, M.std({ color: '#D9B48A' }), .03); base.position.set(x, 0, z); base.rotation.y = ry; g.add(base); const lid = hingedLid(1.5, 1.5, .03, k, s, s, .0); const dome = rbox(1.5, .6, 1.5, faces({ px: s, nx: s, py: k, ny: s, pz: k, nz: s }), .05); dome.position.set(0, .95, 0); base.add(dome); return base; };
  mk(0, 0, .2);
  const open = tray(1.5, .65, 1.5, s, M.std({ color: '#D9B48A' }), .03); open.position.set(1.8, 0, .5); open.rotation.y = -.3; g.add(open);
  const lid = new THREE.Group(); const lt = tray(1.5, .6, 1.5, s, M.std({ color: '#D9B48A' }), .03); lt.rotation.x = Math.PI; lt.position.set(0, 0, 0); lid.add(lt); lid.position.set(0, .65, -.75); const pv = new THREE.Group(); pv.add(lid); lid.position.set(0, 0, .75); lt.position.set(0, 0, 0); pv.position.set(0, .65, -.75); pv.rotation.x = -1.9; open.add(pv);
  const bun = new THREE.Mesh(new THREE.SphereGeometry(.55, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), M.std({ color: '#D18A3A', roughness: .6 })); bun.position.set(0, .45, 0); bun.scale.y = .7; open.add(bun);
  const patty = new THREE.Mesh(new THREE.CylinderGeometry(.58, .58, .14, 48), M.std({ color: '#5A3220' })); patty.position.y = .35; open.add(patty);
  const lettuce = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, .04, 48), M.std({ color: '#6FAE3D' })); lettuce.position.y = .44; open.add(lettuce);
  const bottom = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, .16, 48), M.std({ color: '#D9944A' })); bottom.position.y = .2; open.add(bottom);
  return g;
};
B.cake = () => {
  const g = new THREE.Group(); const w = M.std({ color: '#F1EBE4' }); const pink = M.std({ color: '#E7AFC0' });
  const box = tray(2.2, 1.3, 2.2, M.std({ map: T.cakeTop }), w, .03); g.add(box);
  const cake = new THREE.Mesh(new THREE.CylinderGeometry(.85, .85, .8, 64), M.std({ color: '#F3C9D4', roughness: .7 })); cake.position.y = .44; g.add(cake);
  const cream = new THREE.Mesh(new THREE.TorusGeometry(.75, .07, 16, 64), M.std({ color: '#fff' })); cream.rotation.x = Math.PI / 2; cream.position.y = .86; g.add(cream);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const b = new THREE.Mesh(new THREE.SphereGeometry(.09, 24, 12), M.std({ color: '#C1273B', roughness: .3 })); b.position.set(Math.cos(a) * .55, .92, Math.sin(a) * .55); g.add(b); }
  const lid = hingedLid(2.26, 2.26, .03, M.std({ color: '#FBF7F3' }), pink, w, 1.15); lid.position.set(0, 1.3, -1.1); g.add(lid);
  const small = rbox(1.2, .9, 1.2, faces({ px: M.std({ map: T.cakeTop }), nx: w, py: M.std({ color: '#FBF7F3' }), ny: w, pz: M.std({ map: T.cakeTop }), nz: w }), .01); small.position.set(1.95, .45, .7); small.rotation.y = -.35; g.add(small);
  const rib = new THREE.Mesh(new THREE.BoxGeometry(1.22, .1, .1), pink); rib.position.set(0, .46, 0); small.add(rib); const rib2 = new THREE.Mesh(new THREE.BoxGeometry(.1, .1, 1.22), pink); rib2.position.set(0, .46, 0); small.add(rib2);
  return g;
};
B.takeaway = () => {
  const g = new THREE.Group();
  const mat = M.std({ map: T.takeaway, side: THREE.DoubleSide });
  const plain = M.std({ color: '#F4F0E7', side: THREE.DoubleSide });
  const mk = (x, z, s, ry) => {
    const grp = new THREE.Group(); grp.position.set(x, 0, z); grp.rotation.y = ry; grp.scale.setScalar(s); g.add(grp);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.0, .72, 1.5, 4, 1, true), mat); body.rotation.y = Math.PI / 4; body.position.y = .75; grp.add(body);
    const bot = new THREE.Mesh(new THREE.CylinderGeometry(.72, .72, .02, 4), plain); bot.rotation.y = Math.PI / 4; bot.position.y = .01; grp.add(bot);
    const half = 1.0 / Math.SQRT2 * Math.SQRT2; // top square half-size = 1.0*cos45*sqrt2
    for (const sgn of [1, -1]) { const flap = new THREE.Mesh(new THREE.PlaneGeometry(1.42, .78), plain); flap.position.set(0, 1.5 + .3, sgn * .32); flap.rotation.x = sgn * -.95; grp.add(flap); }
    for (const sgn of [1, -1]) { const tri = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sgn * .71, 1.5, -.71), new THREE.Vector3(sgn * .71, 1.5, .71), new THREE.Vector3(sgn * .71, 2.12, 0)]), plain); tri.geometry.computeVertexNormals(); grp.add(tri); }
    const handle = new THREE.Mesh(new THREE.TorusGeometry(.62, .016, 8, 64, Math.PI), M.std({ color: '#B8BEC9', metalness: 1, roughness: .3 })); handle.position.y = 1.95; grp.add(handle);
  };
  mk(0, 0, 1, 0); mk(1.85, .5, .78, -.4);
  return g;
};
B.cup = () => {
  const g = new THREE.Group();
  const mk = (x, z, s, ry, lid = true) => {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(.62 * s, .45 * s, 1.9 * s, 96, 1, true), M.std({ map: T.cup, side: THREE.DoubleSide, roughness: .6 }));
    cup.position.set(x, .95 * s, z); cup.rotation.y = ry; g.add(cup);
    const bottom = new THREE.Mesh(new THREE.CircleGeometry(.45 * s, 64), M.std({ color: '#eee' })); bottom.rotation.x = -Math.PI / 2; bottom.position.set(x, .01, z); g.add(bottom);
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(.592 * s + .012, .515 * s + .012, .6 * s, 96, 1, true), M.std({ map: T.sleeve, roughness: .9 })); sleeve.position.set(x, 1.15 * s, z); sleeve.rotation.y = ry + 1; g.add(sleeve);
    if (lid) { const l = lathe([[0, .22], [.4, .22], [.45, .12], [.66, .08], [.66, 0], [0, 0]].map(([a, b]) => [a * s, b * s]), M.std({ color: NAVY, roughness: .35 })); l.position.set(x, 1.9 * s, z); g.add(l); }
  };
  mk(0, 0, 1.15, 0); mk(1.45, .35, .9, 1.4); mk(-1.25, .55, .75, 2.2, true);
  return g;
};
function ropeHandle(w, h, z) {
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-w / 2, 0, z), new THREE.Vector3(-w / 2.4, h * .7, z), new THREE.Vector3(0, h, z), new THREE.Vector3(w / 2.4, h * .7, z), new THREE.Vector3(w / 2, 0, z)]);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 64, .028, 12), M.std({ color: '#8A5E34', roughness: .9 }));
}
B.bag = () => {
  const g = new THREE.Group(); const side = M.std({ map: T.kraft }); const front = M.std({ map: T.bagFront });
  const mk = (x, z, ry, s, fr, sd) => { const b = new THREE.Group(); const body = rbox(1.9, 2.4, .9, faces({ px: sd, nx: sd, py: M.std({ color: '#5d3d1f' }), ny: sd, pz: fr, nz: fr }), .01); body.position.y = 1.2; b.add(body); const h1 = ropeHandle(.9, .75, .3); h1.position.y = 2.38; b.add(h1); const h2 = ropeHandle(.9, .75, -.3); h2.position.y = 2.38; b.add(h2); b.scale.setScalar(s); b.position.set(x, 0, z); b.rotation.y = ry; g.add(b); };
  mk(0, 0, .2, 1, front, side);
  mk(1.7, .5, -.25, .78, M.std({ map: T.navyLogo, roughness: .6 }), M.std({ map: T.navy, roughness: .6 }));
  return g;
};
B.mailerbag = () => {
  const g = new THREE.Group();
  const mk = (x, y, z, rx, ry, rz, s) => { const geo = new RoundedBoxGeometry(2.2 * s, .14 * s, 2.8 * s, 6, .07 * s); const p = geo.attributes.position; for (let i = 0; i < p.count; i++) { const X = p.getX(i) / (1.1 * s), Z = p.getZ(i) / (1.4 * s); const puff = (1 - X * X) * (1 - Z * Z); p.setY(i, p.getY(i) * (1 + puff * 2.4)); } geo.computeVertexNormals(); const m = new THREE.Mesh(geo, faces({ px: M.phys({ map: T.poly, roughness: .35, clearcoat: .6 }), nx: M.phys({ map: T.poly, roughness: .35 }), py: M.phys({ map: T.poly, roughness: .3, clearcoat: .8 }), ny: M.std({ color: '#2E3E8F' }), pz: M.std({ color: '#2E3E8F' }), nz: M.std({ color: '#2E3E8F' }) })); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); };
  mk(.0, .2, 0, 0, .25, 0, 1); mk(1.2, .5, .6, .06, -.35, 0.05, .82); mk(-1.0, .62, .5, -.05, .7, -.04, .7);
  return g;
};
B.pouch = () => {
  const g = new THREE.Group();
  const mk = (x, z, ry, s) => {
    const shape = new THREE.Shape(); const w = .9, h = 2.6; shape.moveTo(-w, 0); shape.lineTo(w, 0); shape.lineTo(w * .95, h); shape.lineTo(-w * .95, h); shape.lineTo(-w, 0);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: .02, bevelEnabled: true, bevelThickness: .28, bevelSize: .06, bevelSegments: 10, curveSegments: 4 });
    geo.computeBoundingBox(); const bb = geo.boundingBox; const p = geo.attributes.position; const uv = geo.attributes.uv;
    for (let i = 0; i < p.count; i++) { const X = p.getX(i), Y = p.getY(i), Z = p.getZ(i); const taper = Math.min(1, Y / .5) * Math.min(1, (h - Y) / .35); p.setZ(i, (Z - .01) * (.25 + .75 * Math.max(0, taper)) + (Y < .3 ? (Z > .01 ? .25 : -.25) * (1 - Y / .3) : 0)); uv.setXY(i, (X - bb.min.x) / (bb.max.x - bb.min.x), (Y - bb.min.y) / (bb.max.y - bb.min.y)); }
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, M.phys({ map: T.pouch, roughness: .4, clearcoat: .5 })); m.scale.setScalar(s); m.position.set(x, 0, z); m.rotation.y = ry; g.add(m);
    const zip = new THREE.Mesh(new THREE.BoxGeometry(1.75, .03, .1), M.std({ color: '#d6deea' })); zip.position.y = h - .3; m.add(zip);
  };
  mk(0, 0, .15, 1); mk(1.6, .5, -.3, .8); mk(-1.45, .55, .55, .72);
  return g;
};
B.roll = () => {
  const g = new THREE.Group();
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(.9, .9, 2.6, 96), [M.phys({ map: T.bubbles, bumpMap: T.bubbleBump, bumpScale: 4, transmission: .3, roughness: .2, clearcoat: 1, color: '#E3F0FB' }), M.std({ color: '#C3D9EE' }), M.std({ color: '#C3D9EE' })]);
  roll.rotation.z = Math.PI / 2; roll.position.y = .9; g.add(roll);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(.25, .25, 2.64, 48), M.std({ map: T.kraft })); core.rotation.z = Math.PI / 2; core.position.y = .9; g.add(core);
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.2, 30, 30), M.phys({ map: T.bubbles, bumpMap: T.bubbleBump, bumpScale: 4, roughness: .2, clearcoat: 1, color: '#E3F0FB', side: THREE.DoubleSide, transparent: true, opacity: .92 }));
  const p = sheet.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin((p.getY(i) + 1.1) * 1.4) * .08); sheet.geometry.computeVertexNormals();
  sheet.rotation.x = -Math.PI / 2; sheet.position.set(0, .03, 1.85); g.add(sheet);
  const box = rbox(1.6, 1.0, 1.3, M.std({ map: T.kraftLogo }), .02); box.position.set(2.25, .5, -.2); box.rotation.y = -.4; g.add(box);
  return g;
};
B.tape = () => {
  const g = new THREE.Group();
  const mk = (x, z, rx, ry, map, s = 1) => {
    const ring = lathe([[.48, -.35], [.95, -.35], [.95, .35], [.48, .35]], [M.std({ map, roughness: .4 })], 128);
    ring.material = M.std({ map, roughness: .4 });
    const outer = new THREE.Mesh(new THREE.CylinderGeometry(.95, .95, .7, 128, 1, true), M.std({ map, roughness: .35 }));
    const side = new THREE.Mesh(new THREE.RingGeometry(.5, .95, 96), M.std({ color: map === T.tape ? '#1E2A66' : '#A87C50', roughness: .5, side: THREE.DoubleSide })); side.rotation.x = -Math.PI / 2; side.position.y = .35;
    const side2 = side.clone(); side2.position.y = -.35;
    const core = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .72, 64, 1, true), M.std({ map: T.kraft, side: THREE.DoubleSide }));
    const grp = new THREE.Group(); grp.add(outer, side, side2, core); grp.scale.setScalar(s); grp.position.set(x, .35 * s, z); grp.rotation.set(rx, ry, 0); g.add(grp); return grp;
  };
  mk(0, 0, 0, 0, T.tape);
  const r2 = mk(1.65, .4, Math.PI / 2, .3, T.tapeKraft, .85); r2.position.y = .95 * .85;
  const strip = new THREE.Mesh(new THREE.PlaneGeometry(1.8, .62), M.std({ map: T.tape, side: THREE.DoubleSide, roughness: .35 })); strip.rotation.x = -Math.PI / 2; strip.position.set(-.2, .01, 1.6); strip.rotation.z = -1.2; g.add(strip);
  return g;
};
B.label = () => {
  const g = new THREE.Group();
  const specs = [[NAVY, '#fff', 'ALL PACK'], ['#F4F6FB', NAVY, 'FRESH'], [BLUE, '#fff', 'HANDMADE'], ['#E8C77E', INK, 'PREMIUM'], ['#fff', BLUE, 'THANK YOU']];
  specs.forEach(([bg, fg, txt], i) => {
    const round = i % 2 === 0; const geo = round ? new THREE.CylinderGeometry(.75, .75, .02, 96) : new RoundedBoxGeometry(1.5, .02, 1.5, 4, .01);
    const top = M.std({ map: T.label(bg, fg, txt), roughness: .4 }); const edge = M.std({ color: '#fff' });
    const m = new THREE.Mesh(geo, round ? [edge, top, edge] : faces({ px: edge, nx: edge, py: top, ny: edge, pz: edge, nz: edge }));
    if (round) { top.map.center.set(.5, .5); }
    m.position.set((i - 2) * 1.05 + (i % 2) * .2, .02 + i * .022, (i % 2 ? .45 : -.35)); m.rotation.y = (i - 2) * .35; m.rotation.x = 0; g.add(m);
  });
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, .9, 96, 1, true), M.std({ map: T.label(NAVY, '#fff', 'ALL PACK'), roughness: .4 })); roll.position.set(.4, .45, -1.8); g.add(roll);
  const rcap = new THREE.Mesh(new THREE.RingGeometry(.4, 1, 96), M.std({ color: '#fff', side: THREE.DoubleSide })); rcap.rotation.x = -Math.PI / 2; rcap.position.set(.4, .905, -1.8); g.add(rcap);
  return g;
};
B.tissue = () => {
  const g = new THREE.Group(); const box = tray(3.0, .7, 2.2, M.std({ map: T.navy, roughness: .5 }), M.std({ color: '#EEF2FA' }), .04); g.add(box);
  for (let k = 0; k < 3; k++) {
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.6, 60, 50), M.std({ map: T.tissue, side: THREE.DoubleSide, roughness: .95, transparent: true, opacity: .97 }));
    const p = sheet.geometry.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i); const edge = Math.max(Math.abs(x) - 1.35, Math.abs(y) - 1.0, 0); p.setZ(i, Math.sin(x * 5 + k) * .05 + Math.cos(y * 6 + k * 2) * .05 + edge * (1.4 + k * .2) + Math.random() * .015); }
    sheet.geometry.computeVertexNormals(); sheet.rotation.x = -Math.PI / 2; sheet.rotation.z = k * .12; sheet.position.y = .55 + k * .05; g.add(sheet);
  }
  const seal = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .01, 64), [M.std({ color: '#fff' }), M.std({ map: T.label(GOLD, INK, 'ALL PACK') }), M.std({ color: '#fff' })]); seal.position.set(0, .82, .2); g.add(seal);
  return g;
};
B.produce = () => {
  const g = new THREE.Group(); const k = M.std({ map: T.kraftLogo }); const s = M.std({ map: T.kraft }); const inner = M.std({ map: T.kraftLight });
  const box = tray(3.0, .9, 2.0, s, inner, .04); g.add(box);
  const front = new THREE.Mesh(new THREE.PlaneGeometry(2.9, .86), k); front.position.set(0, .45, 1.002); k.map.repeat.set(1, .3); k.map.offset.set(0, .55); g.add(front);
  const om = M.std({ map: T.orange, roughness: .6, bumpMap: T.orange, bumpScale: 2 });
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { const o = new THREE.Mesh(new THREE.SphereGeometry(.24, 32, 24), om); o.position.set(-1.2 + i * .48 + (Math.random() - .5) * .04, .78 + Math.random() * .04, -.72 + j * .48); g.add(o); const leaf = new THREE.Mesh(new THREE.SphereGeometry(.05, 8, 8), M.std({ color: '#3f7a2a' })); leaf.position.set(o.position.x, o.position.y + .23, o.position.z); g.add(leaf); }
  return g;
};

/* hero composition */
B.hero = () => {
  const g = new THREE.Group();
  const add = (k, x, z, ry, s) => { const o = B[k](); o.scale.setScalar(s); o.position.set(x, 0, z); o.rotation.y = ry; g.add(o); return o; };
  const mailer = B.mailer(); mailer.position.set(0, 0, .4); mailer.rotation.y = -.28; g.add(mailer);
  const gift = B.gift(); gift.children.length = 4; gift.scale.setScalar(.8); gift.position.set(-3.1, 0, -.6); gift.rotation.y = .35; g.add(gift);
  const bagG = new THREE.Group(); const bag = B.bag(); bag.children.length = 1; bagG.add(bag); bagG.scale.setScalar(1.05); bagG.position.set(3.1, 0, -.9); bagG.rotation.y = -.35; g.add(bagG);
  const carton = B.carton(); carton.children.length = 1; carton.scale.setScalar(.85); carton.position.set(-1.6, 0, -2.0); carton.rotation.y = .2; g.add(carton);
  const cup = B.cup(); cup.children.length = 5; cup.scale.setScalar(.85); cup.position.set(1.7, 0, 1.9); g.add(cup);
  return g;
};
B.studio = () => { const g = new THREE.Group(); const m = B.mailer(); g.add(m); return g; };

/* ---------- render ---------- */
export async function render(name, { w = 1600, h = 1200, view = 'default' } = {}) {
  if (!T.kraft) tex();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(w, h);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 1.0; renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.body.innerHTML = ''; document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture; scene.environmentIntensity = .9;
  const obj = shadowy(B[name]()); scene.add(obj);
  const box = new THREE.Box3().setFromObject(obj); const c = box.getCenter(new THREE.Vector3()); obj.position.x -= c.x; obj.position.z -= c.z;
  const size = box.getSize(new THREE.Vector3()); const radius = size.length() / 2;
  const key = new THREE.DirectionalLight('#fff', 2.4); key.position.set(-4, 9, 6); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.radius = 14; key.shadow.blurSamples = 24; key.shadow.bias = -.0004;
  const sc = key.shadow.camera; sc.left = sc.bottom = -radius * 1.6; sc.right = sc.top = radius * 1.6; sc.near = .5; sc.far = 40; scene.add(key);
  const rim = new THREE.DirectionalLight('#cfe2ff', 1.1); rim.position.set(6, 4, -6); scene.add(rim);
  scene.add(new THREE.HemisphereLight('#ffffff', '#dfe6f2', .5));
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: .2 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  const cam = new THREE.PerspectiveCamera(26, w / h, .1, 200);
  const dir = view === 'front' ? new THREE.Vector3(.35, .42, 1) : new THREE.Vector3(.75, .62, 1); dir.normalize();
  const target = new THREE.Vector3(0, size.y * .42, 0);
  const fit = radius / Math.sin(THREE.MathUtils.degToRad(26 / 2)) * (w > h ? .95 : 1.1);
  cam.position.copy(target).addScaledVector(dir, fit); cam.lookAt(target);
  renderer.render(scene, cam);
  const url = renderer.domElement.toDataURL('image/png');
  renderer.dispose(); return url;
}
window.renderProduct = render;
