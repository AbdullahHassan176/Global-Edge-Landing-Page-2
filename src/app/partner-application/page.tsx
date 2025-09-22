'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function PartnerApplicationPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    companySize: '',
    industry: '',
    partnershipType: '',
    description: '',
    expectedVolume: '',
    timeline: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    // Auto-format website URL if needed
    if (field === 'website' && value && !value.startsWith('http')) {
      // Don't auto-add https://, let user decide
      // Just store the value as entered
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission and send notifications
    setTimeout(async () => {
      // Import notification service dynamically to avoid SSR issues
      const { notificationService } = await import('@/lib/notificationService');
      
      // Send partner application notifications
      // Mock partner application notification
      console.log('Partner application submitted:', {
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        companySize: formData.companySize,
        industry: formData.industry,
        partnershipType: formData.partnershipType,
        description: formData.description,
        expectedVolume: formData.expectedVolume,
        timeline: formData.timeline,
        additionalInfo: formData.additionalInfo
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="check-circle" className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-3xl font-poppins font-bold text-charcoal mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for your interest in partnering with Global Edge. Our team will review your application and get back to you within 2-3 business days.
            </p>
            <div className="space-y-4">
              <Link 
                href="/partners" 
                className="block bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors"
              >
                Back to Partners Page
              </Link>
              <Link 
                href="/" 
                className="block border-2 border-global-teal text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-global-teal hover:text-white transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Partner Application
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join our ecosystem of leading companies and unlock new opportunities in asset tokenization.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8 text-center">
              Partnership Application Form
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-poppins font-semibold text-charcoal border-b border-gray-200 pb-2">
                  Company Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Enter your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="www.company.com or https://www.company.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter your website URL with or without https://</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Partnership Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-poppins font-semibold text-charcoal border-b border-gray-200 pb-2">
                  Partnership Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="">Select industry</option>
                      <option value="logistics">Logistics & Shipping</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance & Banking</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="legal">Legal & Compliance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Type *</label>
                    <select
                      value={formData.partnershipType}
                      onChange={(e) => handleInputChange('partnershipType', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="">Select partnership type</option>
                      <option value="asset-provider">Asset Provider</option>
                      <option value="technology-partner">Technology Partner</option>
                      <option value="distribution-partner">Distribution Partner</option>
                      <option value="strategic-partner">Strategic Partner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="Describe your proposed partnership and how it aligns with Global Edge's mission"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Volume</label>
                    <select
                      value={formData.expectedVolume}
                      onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="">Select expected volume</option>
                      <option value="under-1m">Under $1M</option>
                      <option value="1m-10m">$1M - $10M</option>
                      <option value="10m-50m">$10M - $50M</option>
                      <option value="50m-100m">$50M - $100M</option>
                      <option value="over-100m">Over $100M</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (0-3 months)</option>
                      <option value="short-term">Short-term (3-6 months)</option>
                      <option value="medium-term">Medium-term (6-12 months)</option>
                      <option value="long-term">Long-term (12+ months)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="Any additional information you'd like to share"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-global-teal text-white px-12 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Icon name="clock" className="animate-spin mr-2" />
                      Submitting Application...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
