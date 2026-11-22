import { cookies } from 'next/headers';
import { envVar, getDb } from './db';
import { COMPANY } from './company';

export const COOKIE = 'ap_admin';
const MAX_AGE = 60 * 60 * 12;
const enc = new TextEncoder();

const b64 = (buf: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

function same(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

/** True when the ID and password have been set as Cloudflare variables. */
export function authConfigured(): boolean { return !!(envVar('ADMIN_USERNAME') && envVar('ADMIN_PASSWORD')); }

const secret = () => `${envVar('ADMIN_SESSION_SECRET') || 'ap'}|${envVar('ADMIN_USERNAME')}|${envVar('ADMIN_PASSWORD')}`;

export async function checkCredentials(user: string, pass: string): Promise<boolean> {
  const u = envVar('ADMIN_USERNAME'), p = envVar('ADMIN_PASSWORD');
  if (!u || !p) return false;
  // Compare keyed hashes so the check takes the same time whatever is typed.
  const k = secret();
  const [a, b, c, d] = await Promise.all([hmac(k, `u:${user}`), hmac(k, `u:${u}`), hmac(k, `p:${pass}`), hmac(k, `p:${p}`)]);
  return same(a, b) && same(c, d);
}

export async function makeSession(): Promise<{ value: string; maxAge: number }> {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const body = `v1.${exp}`;
  return { value: `${body}.${await hmac(secret(), body)}`, maxAge: MAX_AGE };
}

export async function validSession(value: string | undefined): Promise<boolean> {
  if (!value || !authConfigured()) return false;
  const [v, exp, sig] = value.split('.');
  if (v !== 'v1' || !exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return same(sig, await hmac(secret(), `${v}.${exp}`));
}

export async function isAdmin(): Promise<boolean> {
  return validSession((await cookies()).get(COOKIE)?.value);
}

/** Admin API guard: valid session, and for writes a same-origin request carrying the custom header. */
export async function guard(req: Request): Promise<Response | null> {
  if (!(await isAdmin())) return Response.json({ error: 'Not signed in' }, { status: 401 });
  if (req.method !== 'GET') {
    if (!sameOrigin(req) || req.headers.get('x-admin') !== '1') return Response.json({ error: 'Blocked' }, { status: 403 });
  }
  return null;
}

export async function hashIp(ip: string): Promise<string> { return (await hmac(secret() + '|ip', ip)).slice(0, 24); }

/** Counts recent events of one kind for one visitor; records the new event when under the limit. */
export async function throttle(kind: string, who: string, limit: number, windowSec: number, record = true): Promise<boolean> {
  const db = await getDb();
  if (!db) return true;
  const since = Date.now() - windowSec * 1000;
  const row = await db.prepare('SELECT COUNT(*) AS n FROM attempts WHERE kind = ? AND who = ? AND at > ?').bind(kind, who, since).first<{ n: number }>();
  if ((row?.n ?? 0) >= limit) return false;
  if (record) await db.prepare('INSERT INTO attempts (kind, who, at) VALUES (?, ?, ?)').bind(kind, who, Date.now()).run();
  if (Math.random() < 0.05) await db.prepare('DELETE FROM attempts WHERE at < ?').bind(Date.now() - 86400000).run();
  return true;
}

/**
 * True when the request comes from a page on this website. Browsers set Sec-Fetch-Site themselves
 * (page scripts cannot change it), so it is the main check; the Origin header is the fallback.
 */
export function sameOrigin(req: Request): boolean {
  const site = req.headers.get('sec-fetch-site');
  if (site) return site === 'same-origin';
  const origin = req.headers.get('origin');
  if (!origin) return false;
  let host: string;
  try { host = new URL(origin).host.toLowerCase(); } catch { return false; }
  const own = new URL(COMPANY.siteUrl).host.toLowerCase();
  const allowed = [own, `www.${own}`, req.headers.get('host'), req.headers.get('x-forwarded-host')?.split(',')[0]?.trim(), new URL(req.url).host];
  return allowed.some(h => h && h.toLowerCase() === host);
}

export function clientIp(req: Request): string { return req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'; }
