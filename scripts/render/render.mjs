// Renders product images to public/renders/*.webp using headless Chromium + three.js.
// Usage: node scripts/render/render.mjs [name ...]   (requires `playwright` and `sharp` available)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require(path.join(require('node:child_process').execSync('npm root -g').toString().trim(), 'playwright'))); }
const sharp = require('sharp');

const ALL = ['shipping','mailer','gift','carton','printed','bottle','pizza','burger','cake','takeaway','cup','bag','mailerbag','pouch','roll','tape','label','tissue','produce','jewellery','shoe','cargo','hero'];
const names = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
const types = { '.js': 'text/javascript', '.html': 'text/html' };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file;
  if (url === '/') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(`<!doctype html><html><body style="margin:0;background:transparent"><script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script><script type="module">import './scene.js';window.ready=true;</script></body></html>`); }
  if (url.startsWith('/three/')) file = path.join(root, 'node_modules', url);
  else file = path.join(root, 'scripts/render', path.basename(url));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }); fs.createReadStream(file).pipe(res);
});
await new Promise(r => server.listen(4719, r));
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('pageerror', e => console.error('page error', e.message));
await page.goto('http://localhost:4719/'); await page.waitForFunction('window.ready===true');
fs.mkdirSync(path.join(root, 'public/renders'), { recursive: true });
for (const name of names) {
  const opts = name === 'hero' ? { w: 2000, h: 1400 } : { w: 1600, h: 1200 };
  const t = Date.now();
  const data = await page.evaluate(([n, o]) => window.renderProduct(n, o), [name, opts]);
  const buf = Buffer.from(data.split(',')[1], 'base64');
  const out = path.join(root, 'public/renders', `${name}.webp`);
  await sharp(buf).trim({ threshold: 1 }).extend({ top: 40, bottom: 40, left: 40, right: 40, background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: name === 'hero' ? 1800 : 1200, height: name === 'hero' ? 1300 : 900, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 86, alphaQuality: 90 }).toFile(out);
  console.log(name, `${((Date.now() - t) / 1000).toFixed(1)}s`, `${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
}
await browser.close(); server.close();
