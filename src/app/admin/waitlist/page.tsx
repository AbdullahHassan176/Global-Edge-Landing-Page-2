'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';
import { WaitlistSubmission } from '@/lib/waitlistService';

export default function WaitlistManagementPage() {
  const [submissions, setSubmissions] = useState<WaitlistSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'qualified' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<WaitlistSubmission | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/waitlist');
      const data = await response.json();
      
      if (data.success) {
        setSubmissions(data.submissions || []);
      } else {
        console.error('Failed to load submissions:', data.error);
        // Fallback to empty array
        setSubmissions([]);
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
      // Fallback to empty array
      setSubmissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === 'all' || submission.status === filter;
    const matchesSearch = 
      submission.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvestorTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'individual': 'Individual Investor',
      'family-office': 'Family Office',
      'institutional': 'Institutional Investor',
      'hedge-fund': 'Hedge Fund',
      'pension-fund': 'Pension Fund',
      'endowment': 'Endowment',
      'sovereign-wealth': 'Sovereign Wealth Fund',
      'other': 'Other'
    };
    return labels[type] || type;
  };

  const getInvestmentAmountLabel = (amount: string) => {
    const labels: Record<string, string> = {
      '10k-50k': '$10K - $50K',
      '50k-100k': '$50K - $100K',
      '100k-250k': '$100K - $250K',
      '250k-500k': '$250K - $500K',
      '500k-1m': '$500K - $1M',
      '1m-5m': '$1M - $5M',
      '5m-10m': '$5M - $10M',
      '10m+': '$10M+'
    };
    return labels[amount] || amount;
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

  const handleViewDetails = (submission: WaitlistSubmission) => {
    setSelectedSubmission(submission);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/waitlist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setSubmissions(prev => 
          prev.map(sub => 
            sub.id === id ? { ...sub, status: newStatus as any } : sub
          )
        );
        addNotification({
          type: 'success',
          title: 'Status Updated',
          message: `Submission status updated to ${newStatus}`,
          duration: 3000
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Update Failed',
          message: data.error || 'Failed to update status',
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update submission status',
        duration: 5000
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="spinner" className="animate-spin text-global-teal text-4xl mb-4" />
          <p className="text-lg text-gray-700">Loading waitlist submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-soft-white">
        <NotificationSystem
          notifications={notifications}
          onRemove={removeNotification}
        />

        <header className="bg-white shadow-sm p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-poppins font-bold text-charcoal">Waitlist Management</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadSubmissions}
                className="bg-global-teal text-white px-4 py-2 rounded-lg hover:bg-global-green transition-colors flex items-center"
              >
                <Icon name="refresh" className="mr-2" />
                Refresh
              </button>
              <div className="text-sm text-gray-600">
                {submissions.length} total submissions
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-8 px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-global-teal text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  All ({submissions.length})
                </button>
                <button
                  onClick={() => setFilter('new')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'new' ? 'bg-global-teal text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  New ({submissions.filter(s => s.status === 'new').length})
                </button>
                <button
                  onClick={() => setFilter('contacted')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'contacted' ? 'bg-global-teal text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Contacted ({submissions.filter(s => s.status === 'contacted').length})
                </button>
                <button
                  onClick={() => setFilter('qualified')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'qualified' ? 'bg-global-teal text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Qualified ({submissions.filter(s => s.status === 'qualified').length})
                </button>
              </div>
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search submissions..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:ring-global-teal focus:border-global-teal"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investor Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investment Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-global-teal rounded-full flex items-center justify-center text-white font-semibold">
                            {submission.firstName[0]}{submission.lastName[0]}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-charcoal">
                              {submission.firstName} {submission.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{submission.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-charcoal">{submission.email}</div>
                        {submission.company && (
                          <div className="text-sm text-gray-500">{submission.company}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-charcoal">{getInvestorTypeLabel(submission.investorType)}</div>
                        <div className="text-sm text-gray-500">{submission.tokenInterest}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">
                        {getInvestmentAmountLabel(submission.investmentAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(submission.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(submission)}
                          className="text-global-teal hover:text-global-green mr-3"
                        >
                          View
                        </button>
                        <select
                          value={submission.status}
                          onChange={(e) => handleUpdateStatus(submission.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Detail Modal */}
        {showDetailModal && selectedSubmission && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative p-8 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4">
                Waitlist Submission Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p><strong>Name:</strong> {selectedSubmission.firstName} {selectedSubmission.lastName}</p>
                  <p><strong>Email:</strong> {selectedSubmission.email}</p>
                  <p><strong>Phone:</strong> {selectedSubmission.phone}</p>
                  <p><strong>Company:</strong> {selectedSubmission.company || 'Not provided'}</p>
                  <p><strong>Investor Type:</strong> {getInvestorTypeLabel(selectedSubmission.investorType)}</p>
                </div>
                <div>
                  <p><strong>Investment Amount:</strong> {getInvestmentAmountLabel(selectedSubmission.investmentAmount)}</p>
                  <p><strong>Token Interest:</strong> {selectedSubmission.tokenInterest}</p>
                  <p><strong>Heard From:</strong> {selectedSubmission.heardFrom}</p>
                  <p><strong>Submitted:</strong> {formatDate(selectedSubmission.submittedAt)}</p>
                  <p><strong>IP Address:</strong> {selectedSubmission.ip}</p>
                </div>
              </div>
              {selectedSubmission.message && (
                <div className="mt-4">
                  <p><strong>Message:</strong></p>
                  <p className="text-gray-600 mt-1">{selectedSubmission.message}</p>
                </div>
              )}
              <div className="mt-6 flex justify-end space-x-4">
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="bg-global-teal text-white px-4 py-2 rounded-lg hover:bg-global-green transition-colors"
                >
                  Send Email
                </a>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}
