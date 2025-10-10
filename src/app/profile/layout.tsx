import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/profile' });

  return {
    ...baseMeta,
    title: 'My Profile | Account Management | The Global Edge',
    description: 'Manage your personal information, investment preferences, and account settings on The Global Edge platform.',
    keywords: 'user profile, account management, personal information, investment preferences, account settings, user dashboard',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/profile'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'My Profile | Account Management | The Global Edge',
      description: 'Manage your personal information, investment preferences, and account settings on The Global Edge platform.',
      url: 'https://theglobaledge.io/profile',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-profile.jpg', width: 1200, height: 630, alt: 'My Profile | Account Management | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'My Profile | Account Management | The Global Edge',
      description: 'Manage your personal information, investment preferences, and account settings on The Global Edge platform.',
      images: ['https://theglobaledge.io/og-profile.jpg']
    },
    
  };
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "My Profile - Account Management",
        "description": "Manage your personal information, investment preferences, and account settings on The Global Edge platform",
        "url": "https://theglobaledge.io/profile",
        "mainEntity": {
          "@type": "Article",
          "headline": "User Profile Management",
          "description": "Personal account management and investment profile settings",
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
              "name": "Profile",
              "item": "https://theglobaledge.io/profile"
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



