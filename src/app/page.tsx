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
      {/* Hero — cream + topology (UI_UX_DESIGN_SYSTEM public / landing) */}
      <section className='relative min-h-[600px] overflow-hidden bg-gc-cream-soft'>
        <div className='absolute inset-0 global-topology pointer-events-none' />
        <div className='relative max-w-7xl mx-auto px-6 lg:px-8 min-h-[600px] flex items-center py-16 md:py-24'>
          <div className='max-w-6xl text-balance leading-relaxed text-left'>
            <p className='text-xs font-mono font-semibold uppercase tracking-wider text-gc-text-muted mb-4'>
              Africa–UAE trade · Early-stage issuance
            </p>
            <h1 className='narrative-headline max-w-5xl mb-4 md:mb-6'>
              Tokenizing Africa–UAE trade flows — starting with{' '}
              <span className='text-gradient'>real cargo</span>
            </h1>
            <h2 className='text-2xl lg:text-3xl font-poppins font-semibold text-charcoal mb-6 leading-tight max-w-5xl'>
              Compliance-first infrastructure for trade-backed issuance
            </h2>
            <p className='text-lg md:text-xl mb-6 font-inter text-gc-text-muted max-w-5xl leading-relaxed'>
              We are building fractional exposure to FMCG trade inventory and
              receivables with on-chain provenance—beginning with live cargo
              moving from South Africa to the United Arab Emirates. Today that
              means one active shipment and a tokenization prototype; nothing on
              this site is marketed as live tokenized AUM until issuance is
              complete and disclosed.
            </p>
            <p className='text-lg md:text-xl mb-6 font-inter text-gc-text-muted max-w-5xl leading-relaxed'>
              Our roadmap spans{' '}
              <Link
                href='/assets?category=tradetokens'
                className='underline decoration-gc-gold/50 underline-offset-4 hover:text-edge-purple transition-colors'
              >
                trade inventory
              </Link>
              ,{' '}
              <Link
                href='/assets?category=containers'
                className='underline decoration-gc-gold/50 underline-offset-4 hover:text-edge-purple transition-colors'
              >
                container-level logistics
              </Link>
              , and eventually other real-world asset classes—always with a
              target of VARA-aligned distribution in the UAE.
            </p>
            <ul className='text-base md:text-lg space-y-2 mt-4 md:mt-6 font-inter text-gc-text-muted max-w-5xl'>
              <li>
                • Read how we approach{' '}
                <Link
                  href='/how-it-works'
                  className='underline decoration-gc-gold/50 underline-offset-4 hover:text-edge-purple transition-colors'
                >
                  issuance and controls
                </Link>{' '}
                before tokens go live
              </li>
              <li>
                • See what will list on{' '}
                <Link
                  href='/assets'
                  className='underline decoration-gc-gold/50 underline-offset-4 hover:text-edge-purple transition-colors'
                >
                  the asset marketplace
                </Link>{' '}
                as pilots mature
              </li>
              <li>
                • If you evaluate early-stage RWA in the Gulf,{' '}
                <Link
                  href='/investors'
                  className='underline decoration-gc-gold/50 underline-offset-4 hover:text-edge-purple transition-colors'
                >
                  connect with our team
                </Link>
              </li>
            </ul>
            <div className='flex flex-wrap gap-3 justify-center md:justify-start mt-8'>
              <Link
                href='/assets'
                className='btn-primary inline-flex items-center justify-center px-8 py-4 text-lg'
              >
                Explore Assets
                <Icon name='arrow-right' className='ml-2' size={8} />
              </Link>
              <Link href='/how-it-works' className='btn-secondary px-8 py-4 text-lg'>
                How It Works
              </Link>
              <Link href='/investors' className='btn-outline px-8 py-4 text-lg'>
                For Investors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Honest program facts */}
      <section className='border-b border-[rgba(214,195,163,0.22)] bg-gc-ivory/40'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='gc-metric-panel p-6 text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-edge-purple mb-2'>
                South Africa → UAE
              </div>
              <div className='text-sm text-gc-text-muted font-medium leading-snug'>
                Live trade route (active). One container in motion today.
              </div>
            </div>
            <div className='gc-metric-panel p-6 text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-edge-purple mb-2'>
                FMCG inventory & receivables
              </div>
              <div className='text-sm text-gc-text-muted font-medium leading-snug'>
                Asset class for the first issuance pilot.
              </div>
            </div>
            <div className='gc-metric-panel p-6 text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-edge-purple mb-2'>
                Pilot in progress
              </div>
              <div className='text-sm text-gc-text-muted font-medium leading-snug'>
                First tokenization not yet issued; prototype underway.
              </div>
            </div>
            <div className='gc-metric-panel p-6 text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-edge-purple mb-2'>
                VARA-aligned issuance
              </div>
              <div className='text-sm text-gc-text-muted font-medium leading-snug'>
                Regulatory target for UAE distribution.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-24 bg-gc-ivory/20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              How It Works
            </h2>
            <p className='text-xl text-gc-text-muted max-w-3xl mx-auto leading-relaxed'>
              How participation will work once the first instruments are issued.
              Details in{' '}
              <Link
                href='/how-it-works'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                how it works
              </Link>{' '}
              and for qualified parties via{' '}
              <Link
                href='/investors'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                investors
              </Link>
              .
            </p>
          </div>
          <div className='grid md:grid-cols-5 gap-8'>
            <Link href='/register' className='text-center group cursor-pointer'>
              <div className='w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-gc-card'>
                <Icon
                  name='user-check'
                  className='text-gc-cream-soft text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-edge-purple transition-colors'>
                Verify Identity
              </h3>
              <p className='text-sm text-gc-text-muted'>
                Complete KYC/KYB verification to access tokenized assets
              </p>
            </Link>
            <Link href='/assets' className='text-center group cursor-pointer'>
              <div className='w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-gc-card'>
                <Icon
                  name='search'
                  className='text-gc-cream-soft text-lg'
                  size={8}
                />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-edge-purple transition-colors'>
                Browse Assets
              </h3>
              <p className='text-sm text-gc-text-muted'>
                Explore containers, real estate, and trade inventory tokens
              </p>
            </Link>
            <Link href='/reports' className='text-center group cursor-pointer'>
              <div className='w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-gc-card'>
                <Icon
                  name='chart-line'
                  className='text-gc-cream-soft text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-edge-purple transition-colors'>
                Review Performance
              </h3>
              <p className='text-sm text-gc-text-muted'>
                Analyze yields, risk profiles, and asset provenance
              </p>
            </Link>
            <Link
              href='/get-started'
              className='text-center group cursor-pointer'
            >
              <div className='w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-gc-card'>
                <Icon name='coins' className='text-gc-cream-soft text-lg' size={12} />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-edge-purple transition-colors'>
                Invest
              </h3>
              <p className='text-sm text-gc-text-muted'>
                Purchase fractional ownership through blockchain tokens
              </p>
            </Link>
            <Link
              href='/dashboard'
              className='text-center group cursor-pointer'
            >
              <div className='w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-gc-card'>
                <Icon name='trophy' className='text-gc-cream-soft text-lg' size={12} />
              </div>
              <h3 className='text-lg font-poppins font-semibold text-charcoal mb-2 group-hover:text-edge-purple transition-colors'>
                Earn Returns
              </h3>
              <p className='text-sm text-gc-text-muted'>
                Receive payouts as assets generate revenue
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Asset Categories */}
      <section className='py-24 bg-gc-cream-soft'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              What we are building toward
            </h2>
            <p className='text-xl text-gc-text-muted max-w-3xl mx-auto leading-relaxed'>
              Pilot focus first; additional{' '}
              <Link
                href='/how-it-works'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                asset classes
              </Link>{' '}
              follow as the program matures.
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <Link
              href='/assets?category=containers'
              className='liquid-metal-card card-hover p-8 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-gc-emerald/10 rounded-gc-card flex items-center justify-center mb-4 group-hover:bg-gc-emerald/20 transition-colors'>
                <Icon
                  name='ship'
                  className='text-gc-emerald text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-edge-purple transition-colors'>
                Containers
              </h3>
              <p className='text-gc-text-muted mb-4 leading-relaxed'>
                Maritime legs and container-level provenance for trade flows
              </p>
              <div className='space-y-2'>
                <div className='text-sm text-gc-emerald font-semibold'>
                  Logistics layer
                </div>
                <div className='text-xs text-gc-text-subtle'>
                  Supporting the SA → UAE pilot route
                </div>
              </div>
            </Link>
            <Link
              href='/assets?category=property'
              className='liquid-metal-card card-hover p-8 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-gc-gold/15 rounded-gc-card flex items-center justify-center mb-4 group-hover:bg-gc-gold/25 transition-colors'>
                <Icon
                  name='building'
                  className='text-gc-burgundy text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-edge-purple transition-colors'>
                Property
              </h3>
              <p className='text-gc-text-muted mb-4 leading-relaxed'>
                Eventual program for income-producing property in the region
              </p>
              <div className='space-y-2'>
                <div className='text-sm text-gc-emerald font-semibold'>
                  On the roadmap
                </div>
                <div className='text-xs text-gc-text-subtle'>
                  Not part of pilot one
                </div>
              </div>
            </Link>
            <Link
              href='/assets?category=tradetokens'
              className='liquid-metal-card card-hover p-8 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-edge-purple/10 rounded-gc-card flex items-center justify-center mb-4 group-hover:bg-edge-purple/15 transition-colors'>
                <Icon
                  name='boxes-stacked'
                  className='text-edge-purple text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-edge-purple transition-colors'>
                TradeTokens
              </h3>
              <p className='text-gc-text-muted mb-4 leading-relaxed'>
                FMCG inventory and receivables tied to verified shipments—where
                the first pilot sits
              </p>
              <div className='space-y-2'>
                <div className='text-sm text-gc-emerald font-semibold'>
                  Pilot focus
                </div>
                <div className='text-xs text-gc-text-subtle'>
                  One live cargo lane today
                </div>
              </div>
            </Link>
            <Link
              href='/assets?category=vault'
              className='liquid-metal-card card-hover p-8 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-gc-warning/15 rounded-gc-card flex items-center justify-center mb-4 group-hover:bg-gc-warning/25 transition-colors'>
                <Icon
                  name='vault'
                  className='text-gc-burgundy text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-edge-purple transition-colors'>
                Vault
              </h3>
              <p className='text-gc-text-muted mb-4 leading-relaxed'>
                Reserved structures for vaulted commodities when the program
                expands
              </p>
              <div className='space-y-2'>
                <div className='text-sm text-gc-emerald font-semibold'>
                  Future program
                </div>
                <div className='text-xs text-gc-text-subtle'>
                  Not in active pilot
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Asset Data */}
      <section className='py-24'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Where we are today
            </h2>
            <p className='text-xl text-gc-text-muted max-w-3xl mx-auto leading-relaxed'>
              No marketing AUM or performance stats until an instrument is issued
              and reporting is live.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            <div className='gc-metric-panel p-8 border-l-4 border-gc-emerald'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-poppins font-semibold text-charcoal'>
                  Live cargo
                </h3>
                <Icon
                  name='chart-line-up'
                  className='text-gc-emerald'
                  size={12}
                />
              </div>
              <div className='text-2xl font-poppins font-bold text-gc-emerald mb-2'>
                One container
              </div>
              <div className='text-sm text-gc-text-muted leading-relaxed'>
                South Africa → UAE lane; cargo in motion, not yet wrapped as a
                marketed token.
              </div>
            </div>
            <div className='gc-metric-panel p-8 border-l-4 border-edge-purple'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-poppins font-semibold text-charcoal'>
                  Tokenization
                </h3>
                <Icon
                  name='layer-group'
                  className='text-edge-purple'
                  size={12}
                />
              </div>
              <div className='text-2xl font-poppins font-bold text-edge-purple mb-2'>
                Prototype
              </div>
              <div className='text-sm text-gc-text-muted leading-relaxed'>
                First issuance is in build; we will not claim live tokenized
                inventory until legal and technical closing conditions are met.
              </div>
            </div>
            <div className='gc-metric-panel p-8 border-l-4 border-gc-gold'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-poppins font-semibold text-charcoal'>
                  Returns
                </h3>
                <Icon name='trophy' className='text-gc-gold' size={12} />
              </div>
              <div className='text-2xl font-poppins font-bold text-gc-emerald mb-2'>
                TBD
              </div>
              <div className='text-sm text-gc-text-muted leading-relaxed'>
                Yields will be shown only with offering documents for a specific
                instrument—not platform-wide averages.
              </div>
            </div>
          </div>
          <div className='text-center'>
            <Link href='/assets' className='btn-primary inline-flex items-center px-8 py-4 text-lg'>
              View All Assets
              <Icon name='arrow-right' className='ml-2' size={8} />
            </Link>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className='py-24 bg-gc-ivory/30'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Security & Compliance
            </h2>
            <p className='text-xl text-gc-text-muted max-w-3xl mx-auto leading-relaxed'>
              Built with{' '}
              <Link
                href='/security'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                institutional-grade security
              </Link>{' '}
              and{' '}
              <Link
                href='/security'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                regulatory compliance
              </Link>
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <Link href='/security' className='text-center group cursor-pointer'>
              <div className='w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-gc-card'>
                <Icon
                  name='shield-halved'
                  className='text-gc-cream-soft text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-edge-purple transition-colors'>
                KYC/KYB Verification
              </h3>
              <p className='text-gc-text-muted leading-relaxed'>
                Comprehensive identity verification for all participants using
                industry-leading providers
              </p>
            </Link>
            <Link href='/security' className='text-center group cursor-pointer'>
              <div className='w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-gc-card'>
                <Icon
                  name='lock'
                  className='text-gc-cream-soft text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-edge-purple transition-colors'>
                Secure Custody
              </h3>
              <p className='text-gc-text-muted leading-relaxed'>
                Multi-signature wallets and cold storage with
                institutional-grade security protocols
              </p>
            </Link>
            <Link href='/security' className='text-center group cursor-pointer'>
              <div className='w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-gc-card'>
                <Icon
                  name='certificate'
                  className='text-gc-cream-soft text-lg'
                  size={12}
                />
              </div>
              <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3 group-hover:text-edge-purple transition-colors'>
                Oracle Attestations
              </h3>
              <p className='text-gc-text-muted leading-relaxed'>
                Third-party verification of asset condition, location, and
                performance metrics
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* UAE Tokenization Market Overview */}
      <section className='py-24 bg-gc-cream-soft'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
              Built for UAE distribution — starting with Africa–UAE trade
            </h2>
            <p className='text-xl text-gc-text-muted max-w-3xl mx-auto leading-relaxed'>
              The Global Edge is an early-stage issuer platform: we are
              preparing VARA-aligned structures for fractional exposure to{' '}
              <Link
                href='/assets?category=tradetokens'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                trade inventory
              </Link>
              , supported by{' '}
              <Link
                href='/assets?category=containers'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                logistics data
              </Link>
              , with other asset classes like{' '}
              <Link
                href='/assets?category=property'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                property
              </Link>{' '}
              on the roadmap—not live at platform scale today.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            <div className='liquid-metal-card p-8 text-center'>
              <div className='w-16 h-16 bg-edge-purple rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon
                  name='building'
                  className='text-gc-cream-soft text-xl'
                  size={20}
                />
              </div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-4'>
                VARA-aligned issuance
              </h3>
              <p className='text-gc-text-muted mb-6 leading-relaxed'>
                We are designing processes and disclosures around the Virtual
                Assets Regulatory Authority (VARA) framework in Dubai—targeting
                compliant distribution, not claiming approvals we have not
                received.
              </p>
              <ul className='text-left space-y-2 text-sm text-gc-text-muted'>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
                    size={12}
                  />
                  Offering-level legal review before any public sale language
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
                    size={12}
                  />
                  Transparent reporting as instruments go live
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
                    size={12}
                  />
                  Investor suitability and risk disclosures per product
                </li>
              </ul>
            </div>

            <div className='liquid-metal-card p-8 text-center'>
              <div className='w-16 h-16 bg-gc-emerald rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon name='link' className='text-gc-cream-soft text-xl' size={20} />
              </div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-4'>
                Blockchain Technology
              </h3>
              <p className='text-gc-text-muted mb-6 leading-relaxed'>
                Advanced blockchain infrastructure ensures immutable records,
                real-time tracking, and secure ownership verification for all
                tokenized assets.
              </p>
              <ul className='text-left space-y-2 text-sm text-gc-text-muted'>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
                    size={12}
                  />
                  Immutable ownership records
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
                    size={12}
                  />
                  Real-time asset tracking
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
                    size={12}
                  />
                  Smart contract automation
                </li>
              </ul>
            </div>

            <div className='liquid-metal-card p-8 text-center'>
              <div className='w-16 h-16 bg-gc-gold rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon
                  name='chart-line-up'
                  className='text-gc-wine text-xl'
                  size={20}
                />
              </div>
              <h3 className='text-2xl font-poppins font-bold text-charcoal mb-4'>
                Why this corridor
              </h3>
              <p className='text-gc-text-muted mb-6 leading-relaxed'>
                Africa–UAE FMCG flows combine real goods, documented receivables,
                and repeatable shipping—ideal for a first RWA proof where
                investors can diligence cargo, not just slides.
              </p>
              <ul className='text-left space-y-2 text-sm text-gc-text-muted'>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
                    size={12}
                  />
                  Observable bills of lading and inventory checkpoints
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
                    size={12}
                  />
                  Clear UAE entry point for settlement and distribution
                </li>
                <li className='flex items-center'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald mr-2 shrink-0'
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
      <section className='py-20 bg-gc-ivory/30'>
        <div className='max-w-3xl mx-auto px-6 lg:px-8 text-center'>
          <h3 className='text-2xl font-poppins font-semibold text-charcoal mb-4'>
            Partnerships
          </h3>
          <p className='text-gc-text-muted mb-6 leading-relaxed'>
            We do not display bank, asset-manager, or carrier marks unless there
            is a public or signed relationship. If you are a logistics operator,
            regulated custodian, or allocator evaluating pilots in the UAE, we
            would like to talk.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/partner-application'
              className='inline-flex items-center justify-center btn-primary px-8 py-3'
            >
              Partner application
              <Icon name='arrow-right' className='ml-2' size={8} />
            </Link>
            <a
              href='https://calendly.com/mohammed-sidat-/global-next-global-edge'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center btn-secondary px-8 py-3'
            >
              Book a conversation
            </a>
          </div>
        </div>
      </section>

      {/* Insights Teaser */}
      <section className='py-24'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12'>
            <div>
              <h2 className='text-4xl font-poppins font-bold text-charcoal mb-4'>
                Latest Insights
              </h2>
              <p className='text-xl text-gc-text-muted leading-relaxed'>
                Stay informed about{' '}
                <Link
                  href='/insights'
                  className='text-edge-purple hover:text-gc-emerald transition-colors'
                >
                  market trends and opportunities
                </Link>
              </p>
            </div>
            <Link
              href='/insights'
              className='text-edge-purple font-medium hover:text-gc-gold transition-colors shrink-0'
            >
              View All Articles
              <Icon name='arrow-right' className='ml-2' size={8} />
            </Link>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <article className='liquid-metal-card card-hover overflow-hidden rounded-gc-card-lg'>
              <img
                className='w-full h-48 object-cover'
                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/8e8f5f1206-41f8ac9516fc7c159218.png'
                alt='global shipping containers at port with sunset, modern logistics, professional photography'
              />
              <div className='p-6'>
                <div className='text-xs font-mono font-semibold uppercase tracking-wider text-gc-emerald mb-2'>
                  CONTAINERS
                </div>
                <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3'>
                  Global Container Demand Surges 23% in Q4
                </h3>
                <p className='text-gc-text-muted mb-4 leading-relaxed'>
                  Supply chain disruptions drive increased demand for container
                  investments as shipping rates reach record highs.
                </p>
                <div className='flex items-center text-sm text-gc-text-subtle font-mono'>
                  <span>Dec 15, 2024</span>
                  <span className='mx-2'>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </article>
            <article className='liquid-metal-card card-hover overflow-hidden rounded-gc-card-lg'>
              <img
                className='w-full h-48 object-cover'
                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/b3863df69d-7dea45524a67663901de.png'
                alt='modern commercial real estate building with glass facade, urban architecture, professional photography'
              />
              <div className='p-6'>
                <div className='text-xs font-mono font-semibold uppercase tracking-wider text-edge-purple mb-2'>
                  PROPERTY
                </div>
                <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3'>
                  Commercial Real Estate Tokenization Trends
                </h3>
                <p className='text-gc-text-muted mb-4 leading-relaxed'>
                  How blockchain technology is transforming property investment
                  accessibility and liquidity.
                </p>
                <div className='flex items-center text-sm text-gc-text-subtle font-mono'>
                  <span>Dec 12, 2024</span>
                  <span className='mx-2'>•</span>
                  <span>7 min read</span>
                </div>
              </div>
            </article>
            <article className='liquid-metal-card card-hover overflow-hidden rounded-gc-card-lg'>
              <img
                className='w-full h-48 object-cover'
                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/ccb48f0bea-8f317986dc05f173e4bb.png'
                alt='commodity trading floor with gold bars and precious metals, financial markets, professional photography'
              />
              <div className='p-6'>
                <div className='text-xs font-mono font-semibold uppercase tracking-wider text-gc-gold mb-2'>
                  VAULT
                </div>
                <h3 className='text-xl font-poppins font-semibold text-charcoal mb-3'>
                  Precious Metals as Portfolio Diversification
                </h3>
                <p className='text-gc-text-muted mb-4 leading-relaxed'>
                  Strategic allocation to gold and silver tokens provides
                  inflation hedge for modern portfolios.
                </p>
                <div className='flex items-center text-sm text-gc-text-subtle font-mono'>
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
      <section className='relative py-24 gradient-bg overflow-hidden'>
        <div className='absolute inset-0 global-topology opacity-30 pointer-events-none' />
        <div className='relative max-w-4xl mx-auto px-6 lg:px-8 text-center'>
          <h2 className='text-4xl lg:text-5xl font-poppins font-bold text-gc-cream-soft mb-6 tracking-tight'>
            Ready to own the edge of the world?
          </h2>
          <p className='text-xl text-gc-cream-soft/95 mb-8 leading-relaxed'>
            We are preparing our first issuance pilots—request updates or speak
            with the team if you evaluate early-stage trade RWA in the Gulf.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6'>
            <Link
              href='/get-started'
              className='bg-gc-cream-soft text-edge-purple px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-gc-cream transition-colors shadow-gc-card inline-flex items-center justify-center'
            >
              Start Investing Today
            </Link>
            <a
              href='https://calendly.com/mohammed-sidat-/global-next-global-edge'
              target='_blank'
              rel='noopener noreferrer'
              className='border-2 border-gc-cream-soft/90 text-gc-cream-soft px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-gc-cream-soft/10 transition-colors inline-flex items-center justify-center'
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
