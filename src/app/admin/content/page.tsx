'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import Link from 'next/link';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'asset' | 'blog' | 'announcement' | 'document' | 'faq' | 'testimonial';
  status: 'published' | 'draft' | 'archived' | 'pending_review';
  lastModified: string;
  author: string;
  views?: number;
  category?: string;
  content?: string;
  excerpt?: string;
  tags?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  publishDate?: string;
  expiryDate?: string;
}

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'audio' | 'other';
  size: string;
  uploadedAt: string;
  url: string;
  usedIn: string[];
  altText?: string;
  description?: string;
  dimensions?: string;
  format?: string;
}

// Enhanced mock content data with more realistic blog content
const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Homepage Hero Section',
    type: 'page',
    status: 'published',
    lastModified: '2024-12-15T10:30:00Z',
    author: 'Admin User',
    views: 15420,
    category: 'Marketing',
    content: 'This is the main hero section content for the homepage...',
    excerpt: 'Welcome to Global Edge - Your gateway to tokenized investments',
    tags: ['hero', 'homepage', 'marketing'],
    featured: true,
    seoTitle: 'Global Edge - Tokenized Investment Platform',
    seoDescription: 'Invest in tokenized assets with Global Edge',
    publishDate: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'The Future of Tokenized Real Estate Investments',
    type: 'blog',
    status: 'published',
    lastModified: '2024-12-14T15:45:00Z',
    author: 'Content Team',
    views: 8930,
    category: 'Education',
    content: `# The Future of Tokenized Real Estate Investments

## Introduction

Tokenized real estate represents a revolutionary shift in how we think about property investment. By breaking down traditional real estate assets into digital tokens, investors can now access previously inaccessible markets with unprecedented flexibility.

## What is Tokenization?

Tokenization is the process of converting rights to an asset into a digital token on a blockchain. In real estate, this means:

- **Fractional Ownership**: Investors can own a portion of a property
- **Liquidity**: Tokens can be traded on secondary markets
- **Transparency**: All transactions are recorded on the blockchain
- **Accessibility**: Lower minimum investment thresholds

## Benefits for Investors

### 1. Diversification
Tokenized real estate allows investors to diversify their portfolios across multiple properties and locations without the need for large capital outlays.

### 2. Liquidity
Unlike traditional real estate investments, tokenized assets can be bought and sold quickly on digital exchanges.

### 3. Transparency
Blockchain technology provides complete transparency in ownership, transactions, and property performance.

### 4. Lower Barriers to Entry
With tokenization, investors can participate in high-value real estate investments with smaller amounts of capital.

## Global Edge's Approach

At Global Edge, we're pioneering the tokenization of real estate assets in the UAE and beyond. Our platform offers:

- **Curated Properties**: Carefully selected real estate assets
- **Professional Management**: Expert property management services
- **Regulatory Compliance**: Full compliance with local regulations
- **Technology Integration**: Advanced blockchain infrastructure

## Market Trends

The tokenized real estate market is experiencing rapid growth:

- **2023 Market Size**: $2.3 billion globally
- **Projected 2030**: $18.6 billion
- **Growth Rate**: 35% CAGR

## Conclusion

Tokenized real estate investments represent the future of property investment. With increased accessibility, liquidity, and transparency, this innovative approach is democratizing real estate investment and opening new opportunities for investors worldwide.

At Global Edge, we're committed to leading this transformation and providing our investors with access to the world's most promising tokenized real estate opportunities.`,
    excerpt: 'Explore how tokenized real estate is revolutionizing property investment with increased accessibility, liquidity, and transparency.',
    tags: ['real estate', 'tokenization', 'investment', 'blockchain'],
    featured: true,
    seoTitle: 'Future of Tokenized Real Estate Investments | Global Edge',
    seoDescription: 'Discover how tokenized real estate is transforming property investment with blockchain technology',
    publishDate: '2024-12-14T15:45:00Z'
  },
  {
    id: '3',
    title: 'Understanding Container Investment Opportunities',
    type: 'blog',
    status: 'published',
    lastModified: '2024-12-13T14:20:00Z',
    author: 'Investment Team',
    views: 5670,
    category: 'Education',
    content: `# Understanding Container Investment Opportunities

## Introduction

Shipping containers have emerged as a unique and profitable investment opportunity in the global logistics and trade industry. With the rise of e-commerce and international trade, container investments offer stable returns and portfolio diversification.

## Why Invest in Containers?

### 1. Essential Infrastructure
Containers are fundamental to global trade, making them a recession-resistant investment.

### 2. Stable Returns
Container leasing typically provides consistent rental income with predictable cash flows.

### 3. Global Demand
The growing e-commerce sector and international trade drive continuous demand for container services.

### 4. Tangible Asset
Unlike many financial instruments, containers are physical assets with intrinsic value.

## Types of Container Investments

### Dry Containers
- Standard 20ft and 40ft containers
- Most common type in global trade
- Versatile for various cargo types

### Refrigerated Containers
- Temperature-controlled units
- Higher rental rates
- Essential for perishable goods

### Specialized Containers
- Tank containers for liquids
- Open-top containers for oversized cargo
- Flat rack containers for heavy machinery

## Investment Considerations

### Market Factors
- Global trade volumes
- Container supply and demand
- Shipping rates and trends
- Economic conditions

### Risk Factors
- Market volatility
- Currency fluctuations
- Regulatory changes
- Technology disruption

## Global Edge Container Program

Our container investment program offers:

- **Diversified Portfolio**: Multiple container types and routes
- **Professional Management**: Expert logistics and maintenance
- **Transparent Reporting**: Regular performance updates
- **Liquidity Options**: Secondary market trading

## Expected Returns

Based on historical data and current market conditions:

- **Annual Returns**: 8-12%
- **Rental Income**: Monthly distributions
- **Capital Appreciation**: Long-term value growth
- **Risk Level**: Moderate

## Getting Started

Investing in containers through Global Edge is simple:

1. **Account Setup**: Create your investor account
2. **Due Diligence**: Review investment materials
3. **Investment**: Choose your investment amount
4. **Monitoring**: Track performance through our platform

## Conclusion

Container investments offer a unique opportunity to participate in the global trade ecosystem while generating stable returns. With Global Edge's expertise and infrastructure, investors can access this market with confidence and transparency.`,
    excerpt: 'Discover the benefits and opportunities of investing in shipping containers as part of a diversified investment portfolio.',
    tags: ['containers', 'logistics', 'investment', 'trade'],
    featured: false,
    seoTitle: 'Container Investment Opportunities | Global Edge',
    seoDescription: 'Learn about shipping container investment opportunities and how to get started with Global Edge',
    publishDate: '2024-12-13T14:20:00Z'
  },
  {
    id: '4',
    title: 'Q4 2024 Investment Report',
    type: 'document',
    status: 'draft',
    lastModified: '2024-12-15T09:20:00Z',
    author: 'Analytics Team',
    category: 'Reports',
    content: 'This is a comprehensive quarterly investment report...',
    excerpt: 'Q4 2024 performance analysis and market insights',
    tags: ['report', 'quarterly', 'performance'],
    publishDate: '2024-12-15T09:20:00Z'
  },
  {
    id: '5',
    title: 'New Asset Launch: Dubai Marina Properties',
    type: 'announcement',
    status: 'published',
    lastModified: '2024-12-13T14:15:00Z',
    author: 'Marketing Team',
    views: 5670,
    category: 'News',
    content: 'We are excited to announce the launch of our new Dubai Marina property tokenization program...',
    excerpt: 'Exciting new investment opportunity in Dubai Marina properties',
    tags: ['announcement', 'dubai', 'marina', 'properties'],
    featured: true,
    publishDate: '2024-12-13T14:15:00Z'
  },
  {
    id: '6',
    title: 'How to Complete KYC Verification',
    type: 'faq',
    status: 'published',
    lastModified: '2024-12-12T11:30:00Z',
    author: 'Support Team',
    views: 3450,
    category: 'Support',
    content: 'Step-by-step guide to completing KYC verification on our platform...',
    excerpt: 'Complete guide to KYC verification process',
    tags: ['kyc', 'verification', 'guide'],
    publishDate: '2024-12-12T11:30:00Z'
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
    usedIn: ['Homepage', 'Landing Page'],
    altText: 'Modern city skyline representing global investments',
    description: 'Hero background image for homepage',
    dimensions: '1920x1080',
    format: 'JPEG'
  },
  {
    id: '2',
    name: 'investment-guide.pdf',
    type: 'document',
    size: '1.8 MB',
    uploadedAt: '2024-12-08T16:20:00Z',
    url: '/assets/investment-guide.pdf',
    usedIn: ['Resources Page', 'Email Campaign'],
    description: 'Comprehensive investment guide for new investors'
  },
  {
    id: '3',
    name: 'tokenization-explainer.mp4',
    type: 'video',
    size: '45.2 MB',
    uploadedAt: '2024-12-05T13:45:00Z',
    url: '/assets/tokenization-explainer.mp4',
    usedIn: ['How It Works Page'],
    description: 'Educational video explaining tokenization process',
    dimensions: '1920x1080',
    format: 'MP4'
  },
  {
    id: '4',
    name: 'testimonial-audio.mp3',
    type: 'audio',
    size: '3.2 MB',
    uploadedAt: '2024-12-07T10:15:00Z',
    url: '/assets/testimonial-audio.mp3',
    usedIn: ['Testimonials Page'],
    description: 'Audio testimonial from satisfied investor',
    format: 'MP3'
  }
];

function ContentManagementDashboard() {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [activeTab, setActiveTab] = useState<'content' | 'assets' | 'media'>('content');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived' | 'pending_review'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'page' | 'blog' | 'document' | 'announcement' | 'faq'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'views' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { notifications, addNotification, removeNotification } = useNotifications();

  // Enhanced filtering and sorting
  const filteredContent = content
    .filter(item => {
      const matchesFilter = filter === 'all' || item.status === filter;
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesType && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
          break;
        case 'views':
          comparison = (a.views || 0) - (b.views || 0);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = searchTerm === '' || 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEdit = (item: ContentItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleView = (item: ContentItem) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowAssetModal(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    // Show edit modal for assets
    addNotification({
      type: 'info',
      title: 'Asset Edit',
      message: `Edit functionality for ${asset.name} would be implemented here`,
      duration: 3000
    });
  };

  const handleDelete = (item: ContentItem) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setContent(prev => prev.filter(c => c.id !== item.id));
      addNotification({
        type: 'success',
        title: 'Content Deleted',
        message: `"${item.title}" has been deleted successfully`,
        duration: 3000
      });
    }
  };

  const handleStatusChange = (item: ContentItem, newStatus: ContentItem['status']) => {
    setContent(prev => prev.map(c => 
      c.id === item.id ? { ...c, status: newStatus } : c
    ));
    addNotification({
      type: 'success',
      title: 'Status Updated',
      message: `"${item.title}" status changed to ${newStatus.replace('_', ' ')}`,
      duration: 3000
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'pending_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return 'document-text';
      case 'blog': return 'document';
      case 'document': return 'file-alt';
      case 'announcement': return 'bell';
      case 'faq': return 'question-mark-circle';
      case 'testimonial': return 'chat-bubble-left-right';
      default: return 'document';
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return 'photo';
      case 'document': return 'document-text';
      case 'video': return 'play';
      case 'audio': return 'musical-note';
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

  const getContentStats = () => {
    const total = content.length;
    const published = content.filter(c => c.status === 'published').length;
    const draft = content.filter(c => c.status === 'draft').length;
    const pending = content.filter(c => c.status === 'pending_review').length;
    const totalViews = content.reduce((sum, c) => sum + (c.views || 0), 0);
    
    return { total, published, draft, pending, totalViews };
  };

  const stats = getContentStats();

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-soft-white">
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
                Content Management
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Manage website content, assets, and marketing materials across the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="document" className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-blue-900">{stats.total}</h3>
                <p className="text-blue-700">Total Content</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="check-circle" className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-green-900">{stats.published}</h3>
                <p className="text-green-700">Published</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="pencil" className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-yellow-900">{stats.draft}</h3>
                <p className="text-yellow-700">Drafts</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="clock" className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-blue-900">{stats.pending}</h3>
                <p className="text-blue-700">Pending Review</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="eye" className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-purple-900">{stats.totalViews.toLocaleString()}</h3>
                <p className="text-purple-700">Total Views</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'content'
                    ? 'bg-global-teal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name="document" className="mr-2" />
                Content ({content.length})
              </button>
              <button
                onClick={() => setActiveTab('assets')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'assets'
                    ? 'bg-global-teal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name="photo" className="mr-2" />
                Assets ({assets.length})
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'media'
                    ? 'bg-global-teal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name="play" className="mr-2" />
                Media Library
              </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4">
                  {activeTab === 'content' && (
                    <>
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending_review">Pending Review</option>
                        <option value="archived">Archived</option>
                      </select>
                      
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      >
                        <option value="all">All Types</option>
                        <option value="page">Pages</option>
                        <option value="blog">Blog Posts</option>
                        <option value="document">Documents</option>
                        <option value="announcement">Announcements</option>
                        <option value="faq">FAQs</option>
                      </select>
                    </>
                  )}
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                    <option value="views">Sort by Views</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Icon name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'} />
                  </button>
                </div>
                
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent w-64"
                    />
                    <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-global-teal text-white px-6 py-2 rounded-lg hover:bg-global-green transition-colors flex items-center"
                  >
                    <Icon name="plus" className="mr-2" />
                    Create New
                  </button>
                </div>
              </div>
            </div>

            {/* Content Table */}
            {activeTab === 'content' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Content</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Modified</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredContent.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mr-4">
                                <Icon name={getTypeIcon(item.type)} className="text-white text-sm" />
                              </div>
                              <div>
                                <div className="font-semibold text-charcoal flex items-center">
                                  {item.title}
                                  {item.featured && (
                                    <Icon name="star" className="ml-2 text-yellow-500 text-sm" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">{item.category}</div>
                                {item.excerpt && (
                                  <div className="text-xs text-gray-500 mt-1 max-w-md truncate">
                                    {item.excerpt}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange(item, e.target.value as ContentItem['status'])}
                              className={`px-2 py-1 rounded-full text-sm font-medium border-0 ${getStatusColor(item.status)}`}
                            >
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                              <option value="pending_review">Pending Review</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {item.views ? item.views.toLocaleString() : '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(item.lastModified)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleView(item)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleEdit(item)}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredContent.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="document" className="text-gray-400 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No content found</h3>
                    <p className="text-gray-500">No content matches your current filter criteria.</p>
                  </div>
                )}
              </div>
            )}

            {/* Assets Table */}
            {activeTab === 'assets' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Asset</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Size</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Uploaded</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Used In</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredAssets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mr-4">
                                <Icon name={getAssetTypeIcon(asset.type)} className="text-white text-sm" />
                              </div>
                              <div>
                                <div className="font-semibold text-charcoal">{asset.name}</div>
                                {asset.description && (
                                  <div className="text-sm text-gray-600">{asset.description}</div>
                                )}
                                {asset.dimensions && (
                                  <div className="text-xs text-gray-500">{asset.dimensions}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize">
                              {asset.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{formatFileSize(asset.size)}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(asset.uploadedAt)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex flex-wrap gap-1">
                              {asset.usedIn.map((usage, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                  {usage}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewAsset(asset)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleEditAsset(asset)}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => window.open(asset.url, '_blank')}
                                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                              >
                                Download
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Content View Modal */}
        {showViewModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-2xl font-poppins font-bold text-charcoal">
                  {selectedItem.title}
                </h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon name="times" className="text-xl" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Content Details</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Type:</strong> {selectedItem.type}</div>
                        <div><strong>Status:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedItem.status)}`}>
                            {selectedItem.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div><strong>Author:</strong> {selectedItem.author}</div>
                        <div><strong>Category:</strong> {selectedItem.category}</div>
                        <div><strong>Views:</strong> {selectedItem.views?.toLocaleString() || 'N/A'}</div>
                        <div><strong>Last Modified:</strong> {formatDate(selectedItem.lastModified)}</div>
                        {selectedItem.publishDate && (
                          <div><strong>Published:</strong> {formatDate(selectedItem.publishDate)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    {selectedItem.tags && selectedItem.tags.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-global-teal text-white rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedItem.seoTitle && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">SEO</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Title:</strong> {selectedItem.seoTitle}</div>
                          {selectedItem.seoDescription && (
                            <div><strong>Description:</strong> {selectedItem.seoDescription}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedItem.excerpt && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Excerpt</h4>
                    <p className="text-blue-800">{selectedItem.excerpt}</p>
                  </div>
                )}
                
                {selectedItem.content && (
                  <div className="prose max-w-none">
                    <h4 className="font-semibold text-gray-900 mb-4">Content</h4>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                        {selectedItem.content}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end p-6 border-t bg-gray-50">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Asset View Modal */}
        {showAssetModal && selectedAsset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-2xl font-poppins font-bold text-charcoal">
                  {selectedAsset.name}
                </h3>
                <button
                  onClick={() => setShowAssetModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon name="times" className="text-xl" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Asset Details</h4>
                    <div className="space-y-3 text-sm">
                      <div><strong>Name:</strong> {selectedAsset.name}</div>
                      <div><strong>Type:</strong> {selectedAsset.type}</div>
                      <div><strong>Size:</strong> {selectedAsset.size}</div>
                      <div><strong>Format:</strong> {selectedAsset.format || 'N/A'}</div>
                      {selectedAsset.dimensions && (
                        <div><strong>Dimensions:</strong> {selectedAsset.dimensions}</div>
                      )}
                      <div><strong>Uploaded:</strong> {formatDate(selectedAsset.uploadedAt)}</div>
                      {selectedAsset.altText && (
                        <div><strong>Alt Text:</strong> {selectedAsset.altText}</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Usage</h4>
                    <div className="space-y-2">
                      {selectedAsset.usedIn.map((usage, index) => (
                        <div key={index} className="flex items-center">
                          <Icon name="check-circle" className="text-green-500 mr-2" />
                          <span className="text-sm">{usage}</span>
                        </div>
                      ))}
                    </div>
                    
                    {selectedAsset.description && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-sm text-gray-600">{selectedAsset.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end p-6 border-t bg-gray-50">
                <button
                  onClick={() => window.open(selectedAsset.url, '_blank')}
                  className="bg-global-teal text-white px-6 py-2 rounded-lg hover:bg-global-green transition-colors mr-3"
                >
                  <Icon name="download" className="mr-2" />
                  Download
                </button>
                <button
                  onClick={() => setShowAssetModal(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
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

export default ContentManagementDashboard;