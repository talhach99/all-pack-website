import { sameOrigin, authConfigured, checkCredentials, clientIp, COOKIE, hashIp, makeSession, throttle } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ error: 'Blocked' }, { status: 403 });
  if (!authConfigured()) return Response.json({ error: 'The admin ID and password have not been set in Cloudflare yet.' }, { status: 503 });
  const who = await hashIp(clientIp(req));
  if (!(await throttle('login', who, 8, 900, false))) return Response.json({ error: 'Too many attempts. Please wait 15 minutes and try again.' }, { status: 429 });
  let body: { username?: unknown; password?: unknown } = {};
  try { body = await req.json(); } catch { /* handled below */ }
  const ok = typeof body.username === 'string' && typeof body.password === 'string' && (await checkCredentials(body.username.trim(), body.password));
  if (!ok) {
    await throttle('login', who, 1000, 900, true);
    return Response.json({ error: 'Incorrect ID or password.' }, { status: 401 });
  }
  const { value, maxAge } = await makeSession();
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json', 'set-cookie': `${COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`, 'cache-control': 'no-store' },
  });
}
