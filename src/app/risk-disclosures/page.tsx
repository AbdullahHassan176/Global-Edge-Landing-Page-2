
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function RiskDisclosuresPage() {
  return (
    <>
      {/* COMPONENT: Risk Disclosures Hero */}
      <section id="risk-disclosures-hero" className="bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <div className="flex items-center mb-4">
                      <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">RISK DISCLOSURES</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      Important Risk Disclosures
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Please read these risk disclosures carefully before investing. All investments carry risk of loss.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Risk Warning */}
      <section id="risk-warning" className="py-12 bg-red-50 border-b-4 border-red-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
                  <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="exclamation-triangle" className="text-red-600 text-xl" />
                      </div>
                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-red-800 mb-4">Important Risk Warning</h2>
                          <p className="text-red-700 leading-relaxed text-lg">
                              <strong>Investing in tokenized assets involves significant risks and may result in the loss of your entire investment.</strong> 
                              You should carefully consider whether investing in these assets is suitable for you in light of your circumstances, 
                              knowledge, and financial resources. Past performance is not indicative of future results.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: General Investment Risks */}
      <section id="general-risks" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">General Investment Risks</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">All investments carry inherent risks that you should understand</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                          <Icon name="chart-line" className="text-red-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Market Risk</h3>
                      <p className="text-gray-600">Asset values may fluctuate due to market conditions, economic factors, and supply and demand dynamics. You may lose money even if the underlying asset performs well.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                          <Icon name="clock" className="text-orange-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Liquidity Risk</h3>
                      <p className="text-gray-600">Tokenized assets may have limited liquidity. You may not be able to sell your tokens quickly or at fair market value, especially during market stress.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-yellow-500">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                          <Icon name="shield-halved" className="text-yellow-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Regulatory Risk</h3>
                      <p className="text-gray-600">Changes in laws, regulations, or government policies may adversely affect the value of your investments or the platform's ability to operate.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                          <Icon name="cog" className="text-purple-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Technology Risk</h3>
                      <p className="text-gray-600">Blockchain technology and smart contracts may have bugs, vulnerabilities, or technical failures that could result in loss of funds or platform disruption.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                          <Icon name="users" className="text-blue-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Counterparty Risk</h3>
                      <p className="text-gray-600">The failure of service providers, custodians, or other third parties could result in loss of your investments or inability to access your funds.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                          <Icon name="exclamation-triangle" className="text-green-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Operational Risk</h3>
                      <p className="text-gray-600">Platform operations may be disrupted by cyber attacks, system failures, or other operational issues that could affect your ability to trade or access your investments.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Asset-Specific Risks */}
      <section id="asset-specific-risks" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Asset-Specific Risks</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">Different asset types carry unique risks you should understand</p>
              </div>

              <div className="space-y-12">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                              <Icon name="truck" className="text-blue-600 text-2xl" />
                          </div>
                          <div>
                              <h3 className="text-2xl font-poppins font-bold text-charcoal">Shipping Container Risks</h3>
                              <p className="text-gray-600">Containers are subject to unique operational and market risks</p>
                          </div>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                          <li>Weather and natural disaster risks that may damage cargo or delay shipments</li>
                          <li>Port congestion and shipping delays that may affect delivery schedules</li>
                          <li>Changes in global trade patterns and shipping demand</li>
                          <li>Cargo damage or loss during transit</li>
                          <li>Regulatory changes affecting international shipping</li>
                          <li>Fuel price volatility affecting shipping costs</li>
                      </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                              <Icon name="building" className="text-green-600 text-2xl" />
                          </div>
                          <div>
                              <h3 className="text-2xl font-poppins font-bold text-charcoal">Real Estate Risks</h3>
                              <p className="text-gray-600">Property investments carry specific market and operational risks</p>
                          </div>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                          <li>Property value fluctuations due to market conditions</li>
                          <li>Vacancy rates and rental income volatility</li>
                          <li>Property maintenance and repair costs</li>
                          <li>Changes in local zoning laws or regulations</li>
                          <li>Environmental issues or natural disasters</li>
                          <li>Interest rate changes affecting property values</li>
                      </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                              <Icon name="coins" className="text-purple-600 text-2xl" />
                          </div>
                          <div>
                              <h3 className="text-2xl font-poppins font-bold text-charcoal">Trade Token Risks</h3>
                              <p className="text-gray-600">Commodity and trade inventory tokens have specific market risks</p>
                          </div>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                          <li>Commodity price volatility and market fluctuations</li>
                          <li>Supply chain disruptions affecting inventory value</li>
                          <li>Quality issues or spoilage of stored commodities</li>
                          <li>Changes in global demand for specific commodities</li>
                          <li>Currency exchange rate fluctuations</li>
                          <li>Storage and insurance costs</li>
                      </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-6">
                              
                          </div>
                          <div>
                              <h3 className="text-2xl font-poppins font-bold text-charcoal">Vault Asset Risks</h3>
                              <p className="text-gray-600">Precious metals and secure storage carry specific risks</p>
                          </div>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                          <li>Precious metal price volatility</li>
                          <li>Storage facility security and insurance risks</li>
                          <li>Authentication and purity verification risks</li>
                          <li>Changes in industrial demand for precious metals</li>
                          <li>Currency fluctuations affecting metal prices</li>
                          <li>Regulatory changes affecting precious metal trading</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Risk Mitigation */}
      <section id="risk-mitigation" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Risk Mitigation Measures</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">We implement various measures to help mitigate investment risks</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">Due Diligence</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-3">
                          <li>Comprehensive asset verification and appraisal</li>
                          <li>Legal documentation and title verification</li>
                          <li>Third-party oracle attestations</li>
                          <li>Insurance coverage for physical assets</li>
                          <li>Regular monitoring and reporting</li>
                      </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">Diversification</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-3">
                          <li>Multiple asset types and geographies</li>
                          <li>Different investment terms and maturities</li>
                          <li>Varied risk profiles and return expectations</li>
                          <li>Secondary market liquidity options</li>
                          <li>Portfolio rebalancing recommendations</li>
                      </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">Transparency</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-3">
                          <li>Real-time asset tracking and monitoring</li>
                          <li>Blockchain-verified transaction records</li>
                          <li>Regular performance reporting</li>
                          <li>Open communication about risks</li>
                          <li>Accessible documentation and disclosures</li>
                      </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">Security</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-3">
                          <li>Multi-signature wallet security</li>
                          <li>Cold storage for digital assets</li>
                          <li>Comprehensive insurance coverage</li>
                          <li>Regular security audits</li>
                          <li>Incident response procedures</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Investment Suitability */}
      <section id="investment-suitability" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Investment Suitability</h2>
                  <p className="text-xl text-gray-600">Consider whether tokenized assets are suitable for your investment profile</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">These investments may be suitable for investors who:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8">
                      <li>Have a high risk tolerance and can afford to lose their entire investment</li>
                      <li>Understand the risks associated with tokenized assets and blockchain technology</li>
                      <li>Have sufficient financial resources to withstand potential losses</li>
                      <li>Are seeking diversification beyond traditional investments</li>
                      <li>Have a long-term investment horizon</li>
                      <li>Are comfortable with limited liquidity and secondary market trading</li>
                  </ul>

                  <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">These investments may NOT be suitable for investors who:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-3">
                      <li>Cannot afford to lose their entire investment</li>
                      <li>Need immediate liquidity or short-term access to funds</li>
                      <li>Are not comfortable with technology-related risks</li>
                      <li>Prefer traditional, regulated investment products</li>
                      <li>Have limited understanding of blockchain and tokenization</li>
                      <li>Are seeking guaranteed returns or principal protection</li>
                  </ul>
              </div>
          </div>
      </section>

      {/* COMPONENT: Final Warning */}
      <section id="final-warning" className="py-20 bg-red-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      
                  </div>
                  <h2 className="text-3xl font-poppins font-bold text-red-800 mb-6">Final Risk Warning</h2>
                  <p className="text-red-700 leading-relaxed text-lg mb-6">
                      <strong>You should only invest money that you can afford to lose completely.</strong> 
                      Tokenized assets are complex, high-risk investments that may not be suitable for all investors. 
                      Past performance is not indicative of future results.
                  </p>
                  <p className="text-red-700 leading-relaxed text-lg">
                      If you are unsure about the suitability of these investments for your circumstances, 
                      you should seek independent financial advice before investing.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Contact Information */}
      <section id="risk-contact" className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Questions About Risks?</h2>
              <p className="text-xl text-gray-600 mb-8">Contact our risk management team for more information</p>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="grid md:grid-cols-2 gap-8">
                      <div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Risk Management Team</h3>
                          <p className="text-gray-700">
                              Email: risk@globaledge.com<br />
                              Phone: +1 (555) 123-4567<br />
                              Available: Monday-Friday, 9 AM - 6 PM EST
                          </p>
                      </div>
                      <div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">General Support</h3>
                          <p className="text-gray-700">
                              Email: info@globalnext.rocks<br />
                              Phone: +1 (555) 123-4568<br />
                              Available: 24/7 for urgent matters
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
