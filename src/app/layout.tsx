import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Global Edge - Tokenizing Real-World Assets',
  description: 'Invest in tokenized real-world assets including shipping containers, real estate, and trade inventory with complete transparency and blockchain verification.',
  keywords: 'tokenization, real estate, shipping containers, blockchain, investment, assets',
  authors: [{ name: 'Global Edge' }],
  robots: 'index, follow',
  metadataBase: new URL('https://globalnext.rocks'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Global Edge - Tokenizing Real-World Assets',
    description: 'Invest in tokenized real-world assets with complete transparency',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Edge - Tokenizing Real-World Assets',
    description: 'Invest in tokenized real-world assets with complete transparency',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter bg-soft-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
