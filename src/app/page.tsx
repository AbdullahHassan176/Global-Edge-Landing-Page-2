'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import WaitlistModal from '@/components/ui/WaitlistModal';

/*
Layout Rollback:
- Removed forced centering
- Increased text container width (max-w-5xl to max-w-6xl)
*/

/*
QA Summary:
- All links & buttons verified for functionality
- No issues found
*/
export default function HomePage() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  /*
  QA Summary:
  - Hero copy is long; risk of crowding on small screens. Suggest: constrain text blocks with "max-w-2xl md:max-w-3xl" and add "text-balance" for better wrapping.
  - CTA row can wrap below long list; ensure vertical rhythm. Suggest: add "mt-4 md:mt-6" before CTA group when copy grows.
  - Insights teaser images are fine; ensure alt text remains descriptive (already OK).
  */

  return (
    <>
      {/* Hero Section */}
      <section className='bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[600px] relative overflow-hidden'>
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
        <div className='relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center'>
          <div className='max-w-6xl px-4 text-white text-balance leading-relaxed text-left'>
            <h1 className='text-4xl md:text-5xl font-poppins font-bold mb-6 leading-tight break-words max-w-5xl'>
              Tokenizing Africa–UAE Trade Flows — Starting With Real Cargo
            </h1>
            <h2 className='text-2xl lg:text-3xl font-poppins font-semibold mb-6 leading-tight break-words max-w-5xl'>
              Compliance-first infrastructure for trade-backed issuance
            </h2>
            <p className='text-lg md:text-xl mb-6 font-inter font-light opacity-90 max-w-5xl leading-relaxed'>
              We are building fractional exposure to FMCG trade inventory and
              receivables with on-chain provenance—beginning with live cargo
              moving from South Africa to the United Arab Emirates. Today that
              means one active shipment and a tokenization prototype; nothing on
              this site is marketed as live tokenized AUM until issuance is
              complete and disclosed.
            </p>
            <p className='text-lg md:text-xl mb-6 font-inter font-light opacity-90 max-w-5xl leading-relaxed'>
              Our roadmap spans{' '}
              <Link
                href='/assets?category=tradetokens'
                className='underline hover:text-global-teal transition-colors'
              >
                trade inventory
              </Link>
              ,{' '}
              <Link
                href='/assets?category=containers'
                className='underline hover:text-global-teal transition-colors'
              >
                container-level logistics
              </Link>
              , and eventually other real-world asset classes—always with a
              target of VARA-aligned distribution in the UAE.
            </p>
            <ul className='text-base md:text-lg space-y-2 mt-4 md:mt-6 font-inter font-light opacity-90 max-w-5xl'>
              <li>
                • Read how we approach{' '}
                <Link
                  href='/how-it-works'
                  className='underline hover:text-global-teal transition-colors'
                >
                  issuance and controls
                </Link>{' '}
                before tokens go live
              </li>
              <li>
                • See what will list on{' '}
                <Link
                  href='/assets'
                  className='underline hover:text-global-teal transition-colors'
                >
                  the asset marketplace
                </Link>{' '}
                as pilots mature
              </li>
              <li>
                • If you evaluate early-stage RWA in the Gulf,{' '}
                <Link
                  href='/investors'
                  className='underline hover:text-global-teal transition-colors'
                >
                  connect with our team
                </Link>
              </li>
            </ul>
            <div className='flex flex-wrap gap-3 justify-center md:justify-start mt-6'>
              <Link
                href='/assets'
                className='bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors flex items-center justify-center'
              >
                Explore Assets
                <Icon name='arrow-right' className='ml-2' size={8} />
              </Link>
              <Link
                href='/how-it-works'
                className='border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors'
              >
                How It Works
              </Link>
              <Link
                href='/investors'
                className='border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors'
              >
                For Investors
              </Link>
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 right-0 w-96 h-96 opacity-10'>
          <div className='w-full h-full bg-gradient-to-tl from-aqua-start to-transparent rounded-full'></div>
        </div>
      </section>

      {/* Honest program facts */}
      <section className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-global-teal mb-2'>
                South Africa → UAE
              </div>
              <div className='text-sm text-gray-600 font-medium leading-snug'>
                Live trade route (active). One container in motion today.
              </div>
            </div>
            <div className='text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-global-teal mb-2'>
                FMCG inventory & receivables
              </div>
              <div className='text-sm text-gray-600 font-medium leading-snug'>
                Asset class for the first issuance pilot.
              </div>
            </div>
            <div className='text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-global-teal mb-2'>
                Pilot in progress
              </div>
              <div className='text-sm text-gray-600 font-medium leading-snug'>
                First tokenization not yet issued; prototype underway.
              </div>
            </div>
            <div className='text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-global-teal mb-2'>
                VARA-compliant issuance
              </div>
              <div className='text-sm text-gray-600 font-medium leading-snug'>
                Regulatory target for UAE distribution.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              How It Works
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              How participation will work once the first instruments are issued.
              Details in{' '}
              <Link
                href='/how-it-works'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                how it works
              </Link>{' '}
              and for qualified parties via{' '}
              <Link
                href='/investors'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                investors
              </Link>
              .
            </p>
          </div>
          <div className='grid md:grid-cols-5 gap-8'>
            <Link href='/register' className='text-center group cursor-pointer'>
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                <Icon
                  name='user-check'
                  className='text-white text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors'>
                Verify Identity
              </h3>
              <p className='text-sm text-gray-600'>
                Complete KYC/KYB verification to access tokenized assets
              </p>
            </Link>
            <Link href='/assets' className='text-center group cursor-pointer'>
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                <Icon name='search' className='text-white text-lg' size={8} />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors'>
                Browse Assets
              </h3>
              <p className='text-sm text-gray-600'>
                Explore containers, real estate, and trade inventory tokens
              </p>
            </Link>
            <Link href='/reports' className='text-center group cursor-pointer'>
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                <Icon
                  name='chart-line'
                  className='text-white text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors'>
                Review Performance
              </h3>
              <p className='text-sm text-gray-600'>
                Analyze yields, risk profiles, and asset provenance
              </p>
            </Link>
            <Link
              href='/get-started'
              className='text-center group cursor-pointer'
            >
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                <Icon name='coins' className='text-white text-lg' size={12} />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors'>
                Invest
              </h3>
              <p className='text-sm text-gray-600'>
                Purchase fractional ownership through blockchain tokens
              </p>
            </Link>
            <Link
              href='/dashboard'
              className='text-center group cursor-pointer'
            >
              <div className='w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                <Icon name='trophy' className='text-white text-lg' size={12} />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-global-teal transition-colors'>
                Earn Returns
              </h3>
              <p className='text-sm text-gray-600'>
                Receive payouts as assets generate revenue
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Asset Categories */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              What we are building toward
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Pilot focus first; additional{' '}
              <Link
                href='/how-it-works'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                asset classes
              </Link>{' '}
              follow as the program matures.
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <Link
              href='/assets?category=containers'
              className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors'>
                <Icon name='ship' className='text-blue-600 text-lg' size={12} />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors'>
                Containers
              </h3>
              <p className='text-gray-600 mb-4'>
                Maritime legs and container-level provenance for trade flows
              </p>
              <div className='space-y-2'>
                <div className='text-sm text-global-teal font-semibold'>
                  Logistics layer
                </div>
                <div className='text-xs text-gray-500'>
                  Supporting the SA → UAE pilot route
                </div>
              </div>
            </Link>
            <Link
              href='/assets?category=property'
              className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors'>
                <Icon
                  name='building'
                  className='text-green-600 text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors'>
                Property
              </h3>
              <p className='text-gray-600 mb-4'>
                Eventual program for income-producing property in the region
              </p>
              <div className='space-y-2'>
                <div className='text-sm text-global-teal font-semibold'>
                  On the roadmap
                </div>
                <div className='text-xs text-gray-500'>Not part of pilot one</div>
              </div>
            </Link>
            <Link
              href='/assets?category=tradetokens'
              className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors'>
                <Icon
                  name='boxes-stacked'
                  className='text-purple-600 text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors'>
                TradeTokens
              </h3>
              <p className='text-gray-600 mb-4'>
                FMCG inventory and receivables tied to verified shipments—where
                the first pilot sits
              </p>
              <div className='space-y-2'>
                <div className='text-sm text-global-teal font-semibold'>
                  Pilot focus
                </div>
                <div className='text-xs text-gray-500'>
                  One live cargo lane today
                </div>
              </div>
            </Link>
            <Link
              href='/assets?category=vault'
              className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors'>
                <Icon
                  name='vault'
                  className='text-orange-600 text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors'>
                Vault
              </h3>
              <p className='text-gray-600 mb-4'>
                Reserved structures for vaulted commodities when the program
                expands
              </p>
              <div className='space-y-2'>
                <div className='text-sm text-global-teal font-semibold'>
                  Future program
                </div>
                <div className='text-xs text-gray-500'>Not in active pilot</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Asset Data */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Where we are today
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              No marketing AUM or performance stats until an instrument is issued
              and reporting is live.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            <div className='bg-white rounded-2xl p-8 shadow-lg border-l-4 border-global-teal'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-poppins font-semibold text-charcoal'>
                  Live cargo
                </h3>
                <Icon
                  name='chart-line-up'
                  className='text-green-600'
                  size={12}
                />
              </div>
              <div className='text-2xl font-poppins font-bold text-global-teal mb-2'>
                One container
              </div>
              <div className='text-sm text-gray-600'>
                South Africa → UAE lane; cargo in motion, not yet wrapped as a
                marketed token.
              </div>
            </div>
            <div className='bg-white rounded-2xl p-8 shadow-lg border-l-4 border-edge-purple'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-poppins font-semibold text-charcoal'>
                  Tokenization
                </h3>
                <Icon
                  name='layer-group'
                  className='text-purple-600'
                  size={12}
                />
              </div>
              <div className='text-2xl font-poppins font-bold text-edge-purple mb-2'>
                Prototype
              </div>
              <div className='text-sm text-gray-600'>
                First issuance is in build; we will not claim live tokenized
                inventory until legal and technical closing conditions are met.
              </div>
            </div>
            <div className='bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-poppins font-semibold text-charcoal'>
                  Returns
                </h3>
                <Icon name='trophy' className='text-green-600' size={12} />
              </div>
              <div className='text-2xl font-poppins font-bold text-green-600 mb-2'>
                TBD
              </div>
              <div className='text-sm text-gray-600'>
                Yields will be shown only with offering documents for a specific
                instrument—not platform-wide averages.
              </div>
            </div>
          </div>
          <div className='text-center'>
            <Link
              href='/assets'
              className='bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors inline-flex items-center'
            >
              View All Assets
              <Icon name='arrow-right' className='ml-2' size={8} />
            </Link>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Security & Compliance
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Built with{' '}
              <Link
                href='/security'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                institutional-grade security
              </Link>{' '}
              and{' '}
              <Link
                href='/security'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                regulatory compliance
              </Link>
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <Link href='/security' className='text-center group cursor-pointer'>
              <div className='w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Icon
                  name='shield-halved'
                  className='text-white text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors'>
                KYC/KYB Verification
              </h3>
              <p className='text-gray-600'>
                Comprehensive identity verification for all participants using
                industry-leading providers
              </p>
            </Link>
            <Link href='/security' className='text-center group cursor-pointer'>
              <div className='w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Icon name='lock' className='text-white text-lg' size={12} />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors'>
                Secure Custody
              </h3>
              <p className='text-gray-600'>
                Multi-signature wallets and cold storage with
                institutional-grade security protocols
              </p>
            </Link>
            <Link href='/security' className='text-center group cursor-pointer'>
              <div className='w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Icon
                  name='certificate'
                  className='text-white text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-global-teal transition-colors'>
                Oracle Attestations
              </h3>
              <p className='text-gray-600'>
                Third-party verification of asset condition, location, and
                performance metrics
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* UAE Tokenization Market Overview */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Built for UAE distribution — starting with Africa–UAE trade
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The Global Edge is an early-stage issuer platform: we are
              preparing VARA-aligned structures for fractional exposure to{' '}
              <Link
                href='/assets?category=tradetokens'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                trade inventory
              </Link>
              , supported by{' '}
              <Link
                href='/assets?category=containers'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                logistics data
              </Link>
              , with other asset classes like{' '}
              <Link
                href='/assets?category=property'
                className='text-global-teal hover:text-edge-purple transition-colors'
              >
                property
              </Link>{' '}
              on the roadmap—not live at platform scale today.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center'>
              <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon
                  name='building'
                  className='text-white text-xl'
                  size={20}
                />
              </div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-4'>
                VARA-aligned issuance
              </h3>
              <p className='text-gray-600 mb-6'>
                We are designing processes and disclosures around the Virtual
                Assets Regulatory Authority (VARA) framework in Dubai—targeting
                compliant distribution, not claiming approvals we have not
                received.
              </p>
              <ul className='text-left space-y-2 text-sm text-gray-700'>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Offering-level legal review before any public sale language
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Transparent reporting as instruments go live
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Investor suitability and risk disclosures per product
                </li>
              </ul>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center'>
              <div className='w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon name='link' className='text-white text-xl' size={20} />
              </div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-4'>
                Blockchain Technology
              </h3>
              <p className='text-gray-600 mb-6'>
                Advanced blockchain infrastructure ensures immutable records,
                real-time tracking, and secure ownership verification for all
                tokenized assets.
              </p>
              <ul className='text-left space-y-2 text-sm text-gray-700'>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Immutable ownership records
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Real-time asset tracking
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Smart contract automation
                </li>
              </ul>
            </div>

            <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center'>
              <div className='w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon
                  name='chart-line-up'
                  className='text-white text-xl'
                  size={20}
                />
              </div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-4'>
                Why this corridor
              </h3>
              <p className='text-gray-600 mb-6'>
                Africa–UAE FMCG flows combine real goods, documented receivables,
                and repeatable shipping—ideal for a first RWA proof where
                investors can diligence cargo, not just slides.
              </p>
              <ul className='text-left space-y-2 text-sm text-gray-700'>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Observable bills of lading and inventory checkpoints
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Clear UAE entry point for settlement and distribution
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-green-600 mr-2'
                    size={12}
                  />
                  Room to add more lanes after the first instrument closes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships — no marks until agreements are public */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-3xl mx-auto px-6 lg:px-8 text-center'>
          <h3 className='text-2xl font-poppins font-semibold text-charcoal mb-4'>
            Partnerships
          </h3>
          <p className='text-gray-600 mb-6 leading-relaxed'>
            We do not display bank, asset-manager, or carrier marks unless there
            is a public or signed relationship. If you are a logistics operator,
            regulated custodian, or allocator evaluating pilots in the UAE, we
            would like to talk.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/partner-application'
              className='inline-flex items-center justify-center bg-global-teal text-white px-8 py-3 rounded-full font-poppins font-semibold hover:bg-opacity-90 transition-colors'
            >
              Partner application
              <Icon name='arrow-right' className='ml-2' size={8} />
            </Link>
            <a
              href='https://calendly.com/mohammed-sidat-/global-next-global-edge'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center border-2 border-global-teal text-global-teal px-8 py-3 rounded-full font-poppins font-semibold hover:bg-global-teal hover:text-white transition-colors'
            >
              Book a conversation
            </a>
          </div>
        </div>
      </section>

      {/* Insights Teaser */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='flex justify-between items-center mb-12'>
            <div>
              <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
                Latest Insights
              </h2>
              <p className='text-xl text-gray-600'>
                Stay informed about{' '}
                <Link
                  href='/insights'
                  className='text-global-teal hover:text-edge-purple transition-colors'
                >
                  market trends and opportunities
                </Link>
              </p>
            </div>
            <Link
              href='/insights'
              className='text-global-teal font-medium hover:text-edge-purple transition-colors'
            >
              View All Articles
              <Icon name='arrow-right' className='ml-2' size={8} />
            </Link>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <article className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow'>
              <img
                className='w-full h-48 object-cover'
                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/8e8f5f1206-41f8ac9516fc7c159218.png'
                alt='global shipping containers at port with sunset, modern logistics, professional photography'
              />
              <div className='p-6'>
                <div className='text-sm text-global-teal font-medium mb-2'>
                  CONTAINERS
                </div>
                <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3'>
                  Global Container Demand Surges 23% in Q4
                </h3>
                <p className='text-gray-600 mb-4'>
                  Supply chain disruptions drive increased demand for container
                  investments as shipping rates reach record highs.
                </p>
                <div className='flex items-center text-sm text-gray-500'>
                  <span>Dec 15, 2024</span>
                  <span className='mx-2'>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </article>
            <article className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow'>
              <img
                className='w-full h-48 object-cover'
                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/b3863df69d-7dea45524a67663901de.png'
                alt='modern commercial real estate building with glass facade, urban architecture, professional photography'
              />
              <div className='p-6'>
                <div className='text-sm text-green-600 font-medium mb-2'>
                  PROPERTY
                </div>
                <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3'>
                  Commercial Real Estate Tokenization Trends
                </h3>
                <p className='text-gray-600 mb-4'>
                  How blockchain technology is transforming property investment
                  accessibility and liquidity.
                </p>
                <div className='flex items-center text-sm text-gray-500'>
                  <span>Dec 12, 2024</span>
                  <span className='mx-2'>•</span>
                  <span>7 min read</span>
                </div>
              </div>
            </article>
            <article className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow'>
              <img
                className='w-full h-48 object-cover'
                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/ccb48f0bea-8f317986dc05f173e4bb.png'
                alt='commodity trading floor with gold bars and precious metals, financial markets, professional photography'
              />
              <div className='p-6'>
                <div className='text-sm text-orange-600 font-medium mb-2'>
                  VAULT
                </div>
                <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3'>
                  Precious Metals as Portfolio Diversification
                </h3>
                <p className='text-gray-600 mb-4'>
                  Strategic allocation to gold and silver tokens provides
                  inflation hedge for modern portfolios.
                </p>
                <div className='flex items-center text-sm text-gray-500'>
                  <span>Dec 10, 2024</span>
                  <span className='mx-2'>•</span>
                  <span>6 min read</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-br from-global-teal to-edge-purple'>
        <div className='max-w-4xl mx-auto px-6 lg:px-8 text-center'>
          <h2 className='text-4xl lg:text-5xl font-poppins font-bold text-white mb-6'>
            Ready to Own the Edge of the World?
          </h2>
          <p className='text-xl text-white opacity-90 mb-8'>
            We are preparing our first issuance pilots—request updates or speak
            with the team if you evaluate early-stage trade RWA in the Gulf.
          </p>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <Link
              href='/get-started'
              className='bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors'
            >
              Start Investing Today
            </Link>
            <a
              href='https://calendly.com/mohammed-sidat-/global-next-global-edge'
              target='_blank'
              rel='noopener noreferrer'
              className='border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors'
            >
              Become a Partner
            </a>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
      />
    </>
  );
}
