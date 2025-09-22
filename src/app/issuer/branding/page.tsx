'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { userAuthService, User, WhitelabelBranding } from '@/lib/userAuthService';

export default function BrandingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [branding, setBranding] = useState<WhitelabelBranding>({
    primaryColor: '#0f766e',
    secondaryColor: '#7c3aed',
    companyName: '',
    domain: '',
    customCss: '',
    footerText: '',
    supportEmail: '',
    supportPhone: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = userAuthService.getCurrentUser();
      if (!currentUser || currentUser.role !== 'issuer') {
        window.location.href = '/login';
        return;
      }

      setUser(currentUser);
      
      // Load existing branding or set defaults
      if (currentUser.branding) {
        setBranding(currentUser.branding);
      } else {
        setBranding(prev => ({
          ...prev,
          companyName: currentUser.company || '',
          supportEmail: currentUser.email,
          supportPhone: currentUser.phone || ''
        }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const success = await userAuthService.updateBranding(user.id, branding);
      
      if (success) {
        // Update local user data
        const updatedUser = { ...user, branding };
        setUser(updatedUser);
        
        // Show success message
        alert('Branding settings saved successfully!');
      } else {
        alert('Failed to save branding settings. Please try again.');
      }
    } catch (error) {
      console.error('Error saving branding:', error);
      alert('Error saving branding settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = (field: 'primaryColor' | 'secondaryColor', color: string) => {
    setBranding(prev => ({ ...prev, [field]: color }));
  };

  const generateCustomCSS = () => {
    return `
/* Custom Branding Styles */
:root {
  --primary-color: ${branding.primaryColor};
  --secondary-color: ${branding.secondaryColor};
}

.bg-global-teal {
  background-color: ${branding.primaryColor} !important;
}

.text-global-teal {
  color: ${branding.primaryColor} !important;
}

.bg-edge-purple {
  background-color: ${branding.secondaryColor} !important;
}

.text-edge-purple {
  color: ${branding.secondaryColor} !important;
}

.border-global-teal {
  border-color: ${branding.primaryColor} !important;
}

.hover\\:bg-global-teal:hover {
  background-color: ${branding.primaryColor} !important;
}

.hover\\:text-global-teal:hover {
  color: ${branding.primaryColor} !important;
}

/* Custom company branding */
.company-name {
  font-weight: bold;
  color: ${branding.primaryColor};
}

.brand-gradient {
  background: linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor});
}

${branding.customCss}
    `.trim();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading branding settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access branding settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Branding & Whitelabeling</h1>
              <p className="text-gray-600 mt-1">Customize your investor portal with your brand identity</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center"
              >
                <Icon name="eye" className="mr-2" />
                {previewMode ? 'Exit Preview' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-global-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-global-teal-dark transition-colors flex items-center disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Icon name="check" className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Basic Branding */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Basic Branding</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={branding.companyName}
                    onChange={(e) => setBranding(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Domain</label>
                  <input
                    type="text"
                    value={branding.domain}
                    onChange={(e) => setBranding(prev => ({ ...prev, domain: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="investors.yourcompany.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Custom domain for your investor portal</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={branding.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={branding.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={branding.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={branding.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    value={branding.supportEmail}
                    onChange={(e) => setBranding(prev => ({ ...prev, supportEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="support@yourcompany.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                  <input
                    type="tel"
                    value={branding.supportPhone}
                    onChange={(e) => setBranding(prev => ({ ...prev, supportPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text</label>
                  <textarea
                    value={branding.footerText}
                    onChange={(e) => setBranding(prev => ({ ...prev, footerText: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="Additional footer text or legal disclaimers"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Customization */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Advanced Customization</h2>
              </div>
              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
                  <textarea
                    value={branding.customCss}
                    onChange={(e) => setBranding(prev => ({ ...prev, customCss: e.target.value }))}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent font-mono text-sm"
                    placeholder="/* Add your custom CSS here */
.custom-button {
  background: linear-gradient(45deg, #your-color, #another-color);
  border-radius: 8px;
}"
                  />
                  <p className="text-xs text-gray-500 mt-1">Add custom CSS to further customize your portal's appearance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
              </div>
              <div className="p-6">
                {previewMode ? (
                  <div className="space-y-6">
                    {/* Preview Header */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: branding.primaryColor }}
                          >
                            {branding.companyName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {branding.companyName || 'Your Company'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            className="px-3 py-1 rounded text-sm font-medium text-white"
                            style={{ backgroundColor: branding.primaryColor }}
                          >
                            Dashboard
                          </button>
                          <button 
                            className="px-3 py-1 rounded text-sm font-medium text-white"
                            style={{ backgroundColor: branding.secondaryColor }}
                          >
                            Assets
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4" style={{ color: branding.primaryColor }}>
                        Welcome to {branding.companyName || 'Your Company'} Investor Portal
                      </h3>
                      <p className="text-gray-600 mb-4">
                        This is how your investor portal will look with your branding applied.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div 
                          className="p-4 rounded-lg text-white text-center"
                          style={{ backgroundColor: branding.primaryColor }}
                        >
                          <div className="text-2xl font-bold">$2.5M</div>
                          <div className="text-sm opacity-90">Total Raised</div>
                        </div>
                        <div 
                          className="p-4 rounded-lg text-white text-center"
                          style={{ backgroundColor: branding.secondaryColor }}
                        >
                          <div className="text-2xl font-bold">127</div>
                          <div className="text-sm opacity-90">Active Investors</div>
                        </div>
                      </div>
                      <button 
                        className="w-full py-2 px-4 rounded-lg text-white font-medium"
                        style={{ 
                          background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})`
                        }}
                      >
                        View Investment Opportunities
                      </button>
                    </div>

                    {/* Preview Footer */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="text-center text-sm text-gray-600">
                        <p>© 2025 {branding.companyName || 'Your Company'}. All rights reserved.</p>
                        {branding.footerText && (
                          <p className="mt-2">{branding.footerText}</p>
                        )}
                        <div className="mt-2 space-x-4">
                          {branding.supportEmail && (
                            <span>Email: {branding.supportEmail}</span>
                          )}
                          {branding.supportPhone && (
                            <span>Phone: {branding.supportPhone}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="eye" className="text-gray-400 text-4xl mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Preview Your Branding</h3>
                    <p className="text-gray-600 mb-6">
                      Click the "Preview" button to see how your investor portal will look with your custom branding.
                    </p>
                    <button
                      onClick={() => setPreviewMode(true)}
                      className="bg-global-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-global-teal-dark transition-colors"
                    >
                      Start Preview
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Generated CSS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Generated CSS</h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{generateCustomCSS()}</code>
                  </pre>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This CSS will be automatically applied to your investor portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
