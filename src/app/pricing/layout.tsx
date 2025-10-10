import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/pricing' });

  return {
    ...baseMeta,
    title: 'Pricing | Tokenization Platform Fees | The Global Edge',
    description: 'Transparent pricing for tokenization services — from asset onboarding to investor management. See how The Global Edge structures its fees.',
    keywords: 'tokenization platform fees, asset onboarding pricing, investor management fees, RWA tokenization costs, blockchain platform pricing, tokenization services pricing',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/pricing'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Pricing | Tokenization Platform Fees | The Global Edge',
      description: 'Transparent pricing for tokenization services — from asset onboarding to investor management. See how The Global Edge structures its fees.',
      url: 'https://theglobaledge.io/pricing',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-pricing.jpg', width: 1200, height: 630, alt: 'Pricing | Tokenization Platform Fees | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Pricing | Tokenization Platform Fees | The Global Edge',
      description: 'Transparent pricing for tokenization services — from asset onboarding to investor management. See how The Global Edge structures its fees.',
      images: ['https://theglobaledge.io/og-pricing.jpg']
    },
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "The Global Edge Tokenization Platform",
    "description": "Transparent pricing for tokenization services — from asset onboarding to investor management",
    "url": "https://theglobaledge.io/pricing",
    "category": "Financial Services",
    "brand": {
      "@type": "Brand",
      "name": "The Global Edge"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Plan",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free plan for individual investors with basic tokenization features"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "29",
        "priceCurrency": "USD",
        "description": "Advanced features for serious investors with enhanced tokenization capabilities"
      },
      {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "price": "Custom",
        "priceCurrency": "USD",
        "description": "Custom solutions for institutions with full tokenization platform access"
      }
    ],
    "provider": {
      "@type": "Organization",
      "name": "The Global Edge",
      "url": "https://theglobaledge.io"
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



