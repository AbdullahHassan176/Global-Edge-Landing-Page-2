import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/withdraw' });

  return {
    ...baseMeta,
    title: 'Withdraw Funds | Secure Withdrawal | The Global Edge',
    description: 'Withdraw your earnings and available funds to your bank account securely with The Global Edge platform.',
    keywords: 'withdraw funds, withdrawal request, bank transfer, secure withdrawal, earnings withdrawal, fund transfer',
    robots: { index: false, follow: false },
    alternates: {
      canonical: 'https://theglobaledge.io/withdraw'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Withdraw Funds | Secure Withdrawal | The Global Edge',
      description: 'Withdraw your earnings and available funds to your bank account securely with The Global Edge platform.',
      url: 'https://theglobaledge.io/withdraw',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-withdraw.jpg', width: 1200, height: 630, alt: 'Withdraw Funds | Secure Withdrawal | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Withdraw Funds | Secure Withdrawal | The Global Edge',
      description: 'Withdraw your earnings and available funds to your bank account securely with The Global Edge platform.',
      images: ['https://theglobaledge.io/og-withdraw.jpg']
    },
    
  };
}

export default function WithdrawLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Withdraw Funds - Secure Withdrawal",
        "description": "Withdraw your earnings and available funds to your bank account securely with The Global Edge platform",
        "url": "https://theglobaledge.io/withdraw",
        "mainEntity": {
          "@type": "Article",
          "headline": "Fund Withdrawal Service",
          "description": "Secure withdrawal of investment earnings and available funds",
          "author": {
            "@type": "Person",
            "name": "The Global Edge User"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-12-20",
          "dateModified": "2024-12-20",
          "articleSection": "Financial Services"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://theglobaledge.io"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Withdraw",
              "item": "https://theglobaledge.io/withdraw"
            }
          ]
        }
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}



