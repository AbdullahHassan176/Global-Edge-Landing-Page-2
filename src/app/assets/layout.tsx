import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/assets' });

  return {
    ...baseMeta,
    title:
      'Asset programs | Trade & logistics pilots | The Global Edge',
    description:
      'Programs and pilots for Africa–UAE trade-backed issuance. Tokenized offerings will appear here as VARA-aligned instruments go live—not before.',
    keywords:
      'RWA, trade finance, FMCG tokenization, VARA, UAE digital assets, shipping inventory, pilot issuance',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/assets',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title:
        'Asset programs | Trade & logistics pilots | The Global Edge',
      description:
        'Programs and pilots for Africa–UAE trade-backed issuance. Listings update as instruments are issued.',
      url: 'https://theglobaledge.io/assets',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-assets.jpg',
          width: 1200,
          height: 630,
          alt: 'The Global Edge asset programs',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title:
        'Asset programs | Trade & logistics pilots | The Global Edge',
      description:
        'Programs and pilots for Africa–UAE trade-backed issuance. Listings update as instruments are issued.',
      images: ['https://theglobaledge.io/og-assets.jpg'],
    },
  };
}

export default function AssetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'The Global Edge — asset programs',
    description:
      'Early-stage issuer platform for Africa–UAE FMCG trade. One live cargo lane; first tokenization in development. No public tokenized AUM is claimed until offerings close and list.',
    url: 'https://theglobaledge.io/assets',
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
