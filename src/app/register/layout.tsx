import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/register' });
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}


