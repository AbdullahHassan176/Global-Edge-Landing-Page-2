import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({
    path: '/admin/notifications',
  });

  return {
    ...baseMeta,
    title: 'Admin Notifications | Notification Management | The Global Edge',
    description:
      'Notification management dashboard for administrators. Manage system notifications, alerts, and user communications.',
    keywords:
      'admin notifications, notification management, system alerts, user communications, admin dashboard, notification system',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/notifications',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Notifications | Notification Management | The Global Edge',
      description:
        'Notification management dashboard for administrators. Manage system notifications, alerts, and user communications.',
      url: 'https://theglobaledge.io/admin/notifications',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-admin-notifications.jpg',
          width: 1200,
          height: 630,
          alt: 'Admin Notifications | Notification Management | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Notifications | Notification Management | The Global Edge',
      description:
        'Notification management dashboard for administrators. Manage system notifications, alerts, and user communications.',
      images: ['https://theglobaledge.io/og-admin-notifications.jpg'],
    },
  };
}

export default function AdminNotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Admin Notifications - Notification Management',
    description:
      'Notification management dashboard for administrators. Manage system notifications, alerts, and user communications',
    url: 'https://theglobaledge.io/admin/notifications',
    mainEntity: {
      '@type': 'Article',
      headline: 'Notification Management System',
      description:
        'Administrative notification management system for system notifications, alerts, and user communications',
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
      articleSection: 'Notification Management',
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
          name: 'Notifications',
          item: 'https://theglobaledge.io/admin/notifications',
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
