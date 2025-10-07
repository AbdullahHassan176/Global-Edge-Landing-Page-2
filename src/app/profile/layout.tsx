import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/profile' });
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}


