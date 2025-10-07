import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/assets' });
}

export default function AssetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


