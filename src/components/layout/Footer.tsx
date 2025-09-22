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
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <Logo size="md" variant="white" />
            </div>
            <p className="text-gray-400 mb-6">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="twitter" className="text-lg" size={12} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="linkedin" className="text-lg" size={12} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="github" className="text-lg" size={12} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="/assets" className="hover:text-white transition-colors">Assets</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold mb-4">Investors</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/get-started" className="hover:text-white transition-colors">Get Started</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/risk-disclosures" className="hover:text-white transition-colors">Risk Disclosures</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Get the latest insights and opportunities</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-l-full flex-1 focus:outline-none focus:ring-2 focus:ring-global-teal"
                required
              />
              <button
                type="submit"
                className="bg-global-teal px-6 py-2 rounded-r-full hover:bg-opacity-90 transition-colors"
              >
                <Icon name="paper-plane" size={12} />
              </button>
            </form>
            {isSubscribed && (
              <p className="text-green-400 text-sm mt-2 flex items-center">
                <Icon name="check-circle" size={12} className="mr-1" />
                Successfully subscribed to newsletter!
              </p>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} {businessConfig.companyName}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</a>
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
            <a href="/status" className="text-gray-400 hover:text-white text-sm transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
