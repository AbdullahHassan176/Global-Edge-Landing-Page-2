import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ path: '/issuer' });
}

export default function IssuerSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
