import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/test-issuer' });

  return {
    ...baseMeta,
    title: 'Test Issuer Portal | Development Testing | The Global Edge',
    description: 'Test issuer portal for development and testing purposes on The Global Edge platform.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/test-issuer'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Test Issuer Portal | Development Testing | The Global Edge',
      description: 'Test issuer portal for development and testing purposes on The Global Edge platform.',
      url: 'https://theglobaledge.io/test-issuer',
      type: 'website'
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Test Issuer Portal | Development Testing | The Global Edge',
      description: 'Test issuer portal for development and testing purposes on The Global Edge platform.'
    }
  };
}

export default function TestIssuerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
