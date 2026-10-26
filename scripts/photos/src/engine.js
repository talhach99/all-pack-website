// Accumulation renderer: averages many jittered raster frames to approximate a studio photograph
// (soft area-light shadows, sky occlusion, depth of field, anti-aliasing), then tone-maps once.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const rand = () => Math.random();
function diskSample() { const r = Math.sqrt(rand()), a = rand() * Math.PI * 2; return [r * Math.cos(a), r * Math.sin(a)]; }
function cosineHemisphere() { const [x, z] = diskSample(); const y = Math.sqrt(Math.max(0, 1 - x * x - z * z)); return new THREE.Vector3(x, y, z); }

/** Dim studio room with emissive soft-boxes: gives believable specular reflections without flat fill. */
function studioEnvScene(o) {
  const s = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), new THREE.MeshBasicMaterial({ color: o.envRoom || '#3a3936', side: THREE.BackSide })); s.add(room);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(49, 32), new THREE.MeshBasicMaterial({ color: o.envFloor || '#6d665c' })); floor.rotation.x = -Math.PI / 2; floor.position.y = -4; s.add(floor);
  const box = (dir, w, h, I, color = '#ffffff') => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(I), side: THREE.DoubleSide })); m.position.copy(new THREE.Vector3(...dir).normalize().multiplyScalar(30)); m.lookAt(0, 0, 0); s.add(m); };
  box(o.key.dir, 22, 16, 6);                       // key soft-box
  if (o.rim) box(o.rim.dir, 8, 26, 4, '#eef2ff');   // strip light
  box([0, 1, .1], 30, 30, 3.6);                     // overhead soft-box
  box([1, .3, .6], 14, 18, .5);                     // fill card
  return s;
}

/** Seamless studio sweep (floor curving into back wall). */
export function cove({ color = '#E8E2D7', width = 80, depth = 40, height = 30, radius = 9, z = -6, roughness = .92, map = null } = {}) {
  const pts = []; // profile as (z, y)
  pts.push(new THREE.Vector2(depth, 0));
  for (let i = 0; i <= 40; i++) { const t = -Math.PI / 2 - (i / 40) * (Math.PI / 2); pts.push(new THREE.Vector2(radius * Math.cos(t), radius + radius * Math.sin(t))); }
  pts.push(new THREE.Vector2(-radius, height));
  // Build a ribbon surface by sweeping the profile along X.
  const geo = new THREE.BufferGeometry(); const pos = []; const uv = []; const idx = []; const segX = 2;
  let acc = 0; const lens = [0]; for (let i = 1; i < pts.length; i++) { acc += pts[i].distanceTo(pts[i - 1]); lens.push(acc); }
  for (let i = 0; i < pts.length; i++) for (let j = 0; j <= segX; j++) {
    const x = -width / 2 + width * j / segX; pos.push(x, pts[i].y, pts[i].x + z); uv.push(j / segX * width / 10, lens[i] / 10);
  }
  for (let i = 0; i < pts.length - 1; i++) for (let j = 0; j < segX; j++) {
    const a = i * (segX + 1) + j, b = a + 1, c = a + segX + 1, d = c + 1; idx.push(a, c, b, b, c, d);
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx); geo.computeVertexNormals();
  // Normals should face +z/+y (towards camera); flip if needed
  const n = geo.attributes.normal; if (n.getY(0) < 0) { geo.index.array.reverse(); geo.computeVertexNormals(); }
  const mat = new THREE.MeshStandardMaterial({ color, roughness, map });
  const m = new THREE.Mesh(geo, mat); m.receiveShadow = true; m.castShadow = false; m.name = 'cove';
  return m;
}

/** A window-frame gobo: big plane with rectangular holes, casts architectural shadows. */
export function gobo({ cols = 3, rows = 2, pane = 2.2, bar = .22, distance = 9 } = {}) {
  const W = cols * pane + (cols + 1) * bar, H = rows * pane + (rows + 1) * bar;
  const outer = new THREE.Shape(); outer.moveTo(-40, -40); outer.lineTo(40, -40); outer.lineTo(40, 40); outer.lineTo(-40, 40); outer.lineTo(-40, -40);
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
    const x0 = -W / 2 + bar + c * (pane + bar), y0 = -H / 2 + bar + r * (pane + bar);
    const h = new THREE.Path(); h.moveTo(x0, y0); h.lineTo(x0, y0 + pane); h.lineTo(x0 + pane, y0 + pane); h.lineTo(x0 + pane, y0); h.lineTo(x0, y0); outer.holes.push(h);
  }
  const m = new THREE.Mesh(new THREE.ShapeGeometry(outer), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: THREE.DoubleSide }));
  m.castShadow = true; m.userData.distance = distance; m.name = 'gobo'; return m;
}

/**
 * Render a shot.
 * opts: { w, h, frames, fov, camPos:[x,y,z], target:[x,y,z], focus (distance or null), aperture,
 *         key:{dir:[x,y,z], spread, intensity, color}, sky:{intensity, color}, rim:{dir,intensity,color},
 *         env:intensity, exposure, background, goboDir, vignette, grain }
 */
export async function shoot(scene, opts) {
  const o = Object.assign({ w: 1600, h: 1200, frames: 96, fov: 24, camPos: [6, 4.5, 9], target: [0, 1, 0], aperture: 0, focus: null,
    key: { dir: [-.55, .8, .45], spread: .22, intensity: 3.1, color: '#fff6ec' }, sky: { intensity: .6, color: '#f1f0ee' },
    rim: { dir: [.6, .5, -.75], intensity: .35, color: '#eef2ff' }, env: .24, exposure: 1.0, vignette: .18, grain: .018, tone: THREE.AgXToneMapping }, opts);
  const { w, h } = o;
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h; document.body.innerHTML = ''; document.body.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true, alpha: false });
  renderer.setPixelRatio(1); renderer.setSize(w, h, false);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap; renderer.shadowMap.autoUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // reflections only (kept low so lights + shadows carry the shading)
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(studioEnvScene(o), .02).texture; scene.environmentIntensity = o.env;
  if (o.background) scene.background = new THREE.Color(o.background);

  // scene bounds (exclude cove/gobo)
  scene.updateMatrixWorld(true);
  const bounds = new THREE.Box3(); scene.traverse(m => { if (m.isMesh && m.name !== 'cove' && m.name !== 'gobo') bounds.expandByObject(m); });
  const center = bounds.getCenter(new THREE.Vector3()); const radius = Math.max(1, bounds.getSize(new THREE.Vector3()).length() / 2);

  const mkShadowLight = (color, mapSize, extent) => {
    const l = new THREE.DirectionalLight(color, 0); l.castShadow = true; l.shadow.mapSize.set(mapSize, mapSize);
    const c = l.shadow.camera; c.left = c.bottom = -extent; c.right = c.top = extent; c.near = .1; c.far = extent * 6;
    l.shadow.bias = -.0002; l.shadow.normalBias = .02; l.target.position.copy(center); scene.add(l, l.target); return l;
  };
  const key = mkShadowLight(o.key.color, 4096, radius * 1.35);
  const sky = mkShadowLight(o.sky.color, 2048, radius * 1.5);
  let rim = null; if (o.rim && o.rim.intensity) { rim = new THREE.DirectionalLight(o.rim.color, o.rim.intensity); rim.position.copy(center).add(new THREE.Vector3(...o.rim.dir).normalize().multiplyScalar(20)); rim.target.position.copy(center); scene.add(rim, rim.target); }
  const bounce = new THREE.HemisphereLight('#ffffff', o.bounceColor || '#cfc6b8', o.bounce ?? .18); scene.add(bounce);

  if (o.view) { // auto-frame: o.view = { dir:[x,y,z], fill:0.8, lift:0.4 }
    const dir = new THREE.Vector3(...o.view.dir).normalize(); const size = bounds.getSize(new THREE.Vector3());
    const tgt = center.clone(); tgt.y = bounds.min.y + size.y * (o.view.lift ?? .42);
    const fovV = THREE.MathUtils.degToRad(o.fov), aspect = w / h; const fovH = 2 * Math.atan(Math.tan(fovV / 2) * aspect);
    const rr = size.length() / 2; const dist = rr / Math.sin(Math.min(fovV, fovH) / 2) * (o.view.fill ?? .82);
    const camP = tgt.clone().addScaledVector(dir, dist);
    if (o.view.pan) { const right = dir.clone().negate().cross(new THREE.Vector3(0, 1, 0)).normalize(); const halfW = Math.tan(fovH / 2) * dist; camP.addScaledVector(right, -o.view.pan * halfW); tgt.addScaledVector(right, -o.view.pan * halfW); }
    o.camPos = camP.toArray(); o.target = tgt.toArray();
  }
  const gob = scene.getObjectByName('gobo');
  const keyDir = new THREE.Vector3(...o.key.dir).normalize();
  const cam = new THREE.PerspectiveCamera(o.fov, w / h, .05, 400);
  const camPos = new THREE.Vector3(...o.camPos), target = new THREE.Vector3(...o.target);
  const focusDist = o.focus ?? camPos.distanceTo(target);

  const rtOpts = { type: THREE.HalfFloatType, depthBuffer: true, samples: 0 };
  const frame = new THREE.WebGLRenderTarget(w, h, rtOpts);
  const accum = new THREE.WebGLRenderTarget(w, h, { type: THREE.FloatType, depthBuffer: false });
  const quadScene = new THREE.Scene(); const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const addMat = new THREE.MeshBasicMaterial({ map: frame.texture, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, toneMapped: false, transparent: true });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), addMat); quadScene.add(quad);
  renderer.setRenderTarget(accum); renderer.setClearColor(0x000000, 0); renderer.clear();

  const tmp = new THREE.Vector3(), right = new THREE.Vector3(), up = new THREE.Vector3();
  for (let f = 0; f < o.frames; f++) {
    // key: jitter direction within a cone (soft-box size)
    const kd = keyDir.clone(); const [a, b] = diskSample();
    right.set(0, 1, 0).cross(kd).normalize(); up.copy(kd).cross(right).normalize();
    kd.addScaledVector(right, a * o.key.spread).addScaledVector(up, b * o.key.spread).normalize();
    key.position.copy(center).addScaledVector(kd, radius * 3); key.intensity = o.key.intensity;
    if (gob) { gob.position.copy(center).addScaledVector(kd, gob.userData.distance); gob.lookAt(center); }
    // sky occlusion light: cosine-weighted hemisphere
    const sd = cosineHemisphere(); sky.position.copy(center).addScaledVector(sd, radius * 3); sky.intensity = o.sky.intensity;
    // camera: lens jitter (DOF) + sub-pixel AA
    cam.position.copy(camPos);
    if (o.aperture > 0) {
      cam.lookAt(target); const [lx, ly] = diskSample(); right.setFromMatrixColumn(cam.matrixWorld, 0); up.setFromMatrixColumn(cam.matrixWorld, 1);
      const focusPoint = tmp.copy(target).sub(camPos).normalize().multiplyScalar(focusDist).add(camPos);
      cam.position.addScaledVector(right, lx * o.aperture).addScaledVector(up, ly * o.aperture); cam.lookAt(focusPoint);
    } else cam.lookAt(target);
    cam.setViewOffset(w, h, rand() - .5, rand() - .5, w, h); cam.updateProjectionMatrix();
    renderer.setRenderTarget(frame); renderer.setClearColor(o.background || '#000000', 1); renderer.clear(); renderer.render(scene, cam);
    renderer.setRenderTarget(accum); renderer.autoClear = false; renderer.render(quadScene, quadCam); renderer.autoClear = true;
    if (f % 8 === 7) await new Promise(r => setTimeout(r, 0));
  }
  // resolve: average + tone map to canvas
  const outMat = new THREE.MeshBasicMaterial({ map: accum.texture, color: new THREE.Color(1 / o.frames, 1 / o.frames, 1 / o.frames).multiplyScalar(o.exposure), depthTest: false, toneMapped: true });
  quad.material = outMat; renderer.toneMapping = o.tone; renderer.toneMappingExposure = 1;
  renderer.setRenderTarget(null); renderer.render(quadScene, quadCam);

  // post: vignette + grain on a 2D canvas
  const out = document.createElement('canvas'); out.width = w; out.height = h; const g = out.getContext('2d');
  g.drawImage(canvas, 0, 0);
  if (o.vignette) { const gr = g.createRadialGradient(w / 2, h * .48, Math.min(w, h) * .35, w / 2, h / 2, Math.hypot(w, h) * .62); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, `rgba(20,16,10,${o.vignette})`); g.fillStyle = gr; g.fillRect(0, 0, w, h); }
  if (o.grain) { const id = g.getImageData(0, 0, w, h); const d = id.data; for (let i = 0; i < d.length; i += 4) { const n = (rand() - .5) * 255 * o.grain; d[i] += n; d[i + 1] += n; d[i + 2] += n; } g.putImageData(id, 0, 0); }
  const url = out.toDataURL('image/png');
  frame.dispose(); accum.dispose(); renderer.dispose(); pm.dispose();
  return url;
}
