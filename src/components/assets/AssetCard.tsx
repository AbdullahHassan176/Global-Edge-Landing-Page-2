'use client';

import Icon from '@/components/ui/Icon';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Asset } from '@/types';
import { getAssetHealth, AssetHealth, formatTimeAgo, getOracleStatusColor, getOracleStatusIcon } from '@/lib/assetHealth';

interface AssetCardProps {
  asset: Asset;
  onViewDetails?: (assetId: string) => void;
  onToggleWatchlist?: (assetId: string) => void;
  isWatched?: boolean;
}

export default function AssetCard({ 
  asset, 
  onViewDetails, 
  onToggleWatchlist, 
  isWatched = false 
}: AssetCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [assetHealth, setAssetHealth] = useState<AssetHealth | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(true);

  // Load asset health data
  useEffect(() => {
    const loadHealth = async () => {
      try {
        setLoadingHealth(true);
        const health = await getAssetHealth(asset.id);
        setAssetHealth(health);
      } catch (error) {
        console.error('Error loading asset health:', error);
        setAssetHealth(null);
      } finally {
        setLoadingHealth(false);
      }
    };

    loadHealth();
  }, [asset.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'funding':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'container':
        return 'bg-blue-100 text-blue-800';
      case 'property':
        return 'bg-green-100 text-green-800';
      case 'tradetoken':
        return 'bg-purple-100 text-purple-800';
      case 'vault':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (type: string) => {
    switch (type) {
      case 'container':
        return 'from-global-teal to-aqua-start';
      case 'property':
        return 'from-green-500 to-green-400';
      case 'tradetoken':
        return 'from-purple-500 to-purple-400';
      case 'vault':
        return 'from-orange-500 to-orange-400';
      default:
        return 'from-global-teal to-aqua-start';
    }
  };

  return (
    <div 
      className="card card-hover overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={asset.image}
          alt={asset.name}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(asset.type)}`}>
            {asset.type.toUpperCase()}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(asset.status)}`}>
            {asset.status.toUpperCase()}
          </span>
        </div>
        
        {/* Health Badges */}
        {!loadingHealth && assetHealth && (
          <div className="absolute top-4 left-4 mt-8 flex space-x-1">
            {/* Oracle Badge */}
            <div 
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getOracleStatusColor(assetHealth.oracle.status)}`}
              title={`Oracle: ${assetHealth.oracle.status === 'ok' ? 'Verified within 24h' : assetHealth.oracle.status === 'stale' ? 'Last verified 24-48h ago' : 'No recent verification'} (Nonce: ${assetHealth.oracle.lastNonce})`}
            >
              <Icon 
                name={getOracleStatusIcon(assetHealth.oracle.status)} 
                className="w-3 h-3 mr-1" 
              />
              Oracle
            </div>
            
            {/* Docs Badge */}
            <div 
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
              title={`${assetHealth.docsCount} document${assetHealth.docsCount !== 1 ? 's' : ''} attached`}
            >
              <Icon name="document-text" className="w-3 h-3 mr-1" />
              {assetHealth.docsCount}
            </div>
            
            {/* Exceptions Badge */}
            <div 
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                assetHealth.exceptionsCount > 0 
                  ? 'bg-red-100 text-red-800 border-red-200' 
                  : 'bg-green-100 text-green-800 border-green-200'
              }`}
              title={`${assetHealth.exceptionsCount} open exception${assetHealth.exceptionsCount !== 1 ? 's' : ''}`}
            >
              <Icon 
                name={assetHealth.exceptionsCount > 0 ? 'exclamation-triangle' : 'check-circle'} 
                className="w-3 h-3 mr-1" 
              />
              {assetHealth.exceptionsCount}
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => onToggleWatchlist?.(asset.id)}
            className="bg-white bg-opacity-90 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
          >
            <Icon 
              name="heart" 
              className={isWatched ? "text-red-500" : ""}
              size={12}
            />
          </button>
        </div>
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 text-xs font-medium px-2 py-1 rounded">
          <Icon name="location-dot" className="text-blue-600 mr-1" size={12} />
          {asset.location}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-poppins font-semibold text-charcoal">{asset.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-poppins font-bold text-global-teal">{asset.apr}%</div>
            <div className="text-xs text-gray-500">Target APR</div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{asset.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500">Tenor</div>
            <div className="font-semibold">{asset.tenor}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Min Investment</div>
            <div className="font-semibold">${asset.minInvestment.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Funding Progress</span>
            <span className="font-semibold">
              ${(asset.totalValue * asset.fundedPercentage / 100).toLocaleString()} / ${asset.totalValue.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getProgressColor(asset.type)} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${asset.fundedPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Icon 
                name="shield-halved" 
                className="text-green-600 text-xs" 
                size={12}
              />
            </div>
            <span className="text-xs text-gray-600">
              {asset.verified ? 'Oracle Verified' : 'Pending Verification'}
            </span>
          </div>
          <button 
            onClick={() => onViewDetails?.(asset.id)}
            className="btn-primary text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
