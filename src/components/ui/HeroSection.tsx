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
  backgroundGradient = true
}: HeroSectionProps) {
  return (
    <section className={`${backgroundGradient ? 'gradient-bg' : 'bg-white'} h-[600px] relative overflow-hidden`}>
      {backgroundGradient && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
            <div className="w-full h-full bg-gradient-to-tl from-aqua-start to-transparent rounded-full" />
          </div>
        </>
      )}
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
        <div className={`max-w-3xl ${backgroundGradient ? 'text-white' : 'text-charcoal'}`}>
          {subtitle && (
            <div className="flex items-center mb-4">
              <span className={`text-sm font-medium ${backgroundGradient ? 'bg-white bg-opacity-20' : 'bg-gray-100'} px-3 py-1 rounded-full`}>
                {subtitle}
              </span>
            </div>
          )}
          
          <h1 className="text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight">
            {title}
          </h1>
          
          {description && (
            <p className={`text-xl lg:text-2xl mb-8 font-inter font-light ${backgroundGradient ? 'opacity-90' : 'text-gray-600'}`}>
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href={primaryButtonHref}
              className={`px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-colors flex items-center justify-center ${
                backgroundGradient
                  ? 'bg-white text-global-teal hover:bg-opacity-90'
                  : 'bg-global-teal text-white hover:bg-opacity-90'
              }`}
            >
              {primaryButtonText}
              {showArrow && (
                <Icon name="arrow-right" className="ml-2"  />
              )}
            </Link>
            
            {secondaryButtonText && secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className={`border-2 px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-colors ${
                  backgroundGradient
                    ? 'border-white text-white hover:bg-white hover:text-global-teal'
                    : 'border-edge-purple text-edge-purple hover:bg-edge-purple hover:text-white'
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
