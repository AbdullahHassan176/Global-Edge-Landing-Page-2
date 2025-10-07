'use client';

import Head from 'next/head';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import HeroSection from '@/components/ui/HeroSection';

/*
Layout Rollback:
- Removed forced centering
- Increased text container width (max-w-5xl to max-w-6xl)
*/
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
          <div className="max-w-6xl text-white text-balance text-left">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">INVESTOR RESOURCES</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight break-words max-w-6xl">
              Investor Portal
            </h1>
            <h2 className="text-2xl lg:text-3xl font-poppins font-semibold mb-6 leading-tight break-words max-w-6xl">
              Access Tokenized Assets, Manage Your Portfolio
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 font-inter font-light opacity-90 max-w-6xl leading-relaxed">
              Access your investment dashboard, track portfolio performance, and discover new opportunities in tokenized real-world assets. Get started with our <Link href="/get-started" className="underline hover:text-global-teal transition-colors">onboarding process</Link> and explore our <Link href="/faq" className="underline hover:text-global-teal transition-colors">FAQ section</Link>.
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-6 font-inter font-light opacity-90 max-w-6xl leading-relaxed">
              Investing in tokenized assets across the UAE provides access to premium real-world assets including shipping containers, commercial real estate, and trade inventory with fractional ownership opportunities. Our VARA-compliant platform ensures regulatory compliance while offering competitive returns and enhanced liquidity.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-4 md:mt-6">
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
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Why Invest Through The Global Edge</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">Access institutional-grade investment opportunities with complete transparency and blockchain verification. Learn more about our <Link href="/get-started" className="text-global-teal hover:text-edge-purple transition-colors">onboarding process</Link> and check our <Link href="/faq" className="text-global-teal hover:text-edge-purple transition-colors">FAQ</Link> for answers to common questions.</p>
            <ul className="text-lg text-gray-600 max-w-2xl mx-auto space-y-2">
              <li>• <strong>Enhanced Liquidity:</strong> Trade tokenized assets 24/7 with instant settlement and global market access</li>
              <li>• <strong>Complete Transparency:</strong> Real-time asset tracking, blockchain verification, and immutable ownership records</li>
              <li>• <strong>VARA Compliance:</strong> Full regulatory compliance with UAE's Virtual Assets Regulatory Authority framework</li>
            </ul>
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

      {/* Investment Opportunities & Asset Classes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Diverse Investment Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Access a wide range of tokenized real-world assets with varying risk profiles and return potential. Explore our <Link href="/assets" className="text-global-teal hover:text-edge-purple transition-colors">available assets</Link> and learn about our <Link href="/how-it-works" className="text-global-teal hover:text-edge-purple transition-colors">tokenization process</Link>.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Icon name="ship" className="text-blue-600 text-lg" size={20} />
              </div>
              <h3 className="text-xl font-poppins font-bold text-charcoal mb-4">Container Assets</h3>
              <p className="text-gray-600 mb-4">Invest in shipping containers with GPS tracking and verified cargo, offering 8-15% APR returns.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Risk Level:</span>
                  <span className="text-green-600 font-semibold">Low-Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Min Investment:</span>
                  <span className="font-semibold">$50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available Assets:</span>
                  <span className="font-semibold">247</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Icon name="building" className="text-green-600 text-lg" size={20} />
              </div>
              <h3 className="text-xl font-poppins font-bold text-charcoal mb-4">Real Estate</h3>
              <p className="text-gray-600 mb-4">Commercial and residential properties with rental income streams and long-term appreciation potential.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Risk Level:</span>
                  <span className="text-yellow-600 font-semibold">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Min Investment:</span>
                  <span className="font-semibold">$100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available Assets:</span>
                  <span className="font-semibold">89</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Icon name="boxes" className="text-purple-600 text-lg" size={20} />
              </div>
              <h3 className="text-xl font-poppins font-bold text-charcoal mb-4">Trade Tokens</h3>
              <p className="text-gray-600 mb-4">Commodity inventory with verified supply chain data and short-term trading opportunities.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Risk Level:</span>
                  <span className="text-orange-600 font-semibold">Medium-High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Min Investment:</span>
                  <span className="font-semibold">$25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available Assets:</span>
                  <span className="font-semibold">156</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Icon name="vault" className="text-orange-600 text-lg" size={20} />
              </div>
              <h3 className="text-xl font-poppins font-bold text-charcoal mb-4">Vault Assets</h3>
              <p className="text-gray-600 mb-4">Precious metals and secure storage with insurance coverage and stable returns.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Risk Level:</span>
                  <span className="text-green-600 font-semibold">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Min Investment:</span>
                  <span className="font-semibold">$75</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available Assets:</span>
                  <span className="font-semibold">34</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-white">
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
