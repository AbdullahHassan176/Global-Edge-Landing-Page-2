
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function PricingPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleUpgradeToPro = () => {
    setShowUpgradeModal(true);
  };

  const handleContactSales = () => {
    setShowContactModal(true);
  };
  return (
    <>
      {/* COMPONENT: Pricing Hero */}
      <section id="pricing-hero" className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <div className="flex items-center mb-4">
                      <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">PRICING</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      Transparent Pricing for Tokenized Assets
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Simple, transparent pricing with no hidden fees. Pay only for what you use.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Pricing Plans */}
      <section id="pricing-plans" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Choose Your Plan</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">Flexible pricing options for investors of all sizes</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Basic Plan */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                      <div className="text-center mb-8">
                          <h3 className="text-2xl font-poppins font-bold text-charcoal mb-2">Basic</h3>
                          <p className="text-gray-600 mb-4">Perfect for individual investors</p>
                          <div className="text-4xl font-poppins font-bold text-global-teal mb-2">Free</div>
                          <p className="text-sm text-gray-500">No monthly fees</p>
                      </div>
                      <ul className="space-y-4 mb-8">
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Access to all tokenized assets</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Basic portfolio tracking</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Email support</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Standard transaction fees (2.5%)</span>
                          </li>
                      </ul>
                      <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                          Current Plan
                      </button>
                  </div>

                  {/* Pro Plan */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-global-teal relative">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-global-teal text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                      </div>
                      <div className="text-center mb-8">
                          <h3 className="text-2xl font-poppins font-bold text-charcoal mb-2">Pro</h3>
                          <p className="text-gray-600 mb-4">For serious investors</p>
                          <div className="text-4xl font-poppins font-bold text-global-teal mb-2">$29</div>
                          <p className="text-sm text-gray-500">per month</p>
                      </div>
                      <ul className="space-y-4 mb-8">
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Everything in Basic</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Advanced analytics & insights</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Priority customer support</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Reduced transaction fees (1.5%)</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Early access to new assets</span>
                          </li>
                      </ul>
                      <button 
                          onClick={handleUpgradeToPro}
                          className="w-full bg-global-teal text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
                      >
                          Upgrade to Pro
                      </button>
                  </div>

                  {/* Enterprise Plan */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                      <div className="text-center mb-8">
                          <h3 className="text-2xl font-poppins font-bold text-charcoal mb-2">Enterprise</h3>
                          <p className="text-gray-600 mb-4">For institutions & large investors</p>
                          <div className="text-4xl font-poppins font-bold text-global-teal mb-2">Custom</div>
                          <p className="text-sm text-gray-500">Contact us for pricing</p>
                      </div>
                      <ul className="space-y-4 mb-8">
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Everything in Pro</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Dedicated account manager</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Custom reporting & API access</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">White-label solutions</span>
                          </li>
                          <li className="flex items-center">
                              
                              <span className="text-gray-700">Negotiated transaction fees</span>
                          </li>
                      </ul>
                      <button 
                          onClick={handleContactSales}
                          className="w-full bg-edge-purple text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
                      >
                          Contact Sales
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Fee Structure */}
      <section id="fee-structure" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Transparent Fee Structure</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">No hidden fees, no surprises. Here's exactly what you pay.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Investment Fees</h3>
                      <div className="text-3xl font-poppins font-bold text-global-teal mb-2">1.5-2.5%</div>
                      <p className="text-sm text-gray-600">One-time fee on asset purchases</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Management Fees</h3>
                      <div className="text-3xl font-poppins font-bold text-global-teal mb-2">0%</div>
                      <p className="text-sm text-gray-600">No ongoing management fees</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Trading Fees</h3>
                      <div className="text-3xl font-poppins font-bold text-global-teal mb-2">0.1%</div>
                      <p className="text-sm text-gray-600">Per secondary market trade</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Withdrawal Fees</h3>
                      <div className="text-3xl font-poppins font-bold text-global-teal mb-2">$5</div>
                      <p className="text-sm text-gray-600">Flat fee per withdrawal</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: FAQ */}
      <section id="pricing-faq" className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
                  <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
              </div>

              <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What's included in the free plan?</h3>
                      <p className="text-gray-600">The free plan includes access to all tokenized assets, basic portfolio tracking, email support, and standard transaction fees. Perfect for individual investors getting started.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Can I change plans anytime?</h3>
                      <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any fees accordingly.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Are there any hidden fees?</h3>
                      <p className="text-gray-600">No hidden fees. All our fees are clearly displayed upfront. You only pay the fees shown in our transparent fee structure.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What payment methods do you accept?</h3>
                      <p className="text-gray-600">We accept bank transfers, wire transfers, and major cryptocurrencies including Bitcoin, Ethereum, and USDC for investments and subscription payments.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: CTA Section */}
      <section id="pricing-cta" className="py-20 bg-gradient-to-br from-global-teal to-edge-purple">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
                  Ready to Start Investing?
              </h2>
              <p className="text-xl text-white opacity-90 mb-8">
                  Join thousands of investors earning returns from tokenized real-world assets
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
                      Start Free Today
                  </button>
                  <button 
                      onClick={handleContactSales}
                      className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors"
                  >
                      Contact Sales
                  </button>
              </div>
          </div>
      </section>

      {/* Upgrade to Pro Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Upgrade to Pro</h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Upgrade to Pro to unlock advanced features:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Icon name="check-circle" className="text-green-500 mr-2" />
                  Advanced portfolio analytics
                </li>
                <li className="flex items-center">
                  <Icon name="check-circle" className="text-green-500 mr-2" />
                  Priority customer support
                </li>
                <li className="flex items-center">
                  <Icon name="check-circle" className="text-green-500 mr-2" />
                  Early access to new assets
                </li>
                <li className="flex items-center">
                  <Icon name="check-circle" className="text-green-500 mr-2" />
                  Reduced transaction fees
                </li>
              </ul>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <Link
                  href="/register"
                  className="flex-1 bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-center"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Sales Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Contact Sales</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Get in touch with our sales team for custom pricing and enterprise solutions.</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Icon name="envelope" className="text-global-teal mr-3" />
                  <a href="mailto:info@globalnext.rocks?subject=Sales Inquiry" className="text-global-teal hover:text-edge-purple">
                    info@globalnext.rocks
                  </a>
                </div>
                <div className="flex items-center">
                  <Icon name="phone" className="text-global-teal mr-3" />
                  <a href="tel:+1-555-123-4567" className="text-global-teal hover:text-edge-purple">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-full bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
