import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/investor/dashboard' });

  return {
    ...baseMeta,
    title: 'Investor Dashboard | Portfolio Overview | The Global Edge',
    description: 'View your investment portfolio, track performance, and manage your tokenized asset investments on The Global Edge platform.',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/investor/dashboard'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Investor Dashboard | Portfolio Overview | The Global Edge',
      description: 'View your investment portfolio, track performance, and manage your tokenized asset investments on The Global Edge platform.',
      url: 'https://theglobaledge.io/investor/dashboard',
      type: 'website'
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Investor Dashboard | Portfolio Overview | The Global Edge',
      description: 'View your investment portfolio, track performance, and manage your tokenized asset investments on The Global Edge platform.'
    }
  };
}

export default function InvestorDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
