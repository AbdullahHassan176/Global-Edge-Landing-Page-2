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

    console.log('Dashboard: Checking user data...', { userData, provider });

    if (!userData) {
      console.log('Dashboard: No user data found, redirecting to login');
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      console.log('Dashboard: User data loaded successfully', parsedUser);
      setUser(parsedUser);
      setAuthProvider(provider);
    } catch (error) {
      console.error('Dashboard: Error parsing user data', error);
      localStorage.removeItem('user');
      localStorage.removeItem('authProvider');
      router.push('/login');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Icon name="building" className="text-white text-lg" />
                </div>
                <span className="text-2xl font-poppins font-bold text-charcoal">Global Edge</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="user" className="text-white" />
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <Icon name="logout" className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-6">
            <Icon 
              name={authProvider === 'github' ? 'github' : authProvider === 'linkedin' ? 'linkedin' : 'envelope'} 
              className="h-4 w-4 mr-2 text-gray-600" 
            />
            <span className="text-sm font-medium text-gray-700 capitalize">
              Signed in with {authProvider || 'Email'}
            </span>
          </div>
          <h1 className="text-4xl font-poppins font-bold text-charcoal mb-4">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access your investment dashboard, manage your portfolio, and explore new opportunities in tokenized assets.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Investor Dashboard Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-global-teal to-edge-purple p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Investment Dashboard</h2>
                  <p className="text-white/90">Manage your portfolio and track investments</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Icon name="chart-line" className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Icon name="check-circle" className="h-5 w-5 text-green-500 mr-3" />
                  <span>Portfolio analytics and performance tracking</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Icon name="check-circle" className="h-5 w-5 text-green-500 mr-3" />
                  <span>Investment history and transaction records</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Icon name="check-circle" className="h-5 w-5 text-green-500 mr-3" />
                  <span>Real-time notifications and updates</span>
                </div>
              </div>
              <Link 
                href="/investor/dashboard"
                className="block w-full bg-gradient-to-r from-global-teal to-edge-purple text-white py-4 px-6 rounded-xl text-center font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Access Investment Dashboard
              </Link>
            </div>
          </div>

          {/* Issuer Dashboard Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-edge-purple to-global-teal p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Issuer Dashboard</h2>
                  <p className="text-white/90">Create and manage your tokenized assets</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Icon name="building" className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Icon name="check-circle" className="h-5 w-5 text-green-500 mr-3" />
                  <span>Asset creation and management tools</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Icon name="check-circle" className="h-5 w-5 text-green-500 mr-3" />
                  <span>Investor relationship management</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Icon name="check-circle" className="h-5 w-5 text-green-500 mr-3" />
                  <span>Performance analytics and reporting</span>
                </div>
              </div>
              <Link 
                href="/issuer/dashboard"
                className="block w-full bg-gradient-to-r from-edge-purple to-global-teal text-white py-4 px-6 rounded-xl text-center font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Access Issuer Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-charcoal mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/assets" 
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="search" className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse Assets</h3>
              <p className="text-sm text-gray-600 text-center">Explore investment opportunities</p>
            </Link>

            <Link 
              href="/reports" 
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="document-text" className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">View Reports</h3>
              <p className="text-sm text-gray-600 text-center">Check your investment reports</p>
            </Link>

            <Link 
              href="/settings" 
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="cog" className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-sm text-gray-600 text-center">Manage your preferences</p>
            </Link>

            <Link 
              href="/profile" 
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-200 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="user" className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>
              <p className="text-sm text-gray-600 text-center">Manage your account</p>
            </Link>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <Icon name="user-circle" className="h-8 w-8 text-global-teal mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Name</h3>
              <p className="text-gray-600">{user.name}</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <Icon name="envelope" className="h-8 w-8 text-global-teal mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <Icon 
                name={authProvider === 'github' ? 'github' : authProvider === 'linkedin' ? 'linkedin' : 'envelope'} 
                className="h-8 w-8 text-global-teal mx-auto mb-3" 
              />
              <h3 className="font-semibold text-gray-900 mb-2">Provider</h3>
              <p className="text-gray-600 capitalize">{authProvider || 'Email'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}