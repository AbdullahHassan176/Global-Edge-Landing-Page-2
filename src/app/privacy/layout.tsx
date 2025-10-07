import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/privacy' });
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}


