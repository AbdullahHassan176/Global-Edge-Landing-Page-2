import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/status' });

  return {
    ...baseMeta,
    title: 'Platform Status | Uptime & Maintenance | The Global Edge',
    description: 'Check real-time uptime and system maintenance updates for The Global Edge tokenization platform.',
    keywords: 'platform status, uptime, maintenance, system status, tokenization platform, real-time status, service monitoring, system updates, platform health',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/status'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Platform Status | Uptime & Maintenance | The Global Edge',
      description: 'Check real-time uptime and system maintenance updates for The Global Edge tokenization platform.',
      url: 'https://theglobaledge.io/status',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-status.jpg', width: 1200, height: 630, alt: 'Platform Status | Uptime & Maintenance | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Platform Status | Uptime & Maintenance | The Global Edge',
      description: 'Check real-time uptime and system maintenance updates for The Global Edge tokenization platform.',
      images: ['https://theglobaledge.io/og-status.jpg']
    },
    
  };
}

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Platform Status - Uptime & Maintenance",
        "description": "Check real-time uptime and system maintenance updates for The Global Edge tokenization platform",
        "url": "https://theglobaledge.io/status",
        "mainEntity": {
          "@type": "Article",
          "headline": "Platform Status",
          "description": "System uptime and service announcements for The Global Edge platform",
          "author": {
            "@type": "Organization",
            "name": "The Global Edge Technical Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-12-20",
          "dateModified": "2024-12-20",
          "articleSection": "System Status"
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
              "name": "Platform Status",
              "item": "https://theglobaledge.io/status"
            }
          ]
        }
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}



