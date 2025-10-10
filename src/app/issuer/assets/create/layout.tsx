import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({
    path: '/issuer/assets/create',
  });

  return {
    ...baseMeta,
    title: 'Create New Asset | Tokenization | The Global Edge',
    description:
      'Create and tokenize new assets on The Global Edge platform. Follow our step-by-step process to tokenize your real-world assets.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/issuer/assets/create',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Create New Asset | Tokenization | The Global Edge',
      description:
        'Create and tokenize new assets on The Global Edge platform. Follow our step-by-step process to tokenize your real-world assets.',
      url: 'https://theglobaledge.io/issuer/assets/create',
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Create New Asset | Tokenization | The Global Edge',
      description:
        'Create and tokenize new assets on The Global Edge platform. Follow our step-by-step process to tokenize your real-world assets.',
    },
  };
}

export default function IssuerAssetsCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
