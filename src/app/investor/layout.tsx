import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/investor' });
}

export default function InvestorSectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}


