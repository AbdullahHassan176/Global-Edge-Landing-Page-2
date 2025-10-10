import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/settings' });

  return {
    ...baseMeta,
    title: 'Account Settings | Security & Preferences | The Global Edge',
    description: 'Manage your account settings, security preferences, notification settings, and investment preferences on The Global Edge platform.',
    keywords: 'account settings, security settings, notification preferences, investment preferences, user preferences, account management',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/settings'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Account Settings | Security & Preferences | The Global Edge',
      description: 'Manage your account settings, security preferences, notification settings, and investment preferences on The Global Edge platform.',
      url: 'https://theglobaledge.io/settings',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-settings.jpg', width: 1200, height: 630, alt: 'Account Settings | Security & Preferences | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Account Settings | Security & Preferences | The Global Edge',
      description: 'Manage your account settings, security preferences, notification settings, and investment preferences on The Global Edge platform.',
      images: ['https://theglobaledge.io/og-settings.jpg']
    },
    
  };
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Account Settings - Security & Preferences",
        "description": "Manage your account settings, security preferences, notification settings, and investment preferences on The Global Edge platform",
        "url": "https://theglobaledge.io/settings",
        "mainEntity": {
          "@type": "Article",
          "headline": "Account Settings Management",
          "description": "Comprehensive account settings and preferences management",
          "author": {
            "@type": "Person",
            "name": "The Global Edge User"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-12-20",
          "dateModified": "2024-12-20",
          "articleSection": "Account Management"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://theglobaledge.io"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Settings",
              "item": "https://theglobaledge.io/settings"
            }
          ]
        }
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}



