'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { userAuthService } from '@/lib/userAuthService';
import { userAuthService as investorService, User, Investment, Notification } from '@/lib/userAuthService';

export default function InvestorManagementPage() {
  const [user, setUser] = useState<any>(null);
  const [investors, setInvestors] = useState<User[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvestor, setSelectedInvestor] = useState<User | null>(null);
  const [showInvestorModal, setShowInvestorModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'kyc_pending' | 'kyc_approved' | 'kyc_rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = userAuthService.getCurrentUser();
      if (!currentUser || currentUser.role !== 'issuer') {
        window.location.href = '/login';
        return;
      }

      setUser(currentUser);
      
      // Load all investors (in production, this would be filtered by issuer)
      const allUsers = (investorService as any).getAllUsers();
      const investorUsers = allUsers.filter((u: User) => u.role === 'investor');
      setInvestors(investorUsers);

      // Load investments for this issuer's assets
      const allInvestments = await investorService.getInvestments(currentUser.id);
      setInvestments(allInvestments);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvestor = (investor: User) => {
    setSelectedInvestor(investor);
    setShowInvestorModal(true);
  };

  const handleUpdateKYCStatus = async (investorId: string, status: User['kycStatus']) => {
    try {
      const success = await investorService.updateKycStatus(investorId, status);
      if (success) {
        setInvestors(prev => prev.map(inv => 
          inv.id === investorId ? { ...inv, kycStatus: status } : inv
        ));
        
        // Create notification for investor
        await investorService.createNotification({
          userId: investorId,
          type: status === 'approved' ? 'kyc_approved' : 'kyc_rejected',
          title: `KYC ${status === 'approved' ? 'Approved' : 'Rejected'}`,
          message: `Your KYC verification has been ${status === 'approved' ? 'approved' : 'rejected'}.`,
          priority: 'high',
          actionUrl: '/investor/kyc'
        });
      }
    } catch (error) {
      console.error('Error updating KYC status:', error);
    }
  };

  const filteredInvestors = investors.filter(investor => {
    const matchesStatus = filterStatus === 'all' || investor.status === filterStatus;
    const matchesSearch = investor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'kyc_pending': return 'bg-blue-100 text-blue-800';
      case 'kyc_approved': return 'bg-green-100 text-green-800';
      case 'kyc_rejected': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading investor data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access investor management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investor Management</h1>
              <p className="text-gray-600 mt-1">Manage your investors and their KYC status</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Total Investors</p>
                <p className="text-2xl font-bold text-gray-900">{investors.length}</p>
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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="users" className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Investors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {investors.filter(inv => inv.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="clock" className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending KYC</p>
                <p className="text-2xl font-bold text-gray-900">
                  {investors.filter(inv => inv.kycStatus === 'pending_review').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="check-circle" className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">KYC Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {investors.filter(inv => inv.kycStatus === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Icon name="chart-line" className="text-orange-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${investors.reduce((sum, inv) => sum + (inv.totalInvested || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                >
                  <option value="all">All Investors</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="kyc_pending">KYC Pending</option>
                  <option value="kyc_approved">KYC Approved</option>
                  <option value="kyc_rejected">KYC Rejected</option>
                </select>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Investors</label>
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="Search by name or email..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Investors Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Investors</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Investor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    KYC Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Invested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvestors.map((investor) => (
                  <tr key={investor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <Icon name="user" className="text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {investor.firstName} {investor.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {investor.id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{investor.email}</div>
                        <div className="text-sm text-gray-500">{investor.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(investor.status)}`}>
                        {investor.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getKYCStatusColor(investor.kycStatus)}`}>
                        {investor.kycStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${(investor.totalInvested || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(investor.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewInvestor(investor)}
                          className="text-global-teal hover:text-global-teal-dark"
                        >
                          View
                        </button>
                        {investor.kycStatus === 'pending_review' && (
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleUpdateKYCStatus(investor.id, 'approved')}
                              className="text-green-600 hover:text-green-800"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateKYCStatus(investor.id, 'rejected')}
                              className="text-red-600 hover:text-red-800"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Investor Details Modal */}
      {showInvestorModal && selectedInvestor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Investor Details</h2>
              <p className="text-gray-600 mt-1">{selectedInvestor.firstName} {selectedInvestor.lastName}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{selectedInvestor.firstName} {selectedInvestor.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedInvestor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedInvestor.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Country</p>
                    <p className="font-medium">{selectedInvestor.country || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInvestor.status)}`}>
                      {selectedInvestor.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">KYC Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getKYCStatusColor(selectedInvestor.kycStatus)}`}>
                      {selectedInvestor.kycStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Investment Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Invested</p>
                    <p className="font-medium text-lg">${(selectedInvestor.totalInvested || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Investment Limit</p>
                    <p className="font-medium">${(selectedInvestor.investmentLimit || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium">{new Date(selectedInvestor.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Login</p>
                    <p className="font-medium">{selectedInvestor.lastLogin ? new Date(selectedInvestor.lastLogin).toLocaleDateString() : 'Never'}</p>
                  </div>
                </div>
              </div>

              {/* KYC Documents */}
              {selectedInvestor.kycDocuments && selectedInvestor.kycDocuments.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Documents</h3>
                  <div className="space-y-2">
                    {selectedInvestor.kycDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center">
                          <Icon name="document" className="mr-3 text-gray-600" />
                          <div>
                            <p className="font-medium">{doc.type.replace(/_/g, ' ')}</p>
                            <p className="text-sm text-gray-600">Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                          doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* KYC Actions */}
              {selectedInvestor.kycStatus === 'pending_review' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">KYC Review Required</h3>
                  <p className="text-yellow-800 mb-4">
                    This investor's KYC documents are pending review. Please review the documents and approve or reject their verification.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        handleUpdateKYCStatus(selectedInvestor.id, 'approved');
                        setShowInvestorModal(false);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve KYC
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateKYCStatus(selectedInvestor.id, 'rejected');
                        setShowInvestorModal(false);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject KYC
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowInvestorModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
