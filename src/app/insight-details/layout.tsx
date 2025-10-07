import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/insight-details' });
}

export default function InsightDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


