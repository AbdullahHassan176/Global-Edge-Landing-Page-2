import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';
import { absoluteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/partners' });

  return {
    ...baseMeta,
    title: 'Partners | The Global Edge',
    description:
      'We only display partner marks when relationships are public or signed. If you operate logistics, custody, or allocation in the UAE, see how to engage.',
    keywords:
      'partners UAE, logistics pilots, tokenization partners, RWA ecosystem Dubai, VARA-aligned programs',
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl('/partners'),
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Partners | The Global Edge',
      description:
        'We only display partner marks when relationships are public or signed. Engage via partner application or a conversation.',
      url: absoluteUrl('/partners'),
      type: 'website',
      images: [
        {
          url: absoluteUrl('/og-partners.jpg'),
          width: 1200,
          height: 630,
          alt: 'Partners | The Global Edge',
        },
      ],
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Partners | The Global Edge',
      description:
        'We only display partner marks when relationships are public or signed. Engage via partner application or a conversation.',
      images: [absoluteUrl('/og-partners.jpg')],
    },
  };
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Partners — The Global Edge',
    description:
      'Partner policy and engagement: public or signed relationships only; VARA-aligned issuance is a program design target.',
    url: absoluteUrl('/partners'),
    isPartOf: {
      '@type': 'WebSite',
      name: 'The Global Edge',
      url: absoluteUrl('/'),
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
