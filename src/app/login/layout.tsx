import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/login' });
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}


