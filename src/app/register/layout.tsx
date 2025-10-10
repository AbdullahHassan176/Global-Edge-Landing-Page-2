import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/register' });

  return {
    ...baseMeta,
    title: 'Register | Create Your Account | The Global Edge',
    description:
      'Create a Global Edge account to access tokenized asset investments, real-time dashboards, and blockchain-secured documentation.',
    keywords:
      'register, create account, Global Edge, tokenized asset investments, real-time dashboards, blockchain documentation, account creation, user registration',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/register',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Register | Create Your Account | The Global Edge',
      description:
        'Create a Global Edge account to access tokenized asset investments, real-time dashboards, and blockchain-secured documentation.',
      url: 'https://theglobaledge.io/register',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-register.jpg',
          width: 1200,
          height: 630,
          alt: 'Register | Create Your Account | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Register | Create Your Account | The Global Edge',
      description:
        'Create a Global Edge account to access tokenized asset investments, real-time dashboards, and blockchain-secured documentation.',
      images: ['https://theglobaledge.io/og-register.jpg'],
    },
  };
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Register - Create Your Account',
    description:
      'Create a Global Edge account to access tokenized asset investments, real-time dashboards, and blockchain-secured documentation',
    url: 'https://theglobaledge.io/register',
    mainEntity: {
      '@type': 'Article',
      headline: 'Create Your Account',
      description: 'Join The Global Edge and access tokenized investments',
      author: {
        '@type': 'Organization',
        name: 'The Global Edge Registration Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Global Edge',
        url: 'https://theglobaledge.io',
      },
      datePublished: '2024-12-20',
      dateModified: '2024-12-20',
      articleSection: 'User Registration',
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
          name: 'Register',
          item: 'https://theglobaledge.io/register',
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
