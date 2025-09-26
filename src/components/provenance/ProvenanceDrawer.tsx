'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface TimelineItem {
  type: 'event' | 'doc';
  event?: {
    txHash: string;
    eventType: string;
    eventTime: string;
    signer: string;
  };
  doc?: {
    docHash: string;
    kind: string;
  };
}

interface ProvenanceDrawerProps {
  assetKey: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProvenanceDrawer({ assetKey, open, onOpenChange }: ProvenanceDrawerProps) {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && assetKey) {
      loadTimeline();
    }
  }, [open, assetKey]);

  const loadTimeline = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/provenance/timeline?assetKey=${encodeURIComponent(assetKey)}`);
      if (!response.ok) {
        throw new Error('Failed to load timeline');
      }
      const data = await response.json();
      setTimeline(data.timeline || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load timeline');
    } finally {
      setLoading(false);
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getExplorerUrl = (txHash: string) => {
    // Using a placeholder explorer URL - replace with actual explorer
    return `https://explorer.example.com/tx/${txHash}`;
  };

  const eventCount = timeline.filter(item => item.type === 'event').length;
  const docCount = timeline.filter(item => item.type === 'doc').length;

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Provenance</h3>
            <p className="text-sm text-gray-500">Asset: {assetKey}</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close drawer"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Summary */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            {timeline.length} most recent · {eventCount} on-chain · {docCount} docs
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4">
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="p-4">
              <div className="text-center py-8">
                <Icon name="exclamation-triangle" className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  onClick={loadTimeline}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : timeline.length === 0 ? (
            <div className="p-4">
              <div className="text-center py-8">
                <Icon name="document-text" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No events yet</p>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {item.type === 'event' ? (
                      <>
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            on-chain
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {item.event?.eventType}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(item.event?.eventTime || '')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span>Signer: {shortenAddress(item.event?.signer || '')}</span>
                            <button
                              onClick={() => window.open(getExplorerUrl(item.event?.txHash || ''), '_blank')}
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <Icon name="external-link" className="w-3 h-3" />
                              View TX
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            doc
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {item.doc?.kind}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="font-mono">
                              {shortenHash(item.doc?.docHash || '')}
                            </span>
                            <button
                              onClick={() => copyToClipboard(item.doc?.docHash || '')}
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <Icon name="clipboard" className="w-3 h-3" />
                              Copy
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
