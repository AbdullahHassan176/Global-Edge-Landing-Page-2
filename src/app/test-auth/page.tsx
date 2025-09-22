'use client';

import { useState, useEffect } from 'react';
import { userAuthService } from '@/lib/userAuthService';

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export default function TestAuthPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    // Get all users (this will include registered users)
    const allUsers = (userAuthService as any).getAllUsers();
    setUsers(allUsers);
    
    // Check current user
    const user = userAuthService.getCurrentUser();
    setCurrentUser(user);
    setIsAuthenticated(userAuthService.isAuthenticated());
  };

  const testLogin = async (email: string, password: string) => {
    const result = await userAuthService.login(email, password);
    if (result.success) {
      alert('Login successful!');
      loadData();
    } else {
      alert(`Login failed: ${result.error}`);
    }
  };

  const testLogout = () => {
    userAuthService.logout();
    loadData();
  };

  const clearStorage = () => {
    localStorage.clear();
    loadData();
    alert('Storage cleared!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Authentication Test Page</h1>
        
        {/* Current Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="space-y-2">
            <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
            {currentUser && (
              <>
                <p><strong>Current User:</strong> {currentUser.firstName} {currentUser.lastName}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Role:</strong> {currentUser.role}</p>
                <p><strong>Status:</strong> {currentUser.status}</p>
              </>
            )}
          </div>
          {isAuthenticated && (
            <button
              onClick={testLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Test Logins */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Logins</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => testLogin('issuer@example.com', 'Issuer123!')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login as Issuer (issuer@example.com)
              </button>
              <button
                onClick={() => testLogin('investor@example.com', 'Investor123!')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Login as Investor (investor@example.com)
              </button>
            </div>
            <p className="text-sm text-gray-600">
              For newly registered users, use password: <strong>Password123!</strong>
            </p>
          </div>
        </div>

        {/* All Users */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">All Users in System</h2>
          <div className="space-y-2">
            {users.map((user, index) => (
              <div key={user.id || index} className="border p-3 rounded">
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Status:</strong> {user.status}</p>
                <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">LocalStorage Info</h2>
          <div className="space-y-2">
            <p><strong>user_session:</strong> {localStorage.getItem('user_session') ? 'Present' : 'Not found'}</p>
            <p><strong>user_data:</strong> {localStorage.getItem('user_data') ? 'Present' : 'Not found'}</p>
            <p><strong>registered_users:</strong> {localStorage.getItem('registered_users') ? 'Present' : 'Not found'}</p>
          </div>
          <button
            onClick={clearStorage}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Clear All Storage
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <div className="space-y-2 text-sm">
            <p>1. <strong>Register a new user:</strong> Go to <a href="/register/role" className="text-blue-600 underline">/register/role</a> and create a new account</p>
            <p>2. <strong>Login with new user:</strong> Use the email you registered with and password: <strong>Password123!</strong></p>
            <p>3. <strong>Test existing users:</strong> Use the buttons above to test the pre-configured users</p>
            <p>4. <strong>Check status:</strong> This page shows all users in the system and current authentication status</p>
          </div>
        </div>
      </div>
    </div>
  );
}
