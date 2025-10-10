import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/investors' });

  return {
    ...baseMeta,
    title: 'Investor Access | Secure Tokenized Asset Investment UAE | The Global Edge',
    description: 'Join The Global Edge as an investor. Access tokenized logistics and real estate assets, view documentation, and earn from fractionalized ownership.',
    keywords: 'investor portal UAE, tokenized asset investment, logistics investment, real estate investment, fractional ownership, blockchain investment, RWA investment',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/investors'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Investor Access | Secure Tokenized Asset Investment UAE | The Global Edge',
      description: 'Join The Global Edge as an investor. Access tokenized logistics and real estate assets, view documentation, and earn from fractionalized ownership.',
      url: 'https://theglobaledge.io/investors',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-investors.jpg', width: 1200, height: 630, alt: 'Investor Access | Secure Tokenized Asset Investment UAE | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Investor Access | Secure Tokenized Asset Investment UAE | The Global Edge',
      description: 'Join The Global Edge as an investor. Access tokenized logistics and real estate assets, view documentation, and earn from fractionalized ownership.',
      images: ['https://theglobaledge.io/og-investors.jpg']
    },
  };
}

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Investor Access Portal",
    "description": "Secure tokenized asset investment platform for accessing logistics and real estate assets with fractionalized ownership",
    "url": "https://theglobaledge.io/investors",
    "provider": {
      "@type": "Organization",
      "name": "The Global Edge",
      "url": "https://theglobaledge.io"
    },
    "serviceType": "Financial Services",
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    "offers": {
      "@type": "Offer",
      "name": "Tokenized Asset Investment",
      "description": "Access to tokenized logistics and real estate assets with fractionalized ownership",
      "category": "Investment Services"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Investment Opportunities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Logistics Asset Investment",
            "description": "Tokenized shipping containers and logistics assets"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Real Estate Investment",
            "description": "Tokenized commercial and residential properties"
          }
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



