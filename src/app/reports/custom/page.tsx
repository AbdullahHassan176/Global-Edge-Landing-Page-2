'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import { ReportGenerator } from '@/lib/reportGenerator';

interface CustomReportConfig {
  title: string;
  dateRange: {
    start: string;
    end: string;
  };
  includeCharts: boolean;
  includeSummary: boolean;
  includeTransactions: boolean;
  includePerformance: boolean;
  includeRiskAnalysis: boolean;
  format: 'PDF' | 'CSV';
  assets: string[];
  metrics: string[];
}

export default function CustomReportPage() {
  const [config, setConfig] = useState<CustomReportConfig>({
    title: 'Custom Investment Report',
    dateRange: {
      start: '2024-01-01',
      end: '2024-12-31'
    },
    includeCharts: true,
    includeSummary: true,
    includeTransactions: true,
    includePerformance: true,
    includeRiskAnalysis: false,
    format: 'PDF',
    assets: [],
    metrics: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const availableAssets = [
    'Shanghai-LA Container',
    'Miami Office Building', 
    'Electronics Inventory',
    'Gold Vault Storage',
    'Tech Startup Equity',
    'Real Estate Fund',
    'Commodity Futures',
    'Cryptocurrency Portfolio'
  ];

  const availableMetrics = [
    'Total Value',
    'Returns',
    'Risk Level',
    'Volatility',
    'Diversification',
    'Transaction History',
    'Performance Metrics',
    'Tax Implications'
  ];

  const handleAssetToggle = (asset: string) => {
    setConfig(prev => ({
      ...prev,
      assets: prev.assets.includes(asset)
        ? prev.assets.filter(a => a !== asset)
        : [...prev.assets, asset]
    }));
  };

  const handleMetricToggle = (metric: string) => {
    setConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metric)
        ? prev.metrics.filter(m => m !== metric)
        : [...prev.metrics, metric]
    }));
  };

  const generatePreview = () => {
    // Generate mock data based on configuration
    const mockData = {
      title: config.title,
      generatedAt: new Date().toISOString(),
      summary: config.includeSummary ? {
        totalValue: 125000,
        totalInvestments: config.assets.length || 4,
        averageReturn: 12.5,
        riskLevel: 'Medium',
        diversificationScore: 75,
        volatilityIndex: 12.3
      } : undefined,
      data: config.assets.length > 0 ? config.assets.map(asset => ({
        asset,
        value: Math.floor(Math.random() * 50000) + 10000,
        return: `${(Math.random() * 20 - 5).toFixed(1)}%`,
        risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        status: 'Active'
      })) : [
        { asset: 'Shanghai-LA Container', value: 45000, return: '12.5%', risk: 'Medium', status: 'Active' },
        { asset: 'Miami Office Building', value: 35000, return: '8.2%', risk: 'Low', status: 'Active' },
        { asset: 'Electronics Inventory', value: 25000, return: '15.1%', risk: 'High', status: 'Active' },
        { asset: 'Gold Vault Storage', value: 20000, return: '6.8%', risk: 'Low', status: 'Active' }
      ]
    };

    setPreviewData(mockData);
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Generate the actual report data
      const reportData = previewData || {
        title: config.title,
        generatedAt: new Date().toISOString(),
        summary: config.includeSummary ? {
          totalValue: 125000,
          totalInvestments: config.assets.length || 4,
          averageReturn: 12.5,
          riskLevel: 'Medium',
          diversificationScore: 75,
          volatilityIndex: 12.3
        } : undefined,
        data: config.assets.length > 0 ? config.assets.map(asset => ({
          asset,
          value: Math.floor(Math.random() * 50000) + 10000,
          return: `${(Math.random() * 20 - 5).toFixed(1)}%`,
          risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          status: 'Active'
        })) : [
          { asset: 'Shanghai-LA Container', value: 45000, return: '12.5%', risk: 'Medium', status: 'Active' },
          { asset: 'Miami Office Building', value: 35000, return: '8.2%', risk: 'Low', status: 'Active' },
          { asset: 'Electronics Inventory', value: 25000, return: '15.1%', risk: 'High', status: 'Active' },
          { asset: 'Gold Vault Storage', value: 20000, return: '6.8%', risk: 'Low', status: 'Active' }
        ]
      };

      const filename = config.title.toLowerCase().replace(/\s+/g, '_');

      if (config.format === 'CSV') {
        const headers = Object.keys(reportData.data[0] || {});
        const csvContent = ReportGenerator.generateCSV(reportData.data, headers);
        ReportGenerator.downloadCSV(csvContent, filename);
      } else {
        const htmlContent = ReportGenerator.generatePDF(reportData);
        ReportGenerator.downloadPDF(htmlContent, filename);
      }

      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating custom report:', error);
      setIsGenerating(false);
      alert('Error generating report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Custom Report Builder
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Create personalized investment reports tailored to your specific needs and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Configuration Panel */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-poppins font-bold text-charcoal mb-6">Report Configuration</h2>
              
              {/* Basic Settings */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Report Title
                  </label>
                  <input
                    type="text"
                    value={config.title}
                    onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="Enter report title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={config.dateRange.start}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        dateRange: { ...prev.dateRange, start: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={config.dateRange.end}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        dateRange: { ...prev.dateRange, end: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Output Format
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="PDF"
                        checked={config.format === 'PDF'}
                        onChange={(e) => setConfig(prev => ({ ...prev, format: e.target.value as 'PDF' | 'CSV' }))}
                        className="mr-2"
                      />
                      <span>PDF (with charts)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="CSV"
                        checked={config.format === 'CSV'}
                        onChange={(e) => setConfig(prev => ({ ...prev, format: e.target.value as 'PDF' | 'CSV' }))}
                        className="mr-2"
                      />
                      <span>CSV (data only)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Content Options */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Include in Report</h3>
                <div className="space-y-3">
                  {[
                    { key: 'includeSummary', label: 'Executive Summary', icon: 'chart-line' },
                    { key: 'includeCharts', label: 'Visual Charts & Graphs', icon: 'chart-bar' },
                    { key: 'includeTransactions', label: 'Transaction History', icon: 'list' },
                    { key: 'includePerformance', label: 'Performance Metrics', icon: 'chart-line-up' },
                    { key: 'includeRiskAnalysis', label: 'Risk Analysis', icon: 'shield-halved' }
                  ].map(option => (
                    <label key={option.key} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config[option.key as keyof CustomReportConfig] as boolean}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          [option.key]: e.target.checked 
                        }))}
                        className="mr-3"
                      />
                      <Icon name={option.icon} className="mr-3 text-gray-600" />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Asset Selection */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Assets</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableAssets.map(asset => (
                    <label key={asset} className="flex items-center p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.assets.includes(asset)}
                        onChange={() => handleAssetToggle(asset)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">{asset}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty to include all assets
                </p>
              </div>

              {/* Metrics Selection */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Metrics</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableMetrics.map(metric => (
                    <label key={metric} className="flex items-center p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.metrics.includes(metric)}
                        onChange={() => handleMetricToggle(metric)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">{metric}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty to include all metrics
                </p>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-poppins font-bold text-charcoal mb-6">Report Preview</h2>
              
              {previewData ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Report Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Title:</span>
                        <span className="ml-2 font-medium">{previewData.title}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Assets:</span>
                        <span className="ml-2 font-medium">{previewData.data.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Value:</span>
                        <span className="ml-2 font-medium">${previewData.summary?.totalValue?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Return:</span>
                        <span className="ml-2 font-medium text-green-600">{previewData.summary?.averageReturn}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Sample Data</h3>
                    <div className="space-y-2 text-sm">
                      {previewData.data.slice(0, 3).map((item: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.asset}</span>
                          <span className="text-green-600">{item.return}</span>
                        </div>
                      ))}
                      {previewData.data.length > 3 && (
                        <div className="text-gray-500 text-xs">
                          ... and {previewData.data.length - 3} more assets
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="chart-line" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Generate a preview to see your report configuration</p>
                </div>
              )}

              <div className="mt-8 space-y-4">
                <button
                  onClick={generatePreview}
                  className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Generate Preview
                </button>
                
                <button
                  onClick={generateReport}
                  disabled={isGenerating}
                  className="w-full bg-global-teal text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <Icon name="clock" className="animate-spin mr-2" />
                      Generating Report...
                    </div>
                  ) : (
                    `Download ${config.format} Report`
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-12">
            <Link href="/reports" className="bg-gray-600 text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-gray-700 transition-colors mr-4">
              Back to Reports
            </Link>
            <Link href="/dashboard" className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
