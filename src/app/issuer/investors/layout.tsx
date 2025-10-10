import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/issuer/investors' });

  return {
    ...baseMeta,
    title: 'Investor Management | Issuer Portal | The Global Edge',
    description:
      'Manage your investors, track engagement, and oversee investment activities on The Global Edge platform.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/issuer/investors',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Investor Management | Issuer Portal | The Global Edge',
      description:
        'Manage your investors, track engagement, and oversee investment activities on The Global Edge platform.',
      url: 'https://theglobaledge.io/issuer/investors',
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Investor Management | Issuer Portal | The Global Edge',
      description:
        'Manage your investors, track engagement, and oversee investment activities on The Global Edge platform.',
    },
  };
}

export default function IssuerInvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
