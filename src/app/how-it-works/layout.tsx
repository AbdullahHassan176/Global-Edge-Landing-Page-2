import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/how-it-works' });
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}


