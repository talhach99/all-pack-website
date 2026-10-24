import { NextRequest } from 'next/server';
import { z } from 'zod';
import { COMPANY } from '@/lib/company';
import { clientIp, emailConfigured, escapeHtml, isSameOrigin, json, oneLine, rateLimit, sendEmail, sniffFile, toBase64 } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE = 4 * 1024 * 1024;
const MAX_BODY = MAX_FILE + 256 * 1024;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().max(200).pipe(z.email()),
  company: z.string().trim().max(150),
  phone: z.string().trim().max(50).regex(/^[0-9+()\-\s]*$/),
  city: z.string().trim().max(80),
  quantity: z.coerce.number().int().min(1).max(10_000_000),
  dimensions: z.string().trim().max(180),
  products: z.string().trim().max(2500),
  notes: z.string().trim().min(5).max(5000),
  website: z.string().max(200),
  t: z.coerce.number().optional(),
});

const FIELDS = ['name', 'email', 'company', 'phone', 'city', 'quantity', 'dimensions', 'products', 'notes', 'website', 't'] as const;

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ ok: false, message: 'Invalid request origin.' }, 403);
  if (!(request.headers.get('content-type') || '').includes('multipart/form-data')) return json({ ok: false, message: 'Invalid form format.' }, 415);
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BODY) return json({ ok: false, message: 'Your upload is too large. Artwork must be 4 MB or smaller.' }, 413);

  const ip = clientIp(request);
  if (!(await rateLimit('quote', ip, 6, 3600))) return json({ ok: false, message: 'Too many requests. Please wait a while or contact us on WhatsApp.' }, 429);

  let form: FormData;
  try { form = await request.formData(); } catch { return json({ ok: false, message: 'Unable to read the form.' }, 400); }

  const raw = Object.fromEntries(FIELDS.map(k => [k, String(form.get(k) ?? '')]));
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return json({ ok: false, message: 'Please check the highlighted fields: name, a valid email, quantity and project details are required.' }, 400);
  const v = parsed.data;

  // Bot traps: hidden honeypot field, or a form submitted implausibly fast. Pretend success, send nothing.
  if (v.website || (v.t && Date.now() - v.t < 2500)) return json({ ok: true, message: 'Thank you.' });

  const file = form.get('artwork');
  let attachment: { filename: string; content: string } | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE) return json({ ok: false, message: 'Artwork must be 4 MB or smaller.' }, 400);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const kind = sniffFile(bytes);
    if (!kind) return json({ ok: false, message: 'Artwork must be a PNG, JPG or PDF file.' }, 400);
    const ext = kind === 'application/pdf' ? 'pdf' : kind === 'image/png' ? 'png' : 'jpg';
    const base = file.name.replace(/\.[^.]*$/, '').replace(/[^a-z0-9_-]/gi, '_').slice(0, 80) || 'artwork';
    attachment = { filename: `${base}.${ext}`, content: toBase64(bytes) };
  }

  if (!emailConfigured()) {
    return json({ ok: false, configurationRequired: true, message: `Online sending isn't switched on yet. Please send your brief on WhatsApp or email ${COMPANY.email}.` }, 503);
  }

  const rows: [string, string][] = [
    ['Name', v.name], ['Email', v.email], ['Company', v.company], ['Phone / WhatsApp', v.phone], ['City', v.city],
    ['Quantity', v.quantity.toLocaleString('en-US')], ['Dimensions', v.dimensions], ['Products', v.products], ['Project details', v.notes],
  ];
  const html = `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#0b1530">
<h1 style="font-size:20px;margin:0 0 4px">New quote request</h1><p style="color:#5b6785;margin:0 0 20px">Submitted via the ALL PACK website</p>
<table style="border-collapse:collapse;width:100%">${rows.filter(([, val]) => val).map(([k, val]) => `<tr><th style="padding:10px;border-bottom:1px solid #e5e9f2;text-align:left;vertical-align:top;width:150px;color:#5b6785;font-weight:600">${escapeHtml(k)}</th><td style="padding:10px;border-bottom:1px solid #e5e9f2">${escapeHtml(val).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>
<p style="color:#5b6785;font-size:13px;margin-top:20px">Reply to this email to respond to the customer directly.</p></div>`;
  const text = rows.filter(([, val]) => val).map(([k, val]) => `${k}: ${val}`).join('\n');

  try {
    const ok = await sendEmail({
      to: [process.env.QUOTE_TO_EMAIL || COMPANY.email],
      reply_to: v.email,
      subject: oneLine(`Quote request — ${v.name}${v.company ? ` (${v.company})` : ''}`).slice(0, 150),
      html, text,
      attachments: attachment ? [attachment] : undefined,
    });
    if (!ok) return json({ ok: false, message: 'Your request could not be delivered. Please contact us on WhatsApp or email.' }, 502);
    return json({ ok: true, message: 'Thank you — your brief is with our team. We will be in touch shortly.' });
  } catch (error) {
    console.error('Quote transport failure', error instanceof Error ? error.message : 'unknown');
    return json({ ok: false, message: 'Connection problem. Please contact us on WhatsApp or email.' }, 502);
  }
}
