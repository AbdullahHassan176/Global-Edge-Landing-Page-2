import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/admin' });
}

export default function AdminSectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}


