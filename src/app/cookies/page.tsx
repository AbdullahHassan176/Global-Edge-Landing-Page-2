'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import { configService } from '@/lib/configService';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

export default function CookiesPage() {
  // Get configuration
  const contactConfig = configService.getContactConfig();
  const businessConfig = configService.getBusinessConfig();
  
  // Cookie preferences state
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: true,
    preferences: true,
    marketing: false
  });
  
  const [hasChanges, setHasChanges] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  // Load saved preferences on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookie-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setCookiePreferences(parsed);
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
  }, []);

  // Handle individual cookie toggle changes
  const handleCookieToggle = (type: keyof CookiePreferences) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    setHasChanges(true);
  };

  // Save preferences
  const handleSavePreferences = () => {
    try {
      localStorage.setItem('cookie-preferences', JSON.stringify(cookiePreferences));
      setHasChanges(false);
      
      // Apply cookie settings
      applyCookieSettings(cookiePreferences);
      
      addNotification({
        type: 'success',
        title: 'Preferences Saved',
        message: 'Your cookie preferences have been saved successfully.',
        duration: 3000
      });
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
      addNotification({
        type: 'error',
        title: 'Save Failed',
        message: 'Failed to save your preferences. Please try again.',
        duration: 5000
      });
    }
  };

  // Accept all cookies
  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      preferences: true,
      marketing: true
    };
    
    setCookiePreferences(allAccepted);
    setHasChanges(true);
    
    // Auto-save when accepting all
    setTimeout(() => {
      handleSavePreferences();
    }, 100);
  };

  // Reject all non-essential cookies
  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      preferences: false,
      marketing: false
    };
    
    setCookiePreferences(onlyEssential);
    setHasChanges(true);
    
    // Auto-save when rejecting all
    setTimeout(() => {
      handleSavePreferences();
    }, 100);
  };

  // Apply cookie settings to the application
  const applyCookieSettings = (preferences: CookiePreferences) => {
    // Analytics cookies
    if (preferences.analytics) {
      // Enable Google Analytics
      console.log('Analytics cookies enabled');
      // Here you would initialize Google Analytics
    } else {
      // Disable Google Analytics
      console.log('Analytics cookies disabled');
      // Here you would disable Google Analytics
    }

    // Preference cookies
    if (preferences.preferences) {
      // Enable preference saving
      console.log('Preference cookies enabled');
    } else {
      // Clear saved preferences
      console.log('Preference cookies disabled');
    }

    // Marketing cookies
    if (preferences.marketing) {
      // Enable marketing tracking
      console.log('Marketing cookies enabled');
      // Here you would initialize marketing pixels
    } else {
      // Disable marketing tracking
      console.log('Marketing cookies disabled');
      // Here you would disable marketing pixels
    }
  };
  
  return (
    <>
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />
      
      {/* COMPONENT: Cookies Hero */}
      <section id="cookies-hero" className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      Cookie Policy
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Learn how we use cookies and similar technologies to enhance your experience.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Cookie Overview */}
      <section id="cookie-overview" className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="mb-8">
                      <p className="text-sm text-gray-600 mb-4">Last updated: December 20, 2024</p>
                      <p className="text-gray-700 leading-relaxed">
                          This Cookie Policy explains how Global Edge uses cookies and similar technologies when you visit our website and use our platform.
                      </p>
                  </div>

                  <div className="space-y-12">
                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">What Are Cookies?</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings, making your next visit easier and the site more useful to you.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                              We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">How We Use Cookies</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We use cookies for several purposes to improve your experience on our platform:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Essential functionality and security</li>
                              <li>Performance monitoring and analytics</li>
                              <li>Personalization and user preferences</li>
                              <li>Marketing and advertising (with your consent)</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Types of Cookies We Use</h2>
                          
                          <div className="space-y-8">
                              <div className="border-l-4 border-blue-500 pl-6">
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Essential Cookies</h3>
                                  <p className="text-gray-700 leading-relaxed mb-3">
                                      These cookies are necessary for the website to function properly and cannot be disabled.
                                  </p>
                                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                      <li>Authentication and login status</li>
                                      <li>Security and fraud prevention</li>
                                      <li>Load balancing and performance</li>
                                      <li>Basic website functionality</li>
                                  </ul>
                              </div>

                              <div className="border-l-4 border-green-500 pl-6">
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Analytics Cookies</h3>
                                  <p className="text-gray-700 leading-relaxed mb-3">
                                      These cookies help us understand how visitors interact with our website.
                                  </p>
                                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                      <li>Page views and user behavior</li>
                                      <li>Performance monitoring</li>
                                      <li>Error tracking and debugging</li>
                                      <li>Feature usage statistics</li>
                                  </ul>
                              </div>

                              <div className="border-l-4 border-purple-500 pl-6">
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Preference Cookies</h3>
                                  <p className="text-gray-700 leading-relaxed mb-3">
                                      These cookies remember your choices and preferences.
                                  </p>
                                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                      <li>Language and region settings</li>
                                      <li>Display preferences</li>
                                      <li>Dashboard customization</li>
                                      <li>Notification preferences</li>
                                  </ul>
                              </div>

                              <div className="border-l-4 border-orange-500 pl-6">
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Marketing Cookies</h3>
                                  <p className="text-gray-700 leading-relaxed mb-3">
                                      These cookies are used to deliver relevant advertisements and track marketing campaigns.
                                  </p>
                                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                      <li>Ad targeting and personalization</li>
                                      <li>Campaign performance tracking</li>
                                      <li>Social media integration</li>
                                      <li>Retargeting and remarketing</li>
                                  </ul>
                              </div>
                          </div>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Third-Party Cookies</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We may also use third-party services that set their own cookies:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li><strong>Google Analytics:</strong> Website analytics and performance monitoring</li>
                              <li><strong>Stripe:</strong> Payment processing and fraud prevention</li>
                              <li><strong>Intercom:</strong> Customer support and chat functionality</li>
                              <li><strong>Hotjar:</strong> User experience and behavior analysis</li>
                              <li><strong>Facebook Pixel:</strong> Social media advertising and analytics</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Managing Your Cookie Preferences</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              You have several options for managing cookies:
                          </p>
                          
                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Browser Settings</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              Most web browsers allow you to control cookies through their settings. You can:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                              <li>Block all cookies</li>
                              <li>Block third-party cookies only</li>
                              <li>Delete existing cookies</li>
                              <li>Set preferences for specific websites</li>
                          </ul>

                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">Cookie Consent Manager</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              You can manage your cookie preferences through our cookie consent manager, which allows you to:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>Accept or reject different categories of cookies</li>
                              <li>Change your preferences at any time</li>
                              <li>View detailed information about each cookie type</li>
                              <li>Opt out of non-essential cookies</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Impact of Disabling Cookies</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              If you choose to disable cookies, some features of our platform may not work properly:
                          </p>
                          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                              <li>You may need to log in repeatedly</li>
                              <li>Your preferences and settings may not be saved</li>
                              <li>Some features may not function correctly</li>
                              <li>We may not be able to provide personalized content</li>
                          </ul>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Updates to This Policy</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                          </p>
                      </div>

                      <div>
                          <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Contact Us</h2>
                          <p className="text-gray-700 leading-relaxed mb-4">
                              If you have any questions about our use of cookies, please contact us:
                          </p>
                          <div className="bg-gray-50 rounded-lg p-6">
                              <p className="text-gray-700">
                                  <strong>{businessConfig.companyName} Privacy Team</strong><br />
                                  Email: {contactConfig.privacy.email}<br />
                                  Phone: {contactConfig.privacy.phone}<br />
                                  Address: {contactConfig.privacy.address}
                              </p>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </section>

        {/* COMPONENT: Cookie Management */}
        <section id="cookie-management" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Manage Your Cookie Preferences</h2>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-poppins font-semibold text-charcoal">Essential Cookies</h3>
                                <p className="text-sm text-gray-600">Required for basic website functionality</p>
                            </div>
                            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                Always Active
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-poppins font-semibold text-charcoal">Analytics Cookies</h3>
                                <p className="text-sm text-gray-600">Help us understand website usage</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={cookiePreferences.analytics}
                                    onChange={() => handleCookieToggle('analytics')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-poppins font-semibold text-charcoal">Preference Cookies</h3>
                                <p className="text-sm text-gray-600">Remember your settings and preferences</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={cookiePreferences.preferences}
                                    onChange={() => handleCookieToggle('preferences')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-poppins font-semibold text-charcoal">Marketing Cookies</h3>
                                <p className="text-sm text-gray-600">Used for advertising and marketing purposes</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={cookiePreferences.marketing}
                                    onChange={() => handleCookieToggle('marketing')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                            </label>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={handleSavePreferences}
                            disabled={!hasChanges}
                            className={`px-6 py-3 rounded-full font-medium transition-colors ${
                                hasChanges 
                                    ? 'bg-global-teal text-white hover:bg-opacity-90' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Save Preferences
                        </button>
                        <button 
                            onClick={handleAcceptAll}
                            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                        >
                            Accept All
                        </button>
                        <button 
                            onClick={handleRejectAll}
                            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                        >
                            Reject All
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
