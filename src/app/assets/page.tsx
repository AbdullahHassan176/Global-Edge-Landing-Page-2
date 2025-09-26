'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
  const [filterIssuer, setFilterIssuer] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [savedFilters, setSavedFilters] = useState<any[]>([]);
  const [showQuickCompare, setShowQuickCompare] = useState(false);
  const [compareAssets, setCompareAssets] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load assets on component mount
  useEffect(() => {
    loadAssets();
    loadSavedFilters();
  }, []);

  // Handle URL query parameters for category selection
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && ['containers', 'property', 'tradetokens', 'vault', 'all'].includes(category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 2) {
      const suggestions = assets
        .filter(asset => 
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.cargo.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(asset => asset.name)
        .slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, assets]);

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

  const loadSavedFilters = () => {
    const saved = localStorage.getItem('savedFilters');
    if (saved) {
      setSavedFilters(JSON.parse(saved));
    }
  };

  const saveCurrentFilters = () => {
    const currentFilters = {
      id: Date.now().toString(),
      name: `Filter ${savedFilters.length + 1}`,
      filters: {
        category: activeCategory,
        risk: filterRisk,
        minApr: filterMinApr,
        issuer: filterIssuer,
        location: filterLocation,
        searchTerm
      }
    };
    const updated = [...savedFilters, currentFilters];
    setSavedFilters(updated);
    localStorage.setItem('savedFilters', JSON.stringify(updated));
  };

  const applySavedFilter = (filter: any) => {
    setActiveCategory(filter.filters.category);
    setFilterRisk(filter.filters.risk);
    setFilterMinApr(filter.filters.minApr);
    setFilterIssuer(filter.filters.issuer);
    setFilterLocation(filter.filters.location);
    setSearchTerm(filter.filters.searchTerm);
  };

  const toggleCompareAsset = (assetId: string) => {
    if (compareAssets.includes(assetId)) {
      setCompareAssets(compareAssets.filter(id => id !== assetId));
    } else if (compareAssets.length < 3) {
      setCompareAssets([...compareAssets, assetId]);
    }
  };

  const getAprBadgeColor = (apr: string) => {
    const aprNum = parseFloat(apr);
    if (aprNum >= 15) return 'bg-red-100 text-red-800 border-red-200';
    if (aprNum >= 10) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (aprNum >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'container': return 'ship';
      case 'property': return 'building';
      case 'inventory': return 'boxes';
      case 'vault': return 'vault';
      default: return 'cube';
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'container': return 'blue';
      case 'property': return 'green';
      case 'inventory': return 'purple';
      case 'vault': return 'orange';
      default: return 'gray';
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

      // Issuer filter (mock implementation)
      if (filterIssuer !== 'all') {
        // Mock issuer filtering - in real implementation, this would filter by actual issuer
        const mockIssuers = ['GlobalEdge', 'MaritimeCorp', 'PropertyGroup', 'TradeHub'];
        const assetIssuer = mockIssuers[Math.floor(Math.random() * mockIssuers.length)];
        if (assetIssuer !== filterIssuer) return false;
      }

      // Location filter
      if (filterLocation !== 'all') {
        const locationLower = filterLocation.toLowerCase();
        if (!asset.route.toLowerCase().includes(locationLower)) return false;
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
  }, [loading, assets, activeCategory, searchTerm, sortBy, filterRisk, filterMinApr, filterIssuer, filterLocation]);

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
      {/* Enhanced Header with Breadcrumbs */}
      <section className="bg-gradient-to-r from-global-teal to-edge-purple h-[500px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl text-white">
            {/* Breadcrumbs */}
            <nav className="flex items-center mb-6 text-sm">
              <Link href="/" className="hover:opacity-80 transition-opacity">Home</Link>
              <Icon name="chevron-right" className="mx-3 text-sm opacity-60 w-4 h-4" />
              <span className="opacity-80">Assets</span>
              <Icon name="chevron-right" className="mx-3 text-sm opacity-60 w-4 h-4" />
              <span className="font-medium">{categoryData.title}</span>
            </nav>
            
            <h1 className="text-4xl lg:text-6xl font-poppins font-bold mb-6 leading-tight">
              Discover Tokenized Assets
            </h1>
            <p className="text-xl lg:text-2xl font-inter font-light opacity-90 max-w-3xl mb-8">
              Invest in verified real-world assets with transparent blockchain tracking, competitive returns, and institutional-grade security.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{assets.length}</div>
                <div className="text-sm opacity-80">Total Assets</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">8.5%</div>
                <div className="text-sm opacity-80">Avg. APR</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">$2.4M</div>
                <div className="text-sm opacity-80">Total Value</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm opacity-80">Active Investors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Category Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
          <div className="flex space-x-8 overflow-x-auto">
              {[
                { key: 'containers', label: 'Containers', icon: 'ship', color: 'blue', count: assets.filter(a => a.type === 'container').length },
                { key: 'property', label: 'Property', icon: 'building', color: 'green', count: assets.filter(a => a.type === 'property').length },
                { key: 'tradetokens', label: 'TradeTokens', icon: 'boxes', color: 'purple', count: assets.filter(a => a.type === 'inventory').length },
                { key: 'vault', label: 'Vault', icon: 'vault', color: 'orange', count: assets.filter(a => a.type === 'vault').length },
                { key: 'all', label: 'All Assets', icon: 'layer-group', color: 'gray', count: assets.length }
              ].map((category) => (
            <button 
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`flex items-center space-x-3 py-3 px-4 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                    activeCategory === category.key 
                      ? `bg-${category.color}-50 text-${category.color}-700 border-2 border-${category.color}-200` 
                      : 'text-gray-600 hover:text-global-teal hover:bg-gray-50'
                  }`}
                >
                  <Icon name={category.icon} className="w-5 h-5" />
                  <span>{category.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    activeCategory === category.key 
                      ? `bg-${category.color}-100 text-${category.color}-700` 
                  : 'bg-gray-100 text-gray-600'
                  }`}>{category.count}</span>
            </button>
              ))}
            </div>
            
            {/* Quick Compare Toggle */}
            <div className="flex items-center space-x-4">
            <button 
                onClick={() => setShowQuickCompare(!showQuickCompare)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showQuickCompare 
                    ? 'bg-global-teal text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name="balance-scale" className="w-4 h-4" />
                <span>Compare</span>
                {compareAssets.length > 0 && (
                  <span className="bg-white text-global-teal rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {compareAssets.length}
                  </span>
                )}
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search and Filter Bar */}
      <section className="bg-white py-6 border-b border-gray-100 sticky top-32 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              {/* Enhanced Search with Autocomplete */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={`Search ${activeCategory} by name, route, cargo...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className="pl-10 pr-4 py-3 w-80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent transition-all" 
                />
                <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                
                {/* Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 mt-1">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <Icon name="search" className="inline w-4 h-4 mr-2 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
              </div>
                )}
              </div>
              
              {/* Enhanced Filter Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-6 py-3 border rounded-xl transition-all duration-200 ${
                  showFilters 
                    ? 'border-global-teal bg-global-teal text-white shadow-lg' 
                    : 'border-gray-300 hover:border-global-teal hover:shadow-md'
                }`}
              >
                <Icon name="filter" className={`w-5 h-5 ${showFilters ? "text-white" : "text-gray-600"}`} />
                <span className={`font-medium ${showFilters ? 'text-white' : 'text-gray-700'}`}>Filters</span>
                {(filterRisk !== 'all' || filterMinApr > 0 || filterIssuer !== 'all' || filterLocation !== 'all') && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
              
              {/* Saved Filters */}
              {savedFilters.length > 0 && (
                <div className="relative">
                  <select 
                    onChange={(e) => {
                      const filter = savedFilters.find(f => f.id === e.target.value);
                      if (filter) applySavedFilter(filter);
                    }}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-global-teal bg-white"
                    defaultValue=""
                  >
                    <option value="">Saved Filters</option>
                    {savedFilters.map(filter => (
                      <option key={filter.id} value={filter.id}>{filter.name}</option>
                    ))}
                  </select>
            </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-global-teal bg-white"
              >
                <option value="highest-apr">Highest APR</option>
                <option value="lowest-risk">Lowest Risk</option>
                <option value="newest-first">Newest First</option>
                <option value="most-popular">Most Popular</option>
              </select>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white text-global-teal shadow-sm' : 'text-gray-600 hover:text-global-teal'
                  }`}
                >
                  <Icon name="grid" className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-white text-global-teal shadow-sm' : 'text-gray-600 hover:text-global-teal'
                  }`}
                >
                  <Icon name="list" className="w-5 h-5" />
                </button>
              </div>
              
              {/* Save Current Filters */}
              <button
                onClick={saveCurrentFilters}
                className="flex items-center space-x-2 px-4 py-3 text-global-teal hover:bg-global-teal hover:text-white rounded-xl transition-all duration-200"
              >
                <Icon name="bookmark" className="w-4 h-4" />
                <span className="text-sm font-medium">Save Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters Panel */}
      {showFilters && (
        <section className="bg-gray-50 py-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Risk Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Risk Level</label>
                <select 
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-global-teal bg-white"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
              
              {/* APR Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Minimum APR (%)</label>
                <input 
                  type="number"
                  value={filterMinApr}
                  onChange={(e) => setFilterMinApr(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="50"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-global-teal bg-white"
                  placeholder="0.0"
                />
              </div>
              
              {/* Issuer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Issuer</label>
                <select 
                  value={filterIssuer}
                  onChange={(e) => setFilterIssuer(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-global-teal bg-white"
                >
                  <option value="all">All Issuers</option>
                  <option value="GlobalEdge">GlobalEdge</option>
                  <option value="MaritimeCorp">MaritimeCorp</option>
                  <option value="PropertyGroup">PropertyGroup</option>
                  <option value="TradeHub">TradeHub</option>
                </select>
              </div>
              
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <select 
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-global-teal bg-white"
                >
                  <option value="all">All Locations</option>
                  <option value="hamburg">Hamburg</option>
                  <option value="rotterdam">Rotterdam</option>
                  <option value="singapore">Singapore</option>
                  <option value="new york">New York</option>
                </select>
              </div>
              
              {/* Filter Actions */}
              <div className="flex flex-col justify-end space-y-3">
                <button 
                  onClick={() => {
                    setFilterRisk('all');
                    setFilterMinApr(0);
                    setFilterIssuer('all');
                    setFilterLocation('all');
                    setSearchTerm('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  Clear All
                </button>
                <button 
                  onClick={saveCurrentFilters}
                  className="w-full bg-global-teal text-white px-4 py-3 rounded-xl hover:bg-global-teal-dark transition-colors font-medium"
                >
                  Save Filters
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Assets Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-2">{categoryData.title}</h2>
              <p className="text-gray-600 text-lg">{categoryData.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-sm text-gray-500">
                  {categoryData.count} assets found
                </span>
                {showQuickCompare && (
                  <span className="text-sm text-global-teal font-medium">
                    {compareAssets.length} selected for comparison
                  </span>
                )}
            </div>
            </div>
            <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                if (activeCategory === 'all') {
                  alert('You are already viewing all available assets! For the complete catalog with all 526 assets, please contact our investment team.');
                } else {
                  setActiveCategory('all');
                }
              }}
                className="text-global-teal hover:text-edge-purple font-medium flex items-center space-x-2"
            >
                <span>View All {categoryData.title === 'All Assets' ? 'Assets' : categoryData.title.replace(' Assets', 's')}</span>
                <Icon name="arrow-right" className="w-4 h-4" />
            </button>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.assets.map((asset, index) => (
                <div key={asset.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <Image 
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
                      src={asset.image || "https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png"} 
                      alt={`${asset.name} asset`}
                      width={400}
                      height={224}
                    />
                    
                    {/* Status Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
                        ACTIVE
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                        <Icon name="shield-check" className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    </div>
                    
                    {/* Location Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white bg-opacity-95 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-semibold text-gray-700 border border-gray-200">
                        <Icon name="location-dot" className="text-blue-600 mr-1 w-3 h-3" />
                        {asset.route}
                      </span>
                    </div>
                    
                    {/* Compare Toggle */}
                    {showQuickCompare && (
                      <div className="absolute top-4 right-4 mt-12">
                        <button
                          onClick={() => toggleCompareAsset(asset.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            compareAssets.includes(asset.id)
                              ? 'bg-global-teal text-white shadow-lg'
                              : 'bg-white bg-opacity-90 text-gray-600 hover:bg-global-teal hover:text-white'
                          }`}
                        >
                          <Icon name={compareAssets.includes(asset.id) ? "check" : "plus"} className="w-4 h-4" />
                        </button>
                  </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    {/* Header with APR Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-poppins font-bold text-charcoal mb-2">{asset.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{asset.cargo} • {asset.type}</p>
                    </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getAprBadgeColor(asset.apr)}`}>
                          {asset.apr}% APR
                        </span>
                      </div>
                      </div>
                    
                    {/* Asset Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Asset Value</p>
                        <p className="font-bold text-charcoal text-lg">{asset.value}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Risk Level</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getRiskBadgeColor(asset.risk)}`}>
                          {asset.risk}
                        </span>
                    </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Funding Progress</span>
                        <span>87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-global-teal to-edge-purple h-3 rounded-full transition-all duration-500" style={{width: '87%'}}></div>
                      </div>
                    </div>
                    
                    {/* Trust Indicators */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="shield-check" className="text-green-600 w-4 h-4" />
                        <span className="text-xs text-gray-600">Oracle Verified</span>
                      </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="link" className="text-blue-600 w-4 h-4" />
                          <span className="text-xs text-gray-600">On-chain</span>
                        </div>
                        {asset.type === 'vault' && (
                          <div className="flex items-center space-x-1">
                            <Icon name="shield" className="text-orange-600 w-4 h-4" />
                            <span className="text-xs text-gray-600">Insured</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Dynamic Stats */}
                    <div className="bg-gradient-to-r from-global-teal to-edge-purple rounded-xl p-4 mb-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Investors</p>
                          <p className="text-2xl font-bold">{Math.floor(Math.random() * 50) + 10}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">ROI History</p>
                          <p className="text-2xl font-bold">+{Math.floor(Math.random() * 15) + 5}%</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleViewAsset(asset)}
                        className="flex-1 bg-global-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-global-teal-dark transition-all duration-200 hover:shadow-lg"
                      >
                        Invest Now
                      </button>
                      <button 
                        onClick={() => handleViewAsset(asset)}
                        className="flex-1 border-2 border-global-teal text-global-teal px-6 py-3 rounded-xl font-semibold hover:bg-global-teal hover:text-white transition-all duration-200"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {categoryData.assets.map((asset, index) => (
                <div key={asset.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="flex">
                    <div className="relative w-64 h-40 flex-shrink-0">
                      <Image 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        src={asset.image || "https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png"} 
                        alt={`${asset.name} asset`}
                        width={256}
                        height={160}
                      />
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">ACTIVE</span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                          <Icon name="shield-check" className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      </div>
                      {showQuickCompare && (
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => toggleCompareAsset(asset.id)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                              compareAssets.includes(asset.id)
                                ? 'bg-global-teal text-white shadow-lg'
                                : 'bg-white bg-opacity-90 text-gray-600 hover:bg-global-teal hover:text-white'
                            }`}
                          >
                            <Icon name={compareAssets.includes(asset.id) ? "check" : "plus"} className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-poppins font-bold text-charcoal mb-2">{asset.name}</h3>
                          <p className="text-gray-600 mb-3">{asset.cargo} • {asset.type} • {asset.route}</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Icon name="location-dot" className="text-blue-600 w-4 h-4" />
                            <span className="text-sm text-gray-600">{asset.route}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="shield-check" className="text-green-600 w-4 h-4" />
                              <span className="text-sm text-gray-600">Oracle Verified</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="link" className="text-blue-600 w-4 h-4" />
                              <span className="text-sm text-gray-600">On-chain</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold border ${getAprBadgeColor(asset.apr)}`}>
                            {asset.apr}% APR
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Asset Value</p>
                          <p className="font-bold text-charcoal text-lg">{asset.value}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Risk Level</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getRiskBadgeColor(asset.risk)}`}>
                            {asset.risk}
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Investors</p>
                          <p className="font-bold text-charcoal text-lg">{Math.floor(Math.random() * 50) + 10}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">ROI History</p>
                          <p className="font-bold text-green-600 text-lg">+{Math.floor(Math.random() * 15) + 5}%</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Progress</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-gradient-to-r from-global-teal to-edge-purple h-2 rounded-full transition-all duration-500" style={{width: '87%'}}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Icon name="shield-check" className="text-green-600 w-5 h-5" />
                            <span className="text-sm text-gray-600 font-medium">Oracle Verified</span>
                        </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="link" className="text-blue-600 w-5 h-5" />
                            <span className="text-sm text-gray-600 font-medium">Blockchain Tracked</span>
                          </div>
                          {asset.type === 'vault' && (
                            <div className="flex items-center space-x-2">
                              <Icon name="shield" className="text-orange-600 w-5 h-5" />
                              <span className="text-sm text-gray-600 font-medium">Insured</span>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-3">
                        <button 
                          onClick={() => handleViewAsset(asset)}
                            className="bg-global-teal text-white px-8 py-3 rounded-xl font-semibold hover:bg-global-teal-dark transition-all duration-200 hover:shadow-lg"
                          >
                            Invest Now
                          </button>
                          <button 
                            onClick={() => handleViewAsset(asset)}
                            className="border-2 border-global-teal text-global-teal px-8 py-3 rounded-xl font-semibold hover:bg-global-teal hover:text-white transition-all duration-200"
                          >
                            Learn More
                        </button>
                        </div>
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
                Browse Property
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