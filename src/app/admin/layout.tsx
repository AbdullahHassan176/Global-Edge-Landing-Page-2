import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/admin' });

  return {
    ...baseMeta,
    title: 'Admin Dashboard | Platform Management | The Global Edge',
    description: 'Administrative dashboard for managing users, assets, notifications, and platform operations on The Global Edge tokenization platform.',
    keywords: 'admin dashboard, platform management, user management, asset management, notifications, system administration, admin portal',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/admin'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Admin Dashboard | Platform Management | The Global Edge',
      description: 'Administrative dashboard for managing users, assets, notifications, and platform operations on The Global Edge tokenization platform.',
      url: 'https://theglobaledge.io/admin',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-admin.jpg', width: 1200, height: 630, alt: 'Admin Dashboard | Platform Management | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Admin Dashboard | Platform Management | The Global Edge',
      description: 'Administrative dashboard for managing users, assets, notifications, and platform operations on The Global Edge tokenization platform.',
      images: ['https://theglobaledge.io/og-admin.jpg']
    },
  };
}

export default function AdminSectionLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "The Global Edge Admin Dashboard",
    "description": "Administrative dashboard for managing users, assets, notifications, and platform operations on The Global Edge tokenization platform",
    "url": "https://theglobaledge.io/admin",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "name": "Platform Administration",
      "description": "Comprehensive administrative tools for platform management"
    },
    "featureList": [
      "User Management",
      "Asset Management",
      "Notification System",
      "Analytics Dashboard",
      "Security Monitoring",
      "Content Management",
      "System Settings"
    ],
    "provider": {
      "@type": "Organization",
      "name": "The Global Edge",
      "url": "https://theglobaledge.io"
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



