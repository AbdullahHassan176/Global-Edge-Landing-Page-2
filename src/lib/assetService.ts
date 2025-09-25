// Asset Service for managing dynamic assets
// In production, this would integrate with your database

export interface Asset {
  id: string;
  name: string;
  type: 'container' | 'property' | 'inventory' | 'vault';
  apr: string;
  risk: 'Low' | 'Medium' | 'High';
  value: string;
  route: string;
  cargo: string;
  image?: string;
  description?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface AssetFilters {
  type?: string;
  risk?: string;
  status?: string;
  search?: string;
}

class AssetService {
  private assets: Asset[] = [];
  private storageKey = 'global-edge-assets';

  constructor() {
    console.log('AssetService constructor called');
    // Initialize with default assets immediately
    this.initializeDefaultAssets();
    console.log('Default assets initialized, count:', this.assets.length);
    // Then try to load from localStorage if available
    this.loadAssets();
    console.log('AssetService constructor completed, final asset count:', this.assets.length);
  }

  // Load assets from localStorage (in production, this would be from database)
  private loadAssets() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          this.assets = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Error loading assets from localStorage:', error);
        // Keep default assets if localStorage fails
      }
    }
  }

  // Save assets to localStorage (in production, this would be to database)
  private saveAssets() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.assets));
    }
  }

  // Initialize with default UAE assets
  private initializeDefaultAssets() {
    this.assets = [
      {
        id: '1',
        name: 'Jebel Ali-Dubai Container',
        type: 'container',
        apr: '12.5%',
        risk: 'Medium',
        value: '$45,000',
        route: 'Jebel Ali Port → Dubai',
        cargo: 'Electronics & Luxury Goods',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=192&fit=crop&crop=center',
        description: 'High-value electronics and luxury goods container route from Jebel Ali Port to Dubai.',
        status: 'active',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Abu Dhabi-Rotterdam Container',
        type: 'container',
        apr: '11.8%',
        risk: 'Medium',
        value: '$38,000',
        route: 'Abu Dhabi → Rotterdam',
        cargo: 'Petrochemicals & Oil Products',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=192&fit=crop&crop=center',
        description: 'Petrochemicals and oil products container route from Abu Dhabi to Rotterdam.',
        status: 'active',
        createdAt: '2024-01-10T14:30:00Z',
        updatedAt: '2024-01-10T14:30:00Z'
      },
      {
        id: '3',
        name: 'Dubai Marina Office Tower',
        type: 'property',
        apr: '8.2%',
        risk: 'Low',
        value: '$350,000',
        route: 'Dubai Marina, UAE',
        cargo: 'Commercial Real Estate',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=192&fit=crop&crop=center',
        description: 'Premium commercial office space in Dubai Marina with high rental yields.',
        status: 'active',
        createdAt: '2024-01-08T09:15:00Z',
        updatedAt: '2024-01-08T09:15:00Z'
      },
      {
        id: '4',
        name: 'Abu Dhabi Corniche Residential',
        type: 'property',
        apr: '9.5%',
        risk: 'Low',
        value: '$280,000',
        route: 'Abu Dhabi Corniche, UAE',
        cargo: 'Residential Real Estate',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=192&fit=crop&crop=center',
        description: 'Luxury residential properties along Abu Dhabi Corniche with waterfront views.',
        status: 'active',
        createdAt: '2024-01-05T16:45:00Z',
        updatedAt: '2024-01-05T16:45:00Z'
      },
      {
        id: '5',
        name: 'Dubai Gold Souk Inventory',
        type: 'inventory',
        apr: '15.1%',
        risk: 'High',
        value: '$25,000',
        route: 'Dubai Gold Souk, UAE',
        cargo: 'Gold & Precious Metals',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=192&fit=crop&crop=center',
        description: 'Premium gold and precious metals inventory from Dubai Gold Souk.',
        status: 'active',
        createdAt: '2024-01-12T11:20:00Z',
        updatedAt: '2024-01-12T11:20:00Z'
      },
      {
        id: '6',
        name: 'Sharjah Textile Market',
        type: 'inventory',
        apr: '13.2%',
        risk: 'Medium',
        value: '$18,000',
        route: 'Sharjah, UAE',
        cargo: 'Traditional Textiles & Fabrics',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=192&fit=crop&crop=center',
        description: 'Traditional textiles and fabrics from Sharjah textile markets.',
        status: 'active',
        createdAt: '2024-01-14T13:30:00Z',
        updatedAt: '2024-01-14T13:30:00Z'
      },
      {
        id: '7',
        name: 'Dubai International Vault',
        type: 'vault',
        apr: '6.8%',
        risk: 'Low',
        value: '$20,000',
        route: 'Dubai International Financial Centre',
        cargo: 'Gold & Precious Metals',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=192&fit=crop&crop=center',
        description: 'Secure vault storage for gold and precious metals at DIFC.',
        status: 'active',
        createdAt: '2024-01-07T08:00:00Z',
        updatedAt: '2024-01-07T08:00:00Z'
      },
      {
        id: '8',
        name: 'Abu Dhabi Diamond Vault',
        type: 'vault',
        apr: '7.5%',
        risk: 'Low',
        value: '$15,000',
        route: 'Abu Dhabi Global Market',
        cargo: 'Diamonds & Precious Stones',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=192&fit=crop&crop=center',
        description: 'High-security vault for diamonds and precious stones at ADGM.',
        status: 'active',
        createdAt: '2024-01-09T12:15:00Z',
        updatedAt: '2024-01-09T12:15:00Z'
      }
    ];
    this.saveAssets();
  }

  // Get all assets with optional filtering
  async getAssets(filters?: AssetFilters): Promise<Asset[]> {
    let filteredAssets = [...this.assets];

    if (filters) {
      if (filters.type && filters.type !== 'all') {
        filteredAssets = filteredAssets.filter(asset => asset.type === filters.type);
      }

      if (filters.risk) {
        filteredAssets = filteredAssets.filter(asset => asset.risk === filters.risk);
      }

      if (filters.status) {
        filteredAssets = filteredAssets.filter(asset => asset.status === filters.status);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredAssets = filteredAssets.filter(asset =>
          asset.name.toLowerCase().includes(searchTerm) ||
          asset.route.toLowerCase().includes(searchTerm) ||
          asset.cargo.toLowerCase().includes(searchTerm)
        );
      }
    }

    // Only return active assets for public view
    return filteredAssets.filter(asset => asset.status === 'active');
  }

  // Get asset by ID
  async getAssetById(id: string): Promise<Asset | null> {
    console.log('AssetService.getAssetById called with ID:', id);
    console.log('Available assets:', this.assets.map(a => ({ id: a.id, name: a.name })));
    const result = this.assets.find(asset => asset.id === id) || null;
    console.log('AssetService.getAssetById result:', result);
    return result;
  }

  // Get assets by category (for the assets page)
  async getAssetsByCategory(category: string): Promise<Asset[]> {
    const filters: AssetFilters = {};
    
    if (category !== 'all') {
      filters.type = category;
    }

    return this.getAssets(filters);
  }

  // Add new asset (admin only)
  async addAsset(assetData: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Promise<Asset> {
    const newAsset: Asset = {
      ...assetData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.assets.push(newAsset);
    this.saveAssets();
    return newAsset;
  }

  // Update asset (admin only)
  async updateAsset(id: string, updates: Partial<Asset>): Promise<Asset | null> {
    const index = this.assets.findIndex(asset => asset.id === id);
    
    if (index === -1) {
      return null;
    }

    this.assets[index] = {
      ...this.assets[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveAssets();
    return this.assets[index];
  }

  // Delete asset (admin only)
  async deleteAsset(id: string): Promise<boolean> {
    const index = this.assets.findIndex(asset => asset.id === id);
    
    if (index === -1) {
      return false;
    }

    this.assets.splice(index, 1);
    this.saveAssets();
    return true;
  }

  // Get asset statistics
  async getAssetStats(): Promise<{
    total: number;
    byType: Record<string, number>;
    byRisk: Record<string, number>;
    totalValue: number;
  }> {
    const activeAssets = this.assets.filter(asset => asset.status === 'active');
    
    const byType = activeAssets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byRisk = activeAssets.reduce((acc, asset) => {
      acc[asset.risk] = (acc[asset.risk] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalValue = activeAssets.reduce((sum, asset) => {
      const value = parseFloat(asset.value.replace(/[$,]/g, ''));
      return sum + value;
    }, 0);

    return {
      total: activeAssets.length,
      byType,
      byRisk,
      totalValue
    };
  }

  // Get all assets for admin (including inactive)
  async getAllAssetsForAdmin(): Promise<Asset[]> {
    return [...this.assets];
  }
}

// Export singleton instance
export const assetService = new AssetService();
