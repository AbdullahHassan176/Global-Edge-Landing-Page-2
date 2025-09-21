'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

export default function HowItWorksPage() {
  const [showListAssetModal, setShowListAssetModal] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  return (
    <>
      {/* Tokenization Hero */}
      <section className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[400px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">TOKENIZATION PROCESS</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
              How We Tokenize Real-World Assets
            </h1>
            <p className="text-xl font-inter font-light opacity-90">
              Complete transparency through our 5-step tokenization process with blockchain verification and oracle attestations
            </p>
          </div>
        </div>
      </section>

      {/* Tokenization Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins font-bold text-charcoal mb-4">Transparent Asset Tokenization</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Every asset goes through rigorous verification, documentation, and blockchain registration to ensure complete transparency and investor protection</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="shield" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Verified Assets</h3>
              <div className="text-3xl font-poppins font-bold text-blue-600 mb-1">1,247</div>
              <p className="text-sm text-gray-600">Successfully tokenized</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="clock" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Avg. Processing</h3>
              <div className="text-3xl font-poppins font-bold text-green-600 mb-1">7-14</div>
              <p className="text-sm text-gray-600">Business days</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="certificate" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Oracle Partners</h3>
              <div className="text-3xl font-poppins font-bold text-purple-600 mb-1">12+</div>
              <p className="text-sm text-gray-600">Verification providers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenization Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">5-Step Tokenization Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From asset verification to blockchain deployment, every step is documented and verified by third-party oracles</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-global-teal to-edge-purple hidden lg:block"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center lg:space-x-16">
                <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-global-teal to-aqua-start rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-poppins font-bold text-xl">1</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-poppins font-bold text-charcoal">Asset Verification</h3>
                        <p className="text-global-teal font-medium">Physical & Legal Validation</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">Independent third-party verification of asset existence, condition, ownership, and legal compliance. All documentation is reviewed by certified appraisers and legal experts.</p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Icon name="circle-check" className="text-green-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Physical inspection and condition assessment</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="circle-check" className="text-green-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Legal title and ownership verification</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="circle-check" className="text-green-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Regulatory compliance check</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="circle-check" className="text-green-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Insurance and risk assessment</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pl-8">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="search" className="text-blue-600 text-lg mb-2" size={8} />
                        <p className="text-sm font-medium text-gray-700">Inspection</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="gavel" className="text-blue-600 text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Legal Review</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="shield" className="text-blue-600 text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Insurance</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="clipboard" className="text-blue-600 text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Compliance</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Typical Duration</div>
                      <div className="text-xl font-poppins font-bold text-blue-600">3-5 Business Days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center lg:space-x-reverse lg:space-x-16">
                <div className="lg:w-1/2 lg:pl-8 mb-8 lg:mb-0">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-poppins font-bold text-xl">2</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-poppins font-bold text-charcoal">Documentation</h3>
                        <p className="text-green-600 font-medium">Legal Structure & Agreements</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">Creation of legal framework including Special Purpose Vehicle (SPV) formation, custody agreements, and investor protection mechanisms with regulatory compliance documentation.</p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Icon name="file-contract" className="text-green-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">SPV formation and registration</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="handshake-alt" className="text-green-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Custody and management agreements</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="users" className="text-green-500 mr-3" size={8} />
                        <span className="text-sm text-gray-700">Investor rights and protection terms</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="balance-scale" className="text-green-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Regulatory filing and compliance</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pr-8">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8">
                    <div className="space-y-4 mb-6">
                      <div className="bg-white rounded-lg p-4 flex items-center">
                        <Icon name="building" className="text-green-600 text-lg mr-4" size={12} />
                        <div>
                          <p className="font-medium text-gray-700">SPV Formation</p>
                          <p className="text-xs text-gray-500">Legal entity creation</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 flex items-center">
                        <Icon name="lock" className="text-green-600 text-lg mr-4" size={12} />
                        <div>
                          <p className="font-medium text-gray-700">Custody Setup</p>
                          <p className="text-xs text-gray-500">Secure asset management</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 flex items-center">
                        <Icon name="file-contract" className="text-green-600 text-lg mr-4" size={12} />
                        <div>
                          <p className="font-medium text-gray-700">Legal Agreements</p>
                          <p className="text-xs text-gray-500">Terms and conditions</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Typical Duration</div>
                      <div className="text-xl font-poppins font-bold text-green-600">2-3 Business Days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row items-center lg:space-x-16">
                <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-400 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-poppins font-bold text-xl">3</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-poppins font-bold text-charcoal">Oracle Integration</h3>
                        <p className="text-purple-600 font-medium">Real-Time Data Feeds</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">Integration with trusted oracle networks for continuous monitoring of asset performance, location tracking, condition updates, and market valuation with automated reporting systems.</p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Icon name="satellite-dish" className="text-purple-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">GPS and IoT sensor deployment</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="chart-line-up" className="text-purple-500 mr-3" size={8} />
                        <span className="text-sm text-gray-700">Market valuation feeds</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="heart" className="text-purple-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Condition monitoring systems</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="database" className="text-purple-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Automated reporting and alerts</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pl-8">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="location-dot" className="text-purple-600 text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Location</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="thermometer" className="text-purple-600 text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Condition</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="dollar-sign" className="text-purple-600 text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Valuation</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="bell" className="text-purple-600 text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Alerts</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Integration Time</div>
                      <div className="text-xl font-poppins font-bold text-purple-600">1-2 Business Days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col lg:flex-row-reverse items-center lg:space-x-reverse lg:space-x-16">
                <div className="lg:w-1/2 lg:pl-8 mb-8 lg:mb-0">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-poppins font-bold text-xl">4</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-poppins font-bold text-charcoal">Smart Contract Deployment</h3>
                        <p className="text-orange-600 font-medium">Blockchain Implementation</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">Development and deployment of audited smart contracts that govern token mechanics, ownership rights, revenue distribution, and investor protections on the blockchain network.</p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Icon name="file-code" className="text-orange-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Smart contract development</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="bug" className="text-orange-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Security audit and testing</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="rocket" className="text-orange-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Mainnet deployment</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="cog" className="text-orange-500 mr-3" size={12} />
                        <span className="text-sm text-gray-700">Parameter configuration</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pr-8">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-8">
                    <div className="space-y-4 mb-6">
                      <div className="bg-white rounded-lg p-4 flex items-center">
                        <Icon name="file-code" className="text-orange-600 text-lg mr-4" size={12} />
                        <div>
                          <p className="font-medium text-gray-700">Contract Development</p>
                          <p className="text-xs text-gray-500">Custom token logic</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 flex items-center">
                        <Icon name="shield" className="text-orange-600 text-lg mr-4" size={12} />
                        <div>
                          <p className="font-medium text-gray-700">Security Audit</p>
                          <p className="text-xs text-gray-500">Third-party verification</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 flex items-center">
                        <Icon name="cloud-arrow-up" className="text-orange-600 text-lg mr-4" size={12} />
                        <div>
                          <p className="font-medium text-gray-700">Deployment</p>
                          <p className="text-xs text-gray-500">Live on blockchain</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Development Time</div>
                      <div className="text-xl font-poppins font-bold text-orange-600">3-5 Business Days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col lg:flex-row items-center lg:space-x-16">
                <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-poppins font-bold text-xl">5</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-poppins font-bold text-charcoal">Market Launch</h3>
                        <p className="text-global-teal font-medium">Public Availability</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">Final compliance review, investor onboarding systems activation, and public listing of tokenized asset with full transparency dashboard and ongoing monitoring capabilities.</p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Icon name="clipboard" className="text-global-teal mr-3" size={12} />
                        <span className="text-sm text-gray-700">Final compliance review</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="users-gear" className="text-global-teal mr-3" size={12} />
                        <span className="text-sm text-gray-700">Investor onboarding activation</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="store" className="text-global-teal mr-3" size={12} />
                        <span className="text-sm text-gray-700">Public marketplace listing</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="chart-column" className="text-global-teal mr-3" size={12} />
                        <span className="text-sm text-gray-700">Performance dashboard activation</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pl-8">
                  <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl p-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="check-double" className="text-global-teal text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Compliance</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="door-open" className="text-global-teal text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Onboarding</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="globe" className="text-global-teal text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Public Launch</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <Icon name="gauge" className="text-global-teal text-lg mb-2" size={12} />
                        <p className="text-sm font-medium text-gray-700">Monitoring</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Launch Preparation</div>
                      <div className="text-xl font-poppins font-bold text-global-teal">1-2 Business Days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Transparency & Clarity</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Every step is documented and verifiable on the blockchain with real-time updates</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="eye" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Full Visibility</h3>
              <p className="text-gray-600">Complete audit trail from asset verification to token deployment with timestamped records</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="link" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Blockchain Verified</h3>
              <p className="text-gray-600">All critical milestones recorded immutably on blockchain for permanent verification</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="bell" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Real-Time Updates</h3>
              <p className="text-gray-600">Automated notifications and dashboard updates throughout the tokenization process</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="users" className="text-white text-lg" size={8} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Third-Party Validation</h3>
              <p className="text-gray-600">Independent verification by certified oracles and compliance partners</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="file" className="text-white text-lg" size={12} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Document Access</h3>
              <p className="text-gray-600">Secure investor portal with access to all legal documents and audit reports</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="chart-line-up" className="text-white text-lg" size={8} />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Performance Tracking</h3>
              <p className="text-gray-600">Continuous monitoring of asset performance with oracle-verified data feeds</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-global-teal to-edge-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
            Ready to Tokenize Your Assets?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join our transparent tokenization platform and unlock liquidity for your real-world assets
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => setShowListAssetModal(true)}
              className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              List Your Asset
            </button>
            <button 
              onClick={() => setShowLearnMoreModal(true)}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* List Your Asset Modal */}
      {showListAssetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">List Your Asset</h3>
              <button
                onClick={() => setShowListAssetModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Ready to tokenize your real-world asset? Get started with our asset listing process.</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Icon name="check-circle" className="text-green-500 mr-3" />
                  <span className="text-gray-700">Asset evaluation and verification</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check-circle" className="text-green-500 mr-3" />
                  <span className="text-gray-700">Legal documentation and compliance</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check-circle" className="text-green-500 mr-3" />
                  <span className="text-gray-700">Smart contract deployment</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check-circle" className="text-green-500 mr-3" />
                  <span className="text-gray-700">Token distribution and trading</span>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowListAssetModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <a
                  href="mailto:info@globalnext.rocks?subject=Asset Listing Inquiry"
                  className="flex-1 bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-center"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learn More Modal */}
      {showLearnMoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Learn More</h3>
              <button
                onClick={() => setShowLearnMoreModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Discover more about our tokenization platform and investment opportunities.</p>
              <div className="space-y-3">
                <a href="/assets" className="flex items-center text-global-teal hover:text-edge-purple">
                  <Icon name="ship" className="mr-3" />
                  Browse Available Assets
                </a>
                <a href="/pricing" className="flex items-center text-global-teal hover:text-edge-purple">
                  <Icon name="chart-line" className="mr-3" />
                  View Pricing Plans
                </a>
                <a href="/security" className="flex items-center text-global-teal hover:text-edge-purple">
                  <Icon name="shield-halved" className="mr-3" />
                  Security & Compliance
                </a>
                <a href="/faq" className="flex items-center text-global-teal hover:text-edge-purple">
                  <Icon name="question-mark-circle" className="mr-3" />
                  Frequently Asked Questions
                </a>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setShowLearnMoreModal(false)}
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