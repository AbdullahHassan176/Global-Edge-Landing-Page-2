'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { ProvenanceChip } from '@/components/provenance/ProvenanceChip';
import { ProvenanceDrawer } from '@/components/provenance/ProvenanceDrawer';

interface Holding {
  id: string;
  assetKey: string;
  assetName: string;
  assetType: string;
  amount: number;
  status: 'active' | 'pending' | 'completed' | 'rejected';
  purchaseDate: string;
  currentValue: number;
  returns: number;
}

interface HoldingsTableProps {
  holdings: Holding[];
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  const [selectedAssetKey, setSelectedAssetKey] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenProvenance = (assetKey: string) => {
    setSelectedAssetKey(assetKey);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      setSelectedAssetKey(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getAssetIcon = (assetType: string) => {
    switch (assetType) {
      case 'container':
        return 'ship';
      case 'property':
        return 'home';
      case 'inventory':
        return 'cube';
      case 'vehicle':
        return 'truck';
      default:
        return 'vault';
    }
  };

  if (holdings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <Icon name="inbox" className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No holdings yet</h3>
          <p className="text-gray-600">Your investment holdings will appear here once you make investments.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Investment Holdings</h2>
          <p className="text-sm text-gray-600 mt-1">Your current investment portfolio</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Returns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holdings.map((holding) => (
                <tr key={holding.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <Icon name={getAssetIcon(holding.assetType)} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {holding.assetName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {holding.assetType.charAt(0).toUpperCase() + holding.assetType.slice(1)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${holding.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(holding.purchaseDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${holding.currentValue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      holding.returns >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {holding.returns >= 0 ? '+' : ''}${holding.returns.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {((holding.returns / holding.amount) * 100).toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(holding.status)}>
                      {holding.status.charAt(0).toUpperCase() + holding.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ProvenanceChip 
                      assetKey={holding.assetKey} 
                      onOpenDrawer={handleOpenProvenance}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-global-teal hover:text-edge-purple">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provenance Drawer */}
      {selectedAssetKey && (
        <ProvenanceDrawer
          assetKey={selectedAssetKey}
          open={drawerOpen}
          onOpenChange={handleCloseDrawer}
        />
      )}
    </>
  );
}
