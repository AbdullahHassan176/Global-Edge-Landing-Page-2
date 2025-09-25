'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';

export default function SettingsPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLoginActivity, setShowLoginActivity] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handle2FAToggle = () => {
    setIs2FAEnabled(!is2FAEnabled);
    // Here you would typically make an API call to enable/disable 2FA
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to change password
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleViewLoginActivity = () => {
    setShowLoginActivity(true);
  };

  const handleSavePreferences = () => {
    // Here you would typically make an API call to save user preferences
    alert('Preferences saved successfully!');
  };
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Account Settings
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Manage your account preferences, security settings, and notification preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Sections */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Profile Settings */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="user" className="text-blue-600 text-sm"  />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-charcoal">Profile Information</h2>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  />
                </div>
                
                <button className="bg-global-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Update Profile
                </button>
              </form>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon name="shield-halved" className="text-red-600 text-sm"  />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-charcoal">Security Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-charcoal">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    {is2FAEnabled && (
                      <p className="text-sm text-green-600 font-medium">✓ 2FA is currently enabled</p>
                    )}
                  </div>
                  <button 
                    onClick={handle2FAToggle}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      is2FAEnabled 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-global-teal text-white hover:bg-opacity-90'
                    }`}
                  >
                    {is2FAEnabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-charcoal">Change Password</h3>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <button 
                    onClick={() => setShowPasswordModal(true)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Change
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-charcoal">Login Activity</h3>
                    <p className="text-sm text-gray-600">View recent login attempts and sessions</p>
                  </div>
                  <button 
                    onClick={handleViewLoginActivity}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="bell" className="text-green-600 text-sm"  />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-charcoal">Notification Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-charcoal">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-charcoal">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-charcoal">Investment Updates</h3>
                    <p className="text-sm text-gray-600">Get notified about portfolio changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-charcoal">Market Alerts</h3>
                    <p className="text-sm text-gray-600">Receive market and asset alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Investment Preferences */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="chart-line" className="text-purple-600 text-sm"  />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-charcoal">Investment Preferences</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent">
                    <option>Conservative</option>
                    <option selected>Moderate</option>
                    <option>Aggressive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Goal</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent">
                    <option>Short-term (1-2 years)</option>
                    <option selected>Medium-term (3-5 years)</option>
                    <option>Long-term (5+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Asset Types</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="text-global-teal" />
                      <span>Shipping Containers</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="text-global-teal" />
                      <span>Real Estate</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="text-global-teal" />
                      <span>Trade Tokens</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="text-global-teal" />
                      <span>Vault Storage</span>
                    </label>
                  </div>
                </div>
                
                <button 
                  onClick={handleSavePreferences}
                  className="bg-global-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/dashboard" className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Activity Modal */}
      {showLoginActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Login Activity</h3>
              <button
                onClick={() => setShowLoginActivity(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-charcoal">Current Session</p>
                    <p className="text-sm text-gray-600">Chrome on Windows • New York, NY</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Last activity: 2 minutes ago</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-charcoal">Mobile App</p>
                    <p className="text-sm text-gray-600">iOS App • New York, NY</p>
                  </div>
                  <span className="text-sm text-gray-600">2 hours ago</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-charcoal">Safari on Mac</p>
                    <p className="text-sm text-gray-600">Safari on macOS • New York, NY</p>
                  </div>
                  <span className="text-sm text-gray-600">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
