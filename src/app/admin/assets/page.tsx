'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';
import { assetCreationService, AssetCreationRequest } from '@/lib/assetCreationService';
import { assetService, Asset } from '@/lib/assetService';
import { assetIntegration } from '@/lib/integration/assetIntegration';
import { userAuthService } from '@/lib/userAuthService';

export default function AdminAssetsPage() {
  const [requests, setRequests] = useState<AssetCreationRequest[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AssetCreationRequest | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected' | 'requires_changes'>('approved');
  const [requiredChanges, setRequiredChanges] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all'>('pending');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  useEffect(() => {
    console.log('AdminAssetsPage mounted, loading requests...');
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const allRequests = assetCreationService.getAllAssetRequests();
      const allAssets = await assetService.getAllAssetsForAdmin();
      
      console.log('Loaded requests:', allRequests);
      console.log('Loaded assets:', allAssets, 'Type:', typeof allAssets, 'Is Array:', Array.isArray(allAssets));
      
      setRequests(Array.isArray(allRequests) ? allRequests : []);
      setAssets(Array.isArray(allAssets) ? allAssets : []);
      setInitialized(true);
    } catch (error) {
      console.error('Error loading requests:', error);
      addNotification({
        type: 'error',
        title: 'Loading Error',
        message: 'Failed to load asset data. Please refresh the page.',
        duration: 5000
      });
      // Set empty arrays on error
      setRequests([]);
      setAssets([]);
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  const getIssuerInfo = (issuerId: string) => {
    const allUsers = userAuthService.getAllUsers();
    return allUsers.find(user => user.id === issuerId);
  };

  // Debug logging
  console.log('Assets state:', assets, 'Type:', typeof assets, 'Is Array:', Array.isArray(assets));
  console.log('Loading state:', loading);
  console.log('Initialized state:', initialized);

  const handleReview = (request: AssetCreationRequest) => {
    setSelectedRequest(request);
    setReviewComments('');
    setReviewStatus('approved');
    setRequiredChanges('');
    setShowReviewModal(true);
  };

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowAssetModal(true);
  };

  const handleApproveAsset = (asset: Asset) => {
    // Update asset status to active
    const updatedAsset = { ...asset, status: 'active' as const };
    setAssets(prev => prev.map(a => a.id === asset.id ? updatedAsset : a));
    
    addNotification({
      type: 'success',
      title: 'Asset Approved',
      message: `${asset.name} has been approved and is now active.`,
      duration: 5000
    });
  };

  const handleSubmitReview = async () => {
    if (!selectedRequest) return;

    try {
      const reviewEntry = {
        id: `review-${Date.now()}`,
        reviewerId: 'admin-1',
        reviewerName: 'Admin User',
        reviewerRole: 'admin' as const,
        status: reviewStatus,
        comments: reviewComments,
        requiredChanges: reviewStatus === 'requires_changes' ? [requiredChanges] : undefined,
        reviewedAt: new Date().toISOString()
      };

      // Update the request with review
      const updatedRequest = {
        ...selectedRequest,
        reviewHistory: [...(selectedRequest.reviewHistory || []), reviewEntry],
        status: reviewStatus === 'approved' ? 'approved' as const : 
                reviewStatus === 'rejected' ? 'rejected' as const : 'under_review' as const
      };

      // Update the requests list
      setRequests(prev => prev.map(req => 
        req.id === selectedRequest.id ? updatedRequest : req
      ));

      // If approved, create the asset
      if (reviewStatus === 'approved') {
        const newAsset = {
          id: `asset-${Date.now()}`,
          name: selectedRequest.basicInfo.name,
          type: selectedRequest.assetType === 'commodity' || selectedRequest.assetType === 'artwork' || selectedRequest.assetType === 'intellectual_property' ? 'vault' : selectedRequest.assetType as 'container' | 'property' | 'inventory' | 'vault',
          description: selectedRequest.basicInfo.description,
          value: selectedRequest.financialDetails.valuation.valuationAmount.toString(),
          apr: selectedRequest.financialDetails.revenueModel.expectedReturn.toString(),
          risk: 'Medium' as const,
          route: selectedRequest.basicInfo.location,
          cargo: selectedRequest.basicInfo.category,
          status: 'active' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          image: selectedRequest.basicInfo.images[0] || '/images/default-asset.jpg'
        };

        assetService.addAsset(newAsset);
        setAssets(prev => [...prev, newAsset]);
      }

      setShowReviewModal(false);
      setSelectedRequest(null);
      
      addNotification({
        type: 'success',
        title: 'Review Submitted',
        message: `Asset request has been ${reviewStatus}.`,
        duration: 5000
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      addNotification({
        type: 'error',
        title: 'Review Failed',
        message: 'Failed to submit review. Please try again.',
        duration: 5000
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'clock';
      case 'approved': return 'check-circle';
      case 'active': return 'play';
      case 'rejected': return 'x-circle';
      default: return 'question-mark-circle';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || !initialized) {
    return (
      <AdminAuthGuard requiredPermissions={['manage_assets', 'approve_assets']}>
        <div className="min-h-screen bg-soft-white flex items-center justify-center">
          <div className="text-center">
            <Icon name="spinner" className="animate-spin text-global-teal text-4xl mb-4" />
            <p className="text-lg text-gray-700">Loading asset data...</p>
          </div>
        </div>
      </AdminAuthGuard>
    );
  }

  // Additional safety check - don't render if assets is not an array
  if (!Array.isArray(assets)) {
    console.error('Assets is not an array:', assets);
    return (
      <AdminAuthGuard requiredPermissions={['manage_assets', 'approve_assets']}>
        <div className="min-h-screen bg-soft-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Loading Error</h2>
            <p className="text-gray-600 mb-4">Assets data is not in the expected format.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-global-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              Reload Page
            </button>
          </div>
        </div>
      </AdminAuthGuard>
    );
  }

  // Calculate filtered assets safely - only after initialization
  let filteredAssets: Asset[] = [];
  if (initialized && Array.isArray(assets)) {
    try {
      filteredAssets = assets.filter(asset => {
        switch (activeTab) {
          case 'pending': return asset.status === 'pending';
          case 'approved': return asset.status === 'active';
          case 'all': return true;
          default: return true;
        }
      });
    } catch (error) {
      console.error('Error filtering assets:', error);
      filteredAssets = [];
    }
  }

  return (
    <AdminAuthGuard requiredPermissions={['manage_assets', 'approve_assets']}>
      <div className="min-h-screen bg-soft-white">
        {/* Notification System */}
        <NotificationSystem
          notifications={notifications}
          onRemove={removeNotification}
        />

        {/* Header */}
        <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
                Asset Management
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Manage asset creation requests, track issuer relationships, and monitor token investments across the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <Icon name="clock" className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-charcoal">
                      {(assets || []).filter(a => a.status === 'pending').length}
                    </h3>
                    <p className="text-gray-600">Pending Approval</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Icon name="check-circle" className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-charcoal">
                      {(assets || []).filter(a => a.status === 'active').length}
                    </h3>
                    <p className="text-gray-600">Approved Assets</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Icon name="building" className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-charcoal">
                      {new Set((assets || []).map(a => a.name.split(' ')[0])).size}
                    </h3>
                    <p className="text-gray-600">Active Issuers</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Icon name="chart-line" className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-charcoal">
                      {formatCurrency((assets || []).reduce((sum, asset) => sum + (parseFloat(asset.value) || 0), 0))}
                    </h3>
                    <p className="text-gray-600">Total Value</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { key: 'pending', label: 'Pending Approval', count: (assets || []).filter(a => a.status === 'pending').length, icon: 'clock' },
                { key: 'approved', label: 'Approved Assets', count: (assets || []).filter(a => a.status === 'active').length, icon: 'check-circle' },
                { key: 'all', label: 'All Assets', count: (assets || []).length, icon: 'boxes' }
              ].map(({ key, label, count, icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    activeTab === key
                      ? 'bg-global-teal text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <Icon name={icon} className="mr-2" />
                  {label} ({count})
                </button>
              ))}
            </div>

            {/* Assets Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Asset</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issuer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">APR</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAssets.map((asset) => {
                      const issuer = { firstName: 'Asset', lastName: 'Owner', email: 'owner@example.com' };
                      return (
                        <tr key={asset.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-global-teal to-edge-purple rounded-lg flex items-center justify-center mr-3">
                                <Icon name="building" className="text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-charcoal">{asset.name}</div>
                                <div className="text-sm text-gray-600">{asset.route}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {issuer ? (
                              <div>
                                <div className="font-semibold text-charcoal">
                                  {issuer.firstName} {issuer.lastName}
                                </div>
                                <div className="text-sm text-gray-600">{issuer.email}</div>
                              </div>
                            ) : (
                              <span className="text-gray-500">Unknown Issuer</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {asset.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-charcoal">
                            {formatCurrency(parseFloat(asset.value) || 0)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-green-600 font-semibold">
                              {asset.apr}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(asset.status)}`}>
                              {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(asset.createdAt || new Date().toISOString())}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleViewAsset(asset)}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                              >
                                View
                              </button>
                              {asset.status === 'pending' && (
                                <button 
                                  onClick={() => handleApproveAsset(asset)}
                                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                                >
                                  Approve
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <Icon name="boxes" className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No assets found</h3>
                <p className="text-gray-500">No assets match your current filter criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Asset Detail Modal */}
        {showAssetModal && selectedAsset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Asset Details</h2>
                  <button
                    onClick={() => setShowAssetModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Icon name="x-mark" className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-lg flex items-center justify-center">
                      <Icon name="building" className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-charcoal">{selectedAsset.name}</h3>
                      <p className="text-gray-600">{selectedAsset.route}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{selectedAsset.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAsset.status)}`}>
                            {selectedAsset.status.charAt(0).toUpperCase() + selectedAsset.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-medium">{formatDate(selectedAsset.createdAt || new Date().toISOString())}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Financial Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Value:</span>
                          <span className="font-medium">{formatCurrency(parseFloat(selectedAsset.value) || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">APR:</span>
                          <span className="font-medium text-green-600">{selectedAsset.apr}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Risk Level:</span>
                          <span className="font-medium">{selectedAsset.risk}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-600 text-sm">{selectedAsset.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Additional Details</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cargo Type:</span>
                        <span className="font-medium">{selectedAsset.cargo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">{formatDate(selectedAsset.updatedAt || selectedAsset.createdAt || new Date().toISOString())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAssetModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  {selectedAsset.status === 'pending' && (
                    <button
                      onClick={() => {
                        handleApproveAsset(selectedAsset);
                        setShowAssetModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Approve Asset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Review Asset Request</h2>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Icon name="x-mark" className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Asset Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p><strong>Name:</strong> {selectedRequest.basicInfo.name}</p>   
                      <p><strong>Type:</strong> {selectedRequest.assetType}</p>   
                      <p><strong>Location:</strong> {selectedRequest.basicInfo.location}</p>
                      <p><strong>Value:</strong> {formatCurrency(selectedRequest.financialDetails.valuation.valuationAmount)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Status
                    </label>
                    <select
                      value={reviewStatus}
                      onChange={(e) => setReviewStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                      <option value="requires_changes">Requires Changes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comments
                    </label>
                    <textarea
                      value={reviewComments}
                      onChange={(e) => setReviewComments(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Add your review comments..."
                    />
                  </div>

                  {reviewStatus === 'requires_changes' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Changes
                      </label>
                      <textarea
                        value={requiredChanges}
                        onChange={(e) => setRequiredChanges(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                        placeholder="Specify what changes are required..."
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    className="flex-1 px-4 py-2 bg-global-teal text-white rounded-lg hover:bg-global-teal-dark transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}