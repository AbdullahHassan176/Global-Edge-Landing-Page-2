import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({
    path: `/assets/${params.id}`,
  });

  return {
    ...baseMeta,
    title: `Asset Details | Tokenized Asset ${params.id} | The Global Edge`,
    description: `View detailed information about tokenized asset ${params.id} on The Global Edge platform.`,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://theglobaledge.io/assets/${params.id}`,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Details | Tokenized Asset ${params.id} | The Global Edge`,
      description: `View detailed information about tokenized asset ${params.id} on The Global Edge platform.`,
      url: `https://theglobaledge.io/assets/${params.id}`,
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Details | Tokenized Asset ${params.id} | The Global Edge`,
      description: `View detailed information about tokenized asset ${params.id} on The Global Edge platform.`,
    },
  };
}

export default function AssetDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
