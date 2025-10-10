import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/dashboard' });

  return {
    ...baseMeta,
    title: 'Dashboard | Asset Management & Investor Portal | The Global Edge',
    description:
      'Access your investor dashboard — monitor tokenized assets, portfolio performance, and compliance documentation on The Global Edge platform.',
    keywords:
      'investor dashboard, asset management, portfolio tracking, tokenized assets, investment portal, compliance documentation, RWA dashboard',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/dashboard',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Dashboard | Asset Management & Investor Portal | The Global Edge',
      description:
        'Access your investor dashboard — monitor tokenized assets, portfolio performance, and compliance documentation on The Global Edge platform.',
      url: 'https://theglobaledge.io/dashboard',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-dashboard.jpg',
          width: 1200,
          height: 630,
          alt: 'Dashboard | Asset Management & Investor Portal | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Dashboard | Asset Management & Investor Portal | The Global Edge',
      description:
        'Access your investor dashboard — monitor tokenized assets, portfolio performance, and compliance documentation on The Global Edge platform.',
      images: ['https://theglobaledge.io/og-dashboard.jpg'],
    },
  };
}

export default function DashboardSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'The Global Edge Dashboard',
    description:
      'Asset management and investor portal for monitoring tokenized assets, portfolio performance, and compliance documentation',
    url: 'https://theglobaledge.io/dashboard',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      name: 'Asset Management Dashboard',
      description:
        'Monitor tokenized assets, portfolio performance, and compliance documentation',
    },
    featureList: [
      'Portfolio Analytics',
      'Investment Tracking',
      'Asset Management',
      'Compliance Documentation',
      'Performance Monitoring',
      'Transaction History',
    ],
    provider: {
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
