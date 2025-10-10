import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/issuer/assets' });

  return {
    ...baseMeta,
    title: 'Asset Management | Issuer Portal | The Global Edge',
    description: 'Manage your tokenized assets, create new assets, and oversee your investment portfolio on The Global Edge platform.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/issuer/assets'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Asset Management | Issuer Portal | The Global Edge',
      description: 'Manage your tokenized assets, create new assets, and oversee your investment portfolio on The Global Edge platform.',
      url: 'https://theglobaledge.io/issuer/assets',
      type: 'website'
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Asset Management | Issuer Portal | The Global Edge',
      description: 'Manage your tokenized assets, create new assets, and oversee your investment portfolio on The Global Edge platform.'
    }
  };
}

export default function IssuerAssetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
