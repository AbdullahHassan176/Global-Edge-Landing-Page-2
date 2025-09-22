'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<'issuer' | 'investor' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRoleSelection = (role: 'issuer' | 'investor') => {
    setSelectedRole(role);
    setIsLoading(true);
    
    // Simulate loading and redirect to registration form
    setTimeout(() => {
      router.push(`/register?role=${role}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-global-teal/20 to-edge-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-edge-purple/20 to-global-teal/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-global-teal/10 to-edge-purple/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-global-teal/30 animate-bounce delay-300">
        <Icon name="building" className="text-4xl" />
      </div>
      <div className="absolute top-32 right-32 text-edge-purple/30 animate-bounce delay-700">
        <Icon name="chart-line" className="text-3xl" />
      </div>
      <div className="absolute bottom-32 left-32 text-global-teal/30 animate-bounce delay-1000">
        <Icon name="coins" className="text-3xl" />
      </div>
      <div className="absolute bottom-20 right-20 text-edge-purple/30 animate-bounce delay-500">
        <Icon name="trending-up" className="text-4xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full mx-4">
        <div className="text-center mb-12">
          <div className="mb-8">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl font-poppins font-bold mb-6">
            <span className="bg-gradient-to-r from-global-teal to-edge-purple bg-clip-text text-transparent">
              Choose Your Role
            </span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Select whether you want to issue investment opportunities or invest in tokenized assets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Issuer Card */}
          <div 
            className={`relative group cursor-pointer transition-all duration-500 ${
              selectedRole === 'issuer' ? 'scale-105' : 'hover:scale-105'
            }`}
            onClick={() => handleRoleSelection('issuer')}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 h-full">
              {/* Loading Overlay */}
              {selectedRole === 'issuer' && isLoading && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal"></div>
                </div>
              )}

              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-global-teal/25 transition-all duration-300">
                <Icon name="building" className="text-white text-3xl" />
              </div>

              {/* Title */}
              <h2 className="text-3xl font-poppins font-bold text-white mb-4 text-center">
                Asset Issuer
              </h2>

              {/* Description */}
              <p className="text-white/80 text-lg mb-8 text-center leading-relaxed">
                Tokenize your real-world assets and offer investment opportunities to qualified investors
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Asset tokenization tools</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Investor management</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Compliance & KYC tools</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>White-label branding</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Analytics & reporting</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                className="w-full bg-gradient-to-r from-global-teal to-edge-purple text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-global-teal/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                disabled={isLoading}
              >
                <Icon name="arrow-right" className="mr-2 group-hover:translate-x-1 transition-transform" />
                Become an Issuer
              </button>
            </div>
          </div>

          {/* Investor Card */}
          <div 
            className={`relative group cursor-pointer transition-all duration-500 ${
              selectedRole === 'investor' ? 'scale-105' : 'hover:scale-105'
            }`}
            onClick={() => handleRoleSelection('investor')}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 h-full">
              {/* Loading Overlay */}
              {selectedRole === 'investor' && isLoading && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-edge-purple"></div>
                </div>
              )}

              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-edge-purple to-global-teal rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-edge-purple/25 transition-all duration-300">
                <Icon name="chart-line" className="text-white text-3xl" />
              </div>

              {/* Title */}
              <h2 className="text-3xl font-poppins font-bold text-white mb-4 text-center">
                Investor
              </h2>

              {/* Description */}
              <p className="text-white/80 text-lg mb-8 text-center leading-relaxed">
                Invest in tokenized real-world assets with transparent returns and full compliance
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Diverse asset portfolio</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Real-time tracking</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Automated KYC process</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Investment analytics</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Icon name="check-circle" className="mr-3 text-green-400" />
                  <span>Secure transactions</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                className="w-full bg-gradient-to-r from-edge-purple to-global-teal text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-edge-purple/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                disabled={isLoading}
              >
                <Icon name="arrow-right" className="mr-2 group-hover:translate-x-1 transition-transform" />
                Start Investing
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-global-teal hover:text-edge-purple transition-colors">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
