import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/asset-details' });

  return {
    ...baseMeta,
    title: 'Asset Details | Tokenized Real-World Asset | The Global Edge',
    description: 'Detailed information about tokenized real-world assets on The Global Edge platform. View performance metrics, investment details, and risk assessment.',
    keywords: 'asset details, tokenized assets, real-world assets, investment details, asset performance, RWA tokenization, asset metrics, investment analysis',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/asset-details'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Asset Details | Tokenized Real-World Asset | The Global Edge',
      description: 'Detailed information about tokenized real-world assets on The Global Edge platform. View performance metrics, investment details, and risk assessment.',
      url: 'https://theglobaledge.io/asset-details',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-asset-details.jpg', width: 1200, height: 630, alt: 'Asset Details | Tokenized Real-World Asset | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Asset Details | Tokenized Real-World Asset | The Global Edge',
      description: 'Detailed information about tokenized real-world assets on The Global Edge platform. View performance metrics, investment details, and risk assessment.',
      images: ['https://theglobaledge.io/og-asset-details.jpg']
    },
    
  };
}

export default function AssetDetailsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Asset Details - Tokenized Real-World Asset",
        "description": "Detailed information about tokenized real-world assets on The Global Edge platform. View performance metrics, investment details, and risk assessment",
        "url": "https://theglobaledge.io/asset-details",
        "mainEntity": {
          "@type": "Article",
          "headline": "Tokenized Real-World Asset Details",
          "description": "Comprehensive details about tokenized real-world assets including performance metrics, investment information, and risk assessment",
          "author": {
            "@type": "Organization",
            "name": "The Global Edge Asset Management Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-01-01",
          "dateModified": "2024-01-01",
          "articleSection": "Asset Information"
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
              "name": "Assets",
              "item": "https://theglobaledge.io/assets"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Asset Details",
              "item": "https://theglobaledge.io/asset-details"
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



