import { NextRequest, NextResponse } from 'next/server';

/** JSON response helper with no-store caching. */
export function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/**
 * Blocks cross-site form posts (CSRF / spam from other domains).
 * Browsers always send Origin on POST fetches; Sec-Fetch-Site is a second signal.
 */
export function isSameOrigin(req: NextRequest): boolean {
  const site = req.headers.get('sec-fetch-site');
  if (site && site !== 'same-origin' && site !== 'none') return false;
  const origin = req.headers.get('origin');
  if (!origin) return site === 'same-origin';
  try {
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || req.nextUrl.host;
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  ).replace(/[^a-f0-9.:]/gi, '').slice(0, 64) || 'unknown';
}

/* Best-effort in-memory limiter (per server instance). Upstash Redis is used when configured. */
const memory = new Map<string, { count: number; reset: number }>();
function memoryLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (memory.size > 5000) for (const [k, v] of memory) if (v.reset < now) memory.delete(k);
  const entry = memory.get(key);
  if (!entry || entry.reset < now) {
    memory.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}

export async function rateLimit(scope: string, ip: string, limit: number, windowSec: number): Promise<boolean> {
  const key = `allpack:${scope}:${ip}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return memoryLimit(key, limit, windowSec * 1000);
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([['INCR', key], ['EXPIRE', key, windowSec, 'NX']]),
      cache: 'no-store',
    });
    if (!res.ok) return memoryLimit(key, limit, windowSec * 1000);
    const data = (await res.json()) as Array<{ result?: number }>;
    return Number(data?.[0]?.result || 0) <= limit;
  } catch {
    return memoryLimit(key, limit, windowSec * 1000);
  }
}

/** Check real file contents rather than trusting the browser-supplied MIME type. */
export function sniffFile(bytes: Uint8Array): 'image/png' | 'image/jpeg' | 'application/pdf' | null {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes.length >= 5 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d) return 'application/pdf';
  return null;
}

export function toBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(binary);
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c);

/** Strip control characters / newlines that could break an email subject line. */
export const oneLine = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();

export async function sendEmail(payload: Record<string, unknown>): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, ...payload }),
    cache: 'no-store',
  });
  if (!res.ok) console.error('Resend rejected the message', res.status);
  return res.ok;
}

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
