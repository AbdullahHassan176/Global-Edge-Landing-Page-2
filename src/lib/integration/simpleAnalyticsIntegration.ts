/**
 * Simple Analytics Integration
 * 
 * This service provides basic analytics with fallback to mock data.
 */

import { userAuthService } from '@/lib/userAuthService';
import { assetService } from '@/lib/assetService';
import { AssetMetricsService } from '@/lib/assetMetricsService';

export class SimpleAnalyticsIntegration {
  private useDatabase = false; // Use mock data for now

  /**
   * Get basic analytics data
   */
  async getAnalyticsData(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Use mock data
      const mockUsers = userAuthService.getAllUsers();
      const mockAssets = await assetService.getAssets();
      const mockInvestments = userAuthService.getAllInvestments();
      const mockMetrics = AssetMetricsService.getAllMetrics();

      const analyticsData = {
        userAnalytics: {
          total: mockUsers.length,
          byRole: {
            investors: mockUsers.filter(u => u.role === 'investor').length,
            issuers: mockUsers.filter(u => u.role === 'issuer').length,
            admins: 0 // No admin role in userAuthService
          },
          byStatus: {
            active: mockUsers.filter(u => u.status === 'active').length,
            pending: mockUsers.filter(u => u.status === 'pending').length,
            suspended: mockUsers.filter(u => u.status === 'suspended').length
          }
        },
        assetAnalytics: {
          total: mockAssets.length,
          byType: {
            containers: mockAssets.filter(a => a.type === 'container').length,
            properties: mockAssets.filter(a => a.type === 'property').length,
            inventory: mockAssets.filter(a => a.type === 'inventory').length,
            vault: mockAssets.filter(a => a.type === 'vault').length
          },
          byStatus: {
            active: mockAssets.filter(a => a.status === 'active').length,
            pending: mockAssets.filter(a => a.status === 'pending').length,
            inactive: mockAssets.filter(a => a.status === 'inactive').length
          }
        },
        investmentAnalytics: {
          total: mockInvestments.length,
          totalValue: mockInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0),
          byStatus: {
            completed: mockInvestments.filter(i => i.status === 'completed').length,
            pending: mockInvestments.filter(i => i.status === 'pending').length,
            cancelled: mockInvestments.filter(i => i.status === 'cancelled').length
          }
        },
        metrics: mockMetrics,
        summary: {
          totalUsers: mockUsers.length,
          totalAssets: mockAssets.length,
          totalInvestments: mockInvestments.length,
          totalValue: mockInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0)
        }
      };

      return { success: true, data: analyticsData };
    } catch (error) {
      console.error('Get analytics data error:', error);
      return { success: false, error: 'Failed to get analytics data' };
    }
  }

  /**
   * Get user analytics
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
   * Get asset analytics
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
   * Get investment analytics
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
}

// Export singleton instance
export const simpleAnalyticsIntegration = new SimpleAnalyticsIntegration();
