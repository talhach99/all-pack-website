import { NextRequest } from 'next/server';
import { z } from 'zod';
import { COMPANY } from '@/lib/company';
import { clientIp, emailConfigured, isSameOrigin, json, rateLimit, sendEmail } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().trim().max(200).pipe(z.email()),
  consent: z.literal('yes'),
  website: z.string().max(200),
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return json({ ok: false, message: 'Invalid request origin.' }, 403);
  const type = req.headers.get('content-type') || '';
  if (!type.includes('multipart/form-data') && !type.includes('application/x-www-form-urlencoded')) return json({ ok: false, message: 'Invalid form format.' }, 415);
  if (Number(req.headers.get('content-length') || 0) > 10_000) return json({ ok: false, message: 'Request too large.' }, 413);
  if (!(await rateLimit('newsletter', clientIp(req), 5, 3600))) return json({ ok: false, message: 'Too many requests. Please try again later.' }, 429);

  let form: FormData;
  try { form = await req.formData(); } catch { return json({ ok: false, message: 'Invalid form data.' }, 400); }
  const parsed = schema.safeParse({ email: String(form.get('email') ?? ''), consent: String(form.get('consent') ?? ''), website: String(form.get('website') ?? '') });
  if (!parsed.success) return json({ ok: false, message: 'Enter a valid email and tick the consent box.' }, 400);
  if (parsed.data.website) return json({ ok: true, message: 'Thank you!' });
  if (!emailConfigured()) return json({ ok: false, message: 'Sign-ups are not switched on yet.' }, 503);

  try {
    const ok = await sendEmail({
      to: [process.env.QUOTE_TO_EMAIL || COMPANY.email],
      reply_to: parsed.data.email,
      subject: 'Website: packaging updates sign-up',
      text: `New sign-up for packaging updates: ${parsed.data.email}\nConsent: given via website form on ${new Date().toISOString()}.`,
    });
    if (!ok) return json({ ok: false, message: 'Something went wrong. Please email us instead.' }, 502);
    return json({ ok: true, message: "You're on the list. Thanks for signing up!" });
  } catch {
    return json({ ok: false, message: 'Connection problem. Please email us instead.' }, 502);
  }
}
