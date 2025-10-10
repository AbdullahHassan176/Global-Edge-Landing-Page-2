import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/guide' });

  return {
    ...baseMeta,
    title: 'Investment Guide | Tokenized Asset Investing | The Global Edge',
    description: 'Complete guide to investing in tokenized real-world assets. Learn about asset types, risk management, tax considerations, and how to get started with Global Edge.',
    keywords: 'investment guide, tokenized assets, real-world assets, RWA investing, asset tokenization guide, investment education, blockchain investing, tokenized real estate, shipping container investing',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/guide'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Investment Guide | Tokenized Asset Investing | The Global Edge',
      description: 'Complete guide to investing in tokenized real-world assets. Learn about asset types, risk management, tax considerations, and how to get started with Global Edge.',
      url: 'https://theglobaledge.io/guide',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-guide.jpg', width: 1200, height: 630, alt: 'Investment Guide | Tokenized Asset Investing | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Investment Guide | Tokenized Asset Investing | The Global Edge',
      description: 'Complete guide to investing in tokenized real-world assets. Learn about asset types, risk management, tax considerations, and how to get started with Global Edge.',
      images: ['https://theglobaledge.io/og-guide.jpg']
    },
    
  };
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Investment Guide - Tokenized Asset Investing",
        "description": "Complete guide to investing in tokenized real-world assets. Learn about asset types, risk management, tax considerations, and how to get started with Global Edge.",
        "url": "https://theglobaledge.io/guide",
        "author": {
          "@type": "Organization",
          "name": "The Global Edge Investment Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "The Global Edge",
          "url": "https://theglobaledge.io"
        },
        "datePublished": "2024-12-20",
        "dateModified": "2024-12-20",
        "articleSection": "Investment Education",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://theglobaledge.io/guide"
        },
        "about": [
          {
            "@type": "Thing",
            "name": "Tokenized Assets",
            "description": "Digital representations of real-world assets on blockchain"
          },
          {
            "@type": "Thing",
            "name": "Investment Education",
            "description": "Educational content about investing in tokenized assets"
          },
          {
            "@type": "Thing",
            "name": "Risk Management",
            "description": "Strategies for managing investment risks"
          }
        ]
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



