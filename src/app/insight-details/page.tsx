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
    category: 'Market Analysis',
    title: 'Global Trade Tokenization: A New Era of Investment',
    description: 'Exploring how tokenization is revolutionizing global trade and creating new investment opportunities.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png',
    date: '2024-12-15',
    readTime: '5 min read',
    content: `
      <h2>The Future of Global Trade Investment</h2>
      <p>Tokenization is transforming how we think about global trade investments. By breaking down large assets into smaller, tradeable tokens, we're democratizing access to previously exclusive investment opportunities.</p>
      
      <h3>Key Benefits of Trade Tokenization</h3>
      <ul>
        <li><strong>Accessibility:</strong> Smaller minimum investments make global trade accessible to more investors</li>
        <li><strong>Liquidity:</strong> Tokenized assets can be traded more easily than traditional investments</li>
        <li><strong>Transparency:</strong> Blockchain technology provides unprecedented transparency in trade operations</li>
        <li><strong>Diversification:</strong> Investors can spread risk across multiple trade routes and asset types</li>
      </ul>
      
      <h3>Market Trends</h3>
      <p>The global trade tokenization market is expected to grow significantly over the next decade, driven by increasing demand for alternative investments and technological advancements in blockchain infrastructure.</p>
      
      <h3>Investment Considerations</h3>
      <p>While tokenization offers exciting opportunities, investors should consider factors such as regulatory compliance, market volatility, and the underlying asset quality when making investment decisions.</p>
    `
  },
  {
    id: '2',
    category: 'Technology',
    title: 'Blockchain Infrastructure for Trade Finance',
    description: 'How blockchain technology is enabling secure and transparent trade finance operations worldwide.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png',
    date: '2024-12-14',
    readTime: '7 min read',
    content: `
      <h2>Blockchain Revolution in Trade Finance</h2>
      <p>Blockchain technology is revolutionizing trade finance by providing secure, transparent, and efficient solutions for global trade operations.</p>
      
      <h3>Key Technologies</h3>
      <ul>
        <li><strong>Smart Contracts:</strong> Automated execution of trade agreements</li>
        <li><strong>Digital Identity:</strong> Secure verification of trade participants</li>
        <li><strong>Supply Chain Tracking:</strong> Real-time visibility into cargo movements</li>
        <li><strong>Payment Processing:</strong> Faster and more secure international payments</li>
      </ul>
      
      <h3>Implementation Challenges</h3>
      <p>While blockchain offers significant benefits, implementation requires careful consideration of regulatory requirements, interoperability standards, and integration with existing systems.</p>
    `
  },
  {
    id: '3',
    category: 'Investment Strategy',
    title: 'Diversifying Your Portfolio with Trade Assets',
    description: 'Strategic approaches to incorporating trade assets into your investment portfolio for better risk management.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png',
    date: '2024-12-13',
    readTime: '6 min read',
    content: `
      <h2>Portfolio Diversification with Trade Assets</h2>
      <p>Trade assets offer unique diversification benefits that can enhance portfolio performance and reduce overall risk.</p>
      
      <h3>Diversification Benefits</h3>
      <ul>
        <li><strong>Low Correlation:</strong> Trade assets often have low correlation with traditional markets</li>
        <li><strong>Inflation Hedge:</strong> Physical assets can provide protection against inflation</li>
        <li><strong>Geographic Diversification:</strong> Exposure to global trade routes and economies</li>
        <li><strong>Asset Class Diversification:</strong> Different types of trade assets (containers, commodities, etc.)</li>
      </ul>
      
      <h3>Risk Management</h3>
      <p>Effective portfolio management requires understanding the unique risks associated with trade assets and implementing appropriate risk management strategies.</p>
    `
  }
];

export default function InsightDetailsPage() {
  const [insight, setInsight] = useState<Insight | null>(null);

  useEffect(() => {
    // For demo purposes, show the first insight
    setInsight(mockInsights[0]);
  }, []);

  if (!insight) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="clock" className="animate-spin text-global-teal text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Loading insight...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/insights" className="text-gray-500 hover:text-global-teal">Insights</Link>
            <Icon name="chevron-right" className="text-gray-400 text-xs" />
            <span className="text-gray-500">{insight.category}</span>
            <Icon name="chevron-right" className="text-gray-400 text-xs" />
            <span className="text-charcoal font-medium">Article</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-16 bg-soft-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-global-teal bg-opacity-10 rounded-full mb-6">
              <span className="text-global-teal font-semibold text-sm">{insight.category}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-charcoal mb-6">
              {insight.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {insight.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Icon name="calendar" className="text-gray-400" />
                <span>{new Date(insight.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="clock" className="text-gray-400" />
                <span>{insight.readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img 
              src={insight.image} 
              alt={insight.title}
              className="w-full h-64 lg:h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: insight.content || '' }}
            />
          </div>
        </div>
      </section>

      {/* Related Insights */}
      <section className="py-16 bg-soft-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-poppins font-bold text-charcoal text-center mb-12">
            Related Insights
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockInsights.slice(1, 4).map((relatedInsight) => (
              <Link 
                key={relatedInsight.id}
                href="/insight-details"
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <img 
                  src={relatedInsight.image} 
                  alt={relatedInsight.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-global-teal font-semibold text-sm">
                      {relatedInsight.category}
                    </span>
                    <span className="text-gray-500 text-sm">{relatedInsight.readTime}</span>
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-charcoal mb-3 group-hover:text-global-teal transition-colors">
                    {relatedInsight.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {relatedInsight.description}
                  </p>
                  <div className="flex items-center text-global-teal font-semibold group-hover:text-edge-purple transition-colors">
                    <span>Read More</span>
                    <Icon name="arrow-right" className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-global-teal to-edge-purple text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of investors who are already benefiting from tokenized trade assets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/register"
              className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started Today
            </Link>
            <Link 
              href="/assets"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors"
            >
              Browse Assets
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
