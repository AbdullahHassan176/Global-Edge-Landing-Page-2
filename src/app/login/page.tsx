'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import { oauthService } from '@/lib/oauthService';
import { userAuthService } from '@/lib/userAuthService';
import { userAuthIntegration } from '@/lib/integration/userAuthIntegration';
import { loginStorageService } from '@/lib/loginStorageService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'github' | 'linkedin' | null>(null);
  const [error, setError] = useState('');

  // Load saved credentials on component mount
  useEffect(() => {
    const savedCredentials = loginStorageService.getAutoFillData('user');
    if (savedCredentials) {
      if (savedCredentials.email) {
        setEmail(savedCredentials.email);
      }
      if (savedCredentials.username) {
        setEmail(savedCredentials.username); // Use username as email for login
      }
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Use integration service with database fallback
      const result = await userAuthIntegration.login(email, password);
      
      if (result.success && result.user) {
        // Save credentials if remember me is checked
        if (rememberMe) {
          loginStorageService.saveCredentials({
            email: email,
            rememberMe: true,
            loginType: 'user'
          });
        } else {
          // Clear saved credentials if remember me is unchecked
          loginStorageService.clearSavedCredentials();
        }

        // Redirect to appropriate dashboard based on user role
        if (result.user.role === 'issuer') {
          router.push('/issuer/dashboard');
        } else {
          router.push('/investor/dashboard');
        }
      } else {
        // Handle different error types
        if (result.user?.status === 'pending') {
          setError('Your account is pending approval.');
        } else if (result.user?.status === 'suspended') {
          setError('Your account has been suspended.');
        } else {
          setError(result.error || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setOauthLoading('github');
    try {
      // For development, use mock authentication
      // In production, this would redirect to GitHub OAuth
      if (process.env.NODE_ENV === 'development') {
        const user = await oauthService.mockGitHubAuth();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authProvider', 'github');
        window.location.href = '/dashboard';
      } else {
        oauthService.initiateGitHubLogin();
      }
    } catch (error) {
      console.error('GitHub login error:', error);
      setError('GitHub login failed. Please try again or use email/password login.');
      setOauthLoading(null);
    }
  };

  const handleLinkedInLogin = async () => {
    setOauthLoading('linkedin');
    try {
      // For development, use mock authentication
      // In production, this would redirect to LinkedIn OAuth
      if (process.env.NODE_ENV === 'development') {
        const user = await oauthService.mockLinkedInAuth();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authProvider', 'linkedin');
        window.location.href = '/dashboard';
      } else {
        oauthService.initiateLinkedInLogin();
      }
    } catch (error) {
      console.error('LinkedIn login error:', error);
      setError('LinkedIn login failed. Please try again or use email/password login.');
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-global-teal via-blue-50 to-edge-purple flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-global-teal rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-edge-purple rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mr-3">
              <Icon name="building" className="text-white text-xl" />
            </div>
            <span className="text-2xl font-poppins font-bold text-charcoal">Global Edge</span>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-poppins font-bold text-white mb-4">
            Welcome Back
          </h2>
          <p className="text-white/80 text-lg">
            Sign in to access your investment dashboard
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-lg py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-12 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="envelope" className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent transition-all duration-200 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="lock-closed" className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent transition-all duration-200 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon 
                    name={showPassword ? "eye-slash" : "eye"} 
                    className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" 
                  />
                </button>
              </div>
            </div>

            {/* Remember Me and Actions */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-global-teal focus:ring-global-teal border-gray-300 rounded transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <button
                  type="button"
                  onClick={() => {
                    loginStorageService.clearSavedCredentials();
                    setEmail('');
                    setPassword('');
                    setRememberMe(false);
                  }}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors text-left"
                >
                  Clear saved login
                </button>
                <Link 
                  href="/forgot-password" 
                  className="text-sm font-semibold text-global-teal hover:text-edge-purple transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`rounded-xl p-4 mb-4 ${
                error.includes('pending admin approval') || error.includes('pending approval') 
                  ? 'bg-yellow-500/20 border border-yellow-500/50' 
                  : error.includes('suspended')
                  ? 'bg-red-500/20 border border-red-500/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}>
                <div className="flex items-start">
                  <Icon 
                    name={error.includes('pending admin approval') || error.includes('pending approval') ? 'clock' : 'exclamation-triangle'} 
                    className={`mr-3 mt-0.5 ${
                      error.includes('pending admin approval') || error.includes('pending approval')
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`} 
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${
                      error.includes('pending admin approval') || error.includes('pending approval')
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}>
                      {error}
                    </p>
                    {(error.includes('pending admin approval') || error.includes('pending approval')) && (
                      <div className="mt-3 text-xs text-yellow-300">
                        <p><strong>Need help?</strong> Contact info@theglobaledge.io or +971 50 123 4567</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-global-teal to-edge-purple hover:from-global-teal/90 hover:to-edge-purple/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-global-teal disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Icon name="clock" className="animate-spin mr-2 h-5 w-5" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Icon name="arrow-right" className="mr-2 h-5 w-5" />
                    Sign In
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={handleGitHubLogin}
                disabled={oauthLoading !== null}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {oauthLoading === 'github' ? (
                  <Icon name="clock" className="animate-spin h-5 w-5" />
                ) : (
                  <Icon name="github" className="h-5 w-5" />
                )}
                <span className="ml-2">
                  {oauthLoading === 'github' ? 'Connecting...' : 'GitHub'}
                </span>
              </button>

              <button 
                onClick={handleLinkedInLogin}
                disabled={oauthLoading !== null}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {oauthLoading === 'linkedin' ? (
                  <Icon name="clock" className="animate-spin h-5 w-5" />
                ) : (
                  <Icon name="linkedin" className="h-5 w-5" />
                )}
                <span className="ml-2">
                  {oauthLoading === 'linkedin' ? 'Connecting...' : 'LinkedIn'}
                </span>
              </button>
            </div>

            {/* OAuth Notice */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <Icon name="info-circle" className="text-blue-600 text-sm mr-2 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <p className="font-semibold mb-1">OAuth Login Notice</p>
                  <p>OAuth providers (GitHub, LinkedIn) are currently in demo mode. For full functionality, please use email/password login or contact support for OAuth setup.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm">
            Don't have an account?{' '}
            <Link href="/register/role" className="font-semibold text-white hover:text-global-teal transition-colors">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
