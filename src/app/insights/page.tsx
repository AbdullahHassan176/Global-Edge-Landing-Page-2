'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Insight } from '@/types';

// Mock data for insights
const mockInsights: Insight[] = [
  {
    id: '1',
    category: 'CONTAINERS',
    title: 'Global Container Demand Surges 23% in Q4',
    description: 'Supply chain disruptions drive increased demand for container investments as shipping rates reach record highs.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8e8f5f1206-41f8ac9516fc7c159218.png',
    date: 'Dec 15, 2024',
    readTime: '5 min read'
  },
  {
    id: '2',
    category: 'PROPERTY',
    title: 'Commercial Real Estate Tokenization Trends',
    description: 'How blockchain technology is transforming property investment accessibility and liquidity.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b3863df69d-7dea45524a67663901de.png',
    date: 'Dec 12, 2024',
    readTime: '7 min read'
  },
  {
    id: '3',
    category: 'VAULT',
    title: 'Precious Metals as Portfolio Diversification',
    description: 'Strategic allocation to gold and silver tokens provides inflation hedge for modern portfolios.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ccb48f0bea-8f317986dc05f173e4bb.png',
    date: 'Dec 10, 2024',
    readTime: '6 min read'
  },
  {
    id: '4',
    category: 'TRADETOKENS',
    title: 'Commodity Tokenization: The Future of Trade Finance',
    description: 'Exploring how tokenized commodities are revolutionizing traditional trade finance and supply chain management.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fa903baf48-9bfa2e4ace2cf760b7cf.png',
    date: 'Dec 8, 2024',
    readTime: '8 min read'
  },
  {
    id: '5',
    category: 'MARKET',
    title: 'Tokenization Market Reaches $2.4B in 2024',
    description: 'Market analysis shows continued growth in real-world asset tokenization with increasing institutional adoption.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ccb48f0bea-8f317986dc05f173e4bb.png',
    date: 'Dec 5, 2024',
    readTime: '4 min read'
  },
  {
    id: '6',
    category: 'TECHNOLOGY',
    title: 'Oracle Networks: Ensuring Asset Transparency',
    description: 'How decentralized oracle networks provide real-time verification and transparency for tokenized assets.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/a632cbc427-37f3e960ba5a5967444b.png',
    date: 'Dec 3, 2024',
    readTime: '6 min read'
  }
];

const categories = ['All', 'CONTAINERS', 'PROPERTY', 'VAULT', 'TRADETOKENS', 'MARKET', 'TECHNOLOGY'];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [insights] = useState<Insight[]>(mockInsights);

  const filteredInsights = selectedCategory === 'All' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

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
    <>
      {/* Hero Section */}
      <section className="gradient-bg py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4">Market Insights</h1>
            <p className="text-xl opacity-90 mb-8">Stay informed with the latest trends, analysis, and opportunities in tokenized real-world assets</p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-global-teal text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((insight) => (
              <article key={insight.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={insight.image} 
                  alt={insight.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block mb-3 ${getCategoryColor(insight.category)}`}>
                    {insight.category}
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-3 line-clamp-2">
                    {insight.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{insight.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{insight.date}</span>
                    <span>{insight.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-poppins font-bold text-charcoal mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest insights and market analysis delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
            />
            <button className="bg-global-teal text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Featured Research</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">In-depth analysis and market reports from our research team</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-global-teal to-edge-purple rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon="chart-line" className="text-2xl mr-3" />
                <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">MARKET REPORT</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-4">2024 Tokenization Market Report</h3>
              <p className="text-white opacity-90 mb-6">Comprehensive analysis of the tokenization market, including growth trends, key players, and future opportunities.</p>
              <button className="bg-white text-global-teal px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                Download Report
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon="users" className="text-2xl mr-3" />
                <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">INVESTOR GUIDE</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-4">Investor's Guide to RWA Tokenization</h3>
              <p className="text-white opacity-90 mb-6">Everything you need to know about investing in tokenized real-world assets, from risk assessment to portfolio allocation.</p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                Read Guide
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
