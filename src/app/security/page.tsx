'use client';

/*
SEO Link Cleanup:
- Replaced 1 self-referencing link with <span>
- Preserved text and styling
*/

/*
QA Summary:
- Fixed 1 button without onClick handler
- All other links & buttons verified for functionality
*/

import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { configService } from '@/lib/configService';

/*
Layout Rollback:
- Removed forced centering
- Increased text container width (max-w-5xl to max-w-6xl)
*/
export default function SecurityPage() {
  // Get configuration
  const contactConfig = configService.getContactConfig();

  return (
    <>
      {/* COMPONENT: Security Hero */}
      <section
        id='security-hero'
        className='bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[400px] relative overflow-hidden'
      >
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
        <div className='relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center'>
          <div className='max-w-6xl text-white text-balance text-left'>
            <div className='flex items-center mb-4'>
              <span className='text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full'>
                SECURITY
              </span>
            </div>
            <h1 className='text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight break-words max-w-6xl'>
              Our Security Commitment
            </h1>
            <h2 className='text-2xl lg:text-3xl font-poppins font-semibold mb-4 leading-tight break-words max-w-6xl'>
              Blockchain Integrity Meets Regulatory Trust
            </h2>
            <p className='text-base sm:text-lg md:text-xl font-inter font-light opacity-90 mb-6 max-w-6xl leading-relaxed'>
              We are building security and compliance practices around early
              trade pilots—no claim that every control is already at full
              production scale. Learn how we handle data in our{' '}
              <Link
                href='/privacy'
                className='underline hover:text-global-teal transition-colors'
              >
                privacy policy
              </Link>{' '}
              and{' '}
              <Link
                href='/terms'
                className='underline hover:text-global-teal transition-colors'
              >
                terms of service
              </Link>
              . Program context:{' '}
              <Link
                href='/assets'
                className='underline hover:text-global-teal transition-colors'
              >
                assets
              </Link>
              .
            </p>
            <p className='text-base sm:text-lg md:text-xl font-inter font-light opacity-90 max-w-6xl leading-relaxed'>
              Issuance targets VARA-aligned distribution in the UAE; that is a
              design goal—not a statement that every activity is licensed or that
              “all investments” are covered by a single insurance tower.               Controls
              tighten as{' '}
              <Link
                href='/assets'
                className='underline hover:text-global-teal transition-colors'
              >
                live products
              </Link>{' '}
              and counterparties come online.
            </p>
          </div>
        </div>
      </section>

      {/* COMPONENT: Security Overview */}
      <section id='security-overview' className='py-20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Our Blockchain & Compliance Framework
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-6'>
              We employ multiple layers of security to protect your investments
              and personal data. Learn about our{' '}
              <Link
                href='/privacy'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                privacy policy
              </Link>{' '}
              and{' '}
              <Link
                href='/terms'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                terms of service
              </Link>
              .
            </p>
            <ul className='text-lg text-gray-600 max-w-2xl mx-auto space-y-2 text-left'>
              <li>
                • <strong>Encryption:</strong> We use modern TLS for transport and
                aim for strong standards at rest; exact scopes are documented as
                services harden for production.
              </li>
              <li>
                • <strong>Assessments:</strong> Third-party reviews and pen tests
                are part of the roadmap toward issuance—not asserted here on a
                fixed quarterly cadence until engaged and published.
              </li>
              <li>
                • <strong>Key management:</strong> Where on-chain value moves,
                we target multi-party approvals and custody practices appropriate
                to the instrument—not a generic “all txs are multisig” claim
                before flows are live.
              </li>
            </ul>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white rounded-2xl p-8 shadow-lg text-center'>
              <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon name='user-check' className='text-blue-600 text-3xl' />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                KYC/KYB Verification
              </h3>
              <p className='text-gray-600'>
                Identity verification for participants as required by product
                and jurisdiction—implemented with reputable providers where
                integrated.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg text-center'>
              <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon
                  name='shield-halved'
                  className='text-green-600 text-3xl'
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                Secure Custody
              </h3>
              <p className='text-gray-600'>
                Custody architecture depends on the instrument—cold / warm
                splits, policies, and any insurance are described in offering
                materials, not as a blanket platform guarantee.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg text-center'>
              <div className='w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon name='lock-closed' className='text-purple-600 text-3xl' />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                Oracle Attestations
              </h3>
              <p className='text-gray-600'>
                Third-party or operational attestations when they add diligence
                value; on-chain references only where they match what the
                product actually proves.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg text-center'>
              <div className='w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon name='eye' className='text-orange-600 text-3xl' />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                Data Encryption
              </h3>
              <p className='text-gray-600'>
                End-to-end encryption for all data transmission and storage
                using AES-256 encryption standards.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg text-center'>
              <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon
                  name='exclamation-triangle'
                  className='text-red-600 text-3xl'
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                Monitoring & response
              </h3>
              <p className='text-gray-600'>
                Logging, alerting, and incident runbooks scale with production
                traffic—we do not claim a fully staffed 24/7 SOC for an early
                prototype unless and until that is true.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg text-center'>
              <div className='w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon name='cog' className='text-teal-600 text-3xl' />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                Regulatory Compliance
              </h3>
              <p className='text-gray-600'>
                Regulatory posture is built instrument-by-instrument toward
                VARA-aligned issuance; “full compliance” statements belong in
                signed legal opinions for a specific product, not marketing copy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT: Security Standards */}
      <section id='security-standards' className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Security roadmap & posture
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              We do not list certifications we have not earned. As pilots move to
              production, we expect SOC reports, pen tests, and payment-scope
              controls to be scoped with vendors and counsel—and disclosed where
              appropriate. Read our{' '}
              <Link
                href='/privacy'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                privacy policy
              </Link>{' '}
              and{' '}
              <Link
                href='/terms'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                terms of service
              </Link>
              .
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12'>
            <div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-8'>
                What we are building toward
              </h3>
              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Icon
                      name='check-circle'
                      className='text-green-600 text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Evidence-based claims
                    </h4>
                    <p className='text-gray-600'>
                      SOC 2, ISO 27001, PCI DSS, and similar badges belong on this
                      page only after they are true for the entity and scope
                      described—ask for the latest diligence pack under NDA.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Icon
                      name='check-circle'
                      className='text-green-600 text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Data protection
                    </h4>
                    <p className='text-gray-600'>
                      Privacy practices for the UAE and other jurisdictions we
                      touch are documented in the privacy policy and updated as
                      products expand.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Icon
                      name='check-circle'
                      className='text-green-600 text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Payments scope
                    </h4>
                    <p className='text-gray-600'>
                      Card and fiat rails, when used, are expected to lean on
                      certified processors to minimize PCI scope rather than
                      claiming Level 1 merchant certification by default.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Icon
                      name='check-circle'
                      className='text-green-600 text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      GDPR / EU data
                    </h4>
                    <p className='text-gray-600'>
                      Where EU personal data is processed, we align to GDPR
                      requirements; applicability depends on who uses the platform
                      and from where.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-8'>
                Technical controls (targets)
              </h3>
              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Icon
                      name='check-circle'
                      className='text-blue-600 text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Multi-factor authentication
                    </h4>
                    <p className='text-gray-600'>
                      MFA for privileged and customer accounts as flows go
                      live—requirements tighten with asset-bearing features.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Icon
                      name='check-circle'
                      className='text-blue-600 text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Key protection
                    </h4>
                    <p className='text-gray-600'>
                      HSMs or cloud KMS patterns where keys protect real value;
                      exact design is per environment and reviewed before mainnet
                      funds.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Icon
                      name='check-circle'
                      className='text-blue-600 text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Least privilege access
                    </h4>
                    <p className='text-gray-600'>
                      Zero-trust style reviews for production systems: verify each
                      request, minimize standing access, audit trails for admin
                      actions.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Icon
                      name='check-circle'
                      className='text-blue-600 text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='font-poppins font-semibold text-charcoal mb-2'>
                      Penetration testing
                    </h4>
                    <p className='text-gray-600'>
                      Engagements scheduled around releases; summaries shared with
                      counterparties under NDA—not a substitute for your own
                      testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT: Insurance Coverage */}
      <section id='insurance-coverage' className='py-20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Insurance & liability
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Cargo, custody, errors & omissions, and other policies are placed per
              instrument and counterparty—not as a single fabricated “$500M”
              tower across the whole site. When an offering is live, its documents
              name carriers, limits, exclusions, and beneficiaries.
            </p>
          </div>

          <div className='max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center'>
            <Icon
              name='shield-halved'
              className='text-global-teal text-4xl mx-auto mb-4'
            />
            <p className='text-gray-700 leading-relaxed'>
              Ask for the diligence pack on the specific pilot: what is insured,
              who is the loss payee, and what risks remain uninsured. Marketing
              pages are not the place for made-up aggregate limits.
            </p>
          </div>
        </div>
      </section>

      {/* COMPONENT: Security FAQ */}
      <section id='security-faq' className='py-20 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Security Frequently Asked Questions
            </h2>
            <p className='text-xl text-gray-600'>
              Everything you need to know about our security measures
            </p>
          </div>

          <div className='space-y-8'>
            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                How are my assets protected?
              </h3>
              <p className='text-gray-600'>
                Protection depends on the product: custody design, insurance if
                placed, and legal structure are described per offering. We do not
                claim blanket “exceeds industry standards” coverage for assets that
                have not yet issued.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                What happens if there's a security breach?
              </h3>
              <p className='text-gray-600'>
                If an incident occurs, response follows documented runbooks,
                vendor obligations, and applicable law—not a promise that every
                loss is insured. Monitoring and on-call coverage scale with
                production systems.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                How often are security audits performed?
              </h3>
              <p className='text-gray-600'>
                Audit and pen-test cadence is tied to releases and institutional
                requirements—not asserted here as “annual SOC 2 + quarterly pen
                tests” until those reports exist and are scoped to our
                environment.
              </p>
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-4'>
                Can I access my account from anywhere?
              </h3>
              <p className='text-gray-600'>
                Remote access is supported where product features are enabled; we
                aim for MFA on sensitive accounts and least-privilege access as
                those flows mature—not a claim that every legacy path is already
                wired for MFA in prototype sandboxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT: CTA Section */}
      <section
        id='security-cta'
        className='py-20 bg-gradient-to-br from-global-teal to-edge-purple'
      >
        <div className='max-w-4xl mx-auto px-6 lg:px-8 text-center'>
          <h2 className='text-4xl lg:text-5xl font-poppins font-bold text-white mb-6'>
            Diligence-first security
          </h2>
          <p className='text-xl text-white opacity-90 mb-8'>
            Ask direct questions—we are early stage and prefer precise answers
            over marketing comfort. Review our{' '}
            <Link
              href='/privacy'
              className='underline hover:text-global-teal transition-colors'
            >
              privacy policy
            </Link>{' '}
            and{' '}
            <Link
              href='/terms'
              className='underline hover:text-global-teal transition-colors'
            >
              terms of service
            </Link>
            , then decide if the pilot fits your risk framework.
          </p>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <button
              onClick={() => (window.location.href = '/get-started')}
              className='bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors'
            >
              Get updates / onboard
            </button>
            <a
              href={`mailto:${contactConfig.support.email}?subject=Security Inquiry`}
              className='border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors'
            >
              Contact Security Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
