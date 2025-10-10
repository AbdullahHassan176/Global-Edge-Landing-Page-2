import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/content' });

  return {
    ...baseMeta,
    title: 'Admin Content Management | CMS Dashboard | The Global Edge',
    description: 'Comprehensive content management system for administrators. Manage website content, assets, and marketing materials.',
    keywords: 'admin content management, CMS dashboard, content management system, website content, marketing materials, admin tools',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/content'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Content Management | CMS Dashboard | The Global Edge',
      description: 'Comprehensive content management system for administrators. Manage website content, assets, and marketing materials.',
      url: 'https://theglobaledge.io/admin/content',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-admin-content.jpg', width: 1200, height: 630, alt: 'Admin Content Management | CMS Dashboard | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Content Management | CMS Dashboard | The Global Edge',
      description: 'Comprehensive content management system for administrators. Manage website content, assets, and marketing materials.',
      images: ['https://theglobaledge.io/og-admin-content.jpg']
    },
    
  };
}

export default function AdminContentLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Admin Content Management - CMS Dashboard",
        "description": "Comprehensive content management system for administrators. Manage website content, assets, and marketing materials",
        "url": "https://theglobaledge.io/admin/content",
        "mainEntity": {
          "@type": "Article",
          "headline": "Content Management System Dashboard",
          "description": "Administrative content management system for website content, assets, and marketing materials",
          "author": {
            "@type": "Organization",
            "name": "The Global Edge Admin Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-01-01",
          "dateModified": "2024-01-01",
          "articleSection": "Content Management"
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
              "name": "Admin",
              "item": "https://theglobaledge.io/admin"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Content Management",
              "item": "https://theglobaledge.io/admin/content"
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

