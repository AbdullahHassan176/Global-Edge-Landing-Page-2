import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/faq' });

  return {
    ...baseMeta,
    title: 'FAQs | Tokenization Platform Questions | The Global Edge',
    description: 'Frequently asked questions about The Global Edge platform, VARA compliance, asset tokenization, and investor onboarding.',
    keywords: 'FAQs, tokenization platform questions, VARA compliance, asset tokenization, investor onboarding, platform questions, tokenization FAQ, RWA questions',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/faq'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'FAQs | Tokenization Platform Questions | The Global Edge',
      description: 'Frequently asked questions about The Global Edge platform, VARA compliance, asset tokenization, and investor onboarding.',
      url: 'https://theglobaledge.io/faq',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-faq.jpg', width: 1200, height: 630, alt: 'FAQs | Tokenization Platform Questions | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'FAQs | Tokenization Platform Questions | The Global Edge',
      description: 'Frequently asked questions about The Global Edge platform, VARA compliance, asset tokenization, and investor onboarding.',
      images: ['https://theglobaledge.io/og-faq.jpg']
    },
  };
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Frequently Asked Questions - The Global Edge Platform",
    "description": "Frequently asked questions about The Global Edge platform, VARA compliance, asset tokenization, and investor onboarding",
    "url": "https://theglobaledge.io/faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is The Global Edge platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Global Edge is a VARA-compliant platform that tokenizes real-world assets like shipping containers, real estate, and trade inventory, allowing investors to own fractional shares of these assets through blockchain technology."
        }
      },
      {
        "@type": "Question",
        "name": "How does asset tokenization work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Asset tokenization involves converting ownership rights of physical assets into digital tokens on a blockchain. Each token represents a fractional ownership stake in the underlying asset, with full VARA compliance."
        }
      },
      {
        "@type": "Question",
        "name": "What is VARA compliance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VARA (Virtual Asset Regulatory Authority) compliance ensures that our platform meets UAE regulatory standards for virtual asset operations, providing investor protection and regulatory oversight."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum investment amount?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The minimum investment varies by asset type, but most assets can be invested in with as little as $50. Some premium assets may have higher minimums, typically ranging from $100 to $1,000."
        }
      },
      {
        "@type": "Question",
        "name": "How are my assets protected?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your assets are protected by multiple layers of security including cold storage, multi-signature wallets, comprehensive insurance coverage, and VARA regulatory compliance."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started as an investor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To get started, create an account, complete KYC verification, and fund your account. You can then browse available tokenized assets and make your first investment."
        }
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



