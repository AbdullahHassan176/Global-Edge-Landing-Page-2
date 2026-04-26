import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';
import { absoluteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/how-it-works' });

  return {
    ...baseMeta,
    title: 'How Tokenization Works | The Global Edge UAE',
    description:
      'Intended issuance workflow for Africa–UAE trade-backed assets: verification, documentation, optional data feeds, contracts, and listing—designed for VARA-aligned distribution in the UAE (pilot in progress).',
    keywords:
      'RWA tokenization UAE, trade finance tokenization, VARA-aligned issuance, Africa UAE corridor, FMCG inventory tokens, blockchain asset onboarding',
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl('/how-it-works'),
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'How Tokenization Works | The Global Edge UAE',
      description:
        'Intended issuance workflow for Africa–UAE trade-backed assets: verification, documentation, optional data feeds, contracts, and listing—designed for VARA-aligned distribution in the UAE (pilot in progress).',
      url: absoluteUrl('/how-it-works'),
      type: 'website',
      images: [
        {
          url: absoluteUrl('/og-how-it-works.jpg'),
          width: 1200,
          height: 630,
          alt: 'How Tokenization Works | The Global Edge UAE',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'How Tokenization Works | The Global Edge UAE',
      description:
        'Intended issuance workflow for Africa–UAE trade-backed assets: verification, documentation, optional data feeds, contracts, and listing—designed for VARA-aligned distribution in the UAE (pilot in progress).',
      images: [absoluteUrl('/og-how-it-works.jpg')],
    },
  };
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Global Edge intends to tokenize real-world trade assets',
    description:
      'Target path from verification through controlled listing; VARA-aligned issuance is a design goal—not a claim that every step is live for all products today.',
    url: absoluteUrl('/how-it-works'),
    totalTime: 'P60D',
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Real-world asset',
      },
      {
        '@type': 'HowToSupply',
        name: 'Legal and compliance documentation (instrument-specific)',
      },
      {
        '@type': 'HowToSupply',
        name: 'Oracle integration',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Asset Verification',
        text: 'Independent verification of asset existence, condition, and ownership where required for the instrument',
      },
      {
        '@type': 'HowToStep',
        name: 'Documentation',
        text: 'Creation of legal framework including SPV formation, custody agreements, and investor protection mechanisms under UAE regulations',
      },
      {
        '@type': 'HowToStep',
        name: 'Oracle Integration',
        text: 'Optional data feeds and attestations scoped per instrument—not implied as universally live',
      },
      {
        '@type': 'HowToStep',
        name: 'Smart Contract Deployment',
        text: 'Development and deployment of audited smart contracts that govern token mechanics and ownership rights',
      },
      {
        '@type': 'HowToStep',
        name: 'Digital Twin Creation',
        text: 'Instrument records and investor access paths appropriate to the product—not a claim that every asset has a live digital twin today',
      },
      {
        '@type': 'HowToStep',
        name: 'Market Launch',
        text: 'Final reviews, investor onboarding where required, and controlled listing after offering documentation is in place',
      },
    ],
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
