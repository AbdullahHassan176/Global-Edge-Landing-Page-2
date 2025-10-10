import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/terms' });

  return {
    ...baseMeta,
    title: 'Terms & Conditions | The Global Edge UAE',
    description:
      'Review the terms governing your use of The Global Edge platform and tokenization services.',
    keywords:
      'terms and conditions, Global Edge UAE, platform terms, tokenization services, user agreement, legal terms, platform governance, service terms',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/terms',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Terms & Conditions | The Global Edge UAE',
      description:
        'Review the terms governing your use of The Global Edge platform and tokenization services.',
      url: 'https://theglobaledge.io/terms',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-terms.jpg',
          width: 1200,
          height: 630,
          alt: 'Terms & Conditions | The Global Edge UAE',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Terms & Conditions | The Global Edge UAE',
      description:
        'Review the terms governing your use of The Global Edge platform and tokenization services.',
      images: ['https://theglobaledge.io/og-terms.jpg'],
    },
  };
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms & Conditions - The Global Edge UAE',
    description:
      'Review the terms governing your use of The Global Edge platform and tokenization services',
    url: 'https://theglobaledge.io/terms',
    mainEntity: {
      '@type': 'Article',
      headline: 'Terms & Conditions',
      description:
        'Your agreement with The Global Edge platform and tokenization services',
      author: {
        '@type': 'Organization',
        name: 'The Global Edge Legal Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Global Edge',
        url: 'https://theglobaledge.io',
      },
      datePublished: '2024-12-20',
      dateModified: '2024-12-20',
      articleSection: 'Legal Terms',
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
          name: 'Terms & Conditions',
          item: 'https://theglobaledge.io/terms',
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
