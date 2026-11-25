'use client';
import { useEffect, useState } from 'react';

const fmt = (tz: string, now: number) => {
  try { return new Date(now).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz }); } catch { return ''; }
};
export const hourIn = (tz: string, now: number) => {
  try { return parseInt(new Date(now).toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: tz }), 10) % 24; } catch { return 12; }
};

/** Current time, refreshed every 30 seconds. Renders nothing until mounted so server and browser match. */
export function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);
  return now;
}

/** Live local time for a city, e.g. "9:10 AM". */
export function Clock({ tz }: { tz: string }) {
  const now = useNow();
  return <span suppressHydrationWarning>{now ? fmt(tz, now) : ''}</span>;
}
export { fmt as formatTime };
