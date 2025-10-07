import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/asset-details' });
}

export default function AssetDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


