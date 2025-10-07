import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/reports' });
}

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


