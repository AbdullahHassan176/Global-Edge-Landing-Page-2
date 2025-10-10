import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '/reports/custom' });

  return {
    ...baseMeta,
    title: 'Custom Reports | Personalized Analytics | The Global Edge',
    description: 'Generate personalized analytics and reports for your tokenized asset portfolio. Create custom reports with detailed performance metrics and insights.',
    keywords: 'custom reports, personalized analytics, portfolio reports, investment analytics, tokenized asset reports, performance metrics, investment insights, portfolio analysis',
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://theglobaledge.io/reports/custom'
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: 'Custom Reports | Personalized Analytics | The Global Edge',
      description: 'Generate personalized analytics and reports for your tokenized asset portfolio. Create custom reports with detailed performance metrics and insights.',
      url: 'https://theglobaledge.io/reports/custom',
      type: 'website',
      images: [{ url: 'https://theglobaledge.io/og-custom-reports.jpg', width: 1200, height: 630, alt: 'Custom Reports | Personalized Analytics | The Global Edge' }]
    },
    twitter: {
      ...baseMeta.twitter,
      title: 'Custom Reports | Personalized Analytics | The Global Edge',
      description: 'Generate personalized analytics and reports for your tokenized asset portfolio. Create custom reports with detailed performance metrics and insights.',
      images: ['https://theglobaledge.io/og-custom-reports.jpg']
    },
    
  };
}

export default function ReportsCustomLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Custom Reports - Personalized Analytics",
        "description": "Generate personalized analytics and reports for your tokenized asset portfolio. Create custom reports with detailed performance metrics and insights",
        "url": "https://theglobaledge.io/reports/custom",
        "mainEntity": {
          "@type": "Article",
          "headline": "Custom Investment Reports and Analytics",
          "description": "Create personalized reports for tokenized asset portfolios with detailed performance metrics and investment insights",
          "author": {
            "@type": "Organization",
            "name": "The Global Edge Analytics Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Global Edge",
            "url": "https://theglobaledge.io"
          },
          "datePublished": "2024-01-01",
          "dateModified": "2024-01-01",
          "articleSection": "Analytics & Reporting"
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
              "name": "Reports",
              "item": "https://theglobaledge.io/reports"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Custom Reports",
              "item": "https://theglobaledge.io/reports/custom"
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



