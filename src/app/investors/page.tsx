'use client';

import Head from 'next/head';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import HeroSection from '@/components/ui/HeroSection';

export default function InvestorsPage() {
  return (
    <>
      <Head>
        <title>Investor Access | Secure Tokenized Asset Investment UAE | The Global Edge</title>
        <meta name="description" content="Join The Global Edge as an investor. Access tokenized logistics and real estate assets, view documentation, and earn from fractionalized ownership." />
        <meta name="keywords" content="investor portal UAE, tokenized asset investment, logistics investment, real estate investment, fractional ownership, blockchain investment, RWA investment" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://theglobaledge.io/investors" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Investor Access | Secure Tokenized Asset Investment UAE | The Global Edge" />
        <meta property="og:description" content="Join The Global Edge as an investor. Access tokenized logistics and real estate assets, view documentation, and earn from fractionalized ownership." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theglobaledge.io/investors" />
        <meta property="og:image" content="https://theglobaledge.io/og-investors.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Investor Access | Secure Tokenized Asset Investment UAE | The Global Edge" />
        <meta name="twitter:description" content="Join The Global Edge as an investor. Access tokenized logistics and real estate assets, view documentation, and earn from fractionalized ownership." />
        <meta name="twitter:image" content="https://theglobaledge.io/og-investors.jpg" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Investor Access Portal",
              "description": "Secure tokenized asset investment platform for accessing logistics and real estate assets with fractionalized ownership",
              "url": "https://theglobaledge.io/investors",
              "provider": {
                "@type": "Organization",
                "name": "The Global Edge",
                "url": "https://theglobaledge.io"
              },
              "serviceType": "Financial Services",
              "areaServed": {
                "@type": "Country",
                "name": "United Arab Emirates"
              },
              "offers": {
                "@type": "Offer",
                "name": "Tokenized Asset Investment",
                "description": "Access to tokenized logistics and real estate assets with fractionalized ownership",
                "category": "Investment Services"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Investment Opportunities",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Logistics Asset Investment",
                      "description": "Tokenized shipping containers and logistics assets"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Real Estate Investment",
                      "description": "Tokenized commercial and residential properties"
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">INVESTOR RESOURCES</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight">
              Investor Portal
            </h1>
            <h2 className="text-2xl lg:text-3xl font-poppins font-semibold mb-6 leading-tight">
              Access Tokenized Assets, Manage Your Portfolio
            </h2>
            <p className="text-xl lg:text-2xl mb-8 font-inter font-light opacity-90">
              Access your investment dashboard, track portfolio performance, and discover new opportunities in tokenized real-world assets. Get started with our <Link href="/get-started" className="underline hover:text-global-teal transition-colors">onboarding process</Link> and explore our <Link href="/faq" className="underline hover:text-global-teal transition-colors">FAQ section</Link>.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/dashboard" className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors flex items-center justify-center">
                Access Dashboard
                <Icon name="arrow-right" className="ml-2" size={8} />
              </Link>
              <Link href="/get-started" className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-gradient-to-tl from-aqua-start to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Investor Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Why Invest with Global Edge?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Access institutional-grade investment opportunities with complete transparency and blockchain verification. Learn more about our <Link href="/get-started" className="text-global-teal hover:text-edge-purple transition-colors">onboarding process</Link> and check our <Link href="/faq" className="text-global-teal hover:text-edge-purple transition-colors">FAQ</Link> for answers to common questions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="chart-line-up" className="text-white text-lg"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Diversified Returns</h3>
              <p className="text-gray-600">Access multiple asset classes with competitive yields ranging from 6-18% APR</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="shield" className="text-white text-lg"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Risk Management</h3>
              <p className="text-gray-600">Comprehensive due diligence, insurance coverage, and oracle verification for all assets</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="eye" className="text-white text-lg"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Full Transparency</h3>
              <p className="text-gray-600">Real-time tracking, blockchain verification, and complete audit trails for all investments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Simple Investment Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get started in minutes with our streamlined onboarding process. Begin your journey with <Link href="/get-started" className="text-global-teal hover:text-edge-purple transition-colors">our onboarding</Link> and access your <Link href="/dashboard" className="text-global-teal hover:text-edge-purple transition-colors">investment dashboard</Link>. Have questions? Check our <Link href="/faq" className="text-global-teal hover:text-edge-purple transition-colors">FAQ section</Link>.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Complete KYC</h3>
              <p className="text-sm text-gray-600">Verify your identity with our secure, compliant onboarding process</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Fund Account</h3>
              <p className="text-sm text-gray-600">Deposit funds securely through our integrated payment systems</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Browse Assets</h3>
              <p className="text-sm text-gray-600">Explore and analyze tokenized assets with detailed performance data</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Start Investing</h3>
              <p className="text-sm text-gray-600">Make investments with as little as $50 and track returns in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of investors earning returns from tokenized real-world assets. Get started with our <Link href="/get-started" className="underline hover:text-global-teal transition-colors">onboarding process</Link>, access your <Link href="/dashboard" className="underline hover:text-global-teal transition-colors">investment dashboard</Link>, and find answers in our <Link href="/faq" className="underline hover:text-global-teal transition-colors">FAQ section</Link>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/get-started"
              className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Start KYC Process
            </Link>
            <Link 
              href="/dashboard"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors"
            >
              Access Dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
