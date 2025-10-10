import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: Promise<{ assetKey: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assetKey } = await params;
  const baseMeta = await generateDynamicMetadata({
    path: `/issuer/assets/${assetKey}/investors`,
  });

  return {
    ...baseMeta,
    title: `Asset Investors | ${assetKey} | The Global Edge`,
    description: `View and manage investors for tokenized asset ${assetKey} on The Global Edge platform.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://theglobaledge.io/issuer/assets/${assetKey}/investors`,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Investors | ${assetKey} | The Global Edge`,
      description: `View and manage investors for tokenized asset ${assetKey} on The Global Edge platform.`,
      url: `https://theglobaledge.io/issuer/assets/${assetKey}/investors`,
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Investors | ${assetKey} | The Global Edge`,
      description: `View and manage investors for tokenized asset ${assetKey} on The Global Edge platform.`,
    },
  };
}

export default function IssuerAssetInvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
