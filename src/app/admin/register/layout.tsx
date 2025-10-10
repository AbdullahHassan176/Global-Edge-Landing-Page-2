import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/register' });

  return {
    ...baseMeta,
    title: 'Admin Registration | Create Admin Account | The Global Edge',
    description:
      'Administrative account registration portal for Global Edge platform. Create new admin accounts with proper authorization.',
    keywords:
      'admin registration, create admin account, administrative access, admin signup, platform administration, admin onboarding',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/register',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Registration | Create Admin Account | The Global Edge',
      description:
        'Administrative account registration portal for Global Edge platform. Create new admin accounts with proper authorization.',
      url: 'https://theglobaledge.io/admin/register',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-admin-register.jpg',
          width: 1200,
          height: 630,
          alt: 'Admin Registration | Create Admin Account | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Registration | Create Admin Account | The Global Edge',
      description:
        'Administrative account registration portal for Global Edge platform. Create new admin accounts with proper authorization.',
      images: ['https://theglobaledge.io/og-admin-register.jpg'],
    },
  };
}

export default function AdminRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Admin Registration - Create Admin Account',
    description:
      'Administrative account registration portal for Global Edge platform. Create new admin accounts with proper authorization',
    url: 'https://theglobaledge.io/admin/register',
    mainEntity: {
      '@type': 'Article',
      headline: 'Administrative Account Registration',
      description:
        'Registration portal for creating new administrative accounts with proper authorization',
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
          name: 'Register',
          item: 'https://theglobaledge.io/admin/register',
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
