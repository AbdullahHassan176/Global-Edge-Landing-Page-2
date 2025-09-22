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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="lock-closed" className="text-red-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-poppins font-bold text-gray-800 mb-4">
            Access Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in as an administrator to access this area.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="w-full bg-gradient-to-r from-global-teal to-edge-purple text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="exclamation-triangle" className="text-yellow-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-poppins font-bold text-gray-800 mb-4">
            Insufficient Permissions
          </h2>
          <p className="text-gray-600 mb-4">
            You don't have the required permissions to access this area.
          </p>
          {user && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">
                <strong>Current Role:</strong> {user.role}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Permissions:</strong> {user.permissions.join(', ')}
              </p>
            </div>
          )}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/admin')}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to Admin Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
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
            <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
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
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
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
