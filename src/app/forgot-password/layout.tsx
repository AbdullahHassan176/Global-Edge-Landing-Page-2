import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/forgot-password' });

  return {
    ...baseMeta,
    title: 'Forgot Password | Reset Your Account | The Global Edge',
    description:
      'Reset your password for The Global Edge platform. Enter your email to receive password reset instructions.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/forgot-password',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Forgot Password | Reset Your Account | The Global Edge',
      description:
        'Reset your password for The Global Edge platform. Enter your email to receive password reset instructions.',
      url: 'https://theglobaledge.io/forgot-password',
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Forgot Password | Reset Your Account | The Global Edge',
      description:
        'Reset your password for The Global Edge platform. Enter your email to receive password reset instructions.',
    },
  };
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
