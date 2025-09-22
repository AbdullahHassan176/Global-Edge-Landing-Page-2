'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { AssetMetricsService, AssetMetrics } from '@/lib/assetMetricsService';
import { getPartnersForLandingPage } from '@/lib/partnersData';
import Image from 'next/image';

export default function HomePage() {
  const [metrics, setMetrics] = useState<AssetMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get partners for landing page
  const landingPagePartners = getPartnersForLandingPage();

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      const calculatedMetrics = AssetMetricsService.getAllMetrics();
      setMetrics(calculatedMetrics);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight">
              Tokenizing Global Trade Logistics & Real Assets
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-inter font-light opacity-90">
              Invest in asset-backed tokens with complete transparency. Own fractions of shipping containers, real estate, and trade inventory with blockchain-verified provenance.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/assets" className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors flex items-center justify-center">
                Explore Assets
                <Icon name="arrow-right" className="ml-2" size={8} />
              </Link>
              <Link href="/investors" className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors">
                Join Investor Waitlist
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-gradient-to-tl from-aqua-start to-transparent rounded-full"></div>
        </div>
      </section>

      {/* KPI Stripe */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-poppins font-bold text-global-teal mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-24 mx-auto rounded"></div>
                ) : (
                  AssetMetricsService.formatCurrency(metrics?.totalAssetsUnderManagement || 0)
                )}
              </div>
              <div className="text-sm text-gray-600 font-medium">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-poppins font-bold text-global-teal mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                ) : (
                  AssetMetricsService.formatNumber(metrics?.totalAssetsTokenized || 0)
                )}
              </div>
              <div className="text-sm text-gray-600 font-medium">Assets Tokenized</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-poppins font-bold text-global-teal mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                ) : (
                  `${metrics?.onTimeDeliveryRate || 0}%`
                )}
              </div>
              <div className="text-sm text-gray-600 font-medium">On-Time Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-poppins font-bold text-global-teal mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                ) : (
                  `${metrics?.averageAPR || 0}%`
                )}
              </div>
              <div className="text-sm text-gray-600 font-medium">Average APR</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Simple steps to start investing in tokenized real-world assets</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            <Link href="/register" className="text-center group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="user-check" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors">Verify Identity</h3>
              <p className="text-sm text-gray-600">Complete KYC/KYB verification to access tokenized assets</p>
            </Link>
            <Link href="/assets" className="text-center group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="search" className="text-white text-lg" size={8} />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors">Browse Assets</h3>
              <p className="text-sm text-gray-600">Explore containers, real estate, and trade inventory tokens</p>
            </Link>
            <Link href="/reports" className="text-center group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="chart-line" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors">Review Performance</h3>
              <p className="text-sm text-gray-600">Analyze yields, risk profiles, and asset provenance</p>
            </Link>
            <Link href="/get-started" className="text-center group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="coins" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors">Invest</h3>
              <p className="text-sm text-gray-600">Purchase fractional ownership through blockchain tokens</p>
            </Link>
            <Link href="/dashboard" className="text-center group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name="trophy" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors">Earn Returns</h3>
              <p className="text-sm text-gray-600">Receive payouts as assets generate revenue</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Asset Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Investment Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Diversify across multiple real-world asset classes</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/assets?category=containers" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Icon name="ship" className="text-blue-600 text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors">Containers</h3>
              <p className="text-gray-600 mb-4">Shipping containers with GPS tracking and verified cargo</p>
              <div className="space-y-2">
                <div className="text-sm text-global-teal font-semibold">Avg. 8-15% APR</div>
                <div className="text-xs text-gray-500">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                  ) : (
                    `${metrics?.categoryBreakdown.containers || 0} assets available`
                  )}
                </div>
              </div>
            </Link>
            <Link href="/assets?category=property" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Icon name="building" className="text-green-600 text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors">Property</h3>
              <p className="text-gray-600 mb-4">Commercial and residential real estate with rental income</p>
              <div className="space-y-2">
                <div className="text-sm text-global-teal font-semibold">Avg. 6-12% APR</div>
                <div className="text-xs text-gray-500">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                  ) : (
                    `${metrics?.categoryBreakdown.property || 0} assets available`
                  )}
                </div>
              </div>
            </Link>
            <Link href="/assets?category=tradetokens" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Icon name="boxes-stacked" className="text-purple-600 text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors">TradeTokens</h3>
              <p className="text-gray-600 mb-4">Commodity inventory with verified supply chain data</p>
              <div className="space-y-2">
                <div className="text-sm text-global-teal font-semibold">Avg. 10-18% APR</div>
                <div className="text-xs text-gray-500">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                  ) : (
                    `${metrics?.categoryBreakdown.tradetokens || 0} assets available`
                  )}
                </div>
              </div>
            </Link>
            <Link href="/assets?category=vault" className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <Icon name="vault" className="text-orange-600 text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors">Vault</h3>
              <p className="text-gray-600 mb-4">Precious metals and secure storage with insurance coverage</p>
              <div className="space-y-2">
                <div className="text-sm text-global-teal font-semibold">Avg. 4-8% APR</div>
                <div className="text-xs text-gray-500">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                  ) : (
                    `${metrics?.categoryBreakdown.vault || 0} assets available`
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Asset Data */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Live Asset Performance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real-time data from our tokenized asset portfolio</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-global-teal">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-poppins font-semibold text-charcoal">Portfolio Value</h3>
                <Icon name="chart-line-up" className="text-green-600" size={12} />
              </div>
              <div className="text-3xl font-poppins font-bold text-global-teal mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
                ) : (
                  AssetMetricsService.formatCurrency(metrics?.totalValue || 0)
                )}
              </div>
              <div className="text-sm text-gray-600">Total assets under management</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-edge-purple">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-poppins font-semibold text-charcoal">Active Assets</h3>
                <Icon name="layer-group" className="text-purple-600" size={12} />
              </div>
              <div className="text-3xl font-poppins font-bold text-edge-purple mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                ) : (
                  AssetMetricsService.formatNumber(metrics?.totalAssetsTokenized || 0)
                )}
              </div>
              <div className="text-sm text-gray-600">Assets currently tokenized</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-poppins font-semibold text-charcoal">Average Return</h3>
                <Icon name="trophy" className="text-green-600" size={12} />
              </div>
              <div className="text-3xl font-poppins font-bold text-green-600 mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                ) : (
                  `${metrics?.averageAPR || 0}%`
                )}
              </div>
              <div className="text-sm text-gray-600">Annual percentage return</div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/assets" className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors inline-flex items-center">
              View All Assets
              <Icon name="arrow-right" className="ml-2" size={8} />
            </Link>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Security & Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Built with institutional-grade security and regulatory compliance</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/security" className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="shield-halved" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors">KYC/KYB Verification</h3>
              <p className="text-gray-600">Comprehensive identity verification for all participants using industry-leading providers</p>
            </Link>
            <Link href="/security" className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="lock" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors">Secure Custody</h3>
              <p className="text-gray-600">Multi-signature wallets and cold storage with institutional-grade security protocols</p>
            </Link>
            <Link href="/security" className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="certificate" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors">Oracle Attestations</h3>
              <p className="text-gray-600">Third-party verification of asset condition, location, and performance metrics</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-lg font-poppins font-medium text-gray-600 mb-8">Trusted by leading logistics and financial partners</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {landingPagePartners.map((partner) => (
              <div key={partner.id} className="flex justify-center">
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group transition-all duration-300 hover:opacity-100 hover:scale-105"
                  title={partner.description}
                >
                  <div className="w-24 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={80}
                      height={40}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Hide the logo if it fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Teaser */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Latest Insights</h2>
              <p className="text-xl text-gray-600">Stay informed about market trends and opportunities</p>
            </div>
            <Link href="/insights" className="text-global-teal font-medium hover:text-edge-purple transition-colors">
              View All Articles
              <Icon name="arrow-right" className="ml-2" size={8} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img className="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8e8f5f1206-41f8ac9516fc7c159218.png" alt="global shipping containers at port with sunset, modern logistics, professional photography" />
              <div className="p-6">
                <div className="text-sm text-global-teal font-medium mb-2">CONTAINERS</div>
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Global Container Demand Surges 23% in Q4</h3>
                <p className="text-gray-600 mb-4">Supply chain disruptions drive increased demand for container investments as shipping rates reach record highs.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Dec 15, 2024</span>
                  <span className="mx-2">•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img className="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b3863df69d-7dea45524a67663901de.png" alt="modern commercial real estate building with glass facade, urban architecture, professional photography" />
              <div className="p-6">
                <div className="text-sm text-green-600 font-medium mb-2">PROPERTY</div>
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Commercial Real Estate Tokenization Trends</h3>
                <p className="text-gray-600 mb-4">How blockchain technology is transforming property investment accessibility and liquidity.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Dec 12, 2024</span>
                  <span className="mx-2">•</span>
                  <span>7 min read</span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img className="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ccb48f0bea-8f317986dc05f173e4bb.png" alt="commodity trading floor with gold bars and precious metals, financial markets, professional photography" />
              <div className="p-6">
                <div className="text-sm text-orange-600 font-medium mb-2">VAULT</div>
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Precious Metals as Portfolio Diversification</h3>
                <p className="text-gray-600 mb-4">Strategic allocation to gold and silver tokens provides inflation hedge for modern portfolios.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Dec 10, 2024</span>
                  <span className="mx-2">•</span>
                  <span>6 min read</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-global-teal to-edge-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
            Ready to Own the Edge of the World?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of investors already earning returns from tokenized real-world assets
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/get-started" className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
              Start Investing Today
            </Link>
            <a href="https://calendly.com/mohammed-sidat-/global-next-global-edge" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors">
              Become a Partner
            </a>
          </div>
        </div>
      </section>
    </>
  );
}