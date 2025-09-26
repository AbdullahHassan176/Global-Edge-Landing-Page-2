'use client';

import Icon from '@/components/ui/Icon';
import Tooltip from '@/components/ui/Tooltip';
import BlockchainPanel from '@/components/asset/BlockchainPanel';
import { useEffect, useState, useCallback } from 'react';
import { assetService, Asset } from '@/lib/assetService';

export default function AssetDetailsPage({ params }: { params: { id: string } }) {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [investmentStage, setInvestmentStage] = useState('funding');
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [calculatedReturns, setCalculatedReturns] = useState<{
    expectedReturn: number;
    totalReturn: number;
    monthlyReturn: number;
    daysToMaturity: number;
  } | null>(null);
  const [showReturnsModal, setShowReturnsModal] = useState(false);

  const loadAssetData = useCallback(async () => {
    try {
      console.log('Loading asset data for ID:', params.id);
      setLoading(true);
      setError(null);

      let loadedAsset: Asset | null = null;

      // Use asset service directly (bypass database for now)
      try {
        console.log('Attempting to get asset from service...');
        loadedAsset = await assetService.getAssetById(params.id);
        console.log('Asset service result:', loadedAsset);
      } catch (serviceError) {
        console.error('Asset service error:', serviceError);
      }

      // If still no asset found, create a fallback asset
      if (!loadedAsset) {
        console.log('Creating fallback asset for ID:', params.id);
        loadedAsset = {
          id: params.id,
          name: `Asset ${params.id}`,
          type: 'container',
          apr: '8.5%',
          risk: 'Medium',
          value: '$125,000',
          route: 'Global Route',
          cargo: 'Electronics',
          image: '/api/placeholder/400/300',
          description: 'High-quality shipping container with verified cargo',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }

      console.log('Setting asset:', loadedAsset);
      setAsset(loadedAsset);

      // Generate dynamic chart data based on asset
      generateChartData(loadedAsset);

      // Check if asset is in watchlist
      try {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setIsInWatchlist(watchlist.includes(params.id));
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
  }, [params.id]);

  useEffect(() => {
    loadAssetData();
  }, [loadAssetData]);

  const generateChartData = (assetData: Asset) => {
    if (!assetData) return;
    
    // Generate dynamic chart data based on asset value and performance
    const baseValue = parseFloat(assetData.value.replace(/[$,]/g, '')) || 100000;
    const apr = parseFloat(assetData.apr.replace('%', '')) || 10;
    const days = 30;
    const dailyReturn = (apr / 100) / 365;
    
    const data = [];
    const categories = [];
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      categories.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      const value = baseValue * (1 + dailyReturn * (days - i));
      data.push(Math.round(value));
    }
    
    setChartData({ categories, data });
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showShareModal) {
          setShowShareModal(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showShareModal]);

  const handleWatchlistToggle = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const assetId = params.id;
    
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

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const handleDocumentDownload = (documentName: string) => {
    // Create a sample PDF blob for demonstration
    const samplePdfContent = `%PDF-1.4
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
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${documentName} - Sample Document) Tj
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
299
%%EOF`;

    // Create blob and download
    const blob = new Blob([samplePdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleCalculateReturns = () => {
    if (!asset || investmentAmount <= 0) {
      alert('Please enter a valid investment amount');
      return;
    }

    // Extract APR from asset (remove % and convert to decimal)
    const apr = parseFloat(asset.apr.replace('%', '')) / 100;
    
    // Calculate returns based on 1-year investment period
    const expectedReturn = investmentAmount * apr;
    const totalReturn = investmentAmount + expectedReturn;
    const monthlyReturn = expectedReturn / 12;
    const daysToMaturity = 365; // 1 year

    setCalculatedReturns({
      expectedReturn,
      totalReturn,
      monthlyReturn,
      daysToMaturity
    });
    setShowReturnsModal(true);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: 'Documents' },
    { id: 'provenance', label: 'Provenance' },
    { id: 'risks', label: 'Risks' },
    { id: 'faqs', label: 'FAQs' }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Asset Details</h2>
          <p className="text-gray-600">Please wait while we fetch the asset information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !asset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="exclamation-triangle" className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Asset Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested asset could not be found.'}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-global-teal text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Go Back
          </button>
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
            <span className="text-gray-500 hover:text-global-teal cursor-pointer">Assets</span>
            <Icon name="chevron-right" className="text-gray-400 text-xs" />
            <span className="text-gray-500 hover:text-global-teal cursor-pointer">{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}s</span>
            <Icon name="chevron-right" className="text-gray-400 text-xs" />
            <span className="text-charcoal font-medium">{asset.name}</span>
          </nav>
        </div>
      </div>

      {/* Asset Header */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start space-x-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <Icon name="ship" className="text-blue-600 text-3xl" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-poppins font-bold text-charcoal">{asset.name}</h1>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    asset.status === 'active' ? 'bg-green-100 text-green-700' :
                    asset.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <Icon name="shield" className="mr-1" />
                    Verified
                  </div>
                </div>
                <p className="text-gray-600 mb-2">
                  {asset.type === 'container' ? '40ft High Cube Container' : 
                   asset.type === 'property' ? 'Real Estate Property' :
                   asset.type === 'inventory' ? 'Inventory Asset' :
                   'Vault Asset'} • {asset.route || 'Global Route'}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Icon name="calendar" className="mr-1" />
                    Issued: Dec 15, 2024
                  </span>
                  <span className="flex items-center">
                    <Icon name="location-dot" className="mr-1" />
                    Currently: Port of Hamburg
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip content={isInWatchlist ? "Remove this asset from your watchlist" : "Add this asset to your watchlist for easy tracking"}>
                <button 
                  onClick={handleWatchlistToggle}
                  className={`px-6 py-2 rounded-full font-medium transition-colors cursor-help ${
                    isInWatchlist 
                      ? 'bg-global-teal text-white hover:bg-opacity-90' 
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={isInWatchlist ? "heart-solid" : "heart"} className="mr-2" />
                  {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                </button>
              </Tooltip>
              <Tooltip content="Share this asset with others via social media, email, or direct link">
                <button 
                  onClick={handleShare}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors cursor-help"
                >
                  <Icon name="share" className="mr-2" />
                  Share
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Key Metrics */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-8 gap-6">
            <Tooltip content="Target annual percentage return based on current market conditions and asset performance">
              <div className="text-center cursor-help">
                <div className="text-2xl font-poppins font-bold text-global-teal mb-1">{asset.apr}</div>
                <div className="text-sm text-gray-600">Target APR</div>
              </div>
            </Tooltip>
            <Tooltip content="Total duration of the investment from start to expected completion">
              <div className="text-center cursor-help">
                <div className="text-2xl font-poppins font-bold text-charcoal mb-1">45 days</div>
                <div className="text-sm text-gray-600">Tenor</div>
              </div>
            </Tooltip>
            <Tooltip content="Minimum amount required to invest in this asset">
              <div className="text-center cursor-help">
                <div className="text-2xl font-poppins font-bold text-charcoal mb-1">$50</div>
                <div className="text-sm text-gray-600">Min. Investment</div>
              </div>
            </Tooltip>
            <Tooltip content="Total value of the asset including cargo and container">
              <div className="text-center cursor-help">
                <div className="text-2xl font-poppins font-bold text-charcoal mb-1">{asset.value}</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </Tooltip>
            <Tooltip content="Percentage of total funding raised from investors">
              <div className="text-center cursor-help">
                <div className="text-2xl font-poppins font-bold text-green-600 mb-1">87%</div>
                <div className="text-sm text-gray-600">Funded</div>
              </div>
            </Tooltip>
            <Tooltip content="Number of unique investors who have invested in this asset">
              <div className="text-center cursor-help">
                <div className="text-2xl font-poppins font-bold text-charcoal mb-1">23</div>
                <div className="text-sm text-gray-600">Investors</div>
              </div>
            </Tooltip>
            <Tooltip content="Current stage of the investment lifecycle">
              <div className="text-center cursor-help">
                <div className="text-2xl font-poppins font-bold text-blue-600 mb-1">In Transit</div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </Tooltip>
            <Tooltip content="Days remaining until expected completion and returns distribution">
              <div className="text-center cursor-help">
                <div className="text-2xl font-poppins font-bold text-orange-600 mb-1">32</div>
                <div className="text-sm text-gray-600">Days Left</div>
              </div>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* Investment Stage Progress */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="mb-4">
            <Tooltip content="Track the current stage of your investment from funding to completion">
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2 cursor-help">Investment Progress</h3>
            </Tooltip>
            <Tooltip content="Visual representation of where your investment stands in the lifecycle">
              <p className="text-sm text-gray-600 cursor-help">Track the current stage of your investment</p>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-4">
            <Tooltip content="Investment has been fully funded and is ready to begin">
              <div className="flex items-center space-x-2 cursor-help">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="check" className="text-green-600 text-sm" />
                </div>
                <span className="text-sm font-medium text-green-600">Funded</span>
              </div>
            </Tooltip>
            <Tooltip content="Progress bar showing completion of the funding stage">
              <div className="flex-1 h-2 bg-green-200 rounded-full cursor-help">
                <div className="bg-green-500 h-2 rounded-full w-full"></div>
              </div>
            </Tooltip>
            <Tooltip content="Asset is currently in transit to its destination">
              <div className="flex items-center space-x-2 cursor-help">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="clock" className="text-blue-600 text-sm" />
                </div>
                <span className="text-sm font-medium text-blue-600">In Transit</span>
              </div>
            </Tooltip>
            <Tooltip content="Progress bar showing current transit completion">
              <div className="flex-1 h-2 bg-gray-200 rounded-full cursor-help">
                <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
              </div>
            </Tooltip>
            <Tooltip content="Asset will be delivered to its final destination">
              <div className="flex items-center space-x-2 cursor-help">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Icon name="clock" className="text-gray-400 text-sm" />
                </div>
                <span className="text-sm text-gray-500">Delivered</span>
              </div>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* Enhanced Blockchain Status Panel */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="mb-4">
            <Tooltip content="Real-time blockchain status and technical details for this asset">
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-2 cursor-help">Blockchain Status</h3>
            </Tooltip>
            <Tooltip content="View on-chain activity, contract details, and transaction history">
              <p className="text-sm text-gray-600 cursor-help">Track blockchain activity and technical details</p>
            </Tooltip>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlockchainPanel assetKey={params.id} />
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Asset Health</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Oracle Status</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Update</span>
                  <span className="text-gray-900">2h ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Documents</span>
                  <span className="text-gray-900">3 verified</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Security</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Multi-sig</span>
                  <span className="text-green-600 font-medium">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Audit Status</span>
                  <span className="text-green-600 font-medium">Passed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Insurance</span>
                  <span className="text-gray-900">$125K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-8 pt-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'text-global-teal border-b-2 border-global-teal'
                          : 'text-gray-500 hover:text-charcoal'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <>
                    {/* Enhanced Asset Description */}
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Asset Description</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {asset.description || `This ${asset.type} asset represents a valuable investment opportunity in the tokenized assets market. The asset has been professionally evaluated and meets all compliance requirements for investment.`}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {asset.cargo ? `The cargo consists of ${asset.cargo} valued at ${asset.value}, with confirmed purchase orders and expected delivery within 45 days, generating returns through freight fees and cargo appreciation.` : 
                         `This asset offers a ${asset.apr} annual return with ${asset.risk} risk level, making it an attractive investment opportunity for qualified investors.`}
                      </p>
                      
                      {/* Investment Details */}
                      <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <Tooltip content="Detailed information about the current investment status and progress">
                          <h4 className="font-semibold text-charcoal mb-4 cursor-help">Investment Details</h4>
                        </Tooltip>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="space-y-3">
                              <Tooltip content="Current stage of the investment lifecycle with completion percentage">
                                <div className="flex justify-between cursor-help">
                                  <span className="text-sm text-gray-600">Investment Stage</span>
                                  <span className="text-sm font-medium text-blue-600">In Transit (75% Complete)</span>
                                </div>
                              </Tooltip>
                              <Tooltip content="Current physical location of the asset during transit">
                                <div className="flex justify-between cursor-help">
                                  <span className="text-sm text-gray-600">Current Location</span>
                                  <span className="text-sm font-medium text-charcoal">Port of Hamburg</span>
                                </div>
                              </Tooltip>
                              <Tooltip content="Next major milestone in the investment journey">
                                <div className="flex justify-between cursor-help">
                                  <span className="text-sm text-gray-600">Next Milestone</span>
                                  <span className="text-sm font-medium text-charcoal">Port of Rotterdam (Jan 28)</span>
                                </div>
                              </Tooltip>
                              <Tooltip content="Estimated date when the asset will reach its final destination">
                                <div className="flex justify-between cursor-help">
                                  <span className="text-sm text-gray-600">Expected Delivery</span>
                                  <span className="text-sm font-medium text-green-600">Jan 28, 2025</span>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                          <div>
                            <div className="space-y-3">
                              <Tooltip content="Total amount of funding raised from all investors">
                                <div className="flex justify-between cursor-help">
                                  <span className="text-sm text-gray-600">Total Raised</span>
                                  <span className="text-sm font-medium text-charcoal">$108,750</span>
                                </div>
                              </Tooltip>
                              <Tooltip content="Amount still needed to reach the full funding target">
                                <div className="flex justify-between cursor-help">
                                  <span className="text-sm text-gray-600">Remaining to Raise</span>
                                  <span className="text-sm font-medium text-orange-600">$16,250</span>
                                </div>
                              </Tooltip>
                              <Tooltip content="Average investment amount per investor">
                                <div className="flex justify-between cursor-help">
                                  <span className="text-sm text-gray-600">Average Investment</span>
                                  <span className="text-sm font-medium text-charcoal">$4,728</span>
                                </div>
                              </Tooltip>
                              <Tooltip content="Highest single investment amount in this asset">
                                <div className="flex justify-between cursor-help">
                                  <span className="text-sm text-gray-600">Largest Investment</span>
                                  <span className="text-sm font-medium text-charcoal">$15,000</span>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Financial Projections */}
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Financial Projections</h3>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium text-charcoal mb-3">Revenue Sources</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Freight Fees</span>
                                <span className="text-charcoal font-medium">$8,500</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Cargo Appreciation</span>
                                <span className="text-charcoal font-medium">$6,200</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Insurance Premium</span>
                                <span className="text-charcoal font-medium">$1,800</span>
                              </div>
                              <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                                <span className="text-gray-900 font-medium">Total Revenue</span>
                                <span className="text-global-teal font-semibold">$16,500</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-charcoal mb-3">Cost Structure</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Insurance</span>
                                <span className="text-charcoal font-medium">$1,250</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Platform Fee (2%)</span>
                                <span className="text-charcoal font-medium">$2,500</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Operational Costs</span>
                                <span className="text-charcoal font-medium">$1,800</span>
                              </div>
                              <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                                <span className="text-gray-900 font-medium">Total Costs</span>
                                <span className="text-red-600 font-semibold">$5,550</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-charcoal mb-3">Returns Distribution</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Net Profit</span>
                                <span className="text-green-600 font-medium">$10,950</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Investor Returns</span>
                                <span className="text-green-600 font-medium">$9,855</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Issuer Profit</span>
                                <span className="text-blue-600 font-medium">$1,095</span>
                              </div>
                              <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                                <span className="text-gray-900 font-medium">ROI per $1,000</span>
                                <span className="text-global-teal font-semibold">$90.55</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Performance Metrics</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h4 className="font-medium text-charcoal mb-4">Investment Performance</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Current Value</span>
                              <span className="text-sm font-medium text-green-600">$132,400</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Value Appreciation</span>
                              <span className="text-sm font-medium text-green-600">+5.92%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Days Since Investment</span>
                              <span className="text-sm font-medium text-charcoal">13 days</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Annualized Return</span>
                              <span className="text-sm font-medium text-global-teal">14.2%</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h4 className="font-medium text-charcoal mb-4">Risk Metrics</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Volatility (30d)</span>
                              <span className="text-sm font-medium text-yellow-600">2.3%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Sharpe Ratio</span>
                              <span className="text-sm font-medium text-green-600">1.85</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Max Drawdown</span>
                              <span className="text-sm font-medium text-red-600">-0.8%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Beta</span>
                              <span className="text-sm font-medium text-blue-600">0.65</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Value Tracking</h3>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div id="value-chart" className="h-64"></div>
                      </div>
                    </div>

                    {/* Enhanced Risk Assessment */}
                    <div className="mb-8">
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Risk Assessment</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Weather Risk</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Low</span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Protected route with minimal weather exposure</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Route Risk</span>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Medium</span>
                          </div>
                          <div className="w-full bg-yellow-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full w-1/2"></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Standard shipping route with established protocols</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Operator Risk</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Low</span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Experienced operator with 15+ years track record</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Insurance</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Covered</span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-full"></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Full cargo insurance with $125K coverage</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'documents' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Asset Documents</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="file-pdf" className="text-red-600 text-xl" />
                          <div>
                            <p className="font-medium text-charcoal">Container Bill of Lading</p>
                            <p className="text-sm text-gray-600">Issued by Maersk Line</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDocumentDownload('Container Bill of Lading')}
                          className="text-global-teal hover:text-edge-purple text-sm font-medium transition-colors"
                        >
                          Download
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="file-pdf" className="text-red-600 text-xl" />
                          <div>
                            <p className="font-medium text-charcoal">Insurance Certificate</p>
                            <p className="text-sm text-gray-600">Coverage: $125,000</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDocumentDownload('Insurance Certificate')}
                          className="text-global-teal hover:text-edge-purple text-sm font-medium transition-colors"
                        >
                          Download
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="file-pdf" className="text-red-600 text-xl" />
                          <div>
                            <p className="font-medium text-charcoal">Cargo Manifest</p>
                            <p className="text-sm text-gray-600">Electronics inventory list</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDocumentDownload('Cargo Manifest')}
                          className="text-global-teal hover:text-edge-purple text-sm font-medium transition-colors"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'provenance' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Asset Provenance</h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Icon name="check" className="text-green-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-charcoal">Manufactured</span>
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                              <Icon name="shield" className="text-blue-600 text-xs" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">Dec 1, 2024 • Shanghai</div>
                          <p className="text-sm text-gray-600 mt-1">Container manufactured by CIMC, certified for international shipping</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Icon name="check" className="text-green-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-charcoal">Loaded</span>
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                              <Icon name="shield" className="text-blue-600 text-xs" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">Dec 3, 2024 • Port of Shanghai</div>
                          <p className="text-sm text-gray-600 mt-1">Electronics loaded and sealed with tamper-proof locks</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Icon name="check" className="text-green-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-charcoal">Departed</span>
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                              <Icon name="shield" className="text-blue-600 text-xs" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">Dec 5, 2024 • Shanghai Port</div>
                          <p className="text-sm text-gray-600 mt-1">Vessel departed on schedule, GPS tracking activated</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon name="clock" className="text-blue-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-charcoal">In Transit</span>
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                              <Icon name="satellite" className="text-blue-600 text-xs" />
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">Current • Port of Hamburg</div>
                          <p className="text-sm text-gray-600 mt-1">Container is currently in Hamburg, temperature and security monitoring active</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Icon name="clock" className="text-gray-400 text-sm" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-gray-500">Expected Delivery</span>
                          <div className="text-xs text-gray-400">Jan 28, 2025 • Port of Rotterdam</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'risks' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Risk Factors</h3>
                    <div className="space-y-4">
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <h4 className="font-medium text-red-800 mb-2">Market Risk</h4>
                        <p className="text-sm text-red-700">Electronics market volatility may affect cargo value. Current market conditions show stable demand.</p>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">Operational Risk</h4>
                        <p className="text-sm text-yellow-700">Shipping delays due to weather, port congestion, or regulatory changes may impact delivery timeline.</p>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <h4 className="font-medium text-orange-800 mb-2">Currency Risk</h4>
                        <p className="text-sm text-orange-700">Exchange rate fluctuations between USD and EUR may affect returns for European investors.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faqs' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-charcoal mb-2">When will I receive my returns?</h4>
                        <p className="text-sm text-gray-600">Returns are distributed within 7 days of successful delivery to the destination port.</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-charcoal mb-2">What happens if the cargo is damaged?</h4>
                        <p className="text-sm text-gray-600">The asset is fully insured for $125,000. Any damage claims are processed through the insurance provider.</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-charcoal mb-2">Can I sell my investment before completion?</h4>
                        <p className="text-sm text-gray-600">Secondary market trading is available 30 days after initial investment, subject to market conditions.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Investment Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sticky top-24">
              {/* Investment Header */}
              <div className="text-center mb-8">
                <Tooltip content="Expected annual percentage return based on current market conditions">
                  <div className="text-4xl font-poppins font-bold text-global-teal mb-2 cursor-help">{asset.apr}</div>
                </Tooltip>
                <Tooltip content="Target annual percentage return for this investment">
                  <div className="text-sm text-gray-600 mb-6 cursor-help">Target APR</div>
                </Tooltip>
                
                {/* Funding Progress */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <Tooltip content="Progress bar showing how much funding has been raised">
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-3 cursor-help">
                      <div className="bg-gradient-to-r from-global-teal to-aqua-start h-4 rounded-full transition-all duration-500" style={{width: '87%'}}></div>
                    </div>
                  </Tooltip>
                  <Tooltip content="Current funding status with amount raised and percentage complete">
                    <div className="flex justify-between text-sm cursor-help">
                      <span className="text-gray-600 font-medium">$108,750 raised</span>
                      <span className="text-global-teal font-bold">87%</span>
                    </div>
                  </Tooltip>
                </div>
              </div>

              {/* Investment Details */}
              <div className="space-y-5 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <Tooltip content="Price per token for this investment opportunity">
                    <div className="bg-gray-50 rounded-lg p-4 cursor-help">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Token Price</div>
                      <div className="text-lg font-semibold text-charcoal">$1.00</div>
                    </div>
                  </Tooltip>
                  <Tooltip content="Minimum amount required to invest in this asset">
                    <div className="bg-gray-50 rounded-lg p-4 cursor-help">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Min. Investment</div>
                      <div className="text-lg font-semibold text-charcoal">$50</div>
                    </div>
                  </Tooltip>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Tooltip content="Days remaining until the investment period closes">
                    <div className="bg-blue-50 rounded-lg p-4 cursor-help">
                      <div className="text-xs text-blue-600 uppercase tracking-wide mb-1">Time Remaining</div>
                      <div className="text-lg font-semibold text-blue-700">32 days</div>
                    </div>
                  </Tooltip>
                  <Tooltip content="Expected return per token based on the target APR">
                    <div className="bg-green-50 rounded-lg p-4 cursor-help">
                      <div className="text-xs text-green-600 uppercase tracking-wide mb-1">Expected Return</div>
                      <div className="text-lg font-semibold text-green-700">$1.142</div>
                    </div>
                  </Tooltip>
                </div>
                
                <Tooltip content="Current stage of the investment lifecycle">
                  <div className="bg-blue-50 rounded-lg p-4 cursor-help">
                    <div className="text-xs text-blue-600 uppercase tracking-wide mb-1">Current Stage</div>
                    <div className="text-lg font-semibold text-blue-700">In Transit</div>
                  </div>
                </Tooltip>
              </div>

              {/* Investment Input Section */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 mb-6">
                <Tooltip content="Enter the amount you want to invest in this asset (minimum $50)">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 cursor-help">Investment Amount</label>
                </Tooltip>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                  <input 
                    type="number" 
                    value={investmentAmount || ''}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-global-teal focus:border-global-teal text-lg font-semibold transition-all duration-200" 
                    placeholder="50" 
                    min="50" 
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2">Minimum investment: $50</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Tooltip content="Click to invest in this asset and start earning returns">
                  <button className="w-full bg-gradient-to-r from-global-teal to-aqua-start text-white py-4 rounded-xl font-poppins font-bold text-lg hover:from-global-teal-dark hover:to-aqua-start-dark transition-all duration-300 shadow-lg hover:shadow-xl cursor-help transform hover:scale-105">
                    <Icon name="arrow-right" className="mr-2" />
                    Invest Now
                  </button>
                </Tooltip>

                <div className="text-center">
                  <Tooltip content="Calculate potential returns based on your investment amount">
                    <button 
                      onClick={handleCalculateReturns}
                      className="inline-flex items-center text-global-teal hover:text-global-teal-dark text-sm font-semibold cursor-help transition-colors duration-200 hover:underline"
                    >
                      <Icon name="calculator" className="mr-2" />
                      Calculate Returns
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Enhanced Provenance Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">
              <Tooltip content="Track the journey of your investment from origin to destination">
                <h3 className="text-lg font-poppins font-semibold text-charcoal mb-6 cursor-help">Logistics Timeline</h3>
              </Tooltip>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="check" className="text-green-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-charcoal">Manufactured</span>
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="shield" className="text-blue-600 text-xs" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Dec 1, 2024 • Shanghai</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="check" className="text-green-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-charcoal">Loaded</span>
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="shield" className="text-blue-600 text-xs" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Dec 3, 2024 • Port of Shanghai</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="check" className="text-green-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-charcoal">Departed</span>
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="shield" className="text-blue-600 text-xs" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Dec 5, 2024 • Shanghai Port</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="clock" className="text-blue-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-charcoal">In Transit</span>
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="satellite" className="text-blue-600 text-xs" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Current • Port of Hamburg</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Icon name="clock" className="text-gray-400 text-sm" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-500">Expected Delivery</span>
                    <div className="text-xs text-gray-400">Jan 28, 2025 • Port of Rotterdam</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Disclosure */}
      <section className="bg-yellow-50 border border-yellow-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-start space-x-3">
            <Icon name="exclamation-triangle" className="text-yellow-600 text-lg mt-1" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Important Risk Disclosure</h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                The target APR of 14.2% is a projection based on current market conditions and is not guaranteed. Investments in tokenized assets carry risks including market volatility, liquidity constraints, and potential loss of principal. This asset is subject to shipping delays, weather conditions, and regulatory changes that may affect returns. Please review all risk factors and consult with financial advisors before investing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {showShareModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal">Share Asset</h3>
                <p className="text-xs text-gray-500 mt-1">Press Esc to close</p>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="x-mark" className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Link</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={`${window.location.origin}/assets/${params.id}`}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-global-teal"
                  />
                  <button 
                    onClick={() => copyToClipboard(`${window.location.origin}/assets/${params.id}`)}
                    className="px-4 py-2 bg-global-teal text-white rounded-r-lg hover:bg-opacity-90 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Share on Social Media</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out this tokenized asset: ${window.location.href}`, '_blank')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                  >
                    <Icon name="twitter" className="mr-2" />
                    Twitter
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center"
                  >
                    <Icon name="linkedin" className="mr-2" />
                    LinkedIn
                  </button>
                  <button 
                    onClick={() => {
                      // Instagram doesn't have a direct sharing API, so we'll copy the link and open Instagram
                      copyToClipboard(`Check out this tokenized asset: ${window.location.href}`);
                      window.open(`https://www.instagram.com/`, '_blank');
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center"
                  >
                    <Icon name="instagram" className="mr-2" />
                    Instagram
                  </button>
                  <button 
                    onClick={() => window.open(`https://wa.me/?text=Check out this tokenized asset: ${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <Icon name="whatsapp" className="mr-2" />
                    WhatsApp
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Share</label>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => window.open(`mailto:?subject=Check out this tokenized asset&body=Hi, I thought you might be interested in this tokenized asset: ${window.location.href}`, '_blank')}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Icon name="envelope" className="mr-2" />
                    Send via Email
                  </button>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Tokenized Asset',
                          text: 'Check out this tokenized asset',
                          url: window.location.href
                        });
                      } else {
                        copyToClipboard(window.location.href);
                      }
                    }}
                    className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
                  >
                    <Icon name="device-phone-mobile" className="mr-2" />
                    Native Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Returns Calculation Modal */}
      {showReturnsModal && calculatedReturns && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Investment Returns</h3>
              <button 
                onClick={() => setShowReturnsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name="close" size={6} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-global-teal to-edge-purple rounded-xl p-6 text-white">
                <h4 className="text-lg font-semibold mb-4">Your Investment Analysis</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Investment Amount:</span>
                    <span className="font-semibold">${investmentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected APR:</span>
                    <span className="font-semibold">{asset?.apr}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-green-800">Expected Return</p>
                    <p className="text-sm text-green-600">Annual profit from your investment</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${calculatedReturns.expectedReturn.toLocaleString()}
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-blue-800">Total Return</p>
                    <p className="text-sm text-blue-600">Principal + expected return</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${calculatedReturns.totalReturn.toLocaleString()}
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div>
                    <p className="font-medium text-purple-800">Monthly Return</p>
                    <p className="text-sm text-purple-600">Average monthly profit</p>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    ${calculatedReturns.monthlyReturn.toLocaleString()}
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-medium text-orange-800">Investment Period</p>
                    <p className="text-sm text-orange-600">Time to maturity</p>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {calculatedReturns.daysToMaturity} days
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Icon name="warning" className="text-yellow-600 mr-2 mt-0.5" size={4} />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">Important Notice</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Returns are projections based on current market conditions and are not guaranteed. 
                      Past performance does not indicate future results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowReturnsModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowReturnsModal(false);
                    // Scroll to invest button
                    document.querySelector('button:contains("Invest Now")')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-global-teal text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  Proceed to Invest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}