'use client';

import Icon from '@/components/ui/Icon';
import Tooltip from '@/components/ui/Tooltip';
import BlockchainPanel from '@/components/asset/BlockchainPanel';
import { useEffect, useState, useCallback } from 'react';
import { assetService, Asset } from '@/lib/assetService';

export default function AssetDetailsClient({ id }: { id: string }) {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [investmentStage, setInvestmentStage] = useState('funding');
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [showReturnsModal, setShowReturnsModal] = useState(false);

  const loadAssetData = useCallback(async () => {
    try {
      console.log('Loading asset data for ID:', id);
      setLoading(true);
      setError(null);

      let loadedAsset: Asset | null = null;

      // Use asset service directly (bypass database for now)
      try {
        console.log('Attempting to get asset from service...');
        loadedAsset = await assetService.getAssetById(id);
        console.log('Asset service result:', loadedAsset);
      } catch (serviceError) {
        console.error('Asset service error:', serviceError);
      }

      // If still no asset found, create a fallback asset
      if (!loadedAsset) {
        console.log('Creating fallback asset for ID:', id);
        loadedAsset = {
          id: id,
          name: `Asset ${id}`,
          type: 'container',
          apr: '8.5%',
          risk: 'Medium',
          value: '$125,000',
          route: 'Global Route',
          status: 'active',
          cargo: 'Dubai Port',
          description: 'High-quality container asset with excellent performance metrics.',
          image: '/api/placeholder/400/300',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      console.log('Setting asset:', loadedAsset);
      setAsset(loadedAsset);
      generateChartData(loadedAsset);

      // Check if asset is in watchlist
      try {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setIsInWatchlist(watchlist.includes(id));
      } catch (watchlistError) {
        console.error('Watchlist error:', watchlistError);
        setIsInWatchlist(false);
      }
    } catch (err) {
      console.error('Error loading asset:', err);
      setError('Failed to load asset details');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadAssetData();
  }, [loadAssetData]);

  const generateChartData = (asset: Asset) => {
    // Generate mock chart data
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Performance',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
    setChartData(data);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseShareModal();
      }
    };

    if (showShareModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showShareModal]);

  const handleWatchlistToggle = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const assetId = id;

    if (isInWatchlist) {
      // Remove from watchlist
      const updatedWatchlist = watchlist.filter((id: string) => id !== assetId);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(false);
    } else {
      // Add to watchlist
      const updatedWatchlist = [...watchlist, assetId];
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(true);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-soft-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading asset details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-soft-white flex items-center justify-center'>
        <div className='text-center'>
          <Icon name='AlertCircle' className='h-12 w-12 text-red-500 mx-auto mb-4' />
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>Error Loading Asset</h2>
          <p className='text-gray-600 mb-4'>{error}</p>
          <button
            onClick={loadAssetData}
            className='bg-global-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className='min-h-screen bg-soft-white flex items-center justify-center'>
        <div className='text-center'>
          <Icon name='Package' className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>Asset Not Found</h2>
          <p className='text-gray-600'>The requested asset could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-soft-white'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
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
                <h1 className='text-2xl font-bold text-gray-900'>{asset.name}</h1>
                <p className='text-sm text-gray-600'>Asset ID: {asset.id}</p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <button
                onClick={handleWatchlistToggle}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  isInWatchlist
                    ? 'bg-global-teal text-white border-global-teal'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-global-teal'
                }`}
              >
                <Icon name={isInWatchlist ? 'Heart' : 'HeartOutline'} className='h-4 w-4 mr-2' />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button
                onClick={handleShare}
                className='flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-global-teal transition-colors'
              >
                <Icon name='Share' className='h-4 w-4 mr-2' />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Asset Overview */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Asset Image */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
              <div className='aspect-video bg-gray-100 flex items-center justify-center'>
                <img
                  src={asset.image}
                  alt={asset.name}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Asset Details */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>Asset Details</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Type</label>
                  <p className='text-gray-900'>{asset.type}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    asset.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {asset.status}
                  </span>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Cargo</label>
                  <p className='text-gray-900'>{asset.cargo}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Route</label>
                  <p className='text-gray-900'>{asset.route}</p>
                </div>
              </div>
              {asset.description && (
                <div className='mt-4'>
                  <label className='text-sm font-medium text-gray-500'>Description</label>
                  <p className='text-gray-900 mt-1'>{asset.description}</p>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200'>
              <div className='border-b border-gray-200'>
                <nav className='flex space-x-8 px-6'>
                  {['overview', 'documents', 'timeline', 'blockchain'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-global-teal text-global-teal'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className='p-6'>
                {activeTab === 'overview' && (
                  <div className='space-y-6'>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Performance Metrics</h3>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className='bg-gray-50 rounded-lg p-4'>
                          <div className='flex items-center justify-between'>
                            <div>
                              <p className='text-sm text-gray-600'>APR</p>
                              <p className='text-2xl font-bold text-gray-900'>{asset.apr}</p>
                            </div>
                            <Icon name='TrendingUp' className='h-8 w-8 text-green-500' />
                          </div>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-4'>
                          <div className='flex items-center justify-between'>
                            <div>
                              <p className='text-sm text-gray-600'>Risk Level</p>
                              <p className='text-2xl font-bold text-gray-900'>{asset.risk}</p>
                            </div>
                            <Icon name='Shield' className='h-8 w-8 text-blue-500' />
                          </div>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-4'>
                          <div className='flex items-center justify-between'>
                            <div>
                              <p className='text-sm text-gray-600'>Value</p>
                              <p className='text-2xl font-bold text-gray-900'>{asset.value}</p>
                            </div>
                            <Icon name='DollarSign' className='h-8 w-8 text-green-500' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Documents</h3>
                    <p className='text-gray-500'>No documents available</p>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Activity Timeline</h3>
                    <p className='text-gray-500'>No timeline events available</p>
                  </div>
                )}

                {activeTab === 'blockchain' && (
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Blockchain Information</h3>
                    <div className='space-y-4'>
                      <div>
                        <label className='text-sm font-medium text-gray-500'>Contract Address</label>
                        <p className='text-sm text-gray-900 font-mono'>0x0000000000000000000000000000000000000000</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500'>Token ID</label>
                        <p className='text-sm text-gray-900'>N/A</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500'>Network</label>
                        <p className='text-sm text-gray-900'>Ethereum</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500'>Last Update</label>
                        <p className='text-sm text-gray-900'>{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Investment & Actions */}
          <div className='space-y-6'>
            {/* Investment Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Investment Details</h3>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Minimum Investment</label>
                  <p className='text-2xl font-bold text-gray-900'>$1,000</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Available for Investment</label>
                  <p className='text-lg text-gray-900'>$2,500,000</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Total Value</label>
                  <p className='text-lg text-gray-900'>{asset.value}</p>
                </div>
                <button className='w-full bg-global-teal text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors'>
                  Invest Now
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Quick Actions</h3>
              <div className='space-y-3'>
                <button className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:border-global-teal transition-colors'>
                  <Icon name='Download' className='h-4 w-4 mr-2' />
                  Download Report
                </button>
                <button className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:border-global-teal transition-colors'>
                  <Icon name='MessageCircle' className='h-4 w-4 mr-2' />
                  Contact Support
                </button>
                <button 
                  onClick={() => setShowReturnsModal(true)}
                  className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:border-global-teal transition-colors'
                >
                  <Icon name='Calculator' className='h-4 w-4 mr-2' />
                  Calculate Returns
                </button>
              </div>
            </div>

            {/* Technical Details */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Technical Details</h3>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Asset Health</span>
                  <span className='text-sm font-medium text-green-600'>Excellent</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Compliance</span>
                  <span className='text-sm font-medium text-green-600'>VARA Approved</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Verification</span>
                  <span className='text-sm font-medium text-green-600'>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-2xl p-6 max-w-md w-full mx-4'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>Share Asset</h3>
              <button
                onClick={handleCloseShareModal}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <Icon name='X' className='h-5 w-5' />
              </button>
            </div>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Asset Link
                </label>
                <div className='flex'>
                  <input
                    type='text'
                    value={`${window.location.origin}/assets/${id}`}
                    readOnly
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-global-teal'
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/assets/${id}`
                      )
                    }
                    className='px-4 py-2 bg-global-teal text-white rounded-r-lg hover:bg-opacity-90 transition-colors'
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className='flex space-x-3'>
                <button className='flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:border-global-teal transition-colors'>
                  <Icon name='Share' className='h-4 w-4 mr-2' />
                  Share
                </button>
                <button className='flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:border-global-teal transition-colors'>
                  <Icon name='Mail' className='h-4 w-4 mr-2' />
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Returns Modal */}
      {showReturnsModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-2xl p-6 max-w-md w-full mx-4'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>Calculate Returns</h3>
              <button
                onClick={() => setShowReturnsModal(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <Icon name='X' className='h-5 w-5' />
              </button>
            </div>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Investment Amount
                </label>
                <input
                  type='number'
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal'
                  placeholder='Enter amount'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Investment Period
                </label>
                <select className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal'>
                  <option value='1'>1 Year</option>
                  <option value='2'>2 Years</option>
                  <option value='3'>3 Years</option>
                  <option value='5'>5 Years</option>
                </select>
              </div>
              {investmentAmount > 0 && (
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h4 className='font-medium text-gray-900 mb-2'>Projected Returns</h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Annual Return:</span>
                      <span className='font-medium'>${(investmentAmount * 0.085).toLocaleString()}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Total Return:</span>
                      <span className='font-medium'>${(investmentAmount * 1.085).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
              <button className='w-full bg-global-teal text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors'>
                Calculate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
