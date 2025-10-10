import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/security' });

  return {
    ...baseMeta,
    title: 'Security | Blockchain, Compliance & Infrastructure | The Global Edge',
    description: 'Security first: Learn how The Global Edge protects your data, transactions, and tokenized assets using blockchain integrity and VARA compliance.',
    keywords: 'blockchain security, VARA compliance, tokenized asset security, data protection, transaction security, infrastructure security, regulatory compliance, blockchain integrity',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/security'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Security | Blockchain, Compliance & Infrastructure | The Global Edge',
      description: 'Security first: Learn how The Global Edge protects your data, transactions, and tokenized assets using blockchain integrity and VARA compliance.',
      url: 'https://theglobaledge.io/security',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-security.jpg', width: 1200, height: 630, alt: 'Security | Blockchain, Compliance & Infrastructure | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Security | Blockchain, Compliance & Infrastructure | The Global Edge',
      description: 'Security first: Learn how The Global Edge protects your data, transactions, and tokenized assets using blockchain integrity and VARA compliance.',
      images: ['https://theglobaledge.io/og-security.jpg']
    },
  };
}

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Security: Blockchain, Compliance & Infrastructure",
    "description": "Security first: Learn how The Global Edge protects your data, transactions, and tokenized assets using blockchain integrity and VARA compliance",
    "url": "https://theglobaledge.io/security",
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01",
    "author": {
      "@type": "Organization",
      "name": "The Global Edge Security Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Global Edge",
      "url": "https://theglobaledge.io"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Blockchain Security",
        "description": "Security measures for blockchain-based tokenized assets"
      },
      {
        "@type": "Thing",
        "name": "VARA Compliance",
        "description": "Regulatory compliance with UAE Virtual Asset Regulatory Authority"
      },
      {
        "@type": "Thing",
        "name": "Data Protection",
        "description": "Comprehensive data security and privacy protection measures"
      }
    ],
    "articleSection": "Security & Compliance",
    "wordCount": 1500
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

