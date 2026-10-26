// Product builders. Each returns a THREE.Group with origin at floor centre. Units: 1 = 10 cm.
import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { C, surface, stock, fluteEdge } from './tex.js';
import { ART } from './art.js';
import { F, rbox, tray, hinged, sheet, ropeHandle, lathe, place } from './geo.js';

const S = (o) => surface(o);
const px = (len, per = 300) => Math.min(2048, Math.max(256, Math.round(len * per)));
/** printed face material sized to the face so artwork keeps its aspect */
const face = (wu, hu, painter, o = {}) => S({ w: px(wu, o.ppu || 360), h: px(hu, o.ppu || 360), painter, ...o });
const glass = (color = '#ffffff', o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: .04, metalness: 0, transmission: .92, thickness: .5, ior: 1.5, clearcoat: 1, clearcoatRoughness: .03, ...o });
const plastic = (color, rough = .35, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: rough, clearcoat: .4, clearcoatRoughness: .2, ...o });
const metal = (color = '#d8b46a', rough = .22) => new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness: rough });

export const P = {};

/* ============ SHIPPING & E-COMMERCE ============ */
P.shipping = ({ w = 4.2, h = 3.0, d = 3.2, tape = true } = {}) => {
  const g = new THREE.Group();
  const k = (wu, hu, painter) => face(wu, hu, painter, { base: C.kraft, stock: 'kraft', finish: 'kraft', flute: 22, ppu: 340 });
  const front = k(w, h, ART.shipFront), back = k(w, h, ART.shipFront), side = k(d, h, ART.shipSide), side2 = k(d, h, null);
  const top = k(w, d, ART.seamTop), bottom = k(w, d, null);
  const body = rbox(w, h, d, F(side, side2, top, bottom, front, back), .035, 5); body.position.y = h / 2; g.add(body);
  if (tape) {
    const tw = .62, tt = .004, drop = .85;
    const tapeFor = (len) => S({ w: 192, h: Math.round(192 * len / tw), base: C.navy, painter: ART.tape, finish: 'gloss' });
    const top1 = rbox(tw, tt, d + .02, tapeFor(d), .001, 1); top1.position.set(0, h + tt / 2 + .001, 0); g.add(top1);
    for (const z of [d / 2 + .004, -d / 2 - .004]) { const m = rbox(tw, drop, tt, tapeFor(drop), .001, 1); m.position.set(0, h - drop / 2 + .004, z); g.add(m); }
  }
  return g;
};

P.cargo = () => {
  const g = new THREE.Group();
  // pallet
  const wood = S({ w: 512, h: 512, base: '#C9A57A', stock: 'kraft', finish: 'kraft', repeat: [1, 3] });
  for (const x of [-2.6, 0, 2.6]) { const b = rbox(.9, .7, 6.4, wood, .02); b.position.set(x, .35, 0); g.add(b); }
  for (let i = 0; i < 7; i++) { const b = rbox(6.6, .16, .7, wood, .015); b.position.set(0, .78, -2.85 + i * .95); g.add(b); }
  const strapMat = plastic('#1C2B63', .45);
  const box = (x, y, z, ry) => {
    const s = P.shipping({ w: 3.0, h: 2.4, d: 3.0, tape: true }); place(s, x, y, z, ry); g.add(s);
    const strap = rbox(.12, 2.42, 3.04, strapMat, .005); strap.position.set(x + .8, y + 1.2, z); g.add(strap);
  };
  box(-1.55, .86, -1.5, 0); box(1.55, .86, -1.5, 0); box(-1.55, .86, 1.5, 0); box(1.55, .86, 1.5, 0); box(0, 3.28, 0, .06);
  return g;
};

P.mailer = ({ w = 3.2, h = 1.0, d = 2.4, angle = 1.92, contents = true } = {}) => {
  const g = new THREE.Group(); const t = .025;
  const navy = (wu, hu, painter) => face(wu, hu, painter, { base: C.navy, stock: 'soft', finish: 'soft', ppu: 380 });
  const outer = navy(w, h, null), inner = face(w, d, ART.mailerInside, { base: C.cream, ppu: 380 });
  const edge = S({ w: 256, h: 256, base: '#E9E2D2', stock: 'white', finish: 'uncoated' });
  const base = tray(w, h, d, { outer, inner: face(w, h, ART.mailerInside, { base: C.cream }), edge, t, front: navy(w, h, ART.mailerFront), bottom: outer }); g.add(base);
  // floor inner print
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(w - 2 * t, d - 2 * t), inner); floor.rotation.x = -Math.PI / 2; floor.position.y = t + .002; floor.receiveShadow = true; g.add(floor);
  const lid = hinged(w, d, t, { top: navy(w, d, ART.mailerLid), under: face(w, d, ART.mailerInside, { base: C.cream }), edge, angle });
  lid.position.set(0, h, -d / 2); g.add(lid);
  // tuck flap on the lid's front edge (hangs inward when open)
  const flapPivot = new THREE.Group(); flapPivot.position.set(0, 0, d); lid.add(flapPivot);
  const flap = rbox(w - .1, h * .8, t, F(edge, edge, edge, edge, face(w, h, ART.mailerInside, { base: C.cream }), navy(w, h, null)), .006); flap.position.set(0, -h * .4, 0); flapPivot.add(flap); flapPivot.rotation.x = .25;
  // side ears on lid
  for (const sx of [-1, 1]) { const ear = rbox(t, h * .7, d * .86, F(navy(d, h, null), navy(d, h, null), edge, edge, edge, edge), .006); ear.position.set(sx * (w / 2 - t * 1.6), -h * .35, d * .5); lid.add(ear); }
  if (contents) {
    const tissue = sheet(w * .94, d * .9, S({ w: 1024, h: 768, painter: (gg, W, H, L) => ART.tissue(gg, W, H, L), base: '#F7F5F0', stock: 'white', finish: 'uncoated' }), { amp: .035, freq: 3.4, lift: .25, seed: 3 });
    tissue.position.y = h * .7; g.add(tissue);
    const card = rbox(1.25, .012, .9, F(edge, edge, face(1.25, .9, ART.thankYou, { base: C.cream, ppu: 700 }), edge, edge, edge), .004); card.position.set(.35, h * .76, .25); card.rotation.set(0, .22, .03); g.add(card);
    const seal = new THREE.Mesh(new THREE.CylinderGeometry(.24, .24, .006, 64), [edge, face(.5, .5, ART.seal, { base: C.navy, ppu: 900 }), edge]); seal.position.set(-.75, h * .79, -.15); seal.rotation.y = .4; seal.castShadow = true; g.add(seal);
  }
  return g;
};

P.mailerClosed = ({ w = 3.2, h = 1.0, d = 2.4 } = {}) => {
  const g = new THREE.Group();
  const navy = (wu, hu, painter) => face(wu, hu, painter, { base: C.navy, stock: 'soft', finish: 'soft', ppu: 380 });
  const b = rbox(w, h, d, F(navy(d, h, null), navy(d, h, null), navy(w, d, ART.mailerLid), navy(w, d, null), navy(w, h, ART.mailerFront), navy(w, h, null)), .02); b.position.y = h / 2; g.add(b);
  return g;
};

/* ============ PREMIUM & RETAIL ============ */
P.rigid = ({ w = 3.0, h = 1.2, d = 3.0, lidH = .45, color = C.navy, tone = 'gold', open = false, lidOffset = 0, paper = 'linen' } = {}) => {
  const g = new THREE.Group();
  const wrap = (wu, hu, painter) => face(wu, hu, painter, { base: color, stock: paper, finish: paper === 'linen' ? 'linen' : 'soft', ppu: 400 });
  const inner = S({ w: 512, h: 512, base: '#F2ECE1', stock: 'white', finish: 'uncoated' });
  const base = tray(w, h, d, { outer: wrap(w, h, null), inner, edge: wrap(w, .1, null), t: .03, r: .01 }); g.add(base);
  const lid = new THREE.Group();
  const top = rbox(w + .06, .03, d + .06, F(wrap(d, .1, null), wrap(d, .1, null), wrap(w, d, (gg, W, H, L) => ART.rigidLid(gg, W, H, L, { tone })), inner, wrap(w, .1, null), wrap(w, .1, null)), .012); top.position.y = lidH - .015; lid.add(top);
  const skirt = tray(w + .06, lidH - .03, d + .06, { outer: wrap(w, lidH, null), inner, edge: wrap(w, .1, null), t: .03, r: .01, walls: true }); lid.add(skirt);
  if (open) { lid.position.set(...open.pos); lid.rotation.set(...open.rot); }
  else lid.position.set(0, h - lidH + .06 + lidOffset, 0);
  g.add(lid); g.userData.lid = lid;
  return g;
};
P.gift = () => {
  const g = new THREE.Group();
  const big = P.rigid({ w: 3.2, h: 1.3, d: 3.2, lidH: .5 }); place(big, -.7, 0, -.4, .35); g.add(big);
  const small = P.rigid({ w: 2.0, h: .9, d: 2.0, lidH: .38, color: '#EFE7D8', tone: 'gold', paper: 'linen', open: { pos: [1.15, .78, -.95], rot: [-1.08, 0, 0] } });
  // tissue in the open small box
  const tissue = sheet(1.9, 1.9, S({ w: 768, h: 768, painter: (gg, W, H, L) => ART.tissue(gg, W, H, L, { bg: '#1C2B63', color: 'rgba(212,176,122,.55)' }), base: C.navy, stock: 'white', finish: 'uncoated' }), { amp: .03, freq: 4, lift: .18, seed: 9 }); tissue.position.y = .72; small.add(tissue);
  place(small, 2.25, 0, 1.2, -.42); g.add(small);
  return g;
};

P.carton = ({ w = 1.0, h = 2.4, d = .7, band = C.navy, name = 'Essentials', sub = 'RESTORING FACE OIL' } = {}) => {
  const g = new THREE.Group();
  const o = { base: C.cream, stock: 'white', finish: 'matte', ppu: 520 };
  const fr = face(w, h, (gg, W, H, L) => ART.cartonFront(gg, W, H, L, { band, name, sub }), o);
  const sd = face(d, h, (gg, W, H, L) => ART.cartonSide(gg, W, H, L, { band }), o);
  const top = face(w, d, (gg, W, H, L) => ART.cartonTop(gg, W, H, L, { band }), o);
  const b = rbox(w, h, d, F(sd, sd, top, top, fr, fr), .006, 3); b.position.y = h / 2; g.add(b);
  return g;
};
P.cartons = () => {
  const g = new THREE.Group();
  g.add(place(P.carton({}), 0, 0, 0, .1));
  g.add(place(P.carton({ w: .85, h: 1.9, d: .6, band: '#7E3A3A', name: 'Rose', sub: 'HYDRATING MIST' }), 1.15, 0, .35, -.2));
  const lying = P.carton({ w: .9, h: 2.1, d: .62, band: '#2F4A3A', name: 'Verde', sub: 'CLAY CLEANSER' }); lying.rotation.set(-Math.PI / 2, 0, -.5); lying.position.set(-1.05, .31, 1.05); g.add(lying);
  return g;
};

P.printed = () => {
  const g = new THREE.Group();
  const pat = (wu, hu, seed) => face(wu, hu, (gg, W, H, L) => ART.pattern(gg, W, H, L, { seed, cell: Math.round(W / 5.5) }), { base: '#F4EFE6', finish: 'gloss', ppu: 360 });
  const lid = (wu, hu, seed) => face(wu, hu, (gg, W, H, L) => { ART.pattern(gg, W, H, L, { seed, cell: Math.round(W / 5.5) }); ART.patternLabel(gg, W, H, L); }, { base: '#F4EFE6', finish: 'gloss', ppu: 360 });
  const cube = (s, seed) => { const b = rbox(s, s, s, F(pat(s, s, seed), pat(s, s, seed + 1), lid(s, s, seed + 2), pat(s, s, seed), pat(s, s, seed + 3), pat(s, s, seed + 4)), .012); b.position.y = s / 2; return b; };
  g.add(place(cube(2.4, 3), 0, 0, 0, .25));
  g.add(place(cube(1.5, 11), 2.25, 0, .7, -.35));
  const flat = rbox(2.2, .6, 1.6, F(pat(1.6, .6, 21), pat(1.6, .6, 22), lid(2.2, 1.6, 23), pat(2.2, 1.6, 24), pat(2.2, .6, 25), pat(2.2, .6, 26)), .01); flat.position.set(-2.0, .3, 1.0); flat.rotation.y = .5; g.add(flat);
  return g;
};

P.bottle = () => {
  const g = new THREE.Group();
  const amber = glass('#B8661F', { transmission: .75, attenuationColor: new THREE.Color('#7A3A0E'), attenuationDistance: .8, thickness: .8 });
  const dropper = (x, z, s, ry) => {
    const grp = new THREE.Group();
    const body = lathe([[0, 0], [.48, 0], [.52, .04], [.52, 1.55], [.48, 1.68], [.2, 1.84], [.18, 2.0], [0, 2.0]], amber); grp.add(body);
    const lbl = new THREE.Mesh(new THREE.CylinderGeometry(.526, .526, 1.0, 96, 1, true, -Math.PI * .55, Math.PI * 1.1), face(2.2, 1.0, (gg, W, H, L) => ART.bottleLabel(gg, W, H, L), { base: '#F6F2EA', stock: 'white', finish: 'uncoated', ppu: 600 })); lbl.position.y = .8; grp.add(lbl);
    const collar = lathe([[0, 0], [.22, 0], [.22, .34], [0, .34]], metal('#E3C68E', .28)); collar.position.y = 1.96; grp.add(collar);
    const bulb = lathe([[0, 0], [.17, 0], [.17, .25], [.14, .45], [.08, .55], [0, .56]], plastic('#1C1C1E', .6)); bulb.position.y = 2.3; grp.add(bulb);
    place(grp, x, 0, z, ry, s); g.add(grp);
  };
  dropper(0, 0, 1, 0); dropper(1.25, .55, .8, .4);
  const jar = new THREE.Group();
  const jb = lathe([[0, 0], [.85, 0], [.92, .06], [.92, .78], [.82, .86], [.78, .9], [0, .9]], glass('#FFFFFF', { transmission: .9, thickness: .3 })); jar.add(jb);
  const cream = lathe([[0, .04], [.82, .04], [.82, .7], [0, .74]], new THREE.MeshPhysicalMaterial({ color: '#F4EEE6', roughness: .55 })); jar.add(cream);
  const jl = lathe([[0, 0], [.92, 0], [.94, .04], [.94, .34], [.9, .38], [0, .38]], metal('#E3C68E', .32)); jl.position.y = .88; jar.add(jl);
  place(jar, -1.45, 0, .6, 0); g.add(jar);
  return g;
};

/* ============ FOOD & BEVERAGE ============ */
P.pizza = ({ ink = '#7B2E22' } = {}) => {
  const g = new THREE.Group();
  const k = (wu, hu, painter) => face(wu, hu, painter, { base: '#C49A6C', stock: 'kraft', finish: 'kraft', flute: 18, ppu: 340 });
  const lidTop = k(3.2, 3.2, (gg, W, H, L) => ART.pizzaTop(gg, W, H, L, { ink })), side = k(3.2, .35, (gg, W, H, L) => ART.pizzaSide(gg, W, H, L, { ink })), plain = k(3.2, 3.2, null);
  const closed = (y, ry, dx = 0, dz = 0) => { const b = rbox(3.2, .35, 3.2, F(side, side, lidTop, plain, side, side), .018); b.position.set(dx, y + .175, dz); b.rotation.y = ry; g.add(b); };
  closed(0, 0); closed(.35, .06, .05, -.04); closed(.7, -.05, -.04, .03);
  // top box slightly open
  const white = S({ w: 512, h: 512, base: '#EFEAE0', stock: 'white', finish: 'uncoated' });
  const open = new THREE.Group(); open.position.set(0, 1.05, 0); open.rotation.y = .08; g.add(open);
  open.add(tray(3.2, .35, 3.2, { outer: k(3.2, .35, null), inner: white, edge: fluteEdge(), t: .03 }));
  const lid = hinged(3.2, 3.2, .03, { top: lidTop, under: white, edge: fluteEdge(), angle: .42 }); lid.position.set(0, .35, -1.6); open.add(lid);
  return g;
};

P.burger = () => {
  const g = new THREE.Group();
  const k = (wu, hu, painter) => face(wu, hu, painter, { base: C.kraft, stock: 'kraft', finish: 'kraft', ppu: 360 });
  const inside = S({ w: 512, h: 512, base: '#CDA87C', stock: 'kraft', finish: 'kraft' });
  const clam = (open) => {
    const grp = new THREE.Group();
    grp.add(tray(1.8, .75, 1.8, { outer: k(1.8, .75, null), inner: inside, t: .02, r: .008 }));
    const lid = new THREE.Group(); const lt = new THREE.Group();
    lt.add(tray(1.8, .68, 1.8, { outer: k(1.8, .7, null), inner: inside, t: .02, r: .008, walls: true }));
    const cap = rbox(1.8, .02, 1.8, F(inside, inside, k(1.8, 1.8, ART.burger), inside, inside, inside), .008); cap.position.y = .69; lt.add(cap);
    lt.position.set(0, 0, .9); lid.add(lt); lid.position.set(0, .75, -.9); lid.rotation.x = open ? -2.0 : 0; grp.add(lid);
    if (open) { const liner = sheet(1.9, 1.9, S({ w: 512, h: 512, painter: ART.liner, base: '#F3EEE4', stock: 'white', finish: 'uncoated' }), { amp: .04, freq: 3, lift: .5, seed: 4 }); liner.position.y = .12; grp.add(liner); }
    return grp;
  };
  g.add(place(clam(false), -.4, 0, .2, .3));
  g.add(place(clam(true), 1.9, 0, -.2, -.35));
  return g;
};

P.cake = () => {
  const g = new THREE.Group();
  const o = { base: '#FBF7F2', stock: 'white', finish: 'matte', ppu: 360 };
  const w = 2.6, h = 1.5;
  const side = face(w, h, ART.cakeSide, o), lidMat = face(w, w, ART.cakeLid, o), inner = S({ w: 256, h: 256, base: '#F5EFE7', stock: 'white', finish: 'uncoated' });
  g.add(tray(w, h, w, { outer: side, inner, t: .02 }));
  // lid with window
  const lidG = new THREE.Group(); lidG.position.y = h;
  const frameShape = new THREE.Shape(); const R = w / 2 + .02; frameShape.moveTo(-R, -R); frameShape.lineTo(R, -R); frameShape.lineTo(R, R); frameShape.lineTo(-R, R); frameShape.lineTo(-R, -R);
  const hole = new THREE.Path(); hole.moveTo(-.85, -.7); hole.lineTo(.85, -.7); hole.lineTo(.85, .85); hole.lineTo(-.85, .85); hole.lineTo(-.85, -.7); frameShape.holes.push(hole);
  const fg = new THREE.ExtrudeGeometry(frameShape, { depth: .025, bevelEnabled: false });
  // remap uv to 0..1
  const uv = fg.attributes.uv, p = fg.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, (p.getX(i) + R) / (2 * R), (p.getY(i) + R) / (2 * R));
  const frame = new THREE.Mesh(fg, [lidMat, inner]); frame.rotation.x = -Math.PI / 2; frame.castShadow = frame.receiveShadow = true; lidG.add(frame);
  const win = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.55), new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: .02, transmission: 1, thickness: .02, ior: 1.45, clearcoat: 1 })); win.rotation.x = -Math.PI / 2; win.position.set(0, .02, -.075); lidG.add(win);
  const skirt = tray(w + .04, .32, w + .04, { outer: face(w, .32, null, o), inner, t: .02, walls: true }); skirt.position.y = -.3; lidG.add(skirt);
  g.add(lidG);
  // cake inside
  const sponge = lathe([[0, 0], [.95, 0], [.97, .05], [.97, .82], [.92, .9], [0, .9]], new THREE.MeshPhysicalMaterial({ color: '#F1E2D6', roughness: .55, sheen: .4, sheenColor: new THREE.Color('#fff') })); sponge.position.y = .03; g.add(sponge);
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; const b = new THREE.Mesh(new THREE.SphereGeometry(.075, 24, 16), new THREE.MeshPhysicalMaterial({ color: '#8E1B2E', roughness: .25, clearcoat: .8 })); b.position.set(Math.cos(a) * .75, .99, Math.sin(a) * .75); b.castShadow = true; g.add(b); }
  return g;
};

P.takeaway = () => {
  const g = new THREE.Group();
  const pail = (s, kraftOn) => {
    const kOuter = kraftOn ? face(2.4, 2, ART.noodle, { base: C.kraft, stock: 'kraft', finish: 'kraft', ppu: 300 }) : face(2.4, 2, ART.noodle, { base: '#F3EEE4', stock: 'white', finish: 'matte', ppu: 300 });
    const inner = S({ w: 256, h: 256, base: kraftOn ? '#C9A27A' : '#E8DFCF', stock: kraftOn ? 'kraft' : 'white', finish: 'uncoated' });
    const grp = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.0, .72, 1.6, 4, 8, true), [kOuter]); body.material = [kOuter]; body.material = kOuter; body.rotation.y = Math.PI / 4; body.position.y = .8; body.castShadow = body.receiveShadow = true; grp.add(body);
    const inBody = new THREE.Mesh(new THREE.CylinderGeometry(.985, .705, 1.58, 4, 1, true), new THREE.MeshStandardMaterial({ color: '#E8DFCF', side: THREE.BackSide, roughness: .9 })); inBody.rotation.y = Math.PI / 4; inBody.position.y = .8; grp.add(inBody);
    const half = 1.0 * Math.SQRT1_2;
    // closing flaps (front/back long flaps meeting at top, triangle side flaps)
    for (const sgn of [1, -1]) { const flap = rbox(half * 2, .012, .82, F(inner, inner, kOuter, inner, inner, inner), .004); const piv = new THREE.Group(); piv.position.set(0, 1.6, sgn * half); piv.rotation.x = sgn * 1.0; flap.position.set(0, 0, -sgn * .41); piv.add(flap); grp.add(piv); }
    for (const sgn of [1, -1]) { const tri = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sgn * half, 1.6, -half), new THREE.Vector3(sgn * half, 1.6, half), new THREE.Vector3(sgn * half * .9, 2.18, 0)]), new THREE.MeshStandardMaterial({ color: kraftOn ? '#B98D5F' : '#F3EEE4', side: THREE.DoubleSide, roughness: .85 })); tri.geometry.computeVertexNormals(); tri.castShadow = true; grp.add(tri); }
    const handle = new THREE.Mesh(new THREE.TorusGeometry(.55, .014, 10, 64, Math.PI), metal('#BFC4CB', .3)); handle.position.y = 2.12; grp.add(handle);
    grp.scale.setScalar(s); return grp;
  };
  g.add(place(pail(1, true), 0, 0, 0, .3));
  g.add(place(pail(.78, false), 1.75, 0, .7, -.35));
  return g;
};

P.cup = () => {
  const g = new THREE.Group();
  const cup = (s, art, lidColor, sleeve, ry) => {
    const grp = new THREE.Group();
    const H = 2.2, R1 = .72, R0 = .5;
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(R1, R0, H, 128, 1, true), face(2 * Math.PI * .6, H, art, { base: C.cream, stock: 'white', finish: 'matte', ppu: 300 })); wall.position.y = H / 2; wall.castShadow = wall.receiveShadow = true; grp.add(wall);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(R1, .028, 16, 128), new THREE.MeshStandardMaterial({ color: '#F4EFE6', roughness: .6 })); rim.rotation.x = Math.PI / 2; rim.position.y = H; grp.add(rim);
    const bottom = new THREE.Mesh(new THREE.CircleGeometry(R0, 64), new THREE.MeshStandardMaterial({ color: '#E9E3D8' })); bottom.rotation.x = -Math.PI / 2; bottom.position.y = .01; grp.add(bottom);
    if (sleeve) { const sl = new THREE.Mesh(new THREE.CylinderGeometry(R0 + (R1 - R0) * .7 + .02, R0 + (R1 - R0) * .25 + .02, H * .45, 128, 1, true), face(2 * Math.PI * .6, H * .45, ART.sleeve, { base: C.kraft, stock: 'kraft', finish: 'kraft', ppu: 300 })); sl.position.y = H * .48; sl.castShadow = sl.receiveShadow = true; grp.add(sl); }
    if (lidColor) { const lid = lathe([[0, .2], [.36, .2], [.42, .16], [.46, .1], [.68, .09], [.76, .06], [.78, 0], [.74, -.04], [0, -.04]], plastic(lidColor, .3)); lid.position.y = H + .02; grp.add(lid); const sip = rbox(.18, .03, .06, plastic(lidColor, .3), .01); sip.position.set(0, H + .23, .25); grp.add(sip); }
    grp.scale.setScalar(s); grp.rotation.y = ry; return grp;
  };
  g.add(place(cup(1.1, (gg, W, H, L) => ART.cup(gg, W, H, L), C.navy, true, 0), 0, 0, 0));
  g.add(place(cup(.85, (gg, W, H, L) => ART.cupPlain(gg, W, H, L), '#F4EFE6', false, 1.2), 1.55, 0, .55));
  g.add(place(cup(.68, (gg, W, H, L) => ART.cup(gg, W, H, L, { bg: C.navy, fg: '#E7D3AE' }), null, false, .3), -1.4, 0, .75));
  return g;
};

/* ============ BAGS & FLEXIBLE ============ */
P.bagOne = ({ w = 2.6, h = 3.2, d = 1.2, base = C.kraft, stockK = 'kraft', finish = 'kraft', foil = false, ink = '#1d1a17', handle = '#8A5E34' } = {}) => {
  const grp = new THREE.Group();
  const o = { base, stock: stockK, finish, ppu: 300 };
  const fr = face(w, h, (gg, W, H, L) => { ART.bagFront(gg, W, H, L, { ink, foil }); gg.fillStyle = L.fill('rgba(0,0,0,.08)', 'deboss'); gg.fillRect(0, H * .1, W, 3); }, o);
  const sd = face(d, h, (gg, W, H, L) => { ART.bagFold(gg, W, H, L); gg.fillStyle = L.fill('rgba(0,0,0,.08)', 'deboss'); gg.fillRect(0, H * .1, W, 3); }, o);
  const dark = new THREE.MeshStandardMaterial({ color: new THREE.Color(base).multiplyScalar(.35), roughness: 1 });
  const body = rbox(w, h, d, F(sd, sd, dark, fr, fr, fr), .01); body.position.y = h / 2; grp.add(body);
  // pinch the gusset slightly inward at the top for realism
  const pos = body.geometry.attributes.position; for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); if (Math.abs(x) > w / 2 - .02) pos.setX(i, x - Math.sign(x) * Math.max(0, (y / (h / 2))) * .05); } body.geometry.computeVertexNormals();
  const hm = new THREE.MeshPhysicalMaterial({ color: handle, roughness: .8, sheen: .3 });
  for (const z of [d / 2 - .12, -d / 2 + .12]) { const r = ropeHandle(w * .38, h * .3, hm); r.position.set(0, h - .2, z); grp.add(r); }
  return grp;
};
P.bag = () => {
  const g = new THREE.Group();
  g.add(place(P.bagOne({}), -.6, 0, 0, .28));
  g.add(place(P.bagOne({ w: 2.0, h: 2.5, d: 1.0, base: C.navy, stockK: 'soft', finish: 'soft', foil: true, handle: '#C9A35B' }), 1.6, 0, .7, -.35));
  return g;
};

P.mailerbag = () => {
  const g = new THREE.Group();
  const film = (seed) => face(2.4, 3.2, ART.poly, { base: C.navy, stock: 'white', finish: 'gloss', ppu: 300 });
  const pillow = (w, d, puff) => {
    const geo = new THREE.BoxGeometry(w, .06, d, 40, 1, 50); const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i) / (w / 2), z = p.getZ(i) / (d / 2); const k = Math.pow(Math.max(0, 1 - x * x), .5) * Math.pow(Math.max(0, 1 - z * z), .5); p.setY(i, p.getY(i) * (1 + k * puff) + Math.sin(x * 9 + z * 5) * .006 * k); }
    geo.computeVertexNormals(); return geo;
  };
  const mk = (x, y, z, ry, s, rx = 0) => { const m = new THREE.Mesh(pillow(2.4 * s, 3.2 * s, 2.4), [film(), film(), film(), film(), film(), film()]); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); m.castShadow = m.receiveShadow = true; g.add(m); };
  mk(0, .07, 0, .2, 1); mk(.6, .2, .35, -.25, .9, .02); mk(-.4, .32, .5, .55, .78, -.02);
  return g;
};

P.pouch = () => {
  const g = new THREE.Group();
  const one = (w, h, art, base) => {
    const grp = new THREE.Group(); const bulge = .34;
    const surf = (sgn) => new ParametricGeometry((u, v, target) => {
      const x = (u - .5) * w, y = v * h; const top = Math.max(0, 1 - v / .78); const bx = Math.pow(Math.max(0, 1 - Math.pow(2 * u - 1, 2)), .6);
      const z = sgn * (bulge * Math.pow(top, .7) * bx + .01); const pinch = v > .92 ? 0 : 1;
      target.set(x * (1 - (1 - v) * .04), y, z * pinch);
    }, 60, 80);
    const mat = face(w, h, art, { base, stock: base === C.kraft ? 'kraft' : 'soft', finish: base === C.kraft ? 'kraft' : 'soft', ppu: 360 });
    const back = face(w, h, null, { base, stock: base === C.kraft ? 'kraft' : 'soft', finish: base === C.kraft ? 'kraft' : 'soft', ppu: 200 });
    const fGeo = surf(1), bGeo = surf(-1); // flip back normals
    const fm = new THREE.Mesh(fGeo, mat); fm.castShadow = fm.receiveShadow = true;
    const idx = bGeo.index.array; for (let i = 0; i < idx.length; i += 3) { const t = idx[i]; idx[i] = idx[i + 1]; idx[i + 1] = t; } bGeo.computeVertexNormals();
    const bm = new THREE.Mesh(bGeo, back); bm.castShadow = bm.receiveShadow = true; grp.add(fm, bm);
    const seal = rbox(w * 1.002, h * .08, .03, back, .01); seal.position.set(0, h * .96, 0); grp.add(seal);
    const notch = rbox(w * .9, .03, .05, plastic('#d9dde3', .4), .01); notch.position.set(0, h * .86, .0); grp.add(notch);
    return grp;
  };
  g.add(place(one(2.0, 3.0, (gg, W, H, L) => ART.pouch(gg, W, H, L), C.cream), 0, 0, 0, .15));
  g.add(place(one(1.7, 2.5, (gg, W, H, L) => ART.pouch(gg, W, H, L, { bg: C.kraft, band: '#2A2220', name: 'Masala Chai', sub: 'LOOSE LEAF TEA', weight: 'NET WT 150 G' }), C.kraft), 1.75, 0, .55, -.3));
  g.add(place(one(1.5, 2.2, (gg, W, H, L) => ART.pouch(gg, W, H, L, { bg: '#F4EFE6', band: '#7E3A3A', name: 'Dates', sub: 'MEDJOOL · PREMIUM', weight: 'NET WT 400 G' }), '#F4EFE6'), -1.6, 0, .6, .5));
  return g;
};

/* ============ PROTECTION & SUPPLIES ============ */
P.roll = () => {
  const g = new THREE.Group();
  // bubble wrap roll: core + film with instanced bubbles
  const film = new THREE.MeshPhysicalMaterial({ color: '#E8F0F6', roughness: .12, transmission: .6, thickness: .1, clearcoat: 1, transparent: true, opacity: .9 });
  const roll = new THREE.Group();
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(.95, .95, 2.8, 96), film); roll.add(cyl);
  const bubbles = new THREE.InstancedMesh(new THREE.SphereGeometry(.055, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), film, 4000); let n = 0; const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
  for (let yi = 0; yi < 22 && n < 4000; yi++) for (let a = 0; a < 52 && n < 4000; a++) { const ang = (a + (yi % 2) * .5) / 52 * Math.PI * 2; const nrm = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang)); q.setFromUnitVectors(up, nrm); m4.compose(nrm.clone().multiplyScalar(.95).setY(-1.3 + yi * .125), q, new THREE.Vector3(1, .55, 1)); bubbles.setMatrixAt(n++, m4); }
  bubbles.count = n; roll.add(bubbles);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(.28, .28, 2.84, 48, 1, true), S({ w: 256, h: 256, base: C.kraft, stock: 'kraft', finish: 'kraft' })); roll.add(core);
  roll.rotation.z = Math.PI / 2; roll.position.set(-.6, .95, 0); g.add(roll);
  // stretch film roll
  const sf = new THREE.Group(); const sfm = new THREE.MeshPhysicalMaterial({ color: '#dfe7ee', roughness: .05, transmission: .85, thickness: .6, clearcoat: 1, iridescence: .4 });
  sf.add(new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, 2.0, 96), sfm)); const c2 = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, 2.1, 48), S({ w: 256, h: 256, base: C.kraft, stock: 'kraft', finish: 'kraft' })); sf.add(c2);
  sf.position.set(1.85, 1.0, -.2); g.add(sf);
  // crinkle paper void fill
  const crinkle = new THREE.Group(); const cm = new THREE.MeshStandardMaterial({ color: '#C79A68', roughness: .9 }); let s = 7; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 420; i++) { const pts = []; let p = new THREE.Vector3((r() - .5) * 1.5, .1 + r() * .45, (r() - .5) * 1.1); for (let k = 0; k < 8; k++) { pts.push(p.clone()); p = p.add(new THREE.Vector3((r() - .5) * .35, (r() - .5) * .08 + .01, (r() - .5) * .35)); p.y = Math.max(.08, Math.min(.62, p.y)); p.x = Math.max(-.78, Math.min(.78, p.x)); p.z = Math.max(-.6, Math.min(.6, p.z)); } const t = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, .022, 4), cm); t.scale.set(1, .45, 1); t.castShadow = t.receiveShadow = true; crinkle.add(t); }
  const ktray = tray(1.8, .55, 1.4, { outer: S({ w: 512, h: 256, base: C.kraft, stock: 'kraft', finish: 'kraft' }), inner: S({ w: 512, h: 512, base: '#C9A27A', stock: 'kraft', finish: 'kraft' }), edge: fluteEdge(), t: .03 });
  ktray.add(crinkle); place(ktray, .5, 0, 1.6, -.25); g.add(ktray);
  return g;
};

P.tape = () => {
  const g = new THREE.Group();
  const roll = (art, sideColor, s = 1) => {
    const grp = new THREE.Group(); const R = .95, r0 = .52, W = .66;
    const outer = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 128, 1, true), S({ w: 2048, h: 256, painter: (gg, Wd, Hd, L) => { gg.save(); gg.translate(Wd, 0); gg.rotate(Math.PI / 2); gg.restore(); art(gg, Wd, Hd, L); }, base: C.navy, finish: 'gloss' })); grp.add(outer);
    const side = new THREE.MeshPhysicalMaterial({ color: sideColor, roughness: .35, clearcoat: .6, side: THREE.DoubleSide });
    for (const y of [W / 2, -W / 2]) { const ring = new THREE.Mesh(new THREE.RingGeometry(r0 + .04, R, 128), side); ring.rotation.x = -Math.PI / 2; ring.position.y = y; grp.add(ring); }
    const core = new THREE.Mesh(new THREE.CylinderGeometry(r0 + .04, r0 + .04, W + .01, 64, 1, true), S({ w: 256, h: 256, base: C.kraft, stock: 'kraft', finish: 'kraft' })); grp.add(core);
    const coreIn = new THREE.Mesh(new THREE.CylinderGeometry(r0, r0, W + .01, 64, 1, true), new THREE.MeshStandardMaterial({ color: '#A57C52', side: THREE.BackSide, roughness: .95 })); grp.add(coreIn);
    grp.traverse(o => { if (o.isMesh) { o.castShadow = o.receiveShadow = true; } }); grp.scale.setScalar(s); return grp;
  };
  const horiz = (gg, W, H, L) => { // horizontal tape art (length along x)
    gg.fillStyle = L.fill(C.navy); gg.fillRect(0, 0, W, H);
    for (let x = H * .4; x < W; x += H * 4.4) { import_mark(gg, x + H * .28, H * .5, H * .42, L.fill(C.cream)); import_text(gg, 'ALL PACK', x + H * .62, H * .66, { size: H * .38, font: 'Fraunces', weight: 500, fill: L.fill(C.cream), align: 'left', spacing: 3 }); import_text(gg, 'THE PACKAGING EXPERTS', x + H * 2.65, H * .6, { size: H * .15, weight: 700, fill: L.fill(C.brass), align: 'left', spacing: 3 }); }
  };
  const kraftArt = (gg, W, H, L) => { gg.fillStyle = L.fill('#B98A5A'); gg.fillRect(0, 0, W, H); for (let x = H * .4; x < W; x += H * 3.4) { import_mark(gg, x + H * .28, H * .5, H * .42, L.fill('#2A2220')); import_text(gg, 'ALL PACK', x + H * .62, H * .66, { size: H * .38, font: 'Fraunces', weight: 500, fill: L.fill('#2A2220'), align: 'left', spacing: 3 }); } };
  const r1 = roll(horiz, '#22336e'); r1.position.set(0, .33, 0); g.add(r1);
  const r2 = roll(kraftArt, '#A87C50', .9); r2.rotation.x = Math.PI / 2; r2.rotation.z = .4; r2.position.set(1.9, .855, -.3); g.add(r2);
  const r3 = roll(horiz, '#22336e', .8); r3.position.set(-1.5, .264, .7); g.add(r3);
  // loose strip
  const strip = new THREE.Mesh(new THREE.PlaneGeometry(2.4, .66 * 1), S({ w: 1024, h: 280, painter: horiz, base: C.navy, finish: 'gloss' })); strip.rotation.x = -Math.PI / 2; strip.rotation.z = .35; strip.position.set(.4, .006, 1.55); strip.receiveShadow = true; g.add(strip);
  return g;
};
import { mark as import_mark, text as import_text } from './tex.js';

/* ============ LABELS & PRINT ============ */
P.label = () => {
  const g = new THREE.Group();
  const edge = new THREE.MeshStandardMaterial({ color: '#f2efe8', roughness: .7 });
  const specs = [[C.navy, C.cream, 'HANDMADE'], ['#F4EFE6', C.navy, 'SMALL BATCH'], ['#7E3A3A', C.cream, 'ORGANIC'], ['#2F4A3A', C.cream, 'THANK YOU'], [C.navy, C.cream, 'ALL PACK']];
  // label roll
  const roll = new THREE.Group();
  const outer = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, .8, 128, 1, true), S({ w: 2048, h: 512, base: '#F4EFE6', finish: 'matte', painter: (gg, W, H, L) => { gg.fillStyle = L.fill('#F6F3EC'); gg.fillRect(0, 0, W, H); for (let i = 0; i < 6; i++) { gg.save(); gg.beginPath(); const cx = (i + .5) * W / 6; gg.arc(cx, H / 2, H * .4, 0, 7); gg.clip(); gg.translate(cx - H * .4, H * .1); ART.roundLabel(gg, H * .8, H * .8, L, { bg: specs[i % 5][0], fg: specs[i % 5][1], word: specs[i % 5][2] }); gg.restore(); } } }));
  roll.add(outer); for (const y of [.4, -.4]) { const ring = new THREE.Mesh(new THREE.RingGeometry(.42, 1.0, 96), new THREE.MeshStandardMaterial({ color: '#efebe2', roughness: .6, side: THREE.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = y; roll.add(ring); }
  const core = new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, .82, 48, 1, true), S({ w: 256, h: 256, base: C.kraft, stock: 'kraft', finish: 'kraft' })); roll.add(core);
  roll.traverse(o => { if (o.isMesh) o.castShadow = o.receiveShadow = true; }); roll.position.set(-1.2, .4, -.6); g.add(roll);
  // loose labels
  specs.forEach(([bg, fg, word], i) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(.6, .6, .012, 96), [edge, face(1.2, 1.2, (gg, W, H, L) => ART.roundLabel(gg, W, H, L, { bg, fg, word }), { base: bg, finish: 'matte', ppu: 600 }), edge]);
    m.position.set(.6 + (i % 3) * 1.15 - .4, .006 + i * .013, -.3 + Math.floor(i / 3) * 1.25 + (i % 2) * .15); m.rotation.y = i * .7; m.castShadow = m.receiveShadow = true; g.add(m);
  });
  // a kraft box wearing a label
  const box = P.shipping({ w: 1.8, h: 1.1, d: 1.4, tape: false }); place(box, -1.9, 0, 1.4, .5); g.add(box);
  const onBox = new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, .01, 96), [edge, face(1.2, 1.2, (gg, W, H, L) => ART.roundLabel(gg, W, H, L, {}), { base: C.navy, finish: 'matte', ppu: 600 }), edge]);
  onBox.position.set(0, 1.105, 0); box.add(onBox);
  return g;
};

P.tissue = () => {
  const g = new THREE.Group();
  const box = P.rigid({ w: 3.4, h: .9, d: 2.6, lidH: .35, color: C.navy, open: { pos: [0, .2, -2.2], rot: [-.12, 0, 0] } });
  // pull lid off to the back, lying
  box.userData.lid.position.set(.3, 0, -2.55); box.userData.lid.rotation.set(0, .08, 0);
  g.add(box);
  const tmat = S({ w: 1536, h: 1152, painter: (gg, W, H, L) => ART.tissue(gg, W, H, L), base: '#F7F5F0', stock: 'white', finish: 'uncoated' });
  for (let k = 0; k < 2; k++) { const sh = sheet(3.7, 2.9, tmat, { amp: .05, freq: 2.6, lift: .45, seed: 5 + k * 7, segs: 110 }); sh.position.y = .62 + k * .07; sh.rotation.z = k * .15; g.add(sh); }
  const seal = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .008, 96), [new THREE.MeshStandardMaterial({ color: '#fff' }), face(.6, .6, (gg, W, H, L) => ART.seal(gg, W, H, L), { base: C.navy, ppu: 900 }), new THREE.MeshStandardMaterial({ color: '#fff' })]);
  seal.position.set(.15, .86, .35); seal.castShadow = true; g.add(seal);
  return g;
};

/* ============ SPECIALTY ============ */
P.produce = () => {
  const g = new THREE.Group();
  const k = (wu, hu, painter) => face(wu, hu, painter, { base: C.kraft, stock: 'kraft', finish: 'kraft', flute: 20, ppu: 320 });
  const w = 4.0, h = 1.1, d = 3.0;
  const tr = tray(w, h, d, { outer: k(w, h, null), inner: k(w, d, null), edge: fluteEdge(), t: .04, front: k(w, h, ART.produceSide) }); g.add(tr);
  // hand-hole on sides
  const fruitMat = new THREE.MeshPhysicalMaterial({ color: '#F07F12', roughness: .42, clearcoat: .5, clearcoatRoughness: .35, sheen: .2 });
  const dimple = S({ w: 512, h: 512, base: '#F07F12', stock: 'white', finish: 'matte', repeat: [3, 3] }); fruitMat.bumpMap = dimple.bumpMap; fruitMat.bumpScale = .35;
  const leaf = new THREE.MeshStandardMaterial({ color: '#3E6B2A', roughness: .6 });
  let s = 3; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) {
    const o = new THREE.Mesh(new THREE.SphereGeometry(.33, 48, 32), fruitMat); o.scale.set(1, .92, 1); o.position.set(-1.6 + i * .64 + (r() - .5) * .05, .36 + r() * .05, -1.0 + j * .67 + (r() - .5) * .05); o.rotation.set(r(), r(), r()); o.castShadow = o.receiveShadow = true; g.add(o);
    if (r() > .6) { const l = new THREE.Mesh(new THREE.SphereGeometry(.09, 16, 8), leaf); l.scale.set(1.1, .22, .5); l.position.set(o.position.x + .05, o.position.y + .3, o.position.z); l.rotation.y = r() * 3; l.castShadow = true; g.add(l); }
  }
  for (let i = 0; i < 4; i++) { const o = new THREE.Mesh(new THREE.SphereGeometry(.33, 48, 32), fruitMat); o.position.set(-1.0 + i * .7, .95, -.4 + (i % 2) * .5); o.castShadow = o.receiveShadow = true; g.add(o); }
  return g;
};

P.jewellery = () => {
  const g = new THREE.Group();
  const velvet = S({ w: 512, h: 512, base: '#1D2A5E', stock: 'soft', finish: 'velvet' });
  const wrap = (wu, hu, painter) => face(wu, hu, painter, { base: '#EFE7D8', stock: 'linen', finish: 'linen', ppu: 600 });
  const W = 1.7, H = .75;
  const base = tray(W, H, W, { outer: wrap(W, H, null), inner: velvet, t: .06, r: .015 }); g.add(base);
  const cushion = rbox(W - .14, .5, W - .14, velvet, .18); cushion.position.y = .38; g.add(cushion);
  const slit = rbox(.9, .06, .04, new THREE.MeshStandardMaterial({ color: '#0e1430', roughness: 1 }), .02); slit.position.set(0, .63, .05); g.add(slit);
  const lid = hinged(W, W, .28, { top: wrap(W, W, (gg, Wd, Hd, L) => ART.rigidLid(gg, Wd, Hd, L, { tag: false })), under: velvet, edge: wrap(W, .3, null), angle: 1.82 }); lid.position.set(0, H, -W / 2); g.add(lid);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.27, .045, 32, 128), metal('#E2C178', .14)); ring.position.set(0, .82, .05); ring.rotation.x = -.15; g.add(ring);
  const setting = lathe([[0, 0], [.09, 0], [.12, .06], [.06, .12], [0, .12]], metal('#E2C178', .14)); setting.position.set(0, 1.07, .02); g.add(setting);
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(.12, 0), new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0, transmission: 1, ior: 2.4, thickness: .4, dispersion: 3, clearcoat: 1 })); gem.scale.y = .8; gem.position.set(0, 1.2, .02); g.add(gem);
  const drawer = P.rigid({ w: 1.4, h: .5, d: 1.4, lidH: .2, color: C.navy, tone: 'gold' }); place(drawer, 1.9, 0, .5, -.5); g.add(drawer);
  return g;
};

P.shoe = () => {
  const g = new THREE.Group();
  const w = 3.6, h = 1.3, d = 2.2;
  const cream = (wu, hu, painter) => face(wu, hu, painter, { base: '#EFE9DD', stock: 'white', finish: 'matte', ppu: 300 });
  const navy = (wu, hu, painter) => face(wu, hu, painter, { base: C.navy, stock: 'soft', finish: 'soft', ppu: 340 });
  const inside = S({ w: 256, h: 256, base: '#E8E0D2', stock: 'white', finish: 'uncoated' });
  g.add(tray(w, h, d, { outer: cream(w, h, null), inner: inside, t: .03 }));
  const tissue = sheet(w * 1.02, d * 1.08, S({ w: 1024, h: 768, painter: (gg, W, H, L) => ART.tissue(gg, W, H, L, { bg: '#F3EEE6', color: 'rgba(28,43,99,.4)' }), base: '#F3EEE6', stock: 'white', finish: 'uncoated' }), { amp: .06, freq: 2.4, lift: .3, seed: 12, segs: 100 });
  tissue.position.y = h * .82; g.add(tissue);
  const lid = new THREE.Group();
  const top = rbox(w + .08, .035, d + .08, F(navy(d, .2, null), navy(d, .2, null), navy(w, d, ART.shoeLid), inside, navy(w, .2, null), navy(w, .2, null)), .01); top.position.y = .3; lid.add(top);
  const sk = tray(w + .08, .3, d + .08, { outer: navy(d, .3, null), inner: inside, t: .03, front: navy(w, .3, ART.shoeLidSide), back: navy(w, .3, ART.shoeLidSide), walls: true }); lid.add(sk);
  lid.position.set(1.2, 0, 2.3); lid.rotation.set(0, -.25, 0);
  g.add(lid);
  return g;
};

/* ============ COMPOSITIONS ============ */
P.hero = () => {
  const g = new THREE.Group();
  const stone = new THREE.MeshPhysicalMaterial({ color: '#D9CFC0', roughness: .85 });
  stone.bumpMap = S({ w: 512, h: 512, base: '#D9CFC0', stock: 'white', finish: 'matte', repeat: [2, 2] }).bumpMap; stone.bumpScale = .6;
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 1.3, 128), stone); plinth.position.set(-2.2, .65, -1.4); plinth.castShadow = plinth.receiveShadow = true; g.add(plinth);
  const block = rbox(2.6, .55, 2.0, stone, .03); block.position.set(2.9, .275, -1.9); g.add(block);
  g.add(place(P.rigid({ w: 2.3, h: 1.0, d: 2.3, lidH: .42 }), -2.2, 1.3, -1.4, .5));
  g.add(place(P.mailer({}), .2, 0, .9, -.28));
  g.add(place(P.bagOne({ w: 2.3, h: 2.9, d: 1.05 }), 2.9, .55, -2.0, -.3));
  const cups = P.cup(); cups.children.length = 2; g.add(place(cups, 3.1, 0, 1.6, -.2, .8));
  g.add(place(P.carton({}), -3.9, 0, .9, .35));
  return g;
};
P.pharmaCarton = ({ w = 1.4, h = 2.0, d = .7, accent = '#1F7A8C', name = 'Vitamin C', dose = '500 mg' } = {}) => {
  const g = new THREE.Group(); const o = { base: '#FFFFFF', stock: 'white', finish: 'matte', ppu: 520 };
  const fr = face(w, h, (gg, W, H, L) => ART.pharmaFront(gg, W, H, L, { accent, name, dose }), o), sd = face(d, h, (gg, W, H, L) => ART.pharmaSide(gg, W, H, L, { accent }), o);
  const top = face(w, d, (gg, W, H, L) => { gg.fillStyle = L.fill('#fff'); gg.fillRect(0, 0, W, H); }, o);
  const b = rbox(w, h, d, F(sd, sd, top, top, fr, fr), .006, 3); b.position.y = h / 2; g.add(b); return g;
};
/* industry compositions */
P.ind_ecommerce = () => { const g = new THREE.Group(); g.add(place(P.mailer({}), -.6, 0, .4, -.3)); g.add(place(P.shipping({ w: 3.0, h: 2.2, d: 2.4 }), 2.6, 0, -1.2, -.4)); const mb = P.mailerbag(); g.add(place(mb, 3.0, 0, 1.8, .2, .7)); return g; };
P.ind_restaurants = () => { const g = new THREE.Group(); g.add(place(P.pizza(), -1.2, 0, -.6, .2, .9)); const b = P.burger(); g.add(place(b, 2.6, 0, 1.4, -.3, .9)); const t = P.takeaway(); t.children.length = 1; g.add(place(t, 3.4, 0, -1.6, -.2, .9)); return g; };
P.ind_bakeries = () => { const g = new THREE.Group(); g.add(place(P.cake(), -.4, 0, 0, -.3)); g.add(place(P.bagOne({ w: 2.0, h: 2.4, d: 1.0 }), 2.5, 0, -.8, -.35)); return g; };
P.ind_cafes = () => { const g = new THREE.Group(); g.add(place(P.cup(), 0, 0, .3, 0)); const p = P.pouch(); p.children.length = 1; g.add(place(p, -2.6, 0, -.6, .3)); g.add(place(P.bagOne({ w: 2.0, h: 2.5, d: 1.0 }), 2.9, 0, -.9, -.3)); return g; };
P.ind_beauty = () => { const g = new THREE.Group(); g.add(place(P.cartons(), -1.2, 0, -.4, 0)); const b = P.bottle(); g.add(place(b, 2.0, 0, .6, -.2, .85)); return g; };
P.ind_fashion = () => { const g = new THREE.Group(); g.add(place(P.shoe(), -.8, 0, .4, -.2)); g.add(place(P.bagOne({ w: 2.4, h: 3.0, d: 1.1, base: C.navy, stockK: 'soft', finish: 'soft', foil: true, handle: '#C9A35B' }), 3.2, 0, -1.2, -.35)); return g; };
P.ind_jewellery = () => { const g = new THREE.Group(); g.add(place(P.jewellery(), 0, 0, 0, 0)); g.add(place(P.rigid({ w: 2.2, h: .9, d: 2.2, lidH: .36, color: '#EFE7D8' }), -2.6, 0, -1.2, .4)); return g; };
P.ind_pharma = () => {
  const g = new THREE.Group();
  g.add(place(P.pharmaCarton({}), -.6, 0, .4, .25));
  g.add(place(P.pharmaCarton({ accent: '#3B5BA9', name: 'Zinc', dose: '20 mg', w: 1.2, h: 1.7, d: .6 }), .9, 0, .8, -.2));
  const lying = P.pharmaCarton({ accent: '#7A4E9B', name: 'Omega 3', dose: '1000 mg' }); lying.rotation.set(-Math.PI / 2, 0, .5); lying.position.set(-.2, .35, 2.0); g.add(lying);
  g.add(place(P.shipping({ w: 3.2, h: 2.4, d: 2.6 }), -3.0, 0, -1.6, .3));
  return g;
};
P.ind_agriculture = () => { const g = new THREE.Group(); g.add(place(P.produce(), 0, 0, .4, -.15)); g.add(place(P.shipping({ w: 3.4, h: 2.4, d: 2.6 }), -3.0, 0, -2.2, .25)); g.add(place(P.shipping({ w: 2.6, h: 1.8, d: 2.0 }), 3.6, 0, -2.0, -.3)); return g; };

