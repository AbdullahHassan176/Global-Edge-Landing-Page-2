import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/status' });
}

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}


