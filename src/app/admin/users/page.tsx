'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';
import Link from 'next/link';
import { userAuthService } from '@/lib/userAuthService';
import { assetService } from '@/lib/assetService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'issuer' | 'investor';
  accountType: 'individual' | 'business';
  status: 'active' | 'pending' | 'suspended' | 'verified';
  createdAt: string;
  lastLogin: string;
  totalInvestments: number;
  kycStatus: 'pending' | 'approved' | 'rejected';
  permissions: string[];
  assetsCreated?: number;
  assetsUnderManagement?: number;
}

// Enhanced user data with issuer tracking
const getEnhancedUsers = (): User[] => {
  const allUsers = userAuthService.getAllUsers();
  const allAssets = assetService.getAllAssetsForAdmin();
  
  return allUsers.map(user => {
    const userAssets = allAssets.filter(asset => asset.issuerId === user.id);
    const totalInvestments = user.role === 'investor' ? 
      Math.floor(Math.random() * 100000) + 10000 : // Mock investment amount for investors
      0;
    
    return {
      id: user.id,
      firstName: user.firstName || 'Unknown',
      lastName: user.lastName || 'User',
      email: user.email,
      phone: user.phone || '+1 (555) 000-0000',
      role: user.role,
      accountType: user.accountType || 'individual',
      status: user.status || 'active',
      createdAt: user.createdAt || new Date().toISOString(),
      lastLogin: user.lastLogin || new Date().toISOString(),
      totalInvestments,
      kycStatus: user.kycStatus || 'pending',
      permissions: user.permissions || ['view_dashboard'],
      assetsCreated: user.role === 'issuer' ? userAssets.length : 0,
      assetsUnderManagement: user.role === 'issuer' ? 
        userAssets.reduce((sum, asset) => sum + (asset.value || 0), 0) : 0
    };
  });
};

function UserManagementDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'suspended' | 'verified' | 'issuer' | 'investor'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { notifications, addNotification, removeNotification } = useNotifications();

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setIsLoading(true);
    try {
      const enhancedUsers = getEnhancedUsers();
      setUsers(enhancedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      addNotification({
        type: 'error',
        title: 'Loading Error',
        message: 'Failed to load users. Please refresh the page.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || 
                         user.status === filter || 
                         user.role === filter;
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateUserStatus = (userId: string, newStatus: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus as any } : user
    ));
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="spinner" className="animate-spin text-global-teal text-4xl mb-4" />
          <p className="text-lg text-gray-700">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/admin" 
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <Icon name="arrow-left" className="mr-2" />
              Back to Admin
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              User Management
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Manage user accounts, permissions, and access controls across the platform.
            </p>
          </div>
        </div>
      </section>

      {/* User Management Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="users" className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">{users.length}</h3>
                  <p className="text-gray-600">Total Users</p>
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
                    {users.filter(u => u.status === 'active').length}
                  </h3>
                  <p className="text-gray-600">Active Users</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="clock" className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">
                    {users.filter(u => u.status === 'pending').length}
                  </h3>
                  <p className="text-gray-600">Pending Approval</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="building" className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">
                    {users.filter(u => u.accountType === 'business').length}
                  </h3>
                  <p className="text-gray-600">Business Accounts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                {[
                  { key: 'all', label: 'All Users', count: users.length, icon: 'users' },
                  { key: 'issuer', label: 'Issuers', count: users.filter(u => u.role === 'issuer').length, icon: 'building' },
                  { key: 'investor', label: 'Investors', count: users.filter(u => u.role === 'investor').length, icon: 'chart-line' },
                  { key: 'active', label: 'Active', count: users.filter(u => u.status === 'active').length, icon: 'check-circle' },
                  { key: 'pending', label: 'Pending', count: users.filter(u => u.status === 'pending').length, icon: 'clock' },
                  { key: 'suspended', label: 'Suspended', count: users.filter(u => u.status === 'suspended').length, icon: 'x-circle' },
                  { key: 'verified', label: 'Verified', count: users.filter(u => u.status === 'verified').length, icon: 'shield-check' }
                ].map(({ key, label, count, icon }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={`flex items-center px-4 py-2 rounded-full font-medium transition-colors ${
                      filter === key
                        ? 'bg-global-teal text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name={icon} className="mr-2" />
                    {label} ({count})
                  </button>
                ))}
              </div>

              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-global-teal focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Account Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">KYC Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Assets/Investments</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Login</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-charcoal">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === 'issuer' 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.accountType === 'business' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getKycStatusColor(user.kycStatus)}`}>
                          {user.kycStatus.charAt(0).toUpperCase() + user.kycStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {user.role === 'issuer' ? (
                            <>
                              <div className="font-semibold text-charcoal">
                                {user.assetsCreated || 0} Assets
                              </div>
                              <div className="text-sm text-gray-600">
                                {formatCurrency(user.assetsUnderManagement || 0)} AUM
                              </div>
                            </>
                          ) : (
                            <div className="font-semibold text-charcoal">
                              {formatCurrency(user.totalInvestments)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                          >
                            View
                          </button>
                          <select
                            value={user.status}
                            onChange={(e) => updateUserStatus(user.id, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-global-teal focus:border-transparent"
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="suspended">Suspend</option>
                            <option value="verified">Verify</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Icon name="users" className="text-gray-400 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
              <p className="text-gray-500">No users match your current filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-charcoal">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <p className="text-charcoal">{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <p className="text-charcoal capitalize">{selectedUser.accountType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">KYC Status</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getKycStatusColor(selectedUser.kycStatus)}`}>
                    {selectedUser.kycStatus.charAt(0).toUpperCase() + selectedUser.kycStatus.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Investments</label>
                  <p className="text-charcoal font-semibold">{formatCurrency(selectedUser.totalInvestments)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <p className="text-charcoal">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.permissions.map((permission) => (
                    <span key={permission} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {permission.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserManagementPage() {
  return (
    <AdminAuthGuard requiredPermissions={['view_users']}>
      <UserManagementDashboard />
    </AdminAuthGuard>
  );
}
