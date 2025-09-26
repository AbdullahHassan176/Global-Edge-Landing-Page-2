'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { userAuthService, User } from '@/lib/userAuthService';
import { assetService, Asset } from '@/lib/assetService';
import { getAssetHealth, AssetHealth, getOracleStatusColor, getOracleStatusIcon } from '@/lib/assetHealth';

export default function IssuerAssetsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [assetHealth, setAssetHealth] = useState<Record<string, AssetHealth>>({});
  const [loadingHealth, setLoadingHealth] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'container' as Asset['type'],
    apr: '',
    risk: 'Low' as Asset['risk'],
    value: '',
    route: '',
    cargo: '',
    image: '',
    description: '',
    status: 'active' as Asset['status']
  });

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
      
      // Load assets for this issuer
      const allAssets = await assetService.getAllAssetsForAdmin();
      // Filter assets by issuer (in production, this would be done by the backend)
      setAssets(allAssets);
      
      // Load health data for each asset
      loadAssetHealth(allAssets);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAssetHealth = async (assets: Asset[]) => {
    for (const asset of assets) {
      try {
        setLoadingHealth(prev => ({ ...prev, [asset.id]: true }));
        const health = await getAssetHealth(asset.id);
        setAssetHealth(prev => ({ ...prev, [asset.id]: health }));
      } catch (error) {
        console.error(`Error loading health for asset ${asset.id}:`, error);
      } finally {
        setLoadingHealth(prev => ({ ...prev, [asset.id]: false }));
      }
    }
  };

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newAsset = await assetService.addAsset({
        ...formData,
        apr: formData.apr,
        value: formData.value
      });

      setAssets(prev => [...prev, newAsset]);
      setShowAddModal(false);
      resetForm();
      
      // Create notification for investors
      // In production, this would notify all eligible investors
      console.log('New asset created:', newAsset);
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  const handleEditAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAsset) return;

    try {
      const updatedAsset = await assetService.updateAsset(selectedAsset.id, formData);
      
      if (updatedAsset) {
        setAssets(prev => prev.map(asset => 
          asset.id === selectedAsset.id ? updatedAsset : asset
        ));
        setShowEditModal(false);
        setSelectedAsset(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  const handleDeleteAsset = async (assetId: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return;

    try {
      const success = await assetService.deleteAsset(assetId);
      
      if (success) {
        setAssets(prev => prev.filter(asset => asset.id !== assetId));
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'container',
      apr: '',
      risk: 'Low',
      value: '',
      route: '',
      cargo: '',
      image: '',
      description: '',
      status: 'active'
    });
  };

  const openEditModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setFormData({
      name: asset.name,
      type: asset.type,
      apr: asset.apr,
      risk: asset.risk,
      value: asset.value,
      route: asset.route,
      cargo: asset.cargo,
      image: asset.image || '',
      description: asset.description || '',
      status: asset.status
    });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assets...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access asset management.</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
              <p className="text-gray-600 mt-1">Manage your tokenized assets and investment opportunities</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-global-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-global-teal-dark transition-colors flex items-center"
            >
              <Icon name="plus" className="mr-2" />
              Add New Asset
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="building" className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="check-circle" className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Assets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assets.filter(asset => asset.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="clock" className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Assets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assets.filter(asset => asset.status === 'pending').length}
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
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${assets.reduce((sum, asset) => sum + parseInt(asset.value.replace(/[^0-9]/g, '') || '0'), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Your Assets</h2>
              {/* Health Badge Legend */}
              <div className="flex items-center space-x-4 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-100 border border-green-200"></div>
                  <span>Oracle: Green=OK, Amber=Stale, Red=Error</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200"></div>
                  <span>Docs: Count of attached documents</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
                  <span>Exceptions: Open issues count</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            {assets.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="inbox" className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assets yet</h3>
                <p className="text-gray-600 mb-6">Create your first tokenized asset to start attracting investors.</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-global-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-global-teal-dark transition-colors"
                >
                  Create Your First Asset
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset) => (
                  <div key={asset.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{asset.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{asset.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        asset.status === 'active' ? 'bg-green-100 text-green-800' :
                        asset.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {asset.status}
                      </span>
                    </div>

                    {/* Health Badges */}
                    {!loadingHealth[asset.id] && assetHealth[asset.id] && (
                      <div className="flex items-center space-x-2 mb-4">
                        {/* Oracle Badge */}
                        <div 
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getOracleStatusColor(assetHealth[asset.id].oracle.status)}`}
                          title={`Oracle: ${assetHealth[asset.id].oracle.status === 'ok' ? 'Verified within 24h' : assetHealth[asset.id].oracle.status === 'stale' ? 'Last verified 24-48h ago' : 'No recent verification'} (Nonce: ${assetHealth[asset.id].oracle.lastNonce})`}
                        >
                          <Icon 
                            name={getOracleStatusIcon(assetHealth[asset.id].oracle.status)} 
                            className="w-3 h-3 mr-1" 
                          />
                          Oracle
                        </div>
                        
                        {/* Docs Badge */}
                        <div 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                          title={`${assetHealth[asset.id].docsCount} document${assetHealth[asset.id].docsCount !== 1 ? 's' : ''} attached`}
                        >
                          <Icon name="document-text" className="w-3 h-3 mr-1" />
                          {assetHealth[asset.id].docsCount}
                        </div>
                        
                        {/* Exceptions Badge */}
                        <div 
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                            assetHealth[asset.id].exceptionsCount > 0 
                              ? 'bg-red-100 text-red-800 border-red-200' 
                              : 'bg-green-100 text-green-800 border-green-200'
                          }`}
                          title={`${assetHealth[asset.id].exceptionsCount} open exception${assetHealth[asset.id].exceptionsCount !== 1 ? 's' : ''}`}
                        >
                          <Icon 
                            name={assetHealth[asset.id].exceptionsCount > 0 ? 'exclamation-triangle' : 'check-circle'} 
                            className="w-3 h-3 mr-1" 
                          />
                          {assetHealth[asset.id].exceptionsCount}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">APR:</span>
                        <span className="font-medium">{asset.apr}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Value:</span>
                        <span className="font-medium">{asset.value}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Risk:</span>
                        <span className={`font-medium ${
                          asset.risk === 'Low' ? 'text-green-600' :
                          asset.risk === 'Medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {asset.risk}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.location.href = `/assets/${asset.id}`}
                        className="flex-1 bg-global-teal text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => openEditModal(asset)}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAsset(asset.id)}
                        className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Asset</h2>
            </div>
            <form onSubmit={handleAddAsset} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Asset['type'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  >
                    <option value="container">Container</option>
                    <option value="property">Property</option>
                    <option value="inventory">Inventory</option>
                    <option value="vault">Vault</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">APR (%)</label>
                  <input
                    type="text"
                    value={formData.apr}
                    onChange={(e) => setFormData(prev => ({ ...prev, apr: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                  <select
                    value={formData.risk}
                    onChange={(e) => setFormData(prev => ({ ...prev, risk: e.target.value as Asset['risk'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Value</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="$100,000"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route/Location</label>
                  <input
                    type="text"
                    value={formData.route}
                    onChange={(e) => setFormData(prev => ({ ...prev, route: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo/Description</label>
                  <input
                    type="text"
                    value={formData.cargo}
                    onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-global-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-global-teal-dark transition-colors"
                >
                  Create Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Asset Modal */}
      {showEditModal && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Asset</h2>
            </div>
            <form onSubmit={handleEditAsset} className="p-6 space-y-4">
              {/* Same form fields as Add Asset Modal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Asset['type'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  >
                    <option value="container">Container</option>
                    <option value="property">Property</option>
                    <option value="inventory">Inventory</option>
                    <option value="vault">Vault</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">APR (%)</label>
                  <input
                    type="text"
                    value={formData.apr}
                    onChange={(e) => setFormData(prev => ({ ...prev, apr: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                  <select
                    value={formData.risk}
                    onChange={(e) => setFormData(prev => ({ ...prev, risk: e.target.value as Asset['risk'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Value</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="$100,000"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route/Location</label>
                  <input
                    type="text"
                    value={formData.route}
                    onChange={(e) => setFormData(prev => ({ ...prev, route: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo/Description</label>
                  <input
                    type="text"
                    value={formData.cargo}
                    onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Asset['status'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedAsset(null);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-global-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-global-teal-dark transition-colors"
                >
                  Update Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
