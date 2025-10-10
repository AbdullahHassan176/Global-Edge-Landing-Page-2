import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/risk-disclosures' });

  return {
    ...baseMeta,
    title: 'Risk Disclosures | Investment Risk Awareness | The Global Edge',
    description:
      'Understand the risks associated with tokenized asset investments. The Global Edge promotes transparency and investor education.',
    keywords:
      'risk disclosures, investment risk awareness, tokenized asset risks, investment transparency, investor education, risk management, investment warnings',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/risk-disclosures',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Risk Disclosures | Investment Risk Awareness | The Global Edge',
      description:
        'Understand the risks associated with tokenized asset investments. The Global Edge promotes transparency and investor education.',
      url: 'https://theglobaledge.io/risk-disclosures',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-risk-disclosures.jpg',
          width: 1200,
          height: 630,
          alt: 'Risk Disclosures | Investment Risk Awareness | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Risk Disclosures | Investment Risk Awareness | The Global Edge',
      description:
        'Understand the risks associated with tokenized asset investments. The Global Edge promotes transparency and investor education.',
      images: ['https://theglobaledge.io/og-risk-disclosures.jpg'],
    },
  };
}

export default function RiskDisclosuresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Risk Disclosures - Investment Risk Awareness',
    description:
      'Understand the risks associated with tokenized asset investments. The Global Edge promotes transparency and investor education',
    url: 'https://theglobaledge.io/risk-disclosures',
    mainEntity: {
      '@type': 'Article',
      headline: 'Investment Risk Disclosure',
      description:
        'Comprehensive risk disclosures for tokenized asset investments',
      author: {
        '@type': 'Organization',
        name: 'The Global Edge Risk Management Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Global Edge',
        url: 'https://theglobaledge.io',
      },
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
      articleSection: 'Risk Management',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://theglobaledge.io',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Risk Disclosures',
          item: 'https://theglobaledge.io/risk-disclosures',
        },
      ],
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
