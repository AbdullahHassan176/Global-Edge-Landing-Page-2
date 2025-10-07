import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/faq' });
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}


