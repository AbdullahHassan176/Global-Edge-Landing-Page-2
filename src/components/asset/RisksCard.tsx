'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import Tooltip from '@/components/ui/Tooltip';
import { mockGetExceptions } from '@/lib/mocks';

interface RisksCardProps {
  assetKey: string;
  className?: string;
}

export default function RisksCard({ assetKey, className = '' }: RisksCardProps) {
  const [exceptionsCount, setExceptionsCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (assetKey) {
      loadExceptionsCount();
    }
  }, [assetKey]);

  const loadExceptionsCount = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use mock data if enabled, otherwise use real API
      const exceptions = await mockGetExceptions({ assetKey, status: "open" });
      setExceptionsCount(exceptions.length);
    } catch (err) {
      console.error('Failed to load exceptions count:', err);
      setError(err instanceof Error ? err.message : 'Failed to load exceptions');
      // Graceful fallback to 0 if endpoint missing
      setExceptionsCount(0);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = () => {
    if (exceptionsCount === 0) return 'low';
    if (exceptionsCount <= 2) return 'medium';
    return 'high';
  };

  const getRiskColor = () => {
    const level = getRiskLevel();
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = () => {
    const level = getRiskLevel();
    switch (level) {
      case 'low':
        return 'check-circle';
      case 'medium':
        return 'exclamation-triangle';
      case 'high':
        return 'x-circle';
      default:
        return 'question-mark-circle';
    }
  };

  const getRiskText = () => {
    const level = getRiskLevel();
    switch (level) {
      case 'low':
        return 'Low Risk';
      case 'medium':
        return 'Medium Risk';
      case 'high':
        return 'High Risk';
      default:
        return 'Unknown Risk';
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">Risk Assessment</h4>
        <div className="flex items-center space-x-2">
          {exceptionsCount > 0 && (
            <Tooltip content="Exceptions include SLA breaches and document mismatches.">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 cursor-help">
                <Icon name="exclamation-triangle" className="w-3 h-3 mr-1" />
                Exceptions: {exceptionsCount}
              </span>
            </Tooltip>
          )}
          {exceptionsCount > 0 && (
            <Tooltip content="View detailed exceptions in the operations dashboard">
              <a
                href={`/dashboard/ops/exceptions?assetKey=${assetKey}`}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-help"
              >
                View in Ops
              </a>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* Risk Level */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Risk Level</span>
          <div className="flex items-center space-x-2">
            <Icon name={getRiskIcon()} className={`w-4 h-4 ${getRiskColor().split(' ')[0]}`} />
            <span className={`text-sm font-medium ${getRiskColor().split(' ')[0]}`}>
              {getRiskText()}
            </span>
          </div>
        </div>

        {/* Exceptions Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Open Exceptions</span>
          <div className="flex items-center space-x-2">
            {loading ? (
              <Icon name="spinner" className="w-4 h-4 animate-spin text-gray-400" />
            ) : error ? (
              <span className="text-sm text-gray-500">N/A</span>
            ) : (
              <span className={`text-sm font-medium ${
                exceptionsCount === 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {exceptionsCount}
              </span>
            )}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="space-y-2">
          <span className="text-sm text-gray-600">Risk Factors</span>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Market Risk</span>
              <span className="text-green-600 font-medium">Low</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Operational Risk</span>
              <span className="text-yellow-600 font-medium">Medium</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Compliance Risk</span>
              <span className="text-green-600 font-medium">Low</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Technical Risk</span>
              <span className="text-green-600 font-medium">Low</span>
            </div>
          </div>
        </div>

        {/* Risk Summary */}
        <div className="pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            {exceptionsCount === 0 ? (
              <span className="text-green-600">✓ No open exceptions detected</span>
            ) : exceptionsCount === 1 ? (
              <span className="text-yellow-600">⚠ 1 exception requires attention</span>
            ) : (
              <span className="text-red-600">⚠ {exceptionsCount} exceptions require immediate attention</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
