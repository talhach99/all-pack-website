// Studio photography for ALL PACK, rendered from code (three.js accumulation renderer in headless Chromium).
// Usage: node scripts/photos/render.mjs [--frames 64] [--size 1600x1280] [shotName ...]
// Writes public/photos/<name>.webp (+ <name>-800.webp). Needs `playwright` and `sharp` (global installs are fine).
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url'; import { createRequire } from 'node:module'; import { execSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url)); const root = path.resolve(here, '../..');
const req = (m) => { try { return require(m); } catch { return require(path.join(execSync('npm root -g').toString().trim(), m)); } };
const { chromium } = req('playwright'); const sharp = req('sharp');

const SIZES = { hero: [2400, 1200, 100], fin_: [1200, 1200, 90], ind_: [1600, 1200, 64] };
const args = process.argv.slice(2); let frames = null, size = null; const names = [];
for (let i = 0; i < args.length; i++) { if (args[i] === '--frames') frames = +args[++i]; else if (args[i] === '--size') size = args[++i].split('x').map(Number); else names.push(args[i]); }
const fontDir = (pkg) => path.join(root, 'node_modules/@fontsource-variable', pkg, 'files');
const files = { '/fonts/fraunces-latin-opsz-normal.woff2': path.join(fontDir('fraunces'), 'fraunces-latin-opsz-normal.woff2'), '/fonts/fraunces-latin-opsz-italic.woff2': path.join(fontDir('fraunces'), 'fraunces-latin-opsz-italic.woff2'), '/fonts/manrope-latin-wght-normal.woff2': path.join(fontDir('manrope'), 'manrope-latin-wght-normal.woff2') };
const types = { '.js': 'text/javascript', '.woff2': 'font/woff2' };
const imports = { three: '/node_modules/three/build/three.module.js', 'three/addons/': '/node_modules/three/examples/jsm/' };
const server = http.createServer((q, r) => {
  const url = decodeURIComponent(q.url.split('?')[0]);
  if (url === '/') { r.writeHead(200, { 'content-type': 'text/html' }); return r.end(`<!doctype html><body style="margin:0"><script type="importmap">${JSON.stringify({ imports })}</script><script type="module" src="/src/main.js"></script>`); }
  const file = files[url] || (url.startsWith('/node_modules/') ? path.join(root, url) : path.join(here, url));
  if (!fs.existsSync(file)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }); fs.createReadStream(file).pipe(r);
});
await new Promise(res => server.listen(4731, res));
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage(); page.setDefaultTimeout(0); page.on('pageerror', e => console.error('page error', e.message));
await page.goto('http://localhost:4731/'); await page.waitForFunction('window.ready === true', null, { timeout: 120000 });
const list = names.length ? names : await page.evaluate(() => window.shotNames);
const out = path.join(root, 'public/photos'); fs.mkdirSync(out, { recursive: true });
for (const n of list) {
  const t = Date.now(); const def = Object.entries(SIZES).find(([k]) => n.startsWith(k))?.[1] || [1600, 1280, 64];
  const [w, h] = size || def; const o = { w, h, frames: frames || def[2] };
  const url = await page.evaluate(([n, o]) => window.renderShot(n, o), [n, o]);
  const buf = Buffer.from(url.split(',')[1], 'base64');
  await sharp(buf).webp({ quality: 86 }).toFile(path.join(out, `${n}.webp`));
  await sharp(buf).resize({ width: n === 'hero' ? 1200 : 800 }).webp({ quality: 82 }).toFile(path.join(out, `${n}-${n === 'hero' ? 1200 : 800}.webp`));
  console.log(n, `${((Date.now() - t) / 1000).toFixed(0)}s`);
}
await browser.close(); server.close();
