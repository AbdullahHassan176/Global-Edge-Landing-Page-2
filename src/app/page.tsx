'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import WaitlistModal from '@/components/ui/WaitlistModal';

export default function HomePage() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
      {/* Hero — cream + topology (UI_UX_DESIGN_SYSTEM public / landing) */}
      <section className='relative min-h-[600px] overflow-hidden bg-gc-cream-soft'>
        <div className='absolute inset-0 global-topology pointer-events-none' />
        <div className='relative max-w-7xl mx-auto px-6 lg:px-8 min-h-[600px] flex items-center py-16 md:py-24'>
          <div className='max-w-3xl text-balance leading-relaxed text-left'>
            <p className='text-xs font-mono font-semibold uppercase tracking-wider text-gc-text-muted mb-4'>
              Africa–UAE trade · Pilot issuance
            </p>
            <h1 className='narrative-headline max-w-5xl mb-4 md:mb-6'>
              Tokenizing Africa–UAE trade flows — starting with{' '}
              <span className='text-gradient'>real cargo</span>
            </h1>
            <h2 className='text-xl lg:text-2xl font-poppins font-semibold text-charcoal mb-5 leading-tight max-w-3xl'>
              Fractional exposure to FMCG inventory and receivables — on-chain
              provenance, VARA-aligned distribution target in the UAE.
            </h2>
            <p className='text-base md:text-lg mb-6 font-inter text-gc-text-muted max-w-3xl leading-relaxed'>
              One active shipment and a prototype today. We do not market live
              tokenized AUM until issuance closes and we publish disclosures.
            </p>
            <div className='flex flex-wrap gap-2 mb-8'>
              <Link
                href='/how-it-works'
                className='inline-flex items-center rounded-full border border-[rgba(214,195,163,0.4)] px-3 py-1.5 text-sm font-medium text-gc-text-muted hover:border-edge-purple/40 hover:text-edge-purple transition-colors'
              >
                Issuance &amp; controls
              </Link>
              <Link
                href='/assets'
                className='inline-flex items-center rounded-full border border-[rgba(214,195,163,0.4)] px-3 py-1.5 text-sm font-medium text-gc-text-muted hover:border-edge-purple/40 hover:text-edge-purple transition-colors'
              >
                Marketplace
              </Link>
              <Link
                href='/assets?category=tradetokens'
                className='inline-flex items-center rounded-full border border-[rgba(214,195,163,0.4)] px-3 py-1.5 text-sm font-medium text-gc-text-muted hover:border-edge-purple/40 hover:text-edge-purple transition-colors'
              >
                Trade tokens
              </Link>
              <Link
                href='/assets?category=containers'
                className='inline-flex items-center rounded-full border border-[rgba(214,195,163,0.4)] px-3 py-1.5 text-sm font-medium text-gc-text-muted hover:border-edge-purple/40 hover:text-edge-purple transition-colors'
              >
                Containers
              </Link>
              <Link
                href='/investors'
                className='inline-flex items-center rounded-full border border-[rgba(214,195,163,0.4)] px-3 py-1.5 text-sm font-medium text-gc-text-muted hover:border-edge-purple/40 hover:text-edge-purple transition-colors'
              >
                For investors
              </Link>
            </div>
            <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
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
              <button
                type='button'
                onClick={() => setShowWaitlistModal(true)}
                className='btn-outline px-8 py-4 text-lg'
              >
                Get updates
              </button>
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
                One container in motion on the lane today.
              </div>
            </div>
            <div className='gc-metric-panel p-6 text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-edge-purple mb-2'>
                FMCG inventory &amp; receivables
              </div>
              <div className='text-sm text-gc-text-muted font-medium leading-snug'>
                First pilot asset class.
              </div>
            </div>
            <div className='gc-metric-panel p-6 text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-edge-purple mb-2'>
                Pilot in progress
              </div>
              <div className='text-sm text-gc-text-muted font-medium leading-snug'>
                Tokenization not issued yet; prototype underway.
              </div>
            </div>
            <div className='gc-metric-panel p-6 text-center lg:text-left'>
              <div className='text-lg font-poppins font-bold text-edge-purple mb-2'>
                VARA-aligned issuance
              </div>
              <div className='text-sm text-gc-text-muted font-medium leading-snug'>
                UAE distribution design target.
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
            <p className='text-lg text-gc-text-muted max-w-2xl mx-auto leading-relaxed'>
              The path from verification to participation — full detail on{' '}
              <Link
                href='/how-it-works'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                how it works
              </Link>{' '}
              and{' '}
              <Link
                href='/investors'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                investors
              </Link>
              .
            </p>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8'>
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
                KYC/KYB before you can participate
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
                Containers, trade, property — as pilots list
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
                Reporting when instruments are live
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
                Fractional participation when offered
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
                Distributions per product terms
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
            <p className='text-lg text-gc-text-muted max-w-2xl mx-auto leading-relaxed'>
              Pilot first; more{' '}
              <Link
                href='/how-it-works'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                asset classes
              </Link>{' '}
              as the program matures.
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
              <p className='text-gc-text-muted mb-4 leading-snug text-sm md:text-base'>
                Container-level provenance on trade lanes
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
              <p className='text-gc-text-muted mb-4 leading-snug text-sm md:text-base'>
                Income property — on the roadmap, not pilot one
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
              <p className='text-gc-text-muted mb-4 leading-snug text-sm md:text-base'>
                FMCG inventory &amp; receivables — first pilot focus
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
              <p className='text-gc-text-muted mb-4 leading-snug text-sm md:text-base'>
                Vaulted commodities — future program slot
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
            <p className='text-lg text-gc-text-muted max-w-2xl mx-auto leading-relaxed'>
              No marketed AUM or platform-wide yields until an instrument and
              reporting are live.
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
              <div className='text-sm text-gc-text-muted leading-snug'>
                SA→UAE lane; cargo moving — not a marketed token yet.
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
              <div className='text-sm text-gc-text-muted leading-snug'>
                In build — no “live tokenized inventory” until close conditions
                are met.
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
              <div className='text-sm text-gc-text-muted leading-snug'>
                Yields only with offering docs — never platform averages.
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
            <p className='text-lg text-gc-text-muted max-w-2xl mx-auto leading-relaxed'>
              <Link
                href='/security'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                Security &amp; compliance
              </Link>{' '}
              overview — identity, custody, attestations.
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
              <p className='text-gc-text-muted leading-snug text-sm md:text-base'>
                Identity for every participant before access
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
              <p className='text-gc-text-muted leading-snug text-sm md:text-base'>
                Multi-sig and cold-storage posture as we scale
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
              <p className='text-gc-text-muted leading-snug text-sm md:text-base'>
                Third-party checks on condition, location, performance
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
            <p className='text-lg text-gc-text-muted max-w-2xl mx-auto leading-relaxed'>
              Early-stage issuer path: VARA-aligned design for{' '}
              <Link
                href='/assets?category=tradetokens'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                trade inventory
              </Link>{' '}
              +{' '}
              <Link
                href='/assets?category=containers'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                logistics
              </Link>
              ;{' '}
              <Link
                href='/assets?category=property'
                className='text-edge-purple hover:text-gc-emerald transition-colors'
              >
                property
              </Link>{' '}
              later — not platform-wide live today.
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
              <h3 className='text-xl font-poppins font-bold text-charcoal mb-3'>
                VARA-aligned issuance
              </h3>
              <p className='text-gc-text-muted mb-5 text-sm leading-snug'>
                Dubai VARA framework as design target — we do not claim approvals
                we have not received.
              </p>
              <ul className='text-left space-y-2 text-sm text-gc-text-muted'>
                <li className='flex items-start gap-2'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald shrink-0 mt-0.5'
                    size={12}
                  />
                  Legal review before public sale language
                </li>
                <li className='flex items-start gap-2'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald shrink-0 mt-0.5'
                    size={12}
                  />
                  Suitability &amp; risk disclosures per product
                </li>
              </ul>
            </div>

            <div className='liquid-metal-card p-8 text-center'>
              <div className='w-16 h-16 bg-gc-emerald rounded-full flex items-center justify-center mx-auto mb-6'>
                <Icon name='link' className='text-gc-cream-soft text-xl' size={20} />
              </div>
              <h3 className='text-xl font-poppins font-bold text-charcoal mb-3'>
                On-chain rails
              </h3>
              <p className='text-gc-text-muted mb-5 text-sm leading-snug'>
                Immutable records, tracking hooks, and contract automation as
                instruments go live.
              </p>
              <ul className='text-left space-y-2 text-sm text-gc-text-muted'>
                <li className='flex items-start gap-2'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald shrink-0 mt-0.5'
                    size={12}
                  />
                  Ownership provenance on-chain
                </li>
                <li className='flex items-start gap-2'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald shrink-0 mt-0.5'
                    size={12}
                  />
                  Logistics-linked attestations where applicable
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
              <h3 className='text-xl font-poppins font-bold text-charcoal mb-3'>
                Why this corridor
              </h3>
              <p className='text-gc-text-muted mb-5 text-sm leading-snug'>
                FMCG flows with documents and repeatable shipping — diligence the
                cargo, not only the deck.
              </p>
              <ul className='text-left space-y-2 text-sm text-gc-text-muted'>
                <li className='flex items-start gap-2'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald shrink-0 mt-0.5'
                    size={12}
                  />
                  BoL / checkpoint visibility where we operate
                </li>
                <li className='flex items-start gap-2'>
                  <Icon
                    name='check-circle'
                    className='text-gc-emerald shrink-0 mt-0.5'
                    size={12}
                  />
                  UAE as settlement &amp; distribution entry point
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
          <p className='text-gc-text-muted mb-6 leading-relaxed text-sm md:text-base'>
            No partner marks without a public or signed relationship. Logistics,
            custody, or allocator? Reach out below.
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
              <p className='text-lg text-gc-text-muted leading-relaxed'>
                Notes on RWA, logistics, and Gulf markets —{' '}
                <Link
                  href='/insights'
                  className='text-edge-purple hover:text-gc-emerald transition-colors'
                >
                  all articles
                </Link>
                .
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
            <Link
              href='/insights'
              className='liquid-metal-card card-hover overflow-hidden rounded-gc-card-lg block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gc-gold/60'
            >
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
                <p className='text-gc-text-muted mb-4 leading-snug text-sm'>
                  Supply chain disruptions and container demand — read on
                  Insights.
                </p>
                <div className='flex items-center text-sm text-gc-text-subtle font-mono'>
                  <span>Dec 15, 2024</span>
                  <span className='mx-2'>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </Link>
            <Link
              href='/insights'
              className='liquid-metal-card card-hover overflow-hidden rounded-gc-card-lg block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gc-gold/60'
            >
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
                <p className='text-gc-text-muted mb-4 leading-snug text-sm'>
                  Property tokenization and liquidity — full piece on Insights.
                </p>
                <div className='flex items-center text-sm text-gc-text-subtle font-mono'>
                  <span>Dec 12, 2024</span>
                  <span className='mx-2'>•</span>
                  <span>7 min read</span>
                </div>
              </div>
            </Link>
            <Link
              href='/insights'
              className='liquid-metal-card card-hover overflow-hidden rounded-gc-card-lg block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gc-gold/60'
            >
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
                <p className='text-gc-text-muted mb-4 leading-snug text-sm'>
                  Gold and silver tokens as a hedge — continue on Insights.
                </p>
                <div className='flex items-center text-sm text-gc-text-subtle font-mono'>
                  <span>Dec 10, 2024</span>
                  <span className='mx-2'>•</span>
                  <span>6 min read</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative py-24 gradient-bg overflow-hidden'>
        <div className='absolute inset-0 global-topology opacity-30 pointer-events-none' />
        <div className='relative max-w-4xl mx-auto px-6 lg:px-8 text-center'>
          <h2 className='text-4xl lg:text-5xl font-poppins font-bold text-gc-cream-soft mb-6 tracking-tight'>
            Pilots in motion
          </h2>
          <p className='text-lg md:text-xl text-gc-cream-soft/95 mb-8 leading-relaxed max-w-2xl mx-auto'>
            Get product updates, or book time if you are evaluating trade RWA in
            the Gulf.
          </p>
          <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6'>
            <Link
              href='/get-started'
              className='bg-gc-cream-soft text-edge-purple px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-gc-cream transition-colors shadow-gc-card inline-flex items-center justify-center'
            >
              Get started
            </Link>
            <button
              type='button'
              onClick={() => setShowWaitlistModal(true)}
              className='border-2 border-gc-cream-soft/90 text-gc-cream-soft px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-gc-cream-soft/10 transition-colors inline-flex items-center justify-center'
            >
              Email updates
            </button>
            <a
              href='https://calendly.com/mohammed-sidat-/global-next-global-edge'
              target='_blank'
              rel='noopener noreferrer'
              className='border-2 border-gc-cream-soft/90 text-gc-cream-soft px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-gc-cream-soft/10 transition-colors inline-flex items-center justify-center'
            >
              Book a call
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
