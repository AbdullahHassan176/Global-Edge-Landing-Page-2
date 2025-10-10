import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/activity' });

  return {
    ...baseMeta,
    title: 'Investment Activity | Transaction History | The Global Edge',
    description:
      'Track all your investment activities, transactions, portfolio changes, and real-time updates on The Global Edge platform.',
    keywords:
      'investment activity, transaction history, portfolio tracking, investment timeline, activity feed, real-time updates',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/activity',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Investment Activity | Transaction History | The Global Edge',
      description:
        'Track all your investment activities, transactions, portfolio changes, and real-time updates on The Global Edge platform.',
      url: 'https://theglobaledge.io/activity',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-activity.jpg',
          width: 1200,
          height: 630,
          alt: 'Investment Activity | Transaction History | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Investment Activity | Transaction History | The Global Edge',
      description:
        'Track all your investment activities, transactions, portfolio changes, and real-time updates on The Global Edge platform.',
      images: ['https://theglobaledge.io/og-activity.jpg'],
    },
    other: {
      'script:type:application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Investment Activity - Transaction History',
        description:
          'Track all your investment activities, transactions, portfolio changes, and real-time updates on The Global Edge platform',
        url: 'https://theglobaledge.io/activity',
        mainEntity: {
          '@type': 'Article',
          headline: 'Investment Activity Tracking',
          description:
            'Real-time investment activity and transaction history monitoring',
          author: {
            '@type': 'Person',
            name: 'The Global Edge User',
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Global Edge',
            url: 'https://theglobaledge.io',
          },
          datePublished: '2024-12-20',
          dateModified: '2024-12-20',
          articleSection: 'Investment Tracking',
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
              name: 'Activity',
              item: 'https://theglobaledge.io/activity',
            },
          ],
        },
      }),
    },
  };
}

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
