import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/issuer/dashboard' });

  return {
    ...baseMeta,
    title: 'Issuer Dashboard | Asset Management | The Global Edge',
    description:
      'Manage your tokenized assets, track performance, and oversee your investment platform on The Global Edge.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/issuer/dashboard',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Issuer Dashboard | Asset Management | The Global Edge',
      description:
        'Manage your tokenized assets, track performance, and oversee your investment platform on The Global Edge.',
      url: 'https://theglobaledge.io/issuer/dashboard',
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Issuer Dashboard | Asset Management | The Global Edge',
      description:
        'Manage your tokenized assets, track performance, and oversee your investment platform on The Global Edge.',
    },
  };
}

export default function IssuerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
