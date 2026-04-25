'use client';

import Icon from '@/components/ui/Icon';
import Link from 'next/link';

/*
Layout Rollback:
- Removed forced centering
- Increased text container width (max-w-5xl to max-w-6xl)
*/

const collaboratorTypes = [
  {
    title: 'Logistics & trade',
    body: 'Carriers, freight forwarders, and FMCG shippers who can attest cargo, handoffs, and release documentation for a pilot lane.',
  },
  {
    title: 'Capital & distribution',
    body: 'Allocators, family offices, and regulated intermediaries comfortable diligencing an early instrument—not marketing AUM.',
  },
  {
    title: 'Technology & attestations',
    body: 'Blockchain, custody, and data partners that help prove state changes without overstating what is on-chain today.',
  },
  {
    title: 'Legal & compliance',
    body: 'Counsel and compliance advisors for VARA-aligned issuance and offering documentation in the UAE.',
  },
];

const partnershipBenefits = [
  {
    icon: 'handshake',
    title: 'Revenue Sharing',
    description: 'Earn competitive revenue sharing on tokenized assets',
  },
  {
    icon: 'users',
    title: 'Access to Investors',
    description: 'Meet teams evaluating the first trade-backed pilots',
  },
  {
    icon: 'chart-line',
    title: 'Market Expansion',
    description: 'Expand your market reach through our platform',
  },
  {
    icon: 'shield',
    title: 'Risk Mitigation',
    description: 'Reduce risk through diversified asset tokenization',
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className='bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[600px] relative overflow-hidden'>
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
        <div className='relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center'>
          <div className='max-w-6xl text-white text-balance text-left'>
            <div className='flex items-center mb-4'>
              <span className='text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full'>
                PARTNER WITH US
              </span>
            </div>
            <h1 className='text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight break-words max-w-6xl'>
              Partner with Global Edge
            </h1>
            <h2 className='text-2xl lg:text-3xl font-poppins font-semibold mb-6 leading-tight break-words max-w-6xl'>
              Help stand up honest trade-backed issuance
            </h2>
            <p className='text-base sm:text-lg md:text-xl lg:text-2xl mb-6 font-inter font-light opacity-90 max-w-6xl leading-relaxed'>
              We are pre–public partner announcements: one live South Africa →
              UAE cargo lane, a tokenization prototype, and a target of
              VARA-aligned distribution. If your firm operates in logistics,
              custody, or regulated capital, we want to explore structure—not
              borrow your logo for marketing.
            </p>
            <p className='text-base sm:text-lg md:text-xl mb-6 font-inter font-light opacity-90 max-w-6xl leading-relaxed'>
              Read our{' '}
              <Link
                href='/how-it-works'
                className='underline hover:text-global-teal transition-colors'
              >
                issuance approach
              </Link>
              , review{' '}
              <Link
                href='/security'
                className='underline hover:text-global-teal transition-colors'
              >
                security posture
              </Link>
              , then{' '}
              <Link
                href='/contact'
                className='underline hover:text-global-teal transition-colors'
              >
                get in touch
              </Link>
              .
            </p>
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-4 md:mt-6'>
              <Link
                href='/partner-application'
                className='bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors flex items-center justify-center'
              >
                Become a Partner
                <Icon name='arrow-right' className='ml-2' size={8} />
              </Link>
              <Link
                href='#benefits'
                className='border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors'
              >
                View Benefits
              </Link>
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 right-0 w-96 h-96 opacity-10'>
          <div className='w-full h-full bg-gradient-to-tl from-aqua-start to-transparent rounded-full'></div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section id='benefits' className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              What a credible pilot needs
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-6'>
              No invented traction—just the disciplines required to ship a first
              instrument. See{' '}
              <Link
                href='/how-it-works'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                how it works
              </Link>{' '}
              and{' '}
              <Link
                href='/contact'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                contact us
              </Link>
              .
            </p>
            <ul className='text-lg text-gray-600 max-w-2xl mx-auto space-y-2 text-left'>
              <li>
                • <strong>Operational truth:</strong> Bills of lading, inventory
                counts, and release events that match the story in the data room
              </li>
              <li>
                • <strong>Capital discipline:</strong> Clear waterfalls and
                triggers—no platform-wide APR marketing before an offering closes
              </li>
              <li>
                • <strong>Technical integrity:</strong> Custody, keys, and
                attestations that match what you tell regulators
              </li>
            </ul>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Icon
                    name={benefit.icon}
                    className='text-white text-lg'
                    size={20}
                  />
                </div>
                <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3'>
                  {benefit.title}
                </h3>
                <p className='text-gray-600'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborator types — no logos until agreements are public */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Who we are talking to
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Categories of collaborators—not a wall of marks. When a
              relationship is signed and cleared for disclosure, we will say so
              explicitly.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {collaboratorTypes.map((item, index) => (
              <div key={index} className='bg-white rounded-2xl p-8 shadow-lg'>
                <h3 className='text-2xl font-poppins font-bold text-charcoal mb-3'>
                  {item.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest status — no fabricated case studies */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Pilot status
            </h2>
            <p className='text-xl text-gray-600'>
              Case studies with revenue multiples will appear after a first
              instrument is issued, settled, and reported—not as placeholder
              metrics. Today: one container on the South Africa → UAE lane, a
              tokenization prototype in development, and VARA-aligned issuance
              as the regulatory target.
            </p>
          </div>
          <div className='max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-200'>
            <ul className='text-left text-gray-700 space-y-3'>
              <li className='flex gap-3'>
                <Icon
                  name='check-circle'
                  className='text-global-teal shrink-0 mt-1'
                  size={12}
                />
                <span>
                  Operational focus on FMCG inventory and receivables tied to
                  real cargo.
                </span>
              </li>
              <li className='flex gap-3'>
                <Icon
                  name='check-circle'
                  className='text-global-teal shrink-0 mt-1'
                  size={12}
                />
                <span>
                  Legal and product workstreams for a first offering—not a
                  catalog of hundreds of live tokens.
                </span>
              </li>
              <li className='flex gap-3'>
                <Icon
                  name='check-circle'
                  className='text-global-teal shrink-0 mt-1'
                  size={12}
                />
                <span>
                  If you need diligence materials, start with{' '}
                  <Link
                    href='/how-it-works'
                    className='text-global-teal hover:text-edge-purple transition-colors'
                  >
                    how it works
                  </Link>{' '}
                  and a direct conversation—not this page’s old marketing copy.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Partnership Process
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Simple steps to become a Global Edge partner. Learn about our{' '}
              <Link
                href='/how-it-works'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                tokenization process
              </Link>{' '}
              and{' '}
              <Link
                href='/contact'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                contact us
              </Link>{' '}
              for more information.
            </p>
          </div>

          <div className='grid md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-poppins font-bold text-xl'>
                  1
                </span>
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2'>
                Submit Application
              </h3>
              <p className='text-sm text-gray-600'>
                Complete our partnership application with company details and
                proposed collaboration
              </p>
            </div>

            <div className='text-center'>
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-poppins font-bold text-xl'>
                  2
                </span>
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2'>
                Due Diligence
              </h3>
              <p className='text-sm text-gray-600'>
                Our team reviews your application and conducts comprehensive due
                diligence
              </p>
            </div>

            <div className='text-center'>
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-poppins font-bold text-xl'>
                  3
                </span>
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2'>
                Partnership Agreement
              </h3>
              <p className='text-sm text-gray-600'>
                Sign partnership agreement and define collaboration terms and
                revenue sharing
              </p>
            </div>

            <div className='text-center'>
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-poppins font-bold text-xl'>
                  4
                </span>
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2'>
                Launch & Scale
              </h3>
              <p className='text-sm text-gray-600'>
                Begin collaboration and scale your partnership with our support
                team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 gradient-bg'>
        <div className='max-w-4xl mx-auto px-6 lg:px-8 text-center'>
          <h2 className='text-4xl lg:text-5xl font-poppins font-bold text-white mb-6'>
            Ready to Partner with Us?
          </h2>
          <p className='text-xl text-white opacity-90 mb-8'>
            Join our ecosystem and unlock new opportunities in asset
            tokenization. Learn about our{' '}
            <Link
              href='/how-it-works'
              className='underline hover:text-global-teal transition-colors'
            >
              tokenization process
            </Link>{' '}
            and{' '}
            <Link
              href='/contact'
              className='underline hover:text-global-teal transition-colors'
            >
              contact us
            </Link>{' '}
            for partnership opportunities.
          </p>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <Link
              href='/partner-application'
              className='bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors'
            >
              Apply Now
            </Link>
            <a
              href='https://calendly.com/mohammed-sidat-/global-next-global-edge'
              target='_blank'
              rel='noopener noreferrer'
              className='border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors'
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
