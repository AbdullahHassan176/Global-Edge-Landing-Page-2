import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/security' });

  return {
    ...baseMeta,
    title:
      'Security | Blockchain, Compliance & Infrastructure | The Global Edge',
    description:
      'Security posture for early-stage pilots: data protection, key management targets, and diligence-friendly practices—VARA-aligned issuance is a roadmap goal, not a blanket certification claim.',
    keywords:
      'blockchain security, VARA-aligned issuance, RWA security, data protection, transaction security, infrastructure security, key management, pilot diligence',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/security',
    },
    openGraph: {
      ...baseMeta.openGraph,
      title:
        'Security | Blockchain, Compliance & Infrastructure | The Global Edge',
      description:
        'Security posture for early-stage pilots: data protection, key management targets, and diligence-friendly practices—VARA-aligned issuance is a roadmap goal.',
      url: 'https://theglobaledge.io/security',
      type: 'website',
      images: [
        {
          url: 'https://theglobaledge.io/og-security.jpg',
          width: 1200,
          height: 630,
          alt: 'Security | Blockchain, Compliance & Infrastructure | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title:
        'Security | Blockchain, Compliance & Infrastructure | The Global Edge',
      description:
        'Security posture for early-stage pilots: data protection, key management targets, and diligence-friendly practices—VARA-aligned issuance is a roadmap goal.',
      images: ['https://theglobaledge.io/og-security.jpg'],
    },
  };
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Security: Blockchain, Compliance & Infrastructure',
    description:
      'Security posture for early-stage pilots: data protection, key management targets, and diligence-friendly practices toward VARA-aligned issuance.',
    url: 'https://theglobaledge.io/security',
    datePublished: '2024-01-01',
    dateModified: '2024-01-01',
    author: {
      '@type': 'Organization',
      name: 'The Global Edge Security Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Global Edge',
      url: 'https://theglobaledge.io',
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Blockchain Security',
        description: 'Security measures for blockchain-based issuance programs',
      },
      {
        '@type': 'Thing',
        name: 'VARA-aligned issuance',
        description:
          'Design target for UAE virtual asset distribution—not a claim of existing VARA licensing for every activity',
      },
      {
        '@type': 'Thing',
        name: 'Data Protection',
        description:
          'Comprehensive data security and privacy protection measures',
      },
    ],
    articleSection: 'Security & Compliance',
    wordCount: 1500,
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
