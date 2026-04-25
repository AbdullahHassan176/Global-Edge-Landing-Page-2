'use client';

import Icon from '@/components/ui/Icon';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  showArrow?: boolean;
  backgroundGradient?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  showArrow = false,
  backgroundGradient = true,
}: HeroSectionProps) {
  return (
    <section
      className={`${
        backgroundGradient
          ? 'gradient-bg'
          : 'bg-gc-cream-soft text-charcoal'
      } h-[600px] relative overflow-hidden`}
    >
      {backgroundGradient ? (
        <div className='absolute inset-0 global-topology opacity-40 pointer-events-none' />
      ) : (
        <div className='absolute inset-0 global-topology opacity-50 pointer-events-none' />
      )}

      {backgroundGradient && (
        <div className='absolute bottom-0 right-0 w-96 h-96 opacity-20'>
          <div className='w-full h-full bg-gradient-to-tl from-gc-cream-soft/30 to-transparent rounded-full' />
        </div>
      )}

      <div className='relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center'>
        <div
          className={`max-w-3xl ${backgroundGradient ? 'text-gc-cream-soft' : 'text-charcoal'}`}
        >
          {subtitle && (
            <div className='flex items-center mb-4'>
              <span
                className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                  backgroundGradient
                    ? 'bg-black/20 text-gc-gold-light px-3 py-1.5 rounded-full border border-white/10'
                    : 'bg-gc-ivory/80 text-gc-text-muted px-3 py-1.5 rounded-full border border-[rgba(214,195,163,0.35)]'
                }`}
              >
                {subtitle}
              </span>
            </div>
          )}

          <h1 className='text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight tracking-tight'>
            {title}
          </h1>

          {description && (
            <p
              className={`text-xl lg:text-2xl mb-8 font-inter font-light leading-relaxed ${
                backgroundGradient
                  ? 'text-gc-cream-soft/95'
                  : 'text-gc-text-muted'
              }`}
            >
              {description}
            </p>
          )}

          <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6'>
            <Link
              href={primaryButtonHref}
              className={`px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-all flex items-center justify-center shadow-gc-card ${
                backgroundGradient
                  ? 'bg-gc-cream-soft text-edge-purple hover:bg-gc-cream'
                  : 'btn-primary'
              }`}
            >
              {primaryButtonText}
              {showArrow && <Icon name='arrow-right' className='ml-2' />}
            </Link>

            {secondaryButtonText && secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className={`border-2 px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-colors ${
                  backgroundGradient
                    ? 'border-gc-cream-soft/80 text-gc-cream-soft hover:bg-gc-cream-soft/10'
                    : 'btn-secondary'
                }`}
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
