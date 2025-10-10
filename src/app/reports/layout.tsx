import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/reports' });

  return {
    ...baseMeta,
    title: 'Investment Reports | Portfolio Analytics | The Global Edge',
    description: 'Download detailed performance reports, portfolio analytics, tax reports, and transaction history for your tokenized asset investments.',
    keywords: 'investment reports, portfolio analytics, performance reports, tax reports, transaction history, risk analysis, investment documentation',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/reports'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Investment Reports | Portfolio Analytics | The Global Edge',
      description: 'Download detailed performance reports, portfolio analytics, tax reports, and transaction history for your tokenized asset investments.',
      url: 'https://theglobaledge.io/reports',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-reports.jpg', width: 1200, height: 630, alt: 'Investment Reports | Portfolio Analytics | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Investment Reports | Portfolio Analytics | The Global Edge',
      description: 'Download detailed performance reports, portfolio analytics, tax reports, and transaction history for your tokenized asset investments.',
      images: ['https://theglobaledge.io/og-reports.jpg']
    },
    
  };
}

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Investment Reports - Portfolio Analytics",
        "description": "Download detailed performance reports, portfolio analytics, tax reports, and transaction history for your tokenized asset investments",
        "url": "https://theglobaledge.io/reports",
        "mainEntity": {
          "@type": "Article",
          "headline": "Investment Reports and Analytics",
          "description": "Comprehensive reporting tools for investment portfolio analysis",
          "author": {
            "@type": "Person",
            "name": "The Global Edge Investment Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-12-20",
          "dateModified": "2024-12-20",
          "articleSection": "Investment Analytics"
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
              "name": "Reports",
              "item": "https://theglobaledge.io/reports"
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



