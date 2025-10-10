import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: { assetKey: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({
    path: `/issuer/assets/${params.assetKey}`,
  });

  return {
    ...baseMeta,
    title: `Asset Management | ${params.assetKey} | The Global Edge`,
    description: `Manage your tokenized asset ${params.assetKey} on The Global Edge platform.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://theglobaledge.io/issuer/assets/${params.assetKey}`,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Management | ${params.assetKey} | The Global Edge`,
      description: `Manage your tokenized asset ${params.assetKey} on The Global Edge platform.`,
      url: `https://theglobaledge.io/issuer/assets/${params.assetKey}`,
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Management | ${params.assetKey} | The Global Edge`,
      description: `Manage your tokenized asset ${params.assetKey} on The Global Edge platform.`,
    },
  };
}

export default function IssuerAssetDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
