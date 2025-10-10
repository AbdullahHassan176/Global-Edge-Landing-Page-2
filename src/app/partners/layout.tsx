import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/partners' });

  return {
    ...baseMeta,
    title: 'Our Partners | Institutional Alliances | The Global Edge',
    description:
      'Discover our ecosystem partners — logistics operators, asset managers, and technology providers enabling secure tokenization infrastructure in the UAE.',
    keywords:
      'partners UAE, institutional alliances, logistics partners, asset managers, technology providers, tokenization infrastructure, blockchain partners, RWA partners',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/partners',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Our Partners | Institutional Alliances | The Global Edge',
      description:
        'Discover our ecosystem partners — logistics operators, asset managers, and technology providers enabling secure tokenization infrastructure in the UAE.',
      url: 'https://theglobaledge.io/partners',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-partners.jpg',
          width: 1200,
          height: 630,
          alt: 'Our Partners | Institutional Alliances | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Our Partners | Institutional Alliances | The Global Edge',
      description:
        'Discover our ecosystem partners — logistics operators, asset managers, and technology providers enabling secure tokenization infrastructure in the UAE.',
      images: ['https://theglobaledge.io/og-partners.jpg'],
    },
  };
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Global Edge Partners',
    description:
      'Ecosystem partners including logistics operators, asset managers, and technology providers enabling secure tokenization infrastructure in the UAE',
    url: 'https://theglobaledge.io/partners',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
    },
    hasPart: [
      {
        '@type': 'Organization',
        name: 'Logistics Partners',
        description:
          'Leading shipping and logistics companies enabling asset tokenization',
      },
      {
        '@type': 'Organization',
        name: 'Financial Partners',
        description:
          'Banking and financial service providers supporting tokenized assets',
      },
      {
        '@type': 'Organization',
        name: 'Technology Partners',
        description: 'Blockchain and oracle infrastructure providers',
      },
      {
        '@type': 'Organization',
        name: 'Legal & Compliance Partners',
        description:
          'Legal and regulatory compliance partners ensuring VARA compliance',
      },
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'The Global Edge',
      url: 'https://theglobaledge.io',
    },
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
