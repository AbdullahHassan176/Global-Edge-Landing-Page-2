import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({
    path: '/auth/github/callback',
  });

  return {
    ...baseMeta,
    title: 'GitHub Authentication | The Global Edge',
    description:
      'Processing GitHub authentication for The Global Edge platform.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/auth/github/callback',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'GitHub Authentication | The Global Edge',
      description:
        'Processing GitHub authentication for The Global Edge platform.',
      url: 'https://theglobaledge.io/auth/github/callback',
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'GitHub Authentication | The Global Edge',
      description:
        'Processing GitHub authentication for The Global Edge platform.',
    },
  };
}

export default function GitHubCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
