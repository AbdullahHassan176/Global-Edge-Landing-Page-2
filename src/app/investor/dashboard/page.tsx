'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { userAuthService, User, Investment, Notification } from '@/lib/userAuthService';

export default function InvestorDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvested: 0,
    activeInvestments: 0,
    completedInvestments: 0,
    totalReturns: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = userAuthService.getCurrentUser();
      if (!currentUser || currentUser.role !== 'investor') {
        // Redirect to login or role selection
        window.location.href = '/login';
        return;
      }

      setUser(currentUser);
      
      // Load investments
      const userInvestments = await userAuthService.getInvestments(currentUser.id);
      setInvestments(userInvestments);

      // Load notifications
      const userNotifications = await userAuthService.getNotifications(currentUser.id);
      setNotifications(userNotifications);

      // Calculate stats
      const totalInvested = userInvestments
        .filter(inv => inv.status === 'completed')
        .reduce((sum, inv) => sum + inv.amount, 0);
      
      const activeInvestments = userInvestments.filter(inv => 
        inv.status === 'pending' || inv.status === 'approved'
      ).length;

      const completedInvestments = userInvestments.filter(inv => 
        inv.status === 'completed'
      ).length;

      // Mock returns calculation (in production, this would come from your backend)
      const totalReturns = totalInvested * 0.12; // 12% average return

      setStats({
        totalInvested,
        activeInvestments,
        completedInvestments,
        totalReturns
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkNotificationAsRead = async (notificationId: string) => {
    await userAuthService.markNotificationAsRead(notificationId);
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(notif => !notif.read);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investment Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.firstName}!</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Icon name="bell" className="text-xl" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications.length}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
                <Icon name="chart-line" className="text-white text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* KYC Status Alert */}
        {user.kycStatus !== 'approved' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
            <div className="flex items-center">
              <Icon name="exclamation-triangle" className="text-yellow-600 text-xl mr-3" />
              <div>
                <h3 className="text-yellow-800 font-medium">KYC Verification Required</h3>
                <p className="text-yellow-700 text-sm">
                  Complete your KYC verification to start investing in tokenized assets.
                </p>
                <button className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
                  Complete KYC
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="chart-line" className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalInvested.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="trending-up" className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Returns</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalReturns.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="clock" className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Investments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeInvestments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Icon name="check-circle" className="text-orange-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedInvestments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-global-teal/10 rounded-lg flex items-center justify-center mr-3">
                <Icon name="search" className="text-global-teal text-lg" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Browse Assets</p>
                <p className="text-sm text-gray-600">Explore investment opportunities</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-edge-purple/10 rounded-lg flex items-center justify-center mr-3">
                <Icon name="document-text" className="text-edge-purple text-lg" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">View Reports</p>
                <p className="text-sm text-gray-600">Check your investment reports</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-3">
                <Icon name="cog" className="text-blue-500 text-lg" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Account Settings</p>
                <p className="text-sm text-gray-600">Manage your preferences</p>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Investments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Investments</h2>
            </div>
            <div className="p-6">
              {investments.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="inbox" className="text-gray-400 text-3xl mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
                  <p className="text-gray-600 mb-4">Start your investment journey by exploring available assets.</p>
                  <button className="bg-global-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-global-teal-dark transition-colors">
                    Browse Assets
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {investments.slice(0, 3).map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <Icon name="document-text" className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Investment #{investment.id.slice(-6)}</p>
                          <p className="text-sm text-gray-600">${investment.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          investment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          investment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          investment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                        </span>
                        <button className="text-global-teal hover:text-edge-purple text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
            </div>
            <div className="p-6">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="bell" className="text-gray-400 text-3xl mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        notification.read ? 'border-gray-200 bg-gray-50' : 'border-global-teal/20 bg-global-teal/5'
                      }`}
                      onClick={() => handleMarkNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                          notification.priority === 'urgent' ? 'bg-red-500' :
                          notification.priority === 'high' ? 'bg-orange-500' :
                          notification.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
