'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalInvestments: number;
  monthlyRevenue: number;
  conversionRate: number;
  userGrowth: number;
  investmentGrowth: number;
  topAssets: Array<{
    name: string;
    investments: number;
    growth: number;
  }>;
  userRegistrations: Array<{
    date: string;
    count: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
  }>;
}

// Mock analytics data
const mockAnalytics: AnalyticsData = {
  totalUsers: 1247,
  activeUsers: 892,
  totalInvestments: 15420000,
  monthlyRevenue: 125000,
  conversionRate: 23.4,
  userGrowth: 12.5,
  investmentGrowth: 18.7,
  topAssets: [
    { name: 'Shipping Containers', investments: 8500000, growth: 15.2 },
    { name: 'Commercial Real Estate', investments: 4200000, growth: 22.1 },
    { name: 'Precious Metals', investments: 1800000, growth: 8.9 },
    { name: 'Trade Tokens', investments: 920000, growth: 31.4 }
  ],
  userRegistrations: [
    { date: '2024-11', count: 89 },
    { date: '2024-12', count: 156 },
    { date: '2025-01', count: 203 },
    { date: '2025-02', count: 178 },
    { date: '2025-03', count: 234 },
    { date: '2025-04', count: 267 }
  ],
  revenueByMonth: [
    { month: 'Nov 2024', revenue: 98000 },
    { month: 'Dec 2024', revenue: 112000 },
    { month: 'Jan 2025', revenue: 125000 },
    { month: 'Feb 2025', revenue: 118000 },
    { month: 'Mar 2025', revenue: 134000 },
    { month: 'Apr 2025', revenue: 142000 }
  ]
};

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalytics);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? 'arrow-up' : 'arrow-down';
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/admin" 
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <Icon name="arrow-left" className="mr-2" />
              Back to Admin
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Analytics Dashboard
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive analytics, performance metrics, and system health monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Time Range Selector */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-poppins font-bold text-charcoal">Performance Overview</h2>
            <div className="flex space-x-2">
              {[
                { key: '7d', label: '7 Days' },
                { key: '30d', label: '30 Days' },
                { key: '90d', label: '90 Days' },
                { key: '1y', label: '1 Year' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTimeRange(key as any)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    timeRange === key
                      ? 'bg-global-teal text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-poppins font-bold text-charcoal">{formatNumber(analytics.totalUsers)}</p>
                  <div className="flex items-center mt-2">
                    <Icon name={getGrowthIcon(analytics.userGrowth)} className={`text-sm mr-1 ${getGrowthColor(analytics.userGrowth)}`} />
                    <span className={`text-sm font-medium ${getGrowthColor(analytics.userGrowth)}`}>
                      {analytics.userGrowth}%
                    </span>
                    <span className="text-gray-500 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="users" className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Users</p>
                  <p className="text-3xl font-poppins font-bold text-charcoal">{formatNumber(analytics.activeUsers)}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-600 text-sm font-medium">
                      {((analytics.activeUsers / analytics.totalUsers) * 100).toFixed(1)}%
                    </span>
                    <span className="text-gray-500 text-sm ml-1">of total users</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="check-circle" className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Investments</p>
                  <p className="text-3xl font-poppins font-bold text-charcoal">{formatCurrency(analytics.totalInvestments)}</p>
                  <div className="flex items-center mt-2">
                    <Icon name={getGrowthIcon(analytics.investmentGrowth)} className={`text-sm mr-1 ${getGrowthColor(analytics.investmentGrowth)}`} />
                    <span className={`text-sm font-medium ${getGrowthColor(analytics.investmentGrowth)}`}>
                      {analytics.investmentGrowth}%
                    </span>
                    <span className="text-gray-500 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Icon name="chart-line" className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
                  <p className="text-3xl font-poppins font-bold text-charcoal">{formatCurrency(analytics.monthlyRevenue)}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-600 text-sm font-medium">
                      {analytics.conversionRate}%
                    </span>
                    <span className="text-gray-500 text-sm ml-1">conversion rate</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Icon name="dollar-sign" className="text-orange-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* User Registrations Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-6">User Registrations</h3>
              <div className="space-y-4">
                {analytics.userRegistrations.map((item, index) => (
                  <div key={item.date} className="flex items-center justify-between">
                    <span className="text-gray-600">{item.date}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-global-teal h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.count / Math.max(...analytics.userRegistrations.map(r => r.count))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-charcoal font-semibold w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-6">Monthly Revenue</h3>
              <div className="space-y-4">
                {analytics.revenueByMonth.map((item, index) => (
                  <div key={item.month} className="flex items-center justify-between">
                    <span className="text-gray-600">{item.month}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-edge-purple h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.revenue / Math.max(...analytics.revenueByMonth.map(r => r.revenue))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-charcoal font-semibold w-20 text-right">{formatCurrency(item.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Assets */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h3 className="text-xl font-poppins font-semibold text-charcoal mb-6">Top Performing Assets</h3>
            <div className="space-y-4">
              {analytics.topAssets.map((asset, index) => (
                <div key={asset.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal">{asset.name}</h4>
                      <p className="text-sm text-gray-600">{formatCurrency(asset.investments)} total investments</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={getGrowthIcon(asset.growth)} className={`text-sm ${getGrowthColor(asset.growth)}`} />
                    <span className={`font-semibold ${getGrowthColor(asset.growth)}`}>
                      {asset.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Icon name="check-circle" className="text-green-600" />
                </div>
                <h4 className="font-semibold text-charcoal">System Status</h4>
              </div>
              <p className="text-green-600 font-semibold">All Systems Operational</p>
              <p className="text-sm text-gray-600 mt-1">99.9% uptime</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Icon name="chart-line" className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-charcoal">Performance</h4>
              </div>
              <p className="text-blue-600 font-semibold">Excellent</p>
              <p className="text-sm text-gray-600 mt-1">Avg response: 120ms</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Icon name="shield-halved" className="text-purple-600" />
                </div>
                <h4 className="font-semibold text-charcoal">Security</h4>
              </div>
              <p className="text-purple-600 font-semibold">Secure</p>
              <p className="text-sm text-gray-600 mt-1">No threats detected</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
