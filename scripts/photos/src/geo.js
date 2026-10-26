// Geometry helpers. Units: 1 = 10 cm.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const F = (px, nx, py, ny, pz, nz) => [px, nx, py, ny, pz, nz];
export function rbox(w, h, d, mats, r = .02, seg = 4) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, seg, Math.max(.0005, Math.min(r, w / 2.05, h / 2.05, d / 2.05))), mats);
  m.castShadow = m.receiveShadow = true; return m;
}
export function shadows(o) { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; }
export function lathe(points, mat, seg = 128) {
  const m = new THREE.Mesh(new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), seg), mat); m.castShadow = m.receiveShadow = true; return m;
}
/**
 * Open-top tray with board thickness t. outer/inner/edge materials.
 * Returns group with origin at bottom centre.
 */
export function tray(w, h, d, { outer, inner, edge, t = .02, r = .006, front = null, back = null, left = null, right = null, bottom = null, walls = false }) {
  const g = new THREE.Group(); edge = edge || outer;
  if (!walls) { const b = rbox(w, t, d, F(edge, edge, inner, bottom || outer, edge, edge), r); b.position.y = t / 2; g.add(b); }
  const wall = (len, mat, rotY, x, z) => {
    const m = rbox(len, h, t, F(edge, edge, edge, edge, mat || outer, inner), r); m.rotation.y = rotY; m.position.set(x, h / 2, z); g.add(m);
  };
  wall(w, front, 0, 0, d / 2 - t / 2); wall(w, back, Math.PI, 0, -d / 2 + t / 2);
  wall(d - 2 * t, right, Math.PI / 2, w / 2 - t / 2, 0); wall(d - 2 * t, left, -Math.PI / 2, -w / 2 + t / 2, 0);
  return g;
}
/** Flat panel hinged at its back edge (z=0), extending towards +z, rotated open by `angle` (rad). */
export function hinged(w, d, t, { top, under, edge, angle = 0, r = .006 }) {
  const pivot = new THREE.Group();
  const p = rbox(w, t, d, F(edge, edge, top, under, edge, edge), r); p.position.set(0, t / 2, d / 2); pivot.add(p);
  pivot.rotation.x = -angle; pivot.userData.panel = p; return pivot;
}
/** Soft, slightly crumpled sheet (tissue). */
export function sheet(w, d, mat, { amp = .03, freq = 4, seed = 1, segs = 80, lift = 0 } = {}) {
  const geo = new THREE.PlaneGeometry(w, d, segs, Math.round(segs * d / w)); const p = geo.attributes.position;
  let s = seed; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const ph = [r() * 6, r() * 6, r() * 6, r() * 6];
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    const z = Math.sin(x * freq + ph[0]) * Math.cos(y * freq * .8 + ph[1]) * amp + Math.sin(x * freq * 2.3 + y * freq * 1.7 + ph[2]) * amp * .45 + Math.abs(Math.sin(x * freq * 5.1 + ph[3])) * amp * .25;
    const e = Math.max(Math.abs(x) / (w / 2), Math.abs(y) / (d / 2)); p.setZ(i, z + Math.pow(Math.max(0, e - .82) / .18, 2) * lift);
  }
  geo.computeVertexNormals(); const m = new THREE.Mesh(geo, mat); m.rotation.x = -Math.PI / 2; m.castShadow = m.receiveShadow = true; return m;
}
/** Twisted paper rope handle as a tube. */
export function ropeHandle(span, height, mat, radius = .028) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-span / 2, -.05, 0), new THREE.Vector3(-span / 2, height * .45, 0), new THREE.Vector3(-span * .3, height * .92, 0),
    new THREE.Vector3(0, height, 0), new THREE.Vector3(span * .3, height * .92, 0), new THREE.Vector3(span / 2, height * .45, 0), new THREE.Vector3(span / 2, -.05, 0)]);
  const geo = new THREE.TubeGeometry(curve, 120, radius, 16); const p = geo.attributes.position; const n = geo.attributes.normal;
  // twist ridges
  for (let i = 0; i < p.count; i++) { const k = Math.floor(i / 17), j = i % 17; const ridge = Math.sin(j / 16 * Math.PI * 2 * 2 + k * .9) * radius * .14; p.setXYZ(i, p.getX(i) + n.getX(i) * ridge, p.getY(i) + n.getY(i) * ridge, p.getZ(i) + n.getZ(i) * ridge); }
  geo.computeVertexNormals(); const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; return m;
}
export function place(o, x = 0, y = 0, z = 0, ry = 0, s = 1) { o.position.set(x, y, z); o.rotation.y = ry; o.scale.setScalar(s); return o; }
