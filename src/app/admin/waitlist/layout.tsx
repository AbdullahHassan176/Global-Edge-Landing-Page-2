import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/waitlist' });

  return {
    ...baseMeta,
    title:
      'Admin Waitlist Management | Waitlist Administration | The Global Edge',
    description:
      'Waitlist management dashboard for administrators. Manage user waitlists, invitations, and access approvals.',
    keywords:
      'admin waitlist management, waitlist administration, user waitlists, invitation management, access approval, admin dashboard',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/waitlist',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title:
        'Admin Waitlist Management | Waitlist Administration | The Global Edge',
      description:
        'Waitlist management dashboard for administrators. Manage user waitlists, invitations, and access approvals.',
      url: 'https://theglobaledge.io/admin/waitlist',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-admin-waitlist.jpg',
          width: 1200,
          height: 630,
          alt: 'Admin Waitlist Management | Waitlist Administration | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title:
        'Admin Waitlist Management | Waitlist Administration | The Global Edge',
      description:
        'Waitlist management dashboard for administrators. Manage user waitlists, invitations, and access approvals.',
      images: ['https://theglobaledge.io/og-admin-waitlist.jpg'],
    },
  };
}

export default function AdminWaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Admin Waitlist Management - Waitlist Administration',
    description:
      'Waitlist management dashboard for administrators. Manage user waitlists, invitations, and access approvals',
    url: 'https://theglobaledge.io/admin/waitlist',
    mainEntity: {
      '@type': 'Article',
      headline: 'Waitlist Management and Administration System',
      description:
        'Administrative waitlist management system for managing user waitlists, invitations, and access approvals',
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
      articleSection: 'Waitlist Management',
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
          name: 'Waitlist',
          item: 'https://theglobaledge.io/admin/waitlist',
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
