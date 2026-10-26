import * as THREE from 'three';
import { loadFonts } from './tex.js';
import { shoot } from './engine.js';
import { SHOTS } from './shots.js';

await loadFonts();
window.renderShot = async (name, override = {}) => {
  const def = SHOTS[name]; if (!def) throw new Error('no shot ' + name);
  const scene = new THREE.Scene();
  const { objects, opts } = await def();
  for (const o of objects) scene.add(o);
  return shoot(scene, Object.assign({}, opts, override));
};
window.shotNames = Object.keys(SHOTS);
window.ready = true;
