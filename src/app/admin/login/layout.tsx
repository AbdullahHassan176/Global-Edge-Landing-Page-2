import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin/login' });

  return {
    ...baseMeta,
    title: 'Admin Login | Secure Administrative Access | The Global Edge',
    description: 'Secure administrative login portal for Global Edge platform administrators. Access the admin dashboard with enhanced security.',
    keywords: 'admin login, administrative access, secure login, admin portal, platform administration, secure authentication',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin/login'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Login | Secure Administrative Access | The Global Edge',
      description: 'Secure administrative login portal for Global Edge platform administrators. Access the admin dashboard with enhanced security.',
      url: 'https://theglobaledge.io/admin/login',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-admin-login.jpg', width: 1200, height: 630, alt: 'Admin Login | Secure Administrative Access | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Login | Secure Administrative Access | The Global Edge',
      description: 'Secure administrative login portal for Global Edge platform administrators. Access the admin dashboard with enhanced security.',
      images: ['https://theglobaledge.io/og-admin-login.jpg']
    },
    
  };
}

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Admin Login - Secure Administrative Access",
        "description": "Secure administrative login portal for Global Edge platform administrators. Access the admin dashboard with enhanced security",
        "url": "https://theglobaledge.io/admin/login",
        "mainEntity": {
          "@type": "Article",
          "headline": "Administrative Login Portal",
          "description": "Secure login portal for platform administrators with enhanced security features",
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
          "articleSection": "Administration"
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
              "name": "Login",
              "item": "https://theglobaledge.io/admin/login"
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

