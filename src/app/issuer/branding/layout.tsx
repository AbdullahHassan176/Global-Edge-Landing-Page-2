import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/issuer/branding' });

  return {
    ...baseMeta,
    title: 'Branding & Customization | Issuer Portal | The Global Edge',
    description: 'Customize your branding and appearance on The Global Edge platform. Manage your issuer profile and visual identity.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/issuer/branding'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Branding & Customization | Issuer Portal | The Global Edge',
      description: 'Customize your branding and appearance on The Global Edge platform. Manage your issuer profile and visual identity.',
      url: 'https://theglobaledge.io/issuer/branding',
      type: 'website'
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Branding & Customization | Issuer Portal | The Global Edge',
      description: 'Customize your branding and appearance on The Global Edge platform. Manage your issuer profile and visual identity.'
    }
  };
}

export default function IssuerBrandingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
