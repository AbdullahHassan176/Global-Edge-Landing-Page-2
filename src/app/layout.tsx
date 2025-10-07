import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

// classic head handled per-page; layout has global scripts and structure

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'The Global Edge',
  description:
    'Empowering global trade through tokenization. Manage, track, and invest in logistics assets securely and transparently.',
  robots: 'index, follow',
  openGraph: {
    title: 'The Global Edge',
    description:
      'Tokenizing logistics and real-world assets to unlock global opportunities.',
    url: 'https://theglobaledge.io',
    siteName: 'The Global Edge',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Global Edge' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Global Edge',
    description:
      'Tokenizing logistics and real-world assets to unlock global opportunities.',
    images: ['/og-image.jpg'],
  },
} as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head></head>
      <body className="font-inter bg-soft-white">
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
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
          id="google-analytics"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-QWR6TE1R87"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
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
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
