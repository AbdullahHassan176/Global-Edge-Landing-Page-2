import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/get-started' });
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}


