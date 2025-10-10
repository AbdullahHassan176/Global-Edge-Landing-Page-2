import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/how-it-works' });

  return {
    ...baseMeta,
    title: 'How Tokenization Works | The Global Edge UAE',
    description: 'Understand the Global Edge tokenization process — from asset onboarding to digital twin creation and investor access, built under UAE VARA compliance.',
    keywords: 'tokenization process UAE, VARA compliance, asset tokenization Dubai, digital twin creation, RWA tokenization UAE, blockchain asset onboarding',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/how-it-works'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'How Tokenization Works | The Global Edge UAE',
      description: 'Understand the Global Edge tokenization process — from asset onboarding to digital twin creation and investor access, built under UAE VARA compliance.',
      url: 'https://theglobaledge.io/how-it-works',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-how-it-works.jpg', width: 1200, height: 630, alt: 'How Tokenization Works | The Global Edge UAE' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'How Tokenization Works | The Global Edge UAE',
      description: 'Understand the Global Edge tokenization process — from asset onboarding to digital twin creation and investor access, built under UAE VARA compliance.',
      images: ['https://theglobaledge.io/og-how-it-works.jpg']
    },
  };
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Global Edge Tokenizes Real-World Assets",
    "description": "Step-by-step tokenization process from asset onboarding to digital twin creation and investor access, built under UAE VARA compliance",
    "url": "https://theglobaledge.io/how-it-works",
    "totalTime": "P14D",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Real-world asset"
      },
      {
        "@type": "HowToSupply", 
        "name": "VARA compliance documentation"
      },
      {
        "@type": "HowToSupply",
        "name": "Oracle integration"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Asset Verification",
        "text": "Independent third-party verification of asset existence, condition, ownership, and VARA compliance requirements"
      },
      {
        "@type": "HowToStep",
        "name": "Documentation",
        "text": "Creation of legal framework including SPV formation, custody agreements, and investor protection mechanisms under UAE regulations"
      },
      {
        "@type": "HowToStep",
        "name": "Oracle Integration",
        "text": "Integration with trusted oracle networks for continuous monitoring of asset performance and condition"
      },
      {
        "@type": "HowToStep",
        "name": "Smart Contract Deployment",
        "text": "Development and deployment of audited smart contracts that govern token mechanics and ownership rights"
      },
      {
        "@type": "HowToStep",
        "name": "Digital Twin Creation",
        "text": "Creation of digital twin for asset representation and investor access through blockchain technology"
      },
      {
        "@type": "HowToStep",
        "name": "Market Launch",
        "text": "Final VARA compliance review, investor onboarding activation, and public listing of tokenized asset"
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



