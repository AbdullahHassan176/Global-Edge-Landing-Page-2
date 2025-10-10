import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/login' });

  return {
    ...baseMeta,
    title: 'Login | Secure Access to The Global Edge Platform',
    description:
      'Sign in to your Global Edge account to access tokenized asset dashboards, investor tools, and portfolio insights.',
    keywords:
      'login, secure access, Global Edge platform, tokenized asset dashboard, investor tools, portfolio insights, user authentication',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/login',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Login | Secure Access to The Global Edge Platform',
      description:
        'Sign in to your Global Edge account to access tokenized asset dashboards, investor tools, and portfolio insights.',
      url: 'https://theglobaledge.io/login',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-login.jpg',
          width: 1200,
          height: 630,
          alt: 'Login | Secure Access to The Global Edge Platform',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Login | Secure Access to The Global Edge Platform',
      description:
        'Sign in to your Global Edge account to access tokenized asset dashboards, investor tools, and portfolio insights.',
      images: ['https://theglobaledge.io/og-login.jpg'],
    },
  };
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Login - Secure Access to The Global Edge Platform',
    description:
      'Sign in to your Global Edge account to access tokenized asset dashboards, investor tools, and portfolio insights',
    url: 'https://theglobaledge.io/login',
    mainEntity: {
      '@type': 'Article',
      headline: 'Login to The Global Edge',
      description: 'Access your tokenized asset dashboard securely',
      author: {
        '@type': 'Organization',
        name: 'The Global Edge Security Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Global Edge',
        url: 'https://theglobaledge.io',
      },
      datePublished: '2024-12-20',
      dateModified: '2024-12-20',
      articleSection: 'User Authentication',
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
          name: 'Login',
          item: 'https://theglobaledge.io/login',
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
