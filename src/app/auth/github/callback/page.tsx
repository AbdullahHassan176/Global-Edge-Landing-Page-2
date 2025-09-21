'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { oauthService } from '@/lib/oauthService';
import Icon from '@/components/ui/Icon';

export default function GitHubCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          return;
        }

        if (!code) {
          setStatus('error');
          return;
        }

        // Handle the OAuth callback
        const userData = await oauthService.handleGitHubCallback(code);
        setUser(userData);
        setStatus('success');

        // Store user data in localStorage for demo purposes
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authProvider', 'github');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);

      } catch (error) {
        console.error('GitHub callback error:', error);
        setStatus('error');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-global-teal via-blue-50 to-edge-purple flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="clock" className="animate-spin text-blue-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-charcoal mb-2">
                Authenticating with GitHub
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your GitHub account...
              </p>
            </>
          )}

          {status === 'success' && user && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="check-circle" className="text-green-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-charcoal mb-2">
                Welcome, {user.name}!
              </h2>
              <p className="text-gray-600 mb-4">
                Successfully authenticated with GitHub
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  Redirecting to your dashboard...
                </p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="exclamation-triangle" className="text-red-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-charcoal mb-2">
                Authentication Failed
              </h2>
              <p className="text-gray-600 mb-4">
                There was an error authenticating with GitHub. Please try again.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="bg-global-teal text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
