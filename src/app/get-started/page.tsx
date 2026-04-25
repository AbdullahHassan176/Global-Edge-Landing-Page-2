'use client';

import Link from 'next/link';

/*
QA Summary:
- Fixed 3 buttons without onClick handlers
- All other links & buttons verified for functionality
*/

/*
Layout Rollback:
- Removed forced centering
- Increased text container width (max-w-5xl to max-w-6xl)
*/
export default function GetStartedPage() {
  return (
    <>
      {/* COMPONENT: Get Started Hero */}
      <section
        id='get-started-hero'
        className='bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[400px] relative overflow-hidden'
      >
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
        <div className='relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center'>
          <div className='max-w-6xl text-white text-balance text-left'>
            <div className='flex items-center mb-4'>
              <span className='text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full'>
                GET STARTED
              </span>
            </div>
            <h1 className='text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight break-words max-w-6xl'>
              Get Started with The Global Edge
            </h1>
            <h2 className='text-2xl lg:text-3xl font-poppins font-semibold mb-4 leading-tight break-words max-w-6xl'>
              Register as an Investor or Issuer
            </h2>
            <p className='text-base sm:text-lg md:text-xl font-inter font-light opacity-90 mb-6 max-w-6xl leading-relaxed'>
              Create an account to follow issuance pilots and complete onboarding
              when offerings open. Early stage: one live cargo lane, prototype
              tokenization in progress.
              Learn about{' '}
              <Link
                href='/investors'
                className='underline hover:text-global-teal transition-colors'
              >
                investment opportunities
              </Link>{' '}
              and access your{' '}
              <Link
                href='/dashboard'
                className='underline hover:text-global-teal transition-colors'
              >
                dashboard
              </Link>
              .
            </p>
            <p className='text-base sm:text-lg md:text-xl font-inter font-light opacity-90 mb-6 max-w-6xl leading-relaxed'>
              Companies in the UAE can issue tokenized assets through our
              VARA-compliant platform, transforming physical assets like
              shipping containers, real estate, and trade inventory into digital
              tokens. This process enables fractional ownership, enhanced
              liquidity, and global investor access while maintaining full
              regulatory compliance with UAE standards.
            </p>
          </div>
        </div>
      </section>

      {/* COMPONENT: Quick Start Steps */}
      <section id='quick-start-steps' className='py-20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Onboarding Your Assets Securely
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-6'>
              From account creation to your first investment in under 10
              minutes. Learn about{' '}
              <Link
                href='/investors'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                investment opportunities
              </Link>{' '}
              and access your{' '}
              <Link
                href='/dashboard'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                dashboard
              </Link>
              .
            </p>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto mb-6'>
              Our secure onboarding process ensures all assets meet VARA
              compliance standards. Learn more about our{' '}
              <Link
                href='/how-it-works'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                tokenization process
              </Link>{' '}
              and regulatory framework.
            </p>
            <ul className='text-lg text-gray-600 max-w-2xl mx-auto space-y-2 text-left'>
              <li>
                • <strong>Asset Verification:</strong> Independent third-party
                verification of asset existence, condition, and ownership
              </li>
              <li>
                • <strong>Legal Documentation:</strong> SPV formation, custody
                agreements, and investor protection mechanisms
              </li>
              <li>
                • <strong>Oracle Integration:</strong> Real-time monitoring and
                blockchain deployment for transparent tracking
              </li>
            </ul>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-br from-global-teal to-aqua-start rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-poppins font-bold text-2xl'>
                  1
                </span>
              </div>
              <h3 className='text-2xl font-poppins font-semibold text-charcoal mb-4'>
                Create Account
              </h3>
              <p className='text-gray-600 mb-6'>
                Sign up with your email and create a secure password. We&apos;ll
                send you a verification link to get started.
              </p>
              <div className='bg-gray-50 rounded-xl p-6'>
                <div className='text-sm text-gray-500 mb-2'>
                  What you'll need:
                </div>
                <ul className='text-sm text-gray-600 space-y-1'>
                  <li>• Valid email address</li>
                  <li>• Strong password</li>
                  <li>• Phone number for 2FA</li>
                </ul>
              </div>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-poppins font-bold text-2xl'>
                  2
                </span>
              </div>
              <h3 className='text-2xl font-poppins font-semibold text-charcoal mb-4'>
                Verify Identity
              </h3>
              <p className='text-gray-600 mb-6'>
                Complete our KYC verification process. Upload your ID and
                provide basic information for compliance.
              </p>
              <div className='bg-gray-50 rounded-xl p-6'>
                <div className='text-sm text-gray-500 mb-2'>
                  Required documents:
                </div>
                <ul className='text-sm text-gray-600 space-y-1'>
                  <li>• Government-issued ID</li>
                  <li>• Proof of address</li>
                  <li>• Bank account details</li>
                </ul>
              </div>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-poppins font-bold text-2xl'>
                  3
                </span>
              </div>
              <h3 className='text-2xl font-poppins font-semibold text-charcoal mb-4'>
                Start Investing
              </h3>
              <p className='text-gray-600 mb-6'>
                Browse available assets, review performance data, and make your
                first investment with as little as $50.
              </p>
              <div className='bg-gray-50 rounded-xl p-6'>
                <div className='text-sm text-gray-500 mb-2'>
                  Investment options:
                </div>
                <ul className='text-sm text-gray-600 space-y-1'>
                  <li>• Shipping containers</li>
                  <li>• Real estate</li>
                  <li>• Trade tokens</li>
                  <li>• Vault assets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT: Account Types */}
      <section id='account-types' className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Choose Your Account Type
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Select the account type that best fits your investment needs.
              Learn about{' '}
              <Link
                href='/investors'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                investment opportunities
              </Link>{' '}
              and access your{' '}
              <Link
                href='/dashboard'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                dashboard
              </Link>
              .
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <div className='flex items-center mb-6'>
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4'></div>
                <div>
                  <h3 className='text-2xl font-poppins font-bold text-charcoal'>
                    Individual Account
                  </h3>
                  <p className='text-gray-600'>
                    Perfect for personal investors
                  </p>
                </div>
              </div>
              <ul className='space-y-4 mb-8'>
                <li className='flex items-center'>
                  <span className='text-gray-700'>
                    Access to all tokenized assets
                  </span>
                </li>
                <li className='flex items-center'>
                  <span className='text-gray-700'>Minimum investment: $50</span>
                </li>
                <li className='flex items-center'>
                  <span className='text-gray-700'>
                    Standard transaction fees
                  </span>
                </li>
                <li className='flex items-center'>
                  <span className='text-gray-700'>Email support</span>
                </li>
              </ul>
              <button
                onClick={() => (window.location.href = '/register/role')}
                className='w-full bg-global-teal text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors'
              >
                Create Individual Account
              </button>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg border-2 border-global-teal'>
              <div className='flex items-center mb-6'>
                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4'></div>
                <div>
                  <h3 className='text-2xl font-poppins font-bold text-charcoal'>
                    Business Account
                  </h3>
                  <p className='text-gray-600'>
                    For companies and institutions
                  </p>
                </div>
              </div>
              <ul className='space-y-4 mb-8'>
                <li className='flex items-center'>
                  <span className='text-gray-700'>
                    Everything in Individual
                  </span>
                </li>
                <li className='flex items-center'>
                  <span className='text-gray-700'>
                    Higher investment limits
                  </span>
                </li>
                <li className='flex items-center'>
                  <span className='text-gray-700'>
                    Reduced transaction fees
                  </span>
                </li>
                <li className='flex items-center'>
                  <span className='text-gray-700'>
                    Dedicated account manager
                  </span>
                </li>
                <li className='flex items-center'>
                  <span className='text-gray-700'>API access</span>
                </li>
              </ul>
              <button
                onClick={() => (window.location.href = '/register/role')}
                className='w-full bg-edge-purple text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors'
              >
                Create Business Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT: Verification Process */}
      <section id='verification-process' className='py-20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Identity Verification Process
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Our KYC process is fast, secure, and compliant with international
              regulations. Learn about{' '}
              <Link
                href='/investors'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                investment opportunities
              </Link>{' '}
              and access your{' '}
              <Link
                href='/dashboard'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                dashboard
              </Link>
              .
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12'>
            <div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-8'>
                What We Verify
              </h3>
              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'></div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Identity Verification
                    </h4>
                    <p className='text-gray-600'>
                      Government-issued ID, passport, or driver's license
                      verification
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'></div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Address Verification
                    </h4>
                    <p className='text-gray-600'>
                      Utility bill, bank statement, or official correspondence
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'></div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Financial Verification
                    </h4>
                    <p className='text-gray-600'>
                      Bank account details and source of funds verification
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'></div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Compliance Check
                    </h4>
                    <p className='text-gray-600'>
                      AML screening and regulatory compliance verification
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-8'>
                Verification Timeline
              </h3>
              <div className='space-y-6'>
                <div className='flex items-center space-x-4'>
                  <div className='w-8 h-8 bg-global-teal rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-white font-bold text-sm'>1</span>
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal'>
                      Submit Documents
                    </h4>
                    <p className='text-gray-600 text-sm'>
                      Upload required documents through secure portal
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='w-8 h-8 bg-global-teal rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-white font-bold text-sm'>2</span>
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal'>
                      Automated Review
                    </h4>
                    <p className='text-gray-600 text-sm'>
                      AI-powered document verification (1-2 minutes)
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='w-8 h-8 bg-global-teal rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-white font-bold text-sm'>3</span>
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal'>
                      Manual Review
                    </h4>
                    <p className='text-gray-600 text-sm'>
                      Human review for complex cases (5-15 minutes)
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'></div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal'>
                      Approval
                    </h4>
                    <p className='text-gray-600 text-sm'>
                      Account approved and ready for investment
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 bg-green-50 rounded-xl p-6'>
                <div className='flex items-center mb-2'>
                  <span className='font-semibold text-green-800'>
                    Average Processing Time
                  </span>
                </div>
                <div className='text-2xl font-poppins font-bold text-green-600'>
                  5-10 minutes
                </div>
                <p className='text-sm text-green-700'>
                  Most accounts are verified within minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT: Getting Started FAQ */}
      <section id='getting-started-faq' className='py-20 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Getting Started FAQ
            </h2>
            <p className='text-xl text-gray-600'>
              Common questions about starting your investment journey. Learn
              about{' '}
              <Link
                href='/investors'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                investment opportunities
              </Link>{' '}
              and access your{' '}
              <Link
                href='/dashboard'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                dashboard
              </Link>
              .
            </p>
          </div>

          <div className='space-y-8'>
            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                How much do I need to start investing?
              </h3>
              <p className='text-gray-600'>
                You can start investing with as little as $50. There's no
                maximum limit, and you can invest in multiple assets to
                diversify your portfolio.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                How long does verification take?
              </h3>
              <p className='text-gray-600'>
                Most accounts are verified within 5-10 minutes. In some cases,
                additional documentation may be required, which could extend the
                process to 24-48 hours.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                What payment methods do you accept?
              </h3>
              <p className='text-gray-600'>
                We accept bank transfers, wire transfers, and major
                cryptocurrencies including Bitcoin, Ethereum, and USDC. All
                payments are processed securely through our regulated payment
                partners.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                Can I withdraw my investments anytime?
              </h3>
              <p className='text-gray-600'>
                Most assets have specific terms and maturity dates. However, we
                offer a secondary market where you can trade your tokens with
                other investors if you need liquidity before maturity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT: CTA Section */}
      <section
        id='get-started-cta'
        className='py-20 bg-gradient-to-br from-global-teal to-edge-purple'
      >
        <div className='max-w-4xl mx-auto px-6 lg:px-8 text-center'>
          <h2 className='text-4xl lg:text-5xl font-poppins font-bold text-white mb-6'>
            Ready to Start Your Investment Journey?
          </h2>
          <p className='text-xl text-white opacity-90 mb-8'>
            Get on the list for the first Africa–UAE trade instruments. Learn
            about{' '}
            <Link
              href='/investors'
              className='underline hover:text-global-teal transition-colors'
            >
              investment opportunities
            </Link>{' '}
            and access your{' '}
            <Link
              href='/dashboard'
              className='underline hover:text-global-teal transition-colors'
            >
              dashboard
            </Link>
            .
          </p>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <button
              onClick={() => (window.location.href = '/register/role')}
              className='bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors'
            >
              Create Account Now
            </button>
            <Link
              href='/assets'
              className='border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors'
            >
              Browse Assets First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
