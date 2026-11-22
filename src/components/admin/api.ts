export async function api<T = Record<string, unknown>>(url: string, init?: { method?: string; body?: unknown; raw?: BodyInit; headers?: Record<string, string> }): Promise<T> {
  const res = await fetch(url, {
    method: init?.method ?? 'GET',
    headers: { 'x-admin': '1', ...(init?.body !== undefined ? { 'content-type': 'application/json' } : {}), ...init?.headers },
    body: init?.raw ?? (init?.body !== undefined ? JSON.stringify(init.body) : undefined),
    cache: 'no-store',
  });
  const j = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (res.status === 401) { window.location.reload(); throw new Error('Your session has ended. Please sign in again.'); }
  if (!res.ok) throw new Error(j.error || `Request failed (${res.status})`);
  return j;
}

/** Shrinks a picture in the browser (longest side 1600px, WebP) so uploads stay small and the site stays fast. */
export async function shrinkImage(file: File, maxSide = 1600): Promise<{ blob: Blob; name: string }> {
  if (file.type === 'image/gif') return { blob: file, name: file.name };
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale)), h = Math.max(1, Math.round(bmp.height * scale));
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d')!; ctx.drawImage(bmp, 0, 0, w, h);
  let q = 0.86, blob: Blob | null = null;
  for (let i = 0; i < 5; i++) {
    blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/webp', q));
    if (blob && blob.size <= 1_400_000) break;
    q -= 0.12;
  }
  if (!blob) throw new Error('This picture could not be processed.');
  return { blob, name: file.name.replace(/\.[^.]+$/, '') + '.webp' };
}

export async function uploadImage(file: File): Promise<string> {
  const { blob, name } = await shrinkImage(file);
  const r = await api<{ url: string }>('/api/admin/media', { method: 'POST', raw: blob, headers: { 'content-type': blob.type, 'x-name': encodeURIComponent(name) } });
  return r.url;
}
