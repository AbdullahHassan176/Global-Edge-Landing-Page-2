'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';

export default function AssetsPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('containers');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showAssetModal, setShowAssetModal] = useState(false);

  // Handle URL query parameters for category selection
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && ['containers', 'property', 'tradetokens', 'vault', 'all'].includes(category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // Handler functions
  const handleViewAsset = (asset: any) => {
    setSelectedAsset(asset);
    setShowAssetModal(true);
  };

  const handleEditAsset = (asset: any) => {
    console.log('Edit asset:', asset);
    alert(`Edit functionality for ${asset.name} would be implemented here`);
  };

  // Get category-specific data
  const getCategoryData = () => {
    switch (activeCategory) {
      case 'containers':
        return {
          title: 'Container Assets',
          description: '247 shipping containers available for investment',
          count: 247,
          icon: 'ship',
          color: 'blue',
          assets: [
            {
              id: '1',
              name: 'Jebel Ali-Dubai Container',
              type: 'container',
              apr: '12.5%',
              risk: 'Medium',
              value: '$45,000',
              route: 'Jebel Ali Port → Dubai',
              cargo: 'Electronics & Luxury Goods',
              image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '2',
              name: 'Abu Dhabi-Rotterdam Container',
              type: 'container',
              apr: '11.8%',
              risk: 'Medium',
              value: '$38,000',
              route: 'Abu Dhabi → Rotterdam',
              cargo: 'Petrochemicals & Oil Products',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=192&fit=crop&crop=center'
            }
          ]
        };
      case 'property':
        return {
          title: 'Property Assets',
          description: '89 real estate properties available for investment',
          count: 89,
          icon: 'building',
          color: 'green',
          assets: [
            {
              id: '3',
              name: 'Dubai Marina Office Tower',
              type: 'property',
              apr: '8.2%',
              risk: 'Low',
              value: '$350,000',
              route: 'Dubai Marina, UAE',
              cargo: 'Commercial Real Estate',
              image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '4',
              name: 'Abu Dhabi Corniche Residential',
              type: 'property',
              apr: '9.5%',
              risk: 'Low',
              value: '$280,000',
              route: 'Abu Dhabi Corniche, UAE',
              cargo: 'Residential Real Estate',
              image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=192&fit=crop&crop=center'
            }
          ]
        };
      case 'tradetokens':
        return {
          title: 'TradeToken Assets',
          description: '156 trade inventory tokens available for investment',
          count: 156,
          icon: 'boxes',
          color: 'purple',
          assets: [
            {
              id: '5',
              name: 'Dubai Gold Souk Inventory',
              type: 'inventory',
              apr: '15.1%',
              risk: 'High',
              value: '$25,000',
              route: 'Dubai Gold Souk, UAE',
              cargo: 'Gold & Precious Metals',
              image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '6',
              name: 'Sharjah Textile Market',
              type: 'inventory',
              apr: '13.2%',
              risk: 'Medium',
              value: '$18,000',
              route: 'Sharjah, UAE',
              cargo: 'Traditional Textiles & Fabrics',
              image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=192&fit=crop&crop=center'
            }
          ]
        };
      case 'vault':
        return {
          title: 'Vault Assets',
          description: '34 secure vault storage assets available for investment',
          count: 34,
          icon: 'vault',
          color: 'orange',
          assets: [
            {
              id: '7',
              name: 'Dubai International Vault',
              type: 'vault',
              apr: '6.8%',
              risk: 'Low',
              value: '$20,000',
              route: 'Dubai International Financial Centre',
              cargo: 'Gold & Precious Metals',
              image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '8',
              name: 'Abu Dhabi Diamond Vault',
              type: 'vault',
              apr: '7.5%',
              risk: 'Low',
              value: '$15,000',
              route: 'Abu Dhabi Global Market',
              cargo: 'Diamonds & Precious Stones',
              image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=192&fit=crop&crop=center'
            }
          ]
        };
      case 'all':
        return {
          title: 'All Assets',
          description: '526 total assets available for investment',
          count: 526,
          icon: 'layer-group',
          color: 'gray',
          assets: [
            {
              id: '1',
              name: 'Jebel Ali-Dubai Container',
              type: 'container',
              apr: '12.5%',
              risk: 'Medium',
              value: '$45,000',
              route: 'Jebel Ali Port → Dubai',
              cargo: 'Electronics & Luxury Goods',
              image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '2',
              name: 'Abu Dhabi-Rotterdam Container',
              type: 'container',
              apr: '11.8%',
              risk: 'Medium',
              value: '$38,000',
              route: 'Abu Dhabi → Rotterdam',
              cargo: 'Petrochemicals & Oil Products',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '3',
              name: 'Dubai Marina Office Tower',
              type: 'property',
              apr: '8.2%',
              risk: 'Low',
              value: '$350,000',
              route: 'Dubai Marina, UAE',
              cargo: 'Commercial Real Estate',
              image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '4',
              name: 'Abu Dhabi Corniche Residential',
              type: 'property',
              apr: '9.5%',
              risk: 'Low',
              value: '$280,000',
              route: 'Abu Dhabi Corniche, UAE',
              cargo: 'Residential Real Estate',
              image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '5',
              name: 'Dubai Gold Souk Inventory',
              type: 'inventory',
              apr: '15.1%',
              risk: 'High',
              value: '$25,000',
              route: 'Dubai Gold Souk, UAE',
              cargo: 'Gold & Precious Metals',
              image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '6',
              name: 'Sharjah Textile Market',
              type: 'inventory',
              apr: '13.2%',
              risk: 'Medium',
              value: '$18,000',
              route: 'Sharjah, UAE',
              cargo: 'Traditional Textiles & Fabrics',
              image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '7',
              name: 'Dubai International Vault',
              type: 'vault',
              apr: '6.8%',
              risk: 'Low',
              value: '$20,000',
              route: 'Dubai International Financial Centre',
              cargo: 'Gold & Precious Metals',
              image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '8',
              name: 'Abu Dhabi Diamond Vault',
              type: 'vault',
              apr: '7.5%',
              risk: 'Low',
              value: '$15,000',
              route: 'Abu Dhabi Global Market',
              cargo: 'Diamonds & Precious Stones',
              image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '9',
              name: 'Fujairah Port Container',
              type: 'container',
              apr: '13.8%',
              risk: 'Medium',
              value: '$42,000',
              route: 'Fujairah Port → Singapore',
              cargo: 'Oil & Gas Equipment',
              image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '10',
              name: 'Dubai Industrial City Warehouse',
              type: 'property',
              apr: '7.8%',
              risk: 'Low',
              value: '$420,000',
              route: 'Dubai Industrial City, UAE',
              cargo: 'Industrial Real Estate',
              image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '11',
              name: 'Al Ain Date Palm Inventory',
              type: 'inventory',
              apr: '14.5%',
              risk: 'High',
              value: '$32,000',
              route: 'Al Ain, UAE',
              cargo: 'Premium Dates & Agricultural Products',
              image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=192&fit=crop&crop=center'
            },
            {
              id: '12',
              name: 'Dubai Multi Commodities Centre',
              type: 'vault',
              apr: '6.2%',
              risk: 'Low',
              value: '$12,000',
              route: 'Dubai Multi Commodities Centre',
              cargo: 'Silver & Base Metals',
              image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=192&fit=crop&crop=center'
            }
          ]
        };
      default:
        return {
          title: 'Container Assets',
          description: '247 shipping containers available for investment',
          count: 247,
          icon: 'ship',
          color: 'blue',
          assets: []
        };
    }
  };

  const categoryData = getCategoryData();

  return (
    <>
      {/* Asset Category Hero */}
      <section className="bg-gradient-to-r from-global-teal to-edge-purple h-[400px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center mb-4">
              <span className="text-lg font-inter font-light opacity-80">Assets</span>
              <Icon name="chevron-right" className="mx-3 text-sm opacity-60" size={8} />
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
              <Icon name="ship" className="text-lg" size={12} />
              <span>Containers</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'containers' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>247</span>
            </button>
            <button 
              onClick={() => setActiveCategory('property')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'property' 
                  ? 'border-green-600 text-green-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="building" className="text-lg" size={12} />
              <span>Property</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'property' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>89</span>
            </button>
            <button 
              onClick={() => setActiveCategory('tradetokens')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'tradetokens' 
                  ? 'border-purple-600 text-purple-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="boxes" className="text-lg" size={12} />
              <span>TradeTokens</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'tradetokens' 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>156</span>
            </button>
            <button 
              onClick={() => setActiveCategory('vault')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'vault' 
                  ? 'border-orange-600 text-orange-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="vault" className="text-lg" size={12} />
              <span>Vault</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'vault' 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>34</span>
            </button>
            <button 
              onClick={() => setActiveCategory('all')}
              className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium whitespace-nowrap ${
                activeCategory === 'all' 
                  ? 'border-gray-600 text-gray-600' 
                  : 'border-transparent text-gray-600 hover:text-global-teal'
              }`}
            >
              <Icon name="layer-group" className="text-lg" size={12} />
              <span>All Assets</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                activeCategory === 'all' 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>526</span>
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
                <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={8} />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-full transition-colors ${
                  showFilters 
                    ? 'border-global-teal bg-global-teal text-white' 
                    : 'border-gray-300 hover:border-global-teal'
                }`}
              >
                <Icon name="filter" className={showFilters ? "text-white" : "text-gray-600"} size={12} />
                <span className={`font-medium ${showFilters ? 'text-white' : 'text-gray-700'}`}>Filters</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal">
                <option>Highest APR</option>
                <option>Lowest Risk</option>
                <option>Newest First</option>
                <option>Most Popular</option>
              </select>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-gray-100 rounded-lg">
                  <Icon name="list" className="text-gray-600" size={12} />
                </button>
                <button className="p-2 bg-white">
                  <Icon name="grid" className="text-gray-600" size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Icon name="arrow-right" className="ml-2" size={8} />
            </button>
          </div>
          
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
                      <Icon name="location-dot" className="text-blue-600 mr-1" size={12} />
                      {asset.route}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-poppins font-semibold text-charcoal">{asset.name}</h3>
                    <span className="text-2xl font-bold text-global-teal">{asset.apr}</span>
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
                      <Icon name="shield" className="text-green-600" size={12} />
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
                <Icon name="building" className="text-green-600 text-lg" size={12} />
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
                <Icon name="boxes" className="text-purple-600 text-lg" size={12} />
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
                <Icon name="vault" className="text-orange-600 text-lg" size={12} />
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
                <Icon name="times" className="text-xl" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
                  <Icon name="ship" className="text-white text-2xl" />
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