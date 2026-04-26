import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';
import { absoluteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/get-started' });

  return {
    ...baseMeta,
    title: 'Get Started | Join The Global Edge Platform',
    description:
      'Register as an investor or issuer on The Global Edge. Start accessing tokenized assets and participate in the digital asset ecosystem today.',
    keywords:
      'get started, join platform, investor registration, issuer registration, tokenized assets, digital asset ecosystem, platform onboarding, investment registration',
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl('/get-started'),
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Get Started | Join The Global Edge Platform',
      description:
        'Register as an investor or issuer on The Global Edge. Start accessing tokenized assets and participate in the digital asset ecosystem today.',
      url: absoluteUrl('/get-started'),
      type: 'website',
      images: [
        {
          url: absoluteUrl('/og-get-started.jpg'),
          width: 1200,
          height: 630,
          alt: 'Get Started | Join The Global Edge Platform',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Get Started | Join The Global Edge Platform',
      description:
        'Register as an investor or issuer on The Global Edge. Start accessing tokenized assets and participate in the digital asset ecosystem today.',
      images: [absoluteUrl('/og-get-started.jpg')],
    },
  };
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Get Started - Join The Global Edge Platform',
    description:
      'Register as an investor or issuer on The Global Edge. Start accessing tokenized assets and participate in the digital asset ecosystem today.',
    url: absoluteUrl('/get-started'),
    mainEntity: {
      '@type': 'Service',
      name: 'Platform Registration',
      description:
        'Registration service for investors and issuers to join The Global Edge platform',
      provider: {
        '@type': 'Organization',
        name: 'The Global Edge',
        url: absoluteUrl('/'),
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Investor Registration',
          description: 'Register as an investor to access tokenized assets',
        },
        {
          '@type': 'Offer',
          name: 'Issuer Registration',
          description: 'Register as an issuer to tokenize your assets',
        },
      ],
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Get Started',
          item: absoluteUrl('/get-started'),
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
