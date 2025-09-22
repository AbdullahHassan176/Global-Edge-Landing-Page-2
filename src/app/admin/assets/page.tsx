'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import { assetCreationService, AssetCreationRequest } from '@/lib/assetCreationService';

export default function AdminAssetsPage() {
  const [requests, setRequests] = useState<AssetCreationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<AssetCreationRequest | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected' | 'requires_changes'>('approved');
  const [requiredChanges, setRequiredChanges] = useState('');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const allRequests = assetCreationService.getAllAssetRequests();
      setRequests(allRequests);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = (request: AssetCreationRequest) => {
    setSelectedRequest(request);
    setReviewComments('');
    setReviewStatus('approved');
    setRequiredChanges('');
    setShowReviewModal(true);
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
        reviewedAt: new Date().toISOString(),
        requiredChanges: reviewStatus === 'requires_changes' ? requiredChanges : undefined
      };

      const updatedRequest = await assetCreationService.updateAssetRequest(selectedRequest.id, {
        status: reviewStatus === 'approved' ? 'approved' : 
                reviewStatus === 'rejected' ? 'rejected' : 'under_review',
        reviewHistory: [...selectedRequest.reviewHistory, reviewEntry],
        approvedBy: reviewStatus === 'approved' ? 'admin-1' : undefined,
        approvedAt: reviewStatus === 'approved' ? new Date().toISOString() : undefined,
        rejectedAt: reviewStatus === 'rejected' ? new Date().toISOString() : undefined,
        rejectionReason: reviewStatus === 'rejected' ? reviewComments : undefined
      });

      if (updatedRequest) {
        setRequests(prev => prev.map(req => req.id === selectedRequest.id ? updatedRequest : req));
        setShowReviewModal(false);
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'live': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return 'edit';
      case 'submitted': return 'clock';
      case 'under_review': return 'eye';
      case 'approved': return 'check-circle';
      case 'rejected': return 'x-circle';
      case 'live': return 'play';
      default: return 'question-mark-circle';
    }
  };

  if (loading) {
    return (
      <AdminAuthGuard requiredPermissions={['manage_assets']}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
            <p className="text-gray-600">Loading asset requests...</p>
          </div>
        </div>
      </AdminAuthGuard>
    );
  }

  return (
    <AdminAuthGuard requiredPermissions={['manage_assets']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Asset Approval Management</h1>
                <p className="text-gray-600 mt-1">Review and approve asset creation requests</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="clock" className="text-blue-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(req => req.status === 'submitted' || req.status === 'under_review').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="check-circle" className="text-green-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(req => req.status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon name="x-circle" className="text-red-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(req => req.status === 'rejected').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="play" className="text-purple-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Live Assets</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(req => req.status === 'live').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Asset Creation Requests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Token Standard
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valuation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.basicInfo.name || 'Untitled Asset'}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {request.id.slice(-8)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 capitalize">
                          {request.assetType.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {request.tokenStandard}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          ${request.financialDetails.valuation.valuationAmount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          <Icon name={getStatusIcon(request.status)} className="mr-1" />
                          {request.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.submittedAt ? new Date(request.submittedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleReview(request)}
                            className="text-global-teal hover:text-global-teal-dark"
                          >
                            Review
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Review Modal */}
        {showReviewModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Review Asset Request</h2>
                <p className="text-gray-600 mt-1">{selectedRequest.basicInfo.name}</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Asset Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Asset Type</p>
                      <p className="font-medium">{selectedRequest.assetType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Token Standard</p>
                      <p className="font-medium">{selectedRequest.tokenStandard}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Valuation</p>
                      <p className="font-medium">${selectedRequest.financialDetails.valuation.valuationAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{selectedRequest.basicInfo.location}</p>
                    </div>
                  </div>
                </div>

                {/* Review Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Review Status</label>
                    <select
                      value={reviewStatus}
                      onChange={(e) => setReviewStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="approved">Approve</option>
                      <option value="requires_changes">Requires Changes</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Review Comments</label>
                    <textarea
                      value={reviewComments}
                      onChange={(e) => setReviewComments(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Enter your review comments..."
                    />
                  </div>

                  {reviewStatus === 'requires_changes' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Required Changes</label>
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

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className={`px-6 py-2 rounded-lg text-white ${
                    reviewStatus === 'approved' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : reviewStatus === 'rejected'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}