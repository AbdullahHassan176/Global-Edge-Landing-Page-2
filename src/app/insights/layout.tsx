import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/insights' });

  return {
    ...baseMeta,
    title: 'Insights & Research | Tokenization Market Analysis | The Global Edge',
    description: 'Stay informed with the latest trends, analysis, and opportunities in tokenized real-world assets. Expert insights on blockchain technology and RWA tokenization.',
    keywords: 'tokenization insights, RWA research, blockchain analysis, real-world assets, market trends, tokenization news, investment research, blockchain technology, asset tokenization, market analysis',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/insights'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Insights & Research | Tokenization Market Analysis | The Global Edge',
      description: 'Stay informed with the latest trends, analysis, and opportunities in tokenized real-world assets. Expert insights on blockchain technology and RWA tokenization.',
      url: 'https://theglobaledge.io/insights',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-insights.jpg', width: 1200, height: 630, alt: 'Insights & Research | Tokenization Market Analysis | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Insights & Research | Tokenization Market Analysis | The Global Edge',
      description: 'Stay informed with the latest trends, analysis, and opportunities in tokenized real-world assets. Expert insights on blockchain technology and RWA tokenization.',
      images: ['https://theglobaledge.io/og-insights.jpg']
    },
    
  };
}

export default function InsightsSectionLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Insights & Research - Tokenization Market Analysis",
        "description": "Stay informed with the latest trends, analysis, and opportunities in tokenized real-world assets. Expert insights on blockchain technology and RWA tokenization",
        "url": "https://theglobaledge.io/insights",
        "mainEntity": {
          "@type": "Article",
          "headline": "Tokenization Market Analysis and Research",
          "description": "Comprehensive insights and research on tokenized real-world assets and blockchain technology",
          "author": {
            "@type": "Organization",
            "name": "The Global Edge Research Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-01-01",
          "dateModified": "2024-01-01",
          "articleSection": "Research & Analysis"
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
              "name": "Insights & Research",
              "item": "https://theglobaledge.io/insights"
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



