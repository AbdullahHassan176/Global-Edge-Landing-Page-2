'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';
import { userAuthService } from '@/lib/userAuthService';

export default function TestPortalPage() {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (pin === '4949') {
      setIsAuthenticated(true);
    } else {
      setError('Invalid PIN. Please try again.');
    }
  };

  const handleTestIssuerAccess = async () => {
    setIsLoading(true);
    
    try {
      // Automatically log in as demo issuer
      const loginResult = await userAuthService.login('issuer@theglobaledge.io', 'DemoIssuer123!');
      
      if (loginResult.success) {
        router.push('/issuer/dashboard');
      } else {
        setError('Failed to access test issuer account. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Test issuer access error:', error);
      setError('Failed to access test issuer account. Please try again.');
      setIsLoading(false);
    }
  };

  const handleTestInvestorAccess = async () => {
    setIsLoading(true);
    
    try {
      // Automatically log in as demo investor
      const loginResult = await userAuthService.login('investor@theglobaledge.io', 'DemoInvestor123!');
      
      if (loginResult.success) {
        router.push('/investor/dashboard');
      } else {
        setError('Failed to access test investor account. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Test investor access error:', error);
      setError('Failed to access test investor account. Please try again.');
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Logo className="h-10 w-auto" />
              </div>
              <h2 className="text-4xl font-poppins font-bold text-white mb-2">
                Test Portal Access
              </h2>
              <p className="text-lg text-white/90 mb-2">
                Professional Demo Environment
              </p>
              <p className="text-sm text-white/70">
                Enter the test PIN to access the demo portals
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <form onSubmit={handlePinSubmit} className="space-y-6">
                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-white mb-2">
                    Test PIN
                  </label>
                  <div className="relative">
                    <input
                      id="pin"
                      name="pin"
                      type="password"
                      required
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="appearance-none relative block w-full px-4 py-4 border border-white/30 placeholder-white/60 text-white bg-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 text-lg text-center tracking-widest"
                      placeholder="••••"
                      maxLength={4}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Icon name="key" className="h-5 w-5 text-white/60" />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4">
                    <div className="flex">
                      <Icon name="exclamation-triangle" className="h-5 w-5 text-red-300 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-sm text-red-200">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-global-teal bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <div className="flex items-center">
                      <Icon name="shield-check" className="mr-3 h-5 w-5" />
                      Access Test Portal
                    </div>
                  </button>
                </div>
              </form>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-sm text-white/80 mb-2">
                  <Icon name="info-circle" className="inline mr-2" />
                  Test portal is for demonstration purposes only
                </p>
                <p className="text-xs text-white/60">
                  This environment contains sample data and is not connected to production systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <Logo className="h-10 w-auto" />
            </div>
            <h2 className="text-4xl font-poppins font-bold text-white mb-2">
              Test Portal Dashboard
            </h2>
            <p className="text-lg text-white/90 mb-2">
              Professional Demo Environment
            </p>
            <p className="text-sm text-white/70">
              Choose which demo portal you'd like to test
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4">
              <div className="flex">
                <Icon name="exclamation-triangle" className="h-5 w-5 text-red-300 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Test Issuer Portal */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Icon name="building" className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-white mb-3">
                  Test Issuer Portal
                </h3>
                <p className="text-base text-white/80 mb-6 leading-relaxed">
                  Access the issuer dashboard to test asset creation, investor management, and branding features.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-white/70">
                    <Icon name="check-circle" className="h-4 w-4 text-green-400 mr-2" />
                    Asset creation and management
                  </div>
                  <div className="flex items-center text-sm text-white/70">
                    <Icon name="check-circle" className="h-4 w-4 text-green-400 mr-2" />
                    Investor relationship tools
                  </div>
                  <div className="flex items-center text-sm text-white/70">
                    <Icon name="check-circle" className="h-4 w-4 text-green-400 mr-2" />
                    Branding and customization
                  </div>
                </div>
                <button
                  onClick={handleTestIssuerAccess}
                  disabled={isLoading}
                  className="w-full py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Accessing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Icon name="arrow-right" className="mr-3 h-5 w-5" />
                      Test Issuer Portal
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Test Investor Portal */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Icon name="chart-line" className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-white mb-3">
                  Test Investor Portal
                </h3>
                <p className="text-base text-white/80 mb-6 leading-relaxed">
                  Access the investor dashboard to test asset browsing, portfolio management, and investment features.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-white/70">
                    <Icon name="check-circle" className="h-4 w-4 text-green-400 mr-2" />
                    Asset browsing and discovery
                  </div>
                  <div className="flex items-center text-sm text-white/70">
                    <Icon name="check-circle" className="h-4 w-4 text-green-400 mr-2" />
                    Portfolio management tools
                  </div>
                  <div className="flex items-center text-sm text-white/70">
                    <Icon name="check-circle" className="h-4 w-4 text-green-400 mr-2" />
                    Investment tracking and analytics
                  </div>
                </div>
                <button
                  onClick={handleTestInvestorAccess}
                  disabled={isLoading}
                  className="w-full py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Accessing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Icon name="arrow-right" className="mr-3 h-5 w-5" />
                      Test Investor Portal
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Demo Account Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <div className="mx-auto h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Icon name="info-circle" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-white mb-2">
                Demo Account Information
              </h3>
              <p className="text-sm text-white/70">
                Pre-configured accounts for testing both user types
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                    <Icon name="building" className="h-5 w-5 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Issuer Account</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-white/80">
                    <Icon name="mail" className="h-4 w-4 text-white/60 mr-2" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2 text-white/90">issuer@theglobaledge.io</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Icon name="key" className="h-4 w-4 text-white/60 mr-2" />
                    <span className="font-medium">Password:</span>
                    <span className="ml-2 text-white/90">DemoIssuer123!</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Icon name="building" className="h-4 w-4 text-white/60 mr-2" />
                    <span className="font-medium">Company:</span>
                    <span className="ml-2 text-white/90">Global Edge Demo Holdings</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                    <Icon name="chart-line" className="h-5 w-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Investor Account</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-white/80">
                    <Icon name="mail" className="h-4 w-4 text-white/60 mr-2" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2 text-white/90">investor@theglobaledge.io</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Icon name="key" className="h-4 w-4 text-white/60 mr-2" />
                    <span className="font-medium">Password:</span>
                    <span className="ml-2 text-white/90">DemoInvestor123!</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Icon name="shield-check" className="h-4 w-4 text-white/60 mr-2" />
                    <span className="font-medium">Status:</span>
                    <span className="ml-2 text-green-400">KYC Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPin('');
                setError('');
              }}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30"
            >
              <Icon name="arrow-left" className="mr-2 h-4 w-4" />
              Back to PIN Entry
            </button>
          </div>

          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-sm text-white/80 mb-2">
                <Icon name="info-circle" className="inline mr-2" />
                Test portal is for demonstration purposes only
              </p>
              <p className="text-xs text-white/60">
                This environment contains sample data and is not connected to production systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
