import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/withdraw' });
}

export default function WithdrawLayout({ children }: { children: React.ReactNode }) {
  return children;
}


