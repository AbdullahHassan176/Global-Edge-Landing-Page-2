'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAuthService, AdminUser } from '@/lib/adminAuthService';
import Icon from '@/components/ui/Icon';

interface AdminAuthGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRole?: string;
}

export default function AdminAuthGuard({ 
  children, 
  requiredPermissions = [], 
  requiredRole 
}: AdminAuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const currentUser = adminAuthService.getCurrentUser();
      const authenticated = adminAuthService.isAuthenticated();

      if (!authenticated || !currentUser) {
        setIsAuthenticated(false);
        setUser(null);
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      // Check role requirement
      if (requiredRole && !adminAuthService.hasRole(requiredRole)) {
        setIsAuthenticated(true);
        setUser(currentUser);
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      // Check permission requirements
      if (requiredPermissions.length > 0) {
        const hasAllPermissions = requiredPermissions.every(permission => 
          adminAuthService.hasPermission(permission)
        );
        
        if (!hasAllPermissions) {
          setIsAuthenticated(true);
          setUser(currentUser);
          setHasAccess(false);
          setIsLoading(false);
          return;
        }
      }

      // All checks passed
      setIsAuthenticated(true);
      setUser(currentUser);
      setHasAccess(true);
      setIsLoading(false);

      // Extend session on activity
      adminAuthService.extendSession();
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setUser(null);
      setHasAccess(false);
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/admin/login');
  };

  const handleLogout = () => {
    adminAuthService.logout();
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="clock" className="text-white text-2xl animate-spin" />
          </div>
          <h3 className="text-xl font-poppins font-semibold text-gray-700 mb-2">
            Verifying Access
          </h3>
          <p className="text-gray-500">
            Checking admin permissions...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-global-teal/20 to-edge-purple/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-edge-purple/20 to-global-teal/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-global-teal/10 to-edge-purple/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Security Icons */}
        <div className="absolute top-20 left-20 text-global-teal/30 animate-bounce delay-300">
          <Icon name="shield-halved" className="text-4xl" />
        </div>
        <div className="absolute top-32 right-32 text-edge-purple/30 animate-bounce delay-700">
          <Icon name="lock-closed" className="text-3xl" />
        </div>
        <div className="absolute bottom-32 left-32 text-global-teal/30 animate-bounce delay-1000">
          <Icon name="key" className="text-3xl" />
        </div>
        <div className="absolute bottom-20 right-20 text-edge-purple/30 animate-bounce delay-500">
          <Icon name="eye" className="text-4xl" />
        </div>

        {/* Main Content Card */}
        <div className="relative z-10 max-w-lg w-full mx-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
            {/* Animated Lock Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                <Icon name="lock-closed" className="text-white text-3xl" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Title with Gradient Text */}
            <h1 className="text-4xl font-poppins font-bold mb-4">
              <span className="bg-gradient-to-r from-global-teal to-edge-purple bg-clip-text text-transparent">
                Access Required
              </span>
            </h1>
            
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              This area is restricted to authorized administrators only. 
              Please authenticate to continue.
            </p>

            {/* Security Features List */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center justify-center">
                <Icon name="shield-halved" className="mr-2 text-global-teal" />
                Security Features
              </h3>
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-center justify-center">
                  <Icon name="check-circle" className="mr-2 text-green-400" />
                  Multi-factor authentication
                </div>
                <div className="flex items-center justify-center">
                  <Icon name="check-circle" className="mr-2 text-green-400" />
                  Role-based access control
                </div>
                <div className="flex items-center justify-center">
                  <Icon name="check-circle" className="mr-2 text-green-400" />
                  Encrypted data transmission
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLoginRedirect}
              className="w-full bg-gradient-to-r from-global-teal to-edge-purple text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-global-teal/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            >
              <Icon name="arrow-right" className="mr-2 group-hover:translate-x-1 transition-transform" />
              Access Admin Portal
            </button>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm">
                Need help? Contact your system administrator
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Security Badge */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
            <div className="flex items-center space-x-2 text-white/70">
              <Icon name="shield-halved" className="text-global-teal" />
              <span className="text-sm font-medium">Secure Admin Access</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-orange-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Warning Icons */}
        <div className="absolute top-20 left-20 text-orange-400/30 animate-bounce delay-300">
          <Icon name="exclamation-triangle" className="text-4xl" />
        </div>
        <div className="absolute top-32 right-32 text-red-400/30 animate-bounce delay-700">
          <Icon name="ban" className="text-3xl" />
        </div>
        <div className="absolute bottom-32 left-32 text-orange-400/30 animate-bounce delay-1000">
          <Icon name="user-x" className="text-3xl" />
        </div>
        <div className="absolute bottom-20 right-20 text-red-400/30 animate-bounce delay-500">
          <Icon name="shield-exclamation" className="text-4xl" />
        </div>

        {/* Main Content Card */}
        <div className="relative z-10 max-w-lg w-full mx-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
            {/* Animated Warning Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                <Icon name="exclamation-triangle" className="text-white text-3xl" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Title with Gradient Text */}
            <h1 className="text-4xl font-poppins font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Access Denied
              </span>
            </h1>
            
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              You don't have the required permissions to access this area. 
              Contact your administrator for access.
            </p>

            {/* User Info Card */}
            {user && (
              <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center justify-center">
                  <Icon name="user" className="mr-2 text-orange-400" />
                  Current Access Level
                </h3>
                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex items-center justify-between">
                    <span>Role:</span>
                    <span className="text-orange-400 font-medium capitalize">{user.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Username:</span>
                    <span className="text-orange-400 font-medium">{user.username}</span>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <span className="text-xs text-white/50">
                      Permissions: {user.permissions.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => router.push('/admin')}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
              >
                <Icon name="arrow-left" className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-white/10 backdrop-blur-xl text-white py-3 px-6 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
              >
                <Icon name="logout" className="mr-2 group-hover:translate-x-1 transition-transform" />
                Switch Account
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm">
                Need elevated permissions? Contact your system administrator
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Warning Badge */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
            <div className="flex items-center space-x-2 text-white/70">
              <Icon name="exclamation-triangle" className="text-orange-400" />
              <span className="text-sm font-medium">Insufficient Permissions</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and has access
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center">
              <Icon name="shield-halved" className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-poppins font-bold text-gray-800">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.username}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-slate-600 transition-colors"
            >
              <Icon name="logout" className="h-5 w-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
