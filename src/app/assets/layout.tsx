import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/assets' });

  return {
    ...baseMeta,
    title: 'Tokenized Assets | Container & Real Estate Tokens | The Global Edge',
    description: 'Explore tokenized real-world assets — from shipping containers to real estate — listed and managed through Global Marketplace and secured on-chain by Global Insights.',
    keywords: 'tokenized assets, container tokens, real estate tokens, shipping container investment, property tokenization, blockchain assets, RWA tokens, digital assets',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/assets'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Tokenized Assets | Container & Real Estate Tokens | The Global Edge',
      description: 'Explore tokenized real-world assets — from shipping containers to real estate — listed and managed through Global Marketplace and secured on-chain by Global Insights.',
      url: 'https://theglobaledge.io/assets',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-assets.jpg', width: 1200, height: 630, alt: 'Tokenized Assets | Container & Real Estate Tokens | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Tokenized Assets | Container & Real Estate Tokens | The Global Edge',
      description: 'Explore tokenized real-world assets — from shipping containers to real estate — listed and managed through Global Marketplace and secured on-chain by Global Insights.',
      images: ['https://theglobaledge.io/og-assets.jpg']
    },
  };
}

export default function AssetsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Tokenized Real-World Assets",
    "description": "Explore tokenized real-world assets — from shipping containers to real estate — listed and managed through Global Marketplace and secured on-chain by Global Insights",
    "url": "https://theglobaledge.io/assets",
    "numberOfItems": 526,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "FinancialProduct",
          "name": "Container Assets",
          "description": "Shipping container assets with competitive APR returns",
          "category": "container",
          "offers": {
            "@type": "Offer",
            "price": "50000",
            "priceCurrency": "USD"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "FinancialProduct",
          "name": "Property Assets",
          "description": "Real estate property assets with rental income streams",
          "category": "property",
          "offers": {
            "@type": "Offer",
            "price": "250000",
            "priceCurrency": "USD"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "FinancialProduct",
          "name": "TradeToken Assets",
          "description": "Trade inventory tokens with supply chain returns",
          "category": "inventory",
          "offers": {
            "@type": "Offer",
            "price": "100000",
            "priceCurrency": "USD"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "FinancialProduct",
          "name": "Vault Assets",
          "description": "Secure vault storage assets with insurance protection",
          "category": "vault",
          "offers": {
            "@type": "Offer",
            "price": "75000",
            "priceCurrency": "USD"
          }
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



