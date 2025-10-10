import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/privacy' });

  return {
    ...baseMeta,
    title: 'Privacy Policy | Data Protection | The Global Edge',
    description: 'Learn how The Global Edge collects, stores, and uses your personal data in accordance with UAE data protection regulations.',
    keywords: 'privacy policy, data protection, personal data, UAE data protection, data collection, data storage, data usage, privacy rights, data security',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/privacy'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Privacy Policy | Data Protection | The Global Edge',
      description: 'Learn how The Global Edge collects, stores, and uses your personal data in accordance with UAE data protection regulations.',
      url: 'https://theglobaledge.io/privacy',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-privacy.jpg', width: 1200, height: 630, alt: 'Privacy Policy | Data Protection | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Privacy Policy | Data Protection | The Global Edge',
      description: 'Learn how The Global Edge collects, stores, and uses your personal data in accordance with UAE data protection regulations.',
      images: ['https://theglobaledge.io/og-privacy.jpg']
    },
    
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy - Data Protection",
        "description": "Learn how The Global Edge collects, stores, and uses your personal data in accordance with UAE data protection regulations",
        "url": "https://theglobaledge.io/privacy",
        "mainEntity": {
          "@type": "Article",
          "headline": "Privacy Policy",
          "description": "Protecting your personal information in accordance with UAE data protection regulations",
          "author": {
            "@type": "Organization",
            "name": "The Global Edge Privacy Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-12-20",
          "dateModified": "2024-12-20",
          "articleSection": "Privacy & Data Protection"
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
              "name": "Privacy Policy",
              "item": "https://theglobaledge.io/privacy"
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



