import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/terms' });
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


