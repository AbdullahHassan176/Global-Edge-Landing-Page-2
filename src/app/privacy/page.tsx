
import Link from 'next/link';
import { configService } from '@/lib/configService';

export default function PrivacyPage() {
  // Get configuration
  const contactConfig = configService.getContactConfig();
  const businessConfig = configService.getBusinessConfig();
  
  return (
    <>
      {/* COMPONENT: Privacy Hero */}
      <section id="privacy-hero" className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      Privacy Policy
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Your privacy is important to us. Learn how we protect and use your information.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Privacy Content */}
      <section id="privacy-content" className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="mb-8">
                      <p className="text-sm text-gray-600 mb-4">Last updated: December 20, 2024</p>
                      <p className="text-gray-700 leading-relaxed">
                          This Privacy Policy describes how Global Edge collects, uses, and protects your personal information 
                          when you use our platform and services.
                      </p>
                  </div>

                  <div className="space-y-12">
                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">1. Information We Collect</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We collect information you provide directly to us and information we obtain automatically when you use our services.
                          </p>
                          
                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Personal Information</h3>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                              <li>Name, email address, and phone number</li>
                              <li>Date of birth and government-issued ID information</li>
                              <li>Address and proof of residence</li>
                              <li>Bank account and payment information</li>
                              <li>Investment preferences and risk tolerance</li>
                          </ul>

                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Automatically Collected Information</h3>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Device information and IP address</li>
                              <li>Browser type and operating system</li>
                              <li>Usage patterns and platform interactions</li>
                              <li>Cookies and similar tracking technologies</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">2. How We Use Your Information</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We use your information for the following purposes:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Provide and maintain our platform services</li>
                              <li>Process transactions and manage your account</li>
                              <li>Verify your identity and comply with regulations</li>
                              <li>Communicate with you about your investments</li>
                              <li>Improve our services and develop new features</li>
                              <li>Detect and prevent fraud and security threats</li>
                              <li>Comply with legal and regulatory requirements</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">3. Information Sharing</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We do not sell your personal information. We may share your information in the following circumstances:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>With service providers who assist in platform operations</li>
                              <li>With regulatory authorities as required by law</li>
                              <li>With law enforcement when legally required</li>
                              <li>In connection with business transfers or mergers</li>
                              <li>With your explicit consent</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">4. Data Security</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We implement comprehensive security measures to protect your information:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>End-to-end encryption for data transmission</li>
                              <li>AES-256 encryption for data storage</li>
                              <li>Multi-factor authentication requirements</li>
                              <li>Regular security audits and penetration testing</li>
                              <li>Access controls and employee training</li>
                              <li>Incident response and monitoring systems</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">5. Your Rights and Choices</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              You have the following rights regarding your personal information:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Access and review your personal information</li>
                              <li>Correct inaccurate or incomplete information</li>
                              <li>Request deletion of your personal information</li>
                              <li>Object to certain processing activities</li>
                              <li>Request data portability</li>
                              <li>Withdraw consent where applicable</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">6. Cookies and Tracking</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We use cookies and similar technologies to enhance your experience:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Essential cookies for platform functionality</li>
                              <li>Analytics cookies to understand usage patterns</li>
                              <li>Security cookies to protect against fraud</li>
                              <li>Preference cookies to remember your settings</li>
                          </ul>
                          <p className="text-gray-700 leading-relaxed mt-4">
                              You can control cookie settings through your browser preferences.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">7. Data Retention</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We retain your personal information for as long as necessary to:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Provide our services to you</li>
                              <li>Comply with legal and regulatory requirements</li>
                              <li>Resolve disputes and enforce agreements</li>
                              <li>Prevent fraud and maintain security</li>
                          </ul>
                          <p className="text-gray-700 leading-relaxed mt-4">
                              When we no longer need your information, we securely delete or anonymize it.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">8. International Transfers</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              Your information may be transferred to and processed in countries other than your own. 
                              We ensure appropriate safeguards are in place for international transfers, including:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Standard contractual clauses</li>
                              <li>Adequacy decisions by relevant authorities</li>
                              <li>Certification schemes and codes of conduct</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">9. Children's Privacy</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              Our services are not intended for individuals under 18 years of age. We do not knowingly 
                              collect personal information from children under 18. If we become aware that we have 
                              collected such information, we will take steps to delete it promptly.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">10. Changes to This Policy</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We may update this Privacy Policy from time to time. We will notify you of any material 
                              changes by email or through our platform. Your continued use of our services after 
                              changes become effective constitutes acceptance of the updated policy.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">11. Contact Us</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              If you have questions about this Privacy Policy or our data practices, please contact us:
                          </p>
                          <div className="bg-gray-50 rounded-lg p-6">
                              <p className="text-gray-700">
                                  <strong>{businessConfig.companyName} Privacy Team</strong><br />
                                  Email: {contactConfig.privacy.email}<br />
                                  Phone: {contactConfig.privacy.phone}<br />
                                  Address: {contactConfig.privacy.address}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Data Protection Rights */}
      <section id="data-protection-rights" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Your Data Protection Rights</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                              
                          </div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal">Right to Access</h3>
                      </div>
                      <p className="text-gray-600">You have the right to request copies of your personal information and details about how we process it.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                              
                          </div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal">Right to Rectification</h3>
                      </div>
                      <p className="text-gray-600">You can request correction of inaccurate or incomplete personal information.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4">
                              
                          </div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal">Right to Erasure</h3>
                      </div>
                      <p className="text-gray-600">You can request deletion of your personal information under certain circumstances.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                              
                          </div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal">Right to Portability</h3>
                      </div>
                      <p className="text-gray-600">You can request transfer of your personal information to another service provider.</p>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
