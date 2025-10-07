import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/cookies' });
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}


