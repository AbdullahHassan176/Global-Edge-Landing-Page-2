'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function InvestmentGuidePage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: 'rocket' },
    { id: 'asset-types', title: 'Asset Types', icon: 'chart-line' },
    { id: 'risk-management', title: 'Risk Management', icon: 'shield' },
    { id: 'tax-considerations', title: 'Tax Considerations', icon: 'file-alt' },
    { id: 'faq', title: 'FAQ', icon: 'question' }
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Investment Guide
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Everything you need to know about investing in tokenized real-world assets with Global Edge.
            </p>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
                <h3 className="text-xl font-poppins font-bold text-charcoal mb-6">Guide Sections</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-global-teal text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon name={section.icon} className="text-sm" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                {/* Getting Started */}
                {activeSection === 'getting-started' && (
                  <div>
                    <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Getting Started</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">What is Asset Tokenization?</h3>
                        <p className="text-gray-600 mb-4">
                          Asset tokenization is the process of converting real-world assets into digital tokens on a blockchain. 
                          This allows for fractional ownership, increased liquidity, and transparent trading of traditionally illiquid assets.
                        </p>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-blue-800">
                            <strong>Example:</strong> A $10 million commercial property can be tokenized into 1,000,000 tokens, 
                            each representing $10 worth of ownership.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Why Invest in Tokenized Assets?</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <Icon name="check" className="text-green-500 mr-2 mt-1" />
                            <span><strong>Lower Barriers:</strong> Invest in premium assets with as little as $50</span>
                          </li>
                          <li className="flex items-start">
                            <Icon name="check" className="text-green-500 mr-2 mt-1" />
                            <span><strong>Diversification:</strong> Access multiple asset classes and geographic regions</span>
                          </li>
                          <li className="flex items-start">
                            <Icon name="check" className="text-green-500 mr-2 mt-1" />
                            <span><strong>Transparency:</strong> All transactions and ownership are recorded on blockchain</span>
                          </li>
                          <li className="flex items-start">
                            <Icon name="check" className="text-green-500 mr-2 mt-1" />
                            <span><strong>Liquidity:</strong> Trade tokens on secondary markets</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Getting Started Steps</h3>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-global-teal rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">1</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-charcoal">Create Account</h4>
                              <p className="text-gray-600">Sign up with your email and create a secure password</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-global-teal rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">2</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-charcoal">Complete KYC</h4>
                              <p className="text-gray-600">Verify your identity with government-issued ID</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-global-teal rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">3</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-charcoal">Fund Your Account</h4>
                              <p className="text-gray-600">Deposit funds via bank transfer or cryptocurrency</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-global-teal rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">4</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-charcoal">Start Investing</h4>
                              <p className="text-gray-600">Browse available assets and make your first investment</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Asset Types */}
                {activeSection === 'asset-types' && (
                  <div>
                    <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Asset Types</h2>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Icon name="building" className="text-blue-600 text-2xl mr-3" />
                            <h3 className="text-xl font-poppins font-semibold text-charcoal">Real Estate</h3>
                          </div>
                          <p className="text-gray-600 mb-4">
                            Commercial and residential properties with stable rental income and appreciation potential.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Expected Returns: 6-12% APR</li>
                            <li>• Risk Level: Medium</li>
                            <li>• Minimum Investment: $100</li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Icon name="truck" className="text-green-600 text-2xl mr-3" />
                            <h3 className="text-xl font-poppins font-semibold text-charcoal">Shipping Containers</h3>
                          </div>
                          <p className="text-gray-600 mb-4">
                            High-demand shipping containers with predictable lease income and global trade exposure.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Expected Returns: 8-15% APR</li>
                            <li>• Risk Level: Medium-Low</li>
                            <li>• Minimum Investment: $50</li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Icon name="chart-line" className="text-purple-600 text-2xl mr-3" />
                            <h3 className="text-xl font-poppins font-semibold text-charcoal">Trade Tokens</h3>
                          </div>
                          <p className="text-gray-600 mb-4">
                            Commodity-backed tokens representing physical goods like precious metals and agricultural products.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Expected Returns: 5-20% APR</li>
                            <li>• Risk Level: Medium-High</li>
                            <li>• Minimum Investment: $25</li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Icon name="vault" className="text-orange-600 text-2xl mr-3" />
                            <h3 className="text-xl font-poppins font-semibold text-charcoal">Vault Storage</h3>
                          </div>
                          <p className="text-gray-600 mb-4">
                            Secure storage facilities for valuable items with insurance and 24/7 monitoring.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Expected Returns: 4-8% APR</li>
                            <li>• Risk Level: Low</li>
                            <li>• Minimum Investment: $200</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Risk Management */}
                {activeSection === 'risk-management' && (
                  <div>
                    <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Risk Management</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Our Risk Management Framework</h3>
                        <p className="text-gray-600 mb-4">
                          Global Edge employs a comprehensive risk management approach to protect investor capital and ensure sustainable returns.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-50 rounded-lg p-6">
                          <Icon name="shield" className="text-red-600 text-2xl mb-3" />
                          <h4 className="font-semibold text-charcoal mb-2">Due Diligence</h4>
                          <p className="text-gray-600 text-sm">
                            Every asset undergoes rigorous due diligence including financial analysis, legal review, and market assessment.
                          </p>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6">
                          <Icon name="eye" className="text-blue-600 text-2xl mb-3" />
                          <h4 className="font-semibold text-charcoal mb-2">Insurance Coverage</h4>
                          <p className="text-gray-600 text-sm">
                            All assets are fully insured against physical damage, theft, and other covered risks.
                          </p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-6">
                          <Icon name="chart-bar" className="text-green-600 text-2xl mb-3" />
                          <h4 className="font-semibold text-charcoal mb-2">Diversification</h4>
                          <p className="text-gray-600 text-sm">
                            Portfolio diversification across asset types, geographies, and risk profiles to minimize concentration risk.
                          </p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-6">
                          <Icon name="lock" className="text-purple-600 text-2xl mb-3" />
                          <h4 className="font-semibold text-charcoal mb-2">Blockchain Security</h4>
                          <p className="text-gray-600 text-sm">
                            All transactions and ownership records are secured on blockchain with multi-signature wallets.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Risk Factors to Consider</h3>
                        <div className="bg-yellow-50 rounded-lg p-6">
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <Icon name="exclamation-triangle" className="text-yellow-600 mr-2 mt-1" />
                              <span><strong>Market Risk:</strong> Asset values can fluctuate based on market conditions</span>
                            </li>
                            <li className="flex items-start">
                              <Icon name="exclamation-triangle" className="text-yellow-600 mr-2 mt-1" />
                              <span><strong>Liquidity Risk:</strong> Some assets may have limited secondary market liquidity</span>
                            </li>
                            <li className="flex items-start">
                              <Icon name="exclamation-triangle" className="text-yellow-600 mr-2 mt-1" />
                              <span><strong>Regulatory Risk:</strong> Changes in regulations may affect tokenized assets</span>
                            </li>
                            <li className="flex items-start">
                              <Icon name="exclamation-triangle" className="text-yellow-600 mr-2 mt-1" />
                              <span><strong>Technology Risk:</strong> Blockchain technology risks and smart contract vulnerabilities</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tax Considerations */}
                {activeSection === 'tax-considerations' && (
                  <div>
                    <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Tax Considerations</h2>
                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Important Tax Disclaimer</h3>
                        <p className="text-gray-600 mb-4">
                          The information provided here is for general educational purposes only and does not constitute tax advice. 
                          Tax treatment of tokenized assets varies by jurisdiction and individual circumstances.
                        </p>
                        <p className="text-gray-600">
                          <strong>We strongly recommend consulting with a qualified tax professional</strong> before making any investment decisions.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">General Tax Considerations</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-charcoal mb-2">Capital Gains Tax</h4>
                            <p className="text-gray-600">
                              Profits from selling tokenized assets may be subject to capital gains tax, depending on your jurisdiction and holding period.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-charcoal mb-2">Income Tax</h4>
                            <p className="text-gray-600">
                              Regular distributions or rental income from tokenized assets may be subject to income tax in the year received.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-charcoal mb-2">Reporting Requirements</h4>
                            <p className="text-gray-600">
                              You may be required to report your tokenized asset holdings and transactions to tax authorities.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Documentation</h3>
                        <p className="text-gray-600 mb-4">
                          Global Edge provides comprehensive tax documentation including:
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <Icon name="check" className="text-green-500 mr-2 mt-1" />
                            <span>Annual tax statements with all transactions</span>
                          </li>
                          <li className="flex items-start">
                            <Icon name="check" className="text-green-500 mr-2 mt-1" />
                            <span>Cost basis tracking for capital gains calculations</span>
                          </li>
                          <li className="flex items-start">
                            <Icon name="check" className="text-green-500 mr-2 mt-1" />
                            <span>Income distribution records</span>
                          </li>
                          <li className="flex items-start">
                            <Icon name="check" className="text-green-500 mr-2 mt-1" />
                            <span>Blockchain transaction history</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ */}
                {activeSection === 'faq' && (
                  <div>
                    <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-poppins font-semibold text-charcoal mb-3">What is the minimum investment amount?</h3>
                        <p className="text-gray-600">
                          The minimum investment varies by asset type, ranging from $25 for trade tokens to $200 for vault storage. 
                          Most real estate and shipping container investments start at $50-100.
                        </p>
                      </div>

                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-poppins font-semibold text-charcoal mb-3">How do I receive returns on my investments?</h3>
                        <p className="text-gray-600">
                          Returns are typically distributed monthly or quarterly, depending on the asset type. 
                          You can choose to receive distributions in your account balance or reinvest them automatically.
                        </p>
                      </div>

                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-poppins font-semibold text-charcoal mb-3">Can I sell my tokens before maturity?</h3>
                        <p className="text-gray-600">
                          Yes, most tokenized assets can be traded on our secondary market. However, liquidity may vary depending on the asset type and market conditions.
                        </p>
                      </div>

                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-poppins font-semibold text-charcoal mb-3">What happens if the underlying asset loses value?</h3>
                        <p className="text-gray-600">
                          Token values are tied to the underlying asset performance. While we conduct thorough due diligence and maintain insurance coverage, 
                          asset values can fluctuate. Diversification across multiple assets helps mitigate this risk.
                        </p>
                      </div>

                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-poppins font-semibold text-charcoal mb-3">How secure is my investment?</h3>
                        <p className="text-gray-600">
                          We use enterprise-grade security including multi-signature wallets, cold storage, and regular security audits. 
                          All transactions are recorded on blockchain for transparency and immutability.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-poppins font-semibold text-charcoal mb-3">Do you provide customer support?</h3>
                        <p className="text-gray-600">
                          Yes, we offer 24/7 customer support via email, chat, and phone. Our dedicated support team can help with account questions, 
                          investment guidance, and technical issues.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-global-teal to-edge-purple">
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
              Get Started
            </Link>
            <Link 
              href="/investors" 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors"
            >
              Back to Investors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
