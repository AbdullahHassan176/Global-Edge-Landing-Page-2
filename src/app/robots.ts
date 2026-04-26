import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api/',
        '/dashboard',
        '/investor/',
        '/issuer/',
        '/settings',
        '/profile',
        '/withdraw',
        '/activity',
        '/reports',
        '/test-portal',
        '/test-issuer',
        '/reset-password',
        '/forgot-password',
        '/asset-details',
        '/insight-details',
      ],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
