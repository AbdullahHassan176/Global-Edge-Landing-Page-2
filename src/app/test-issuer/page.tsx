'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import { userAuthService } from '@/lib/userAuthService';

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export default function TestIssuerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createTestIssuer = async () => {
    setLoading(true);
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        console.error('localStorage not available on server side');
        return;
      }

      // Create a test issuer user
      const testIssuer = {
        id: 'test-issuer-1',
        firstName: 'Test',
        lastName: 'Issuer',
        email: 'issuer@test.com',
        phone: '+1 (555) 123-4567',
        country: 'UAE',
        role: 'issuer' as const,
        status: 'active' as const,
        kycStatus: 'approved' as const,
        totalInvested: 0,
        investmentLimit: 1000000,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Save to localStorage
      const storedUsers = localStorage.getItem('registered_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(testIssuer);
      localStorage.setItem('registered_users', JSON.stringify(users));

      // Set as current user
      localStorage.setItem('current_user', JSON.stringify(testIssuer));

      // Redirect to issuer dashboard
      router.push('/issuer/dashboard');
    } catch (error) {
      console.error('Error creating test issuer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-global-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="user-plus" className="text-global-teal text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Issuer Access</h1>
            <p className="text-gray-600">
              Create a test issuer account to access the asset creation processes
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">What you'll get access to:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Asset creation workflow (9-step process)</li>
                <li>• Investor management system</li>
                <li>• KYC tracking and approval</li>
                <li>• Branding and customization</li>
                <li>• Admin approval workflow</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-green-900 mb-2">Test Account Details:</h3>
              <div className="text-sm text-green-800">
                <p><strong>Email:</strong> issuer@test.com</p>
                <p><strong>Password:</strong> Password123!</p>
                <p><strong>Role:</strong> Issuer</p>
              </div>
            </div>
          </div>

          <button
            onClick={createTestIssuer}
            disabled={loading}
            className="w-full bg-global-teal text-white py-3 px-4 rounded-lg font-medium hover:bg-global-teal-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Test Account...
              </>
            ) : (
              <>
                <Icon name="rocket-launch" className="mr-2" />
                Create Test Issuer Account
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Or{' '}
              <a
                href="/register/role"
                className="text-global-teal hover:text-global-teal-dark font-medium"
              >
                register normally as an issuer
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
