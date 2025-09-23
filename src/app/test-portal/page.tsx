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
      const loginResult = await userAuthService.login('issuer@globalnext.rocks', 'DemoIssuer123!');
      
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
      const loginResult = await userAuthService.login('investor@globalnext.rocks', 'DemoInvestor123!');
      
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
      <div className="min-h-screen bg-gradient-to-br from-global-teal to-edge-purple">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <Logo className="mx-auto h-12 w-auto" />
              <h2 className="mt-6 text-3xl font-bold text-white">
                Test Portal Access
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Enter the test PIN to access the demo portals
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-white">
                  Test PIN
                </label>
                <div className="mt-1">
                  <input
                    id="pin"
                    name="pin"
                    type="password"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 border border-white/20 placeholder-white/60 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm"
                    placeholder="Enter test PIN"
                    maxLength={4}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <div className="flex">
                    <Icon name="exclamation-triangle" className="h-5 w-5 text-red-300" />
                    <div className="ml-3">
                      <p className="text-sm text-red-200">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-global-teal bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
                >
                  <div className="flex items-center">
                    <Icon name="key" className="mr-2" />
                    Access Test Portal
                  </div>
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-white/60">
                Test portal is for demonstration purposes only
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-global-teal to-edge-purple">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <Logo className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-3xl font-bold text-white">
              Test Portal Dashboard
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Choose which demo portal you'd like to test
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex">
                <Icon name="exclamation-triangle" className="h-5 w-5 text-red-300" />
                <div className="ml-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Issuer Portal */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Icon name="building" className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Test Issuer Portal
                </h3>
                <p className="text-sm text-white/70 mb-4">
                  Access the issuer dashboard to test asset creation, investor management, and branding features.
                </p>
                <button
                  onClick={handleTestIssuerAccess}
                  disabled={isLoading}
                  className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-global-teal bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-global-teal mr-2"></div>
                      Accessing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Icon name="arrow-right" className="mr-2" />
                      Test Issuer Portal
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Test Investor Portal */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Icon name="chart-line" className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Test Investor Portal
                </h3>
                <p className="text-sm text-white/70 mb-4">
                  Access the investor dashboard to test asset browsing, portfolio management, and investment features.
                </p>
                <button
                  onClick={handleTestInvestorAccess}
                  disabled={isLoading}
                  className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-global-teal bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-global-teal mr-2"></div>
                      Accessing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Icon name="arrow-right" className="mr-2" />
                      Test Investor Portal
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Demo Account Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Demo Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Issuer Account</h4>
                <p className="text-white/70 mb-1">Email: issuer@globalnext.rocks</p>
                <p className="text-white/70 mb-1">Password: DemoIssuer123!</p>
                <p className="text-white/70">Company: Global Edge Demo Holdings</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Investor Account</h4>
                <p className="text-white/70 mb-1">Email: investor@globalnext.rocks</p>
                <p className="text-white/70 mb-1">Password: DemoInvestor123!</p>
                <p className="text-white/70">Status: KYC Approved</p>
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
              className="text-sm text-white/60 hover:text-white/80 transition-colors"
            >
              ← Back to PIN Entry
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-white/60">
              Test portal is for demonstration purposes only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
