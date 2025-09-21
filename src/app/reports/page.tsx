'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import { ReportGenerator, mockReportData } from '@/lib/reportGenerator';

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (reportType: string, format: 'PDF' | 'CSV' = 'PDF') => {
    setDownloading(reportType);
    
    // Simulate download process
    setTimeout(() => {
      try {
        let reportData;
        let filename = reportType.toLowerCase().replace(/\s+/g, '_');
        
        // Get the appropriate report data
        switch (reportType) {
          case 'Portfolio Summary':
            reportData = mockReportData.portfolioSummary;
            break;
          case 'Asset Performance':
            reportData = mockReportData.assetPerformance;
            break;
          case 'Transaction History':
            reportData = mockReportData.transactionHistory;
            break;
          case 'Risk Analysis':
            reportData = mockReportData.riskAnalysis;
            break;
          case 'Tax Report':
            reportData = mockReportData.taxReport;
            break;
          default:
            reportData = mockReportData.portfolioSummary;
        }

        if (format === 'CSV') {
          // Generate CSV
          const headers = Object.keys(reportData.data[0] || {});
          const csvContent = ReportGenerator.generateCSV(reportData.data, headers);
          ReportGenerator.downloadCSV(csvContent, filename);
        } else {
          // Generate PDF (HTML format for now)
          const htmlContent = ReportGenerator.generatePDF(reportData);
          ReportGenerator.downloadPDF(htmlContent, filename);
        }
        
        setDownloading(null);
      } catch (error) {
        console.error('Error generating report:', error);
        setDownloading(null);
        alert('Error generating report. Please try again.');
      }
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Investment Reports
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Download detailed performance reports and analytics for your investment portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8 text-center">Available Reports</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Portfolio Summary Report */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="chart-line" className="text-blue-600 text-sm"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Portfolio Summary</h3>
              <p className="text-gray-600 mb-4">Complete overview of your investment portfolio performance</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Total Value:</span>
                  <span className="font-semibold">$125,430</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Returns:</span>
                  <span className="font-semibold text-green-600">+$15,230</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. APR:</span>
                  <span className="font-semibold">14.2%</span>
                </div>
              </div>
              <button 
                onClick={() => handleDownload('Portfolio Summary')}
                disabled={downloading === 'Portfolio Summary'}
                className="w-full bg-global-teal text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading === 'Portfolio Summary' ? (
                  <div className="flex items-center justify-center">
                    <Icon name="clock" className="animate-spin mr-2" />
                    Downloading...
                  </div>
                ) : (
                  'Download PDF'
                )}
              </button>
            </div>

            {/* Asset Performance Report */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="chart-bar" className="text-green-600 text-sm"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Asset Performance</h3>
              <p className="text-gray-600 mb-4">Detailed performance metrics for each asset in your portfolio</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Active Assets:</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Best Performer:</span>
                  <span className="font-semibold text-green-600">+18.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Asset Types:</span>
                  <span className="font-semibold">4</span>
                </div>
              </div>
              <button 
                onClick={() => handleDownload('Asset Performance')}
                disabled={downloading === 'Asset Performance'}
                className="w-full bg-global-teal text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading === 'Asset Performance' ? (
                  <div className="flex items-center justify-center">
                    <Icon name="clock" className="animate-spin mr-2" />
                    Downloading...
                  </div>
                ) : (
                  'Download PDF'
                )}
              </button>
            </div>

            {/* Tax Report */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="file-alt" className="text-purple-600 text-sm"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Tax Report</h3>
              <p className="text-gray-600 mb-4">Annual tax summary for your investment activities</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Tax Year:</span>
                  <span className="font-semibold">2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Gains:</span>
                  <span className="font-semibold text-green-600">$15,230</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <span className="font-semibold text-blue-600">Ready</span>
                </div>
              </div>
              <button 
                onClick={() => handleDownload('Tax Report')}
                disabled={downloading === 'Tax Report'}
                className="w-full bg-global-teal text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading === 'Tax Report' ? (
                  <div className="flex items-center justify-center">
                    <Icon name="clock" className="animate-spin mr-2" />
                    Downloading...
                  </div>
                ) : (
                  'Download PDF'
                )}
              </button>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="list" className="text-orange-600 text-sm"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Transaction History</h3>
              <p className="text-gray-600 mb-4">Complete record of all your investment transactions</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Total Transactions:</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Date Range:</span>
                  <span className="font-semibold">Jan 2024 - Dec 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Format:</span>
                  <span className="font-semibold">CSV/PDF</span>
                </div>
              </div>
              <button 
                onClick={() => handleDownload('Transaction History', 'CSV')}
                disabled={downloading === 'Transaction History'}
                className="w-full bg-global-teal text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading === 'Transaction History' ? (
                  <div className="flex items-center justify-center">
                    <Icon name="clock" className="animate-spin mr-2" />
                    Downloading...
                  </div>
                ) : (
                  'Download CSV'
                )}
              </button>
            </div>

            {/* Risk Analysis */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="shield-halved" className="text-red-600 text-sm"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Risk Analysis</h3>
              <p className="text-gray-600 mb-4">Comprehensive risk assessment of your portfolio</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Risk Level:</span>
                  <span className="font-semibold text-yellow-600">Medium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Diversification:</span>
                  <span className="font-semibold text-green-600">Good</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Updated:</span>
                  <span className="font-semibold">Dec 15, 2024</span>
                </div>
              </div>
              <button 
                onClick={() => handleDownload('Risk Analysis')}
                disabled={downloading === 'Risk Analysis'}
                className="w-full bg-global-teal text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading === 'Risk Analysis' ? (
                  <div className="flex items-center justify-center">
                    <Icon name="clock" className="animate-spin mr-2" />
                    Downloading...
                  </div>
                ) : (
                  'Download PDF'
                )}
              </button>
            </div>

            {/* Custom Report */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-dashed border-gray-300">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="cog" className="text-gray-600 text-sm"  />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Custom Report</h3>
              <p className="text-gray-600 mb-4">Create a personalized report with your specific requirements</p>
              <button 
                onClick={() => handleDownload('Custom Report')}
                disabled={downloading === 'Custom Report'}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading === 'Custom Report' ? (
                  <div className="flex items-center justify-center">
                    <Icon name="clock" className="animate-spin mr-2" />
                    Creating...
                  </div>
                ) : (
                  'Create Report'
                )}
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/dashboard" className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
