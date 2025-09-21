import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <>
      {/* COMPONENT: Security Hero */}
      <section id="security-hero" className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <div className="flex items-center mb-4">
                      <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">SECURITY</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      Bank-Grade Security for Your Investments
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Your assets are protected by institutional-grade security measures and regulatory compliance.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Security Overview */}
      <section id="security-overview" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Multi-Layer Security Architecture</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">We employ multiple layers of security to protect your investments and personal data</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="shield-halved" className="text-blue-600 text-3xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">KYC/KYB Verification</h3>
                      <p className="text-gray-600">Comprehensive identity verification for all participants using industry-leading providers and regulatory compliance standards.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="lock" className="text-green-600 text-3xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Secure Custody</h3>
                      <p className="text-gray-600">Multi-signature wallets and cold storage with institutional-grade security protocols and insurance coverage.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="certificate" className="text-purple-600 text-3xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Oracle Attestations</h3>
                      <p className="text-gray-600">Third-party verification of asset condition, location, and performance metrics with tamper-proof blockchain records.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="database" className="text-orange-600 text-3xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Data Encryption</h3>
                      <p className="text-gray-600">End-to-end encryption for all data transmission and storage using AES-256 encryption standards.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="eye" className="text-red-600 text-3xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">24/7 Monitoring</h3>
                      <p className="text-gray-600">Continuous monitoring of all systems with automated threat detection and response capabilities.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="balance-scale" className="text-teal-600 text-3xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Regulatory Compliance</h3>
                      <p className="text-gray-600">Full compliance with international financial regulations and regular third-party security audits.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Security Standards */}
      <section id="security-standards" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Security Standards & Certifications</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">We maintain the highest security standards and undergo regular audits</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                  <div>
                      <h3 className="text-2xl font-poppins font-bold text-charcoal mb-8">Compliance & Certifications</h3>
                      <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FontAwesomeIcon icon="check" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-poppins font-semibold text-charcoal mb-2">SOC 2 Type II Certified</h4>
                                  <p className="text-gray-600">Annual security audits by independent third-party auditors</p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FontAwesomeIcon icon="check" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-poppins font-semibold text-charcoal mb-2">ISO 27001 Compliant</h4>
                                  <p className="text-gray-600">International standard for information security management</p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FontAwesomeIcon icon="check" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-poppins font-semibold text-charcoal mb-2">PCI DSS Level 1</h4>
                                  <p className="text-gray-600">Highest level of payment card industry security standards</p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FontAwesomeIcon icon="check" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-poppins font-semibold text-charcoal mb-2">GDPR Compliant</h4>
                                  <p className="text-gray-600">Full compliance with European data protection regulations</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div>
                      <h3 className="text-2xl font-poppins font-bold text-charcoal mb-8">Security Measures</h3>
                      <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FontAwesomeIcon icon="shield" className="text-blue-600 text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-poppins font-semibold text-charcoal mb-2">Multi-Factor Authentication</h4>
                                  <p className="text-gray-600">Required for all account access and transactions</p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FontAwesomeIcon icon="key" className="text-blue-600 text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-poppins font-semibold text-charcoal mb-2">Hardware Security Modules</h4>
                                  <p className="text-gray-600">HSM-protected private keys for maximum security</p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FontAwesomeIcon icon="network-wired" className="text-blue-600 text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-poppins font-semibold text-charcoal mb-2">Zero-Trust Architecture</h4>
                                  <p className="text-gray-600">Never trust, always verify security model</p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FontAwesomeIcon icon="bug" className="text-blue-600 text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-poppins font-semibold text-charcoal mb-2">Penetration Testing</h4>
                                  <p className="text-gray-600">Regular security testing by certified ethical hackers</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Insurance Coverage */}
      <section id="insurance-coverage" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Comprehensive Insurance Coverage</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">Your investments are protected by multiple layers of insurance</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="shield-alt" className="text-white text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Asset Insurance</h3>
                      <div className="text-3xl font-poppins font-bold text-blue-600 mb-2">$500M</div>
                      <p className="text-sm text-gray-600">Total coverage for physical assets</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="lock" className="text-white text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Custody Insurance</h3>
                      <div className="text-3xl font-poppins font-bold text-green-600 mb-2">$100M</div>
                      <p className="text-sm text-gray-600">Coverage for digital asset custody</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="user-shield" className="text-white text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Professional Liability</h3>
                      <div className="text-3xl font-poppins font-bold text-purple-600 mb-2">$50M</div>
                      <p className="text-sm text-gray-600">Coverage for professional services</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Security FAQ */}
      <section id="security-faq" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Security Frequently Asked Questions</h2>
                  <p className="text-xl text-gray-600">Everything you need to know about our security measures</p>
              </div>

              <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">How are my assets protected?</h3>
                      <p className="text-gray-600">Your assets are protected by multiple layers of security including cold storage, multi-signature wallets, insurance coverage, and regulatory compliance. We use institutional-grade security measures that exceed industry standards.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">What happens if there's a security breach?</h3>
                      <p className="text-gray-600">In the unlikely event of a security breach, our comprehensive insurance coverage protects your investments. We also have incident response procedures and 24/7 monitoring to detect and respond to any threats immediately.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">How often are security audits performed?</h3>
                      <p className="text-gray-600">We undergo annual SOC 2 Type II audits and quarterly penetration testing by certified security professionals. Our systems are continuously monitored and we maintain regular compliance reviews.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Can I access my account from anywhere?</h3>
                      <p className="text-gray-600">Yes, but all access requires multi-factor authentication. We use zero-trust architecture, meaning every access attempt is verified regardless of location or device.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: CTA Section */}
      <section id="security-cta" className="py-20 bg-gradient-to-br from-global-teal to-edge-purple">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
                  Invest with Confidence
              </h2>
              <p className="text-xl text-white opacity-90 mb-8">
                  Your security is our top priority. Start investing in tokenized assets with complete peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
                      Start Investing Today
                  </button>
                  <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors">
                      Contact Security Team
                  </Link>
              </div>
          </div>
      </section>
    </>
  );
}
