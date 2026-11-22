import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-f0-9]{16}\.(webp|png|jpg|gif)$/.test(id)) return new Response('Not found', { status: 404 });
  const db = await getDb();
  const row = db && (await db.prepare('SELECT mime, data FROM media WHERE id = ?').bind(id).first<{ mime: string; data: ArrayBuffer | number[] }>());
  if (!row) return new Response('Not found', { status: 404 });
  const body = row.data instanceof ArrayBuffer ? row.data : new Uint8Array(row.data);
  return new Response(body, { headers: { 'content-type': row.mime, 'cache-control': 'public, max-age=31536000, immutable', 'x-content-type-options': 'nosniff', 'content-security-policy': "default-src 'none'; sandbox" } });
}
