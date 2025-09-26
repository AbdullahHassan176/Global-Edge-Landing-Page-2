'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Tooltip from '@/components/ui/Tooltip';
import { HoldingsTable } from '@/components/investor/HoldingsTable';
import { userAuthService, User, Investment, Notification } from '@/lib/userAuthService';
import { databaseService } from '@/lib/database/databaseService';
import { assetService } from '@/lib/assetService';

// Investment Item Component
function InvestmentItem({ investment }: { investment: Investment }) {
  const [assetName, setAssetName] = useState('Loading...');
  const [assetType, setAssetType] = useState('asset');

  useEffect(() => {
    const loadAssetDetails = async () => {
      try {
        const assetResponse = await databaseService.getAssetById(investment.assetId);
        if (assetResponse.success && assetResponse.data) {
          setAssetName(assetResponse.data.name);
          setAssetType(assetResponse.data.type);
        } else {
          // Fallback to local asset service
          const localAsset = await assetService.getAssetById(investment.assetId);
          if (localAsset) {
            setAssetName(localAsset.name);
            setAssetType(localAsset.type);
          } else {
            setAssetName('Unknown Asset');
          }
        }
      } catch (error) {
        console.log('Could not load asset details for investment:', investment.id);
        setAssetName('Unknown Asset');
      }
    };

    loadAssetDetails();
  }, [investment.assetId]);

  const handleViewInvestment = (investmentId: string) => {
    // Navigate to investment details or asset details
    window.location.href = `/assets/${investment.assetId}`;
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
          <Icon name={assetType === 'container' ? 'ship' : 
                    assetType === 'property' ? 'home' : 
                    assetType === 'inventory' ? 'cube' : 'vault'} className="text-gray-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{assetName}</p>
          <p className="text-sm text-gray-600">${investment.amount.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          investment.status === 'completed' ? 'bg-green-100 text-green-800' :
          investment.status === 'approved' ? 'bg-blue-100 text-blue-800' :
          investment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          investment.status === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
        </span>
        <Tooltip content="View detailed information about this investment including asset details and transaction history">
          <button 
            onClick={() => handleViewInvestment(investment.id)}
            className="text-global-teal hover:text-edge-purple text-sm font-medium"
          >
            View
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default function InvestorDashboard() {
  const router = useRouter();
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
      setLoading(true);
      const currentUser = userAuthService.getCurrentUser();
      if (!currentUser || currentUser.role !== 'investor') {
        // Redirect to login or role selection
        window.location.href = '/login';
        return;
      }

      setUser(currentUser);
      
      // Load investments from database
      let userInvestments: Investment[] = [];
      try {
        const dbResponse = await databaseService.getInvestments({ 
          userId: currentUser.id,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        if (dbResponse.success && dbResponse.data) {
          userInvestments = dbResponse.data.items;
        }
      } catch (dbError) {
        console.log('Database not available, using local data');
        // Fallback to local data
        userInvestments = await userAuthService.getInvestments(currentUser.id);
      }

      setInvestments(userInvestments);

      // Load notifications from database
      let userNotifications: Notification[] = [];
      try {
        const notificationsResponse = await databaseService.getNotificationsByUserId(currentUser.id);
        if (notificationsResponse.success && notificationsResponse.data) {
          userNotifications = notificationsResponse.data;
        }
      } catch (dbError) {
        console.log('Database not available, using local notifications');
        // Fallback to local data
        userNotifications = await userAuthService.getNotifications(currentUser.id);
      }

      setNotifications(userNotifications);

      // Calculate dynamic stats from real data
      const totalInvested = userInvestments
        .filter(inv => inv.status === 'approved' || inv.status === 'completed')
        .reduce((sum, inv) => sum + inv.amount, 0);
      
      const activeInvestments = userInvestments.filter(inv => 
        inv.status === 'approved' || inv.status === 'pending'
      ).length;

      const completedInvestments = userInvestments.filter(inv => 
        inv.status === 'completed'
      ).length;

      // Calculate real returns from actual investment data
      const totalReturns = userInvestments
        .filter(inv => inv.status === 'completed' && inv.actualReturn)
        .reduce((sum, inv) => sum + (inv.actualReturn || 0), 0);

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
    try {
      const response = await databaseService.markNotificationAsRead(notificationId);
      if (response.success) {
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId 
              ? { ...notif, status: 'read' as const, readAt: new Date().toISOString() }
              : notif
          )
        );
      }
    } catch (error) {
      // Fallback to local service
      await userAuthService.markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    }
  };

  const handleBrowseAssets = () => {
    router.push('/assets');
  };

  const handleViewReports = () => {
    router.push('/reports');
  };

  const handleAccountSettings = () => {
    router.push('/settings');
  };

  const handleViewInvestment = (investmentId: string) => {
    // Navigate to investment details page
    router.push(`/investments/${investmentId}`);
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
          <Tooltip content="Total amount you have invested across all completed investment transactions">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
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
          </Tooltip>

          <Tooltip content="Total returns generated from your investments based on asset performance and dividends">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
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
          </Tooltip>

          <Tooltip content="Number of investments currently pending approval or in progress">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
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
          </Tooltip>

          <Tooltip content="Number of investments that have been successfully completed and are generating returns">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
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
          </Tooltip>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tooltip content="Browse and discover available tokenized assets to invest in">
              <button 
                onClick={handleBrowseAssets}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                <div className="w-10 h-10 bg-global-teal/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name="search" className="text-global-teal text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Browse Assets</p>
                  <p className="text-sm text-gray-600">Explore investment opportunities</p>
                </div>
              </button>
            </Tooltip>

            <Tooltip content="View detailed reports and analytics for your investment portfolio">
              <button 
                onClick={handleViewReports}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                <div className="w-10 h-10 bg-edge-purple/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name="document-text" className="text-edge-purple text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">View Reports</p>
                  <p className="text-sm text-gray-600">Check your investment reports</p>
                </div>
              </button>
            </Tooltip>

            <Tooltip content="Manage your account settings, preferences, and personal information">
              <button 
                onClick={handleAccountSettings}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name="cog" className="text-blue-500 text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Account Settings</p>
                  <p className="text-sm text-gray-600">Manage your preferences</p>
                </div>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="mb-8">
          <HoldingsTable 
            holdings={investments.map(inv => ({
              id: inv.id,
              assetKey: inv.assetId, // Using assetId as assetKey for now
              assetName: 'Loading...', // Will be populated by the component
              assetType: 'asset',
              amount: inv.amount,
              status: inv.status as 'active' | 'pending' | 'completed' | 'rejected',
              purchaseDate: inv.createdAt,
              currentValue: inv.amount * 1.05, // Mock current value
              returns: inv.amount * 0.05 // Mock returns
            }))}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Investments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <Tooltip content="Your latest investment transactions showing status and amounts">
                <h2 className="text-xl font-semibold text-gray-900 cursor-help">Recent Investments</h2>
              </Tooltip>
            </div>
            <div className="p-6">
              {investments.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="inbox" className="text-gray-400 text-3xl mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
                  <p className="text-gray-600 mb-4">Start your investment journey by exploring available assets.</p>
                  <button 
                    onClick={handleBrowseAssets}
                    className="bg-global-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-global-teal-dark transition-colors"
                  >
                    Browse Assets
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {investments.slice(0, 3).map((investment) => (
                    <InvestmentItem key={investment.id} investment={investment} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <Tooltip content="Latest notifications about your investments, account updates, and platform announcements">
                <h2 className="text-xl font-semibold text-gray-900 cursor-help">Recent Notifications</h2>
              </Tooltip>
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
