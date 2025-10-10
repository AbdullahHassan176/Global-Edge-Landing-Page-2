import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/test-portal' });

  return {
    ...baseMeta,
    title: 'Test Portal | Development Testing | The Global Edge',
    description: 'Test portal for development and testing purposes on The Global Edge platform.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/test-portal'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Test Portal | Development Testing | The Global Edge',
      description: 'Test portal for development and testing purposes on The Global Edge platform.',
      url: 'https://theglobaledge.io/test-portal',
      type: 'website'
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Test Portal | Development Testing | The Global Edge',
      description: 'Test portal for development and testing purposes on The Global Edge platform.'
    }
  };
}

export default function TestPortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
