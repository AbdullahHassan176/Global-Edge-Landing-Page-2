import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/reset-password' });

  return {
    ...baseMeta,
    title: 'Reset Password | Create New Password | The Global Edge',
    description: 'Create a new password for your Global Edge account. Enter your new password to complete the password reset process.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/reset-password'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Reset Password | Create New Password | The Global Edge',
      description: 'Create a new password for your Global Edge account. Enter your new password to complete the password reset process.',
      url: 'https://theglobaledge.io/reset-password',
      type: 'website'
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Reset Password | Create New Password | The Global Edge',
      description: 'Create a new password for your Global Edge account. Enter your new password to complete the password reset process.'
    }
  };
}

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
