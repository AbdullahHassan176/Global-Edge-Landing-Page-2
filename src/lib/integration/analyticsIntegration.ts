/**
 * Analytics Integration
 * 
 * This service integrates analytics data with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { userAuthService } from '@/lib/userAuthService';
import { assetService } from '@/lib/assetService';
import { AssetMetricsService } from '@/lib/assetMetricsService';

export class AnalyticsIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Get comprehensive analytics data with database integration
   */
  async getAnalyticsData(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      let users: any[] = [];
      let assets: any[] = [];
      let investments: any[] = [];

      if (this.useDatabase) {
        // Try to get data from database
        try {
          const [usersResult, assetsResult, investmentsResult] = await Promise.all([
            workingDatabaseService.getUsers(),
            workingDatabaseService.getAssets(),
            workingDatabaseService.getInvestments()
          ]);

          if (usersResult.success && usersResult.data) {
            users = usersResult.data.items || [];
          }
          if (assetsResult.success && assetsResult.data) {
            assets = assetsResult.data.items || [];
          }
          if (investmentsResult.success && investmentsResult.data) {
            investments = investmentsResult.data.items || [];
          }

          // If we got some data from database, use it
          if (users.length > 0 || assets.length > 0 || investments.length > 0) {
            console.log('Analytics: Using database data');
          } else {
            throw new Error('No database data available');
          }
        } catch (dbError) {
          console.log('Analytics: Database unavailable, falling back to mock data');
          // Fallback to mock data
          users = userAuthService.getAllUsers();
          assets = assetService.getAssets();
          investments = userAuthService.getInvestments();
        }
      } else {
        // Use mock data
        users = userAuthService.getAllUsers();
        assets = assetService.getAssets();
        investments = userAuthService.getInvestments();
      }

      // Get metrics (always from mock for now as it's calculated data)
      const mockMetrics = AssetMetricsService.getMetrics();

      const analyticsData = {
        ...this.calculateAnalytics(users, assets, investments),
        metrics: mockMetrics,
        dataSource: this.useDatabase ? 'database' : 'mock'
      };

      return { success: true, data: analyticsData };
    } catch (error) {
      console.error('Get analytics data error:', error);
      return { success: false, error: 'Failed to get analytics data' };
    }
  }

  /**
   * Calculate analytics from raw data
   */
  private calculateAnalytics(users: any[], assets: any[], investments: any[]) {
    const totalUsers = users.length;
    const totalAssets = assets.length;
    const totalInvestments = investments.length;
    const totalInvestmentValue = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);

    // User analytics
    const userAnalytics = {
      total: totalUsers,
      byRole: {
        investors: users.filter(u => u.role === 'investor').length,
        issuers: users.filter(u => u.role === 'issuer').length,
        admins: users.filter(u => u.role === 'admin').length
      },
      byStatus: {
        active: users.filter(u => u.status === 'active').length,
        pending: users.filter(u => u.status === 'pending').length,
        suspended: users.filter(u => u.status === 'suspended').length
      },
      byKycStatus: {
        approved: users.filter(u => u.kycStatus === 'approved').length,
        pending: users.filter(u => u.kycStatus === 'pending').length,
        rejected: users.filter(u => u.kycStatus === 'rejected').length
      }
    };

    // Asset analytics
    const assetAnalytics = {
      total: totalAssets,
      byType: {
        containers: assets.filter(a => a.type === 'container').length,
        properties: assets.filter(a => a.type === 'property').length,
        inventory: assets.filter(a => a.type === 'inventory').length,
        vault: assets.filter(a => a.type === 'vault').length
      },
      byStatus: {
        active: assets.filter(a => a.status === 'active').length,
        pending: assets.filter(a => a.status === 'pending').length,
        inactive: assets.filter(a => a.status === 'inactive').length
      },
      totalValue: assets.reduce((sum, asset) => {
        const value = parseFloat(asset.value?.replace(/[$,]/g, '') || '0');
        return sum + value;
      }, 0)
    };

    // Investment analytics
    const investmentAnalytics = {
      total: totalInvestments,
      totalValue: totalInvestmentValue,
      averageInvestment: totalInvestments > 0 ? totalInvestmentValue / totalInvestments : 0,
      byStatus: {
        completed: investments.filter(i => i.status === 'completed').length,
        pending: investments.filter(i => i.status === 'pending').length,
        cancelled: investments.filter(i => i.status === 'cancelled').length
      }
    };

    // Performance metrics
    const performanceMetrics = {
      userGrowth: this.calculateGrowthRate(users, 'createdAt'),
      investmentGrowth: this.calculateGrowthRate(investments, 'investmentDate'),
      assetPerformance: this.calculateAssetPerformance(assets, investments)
    };

    return {
      userAnalytics,
      assetAnalytics,
      investmentAnalytics,
      performanceMetrics,
      summary: {
        totalUsers,
        totalAssets,
        totalInvestments,
        totalValue: totalInvestmentValue,
        averageInvestmentValue: totalInvestments > 0 ? totalInvestmentValue / totalInvestments : 0
      }
    };
  }

  /**
   * Calculate growth rate for time series data
   */
  private calculateGrowthRate(items: any[], dateField: string) {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const total = items.length;
    const lastMonthCount = items.filter(item => {
      const date = new Date(item[dateField]);
      return date >= lastMonth;
    }).length;
    const lastWeekCount = items.filter(item => {
      const date = new Date(item[dateField]);
      return date >= lastWeek;
    }).length;

    return {
      total,
      lastMonth: lastMonthCount,
      lastWeek: lastWeekCount,
      monthlyGrowth: total > 0 ? ((lastMonthCount / total) * 100).toFixed(1) : '0',
      weeklyGrowth: total > 0 ? ((lastWeekCount / total) * 100).toFixed(1) : '0'
    };
  }

  /**
   * Calculate asset performance metrics
   */
  private calculateAssetPerformance(assets: any[], investments: any[]) {
    return assets.map(asset => {
      const assetInvestments = investments.filter(inv => inv.assetId === asset.id);
      const totalInvested = assetInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
      const investorCount = new Set(assetInvestments.map(inv => inv.investorId || inv.userId)).size;

      return {
        assetId: asset.id,
        assetName: asset.name,
        totalInvested,
        investorCount,
        averageInvestment: assetInvestments.length > 0 ? totalInvested / assetInvestments.length : 0,
        completionRate: assetInvestments.length > 0 ? 
          (assetInvestments.filter(inv => inv.status === 'completed').length / assetInvestments.length * 100).toFixed(1) : '0'
      };
    });
  }

  /**
   * Get user analytics with database integration
   */
  async getUserAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const result = await this.getAnalyticsData();
      if (result.success && result.data) {
        return { success: true, data: result.data.userAnalytics };
      }
      return { success: false, error: 'Failed to get user analytics' };
    } catch (error) {
      console.error('Get user analytics error:', error);
      return { success: false, error: 'Failed to get user analytics' };
    }
  }

  /**
   * Get asset analytics with database integration
   */
  async getAssetAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const result = await this.getAnalyticsData();
      if (result.success && result.data) {
        return { success: true, data: result.data.assetAnalytics };
      }
      return { success: false, error: 'Failed to get asset analytics' };
    } catch (error) {
      console.error('Get asset analytics error:', error);
      return { success: false, error: 'Failed to get asset analytics' };
    }
  }

  /**
   * Get investment analytics with database integration
   */
  async getInvestmentAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const result = await this.getAnalyticsData();
      if (result.success && result.data) {
        return { success: true, data: result.data.investmentAnalytics };
      }
      return { success: false, error: 'Failed to get investment analytics' };
    } catch (error) {
      console.error('Get investment analytics error:', error);
      return { success: false, error: 'Failed to get investment analytics' };
    }
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`AnalyticsIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const analyticsIntegration = new AnalyticsIntegration();
