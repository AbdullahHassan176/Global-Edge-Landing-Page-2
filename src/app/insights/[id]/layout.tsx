import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return generateDynamicMetadata({ path: `/insights/${id}` });
}

export default function InsightDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
