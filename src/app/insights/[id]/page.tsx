'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

// Define the Insight type
interface Insight {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  content?: string;
}

// Mock data for insights (same as main page)
const mockInsights: Insight[] = [
  {
    id: '1',
    category: 'CONTAINERS',
    title: 'Global Container Demand Surges 23% in Q4',
    description: 'Supply chain disruptions drive increased demand for container investments as shipping rates reach record highs.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8e8f5f1206-41f8ac9516fc7c159218.png',
    date: 'Dec 15, 2024',
    readTime: '5 min read',
    content: `
      <h2>Global Container Market Analysis</h2>
      <p>The global container market has experienced unprecedented growth in Q4 2024, with demand surging 23% compared to the previous quarter. This remarkable increase is driven by several key factors that are reshaping the shipping and logistics industry.</p>
      
      <h3>Key Drivers of Growth</h3>
      <ul>
        <li><strong>Supply Chain Disruptions:</strong> Ongoing disruptions in major shipping routes have created bottlenecks, driving up demand for available containers.</li>
        <li><strong>E-commerce Expansion:</strong> The continued growth of online retail has increased the need for containerized goods transportation.</li>
        <li><strong>Infrastructure Investments:</strong> Major port expansions and new shipping routes have created additional demand for container assets.</li>
        <li><strong>Seasonal Factors:</strong> Q4 typically sees increased shipping activity due to holiday season preparations.</li>
      </ul>
      
      <h3>Investment Implications</h3>
      <p>For investors in tokenized container assets, this surge in demand presents significant opportunities. Container lease rates have increased by an average of 18% across major shipping routes, directly benefiting container token holders through higher rental income distributions.</p>
      
      <h3>Market Outlook</h3>
      <p>Industry analysts predict that container demand will remain elevated through Q1 2025, with potential for further growth as global trade patterns continue to evolve. This presents a compelling case for continued investment in container tokenization assets.</p>
    `
  },
  {
    id: '2',
    category: 'PROPERTY',
    title: 'Commercial Real Estate Tokenization Trends',
    description: 'How blockchain technology is transforming property investment accessibility and liquidity.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b3863df69d-7dea45524a67663901de.png',
    date: 'Dec 12, 2024',
    readTime: '7 min read',
    content: `
      <h2>Revolutionizing Real Estate Investment</h2>
      <p>Commercial real estate tokenization is fundamentally changing how investors access and trade property assets. By converting physical properties into digital tokens, blockchain technology is democratizing real estate investment and creating new opportunities for portfolio diversification.</p>
      
      <h3>Technology Transformation</h3>
      <p>Blockchain technology enables fractional ownership of high-value commercial properties, allowing investors to participate with smaller capital requirements. Smart contracts automate rental distributions, property management, and compliance processes, reducing administrative overhead and increasing transparency.</p>
      
      <h3>Market Impact</h3>
      <p>The tokenization of commercial real estate has created a new asset class that combines the stability of real estate with the liquidity of digital assets. This hybrid approach is attracting both traditional real estate investors and crypto-native participants.</p>
    `
  },
  {
    id: '3',
    category: 'VAULT',
    title: 'Precious Metals as Portfolio Diversification',
    description: 'Strategic allocation to gold and silver tokens provides inflation hedge for modern portfolios.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ccb48f0bea-8f317986dc05f173e4bb.png',
    date: 'Dec 10, 2024',
    readTime: '6 min read',
    content: `
      <h2>Precious Metals in Modern Portfolios</h2>
      <p>Precious metals have long been considered a hedge against inflation and economic uncertainty. With the advent of tokenized precious metals, investors can now access these traditional safe-haven assets with unprecedented ease and flexibility.</p>
      
      <h3>Inflation Protection</h3>
      <p>Gold and silver have historically maintained their value during periods of high inflation, making them valuable additions to diversified portfolios. Tokenized precious metals offer the same benefits with enhanced liquidity and lower storage costs.</p>
      
      <h3>Portfolio Benefits</h3>
      <p>Strategic allocation to precious metals can reduce overall portfolio volatility while providing protection against currency devaluation and economic instability.</p>
    `
  },
  {
    id: '4',
    category: 'TRADETOKENS',
    title: 'Commodity Tokenization: The Future of Trade Finance',
    description: 'Exploring how tokenized commodities are revolutionizing traditional trade finance and supply chain management.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fa903baf48-9bfa2e4ace2cf760b7cf.png',
    date: 'Dec 8, 2024',
    readTime: '8 min read',
    content: `
      <h2>Transforming Trade Finance</h2>
      <p>Commodity tokenization is revolutionizing traditional trade finance by providing transparent, efficient, and accessible ways to invest in physical commodities. This innovation is particularly significant for supply chain management and international trade.</p>
      
      <h3>Supply Chain Innovation</h3>
      <p>Tokenized commodities enable real-time tracking of goods throughout the supply chain, providing unprecedented transparency and reducing fraud risks. Smart contracts can automatically execute payments and transfers based on delivery confirmations.</p>
      
      <h3>Market Efficiency</h3>
      <p>By digitizing commodity ownership, tokenization reduces the barriers to entry for commodity investment while maintaining the underlying asset value and physical backing.</p>
    `
  },
  {
    id: '5',
    category: 'MARKET',
    title: 'Tokenization Market Reaches $2.4B in 2024',
    description: 'Market analysis shows continued growth in real-world asset tokenization with increasing institutional adoption.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ccb48f0bea-8f317986dc05f173e4bb.png',
    date: 'Dec 5, 2024',
    readTime: '4 min read',
    content: `
      <h2>Market Growth Analysis</h2>
      <p>The tokenization market has reached a significant milestone, achieving $2.4 billion in total value locked (TVL) by the end of 2024. This represents a 340% increase from the previous year, driven by increasing institutional adoption and regulatory clarity.</p>
      
      <h3>Institutional Adoption</h3>
      <p>Major financial institutions and corporations are increasingly recognizing the benefits of asset tokenization, including improved liquidity, reduced transaction costs, and enhanced transparency.</p>
      
      <h3>Future Outlook</h3>
      <p>Industry experts predict continued growth in 2025, with the market potentially reaching $5 billion as more asset classes are tokenized and regulatory frameworks mature.</p>
    `
  },
  {
    id: '6',
    category: 'TECHNOLOGY',
    title: 'Oracle Networks: Ensuring Asset Transparency',
    description: 'How decentralized oracle networks provide real-time verification and transparency for tokenized assets.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/a632cbc427-37f3e960ba5a5967444b.png',
    date: 'Dec 3, 2024',
    readTime: '6 min read',
    content: `
      <h2>Ensuring Asset Transparency</h2>
      <p>Decentralized oracle networks play a crucial role in maintaining the integrity and transparency of tokenized real-world assets. These networks provide real-time data feeds that verify asset conditions, valuations, and ownership status.</p>
      
      <h3>Technology Infrastructure</h3>
      <p>Oracle networks aggregate data from multiple sources, including IoT sensors, market data providers, and regulatory databases, to ensure accurate and up-to-date information about tokenized assets.</p>
      
      <h3>Trust and Security</h3>
      <p>By decentralizing data verification, oracle networks eliminate single points of failure and provide tamper-proof records of asset status and performance.</p>
    `
  }
];

export default function InsightDetailPage({ params }: { params: { id: string } }) {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const foundInsight = mockInsights.find(i => i.id === params.id);
      setInsight(foundInsight || null);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="clock" className="animate-spin text-global-teal text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Loading insight...</p>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="exclamation-triangle" className="text-red-500 text-4xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-charcoal mb-2">Insight Not Found</h1>
          <p className="text-gray-600 mb-6">The insight you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/insights" 
            className="bg-global-teal text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
          >
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CONTAINERS':
        return 'text-blue-600 bg-blue-100';
      case 'PROPERTY':
        return 'text-green-600 bg-green-100';
      case 'VAULT':
        return 'text-orange-600 bg-orange-100';
      case 'TRADETOKENS':
        return 'text-purple-600 bg-purple-100';
      case 'MARKET':
        return 'text-global-teal bg-teal-100';
      case 'TECHNOLOGY':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/insights" 
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <Icon name="arrow-left" className="mr-2" />
              Back to Insights
            </Link>
          </div>
          
          <div className={`text-sm font-medium px-3 py-1 rounded-full inline-block mb-4 ${getCategoryColor(insight.category)}`}>
            {insight.category}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-6 leading-tight">
            {insight.title}
          </h1>
          
          <div className="flex items-center text-white opacity-90">
            <span className="mr-6">{insight.date}</span>
            <span>{insight.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="relative">
              <img 
                src={insight.image} 
                alt={insight.title}
                className="w-full h-80 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="p-8 md:p-16">
              {/* Article Meta */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className={`text-sm font-semibold px-4 py-2 rounded-full ${getCategoryColor(insight.category)}`}>
                    {insight.category}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Icon name="calendar" className="mr-2" />
                    {insight.date}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Icon name="clock" className="mr-2" />
                    {insight.readTime}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-global-teal transition-colors">
                    <Icon name="heart" className="text-lg" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-global-teal transition-colors">
                    <Icon name="link" className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Article Summary */}
              <div className="bg-gradient-to-r from-global-teal/5 to-edge-purple/5 rounded-2xl p-8 mb-12 border-l-4 border-global-teal">
                <h3 className="text-lg font-semibold text-charcoal mb-3">Article Summary</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {insight.description}
                </p>
              </div>
              
              {/* Article Content */}
              <div className="prose prose-xl max-w-none">
                {insight.content && (
                  <div 
                    className="text-gray-800 leading-relaxed space-y-8"
                    dangerouslySetInnerHTML={{ 
                      __html: insight.content
                        .replace(/<h2>/g, '<h2 class="text-3xl font-poppins font-bold text-charcoal mb-6 mt-12 first:mt-0">')
                        .replace(/<h3>/g, '<h3 class="text-2xl font-poppins font-semibold text-charcoal mb-4 mt-8">')
                        .replace(/<p>/g, '<p class="text-lg text-gray-700 leading-relaxed mb-6">')
                        .replace(/<ul>/g, '<ul class="space-y-3 mb-6">')
                        .replace(/<li>/g, '<li class="text-lg text-gray-700 leading-relaxed flex items-start"><span class="w-2 h-2 bg-global-teal rounded-full mt-3 mr-3 flex-shrink-0"></span>')
                        .replace(/<strong>/g, '<strong class="font-semibold text-charcoal">')
                    }}
                  />
                )}
              </div>

              {/* Article Footer */}
              <div className="mt-16 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">GE</span>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Global Edge Research Team</p>
                      <p className="text-sm text-gray-500">Market Analysis & Insights</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Share this article:</span>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <Icon name="link" className="text-lg" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <Icon name="paper-plane" className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Actions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8">Ready to Invest?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Put your knowledge into action with Global Edge&apos;s tokenized assets
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/assets" 
              className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Browse Assets
            </Link>
            <Link 
              href="/get-started" 
              className="border-2 border-global-teal text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-global-teal hover:text-white transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
