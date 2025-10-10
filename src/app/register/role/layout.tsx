import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/register/role' });

  return {
    ...baseMeta,
    title: 'Choose Your Role | Investor or Issuer | The Global Edge',
    description:
      'Choose your role on The Global Edge platform - become an investor or issuer to start your tokenized asset journey.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/register/role',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Choose Your Role | Investor or Issuer | The Global Edge',
      description:
        'Choose your role on The Global Edge platform - become an investor or issuer to start your tokenized asset journey.',
      url: 'https://theglobaledge.io/register/role',
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Choose Your Role | Investor or Issuer | The Global Edge',
      description:
        'Choose your role on The Global Edge platform - become an investor or issuer to start your tokenized asset journey.',
    },
  };
}

export default function RegisterRoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
