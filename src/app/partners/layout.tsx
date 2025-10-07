import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/partners' });
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}


