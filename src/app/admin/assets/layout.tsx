import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/assets' });

  return {
    ...baseMeta,
    title: 'Admin Asset Management | Asset Approval | The Global Edge',
    description: 'Administrative asset management dashboard. Review, approve, and manage tokenized assets across the platform.',
    keywords: 'admin asset management, asset approval, tokenized assets, asset review, platform administration, asset oversight',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/assets'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Asset Management | Asset Approval | The Global Edge',
      description: 'Administrative asset management dashboard. Review, approve, and manage tokenized assets across the platform.',
      url: 'https://theglobaledge.io/admin/assets',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-admin-assets.jpg', width: 1200, height: 630, alt: 'Admin Asset Management | Asset Approval | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Asset Management | Asset Approval | The Global Edge',
      description: 'Administrative asset management dashboard. Review, approve, and manage tokenized assets across the platform.',
      images: ['https://theglobaledge.io/og-admin-assets.jpg']
    },
  };
}

export default function AdminAssetsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Admin Asset Management - Asset Approval",
    "description": "Administrative asset management dashboard. Review, approve, and manage tokenized assets across the platform",
    "url": "https://theglobaledge.io/admin/assets",
    "mainEntity": {
      "@type": "Article",
      "headline": "Administrative Asset Management System",
      "description": "Comprehensive asset management and approval system for platform administrators",
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
      "articleSection": "Asset Management"
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
          "name": "Assets",
          "item": "https://theglobaledge.io/admin/assets"
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

