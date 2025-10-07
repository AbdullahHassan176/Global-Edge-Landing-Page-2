import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/activity' });
}

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return children;
}


