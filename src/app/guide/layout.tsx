import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/guide' });
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}


