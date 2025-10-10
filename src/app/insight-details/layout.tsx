import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/insight-details' });

  return {
    ...baseMeta,
    title: 'Insight Details | Blockchain Analysis & Research | The Global Edge',
    description: 'In-depth analysis and insights on blockchain technology, RWA tokenization, and investment strategies. Expert perspectives on the future of tokenized assets.',
    keywords: 'insight details, blockchain analysis, RWA tokenization, investment research, blockchain technology, tokenization insights, market analysis, investment strategy',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/insight-details'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Insight Details | Blockchain Analysis & Research | The Global Edge',
      description: 'In-depth analysis and insights on blockchain technology, RWA tokenization, and investment strategies. Expert perspectives on the future of tokenized assets.',
      url: 'https://theglobaledge.io/insight-details',
      type: 'article',
      images: [{ url: 'https://theglobaledge.io/og-insight-details.jpg', width: 1200, height: 630, alt: 'Insight Details | Blockchain Analysis & Research | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Insight Details | Blockchain Analysis & Research | The Global Edge',
      description: 'In-depth analysis and insights on blockchain technology, RWA tokenization, and investment strategies. Expert perspectives on the future of tokenized assets.',
      images: ['https://theglobaledge.io/og-insight-details.jpg']
    },
    
  };
}

export default function InsightDetailsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Blockchain Analysis & Research - Insight Details",
        "description": "In-depth analysis and insights on blockchain technology, RWA tokenization, and investment strategies. Expert perspectives on the future of tokenized assets",
        "url": "https://theglobaledge.io/insight-details",
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
        "articleSection": "Research & Analysis",
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
              "name": "Insights",
              "item": "https://theglobaledge.io/insights"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Insight Details",
              "item": "https://theglobaledge.io/insight-details"
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



