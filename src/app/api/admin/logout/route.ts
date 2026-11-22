import { COOKIE } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json', 'set-cookie': `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict` } });
}
