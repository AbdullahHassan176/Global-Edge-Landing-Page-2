import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/investors' });
}

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


