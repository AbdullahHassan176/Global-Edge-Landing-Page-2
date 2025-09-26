'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface ReportsPanelProps {
  assetKey: string;
  assetName?: string;
}

export function ReportsPanel({ assetKey, assetName }: ReportsPanelProps) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadProvenancePDF = async () => {
    if (downloading) return;

    setDownloading(true);
    setError(null);

    try {
      const response = await fetch(`/api/reports/provenance?assetKey=${encodeURIComponent(assetKey)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `provenance-report-${assetKey}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error downloading provenance PDF:', err);
      setError(err instanceof Error ? err.message : 'Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
        <Icon name="document-text" className="text-gray-400" />
      </div>

      <div className="space-y-4">
        {/* Provenance PDF Button */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Icon name="document-arrow-down" className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Provenance Report</h4>
              <p className="text-sm text-gray-600">
                Download PDF with asset history and documentation
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadProvenancePDF}
            disabled={downloading}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              downloading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {downloading ? (
              <div className="flex items-center">
                <Icon name="arrow-path" className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center">
                <Icon name="arrow-down-tray" className="w-4 h-4 mr-2" />
                Download PDF
              </div>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center">
              <Icon name="exclamation-triangle" className="text-red-600 mr-2" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Additional Report Types (Placeholder) */}
        <div className="border-t border-gray-200 pt-4">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Other Reports</h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Icon name="chart-bar" className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Performance Report</span>
              </div>
              <span className="text-xs text-gray-500">Coming Soon</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Icon name="shield-check" className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Compliance Report</span>
              </div>
              <span className="text-xs text-gray-500">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
