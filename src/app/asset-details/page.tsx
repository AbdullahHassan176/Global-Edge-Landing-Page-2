'use client';

import Icon from '@/components/ui/Icon';
import { useEffect, useState } from 'react';

export default function AssetDetailsPage() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">Container Asset</span>
                <span className="bg-green-500 bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-6">Shanghai-Los Angeles Container</h1>
              <p className="text-xl opacity-90 mb-8">High-performance shipping container on the Asia-Pacific trade route with consistent returns and low volatility.</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm opacity-75 mb-1">Current Value</p>
                  <p className="text-3xl font-bold">$45,000</p>
                </div>
                <div>
                  <p className="text-sm opacity-75 mb-1">Annual Return</p>
                  <p className="text-3xl font-bold text-green-300">12.5%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/737a82cfea-8505609552f3f2bb8533.png" 
                alt="Container Asset" 
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="opacity-75">Route</span>
                  <span className="font-semibold">Shanghai → Los Angeles</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Cargo Type</span>
                  <span className="font-semibold">Electronics & Textiles</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Risk Level</span>
                  <span className="font-semibold text-green-300">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Oracle Verified</span>
                  <span className="font-semibold text-green-300">✓ Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="py-16 bg-soft-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-poppins font-bold text-charcoal mb-8">Performance Overview</h2>
            
            {chartData && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Return</p>
                    <p className="text-2xl font-bold text-green-600">+$5,400</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Monthly Return</p>
                    <p className="text-2xl font-bold text-green-600">+1.04%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Volatility</p>
                    <p className="text-2xl font-bold text-blue-600">8.2%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Sharpe Ratio</p>
                    <p className="text-2xl font-bold text-purple-600">1.52</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-charcoal mb-4">Value Progression</h3>
                  <div className="h-64 bg-white rounded-lg p-4 flex items-end justify-between">
                    {chartData.data.map((value: number, index: number) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-gradient-to-t from-global-teal to-edge-purple rounded-t w-8 mb-2"
                          style={{ height: `${(value / Math.max(...chartData.data)) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-600">{chartData.categories[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Investment Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-poppins font-bold text-charcoal mb-6">Investment Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-3">Asset Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Container ID</p>
                        <p className="font-semibold">CONT-7842-SH</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Manufacturer</p>
                        <p className="font-semibold">CIMC Container</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Size</p>
                        <p className="font-semibold">40ft High Cube</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Year Built</p>
                        <p className="font-semibold">2023</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-3">Route Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Origin</span>
                        <span>Shanghai, China</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Destination</span>
                        <span>Los Angeles, USA</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Distance</span>
                        <span>6,500 nautical miles</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Transit Time</span>
                        <span>14-16 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-3">Financial Metrics</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Purchase Price</p>
                        <p className="font-semibold">$45,000</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Current Value</p>
                        <p className="font-semibold">$45,000</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Annual Return</p>
                        <p className="font-semibold text-green-600">12.5%</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                        <p className="font-semibold">Medium</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-poppins font-bold text-charcoal mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button className="w-full bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    Invest Now
                  </button>
                  <button className="w-full border-2 border-global-teal text-global-teal py-3 rounded-lg font-semibold hover:bg-global-teal hover:text-white transition-colors">
                    Add to Watchlist
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-poppins font-bold text-charcoal mb-6">Risk Assessment</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Market Risk</span>
                      <span className="text-sm text-gray-600">Medium</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Operational Risk</span>
                      <span className="text-sm text-gray-600">Low</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Currency Risk</span>
                      <span className="text-sm text-gray-600">Low</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
