import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/users' });

  return {
    ...baseMeta,
    title: 'Admin User Management | User Administration | The Global Edge',
    description: 'User management dashboard for administrators. Manage user accounts, permissions, and access controls across the platform.',
    keywords: 'admin user management, user administration, user accounts, access control, user permissions, admin dashboard, user oversight',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/users'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin User Management | User Administration | The Global Edge',
      description: 'User management dashboard for administrators. Manage user accounts, permissions, and access controls across the platform.',
      url: 'https://theglobaledge.io/admin/users',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-admin-users.jpg', width: 1200, height: 630, alt: 'Admin User Management | User Administration | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin User Management | User Administration | The Global Edge',
      description: 'User management dashboard for administrators. Manage user accounts, permissions, and access controls across the platform.',
      images: ['https://theglobaledge.io/og-admin-users.jpg']
    },
    
  };
}

export default function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Admin User Management - User Administration",
        "description": "User management dashboard for administrators. Manage user accounts, permissions, and access controls across the platform",
        "url": "https://theglobaledge.io/admin/users",
        "mainEntity": {
          "@type": "Article",
          "headline": "User Management and Administration System",
          "description": "Administrative user management system for managing user accounts, permissions, and access controls across the platform",
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
          "articleSection": "User Management"
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
              "name": "Users",
              "item": "https://theglobaledge.io/admin/users"
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

