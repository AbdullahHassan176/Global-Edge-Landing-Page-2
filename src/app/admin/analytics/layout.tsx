import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/analytics' });

  return {
    ...baseMeta,
    title: 'Admin Analytics | Performance Metrics | The Global Edge',
    description: 'Comprehensive analytics dashboard for administrators. Monitor system performance, user engagement, and platform metrics.',
    keywords: 'admin analytics, performance metrics, system monitoring, user analytics, platform statistics, admin dashboard, analytics dashboard',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/analytics'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Analytics | Performance Metrics | The Global Edge',
      description: 'Comprehensive analytics dashboard for administrators. Monitor system performance, user engagement, and platform metrics.',
      url: 'https://theglobaledge.io/admin/analytics',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-admin-analytics.jpg', width: 1200, height: 630, alt: 'Admin Analytics | Performance Metrics | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Analytics | Performance Metrics | The Global Edge',
      description: 'Comprehensive analytics dashboard for administrators. Monitor system performance, user engagement, and platform metrics.',
      images: ['https://theglobaledge.io/og-admin-analytics.jpg']
    },
    other: {
      'script:type:application/ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Admin Analytics - Performance Metrics",
        "description": "Comprehensive analytics dashboard for administrators. Monitor system performance, user engagement, and platform metrics",
        "url": "https://theglobaledge.io/admin/analytics",
        "mainEntity": {
          "@type": "Article",
          "headline": "Administrative Analytics Dashboard",
          "description": "Comprehensive analytics and performance metrics for platform administrators",
          "author": {
            "@type": "Organization",
            "name": "The Global Edge Admin Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-01-01",
          "dateModified": "2024-01-01",
          "articleSection": "Administration"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://theglobaledge.io"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Admin",
              "item": "https://theglobaledge.io/admin"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Analytics",
              "item": "https://theglobaledge.io/admin/analytics"
            }
          ]
        }
      })
    }
  };
}

export default function AdminAnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
