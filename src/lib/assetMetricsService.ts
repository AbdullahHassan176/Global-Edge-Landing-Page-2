// Service to calculate dynamic metrics from existing assets
import { assetIntegration } from './integration/assetIntegration';

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
    cargo: 'Electronics & Luxury Goods',
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
  },
  {
    id: '9',
    name: 'Singapore-Rotterdam Container',
    type: 'container',
    apr: '13.8%',
    risk: 'Medium',
    value: '$42,000',
    route: 'Singapore → Rotterdam',
    cargo: 'Industrial Machinery',
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
    cargo: 'Commercial Real Estate',
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
  },
  {
    id: '10',
    name: 'Seattle Warehouse Complex',
    type: 'property',
    apr: '7.8%',
    risk: 'Low',
    value: '$420,000',
    route: 'Seattle, WA',
    cargo: 'Industrial Real Estate',
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
    cargo: 'Gold & Precious Metals',
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
  },
  {
    id: '11',
    name: 'Agricultural Commodities',
    type: 'inventory',
    apr: '14.5%',
    risk: 'High',
    value: '$32,000',
    route: 'Midwest Distribution',
    cargo: 'Grain & Soybeans',
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
    cargo: 'Gold & Precious Metals',
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
  },
  {
    id: '12',
    name: 'Silver Vault Storage',
    type: 'vault',
    apr: '6.2%',
    risk: 'Low',
    value: '$12,000',
    route: 'London, UK',
    cargo: 'Precious Metals',
  },
];

export class AssetMetricsService {
  // Calculate total assets under management
  static async calculateTotalAssetsUnderManagement(): Promise<number> {
    try {
      const result = await assetIntegration.getAssets();
      if (result.success && result.assets) {
        return result.assets.reduce((total, asset) => {
          const value = parseFloat(asset.value.replace(/[^0-9.-]+/g, '')) || 0;
          return total + value;
        }, 0);
      }
    } catch (error) {
      console.log('Using fallback calculation for assets under management');
    }

    return 0;
  }

  // Calculate total assets tokenized
  static async calculateTotalAssetsTokenized(): Promise<number> {
    try {
      const result = await assetIntegration.getAssets();
      if (result.success && result.assets) {
        return result.assets.length;
      }
    } catch (error) {
      console.log('Using fallback calculation for assets tokenized');
    }

    return 0;
  }

  // Calculate on-time delivery rate
  static calculateOnTimeDeliveryRate(): number {
    return 0;
  }

  // Calculate average APR across all assets
  static async calculateAverageAPR(): Promise<number> {
    try {
      const result = await assetIntegration.getAssets();
      if (result.success && result.assets && result.assets.length > 0) {
        const totalAPR = result.assets.reduce((sum, asset) => {
          const apr = parseFloat(asset.apr.replace('%', '')) || 0;
          return sum + apr;
        }, 0);
        return Math.round((totalAPR / result.assets.length) * 10) / 10;
      }
    } catch (error) {
      console.log('Using fallback calculation for average APR');
    }

    return 0;
  }

  // Calculate total portfolio value
  static async calculateTotalValue(): Promise<number> {
    return await this.calculateTotalAssetsUnderManagement();
  }

  // Get category breakdown
  static async getCategoryBreakdown() {
    try {
      const result = await assetIntegration.getAssets();
      if (result.success && result.assets) {
        const breakdown = {
          containers: 0,
          property: 0,
          tradetokens: 0,
          vault: 0,
        };

        result.assets.forEach(asset => {
          if (asset.type === 'container') breakdown.containers++;
          else if (asset.type === 'property') breakdown.property++;
          else if (asset.type === 'inventory') breakdown.tradetokens++;
          else if (asset.type === 'vault') breakdown.vault++;
        });

        return breakdown;
      }
    } catch (error) {
      console.log('Using fallback category breakdown');
    }

    return {
      containers: 0,
      property: 0,
      tradetokens: 0,
      vault: 0,
    };
  }

  // Get risk distribution
  static async getRiskDistribution() {
    try {
      const result = await assetIntegration.getAssets();
      if (result.success && result.assets) {
        const distribution = { low: 0, medium: 0, high: 0 };

        result.assets.forEach(asset => {
          const risk = asset.risk.toLowerCase();
          if (risk === 'low') distribution.low++;
          else if (risk === 'medium') distribution.medium++;
          else if (risk === 'high') distribution.high++;
        });

        return distribution;
      }
    } catch (error) {
      console.log('Using fallback risk distribution');
    }

    return { low: 0, medium: 0, high: 0 };
  }

  // Get all metrics with timeout protection
  static async getAllMetrics(): Promise<AssetMetrics> {
    try {
      // Add timeout to prevent hanging
      const metricsPromise = Promise.all([
        this.calculateTotalAssetsUnderManagement(),
        this.calculateTotalAssetsTokenized(),
        this.calculateAverageAPR(),
        this.calculateTotalValue(),
        this.getCategoryBreakdown(),
        this.getRiskDistribution(),
      ]);

      const [
        totalAssetsUnderManagement,
        totalAssetsTokenized,
        averageAPR,
        totalValue,
        categoryBreakdown,
        riskDistribution,
      ] = (await Promise.race([
        metricsPromise,
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Metrics calculation timeout')),
            2000
          )
        ),
      ])) as any;

      return {
        totalAssetsUnderManagement,
        totalAssetsTokenized,
        onTimeDeliveryRate: this.calculateOnTimeDeliveryRate(),
        averageAPR,
        totalValue,
        categoryBreakdown,
        riskDistribution,
      };
    } catch (error) {
      console.log('Metrics calculation failed, using fallback:', error);
      // Return fallback metrics
      return {
        totalAssetsUnderManagement: 0,
        totalAssetsTokenized: 0,
        onTimeDeliveryRate: 0,
        averageAPR: 0,
        totalValue: 0,
        categoryBreakdown: {
          containers: 0,
          property: 0,
          tradetokens: 0,
          vault: 0,
        },
        riskDistribution: { low: 0, medium: 0, high: 0 },
      };
    }
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
  static getAssetsByCategory(
    category: 'containers' | 'property' | 'tradetokens' | 'vault'
  ): AssetData[] {
    const typeMap = {
      containers: 'container',
      property: 'property',
      tradetokens: 'inventory',
      vault: 'vault',
    };

    return mockAssets.filter(asset => asset.type === typeMap[category]);
  }
}
