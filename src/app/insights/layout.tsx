import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/insights' });
}

export default function InsightsSectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}


