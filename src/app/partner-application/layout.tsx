import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({
    path: '/partner-application',
  });

  return {
    ...baseMeta,
    title: 'Partner Application | Join Our Ecosystem | The Global Edge',
    description:
      'Apply to become a partner with The Global Edge. Join our ecosystem of leading companies and unlock new opportunities in asset tokenization.',
    keywords:
      'partner application, business partnership, asset tokenization partnership, VARA compliance, tokenization platform, business collaboration, strategic partnership',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/partner-application',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Partner Application | Join Our Ecosystem | The Global Edge',
      description:
        'Apply to become a partner with The Global Edge. Join our ecosystem of leading companies and unlock new opportunities in asset tokenization.',
      url: 'https://theglobaledge.io/partner-application',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-partner-application.jpg',
          width: 1200,
          height: 630,
          alt: 'Partner Application | Join Our Ecosystem | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Partner Application | Join Our Ecosystem | The Global Edge',
      description:
        'Apply to become a partner with The Global Edge. Join our ecosystem of leading companies and unlock new opportunities in asset tokenization.',
      images: ['https://theglobaledge.io/og-partner-application.jpg'],
    },
  };
}

export default function PartnerApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Partner Application - Join Our Ecosystem',
    description:
      'Apply to become a partner with The Global Edge. Join our ecosystem of leading companies and unlock new opportunities in asset tokenization',
    url: 'https://theglobaledge.io/partner-application',
    mainEntity: {
      '@type': 'Article',
      headline: 'Partner Application Form',
      description:
        'Application form for companies interested in partnering with The Global Edge for asset tokenization services',
      author: {
        '@type': 'Organization',
        name: 'The Global Edge Partnership Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Global Edge',
        url: 'https://theglobaledge.io',
      },
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
      articleSection: 'Partnership',
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
          name: 'Partners',
          item: 'https://theglobaledge.io/partners',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Partner Application',
          item: 'https://theglobaledge.io/partner-application',
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
