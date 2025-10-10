import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/investor/kyc' });

  return {
    ...baseMeta,
    title: 'KYC Verification | Investor Onboarding | The Global Edge',
    description:
      'Complete your KYC (Know Your Customer) verification to start investing in tokenized assets on The Global Edge platform.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/investor/kyc',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'KYC Verification | Investor Onboarding | The Global Edge',
      description:
        'Complete your KYC (Know Your Customer) verification to start investing in tokenized assets on The Global Edge platform.',
      url: 'https://theglobaledge.io/investor/kyc',
      type: 'website',
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'KYC Verification | Investor Onboarding | The Global Edge',
      description:
        'Complete your KYC (Know Your Customer) verification to start investing in tokenized assets on The Global Edge platform.',
    },
  };
}

export default function InvestorKYCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
