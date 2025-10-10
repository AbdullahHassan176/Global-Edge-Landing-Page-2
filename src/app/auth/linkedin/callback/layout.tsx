import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({
    path: '/auth/linkedin/callback',
  });

  return {
    ...baseMeta,
    title: 'LinkedIn Authentication | The Global Edge',
    description:
      'Processing LinkedIn authentication for The Global Edge platform.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/auth/linkedin/callback',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'LinkedIn Authentication | The Global Edge',
      description:
        'Processing LinkedIn authentication for The Global Edge platform.',
      url: 'https://theglobaledge.io/auth/linkedin/callback',
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'LinkedIn Authentication | The Global Edge',
      description:
        'Processing LinkedIn authentication for The Global Edge platform.',
    },
  };
}

export default function LinkedInCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
