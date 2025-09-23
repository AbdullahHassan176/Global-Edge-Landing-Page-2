'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import { assetService, Asset } from '@/lib/assetService';
import { assetIntegration } from '@/lib/integration/assetIntegration';

export default function AssetsPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('containers');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('highest-apr');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterMinApr, setFilterMinApr] = useState<number>(0);

  // Load assets on component mount
  useEffect(() => {
    loadAssets();
  }, []);

  // Handle URL query parameters for category selection
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && ['containers', 'property', 'tradetokens', 'vault', 'all'].includes(category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const loadAssets = async () => {
    setLoading(true);
    try {
      // Try mock service first for faster loading
      const allAssets = await assetService.getAssets();
      if (Array.isArray(allAssets)) {
        setAssets(allAssets);
        setLoading(false);
        
        // Then try database integration in background (non-blocking)
        try {
          const result = await assetIntegration.getAssets();
          if (result.success && result.assets && Array.isArray(result.assets)) {
            setAssets(result.assets as Asset[]);
          }
        } catch (dbError) {
          // Silently fail - we already have mock data
          console.log('Database integration failed, using mock data');
        }
        return;
      }
      
      // Fallback to integration service if mock fails
      const result = await assetIntegration.getAssets();
      if (result.success && result.assets && Array.isArray(result.assets)) {
        setAssets(result.assets as Asset[]);
      } else {
        setAssets([]);
      }
    } catch (error) {
      console.error('Error loading assets:', error);
      setAssets([]); // Ensure assets is always an array
    } finally {
      setLoading(false);
    }
  };

  // Handler functions
  const handleViewAsset = (asset: any) => {
    // Navigate to the enhanced asset details page
    window.location.href = `/assets/${asset.id}`;
  };

  const handleEditAsset = (asset: any) => {
    console.log('Edit asset:', asset);
    alert(`Edit functionality for ${asset.name} would be implemented here`);
  };

  // Get category-specific data with filtering and sorting
  const getCategoryData = () => {
    // Ensure assets is an array before filtering
    if (!Array.isArray(assets)) {
      return {
        title: 'All Assets',
        description: 'All assets available for investment',
        icon: 'layer-group',
        color: 'gray',
        count: 0,
        assets: []
      };
    }

    let filteredAssets = assets.filter(asset => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'tradetokens' && asset.type !== 'inventory') return false;
        if (activeCategory !== 'tradetokens' && asset.type !== activeCategory) return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          asset.name.toLowerCase().includes(searchLower) ||
          asset.route.toLowerCase().includes(searchLower) ||
          asset.cargo.toLowerCase().includes(searchLower) ||
          asset.type.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Risk filter
      if (filterRisk !== 'all' && asset.risk.toLowerCase() !== filterRisk.toLowerCase()) {
        return false;
      }

      // APR filter
      const assetApr = parseFloat(asset.apr);
      if (assetApr < filterMinApr) {
        return false;
      }

      return true;
    });

    // Sort assets
    filteredAssets.sort((a, b) => {
      switch (sortBy) {
        case 'highest-apr':
          return parseFloat(b.apr) - parseFloat(a.apr);
        case 'lowest-risk':
          const riskOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
          return (riskOrder[a.risk as keyof typeof riskOrder] || 2) - (riskOrder[b.risk as keyof typeof riskOrder] || 2);
        case 'newest-first':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'most-popular':
          // Mock popularity based on asset value (higher value = more popular)
          return parseFloat(b.value.replace(/[^0-9.-]+/g, '')) - parseFloat(a.value.replace(/[^0-9.-]+/g, ''));
        default:
          return 0;
      }
    });

    const categoryMap = {
      containers: { title: 'Container Assets', description: 'Shipping containers available for investment', icon: 'ship', color: 'blue' },
      property: { title: 'Property Assets', description: 'Real estate properties available for investment', icon: 'building', color: 'green' },
      tradetokens: { title: 'TradeToken Assets', description: 'Trade inventory tokens available for investment', icon: 'boxes', color: 'purple' },
      vault: { title: 'Vault Assets', description: 'Secure vault storage assets available for investment', icon: 'vault', color: 'orange' },
      all: { title: 'All Assets', description: 'All assets available for investment', icon: 'layer-group', color: 'gray' }
    };

    const categoryInfo = categoryMap[activeCategory as keyof typeof categoryMap] || categoryMap.containers;

    return {
      ...categoryInfo,
      count: filteredAssets.length,
      assets: filteredAssets
    };
  };

  const categoryData = useMemo(() => {
    if (loading) {
      return {
        title: 'Loading Assets...',
        description: 'Please wait while we load the assets',
        icon: 'spinner',
        color: 'gray',
        count: 0,
        assets: []
      };
    }
    return getCategoryData();
  }, [loading, assets, activeCategory, searchTerm, sortBy, filterRisk, filterMinApr]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading assets...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Asset Category Hero */}
      <section className="bg-gradient-to-r from-global-teal to-edge-purple h-[400px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center mb-4">
              <span className="text-lg font-inter font-light opacity-80">Assets</span>
              <Icon name="chevron-right" className="mx-3 text-sm opacity-60" />
              <span className="text-lg font-inter font-medium">Category Hub</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-6 leading-tight">
              Browse Asset Categories
            </h1>
            <p className="text-xl font-inter font-light opacity-90 max-w-2xl">
              Explore tokenized real-world assets across shipping containers, real estate, trade inventory, and secure vault storage.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button 
              onClick={() => setActiveCategory('containers')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'containers' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="ship" />
              <span>Containers</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'containers' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>{assets.filter(a => a.type === 'container').length}</span>
            </button>
            <button 
              onClick={() => setActiveCategory('property')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'property' 
                  ? 'border-green-600 text-green-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="building" />
              <span>Property</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'property' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>{assets.filter(a => a.type === 'property').length}</span>
            </button>
            <button 
              onClick={() => setActiveCategory('tradetokens')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'tradetokens' 
                  ? 'border-purple-600 text-purple-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="boxes" />
              <span>TradeTokens</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'tradetokens' 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>{assets.filter(a => a.type === 'inventory').length}</span>
            </button>
            <button 
              onClick={() => setActiveCategory('vault')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'vault' 
                  ? 'border-orange-600 text-orange-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="vault" />
              <span>Vault</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'vault' 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>{assets.filter(a => a.type === 'vault').length}</span>
            </button>
            <button 
              onClick={() => setActiveCategory('all')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'all' 
                  ? 'border-gray-600 text-gray-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="layer-group" />
              <span>All Assets</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'all' 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>{assets.length}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={`Search ${activeCategory} by route, cargo type...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent" 
                />
                <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-full transition-colors ${
                  showFilters 
                    ? 'border-global-teal bg-global-teal text-white' 
                    : 'border-gray-300 hover:border-global-teal'
                }`}
              >
                <Icon name="filter" className={showFilters ? "text-white" : "text-gray-600"} />
                <span className={`font-medium ${showFilters ? 'text-white' : 'text-gray-700'}`}>Filters</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal"
              >
                <option value="highest-apr">Highest APR</option>
                <option value="lowest-risk">Lowest Risk</option>
                <option value="newest-first">Newest First</option>
                <option value="most-popular">Most Popular</option>
              </select>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-global-teal text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon name="list" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-global-teal text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon name="grid" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <section className="bg-gray-50 py-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                <select 
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum APR (%)</label>
                <input 
                  type="number"
                  value={filterMinApr}
                  onChange={(e) => setFilterMinApr(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="50"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal"
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setFilterRisk('all');
                    setFilterMinApr(0);
                    setSearchTerm('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Assets Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-poppins font-bold text-charcoal mb-2">{categoryData.title}</h2>
              <p className="text-gray-600">{categoryData.description}</p>
            </div>
            <button 
              onClick={() => {
                if (activeCategory === 'all') {
                  // If already viewing all assets, show a message or redirect to a full catalog page
                  alert('You are already viewing all available assets! For the complete catalog with all 526 assets, please contact our investment team.');
                } else {
                  // Switch to all assets view
                  setActiveCategory('all');
                }
              }}
              className="text-global-teal hover:text-edge-purple font-medium"
            >
              View All {categoryData.title.replace(' Assets', 's')}
              <Icon name="arrow-right" className="ml-2" />
            </button>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.assets.map((asset, index) => (
                <div key={asset.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative">
                    <Image 
                      className="w-full h-48 object-cover" 
                      src={asset.image || "https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png"} 
                      alt={`${asset.name} asset`}
                      width={400}
                      height={192}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">ACTIVE</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                        <Icon name="location-dot" className="text-blue-600 mr-1" />
                        {asset.route}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-poppins font-semibold text-charcoal">{asset.name}</h3>
                      <span className="text-2xl font-bold text-global-teal">{asset.apr}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{asset.cargo} • {asset.type} • {asset.route}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Asset Value</p>
                        <p className="font-semibold text-charcoal">{asset.value}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Risk Level</p>
                        <p className="font-semibold text-charcoal">{asset.risk}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-semibold text-charcoal capitalize">{asset.type}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div className="bg-gradient-to-r from-global-teal to-aqua-start h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="shield" className="text-green-600" />
                        <span className="text-xs text-gray-600">Oracle Verified</span>
                      </div>
                      <button 
                        onClick={() => handleViewAsset(asset)}
                        className="bg-global-teal text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {categoryData.assets.map((asset, index) => (
                <div key={asset.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="flex">
                    <div className="relative w-48 h-32 flex-shrink-0">
                      <Image 
                        className="w-full h-full object-cover" 
                        src={asset.image || "https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png"} 
                        alt={`${asset.name} asset`}
                        width={192}
                        height={128}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">ACTIVE</span>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">{asset.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{asset.cargo} • {asset.type} • {asset.route}</p>
                          <div className="flex items-center space-x-2">
                            <Icon name="location-dot" className="text-blue-600" />
                            <span className="text-sm text-gray-600">{asset.route}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-global-teal">{asset.apr}%</span>
                          <p className="text-sm text-gray-500">APR</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Asset Value</p>
                          <p className="font-semibold text-charcoal">{asset.value}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Risk Level</p>
                          <p className="font-semibold text-charcoal">{asset.risk}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Type</p>
                          <p className="font-semibold text-charcoal capitalize">{asset.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Progress</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-gradient-to-r from-global-teal to-aqua-start h-2 rounded-full" style={{width: '87%'}}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon name="shield" className="text-green-600" />
                          <span className="text-xs text-gray-600">Oracle Verified</span>
                        </div>
                        <button 
                          onClick={() => handleViewAsset(asset)}
                          className="bg-global-teal text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other Categories Preview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8 text-center">Explore Other Asset Categories</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Property Category */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Icon name="building" className="text-green-600" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4">Property</h3>
              <p className="text-gray-600 mb-6">Commercial and residential real estate with rental income streams and long-term appreciation potential.</p>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Available Assets</p>
                  <p className="text-xl font-bold text-green-600">89</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. APR</p>
                  <p className="text-xl font-bold text-green-600">6-12%</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveCategory('property')}
                className="w-full bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                Browse Properties
              </button>
            </div>

            {/* TradeTokens Category */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Icon name="boxes" className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4">TradeTokens</h3>
              <p className="text-gray-600 mb-6">Tokenized trade inventory with short-term returns from global supply chain movements and commodity trading.</p>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Available Assets</p>
                  <p className="text-xl font-bold text-purple-600">156</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. APR</p>
                  <p className="text-xl font-bold text-purple-600">10-18%</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveCategory('tradetokens')}
                className="w-full bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Browse TradeTokens
              </button>
            </div>

            {/* Vault Category */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <Icon name="vault" className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4">Vault</h3>
              <p className="text-gray-600 mb-6">Secure storage for precious metals, gems, and high-value assets with insurance-backed protection and stable returns.</p>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Available Assets</p>
                  <p className="text-xl font-bold text-orange-600">34</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. APR</p>
                  <p className="text-xl font-bold text-orange-600">4-8%</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveCategory('vault')}
                className="w-full bg-orange-600 text-white py-3 rounded-full font-medium hover:bg-orange-700 transition-colors"
              >
                Browse Vault Assets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-global-teal to-edge-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of investors earning returns from tokenized real-world assets
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => {
                // Redirect to registration page for verification
                window.location.href = '/register';
              }}
              className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Start Verification
            </button>
            <button 
              onClick={() => setActiveCategory('all')}
              className="border-2 border-edge-purple text-edge-purple px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-edge-purple hover:text-white transition-colors"
            >
              View All Assets
            </button>
          </div>
        </div>
      </section>

      {/* Asset Details Modal */}
      {showAssetModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Asset Details</h3>
              <button
                onClick={() => setShowAssetModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
                  <Icon name="ship" className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-charcoal">{selectedAsset.name}</h4>
                  <p className="text-gray-600 capitalize">{selectedAsset.type}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">APR</label>
                  <p className="text-charcoal font-semibold">{selectedAsset.apr}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                  <p className="text-charcoal font-semibold">{selectedAsset.risk}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asset Value</label>
                  <p className="text-charcoal font-semibold">{selectedAsset.value}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                  <p className="text-charcoal font-semibold">{selectedAsset.route}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cargo Type</label>
                <p className="text-charcoal">{selectedAsset.cargo}</p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowAssetModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    // Redirect to registration for investment
                    window.location.href = '/register';
                  }}
                  className="flex-1 bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Start Investment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}