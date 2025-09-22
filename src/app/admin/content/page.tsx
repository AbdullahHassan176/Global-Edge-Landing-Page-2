'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import Link from 'next/link';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'asset' | 'blog' | 'announcement' | 'document';
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
  views?: number;
  category?: string;
}

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'other';
  size: string;
  uploadedAt: string;
  url: string;
  usedIn: string[];
}

// Mock content data
const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Homepage Hero Section',
    type: 'page',
    status: 'published',
    lastModified: '2024-12-15T10:30:00Z',
    author: 'Admin User',
    views: 15420,
    category: 'Marketing'
  },
  {
    id: '2',
    title: 'How Tokenization Works',
    type: 'blog',
    status: 'published',
    lastModified: '2024-12-14T15:45:00Z',
    author: 'Content Team',
    views: 8930,
    category: 'Education'
  },
  {
    id: '3',
    title: 'Q4 2024 Investment Report',
    type: 'document',
    status: 'draft',
    lastModified: '2024-12-15T09:20:00Z',
    author: 'Analytics Team',
    category: 'Reports'
  },
  {
    id: '4',
    title: 'New Asset Launch Announcement',
    type: 'announcement',
    status: 'published',
    lastModified: '2024-12-13T14:15:00Z',
    author: 'Marketing Team',
    views: 5670,
    category: 'News'
  }
];

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'hero-background.jpg',
    type: 'image',
    size: '2.4 MB',
    uploadedAt: '2024-12-10T11:30:00Z',
    url: '/assets/hero-background.jpg',
    usedIn: ['Homepage', 'Landing Page']
  },
  {
    id: '2',
    name: 'investment-guide.pdf',
    type: 'document',
    size: '1.8 MB',
    uploadedAt: '2024-12-08T16:20:00Z',
    url: '/assets/investment-guide.pdf',
    usedIn: ['Resources Page', 'Email Campaign']
  },
  {
    id: '3',
    name: 'tokenization-explainer.mp4',
    type: 'video',
    size: '45.2 MB',
    uploadedAt: '2024-12-05T13:45:00Z',
    url: '/assets/tokenization-explainer.mp4',
    usedIn: ['How It Works Page']
  }
];

function ContentManagementDashboard() {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [activeTab, setActiveTab] = useState<'content' | 'assets' | 'media'>('content');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const filteredContent = content.filter(item => 
    filter === 'all' || item.status === filter
  );

  const handleEdit = (item: ContentItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleView = (item: ContentItem) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleViewAsset = (asset: Asset) => {
    // For assets, we'll show a different modal or redirect
    window.open(asset.url, '_blank');
  };

  const handleEditAsset = (asset: Asset) => {
    // For assets, we'll show edit modal or redirect to asset management
    console.log('Edit asset:', asset);
    alert(`Edit functionality for ${asset.name} would be implemented here`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return 'document-text';
      case 'blog': return 'document';
      case 'document': return 'file-alt';
      case 'announcement': return 'bell';
      default: return 'document';
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return 'photo';
      case 'document': return 'document-text';
      case 'video': return 'play';
      default: return 'document';
    }
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

  const formatFileSize = (size: string) => {
    return size;
  };

  return (
    <div className="min-h-screen bg-soft-white">
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
              Content Management
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Manage website content, assets, and marketing materials across the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Content Management Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="document-text" className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">{content.length}</h3>
                  <p className="text-gray-600">Total Content</p>
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
                    {content.filter(c => c.status === 'published').length}
                  </h3>
                  <p className="text-gray-600">Published</p>
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
                    {content.filter(c => c.status === 'draft').length}
                  </h3>
                  <p className="text-gray-600">Drafts</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="photo" className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">{assets.length}</h3>
                  <p className="text-gray-600">Assets</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            {[
              { key: 'content', label: 'Content', count: content.length },
              { key: 'assets', label: 'Assets', count: assets.length },
              { key: 'media', label: 'Media Library', count: assets.filter(a => a.type === 'image' || a.type === 'video').length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-global-teal text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Content Tab */}
          {activeTab === 'content' && (
            <>
              {/* Content Filters and Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-4">
                    {[
                      { key: 'all', label: 'All Content', count: content.length },
                      { key: 'published', label: 'Published', count: content.filter(c => c.status === 'published').length },
                      { key: 'draft', label: 'Drafts', count: content.filter(c => c.status === 'draft').length },
                      { key: 'archived', label: 'Archived', count: content.filter(c => c.status === 'archived').length }
                    ].map(({ key, label, count }) => (
                      <button
                        key={key}
                        onClick={() => setFilter(key as any)}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                          filter === key
                            ? 'bg-edge-purple text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {label} ({count})
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-global-teal text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors"
                  >
                    <Icon name="plus" className="mr-2" />
                    Create Content
                  </button>
                </div>
              </div>

              {/* Content List */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Content</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Modified</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredContent.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                <Icon name={getTypeIcon(item.type)} className="text-gray-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-charcoal">{item.title}</div>
                                <div className="text-sm text-gray-600">{item.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{formatDate(item.lastModified)}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {item.views ? item.views.toLocaleString() : '-'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEdit(item)}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleView(item)}
                                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                              >
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
            </>
          )}

          {/* Assets Tab */}
          {activeTab === 'assets' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset) => (
                <div key={asset.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <Icon name={getAssetTypeIcon(asset.type)} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal truncate">{asset.name}</h3>
                      <p className="text-sm text-gray-600">{asset.type} • {formatFileSize(asset.size)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Uploaded:</span> {formatDate(asset.uploadedAt)}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Used in:</span> {asset.usedIn.join(', ')}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewAsset(asset)}
                      className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleEditAsset(asset)}
                      className="flex-1 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Media Library Tab */}
          {activeTab === 'media' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {assets.filter(asset => asset.type === 'image' || asset.type === 'video').map((asset) => (
                <div key={asset.id} className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Icon name={getAssetTypeIcon(asset.type)} className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="font-semibold text-charcoal text-sm truncate mb-2">{asset.name}</h3>
                  <p className="text-xs text-gray-600 mb-3">{formatFileSize(asset.size)}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors">
                      Use
                    </button>
                    <button className="flex-1 px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredContent.length === 0 && activeTab === 'content' && (
            <div className="text-center py-12">
              <Icon name="document-text" className="text-gray-400 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No content found</h3>
              <p className="text-gray-500">No content matches your current filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">Create New Content</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent">
                  <option value="page">Page</option>
                  <option value="blog">Blog Post</option>
                  <option value="document">Document</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="Enter content title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  placeholder="Enter category"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Edit Content</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  defaultValue={selectedItem.title}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  defaultValue={selectedItem.type}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal"
                >
                  <option value="page">Page</option>
                  <option value="asset">Asset</option>
                  <option value="blog">Blog</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  defaultValue={selectedItem.status}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={6}
                  placeholder="Enter content here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-global-teal"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">View Content</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-charcoal mb-2">{selectedItem.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedItem.status)}`}>
                    {selectedItem.status}
                  </span>
                  <span>{selectedItem.type}</span>
                  <span>By {selectedItem.author}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
                  <p className="text-charcoal">{formatDate(selectedItem.lastModified)}</p>
                </div>
                {selectedItem.views && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Views</label>
                    <p className="text-charcoal">{selectedItem.views.toLocaleString()}</p>
                  </div>
                )}
                {selectedItem.category && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <p className="text-charcoal">{selectedItem.category}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Preview</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    This is a preview of the content. In a real application, this would show the actual content.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-full bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContentManagementPage() {
  return (
    <AdminAuthGuard requiredPermissions={['view_content']}>
      <ContentManagementDashboard />
    </AdminAuthGuard>
  );
}
