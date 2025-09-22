// Service to calculate dynamic metrics from existing assets

export interface AssetData {
  id: string;
  name: string;
  type: 'container' | 'property' | 'inventory' | 'vault';
  apr: string;
  risk: 'Low' | 'Medium' | 'High';
  value: string;
  route: string;
  cargo: string;
}

export interface AssetMetrics {
  totalAssetsUnderManagement: number;
  totalAssetsTokenized: number;
  onTimeDeliveryRate: number;
  averageAPR: number;
  totalValue: number;
  categoryBreakdown: {
    containers: number;
    property: number;
    tradetokens: number;
    vault: number;
  };
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

// Mock asset data - in production, this would come from your database
const mockAssets: AssetData[] = [
  // Containers (247 total)
  {
    id: '1',
    name: 'Jebel Ali-Dubai Container',
    type: 'container',
    apr: '12.5%',
    risk: 'Medium',
    value: '$45,000',
    route: 'Jebel Ali Port → Dubai',
    cargo: 'Electronics & Luxury Goods'
  },
  {
    id: '2',
    name: 'Abu Dhabi-Rotterdam Container',
    type: 'container',
    apr: '11.8%',
    risk: 'Medium',
    value: '$38,000',
    route: 'Abu Dhabi → Rotterdam',
    cargo: 'Petrochemicals & Oil Products'
  },
  {
    id: '9',
    name: 'Singapore-Rotterdam Container',
    type: 'container',
    apr: '13.8%',
    risk: 'Medium',
    value: '$42,000',
    route: 'Singapore → Rotterdam',
    cargo: 'Industrial Machinery'
  },
  // Properties (89 total)
  {
    id: '3',
    name: 'Dubai Marina Office Tower',
    type: 'property',
    apr: '8.2%',
    risk: 'Low',
    value: '$350,000',
    route: 'Dubai Marina, UAE',
    cargo: 'Commercial Real Estate'
  },
  {
    id: '4',
    name: 'Abu Dhabi Corniche Residential',
    type: 'property',
    apr: '9.5%',
    risk: 'Low',
    value: '$280,000',
    route: 'Abu Dhabi Corniche, UAE',
    cargo: 'Residential Real Estate'
  },
  {
    id: '10',
    name: 'Seattle Warehouse Complex',
    type: 'property',
    apr: '7.8%',
    risk: 'Low',
    value: '$420,000',
    route: 'Seattle, WA',
    cargo: 'Industrial Real Estate'
  },
  // TradeTokens/Inventory (156 total)
  {
    id: '5',
    name: 'Dubai Gold Souk Inventory',
    type: 'inventory',
    apr: '15.1%',
    risk: 'High',
    value: '$25,000',
    route: 'Dubai Gold Souk, UAE',
    cargo: 'Gold & Precious Metals'
  },
  {
    id: '6',
    name: 'Sharjah Textile Market',
    type: 'inventory',
    apr: '13.2%',
    risk: 'Medium',
    value: '$18,000',
    route: 'Sharjah, UAE',
    cargo: 'Traditional Textiles & Fabrics'
  },
  {
    id: '11',
    name: 'Agricultural Commodities',
    type: 'inventory',
    apr: '14.5%',
    risk: 'High',
    value: '$32,000',
    route: 'Midwest Distribution',
    cargo: 'Grain & Soybeans'
  },
  // Vault (34 total)
  {
    id: '7',
    name: 'Dubai International Vault',
    type: 'vault',
    apr: '6.8%',
    risk: 'Low',
    value: '$20,000',
    route: 'Dubai International Financial Centre',
    cargo: 'Gold & Precious Metals'
  },
  {
    id: '8',
    name: 'Abu Dhabi Diamond Vault',
    type: 'vault',
    apr: '7.5%',
    risk: 'Low',
    value: '$15,000',
    route: 'Abu Dhabi Global Market',
    cargo: 'Diamonds & Precious Stones'
  },
  {
    id: '12',
    name: 'Silver Vault Storage',
    type: 'vault',
    apr: '6.2%',
    risk: 'Low',
    value: '$12,000',
    route: 'London, UK',
    cargo: 'Precious Metals'
  }
];

export class AssetMetricsService {
  // Calculate total assets under management
  static calculateTotalAssetsUnderManagement(): number {
    // In production, this would be calculated from actual asset values
    // For now, using the known totals from the assets page
    const containerValue = 247 * 40000; // Average container value
    const propertyValue = 89 * 350000; // Average property value
    const inventoryValue = 156 * 25000; // Average inventory value
    const vaultValue = 34 * 15000; // Average vault value
    
    return containerValue + propertyValue + inventoryValue + vaultValue;
  }

  // Calculate total assets tokenized
  static calculateTotalAssetsTokenized(): number {
    return 247 + 89 + 156 + 34; // Total from all categories
  }

  // Calculate on-time delivery rate
  static calculateOnTimeDeliveryRate(): number {
    // Mock calculation - in production, this would come from actual delivery data
    return 98.7; // Based on industry standards for logistics
  }

  // Calculate average APR across all assets
  static calculateAverageAPR(): number {
    const sampleAPRs = [12.5, 11.8, 13.8, 8.2, 9.5, 7.8, 15.1, 13.2, 14.5, 6.8, 7.5, 6.2];
    const average = sampleAPRs.reduce((sum, apr) => sum + apr, 0) / sampleAPRs.length;
    return Math.round(average * 10) / 10; // Round to 1 decimal place
  }

  // Calculate total portfolio value
  static calculateTotalValue(): number {
    return this.calculateTotalAssetsUnderManagement();
  }

  // Get category breakdown
  static getCategoryBreakdown() {
    return {
      containers: 247,
      property: 89,
      tradetokens: 156,
      vault: 34
    };
  }

  // Get risk distribution
  static getRiskDistribution() {
    // Based on the sample data and typical distribution
    return {
      low: 45, // Properties and vaults are typically low risk
      medium: 40, // Most containers and some inventory
      high: 15 // Some high-risk inventory and volatile assets
    };
  }

  // Get all metrics
  static getAllMetrics(): AssetMetrics {
    return {
      totalAssetsUnderManagement: this.calculateTotalAssetsUnderManagement(),
      totalAssetsTokenized: this.calculateTotalAssetsTokenized(),
      onTimeDeliveryRate: this.calculateOnTimeDeliveryRate(),
      averageAPR: this.calculateAverageAPR(),
      totalValue: this.calculateTotalValue(),
      categoryBreakdown: this.getCategoryBreakdown(),
      riskDistribution: this.getRiskDistribution()
    };
  }

  // Format currency for display
  static formatCurrency(value: number): string {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  }

  // Format number with commas
  static formatNumber(value: number): string {
    return value.toLocaleString();
  }

  // Get sample assets for display
  static getSampleAssets(): AssetData[] {
    return mockAssets;
  }

  // Get assets by category
  static getAssetsByCategory(category: 'containers' | 'property' | 'tradetokens' | 'vault'): AssetData[] {
    const typeMap = {
      containers: 'container',
      property: 'property',
      tradetokens: 'inventory',
      vault: 'vault'
    };
    
    return mockAssets.filter(asset => asset.type === typeMap[category]);
  }
}
