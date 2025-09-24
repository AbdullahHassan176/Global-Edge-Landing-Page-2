'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { userAuthService } from '@/lib/userAuthService';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'issuer' | 'investor' | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    country: 'UAE',
    role: 'issuer' as 'issuer' | 'investor',
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Set role from URL parameter
    const role = searchParams.get('role') as 'issuer' | 'investor';
    if (role && (role === 'issuer' || role === 'investor')) {
      setSelectedRole(role);
      setFormData(prev => ({
        ...prev,
        role
      }));
    }
    
    // Simulate page loading completion
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (formData.role === 'issuer' && !formData.company.trim()) {
      newErrors.company = 'Company name is required for issuers';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Use direct service for faster registration
      const user = await userAuthService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        country: formData.country
      });

      if (user.success && user.user) {
        setIsSubmitted(true);
        
        // Show approval notification instead of redirecting
        // Users with pending status need admin approval
        if (user.user.status === 'pending') {
          // Don't redirect - show approval message
        } else {
          // Only redirect if user is already approved
          setTimeout(() => {
            if (user.user?.role === 'issuer') {
              router.push('/issuer/dashboard');
            } else {
              router.push('/investor/dashboard');
            }
          }, 2000);
        }
      } else {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading registration form...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-md w-full mx-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
              <Icon name="check-circle" className="text-white text-4xl" />
            </div>

            <h1 className="text-4xl font-poppins font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Registration Submitted!
              </span>
            </h1>
            
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Welcome to Global Edge! Your account has been created and is now pending admin approval. 
              You'll receive an email notification once your account is approved.
            </p>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <Icon name="clock" className="text-yellow-400 mr-3" />
                <h3 className="text-yellow-400 font-semibold">Account Pending Approval</h3>
              </div>
              <div className="text-white/80 text-sm space-y-2">
                <p>• Your account is currently under review</p>
                <p>• You'll receive an email once approved</p>
                <p>• Contact support if not approved within 48 hours</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center justify-center">
                <Icon name="user" className="mr-2 text-green-400" />
                Account Details
              </h3>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="text-green-400 font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-green-400 font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="text-green-400 font-medium capitalize">{formData.role}</span>
                </div>
                {formData.role === 'issuer' && (
                  <div className="flex justify-between">
                    <span>Company:</span>
                    <span className="text-green-400 font-medium">{formData.company}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <Icon name="envelope" className="text-blue-400 mr-3" />
                <h3 className="text-blue-400 font-semibold">Need Help?</h3>
              </div>
              <div className="text-white/80 text-sm space-y-2">
                <p>If your account is not approved within 48 hours, contact our support team:</p>
                <div className="mt-3 space-y-1">
                  <p><strong>Email:</strong> info@theglobaledge.io</p>
                  <p><strong>Phone:</strong> +971 50 123 4567</p>
                  <p><strong>Hours:</strong> 9 AM - 6 PM (UAE Time)</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/login'}
              className="w-full bg-gradient-to-r from-global-teal to-global-green text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-global-green hover:to-global-teal transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-white">Loading registration form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-global-teal/20 to-edge-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-edge-purple/20 to-global-teal/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name={selectedRole === 'issuer' ? 'building' : 'chart-line'} className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-poppins font-bold text-white mb-2">
              Create Your {selectedRole === 'issuer' ? 'Issuer' : 'Investor'} Account
            </h1>
            <p className="text-white/70">
              Join Global Edge and start your {selectedRole === 'issuer' ? 'asset tokenization' : 'investment'} journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="+971 50 123 4567"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Company (for issuers) */}
            {selectedRole === 'issuer' && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="Enter your company name"
                />
                {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
              </div>
            )}

            {/* Country */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
              >
                <option value="UAE">United Arab Emirates</option>
                <option value="SA">Saudi Arabia</option>
                <option value="KW">Kuwait</option>
                <option value="QA">Qatar</option>
                <option value="BH">Bahrain</option>
                <option value="OM">Oman</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>

            {/* Password */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="Create a password"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms and Marketing */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 mr-3 h-4 w-4 text-global-teal focus:ring-global-teal border-white/20 rounded bg-white/10"
                />
                <label htmlFor="agreeToTerms" className="text-white/80 text-sm">
                  I agree to the{' '}
                  <Link href="/terms" className="text-global-teal hover:text-edge-purple">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-global-teal hover:text-edge-purple">
                    Privacy Policy
                  </Link>
                  *
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>}

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                  className="mt-1 mr-3 h-4 w-4 text-global-teal focus:ring-global-teal border-white/20 rounded bg-white/10"
                />
                <label htmlFor="agreeToMarketing" className="text-white/80 text-sm">
                  I would like to receive marketing communications and updates
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-global-teal to-edge-purple text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-global-teal/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <Icon name="arrow-right" className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Create {selectedRole === 'issuer' ? 'Issuer' : 'Investor'} Account
                </>
              )}
            </button>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Login Link */}
            <div className="text-center pt-6 border-t border-white/10">
              <p className="text-white/70 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-global-teal hover:text-edge-purple transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}