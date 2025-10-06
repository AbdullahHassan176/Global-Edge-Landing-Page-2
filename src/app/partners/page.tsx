'use client';

import { useState } from 'react';
import Head from 'next/head';
import Icon from '@/components/ui/Icon';
import HeroSection from '@/components/ui/HeroSection';
import Link from 'next/link';
import { partners, getPartnersByCategory } from '@/lib/partnersData';

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
      <Head>
        <title>Our Partners | Institutional Alliances | The Global Edge</title>
        <meta name="description" content="Discover our ecosystem partners — logistics operators, asset managers, and technology providers enabling secure tokenization infrastructure in the UAE." />
        <meta name="keywords" content="partners UAE, institutional alliances, logistics partners, asset managers, technology providers, tokenization infrastructure, blockchain partners, RWA partners" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://theglobaledge.io/partners" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Our Partners | Institutional Alliances | The Global Edge" />
        <meta property="og:description" content="Discover our ecosystem partners — logistics operators, asset managers, and technology providers enabling secure tokenization infrastructure in the UAE." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theglobaledge.io/partners" />
        <meta property="og:image" content="https://theglobaledge.io/og-partners.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Partners | Institutional Alliances | The Global Edge" />
        <meta name="twitter:description" content="Discover our ecosystem partners — logistics operators, asset managers, and technology providers enabling secure tokenization infrastructure in the UAE." />
        <meta name="twitter:image" content="https://theglobaledge.io/og-partners.jpg" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Global Edge Partners",
              "description": "Ecosystem partners including logistics operators, asset managers, and technology providers enabling secure tokenization infrastructure in the UAE",
              "url": "https://theglobaledge.io/partners",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AE"
              },
              "hasPart": [
                {
                  "@type": "Organization",
                  "name": "Logistics Partners",
                  "description": "Leading shipping and logistics companies enabling asset tokenization"
                },
                {
                  "@type": "Organization", 
                  "name": "Financial Partners",
                  "description": "Banking and financial service providers supporting tokenized assets"
                },
                {
                  "@type": "Organization",
                  "name": "Technology Partners", 
                  "description": "Blockchain and oracle infrastructure providers"
                },
                {
                  "@type": "Organization",
                  "name": "Legal & Compliance Partners",
                  "description": "Legal and regulatory compliance partners ensuring VARA compliance"
                }
              ],
              "memberOf": {
                "@type": "Organization",
                "name": "The Global Edge",
                "url": "https://theglobaledge.io"
              }
            })
          }}
        />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">PARTNER WITH US</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-poppins font-bold mb-6 leading-tight">
              Our Partners
            </h1>
            <h2 className="text-2xl lg:text-3xl font-poppins font-semibold mb-6 leading-tight">
              Collaborating for Real-World Asset Innovation
            </h2>
            <p className="text-xl lg:text-2xl mb-8 font-inter font-light opacity-90">
              Join our ecosystem of leading companies in logistics, technology, and finance to unlock new opportunities in asset tokenization. Learn about our <Link href="/how-it-works" className="underline hover:text-global-teal transition-colors">tokenization process</Link> and <Link href="/contact" className="underline hover:text-global-teal transition-colors">contact us</Link> for partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
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
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Partnership Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Unlock new revenue streams and market opportunities through strategic partnerships. Learn about our <Link href="/how-it-works" className="text-global-teal hover:text-edge-purple transition-colors">tokenization process</Link> and <Link href="/contact" className="text-global-teal hover:text-edge-purple transition-colors">contact us</Link> for partnership opportunities.</p>
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

      {/* Partnership Process */}
      <section className="py-20 bg-white">
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
