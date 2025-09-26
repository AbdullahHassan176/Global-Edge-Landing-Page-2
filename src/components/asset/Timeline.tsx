'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface TimelineEvent {
  txHash?: string;
  eventType: string;
  eventTime: string;
  signer: string;
}

interface TimelineItem {
  type: 'event' | 'doc';
  event?: TimelineEvent;
  doc?: {
    docHash: string;
    kind: string;
  };
}

interface TimelineProps {
  assetKey: string;
  className?: string;
}

export default function Timeline({ assetKey, className = '' }: TimelineProps) {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (assetKey) {
      loadTimeline();
    }
  }, [assetKey]);

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

  const formatAbsoluteTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getExplorerUrl = (txHash: string) => {
    // TODO: Replace with actual explorer URL from chain adapter
    // For now, using a placeholder
    return `https://explorer.example.com/tx/${txHash}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
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
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Icon name="exclamation-triangle" className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={loadTimeline}
          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  if (timeline.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Icon name="document-text" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">No timeline events yet</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {timeline.map((item, index) => (
        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          {item.type === 'event' ? (
            <>
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-global-teal rounded-full mt-2"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {item.event?.eventType}
                  </span>
                  {item.event?.txHash && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      on-chain
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span 
                    className="cursor-help"
                    title={`Signer: ${item.event?.signer || ''}`}
                  >
                    Signer: {shortenAddress(item.event?.signer || '')}
                  </span>
                  <span 
                    className="cursor-help"
                    title={`Time: ${formatAbsoluteTime(item.event?.eventTime || '')}`}
                  >
                    {formatRelativeTime(item.event?.eventTime || '')}
                  </span>
                  {item.event?.txHash && (
                    <button
                      onClick={() => window.open(getExplorerUrl(item.event?.txHash || ''), '_blank')}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Icon name="external-link" className="w-3 h-3" />
                      View TX
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {item.doc?.kind}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    doc
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="font-mono">
                    {item.doc?.docHash ? `${item.doc.docHash.slice(0, 8)}...${item.doc.docHash.slice(-4)}` : ''}
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
  );
}
