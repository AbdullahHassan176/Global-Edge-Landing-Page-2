import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/cookies' });

  return {
    ...baseMeta,
    title: 'Cookies Policy | Analytics & Performance | The Global Edge',
    description: 'Details on how The Global Edge uses cookies and analytics to enhance site performance and user experience.',
    keywords: 'cookies policy, analytics, performance, site performance, user experience, cookie management, browser preferences, tracking cookies, analytics cookies',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/cookies'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Cookies Policy | Analytics & Performance | The Global Edge',
      description: 'Details on how The Global Edge uses cookies and analytics to enhance site performance and user experience.',
      url: 'https://theglobaledge.io/cookies',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-cookies.jpg', width: 1200, height: 630, alt: 'Cookies Policy | Analytics & Performance | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Cookies Policy | Analytics & Performance | The Global Edge',
      description: 'Details on how The Global Edge uses cookies and analytics to enhance site performance and user experience.',
      images: ['https://theglobaledge.io/og-cookies.jpg']
    },
    
  };
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Cookies Policy - Analytics & Performance",
        "description": "Details on how The Global Edge uses cookies and analytics to enhance site performance and user experience",
        "url": "https://theglobaledge.io/cookies",
        "mainEntity": {
          "@type": "Article",
          "headline": "Cookies Policy",
          "description": "Managing your browser preferences for cookies and analytics",
          "author": {
            "@type": "Organization",
            "name": "The Global Edge Privacy Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-12-20",
          "dateModified": "2024-12-20",
          "articleSection": "Privacy & Cookies"
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
              "name": "Cookies Policy",
              "item": "https://theglobaledge.io/cookies"
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



