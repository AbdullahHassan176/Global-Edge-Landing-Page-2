import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/security' });

  return {
    ...baseMeta,
    title: 'Admin Security | Security Management | The Global Edge',
    description:
      'Security management dashboard for administrators. Monitor security events, manage access controls, and configure security settings.',
    keywords:
      'admin security, security management, access control, security monitoring, admin dashboard, security settings, platform security',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/security',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Security | Security Management | The Global Edge',
      description:
        'Security management dashboard for administrators. Monitor security events, manage access controls, and configure security settings.',
      url: 'https://theglobaledge.io/admin/security',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-admin-security.jpg',
          width: 1200,
          height: 630,
          alt: 'Admin Security | Security Management | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Security | Security Management | The Global Edge',
      description:
        'Security management dashboard for administrators. Monitor security events, manage access controls, and configure security settings.',
      images: ['https://theglobaledge.io/og-admin-security.jpg'],
    },
  };
}

export default function AdminSecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Admin Security - Security Management',
    description:
      'Security management dashboard for administrators. Monitor security events, manage access controls, and configure security settings',
    url: 'https://theglobaledge.io/admin/security',
    mainEntity: {
      '@type': 'Article',
      headline: 'Security Management System',
      description:
        'Administrative security management system for monitoring security events, managing access controls, and configuring security settings',
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
      articleSection: 'Security Management',
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
          name: 'Security',
          item: 'https://theglobaledge.io/admin/security',
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
