'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface Insight {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export default function InsightDetailClient({ id }: { id: string }) {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Mock insight data
      const mockInsight: Insight = {
        id: id,
        title: `Insight ${id}`,
        content: 'This is a detailed insight about the market and trends.',
        author: 'Research Team',
        date: new Date().toISOString(),
        category: 'Market Analysis',
        image: '/api/placeholder/800/400',
      };
      setInsight(mockInsight);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className='min-h-screen bg-soft-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading insight...</p>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className='min-h-screen bg-soft-white flex items-center justify-center'>
        <div className='text-center'>
          <Icon name='FileText' className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>Insight Not Found</h2>
          <p className='text-gray-600'>The requested insight could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-soft-white'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => window.history.back()}
                className='flex items-center text-gray-600 hover:text-gray-900 transition-colors'
              >
                <Icon name='ArrowLeft' className='h-5 w-5 mr-2' />
                Back
              </button>
              <div className='h-6 w-px bg-gray-300'></div>
              <div>
                <span className='text-sm text-global-teal font-medium'>{insight.category}</span>
                <h1 className='text-2xl font-bold text-gray-900 mt-1'>{insight.title}</h1>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <button className='flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-global-teal transition-colors'>
                <Icon name='Share' className='h-4 w-4 mr-2' />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
          {/* Image */}
          <div className='aspect-video bg-gray-100'>
            <img
              src={insight.image}
              alt={insight.title}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Content */}
          <div className='p-8'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center space-x-4'>
                <div>
                  <p className='text-sm text-gray-600'>By {insight.author}</p>
                  <p className='text-sm text-gray-500'>{new Date(insight.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className='prose prose-lg max-w-none'>
              <p className='text-gray-700 leading-relaxed'>{insight.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
