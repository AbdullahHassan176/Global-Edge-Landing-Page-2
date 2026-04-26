import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';
import { absoluteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/investors' });

  return {
    ...baseMeta,
    title:
      'Investors | Africa–UAE trade RWA pilots | The Global Edge',
    description:
      'Connect with the team if you evaluate early-stage trade-backed issuance in the Gulf. Pilots in progress—no marketed live tokenized AUM until offerings and disclosures are published.',
    keywords:
      'investor relations UAE, RWA pilots Dubai, trade tokenization, VARA-aligned issuance, Africa UAE corridor, institutional diligence',
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl('/investors'),
    },
    openGraph: {
      ...baseMeta.openGraph,
      title:
        'Investors | Africa–UAE trade RWA pilots | The Global Edge',
      description:
        'Connect with the team if you evaluate early-stage trade-backed issuance in the Gulf. Pilots in progress—listings follow issued instruments.',
      url: absoluteUrl('/investors'),
      type: 'website',
      images: [
        {
          url: absoluteUrl('/og-investors.jpg'),
          width: 1200,
          height: 630,
          alt: 'Investors | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title:
        'Investors | Africa–UAE trade RWA pilots | The Global Edge',
      description:
        'Connect with the team if you evaluate early-stage trade-backed issuance in the Gulf. Pilots in progress—listings follow issued instruments.',
      images: [absoluteUrl('/og-investors.jpg')],
    },
  };
}

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Investor relations — The Global Edge',
    description:
      'Information and contact path for qualified parties evaluating Africa–UAE trade-backed issuance pilots; participation is subject to offering documents where applicable.',
    url: absoluteUrl('/investors'),
    provider: {
      '@type': 'Organization',
      name: 'The Global Edge',
      url: absoluteUrl('/'),
    },
    serviceType: 'Investor relations',
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
