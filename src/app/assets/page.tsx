'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AssetsPage() {
  return (
    <>
      {/* Asset Category Hero */}
      <section className="bg-gradient-to-r from-global-teal to-edge-purple h-[400px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center mb-4">
              <span className="text-lg font-inter font-light opacity-80">Assets</span>
              <FontAwesomeIcon icon="chevron-right" className="mx-3 text-sm opacity-60" />
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
            <button className="flex items-center space-x-3 py-4 px-2 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
              <FontAwesomeIcon icon="ship" className="text-lg" />
              <span>Containers</span>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">247</span>
            </button>
            <button className="flex items-center space-x-3 py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-global-teal font-medium whitespace-nowrap">
              <FontAwesomeIcon icon="building" className="text-lg" />
              <span>Property</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">89</span>
            </button>
            <button className="flex items-center space-x-3 py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-global-teal font-medium whitespace-nowrap">
              <FontAwesomeIcon icon="boxes-stacked" className="text-lg" />
              <span>TradeTokens</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">156</span>
            </button>
            <button className="flex items-center space-x-3 py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-global-teal font-medium whitespace-nowrap">
              <FontAwesomeIcon icon="vault" className="text-lg" />
              <span>Vault</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">34</span>
            </button>
            <button className="flex items-center space-x-3 py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-global-teal font-medium whitespace-nowrap">
              <FontAwesomeIcon icon="layer-group" className="text-lg" />
              <span>All Assets</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">526</span>
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
                <input type="text" placeholder="Search containers by route, cargo type..." className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-global-teal focus:border-transparent" />
                <FontAwesomeIcon icon="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:border-global-teal transition-colors">
                <FontAwesomeIcon icon="filter" className="text-gray-600" />
                <span className="text-gray-700 font-medium">Filters</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal">
                <option>Highest APR</option>
                <option>Lowest Risk</option>
                <option>Shortest Tenor</option>
                <option>Most Funded</option>
                <option>Newest</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button className="p-2 bg-gray-50 border-r">
                  <FontAwesomeIcon icon="list" className="text-gray-600" />
                </button>
                <button className="p-2 bg-white">
                  <FontAwesomeIcon icon="th-large" className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Container Assets Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-poppins font-bold text-charcoal mb-2">Container Assets</h2>
              <p className="text-gray-600">247 shipping containers available for investment</p>
            </div>
            <button className="text-global-teal hover:text-edge-purple font-medium">
              View All Containers
              <FontAwesomeIcon icon="arrow-right" className="ml-2" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Container Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative">
                <img className="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png" alt="blue shipping container at port with cranes and ocean view, logistics photography" />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">ACTIVE</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                    <FontAwesomeIcon icon="map-marker-alt" className="text-blue-600 mr-1" />
                    Shanghai → LA
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-poppins font-semibold text-charcoal">CONT-SH-LA-2024-001</h3>
                  <span className="text-2xl font-bold text-global-teal">14.2%</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Electronics & consumer goods • 20ft container • 18-day transit</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Min Investment</p>
                    <p className="font-semibold text-charcoal">$500</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tenor</p>
                    <p className="font-semibold text-charcoal">45 days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Funded</p>
                    <p className="font-semibold text-green-600">87%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-global-teal to-aqua-start h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon="shield" className="text-green-600" />
                    <span className="text-xs text-gray-600">Oracle Verified</span>
                  </div>
                  <button className="bg-global-teal text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Container Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative">
                <img className="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/afa5ad5529-4fd3aa10bb7521ec6eb3.png" alt="red shipping container being loaded at port terminal, industrial cranes, maritime logistics" />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">LOADING</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                    <FontAwesomeIcon icon="map-marker-alt" className="text-blue-600 mr-1" />
                    Hamburg → NYC
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-poppins font-semibold text-charcoal">CONT-HB-NYC-2024-002</h3>
                  <span className="text-2xl font-bold text-global-teal">12.8%</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Automotive parts • 40ft container • 22-day transit</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Min Investment</p>
                    <p className="font-semibold text-charcoal">$1,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tenor</p>
                    <p className="font-semibold text-charcoal">52 days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Funded</p>
                    <p className="font-semibold text-orange-600">34%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-global-teal to-aqua-start h-2 rounded-full" style={{width: '34%'}}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon="shield" className="text-green-600" />
                    <span className="text-xs text-gray-600">Oracle Verified</span>
                  </div>
                  <button className="bg-global-teal text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Container Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative">
                <img className="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4664c96e45-09d049caf1f951ac1baa.png" alt="green shipping container at modern port with sunset, cargo ship in background, professional logistics photo" />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">PENDING</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                    <FontAwesomeIcon icon="map-marker-alt" className="text-blue-600 mr-1" />
                    Singapore → Rotterdam
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-poppins font-semibold text-charcoal">CONT-SG-RTM-2024-003</h3>
                  <span className="text-2xl font-bold text-global-teal">16.5%</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Textiles & apparel • 20ft container • 28-day transit</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Min Investment</p>
                    <p className="font-semibold text-charcoal">$750</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tenor</p>
                    <p className="font-semibold text-charcoal">62 days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Funded</p>
                    <p className="font-semibold text-red-600">12%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-global-teal to-aqua-start h-2 rounded-full" style={{width: '12%'}}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon="shield" className="text-green-600" />
                    <span className="text-xs text-gray-600">Oracle Verified</span>
                  </div>
                  <button className="bg-global-teal text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
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
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <FontAwesomeIcon icon="building" className="text-green-600 text-2xl" />
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
              <button className="w-full bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
                Browse Properties
              </button>
            </div>

            {/* TradeTokens Category */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <FontAwesomeIcon icon="boxes-stacked" className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4">TradeTokens</h3>
              <p className="text-gray-600 mb-6">Commodity inventory tokens backed by verified supply chain data and transparent pricing mechanisms.</p>
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
              <button className="w-full bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition-colors">
                Browse TradeTokens
              </button>
            </div>

            {/* Vault Category */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <FontAwesomeIcon icon="vault" className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4">Vault</h3>
              <p className="text-gray-600 mb-6">Precious metals and secure storage assets with insurance coverage and institutional-grade custody.</p>
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
              <button className="w-full bg-orange-600 text-white py-3 rounded-full font-medium hover:bg-orange-700 transition-colors">
                Browse Vault Assets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-global-teal to-edge-purple rounded-3xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-poppins font-bold mb-2">526</div>
                <div className="text-sm opacity-80">Total Assets</div>
              </div>
              <div>
                <div className="text-3xl font-poppins font-bold mb-2">$2.4B</div>
                <div className="text-sm opacity-80">Total Value</div>
              </div>
              <div>
                <div className="text-3xl font-poppins font-bold mb-2">98.7%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-poppins font-bold mb-2">12.4%</div>
                <div className="text-sm opacity-80">Avg. Returns</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-poppins font-bold text-charcoal mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of investors earning returns from tokenized real-world assets
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
              Start Verification
            </button>
            <button className="border-2 border-edge-purple text-edge-purple px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-edge-purple hover:text-white transition-colors">
              View All Assets
            </button>
          </div>
        </div>
      </section>
    </>
  );
}