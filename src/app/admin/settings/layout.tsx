import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/settings' });

  return {
    ...baseMeta,
    title: 'Admin Settings | Platform Configuration | The Global Edge',
    description:
      'Administrative settings and platform configuration dashboard. Manage system settings, preferences, and platform configurations.',
    keywords:
      'admin settings, platform configuration, system settings, admin preferences, platform management, configuration dashboard',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/settings',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Settings | Platform Configuration | The Global Edge',
      description:
        'Administrative settings and platform configuration dashboard. Manage system settings, preferences, and platform configurations.',
      url: 'https://theglobaledge.io/admin/settings',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-admin-settings.jpg',
          width: 1200,
          height: 630,
          alt: 'Admin Settings | Platform Configuration | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Settings | Platform Configuration | The Global Edge',
      description:
        'Administrative settings and platform configuration dashboard. Manage system settings, preferences, and platform configurations.',
      images: ['https://theglobaledge.io/og-admin-settings.jpg'],
    },
  };
}

export default function AdminSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Admin Settings - Platform Configuration',
    description:
      'Administrative settings and platform configuration dashboard. Manage system settings, preferences, and platform configurations',
    url: 'https://theglobaledge.io/admin/settings',
    mainEntity: {
      '@type': 'Article',
      headline: 'Administrative Settings and Configuration',
      description:
        'Administrative settings and platform configuration system for managing system settings, preferences, and platform configurations',
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
      articleSection: 'Administration',
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
          name: 'Settings',
          item: 'https://theglobaledge.io/admin/settings',
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
