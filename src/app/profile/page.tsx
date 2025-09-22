'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { userAuthService } from '@/lib/userAuthService';
import { userAuthIntegration } from '@/lib/integration/userAuthIntegration';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    occupation: '',
    company: '',
    annualIncome: '',
    investmentExperience: '',
    riskTolerance: ''
  });
  const [originalData, setOriginalData] = useState(profileData);
  const { notifications, addNotification, removeNotification } = useNotifications();

  // Load user data on component mount
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      const currentUser = userAuthService.getCurrentUser();
      if (currentUser) {
        const userData = {
          firstName: currentUser.firstName || '',
          lastName: currentUser.lastName || '',
          email: currentUser.email || '',
          phone: currentUser.phone || '',
          dateOfBirth: '', // Not in current user model
          address: '', // Not in current user model
          occupation: '', // Not in current user model
          company: currentUser.company || '',
          annualIncome: '', // Not in current user model
          investmentExperience: '', // Not in current user model
          riskTolerance: '' // Not in current user model
        };
        setProfileData(userData);
        setOriginalData(userData);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      addNotification({
        type: 'error',
        title: 'Loading Error',
        message: 'Failed to load profile data',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const currentUser = userAuthService.getCurrentUser();
      if (!currentUser) {
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'No user logged in',
          duration: 5000
        });
        return;
      }

      // Update user data
      const updates = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        company: profileData.company
      };

      // Try to update via integration service (database + fallback)
      const result = await userAuthIntegration.updateUser(currentUser.id, updates);
      
      if (result.success) {
        setOriginalData(profileData);
        setIsEditing(false);
        addNotification({
          type: 'success',
          title: 'Profile Updated',
          message: 'Your profile has been successfully updated',
          duration: 3000
        });
      } else {
        // Fallback to mock service
        const mockResult = await userAuthService.updateUser(currentUser.id, updates);
        if (mockResult) {
          setOriginalData(profileData);
          setIsEditing(false);
          addNotification({
            type: 'success',
            title: 'Profile Updated',
            message: 'Your profile has been updated (saved locally)',
            duration: 3000
          });
        } else {
          throw new Error('Failed to update profile');
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      addNotification({
        type: 'error',
        title: 'Save Error',
        message: 'Failed to save profile changes',
        duration: 5000
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="spinner" className="animate-spin text-global-teal text-4xl mb-4" />
          <p className="text-lg text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <NotificationSystem
        notifications={notifications}
        onDismiss={removeNotification}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="user" className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              My Profile
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Manage your personal information and investment preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="user" className="text-blue-600 text-sm" />
                  </div>
                  <h2 className="text-2xl font-poppins font-bold text-charcoal">Personal Information</h2>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-global-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
                
                {isEditing && (
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-global-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <Icon name="spinner" className="animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="building" className="text-green-600 text-sm" />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-charcoal">Professional Information</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                    <input
                      type="text"
                      value={profileData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income Range</label>
                  <select
                    value={profileData.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="0-25000">$0 - $25,000</option>
                    <option value="25000-50000">$25,000 - $50,000</option>
                    <option value="50000-75000">$50,000 - $75,000</option>
                    <option value="75000-100000">$75,000 - $100,000</option>
                    <option value="100000-150000">$100,000 - $150,000</option>
                    <option value="150000+">$150,000+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Investment Profile */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="chart-line" className="text-purple-600 text-sm" />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-charcoal">Investment Profile</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Experience</label>
                  <select
                    value={profileData.investmentExperience}
                    onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                  <select
                    value={profileData.riskTolerance}
                    onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Icon name="chart-bar" className="text-orange-600 text-sm" />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-charcoal">Account Statistics</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-poppins font-bold text-global-teal mb-2">$12,450</div>
                  <div className="text-gray-600">Total Invested</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-poppins font-bold text-green-600 mb-2">$1,230</div>
                  <div className="text-gray-600">Total Returns</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-poppins font-bold text-purple-600 mb-2">8</div>
                  <div className="text-gray-600">Active Investments</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 space-x-4">
            <Link href="/dashboard" className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
              Back to Dashboard
            </Link>
            <Link href="/settings" className="border-2 border-global-teal text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-global-teal hover:text-white transition-colors">
              Account Settings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
