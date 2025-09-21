'use client';

import Icon from '@/components/ui/Icon';
import { useEffect, useState } from 'react';

export default function AssetDetailsPage({ params }: { params: { id: string } }) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Simulate chart data loading
    setChartData({
      categories: ['Dec 1', 'Dec 5', 'Dec 10', 'Dec 15', 'Dec 20', 'Today'],
      data: [125000, 126200, 127800, 129500, 131200, 132400]
    });
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500 hover:text-global-teal cursor-pointer">Assets</span>
            <Icon name="chevron-right" className="text-gray-400 text-xs"  />
            <span className="text-gray-500 hover:text-global-teal cursor-pointer">Containers</span>
            <Icon name="chevron-right" className="text-gray-400 text-xs"  />
            <span className="text-charcoal font-medium">CONT-7842-SH</span>
          </nav>
        </div>
      </div>

      {/* Asset Header */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start space-x-6 mb-6 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <Icon name="ship" className="text-blue-600 text-lg"  />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-poppins font-bold text-charcoal">CONT-7842-SH</h1>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Active
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <Icon name="shield" className="mr-1"  />
                    Verified
                  </div>
                </div>
                <p className="text-gray-600 mb-2">40ft High Cube Container • Shanghai to Rotterdam</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Icon name="calendar" className="mr-1"  />
                    Issued: Dec 15, 2024
                  </span>
                  <span className="flex items-center">
                    <Icon name="location-dot" className="mr-1"  />
                    Currently: Port of Hamburg
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors">
                <Icon name="heart" className="mr-2"  />
                Watchlist
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors">
                <Icon name="share" className="mr-2"  />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-global-teal mb-1">14.2%</div>
              <div className="text-sm text-gray-600">Target APR</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-charcoal mb-1">45 days</div>
              <div className="text-sm text-gray-600">Tenor</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-charcoal mb-1">$50</div>
              <div className="text-sm text-gray-600">Min. Investment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-charcoal mb-1">$125K</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-green-600 mb-1">87%</div>
              <div className="text-sm text-gray-600">Funded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-charcoal mb-1">23</div>
              <div className="text-sm text-gray-600">Investors</div>
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
                  <button className="pb-4 text-global-teal border-b-2 border-global-teal font-medium text-sm">
                    Overview
                  </button>
                  <button className="pb-4 text-gray-500 font-medium text-sm hover:text-charcoal">
                    Documents
                  </button>
                  <button className="pb-4 text-gray-500 font-medium text-sm hover:text-charcoal">
                    Provenance
                  </button>
                  <button className="pb-4 text-gray-500 font-medium text-sm hover:text-charcoal">
                    Risks
                  </button>
                  <button className="pb-4 text-gray-500 font-medium text-sm hover:text-charcoal">
                    FAQs
                  </button>
                </nav>
              </div>

              <div className="p-8">
                {/* Asset Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Asset Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This 40-foot high cube shipping container is currently transporting premium electronics from Shanghai to Rotterdam. The container features GPS tracking, temperature monitoring, and tamper-proof sealing systems to ensure cargo integrity throughout the journey.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The cargo consists of consumer electronics valued at $125,000, with confirmed purchase orders from European distributors. Expected delivery is within 45 days, generating returns through freight fees and cargo appreciation.
                  </p>
                </div>

                {/* Financial Projections */}
                <div className="mb-8">
                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Financial Projections</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid md:grid-cols-2 gap-6">
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
                          <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                            <span className="text-gray-900 font-medium">Total Revenue</span>
                            <span className="text-global-teal font-semibold">$14,700</span>
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
                          <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                            <span className="text-gray-900 font-medium">Net Return</span>
                            <span className="text-green-600 font-semibold">$10,950</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="mb-8">
                  <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Value Tracking</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="chart-line-up" className="text-lg text-gray-400 mb-4"  />
                        <p className="text-gray-600">Chart visualization would be implemented here</p>
                        <p className="text-sm text-gray-500 mt-2">Asset value: $132,400 (+5.9%)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div>
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
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Route Risk</span>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Medium</span>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Operator Risk</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Low</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Insurance</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Covered</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-poppins font-bold text-global-teal mb-2">14.2%</div>
                <div className="text-sm text-gray-600 mb-4">Target APR</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-global-teal to-aqua-start h-3 rounded-full" style={{width: '87%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$108,750 raised</span>
                  <span>87%</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Token Price</span>
                  <span className="text-charcoal font-medium">$1.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min. Investment</span>
                  <span className="text-charcoal font-medium">$50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Remaining</span>
                  <span className="text-charcoal font-medium">32 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Return</span>
                  <span className="text-green-600 font-medium">$1.142</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input type="number" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent" placeholder="50" min="50" />
                </div>
              </div>

              <button className="w-full bg-global-teal text-white py-3 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors mb-4">
                Invest Now
              </button>

              <div className="text-center">
                <button className="text-gray-600 hover:text-global-teal text-sm font-medium">
                  <Icon name="calculator-alt" className="mr-1"  />
                  Calculate Returns
                </button>
              </div>
            </div>

            {/* Provenance Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">
              <h3 className="text-lg font-poppins font-semibold text-charcoal mb-6">Logistics Timeline</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="check" className="text-green-600 text-sm"  />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-charcoal">Manufactured</span>
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="shield" className="text-blue-600 text-xs"  />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Dec 1, 2024 • Shanghai</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="check" className="text-green-600 text-sm"  />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-charcoal">Loaded</span>
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="shield" className="text-blue-600 text-xs"  />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Dec 3, 2024 • Port of Shanghai</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="check" className="text-green-600 text-sm"  />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-charcoal">Departed</span>
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="shield" className="text-blue-600 text-xs"  />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Dec 5, 2024 • Shanghai Port</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="clock" className="text-blue-600 text-sm"  />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-charcoal">In Transit</span>
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="satellite-dish" className="text-blue-600 text-xs"  />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Current • Port of Hamburg</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Icon name="clock" className="text-gray-400 text-sm"  />
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

      {/* Disclosure */}
      <section className="bg-yellow-50 border border-yellow-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-start space-x-3">
            <Icon name="triangle-exclamation" className="text-yellow-600 text-lg mt-1"  />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Important Risk Disclosure</h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                The target APR of 14.2% is a projection based on current market conditions and is not guaranteed. Investments in tokenized assets carry risks including market volatility, liquidity constraints, and potential loss of principal. This asset is subject to shipping delays, weather conditions, and regulatory changes that may affect returns. Please review all risk factors and consult with financial advisors before investing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Assets */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-poppins font-bold text-charcoal">Similar Assets</h2>
            <button className="text-global-teal hover:text-edge-purple font-medium">
              View All Containers
              <Icon name="arrow-right" className="ml-2"  />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="ship" className="text-blue-600"  />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-poppins font-bold text-global-teal">12.8%</div>
                    <div className="text-xs text-gray-500">APR</div>
                  </div>
                </div>
                <h3 className="font-medium text-charcoal mb-2">CONT-7891-RT</h3>
                <p className="text-sm text-gray-600 mb-4">Electronics • Hamburg to New York</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>38 days</span>
                  <span>Min. $100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-global-teal to-aqua-start h-2 rounded-full w-3/4"></div>
                </div>
                <div className="text-xs text-gray-500">75% funded</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="ship" className="text-blue-600"  />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-poppins font-bold text-global-teal">15.6%</div>
                    <div className="text-xs text-gray-500">APR</div>
                  </div>
                </div>
                <h3 className="font-medium text-charcoal mb-2">CONT-8012-AS</h3>
                <p className="text-sm text-gray-600 mb-4">Textiles • Singapore to Los Angeles</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>52 days</span>
                  <span>Min. $75</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-global-teal to-aqua-start h-2 rounded-full w-1/2"></div>
                </div>
                <div className="text-xs text-gray-500">50% funded</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="ship" className="text-blue-600"  />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-poppins font-bold text-global-teal">11.4%</div>
                    <div className="text-xs text-gray-500">APR</div>
                  </div>
                </div>
                <h3 className="font-medium text-charcoal mb-2">CONT-7654-EU</h3>
                <p className="text-sm text-gray-600 mb-4">Machinery • Rotterdam to Miami</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>28 days</span>
                  <span>Min. $200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-global-teal to-aqua-start h-2 rounded-full w-full"></div>
                </div>
                <div className="text-xs text-green-600 font-medium">Fully Funded</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
