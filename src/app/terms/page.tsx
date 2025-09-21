
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      {/* COMPONENT: Terms Hero */}
      <section id="terms-hero" className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      Terms & Conditions
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Please read these terms carefully before using our platform.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Terms Content */}
      <section id="terms-content" className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="mb-8">
                      <p className="text-sm text-gray-600 mb-4">Last updated: December 20, 2024</p>
                      <p className="text-gray-700 leading-relaxed">
                          These Terms and Conditions ("Terms") govern your use of the Global Edge platform and services. 
                          By accessing or using our platform, you agree to be bound by these Terms.
                      </p>
                  </div>

                  <div className="space-y-12">
                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">1. Acceptance of Terms</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              By accessing and using the Global Edge platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">2. Description of Service</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              Global Edge provides a platform for tokenizing real-world assets including but not limited to shipping containers, real estate, trade inventory, and precious metals. Our service facilitates fractional ownership of these assets through blockchain technology.
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Asset tokenization and management services</li>
                              <li>Investment platform and portfolio management</li>
                              <li>Secondary market trading capabilities</li>
                              <li>Asset verification and monitoring services</li>
                              <li>Payment processing and custody services</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">3. User Accounts and Registration</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              To access certain features of our platform, you must register for an account. You agree to:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Provide accurate, current, and complete information during registration</li>
                              <li>Maintain and update your account information</li>
                              <li>Maintain the security of your password and account</li>
                              <li>Accept responsibility for all activities under your account</li>
                              <li>Notify us immediately of any unauthorized use of your account</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">4. Investment Risks and Disclaimers</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              Investing in tokenized assets involves significant risks. You acknowledge and agree that:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>All investments carry risk of loss</li>
                              <li>Past performance does not guarantee future results</li>
                              <li>Asset values may fluctuate significantly</li>
                              <li>Regulatory changes may affect asset values</li>
                              <li>Technology risks may impact platform functionality</li>
                              <li>You should only invest what you can afford to lose</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">5. Fees and Payments</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              Our fee structure includes:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Investment fees: 1.5-2.5% of investment amount</li>
                              <li>Trading fees: 0.1% for secondary market transactions</li>
                              <li>Withdrawal fees: $5 per withdrawal</li>
                              <li>No management fees for basic accounts</li>
                          </ul>
                          <p className="text-gray-700 leading-relaxed mt-4">
                              All fees are clearly disclosed before transactions and are non-refundable unless otherwise specified.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">6. Prohibited Activities</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              You agree not to:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Use the platform for illegal activities</li>
                              <li>Attempt to gain unauthorized access to our systems</li>
                              <li>Interfere with platform operations</li>
                              <li>Provide false or misleading information</li>
                              <li>Violate any applicable laws or regulations</li>
                              <li>Engage in market manipulation or fraud</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">7. Intellectual Property</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              The Global Edge platform, including its design, functionality, and content, is protected by intellectual property laws. You may not:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Copy, modify, or distribute our platform</li>
                              <li>Reverse engineer our technology</li>
                              <li>Use our trademarks without permission</li>
                              <li>Create derivative works based on our platform</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">8. Limitation of Liability</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              To the maximum extent permitted by law, Global Edge shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising from your use of our platform.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">9. Indemnification</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              You agree to indemnify and hold harmless Global Edge, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the platform or violation of these Terms.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">10. Termination</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We may terminate or suspend your account at any time for violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use the platform ceases immediately.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">11. Governing Law</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to conflict of law principles.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">12. Changes to Terms</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the new Terms.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">13. Contact Information</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              If you have any questions about these Terms, please contact us at:
                          </p>
                          <div className="bg-gray-50 rounded-lg p-6">
                              <p className="text-gray-700">
                                  <strong>Global Edge</strong><br />
                                  Email: legal@globaledge.com<br />
                                  Phone: +1 (555) 123-4567<br />
                                  Address: 123 Financial District, New York, NY 10004
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Related Links */}
      <section id="related-links" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8 text-center">Related Legal Documents</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/privacy" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                          
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Privacy Policy</h3>
                      <p className="text-sm text-gray-600">How we collect, use, and protect your personal information</p>
                  </Link>

                  <Link href="/risk-disclosures" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors">
                          
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Risk Disclosures</h3>
                      <p className="text-sm text-gray-600">Important information about investment risks</p>
                  </Link>

                  <Link href="/cookies" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                          
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Cookie Policy</h3>
                      <p className="text-sm text-gray-600">How we use cookies and tracking technologies</p>
                  </Link>
              </div>
          </div>
      </section>
    </>
  );
}
