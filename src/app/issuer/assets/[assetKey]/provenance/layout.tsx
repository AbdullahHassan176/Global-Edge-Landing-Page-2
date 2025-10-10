import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: Promise<{ assetKey: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assetKey } = await params;
  const baseMeta = await generateDynamicMetadata({
    path: `/issuer/assets/${assetKey}/provenance`,
  });

  return {
    ...baseMeta,
    title: `Asset Provenance | ${assetKey} | The Global Edge`,
    description: `View provenance and audit trail for tokenized asset ${assetKey} on The Global Edge platform.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://theglobaledge.io/issuer/assets/${assetKey}/provenance`,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Provenance | ${assetKey} | The Global Edge`,
      description: `View provenance and audit trail for tokenized asset ${assetKey} on The Global Edge platform.`,
      url: `https://theglobaledge.io/issuer/assets/${assetKey}/provenance`,
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Provenance | ${assetKey} | The Global Edge`,
      description: `View provenance and audit trail for tokenized asset ${assetKey} on The Global Edge platform.`,
    },
  };
}

export default function IssuerAssetProvenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
