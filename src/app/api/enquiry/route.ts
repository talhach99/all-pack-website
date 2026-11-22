import { clientIp, hashIp, throttle } from '@/lib/auth';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

const clip = (v: unknown, n: number) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin || new URL(origin).host !== new URL(req.url).host) return Response.json({ error: 'Blocked' }, { status: 403 });
  let b: Record<string, unknown> = {};
  try { b = await req.json(); } catch { return Response.json({ error: 'Invalid request' }, { status: 400 }); }
  // Hidden field a person never fills in, and a minimum time on the page: bots fail one of the two. They get a normal-looking success.
  if (clip(b.website, 50) || Number(b.elapsed) < 2500) return Response.json({ ok: true });
  const name = clip(b.name, 120), email = clip(b.email, 200), message = clip(b.message, 4000);
  const whatsapp = clip(b.whatsapp, 40);
  const digits = whatsapp.replace(/\D/g, '');
  if (name.length < 2) return Response.json({ error: 'Please enter your name.', field: 'name' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return Response.json({ error: 'Please enter a valid email address.', field: 'email' }, { status: 400 });
  if (digits.length < 10 || digits.length > 15 || !/^[+\d\s()-]+$/.test(whatsapp)) return Response.json({ error: 'Please enter a valid WhatsApp number, for example 0321 1234567.', field: 'whatsapp' }, { status: 400 });
  if (message.length < 5) return Response.json({ error: 'Please tell us what you need.', field: 'message' }, { status: 400 });
  const db = await getDb();
  if (!db) return Response.json({ error: 'We could not save your enquiry just now. Please message us on WhatsApp instead.' }, { status: 503 });
  const who = await hashIp(clientIp(req));
  if (!(await throttle('enquiry', who, 5, 3600))) return Response.json({ error: 'You have sent several enquiries recently. Please try again later or message us on WhatsApp.' }, { status: 429 });
  await db.prepare('INSERT INTO enquiries (created_at, name, email, whatsapp, message, source, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(Date.now(), name, email, whatsapp, message, clip(b.source, 100), who).run();
  return Response.json({ ok: true });
}
