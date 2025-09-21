'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Assets', href: '/assets' },
  { label: 'Investors', href: '/investors' },
  { label: 'Partners', href: '/partners' },
  { label: 'Insights', href: '/insights' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon="cube" className="text-white text-lg" />
              </div>
              <span className="text-xl font-poppins font-bold text-charcoal">Global Edge</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium cursor-pointer transition-colors ${
                    pathname === item.href
                      ? 'text-global-teal border-b-2 border-global-teal pb-1'
                      : 'text-charcoal hover:text-global-teal'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-600 hover:text-charcoal transition-colors">
              <FontAwesomeIcon icon="bell" className="text-xl" />
            </button>
            <button className="hidden md:block text-gray-600 hover:text-charcoal transition-colors">
              <FontAwesomeIcon icon="user" className="text-xl" />
            </button>
            <button className="btn-primary">
              Dashboard
            </button>
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FontAwesomeIcon icon="bars" className="text-charcoal text-xl" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium cursor-pointer transition-colors ${
                    pathname === item.href
                      ? 'text-global-teal'
                      : 'text-charcoal hover:text-global-teal'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
