
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general');

  const scrollToSection = (category: string) => {
    setActiveCategory(category);
    const sectionId = `${category}-faq`;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <>
      {/* COMPONENT: FAQ Hero */}
      <section id="faq-hero" className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <div className="flex items-center mb-4">
                      <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">FAQ</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      Frequently Asked Questions
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Find answers to common questions about tokenized assets, investing, and our platform.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: FAQ Categories */}
      <section id="faq-categories" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Browse by Category</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">Find answers organized by topic</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-16">
                  <button 
                      onClick={() => scrollToSection('general')}
                      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group ${
                          activeCategory === 'general' ? 'border-2 border-global-teal' : 'border-2 border-transparent'
                      }`}
                  >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          activeCategory === 'general' ? 'bg-global-teal' : 'bg-gray-100 group-hover:bg-global-teal'
                      } transition-colors`}>
                          <Icon name="question-mark-circle" className={`text-xl ${
                              activeCategory === 'general' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                          } transition-colors`} />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">General</h3>
                      <p className="text-sm text-gray-600">Platform basics and general questions</p>
                  </button>

                  <button 
                      onClick={() => scrollToSection('investing')}
                      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group ${
                          activeCategory === 'investing' ? 'border-2 border-blue-500' : 'border-2 border-transparent'
                      }`}
                  >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          activeCategory === 'investing' ? 'bg-blue-500' : 'bg-blue-100 group-hover:bg-blue-500'
                      } transition-colors`}>
                          <Icon name="chart-line" className={`text-xl ${
                              activeCategory === 'investing' ? 'text-white' : 'text-blue-600 group-hover:text-white'
                          } transition-colors`} />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Investing</h3>
                      <p className="text-sm text-gray-600">Investment process and requirements</p>
                  </button>

                  <button 
                      onClick={() => scrollToSection('security')}
                      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group ${
                          activeCategory === 'security' ? 'border-2 border-green-500' : 'border-2 border-transparent'
                      }`}
                  >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          activeCategory === 'security' ? 'bg-green-500' : 'bg-green-100 group-hover:bg-green-500'
                      } transition-colors`}>
                          <Icon name="shield-halved" className={`text-xl ${
                              activeCategory === 'security' ? 'text-white' : 'text-green-600 group-hover:text-white'
                          } transition-colors`} />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Security</h3>
                      <p className="text-sm text-gray-600">Security measures and compliance</p>
                  </button>

                  <button 
                      onClick={() => scrollToSection('payments')}
                      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group ${
                          activeCategory === 'payments' ? 'border-2 border-purple-500' : 'border-2 border-transparent'
                      }`}
                  >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          activeCategory === 'payments' ? 'bg-purple-500' : 'bg-purple-100 group-hover:bg-purple-500'
                      } transition-colors`}>
                          <Icon name="credit-card" className={`text-xl ${
                              activeCategory === 'payments' ? 'text-white' : 'text-purple-600 group-hover:text-white'
                          } transition-colors`} />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Payments</h3>
                      <p className="text-sm text-gray-600">Payment methods and fees</p>
                  </button>
              </div>
          </div>
      </section>

      {/* COMPONENT: General FAQ */}
      <section id="general-faq" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">General Questions</h2>

              <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What is Global Edge?</h3>
                      <p className="text-gray-600">Global Edge is a platform that tokenizes real-world assets like shipping containers, real estate, and trade inventory, allowing investors to own fractional shares of these assets through blockchain technology. We provide transparency, liquidity, and accessibility to traditionally illiquid investments.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">How does asset tokenization work?</h3>
                      <p className="text-gray-600">Asset tokenization involves converting ownership rights of physical assets into digital tokens on a blockchain. Each token represents a fractional ownership stake in the underlying asset. This process includes legal documentation, asset verification, smart contract deployment, and ongoing monitoring through oracle networks.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What types of assets can I invest in?</h3>
                      <p className="text-gray-600">You can invest in four main categories: Shipping Containers (with GPS tracking and cargo verification), Real Estate (commercial and residential properties), Trade Tokens (commodity inventory with supply chain data), and Vault Assets (precious metals with secure storage and insurance).</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Is Global Edge regulated?</h3>
                      <p className="text-gray-600">Yes, Global Edge operates under strict regulatory compliance including KYC/AML requirements, SOC 2 Type II certification, and adherence to international financial regulations. We work with licensed custodians and maintain full transparency in all our operations.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Investing FAQ */}
      <section id="investing-faq" className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Investing Questions</h2>

              <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What is the minimum investment amount?</h3>
                      <p className="text-gray-600">The minimum investment varies by asset type, but most assets can be invested in with as little as $50. Some premium assets may have higher minimums, typically ranging from $100 to $1,000. This low barrier to entry makes tokenized assets accessible to a wide range of investors.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">How do I earn returns on my investments?</h3>
                      <p className="text-gray-600">Returns come from multiple sources depending on the asset type: rental income from real estate, freight fees from shipping containers, commodity appreciation from trade tokens, and storage fees from vault assets. Returns are typically distributed monthly or upon asset maturity.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Can I sell my tokens before maturity?</h3>
                      <p className="text-gray-600">Yes, we operate a secondary market where you can trade your tokens with other investors. While some assets have specific maturity dates, the secondary market provides liquidity if you need to exit your position early. Trading fees apply to secondary market transactions.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What are the typical investment terms?</h3>
                      <p className="text-gray-600">Investment terms vary by asset type: Shipping containers typically have 30-90 day terms, real estate investments range from 1-5 years, trade tokens have 60-180 day terms, and vault assets can be held indefinitely. All terms are clearly disclosed before investment.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">How are asset values determined?</h3>
                      <p className="text-gray-600">Asset values are determined through multiple methods: independent appraisals for real estate, market rates for shipping containers, commodity prices for trade tokens, and spot prices for precious metals. All valuations are verified by third-party oracles and updated regularly.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Security FAQ */}
      <section id="security-faq" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Security Questions</h2>

              <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">How are my assets protected?</h3>
                      <p className="text-gray-600">Your assets are protected by multiple layers of security: cold storage for digital assets, multi-signature wallets, comprehensive insurance coverage ($500M for physical assets, $100M for custody), and regulatory compliance. We use institutional-grade security measures that exceed industry standards.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What happens if there's a security breach?</h3>
                      <p className="text-gray-600">In the unlikely event of a security breach, our comprehensive insurance coverage protects your investments. We have incident response procedures, 24/7 monitoring, and automated threat detection. All critical systems are backed up and we maintain business continuity plans.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">How do you verify asset ownership and condition?</h3>
                      <p className="text-gray-600">We use a network of trusted oracles and third-party verification services. Physical assets are inspected by certified professionals, legal ownership is verified through title searches, and ongoing condition monitoring uses IoT sensors and GPS tracking. All verification data is recorded on the blockchain.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Is my personal information secure?</h3>
                      <p className="text-gray-600">Yes, we use end-to-end encryption for all data transmission and storage. We're GDPR compliant and follow strict data protection protocols. Your personal information is only used for KYC/AML compliance and is never shared with third parties without your consent.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Payments FAQ */}
      <section id="payments-faq" className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Payment Questions</h2>

              <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What payment methods do you accept?</h3>
                      <p className="text-gray-600">We accept bank transfers, wire transfers, and major cryptocurrencies including Bitcoin, Ethereum, and USDC. All payments are processed securely through our regulated payment partners. Bank transfers are typically processed within 1-3 business days, while crypto payments are instant.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What are the fees for investing?</h3>
                      <p className="text-gray-600">Our fee structure is transparent: Investment fees are 1.5-2.5% (one-time on purchases), there are no management fees, secondary market trading fees are 0.1%, and withdrawal fees are $5 flat. Pro and Enterprise accounts receive reduced investment fees.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">How do I withdraw my earnings?</h3>
                      <p className="text-gray-600">You can withdraw earnings through your dashboard. Withdrawals are processed to your verified bank account or crypto wallet. Processing times are 1-3 business days for bank transfers and instant for crypto withdrawals. A $5 withdrawal fee applies to all transactions.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Are there any hidden fees?</h3>
                      <p className="text-gray-600">No hidden fees. All our fees are clearly displayed upfront in our transparent fee structure. You only pay the fees shown: investment fees, trading fees, and withdrawal fees. There are no management fees, account maintenance fees, or hidden charges.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Contact Support */}
      <section id="contact-support" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Still Have Questions?</h2>
              <p className="text-xl text-gray-600 mb-8">Our support team is here to help you with any questions or concerns.</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon name="envelope" className="text-blue-600 text-2xl" />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Email Support</h3>
                      <p className="text-sm text-gray-600 mb-4">Get help via email within 24 hours</p>
                      <a href="mailto:info@globalnext.rocks" className="text-global-teal hover:text-edge-purple font-medium">info@globalnext.rocks</a>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon name="chat-bubble-left-right" className="text-green-600 text-2xl" />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Live Chat</h3>
                      <p className="text-sm text-gray-600 mb-4">Chat with our support team in real-time</p>
                      <button className="text-global-teal hover:text-edge-purple font-medium">Start Chat</button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon name="phone" className="text-purple-600 text-2xl" />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Phone Support</h3>
                      <p className="text-sm text-gray-600 mb-4">Call us for urgent matters</p>
                      <a href="tel:+1-555-123-4567" className="text-global-teal hover:text-edge-purple font-medium">+1 (555) 123-4567</a>
                  </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Schedule a Call</h3>
                  <p className="text-gray-600 mb-6">Book a personalized consultation with our investment specialists</p>
                  <button className="bg-global-teal text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                      Schedule Consultation
                  </button>
              </div>
          </div>
      </section>
    </>
  );
}
