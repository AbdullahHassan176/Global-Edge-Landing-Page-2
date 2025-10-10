import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: Promise<{ assetKey: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assetKey } = await params;
  const baseMeta = await generateDynamicMetadata({
    path: `/issuer/assets/${assetKey}/admin`,
  });

  return {
    ...baseMeta,
    title: `Asset Admin | ${assetKey} | The Global Edge`,
    description: `Admin panel for managing tokenized asset ${assetKey} on The Global Edge platform.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://theglobaledge.io/issuer/assets/${assetKey}/admin`,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Admin | ${assetKey} | The Global Edge`,
      description: `Admin panel for managing tokenized asset ${assetKey} on The Global Edge platform.`,
      url: `https://theglobaledge.io/issuer/assets/${assetKey}/admin`,
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Admin | ${assetKey} | The Global Edge`,
      description: `Admin panel for managing tokenized asset ${assetKey} on The Global Edge platform.`,
    },
  };
}

export default function IssuerAssetAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
