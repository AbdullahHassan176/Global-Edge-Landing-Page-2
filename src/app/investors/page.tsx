'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import HeroSection from '@/components/ui/HeroSection';

export default function InvestorsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Investor Portal"
        subtitle="INVESTOR RESOURCES"
        description="Access your investment dashboard, track portfolio performance, and discover new opportunities in tokenized real-world assets."
        primaryButtonText="Access Dashboard"
        primaryButtonHref="/dashboard"
        secondaryButtonText="View Investment Guide"
        secondaryButtonHref="/guide"
        showArrow={true}
      />

      {/* Investor Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Why Invest with Global Edge?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Access institutional-grade investment opportunities with complete transparency and blockchain verification</p>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get started in minutes with our streamlined onboarding process</p>
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
            Join thousands of investors earning returns from tokenized real-world assets
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
