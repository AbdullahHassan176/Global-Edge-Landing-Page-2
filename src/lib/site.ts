/**
 * Canonical origin for metadata, sitemap, robots, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL (no trailing slash), e.g. https://theglobaledge.io
 */
export function getSiteOrigin(): string {
  let raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw && process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');
    raw = `https://${host}`;
  }
  if (!raw) raw = 'https://theglobaledge.io';
  return raw.replace(/\/$/, '');
}

/** Absolute URL for a path (e.g. `/security` → `https://…/security`). */
export function absoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  if (!path || path === '/') return origin;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${p}`;
}
