import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/pricing' });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}


