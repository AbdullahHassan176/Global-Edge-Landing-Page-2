'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Tooltip from '@/components/ui/Tooltip';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';
import { userAuthService, User, Investment } from '@/lib/userAuthService';
import { assetService, Asset } from '@/lib/assetService';
import { databaseService } from '@/lib/database/databaseService';

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
          <p className="text-sm text-gray-600">${investment.amount.toLocaleString()} • {investment.tokens} tokens</p>
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
        <Tooltip content="View detailed information about this investment including investor details and transaction history">
          <button 
            onClick={() => window.location.href = `/assets/${investment.assetId}`}
            className="text-global-teal hover:text-edge-purple text-sm font-medium"
          >
            View Details
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default function IssuerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvestments: 0,
    totalRaised: 0,
    activeInvestors: 0,
    pendingKyc: 0,
    assetsCreated: 0,
    assetsUnderManagement: 0,
    totalValue: 0
  });
  const { notifications, addNotification, removeNotification } = useNotifications();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = userAuthService.getCurrentUser();
      if (!currentUser || currentUser.role !== 'issuer') {
        // Redirect to login or role selection
        window.location.href = '/login';
        return;
      }

      setUser(currentUser);
      
      // Load investments from database for this issuer's assets
      let allInvestments: Investment[] = [];
      try {
        const dbResponse = await databaseService.getInvestments({ 
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        if (dbResponse.success && dbResponse.data) {
          // Filter investments for this issuer's assets
          const issuerAssets = await databaseService.getAssets({ 
            issuerId: currentUser.id 
          });
          if (issuerAssets.success && issuerAssets.data) {
            const assetIds = issuerAssets.data.items.map(asset => asset.id);
            allInvestments = dbResponse.data.items.filter(inv => 
              assetIds.includes(inv.assetId)
            );
          }
        }
      } catch (dbError) {
        console.log('Database not available, using local data');
        // Fallback to local data
        allInvestments = await userAuthService.getInvestments(currentUser.id);
      }

      setInvestments(allInvestments);

      // Load issuer's assets from database
      let issuerAssets: Asset[] = [];
      try {
        const assetsResponse = await databaseService.getAssets({ 
          issuerId: currentUser.id,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        if (assetsResponse.success && assetsResponse.data) {
          issuerAssets = assetsResponse.data.items;
        }
      } catch (dbError) {
        console.log('Database not available, using local assets');
        // Fallback to local assets
        issuerAssets = await assetService.getAssets();
      }

      setAssets(issuerAssets);

      // Calculate stats
      const totalRaised = allInvestments
        .filter(inv => inv.status === 'completed')
        .reduce((sum, inv) => sum + inv.amount, 0);
      
      const activeInvestors = new Set(
        allInvestments
          .filter(inv => inv.status === 'completed' || inv.status === 'pending')
          .map(inv => inv.userId)
      ).size;

      const pendingKyc = allInvestments.filter(inv => 
        inv.status === 'pending' && inv.kycRequired && !inv.kycCompleted
      ).length;

      const totalValue = issuerAssets.reduce((sum, asset) => sum + (parseFloat(asset.value.replace(/[$,]/g, '')) || 0), 0);

      setStats({
        totalInvestments: allInvestments.length,
        totalRaised,
        activeInvestors,
        pendingKyc,
        assetsCreated: issuerAssets.length,
        assetsUnderManagement: totalValue,
        totalValue
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-soft-white">
      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Issuer Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.firstName}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user.company}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center">
                <Icon name="building" className="text-white text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Tooltip content="Total amount raised from completed investments across all your assets">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="chart-line" className="text-blue-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Raised</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRaised.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Tooltip>

          <Tooltip content="Number of unique investors who have made completed or pending investments in your assets">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="users" className="text-green-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Investors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeInvestors}</p>
                </div>
              </div>
            </div>
          </Tooltip>

          <Tooltip content="Total number of investment transactions across all your assets, including completed, pending, and rejected">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="document-text" className="text-purple-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Investments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalInvestments}</p>
                </div>
              </div>
            </div>
          </Tooltip>

          <Tooltip content="Number of investment applications waiting for KYC verification before they can be processed">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Icon name="clock" className="text-orange-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending KYC</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingKyc}</p>
                </div>
              </div>
            </div>
          </Tooltip>

          <Tooltip content="Total number of assets you have created and tokenized on the platform">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Icon name="building" className="text-indigo-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assets Created</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.assetsCreated}</p>
                </div>
              </div>
            </div>
          </Tooltip>

          <Tooltip content="Total value of all your assets currently being managed on the platform">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-help">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Icon name="chart-bar" className="text-teal-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assets Under Management</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.assetsUnderManagement.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Tooltip>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tooltip content="Create and tokenize a new asset to attract investors and raise capital">
              <button 
                onClick={() => router.push('/issuer/assets/create')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                <div className="w-10 h-10 bg-global-teal/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name="plus" className="text-global-teal text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Create New Asset</p>
                  <p className="text-sm text-gray-600">Tokenize a new asset</p>
                </div>
              </button>
            </Tooltip>

            <Tooltip content="View and manage all investors who have invested in your assets, including their KYC status and investment history">
              <button 
                onClick={() => router.push('/issuer/investors')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                <div className="w-10 h-10 bg-edge-purple/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name="users" className="text-edge-purple text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Manage Investors</p>
                  <p className="text-sm text-gray-600">View and manage investors</p>
                </div>
              </button>
            </Tooltip>

            <Tooltip content="Customize your issuer portal with your company branding, colors, and contact information">
              <button 
                onClick={() => router.push('/issuer/branding')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name="cog" className="text-blue-500 text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Branding Settings</p>
                  <p className="text-sm text-gray-600">Customize your portal</p>
                </div>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Recent Investments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <Tooltip content="Latest investment transactions in your assets, showing status and amounts">
              <h2 className="text-xl font-semibold text-gray-900 cursor-help">Recent Investments</h2>
            </Tooltip>
          </div>
          <div className="p-6">
            {investments.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="inbox" className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
                <p className="text-gray-600">Start by creating your first asset to attract investors.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {investments.slice(0, 5).map((investment) => (
                  <InvestmentItem key={investment.id} investment={investment} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
