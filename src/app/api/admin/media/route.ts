import { guard } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { MEDIA_MAX, MEDIA_TYPES } from '@/lib/media';

export const dynamic = 'force-dynamic';
const noStore = { 'cache-control': 'no-store' };

export async function GET(req: Request) {
  const denied = await guard(req); if (denied) return denied;
  const db = await getDb();
  if (!db) return Response.json({ items: [] }, { headers: noStore });
  const { results } = await db.prepare('SELECT id, name, size, created_at FROM media ORDER BY created_at DESC LIMIT 300').all();
  return Response.json({ items: results.map(r => ({ ...r, url: `/media/${(r as { id: string }).id}` })) }, { headers: noStore });
}

/** Body is the raw image; the file name travels in the x-name header (URL-encoded). */
export async function POST(req: Request) {
  const denied = await guard(req); if (denied) return denied;
  const db = await getDb(); if (!db) return Response.json({ error: 'The database is not connected yet.' }, { status: 503 });
  const mime = (req.headers.get('content-type') || '').split(';')[0].trim();
  if (!MEDIA_TYPES[mime]) return Response.json({ error: 'Use a WebP, PNG, JPEG or GIF picture.' }, { status: 415 });
  const buf = new Uint8Array(await req.arrayBuffer());
  if (buf.byteLength === 0 || buf.byteLength > MEDIA_MAX) return Response.json({ error: 'The picture is too large (limit 1.5 MB). It is normally reduced automatically.' }, { status: 413 });
  const id = `${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}.${MEDIA_TYPES[mime]}`;
  let name = 'picture'; try { name = decodeURIComponent(req.headers.get('x-name') || 'picture').slice(0, 120); } catch { /* keep default */ }
  await db.prepare('INSERT INTO media (id, name, mime, size, data, created_at) VALUES (?, ?, ?, ?, ?, ?)').bind(id, name, mime, buf.byteLength, buf, Date.now()).run();
  return Response.json({ ok: true, url: `/media/${id}`, name }, { headers: noStore });
}

export async function DELETE(req: Request) {
  const denied = await guard(req); if (denied) return denied;
  const db = await getDb(); if (!db) return Response.json({ error: 'No database' }, { status: 503 });
  const id = new URL(req.url).searchParams.get('id') || '';
  if (!/^[a-f0-9]{16}\.(webp|png|jpg|gif)$/.test(id)) return Response.json({ error: 'Bad id' }, { status: 400 });
  await db.prepare('DELETE FROM media WHERE id = ?').bind(id).run();
  return Response.json({ ok: true }, { headers: noStore });
}
