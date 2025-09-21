'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'github' | 'linkedin' | 'email';
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authProvider, setAuthProvider] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const provider = localStorage.getItem('authProvider');

    if (!userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    setAuthProvider(provider);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authProvider');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="clock" className="animate-spin text-global-teal text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mr-3">
                  <Icon name="building" className="text-white text-sm" />
                </div>
                <span className="text-xl font-poppins font-bold text-charcoal">Global Edge</span>
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Icon name="logout" className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-4">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <Icon name="user" className="text-white text-2xl" />
              )}
            </div>
            <h1 className="text-3xl font-poppins font-bold text-charcoal mb-2">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
              <Icon 
                name={authProvider === 'github' ? 'github' : authProvider === 'linkedin' ? 'linkedin' : 'envelope'} 
                className="h-4 w-4 mr-2 text-gray-600" 
              />
              <span className="text-sm font-medium text-gray-700 capitalize">
                Signed in with {authProvider || 'Email'}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Account Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Icon name="user-circle" className="h-6 w-6 text-global-teal mr-2" />
                <h3 className="text-lg font-semibold text-charcoal">Account Information</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Name:</span> {user.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Provider:</span> {authProvider || 'Email'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Icon name="lightning-bolt" className="h-6 w-6 text-global-teal mr-2" />
                <h3 className="text-lg font-semibold text-charcoal">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <Link 
                  href="/assets" 
                  className="block w-full bg-global-teal text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-opacity-90 transition-colors"
                >
                  Browse Assets
                </Link>
                <Link 
                  href="/reports" 
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                >
                  View Reports
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Icon name="clock" className="h-6 w-6 text-global-teal mr-2" />
                <h3 className="text-lg font-semibold text-charcoal">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Icon name="check-circle" className="h-4 w-4 text-green-500 mr-2" />
                  Successfully logged in
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Icon name="user-plus" className="h-4 w-4 text-blue-500 mr-2" />
                  Account created
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Icon name="shield-check" className="h-4 w-4 text-purple-500 mr-2" />
                  Email verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}