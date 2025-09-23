'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';

const navigationItems = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Assets', href: '/assets' },
  { label: 'Investors', href: '/investors' },
  { label: 'Partners', href: '/partners' },
  { label: 'Insights', href: '/insights' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const pathname = usePathname();
  const notificationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  const handleNotificationClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsUserMenuOpen(false);
    setIsAdminMenuOpen(false);
  };

  const handleUserClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationsOpen(false);
    setIsAdminMenuOpen(false);
  };

  const handleAdminClick = () => {
    setIsAdminMenuOpen(!isAdminMenuOpen);
    setIsNotificationsOpen(false);
    setIsUserMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setIsAdminMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Logo size="md" />
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
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={handleNotificationClick}
                className="hidden md:block text-gray-600 hover:text-charcoal transition-colors relative"
              >
                <Icon name="bell" className="text-lg" size={12} />
                {/* Notification badge */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-charcoal">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">New asset available: Container #GE-2024-001</p>
                      <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">Your investment in Property Token #PT-2024-003 has been confirmed</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">Monthly report is ready for download</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <Link href="/admin/notifications" className="text-sm text-global-teal hover:text-edge-purple">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Menu */}
            <div className="relative" ref={adminRef}>
              <button 
                onClick={handleAdminClick}
                className="hidden md:block text-gray-600 hover:text-charcoal transition-colors"
                title="Admin Access"
              >
                <Icon name="cog" className="text-lg" size={12} />
              </button>
              
              {/* Admin menu dropdown */}
              {isAdminMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Admin Access</p>
                    </div>
                    <Link 
                      href="/admin/login" 
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Icon name="shield-halved" size={4} className="mr-3 text-global-teal" />
                      <div>
                        <div className="font-medium">Admin Portal</div>
                        <div className="text-xs text-gray-500">Sign in to admin dashboard</div>
                      </div>
                    </Link>
                    <Link 
                      href="/admin" 
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Icon name="chart-line" size={4} className="mr-3 text-global-teal" />
                      <div>
                        <div className="font-medium">Dashboard</div>
                        <div className="text-xs text-gray-500">View admin dashboard</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={userRef}>
              <button 
                onClick={handleUserClick}
                className="hidden md:block text-gray-600 hover:text-charcoal transition-colors"
              >
                <Icon name="user" className="text-lg" size={12} />
              </button>
              
              {/* User menu dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <Link href="/reports" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Reports
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign In
                    </Link>
                    <Link href="/get-started" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name="bars" className="text-charcoal text-lg" size={12} />
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
              
              {/* Mobile Admin Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Admin Access</p>
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/admin/login"
                    className="flex items-center text-global-teal hover:text-edge-purple transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="shield-halved" size={4} className="mr-2" />
                    Admin Portal
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center text-charcoal hover:text-global-teal transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="chart-line" size={4} className="mr-2" />
                    Admin Dashboard
                  </Link>
                  <Link
                    href="/test-issuer"
                    className="flex items-center text-charcoal hover:text-global-teal transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="user-plus" size={4} className="mr-2" />
                    Demo Access
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
