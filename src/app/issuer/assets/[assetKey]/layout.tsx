import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: Promise<{ assetKey: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assetKey } = await params;
  const baseMeta = await generateDynamicMetadata({
    path: `/issuer/assets/${assetKey}`,
  });

  return {
    ...baseMeta,
    title: `Asset Management | ${assetKey} | The Global Edge`,
    description: `Manage your tokenized asset ${assetKey} on The Global Edge platform.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://theglobaledge.io/issuer/assets/${assetKey}`,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Management | ${assetKey} | The Global Edge`,
      description: `Manage your tokenized asset ${assetKey} on The Global Edge platform.`,
      url: `https://theglobaledge.io/issuer/assets/${assetKey}`,
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Management | ${assetKey} | The Global Edge`,
      description: `Manage your tokenized asset ${assetKey} on The Global Edge platform.`,
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
