import Script from 'next/script';
import { Inter, JetBrains_Mono, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';
import { absoluteUrl, getSiteOrigin } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
});

// classic head handled per-page; layout has global scripts and structure

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata() {
  return generateDynamicMetadata({
    path: '/',
    title: 'The Global Edge | Africa–UAE trade tokenization (pilot)',
    description:
      'Pilot-stage platform for trade-backed RWA: South Africa → UAE FMCG lane, on-chain provenance, and a VARA-aligned issuance target—without claiming live tokenized AUM.',
    defaultTitle: 'The Global Edge | Africa–UAE trade tokenization (pilot)',
    defaultDescription:
      'Pilot-stage platform for trade-backed RWA: South Africa → UAE FMCG lane, on-chain provenance, and a VARA-aligned issuance target—without claiming live tokenized AUM.',
  });
}

const rootJsonLd = () => {
  const origin = getSiteOrigin();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'The Global Edge',
        url: origin,
        logo: absoluteUrl('/favicon.svg'),
        description:
          'Early-stage issuer infrastructure for Africa–UAE trade-backed real-world assets; VARA-aligned distribution is a design target.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'AE',
          addressRegion: 'Dubai',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: 'The Global Edge',
        inLanguage: 'en-AE',
        publisher: { '@id': `${origin}/#organization` },
      },
    ],
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
      </head>
      <body className='font-inter bg-soft-white text-charcoal antialiased'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootJsonLd()),
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id='google-tag-manager'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5J7PSV92');
            `,
          }}
        />

        {/* Google Analytics 4 */}
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          src='https://www.googletagmanager.com/gtag/js?id=G-QWR6TE1R87'
        />
        <Script
          id='ga4-init'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'G-QWR6TE1R87');
            `,
          }}
        />
        <Header />
        <main className='min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
