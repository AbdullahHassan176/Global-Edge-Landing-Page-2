'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon="cube" className="text-white text-lg" />
              </div>
              <span className="text-xl font-poppins font-bold">Global Edge</span>
            </div>
            <p className="text-gray-400 mb-6">
              Tokenizing trade, containers & real estate for the next generation of investors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FontAwesomeIcon icon={['fab', 'twitter']} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FontAwesomeIcon icon={['fab', 'linkedin']} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FontAwesomeIcon icon={['fab', 'github']} className="text-xl" />
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
                <FontAwesomeIcon icon="paper-plane" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Global Edge. All rights reserved.</p>
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
