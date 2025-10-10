'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import HeroSection from '@/components/ui/HeroSection';
import Link from 'next/link';
import { partners, getPartnersByCategory } from '@/lib/partnersData';

/*
Layout Rollback:
- Removed forced centering
- Increased text container width (max-w-5xl to max-w-6xl)
*/

const partnerCategories = [
  {
    id: 'logistics',
    title: 'Logistics Partners',
    description: 'Leading shipping and logistics companies'
  },
  {
    id: 'financial',
    title: 'Financial Partners',
    description: 'Banking and financial service providers'
  },
  {
    id: 'technology',
    title: 'Technology Partners',
    description: 'Blockchain and oracle infrastructure providers'
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    description: 'Legal and regulatory compliance partners'
  }
];

const partnershipBenefits = [
  {
    icon: 'handshake',
    title: 'Revenue Sharing',
    description: 'Earn competitive revenue sharing on tokenized assets'
  },
  {
    icon: 'users',
    title: 'Access to Investors',
    description: 'Connect with our global network of qualified investors'
  },
  {
    icon: 'chart-line',
    title: 'Market Expansion',
    description: 'Expand your market reach through our platform'
  },
  {
    icon: 'shield',
    title: 'Risk Mitigation',
    description: 'Reduce risk through diversified asset tokenization'
  }
];

export default function PartnersPage() {
  return (
    <>
      
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-6xl text-white text-balance text-left">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">PARTNER WITH US</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight break-words max-w-6xl">
              Our Partners
            </h1>
            <h2 className="text-2xl lg:text-3xl font-poppins font-semibold mb-6 leading-tight break-words max-w-6xl">
              Collaborating for Real-World Asset Innovation
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 font-inter font-light opacity-90 max-w-6xl leading-relaxed">
              Join our ecosystem of leading companies in logistics, technology, and finance to unlock new opportunities in asset tokenization. Learn about our <Link href="/how-it-works" className="underline hover:text-global-teal transition-colors">tokenization process</Link> and <Link href="/contact" className="underline hover:text-global-teal transition-colors">contact us</Link> for partnership opportunities.
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-6 font-inter font-light opacity-90 max-w-6xl leading-relaxed">
              Our tokenization ecosystem partners in the UAE work together to create innovative solutions for asset digitization, ensuring regulatory compliance and enhanced market liquidity through strategic collaboration and <Link href="/security" className="underline hover:text-global-teal transition-colors">institutional-grade security</Link>.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-4 md:mt-6">
              <Link href="/partner-application" className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors flex items-center justify-center">
                Become a Partner
                <Icon name="arrow-right" className="ml-2" size={8} />
              </Link>
              <Link href="#benefits" className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors">
                View Benefits
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-gradient-to-tl from-aqua-start to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Trusted Partners Driving Tokenization Innovation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">Unlock new revenue streams and market opportunities through strategic partnerships. Learn about our <Link href="/how-it-works" className="text-global-teal hover:text-edge-purple transition-colors">tokenization process</Link> and <Link href="/contact" className="text-global-teal hover:text-edge-purple transition-colors">contact us</Link> for partnership opportunities.</p>
            <ul className="text-lg text-gray-600 max-w-2xl mx-auto space-y-2 text-left">
              <li>• <strong>Logistics Partners:</strong> Leading shipping and logistics companies enabling container and cargo tokenization</li>
              <li>• <strong>Asset Managers:</strong> Professional asset management firms providing expertise in real estate and trade inventory</li>
              <li>• <strong>Technology Partners:</strong> Blockchain infrastructure providers and oracle networks ensuring secure, transparent operations</li>
            </ul>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name={benefit.icon} className="text-white text-lg" size={20} />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Our Partner Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Trusted by industry leaders across multiple sectors. Discover our <Link href="/how-it-works" className="text-global-teal hover:text-edge-purple transition-colors">tokenization process</Link> and <Link href="/contact" className="text-global-teal hover:text-edge-purple transition-colors">contact us</Link> to join our ecosystem.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {partnerCategories.map((category, index) => {
              const categoryPartners = getPartnersByCategory(category.id as any);
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-poppins font-bold text-charcoal mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {categoryPartners.map((partner) => (
                      <a
                        key={partner.id}
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors group"
                        title={partner.description}
                      >
                        <span className="font-semibold text-charcoal text-sm group-hover:text-global-teal transition-colors">
                          {partner.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Partnership Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our partners have achieved remarkable success through strategic collaboration in the tokenization ecosystem. Learn about our <Link href="/how-it-works" className="text-global-teal hover:text-edge-purple transition-colors">tokenization process</Link> and <Link href="/contact" className="text-global-teal hover:text-edge-purple transition-colors">contact us</Link> to join our success stories.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Icon name="ship" className="text-white text-lg" size={20} />
              </div>
              <h3 className="text-xl font-poppins font-bold text-charcoal mb-4">Logistics Partnership</h3>
              <p className="text-gray-600 mb-4">Leading shipping company increased asset liquidity by 300% through container tokenization, generating $2.4M in additional revenue.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Revenue Increase:</span>
                  <span className="text-green-600 font-semibold">+300%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Assets Tokenized:</span>
                  <span className="font-semibold">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Additional Revenue:</span>
                  <span className="font-semibold">$2.4M</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <Icon name="building" className="text-white text-lg" size={20} />
              </div>
              <h3 className="text-xl font-poppins font-bold text-charcoal mb-4">Real Estate Partnership</h3>
              <p className="text-gray-600 mb-4">Property management firm unlocked $15M in previously illiquid assets through fractional ownership tokenization.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Liquidity Unlocked:</span>
                  <span className="text-green-600 font-semibold">$15M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Properties Tokenized:</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Investor Base:</span>
                  <span className="font-semibold">1,200+</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <Icon name="boxes" className="text-white text-lg" size={20} />
              </div>
              <h3 className="text-xl font-poppins font-bold text-charcoal mb-4">Trade Partnership</h3>
              <p className="text-gray-600 mb-4">Commodity trading company improved supply chain transparency and reduced financing costs by 40% through inventory tokenization.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cost Reduction:</span>
                  <span className="text-green-600 font-semibold">-40%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Inventory Tokenized:</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transparency Score:</span>
                  <span className="font-semibold">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Partnership Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Simple steps to become a Global Edge partner. Learn about our <Link href="/how-it-works" className="text-global-teal hover:text-edge-purple transition-colors">tokenization process</Link> and <Link href="/contact" className="text-global-teal hover:text-edge-purple transition-colors">contact us</Link> for more information.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Submit Application</h3>
              <p className="text-sm text-gray-600">Complete our partnership application with company details and proposed collaboration</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Due Diligence</h3>
              <p className="text-sm text-gray-600">Our team reviews your application and conducts comprehensive due diligence</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Partnership Agreement</h3>
              <p className="text-sm text-gray-600">Sign partnership agreement and define collaboration terms and revenue sharing</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Launch & Scale</h3>
              <p className="text-sm text-gray-600">Begin collaboration and scale your partnership with our support team</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join our ecosystem and unlock new opportunities in asset tokenization. Learn about our <Link href="/how-it-works" className="underline hover:text-global-teal transition-colors">tokenization process</Link> and <Link href="/contact" className="underline hover:text-global-teal transition-colors">contact us</Link> for partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/partner-application"
              className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Apply Now
            </Link>
            <a 
              href="https://calendly.com/mohammed-sidat-/global-next-global-edge" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
