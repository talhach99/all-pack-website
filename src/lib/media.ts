/** Uploaded pictures are served from /media/<id>; ids never repeat, so they can be cached forever. */
export const MEDIA_MAX = 1_500_000;
export const MEDIA_TYPES: Record<string, string> = { 'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif' };
