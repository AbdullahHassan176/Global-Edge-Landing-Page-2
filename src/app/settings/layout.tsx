import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/settings' });
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


