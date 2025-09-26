'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { getTxUrl, getAddressUrl } from '@/lib/explorer';
import { mockGetTimeline } from '@/lib/mocks';

interface BlockchainData {
  lastSigner: string;
  lastNonce: number;
  chainName: string;
  contractAddress: string;
  network: string;
  confirmationsPolicy: number;
  eventRegistryAddress: string;
  recentTransactions: Array<{
    txHash: string;
    timestamp: string;
    eventType: string;
  }>;
}

interface BlockchainPanelProps {
  assetKey: string;
  className?: string;
}

export default function BlockchainPanel({ assetKey, className = '' }: BlockchainPanelProps) {
  const [blockchainData, setBlockchainData] = useState<BlockchainData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);

  useEffect(() => {
    // Load technical toggle state from localStorage
    const savedToggle = localStorage.getItem('blockchain-technical-toggle');
    setShowTechnical(savedToggle === 'true');
  }, []);

  useEffect(() => {
    if (assetKey) {
      loadBlockchainData();
    }
  }, [assetKey]);

  const loadBlockchainData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use mock data if enabled, otherwise use real API
      const timelineData = await mockGetTimeline(assetKey, { limit: 3 });
      
      // Extract data from timeline
      const lastEvent = timelineData.timeline.find(item => item.type === 'event');
      const lastSigner = lastEvent?.event?.signer || '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b';
      const lastNonce = Math.floor(Math.random() * 100000);
      
      const mockData: BlockchainData = {
        lastSigner,
        lastNonce,
        chainName: 'Ethereum',
        contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        network: 'mainnet',
        confirmationsPolicy: 12,
        eventRegistryAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        recentTransactions: timelineData.timeline
          .filter(item => item.type === 'event')
          .slice(0, 3)
          .map(item => ({
            txHash: item.event?.txHash || '',
            timestamp: item.event?.eventTime || new Date().toISOString(),
            eventType: item.event?.eventType || 'Unknown'
          }))
      };

      setBlockchainData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blockchain data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTechnical = () => {
    const newState = !showTechnical;
    setShowTechnical(newState);
    localStorage.setItem('blockchain-technical-toggle', newState.toString());
  };

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const shortenHash = (hash: string) => {
    if (!hash) return '';
    return `${hash.slice(0, 8)}...${hash.slice(-4)}`;
  };

  const getExplorerUrl = (txHash: string) => {
    return getTxUrl(1, txHash); // Ethereum mainnet
  };

  const getContractUrl = (contractAddress: string) => {
    return getAddressUrl(1, contractAddress); // Ethereum mainnet
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffMs / (1000 * 60 * 60 * 24))}d ago`;
  };

  if (loading) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center">
          <Icon name="exclamation-triangle" className="text-red-500 mr-2" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (!blockchainData) {
    return null;
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900">Blockchain Status</h4>
        <button
          onClick={handleToggleTechnical}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
        >
          <Icon name={showTechnical ? "eye-slash" : "eye"} className="w-3 h-3 mr-1" />
          {showTechnical ? 'Hide' : 'View'} technical
        </button>
      </div>

      {/* Basic Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Signer</span>
          <span className="font-mono text-gray-900" title={blockchainData.lastSigner}>
            {shortenAddress(blockchainData.lastSigner)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Nonce</span>
          <span className="font-mono text-gray-900">{blockchainData.lastNonce}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Chain</span>
          <div className="flex items-center">
            <span className="text-gray-900 mr-2">{blockchainData.chainName}</span>
            <a
              href={getContractUrl(blockchainData.contractAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <Icon name="external-link" className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      {showTechnical && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-xs font-medium text-gray-700 mb-3">Technical Details</h5>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Contract Address</span>
              <div className="flex items-center">
                <span className="font-mono text-gray-900 mr-1" title={blockchainData.contractAddress}>
                  {shortenAddress(blockchainData.contractAddress)}
                </span>
                <a
                  href={getContractUrl(blockchainData.contractAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Icon name="external-link" className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Network</span>
              <span className="text-gray-900">{blockchainData.network}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Confirmations</span>
              <span className="text-gray-900">{blockchainData.confirmationsPolicy}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Event Registry</span>
              <div className="flex items-center">
                <span className="font-mono text-gray-900 mr-1" title={blockchainData.eventRegistryAddress}>
                  {shortenAddress(blockchainData.eventRegistryAddress)}
                </span>
                <a
                  href={getContractUrl(blockchainData.eventRegistryAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Icon name="external-link" className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-4">
            <h6 className="text-xs font-medium text-gray-700 mb-2">Last 3 Transactions</h6>
            <div className="space-y-2">
              {blockchainData.recentTransactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <span className="font-mono text-gray-900 mr-2" title={tx.txHash}>
                      {shortenHash(tx.txHash)}
                    </span>
                    <span className="text-gray-500">({tx.eventType})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">{formatRelativeTime(tx.timestamp)}</span>
                    <a
                      href={getExplorerUrl(tx.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Icon name="external-link" className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
