'use client';


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
  const [email, setEmail] = useState('');

  const handleDownloadReport = () => {
    // Create a sample PDF report for download
    const reportContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 16 Tf
72 720 Td
(2024 Tokenization Market Report) Tj
0 -30 Td
/F1 12 Tf
(Global Edge Research) Tj
0 -50 Td
(Executive Summary) Tj
0 -20 Td
/F1 10 Tf
(The tokenization market has reached $2.4B in 2024, showing) Tj
0 -15 Td
(significant growth in real-world asset tokenization with) Tj
0 -15 Td
(increasing institutional adoption. This report provides) Tj
0 -15 Td
(comprehensive analysis of market trends, key players,) Tj
0 -15 Td
(and future opportunities in the RWA tokenization space.) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
450
%%EOF`;

    // Create blob and download
    const blob = new Blob([reportContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '2024_Tokenization_Market_Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleReadGuide = () => {
    // Create a sample PDF guide for download
    const guideContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 250
>>
stream
BT
/F1 16 Tf
72 720 Td
(Investor's Guide to RWA Tokenization) Tj
0 -30 Td
/F1 12 Tf
(Global Edge Research) Tj
0 -50 Td
(Table of Contents) Tj
0 -20 Td
/F1 10 Tf
(1. Introduction to Real-World Asset Tokenization) Tj
0 -15 Td
(2. Risk Assessment and Portfolio Allocation) Tj
0 -15 Td
(3. Understanding Token Standards and Compliance) Tj
0 -15 Td
(4. Market Analysis and Investment Strategies) Tj
0 -15 Td
(5. Due Diligence and Best Practices) Tj
0 -15 Td
(6. Future Outlook and Opportunities) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
500
%%EOF`;

    // Create blob and download
    const blob = new Blob([guideContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Investors_Guide_to_RWA_Tokenization.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSubscribe = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    alert(`Thank you for subscribing! You'll receive our latest insights at ${email}`);
    setEmail('');
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-global-teal text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
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
                
                <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">MARKET REPORT</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-4">2024 Tokenization Market Report</h3>
              <p className="text-white opacity-90 mb-6">Comprehensive analysis of the tokenization market, including growth trends, key players, and future opportunities.</p>
              <button 
                onClick={handleDownloadReport}
                className="bg-white text-global-teal px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                Download Report
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                
                <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">INVESTOR GUIDE</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-4">Investor's Guide to RWA Tokenization</h3>
              <p className="text-white opacity-90 mb-6">Everything you need to know about investing in tokenized real-world assets, from risk assessment to portfolio allocation.</p>
              <button 
                onClick={handleReadGuide}
                className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                Read Guide
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
