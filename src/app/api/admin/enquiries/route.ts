import { guard } from '@/lib/auth';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
const noStore = { 'cache-control': 'no-store' };
const STATUS = new Set(['new', 'contacted', 'closed']);

export async function GET(req: Request) {
  const denied = await guard(req); if (denied) return denied;
  const db = await getDb();
  if (!db) return Response.json({ dbConnected: false, items: [] }, { headers: noStore });
  const { results } = await db.prepare('SELECT id, created_at, name, email, whatsapp, message, status, note, source FROM enquiries ORDER BY created_at DESC LIMIT 500').all();
  return Response.json({ dbConnected: true, items: results }, { headers: noStore });
}

export async function PATCH(req: Request) {
  const denied = await guard(req); if (denied) return denied;
  const db = await getDb(); if (!db) return Response.json({ error: 'No database' }, { status: 503 });
  const b = (await req.json().catch(() => ({}))) as { id?: unknown; status?: unknown; note?: unknown };
  const id = Number(b.id); if (!Number.isInteger(id)) return Response.json({ error: 'Bad id' }, { status: 400 });
  if (typeof b.status === 'string' && STATUS.has(b.status)) await db.prepare('UPDATE enquiries SET status = ? WHERE id = ?').bind(b.status, id).run();
  if (typeof b.note === 'string') await db.prepare('UPDATE enquiries SET note = ? WHERE id = ?').bind(b.note.slice(0, 2000), id).run();
  return Response.json({ ok: true }, { headers: noStore });
}

export async function DELETE(req: Request) {
  const denied = await guard(req); if (denied) return denied;
  const db = await getDb(); if (!db) return Response.json({ error: 'No database' }, { status: 503 });
  const id = Number(new URL(req.url).searchParams.get('id')); if (!Number.isInteger(id)) return Response.json({ error: 'Bad id' }, { status: 400 });
  await db.prepare('DELETE FROM enquiries WHERE id = ?').bind(id).run();
  return Response.json({ ok: true }, { headers: noStore });
}
