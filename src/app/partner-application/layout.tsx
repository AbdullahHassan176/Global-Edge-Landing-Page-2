import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/partner-application' });
}

export default function PartnerApplicationLayout({ children }: { children: React.ReactNode }) {
  return children;
}


