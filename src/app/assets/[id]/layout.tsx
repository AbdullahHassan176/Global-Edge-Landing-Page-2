import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const baseMeta = await generateDynamicMetadata({
    path: `/assets/${id}`,
  });

  return {
    ...baseMeta,
    title: `Asset Details | Tokenized Asset ${id} | The Global Edge`,
    description: `View detailed information about tokenized asset ${id} on The Global Edge platform.`,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://theglobaledge.io/assets/${id}`,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: `Asset Details | Tokenized Asset ${id} | The Global Edge`,
      description: `View detailed information about tokenized asset ${id} on The Global Edge platform.`,
      url: `https://theglobaledge.io/assets/${id}`,
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: `Asset Details | Tokenized Asset ${id} | The Global Edge`,
      description: `View detailed information about tokenized asset ${id} on The Global Edge platform.`,
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
