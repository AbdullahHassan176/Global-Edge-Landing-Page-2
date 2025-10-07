import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/reports/custom' });
}

export default function ReportsCustomLayout({ children }: { children: React.ReactNode }) {
  return children;
}


