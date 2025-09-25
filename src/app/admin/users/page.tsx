'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';
import Link from 'next/link';
import { userAuthService } from '@/lib/userAuthService';
import { userAuthIntegration } from '@/lib/integration/userAuthIntegration';
import { assetService } from '@/lib/assetService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'issuer' | 'investor' | 'admin' | 'moderator';
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
const getEnhancedUsers = async (): Promise<User[]> => {
  // Try to get users from integration service (database + fallback)
  const integrationResult = await userAuthIntegration.getAllUsers();
  const allUsers = integrationResult.success ? integrationResult.users || [] : userAuthService.getAllUsers();
  return allUsers.map(user => {
    // Map status values to match User interface
    const mappedStatus = user.status === 'kyc_approved' ? 'verified' as const :
                        user.status === 'kyc_rejected' ? 'suspended' as const :
                        user.status === 'kyc_pending' ? 'pending' as const :
                        user.status;
    
    // Map kycStatus values to match User interface
    const mappedKycStatus = user.kycStatus === 'not_started' ? 'pending' as const :
                           user.kycStatus === 'in_progress' ? 'pending' as const :
                           user.kycStatus === 'pending_review' ? 'pending' as const :
                           user.kycStatus;
    
    return {
      ...user,
      status: mappedStatus,
      kycStatus: mappedKycStatus
    };
  }).map(user => {
    // Mock user assets for now
    const userAssets = user.role === 'issuer' ? [
      { id: '1', name: 'Sample Asset 1', value: '$50,000' },
      { id: '2', name: 'Sample Asset 2', value: '$75,000' }
    ] : [];
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
      accountType: 'individual',
      status: user.status || 'active',
      createdAt: user.createdAt || new Date().toISOString(),
      lastLogin: user.lastLogin || new Date().toISOString(),
      totalInvestments,
      kycStatus: user.kycStatus || 'pending',
      permissions: ['view_dashboard'],
      assetsCreated: user.role === 'issuer' ? userAssets.length : 0,
      assetsUnderManagement: user.role === 'issuer' ? 
        userAssets.reduce((sum, asset) => sum + (parseFloat(asset.value.replace(/[$,]/g, '')) || 0), 0) : 0
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
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set());
  const { notifications, addNotification, removeNotification } = useNotifications();

  // User creation state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'investor' as 'issuer' | 'investor' | 'admin' | 'moderator',
    accountType: 'individual' as 'individual' | 'business',
    status: 'pending' as 'active' | 'pending' | 'suspended' | 'verified',
    kycStatus: 'pending' as 'pending' | 'approved' | 'rejected',
    permissions: [] as string[]
  });

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      console.log('Loading users...');
      const enhancedUsers = await getEnhancedUsers();
      console.log('Enhanced users loaded:', enhancedUsers.length);
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

  const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
      // Add user to updating set
      setUpdatingUsers(prev => new Set(prev).add(userId));
      
      // Find the user being updated
      const userToUpdate = users.find(user => user.id === userId);
      if (!userToUpdate) {
        addNotification({
          type: 'error',
          title: 'Update Failed',
          message: 'User not found',
          duration: 3000
        });
        return;
      }

      // Update local state immediately for better UX
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: newStatus as any } : user
      ));

      // Here you would typically make an API call to persist the change
      // For now, we'll just log it
      console.log(`User ${userId} status updated to ${newStatus}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success notification
      addNotification({
        type: 'success',
        title: 'Status Updated',
        message: `${userToUpdate.firstName} ${userToUpdate.lastName}'s status changed to ${newStatus}`,
        duration: 4000
      });
      
    } catch (error) {
      console.error('Error updating user status:', error);
      
      // Revert the local state change on error
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: 'pending' } : user
      ));
      
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update user status. Please try again.',
        duration: 5000
      });
    } finally {
      // Remove user from updating set
      setUpdatingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields (First Name, Last Name, Email)',
        duration: 5000
      });
      return;
    }

    if (!newUser.password || newUser.password.length < 8) {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Password must be at least 8 characters long',
        duration: 5000
      });
      return;
    }

    setCreatingUser(true);
    try {
      // Use the password provided by admin
      const userPassword = newUser.password;
      
      // Create user object
      const userToCreate = {
        ...newUser,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        lastLogin: '',
        totalInvestments: 0,
        assetsCreated: 0,
        assetsUnderManagement: 0
      };

      // Add user to local state
      setUsers(prev => [userToCreate, ...prev]);

      // Send email notification
      try {
        const response = await fetch('/api/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: userToCreate,
            tempPassword: userPassword,
            sendEmail: true
          })
        });

        if (response.ok) {
          addNotification({
            type: 'success',
            title: 'User Created',
            message: `User ${userToCreate.firstName} ${userToCreate.lastName} created successfully. Email sent with login details.`,
            duration: 5000
          });
        } else {
          addNotification({
            type: 'warning',
            title: 'User Created',
            message: `User created but email notification failed. Please contact the user directly.`,
            duration: 5000
          });
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        addNotification({
          type: 'warning',
          title: 'User Created',
          message: `User created but email notification failed. Please contact the user directly.`,
          duration: 5000
        });
      }

      // Reset form and close modal
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'investor',
        accountType: 'individual',
        status: 'pending',
        kycStatus: 'pending',
        permissions: []
      });
      setShowCreateModal(false);

    } catch (error) {
      console.error('Error creating user:', error);
      addNotification({
        type: 'error',
        title: 'Creation Failed',
        message: 'Failed to create user. Please try again.',
        duration: 5000
      });
    } finally {
      setCreatingUser(false);
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
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center px-6 py-3 bg-global-teal text-white rounded-full font-medium hover:bg-global-teal-dark transition-colors shadow-lg hover:shadow-xl"
                >
                  <Icon name="plus" className="mr-2" />
                  Create New User
                </button>
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
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                          {updatingUsers.has(user.id) && (
                            <div className="w-3 h-3 border border-global-teal border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </div>
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
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
                          >
                            View
                          </button>
                          <select
                            value={user.status}
                            onChange={(e) => updateUserStatus(user.id, e.target.value)}
                            disabled={updatingUsers.has(user.id)}
                            className={`px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-global-teal focus:border-global-teal hover:border-gray-400 transition-colors min-w-[120px] ${
                              updatingUsers.has(user.id) 
                                ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                                : 'bg-white'
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="suspended">Suspend</option>
                            <option value="verified">Verify</option>
                          </select>
                          {updatingUsers.has(user.id) && (
                            <div className="ml-2 flex items-center">
                              <div className="w-4 h-4 border-2 border-global-teal border-t-transparent rounded-full animate-spin"></div>
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

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">
                Create New User
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    placeholder="Enter password (minimum 8 characters)"
                    minLength={8}
                  />
                  <p className="text-sm text-gray-500 mt-1">This will be the user's login password</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="investor">Investor</option>
                      <option value="issuer">Issuer</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type *</label>
                    <select
                      value={newUser.accountType}
                      onChange={(e) => setNewUser({ ...newUser, accountType: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="individual">Individual</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="verified">Verified</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">KYC Status *</label>
                    <select
                      value={newUser.kycStatus}
                      onChange={(e) => setNewUser({ ...newUser, kycStatus: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Email Notification Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Icon name="info-circle" className="text-blue-600 text-xl mr-3 mt-1" />
                    <div>
                      <h4 className="text-blue-900 font-semibold mb-2">Email Notification</h4>
                      <p className="text-blue-800 text-sm">
                        The password you set will be sent to the user's email address. 
                        The user can change their password anytime in their account settings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                disabled={creatingUser}
                className="bg-global-teal text-white px-6 py-2 rounded-lg hover:bg-global-teal-dark transition-colors disabled:opacity-50 flex items-center"
              >
                {creatingUser ? (
                  <>
                    <Icon name="spinner" className="animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Icon name="plus" className="mr-2" />
                    Create User
                  </>
                )}
              </button>
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
