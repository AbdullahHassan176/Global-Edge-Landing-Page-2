'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeroSection from '@/components/ui/HeroSection';

const partnerCategories = [
  {
    title: 'Logistics Partners',
    description: 'Leading shipping and logistics companies',
    partners: ['Maersk', 'MSC', 'CMA CGM', 'COSCO', 'Hapag-Lloyd', 'ONE']
  },
  {
    title: 'Technology Partners',
    description: 'Blockchain and oracle infrastructure providers',
    partners: ['Chainlink', 'Polygon', 'Ethereum', 'IPFS', 'The Graph', 'Alchemy']
  },
  {
    title: 'Financial Partners',
    description: 'Banking and financial service providers',
    partners: ['JPMorgan', 'Goldman Sachs', 'BlackRock', 'Fidelity', 'Vanguard', 'State Street']
  },
  {
    title: 'Legal & Compliance',
    description: 'Legal and regulatory compliance partners',
    partners: ['DLA Piper', 'Clifford Chance', 'Latham & Watkins', 'Skadden', 'Sullivan & Cromwell', 'Cravath']
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
      <HeroSection
        title="Partnership Program"
        subtitle="PARTNER WITH US"
        description="Join our ecosystem of leading companies in logistics, technology, and finance to unlock new opportunities in asset tokenization."
        primaryButtonText="Become a Partner"
        primaryButtonHref="/partner-application"
        secondaryButtonText="View Partnership Benefits"
        secondaryButtonHref="#benefits"
        showArrow={true}
      />

      {/* Partnership Benefits */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Partnership Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Unlock new revenue streams and market opportunities through strategic partnerships</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={benefit.icon as any} className="text-white text-3xl" />
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Trusted by industry leaders across multiple sectors</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {partnerCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-poppins font-bold text-charcoal mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {category.partners.map((partner, partnerIndex) => (
                    <div key={partnerIndex} className="bg-gray-50 rounded-lg p-4 text-center">
                      <span className="font-semibold text-charcoal">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Partnership Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Simple steps to become a Global Edge partner</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Submit Application</h3>
              <p className="text-sm text-gray-600">Complete our partnership application with company details and proposed collaboration</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Due Diligence</h3>
              <p className="text-sm text-gray-600">Our team reviews your application and conducts comprehensive due diligence</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-poppins font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2">Partnership Agreement</h3>
              <p className="text-sm text-gray-600">Sign partnership agreement and define collaboration terms and revenue sharing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-aqua-start to-aqua-end rounded-full flex items-center justify-center mx-auto mb-4">
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
            Join our ecosystem and unlock new opportunities in asset tokenization
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
              Apply Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
