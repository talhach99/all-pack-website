/**
 * Cloudflare Web Analytics: free, cookie-free and privacy-friendly, so no cookie banner is needed.
 * Turned on by setting NEXT_PUBLIC_CF_ANALYTICS_TOKEN as a build variable in Cloudflare
 * (Workers → all-pack-website → Settings → Build → Variables), then redeploying.
 */
export function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
  if (!token) return null;
  return <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token })} />;
}
