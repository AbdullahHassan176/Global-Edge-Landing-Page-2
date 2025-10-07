import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateDynamicMetadata({ path: `/insights/${params.id}` });
}

export default function InsightDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}


