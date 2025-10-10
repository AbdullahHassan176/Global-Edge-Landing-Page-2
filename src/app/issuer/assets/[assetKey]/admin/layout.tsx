import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: { assetKey: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({
    path: `/issuer/assets/${params.assetKey}/admin`,
  });

  return {
    ...baseMeta,
    title: `Asset Admin | ${params.assetKey} | The Global Edge`,
    description: `Admin panel for managing tokenized asset ${params.assetKey} on The Global Edge platform.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://theglobaledge.io/issuer/assets/${params.assetKey}/admin`,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Admin | ${params.assetKey} | The Global Edge`,
      description: `Admin panel for managing tokenized asset ${params.assetKey} on The Global Edge platform.`,
      url: `https://theglobaledge.io/issuer/assets/${params.assetKey}/admin`,
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Admin | ${params.assetKey} | The Global Edge`,
      description: `Admin panel for managing tokenized asset ${params.assetKey} on The Global Edge platform.`,
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
