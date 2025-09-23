'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';

export default function TestIssuerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTestIssuerAccess = async () => {
    setIsLoading(true);
    
    try {
      // Simulate creating a test issuer account
      // In a real implementation, this would create a test issuer account
      // For now, we'll redirect to the issuer dashboard with a test account
      setTimeout(() => {
        router.push('/issuer/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Test issuer access error:', error);
      setIsLoading(false);
    }
  };

  const handleRegisterAsIssuer = () => {
    router.push('/register/role');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-global-teal to-edge-purple">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Logo className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-3xl font-bold text-white">
              Test Issuer Access
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Choose how you'd like to access the issuer dashboard
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleTestIssuerAccess}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-global-teal bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-global-teal mr-2"></div>
                  Accessing Test Account...
                </div>
              ) : (
                <div className="flex items-center">
                  <Icon name="user-check" className="mr-2" />
                  Access Test Issuer Account
                </div>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/60">or</span>
              </div>
            </div>

            <button
              onClick={handleRegisterAsIssuer}
              className="group relative w-full flex justify-center py-3 px-4 border border-white/20 text-sm font-medium rounded-lg text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              <div className="flex items-center">
                <Icon name="user-plus" className="mr-2" />
                Register as New Issuer
              </div>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-white/60">
              Test accounts are for demonstration purposes only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
