'use client';

import { useState } from 'react';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import { configService } from '@/lib/configService';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Get configuration
  const siteConfig = configService.getSiteConfig();
  const businessConfig = configService.getBusinessConfig();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setIsSubscribed(true);
    setEmail('');

    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <footer className='bg-gc-wine text-gc-cream-soft border-t border-[rgba(107,31,42,0.45)]'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-16'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <div className='mb-6'>
              <Logo size='md' variant='white' />
            </div>
            <p className='text-gc-text-subtle mb-6 leading-relaxed'>
              {siteConfig.description}
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gc-text-subtle hover:text-gc-gold transition-colors'
              >
                <Icon name='twitter' className='text-lg' size={12} />
              </a>
              <a
                href='#'
                className='text-gc-text-subtle hover:text-gc-gold transition-colors'
              >
                <Icon name='linkedin' className='text-lg' size={12} />
              </a>
              <a
                href='#'
                className='text-gc-text-subtle hover:text-gc-gold transition-colors'
              >
                <Icon name='github' className='text-lg' size={12} />
              </a>
            </div>
          </div>

          <div>
            <h4 className='font-poppins font-semibold mb-4 text-gc-cream'>
              Platform
            </h4>
            <ul className='space-y-3 text-gc-text-subtle'>
              <li>
                <a
                  href='/how-it-works'
                  className='hover:text-gc-cream-soft transition-colors'
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href='/assets'
                  className='hover:text-gc-cream-soft transition-colors'
                >
                  Assets
                </a>
              </li>
              <li>
                <a
                  href='/pricing'
                  className='hover:text-gc-cream-soft transition-colors'
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href='/security'
                  className='hover:text-gc-cream-soft transition-colors'
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-poppins font-semibold mb-4 text-gc-cream'>
              Investors
            </h4>
            <ul className='space-y-3 text-gc-text-subtle'>
              <li>
                <a
                  href='/get-started'
                  className='hover:text-gc-cream-soft transition-colors'
                >
                  Get Started
                </a>
              </li>
              <li>
                <a
                  href='/dashboard'
                  className='hover:text-gc-cream-soft transition-colors'
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href='/faq'
                  className='hover:text-gc-cream-soft transition-colors'
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href='/risk-disclosures'
                  className='hover:text-gc-cream-soft transition-colors'
                >
                  Risk Disclosures
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-poppins font-semibold mb-4 text-gc-cream'>
              Stay Updated
            </h4>
            <p className='text-gc-text-subtle mb-4'>
              Get the latest insights and opportunities
            </p>
            <form onSubmit={handleNewsletterSubmit} className='flex'>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='bg-[rgba(26,26,26,0.35)] text-gc-cream-soft placeholder:text-gc-text-subtle px-4 py-2 rounded-l-full flex-1 border border-[rgba(198,161,91,0.25)] focus:outline-none focus:ring-2 focus:ring-gc-gold/50'
                required
              />
              <button
                type='submit'
                className='bg-gc-burgundy text-gc-cream-soft px-6 py-2 rounded-r-full hover:bg-gc-burgundy-light transition-colors border border-gc-burgundy-light'
              >
                <Icon name='paper-plane' size={12} />
              </button>
            </form>
            {isSubscribed && (
              <p className='text-gc-emerald-light text-sm mt-2 flex items-center'>
                <Icon name='check-circle' size={12} className='mr-1' />
                Successfully subscribed to newsletter!
              </p>
            )}
          </div>
        </div>

        <div className='border-t border-[rgba(107,31,42,0.45)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gc-text-subtle text-sm'>
            © {new Date().getFullYear()} {businessConfig.companyName}. All
            rights reserved.
          </p>
          <div className='flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0'>
            <a
              href='/terms'
              className='text-gc-text-subtle hover:text-gc-gold text-sm transition-colors'
            >
              Terms & Conditions
            </a>
            <a
              href='/privacy'
              className='text-gc-text-subtle hover:text-gc-gold text-sm transition-colors'
            >
              Privacy Policy
            </a>
            <a
              href='/cookies'
              className='text-gc-text-subtle hover:text-gc-gold text-sm transition-colors'
            >
              Cookies
            </a>
            <a
              href='/status'
              className='text-gc-text-subtle hover:text-gc-gold text-sm transition-colors'
            >
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
