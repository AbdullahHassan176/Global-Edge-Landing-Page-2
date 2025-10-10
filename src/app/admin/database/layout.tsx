import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/database' });

  return {
    ...baseMeta,
    title: 'Admin Database Management | Database Monitoring | The Global Edge',
    description:
      'Database management and monitoring dashboard for administrators. Monitor Azure Cosmos DB connections and performance.',
    keywords:
      'admin database management, database monitoring, Azure Cosmos DB, database administration, system monitoring, admin tools',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/database',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title:
        'Admin Database Management | Database Monitoring | The Global Edge',
      description:
        'Database management and monitoring dashboard for administrators. Monitor Azure Cosmos DB connections and performance.',
      url: 'https://theglobaledge.io/admin/database',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-admin-database.jpg',
          width: 1200,
          height: 630,
          alt: 'Admin Database Management | Database Monitoring | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title:
        'Admin Database Management | Database Monitoring | The Global Edge',
      description:
        'Database management and monitoring dashboard for administrators. Monitor Azure Cosmos DB connections and performance.',
      images: ['https://theglobaledge.io/og-admin-database.jpg'],
    },
  };
}

export default function AdminDatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Admin Database Management - Database Monitoring',
    description:
      'Database management and monitoring dashboard for administrators. Monitor Azure Cosmos DB connections and performance',
    url: 'https://theglobaledge.io/admin/database',
    mainEntity: {
      '@type': 'Article',
      headline: 'Database Management and Monitoring System',
      description:
        'Administrative database management and monitoring system for Azure Cosmos DB connections and performance',
      author: {
        '@type': 'Organization',
        name: 'The Global Edge Admin Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Global Edge',
        url: 'https://theglobaledge.io',
      },
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
      articleSection: 'Database Management',
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
          name: 'Admin',
          item: 'https://theglobaledge.io/admin',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Database Management',
          item: 'https://theglobaledge.io/admin/database',
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
