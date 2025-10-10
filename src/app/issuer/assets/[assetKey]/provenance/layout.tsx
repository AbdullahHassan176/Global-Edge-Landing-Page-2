import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: { assetKey: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: `/issuer/assets/${params.assetKey}/provenance` });

  return {
    ...baseMeta,
    title: `Asset Provenance | ${params.assetKey} | The Global Edge`,
    description: `View provenance and audit trail for tokenized asset ${params.assetKey} on The Global Edge platform.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://theglobaledge.io/issuer/assets/${params.assetKey}/provenance`
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Provenance | ${params.assetKey} | The Global Edge`,
      description: `View provenance and audit trail for tokenized asset ${params.assetKey} on The Global Edge platform.`,
      url: `https://theglobaledge.io/issuer/assets/${params.assetKey}/provenance`,
      type: 'website'
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Provenance | ${params.assetKey} | The Global Edge`,
      description: `View provenance and audit trail for tokenized asset ${params.assetKey} on The Global Edge platform.`
    }
  };
}

export default function IssuerAssetProvenanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
