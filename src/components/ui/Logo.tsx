import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'default' | 'white';
}

export default function Logo({
  className = '',
  size = 'md',
  showText = true,
  variant = 'default',
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Isometric Cube Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox='0 0 40 40'
          className='w-full h-full'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {/* Cube faces with isometric perspective */}
          <path
            d='M20 5 L35 15 L25 25 L10 15 Z'
            fill='url(#topGradient)'
            stroke='url(#topGradient)'
            strokeWidth='2'
          />
          <path
            d='M10 15 L25 25 L25 40 L10 30 Z'
            fill='url(#leftGradient)'
            stroke='url(#leftGradient)'
            strokeWidth='2'
          />
          <path
            d='M25 25 L35 15 L35 30 L25 40 Z'
            fill='url(#rightGradient)'
            stroke='url(#rightGradient)'
            strokeWidth='2'
          />

          <defs>
            <linearGradient id='topGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#6B1F2A' />
              <stop offset='100%' stopColor='#C6A15B' />
            </linearGradient>
            <linearGradient
              id='leftGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#6B1F2A' />
              <stop offset='100%' stopColor='#1F6F54' />
            </linearGradient>
            <linearGradient
              id='rightGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#1F6F54' />
              <stop offset='100%' stopColor='#C6A15B' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className='flex flex-col'>
          <span
            className={`font-poppins font-bold ${
              variant === 'white'
                ? 'text-gc-cream-soft'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-gc-burgundy via-gc-emerald to-gc-gold'
            } ${textSizeClasses[size]}`}
          >
            GLOBAL
          </span>
          <span
            className={`font-poppins font-bold ${
              variant === 'white' ? 'text-gc-gold-light' : 'text-edge-purple'
            } ${textSizeClasses[size]} -mt-1`}
          >
            EDGE
          </span>
        </div>
      )}
    </div>
  );
}
