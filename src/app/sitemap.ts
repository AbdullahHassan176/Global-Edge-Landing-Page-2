import type { MetadataRoute } from 'next';
import { getSiteOrigin } from '@/lib/site';

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[0]['changeFrequency']>;

/** Public marketing and compliance routes (no auth shells). */
const PUBLIC_PATHS: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/assets', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/investors', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/insights', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/security', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/partner-application', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/get-started', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/register', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/cookies', changeFrequency: 'yearly', priority: 0.45 },
  { path: '/risk-disclosures', changeFrequency: 'yearly', priority: 0.55 },
  { path: '/status', changeFrequency: 'weekly', priority: 0.65 },
  { path: '/guide', changeFrequency: 'monthly', priority: 0.65 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  const lastModified = new Date();
  return PUBLIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
