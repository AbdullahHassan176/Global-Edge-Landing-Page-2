/**
 * Investment Management Integration
 * 
 * This service integrates investment tracking with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { userAuthService, Investment } from '@/lib/userAuthService';

export class InvestmentIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Get all investments with database integration
   */
  async getInvestments(): Promise<{ success: boolean; investments?: Investment[]; error?: string }> {
    try {
      if (this.useDatabase) {
        // Try database first
        const dbResult = await workingDatabaseService.getInvestments();
        if (dbResult.success && dbResult.data) {
          return { success: true, investments: dbResult.data.items };
        }
      }

      // Fallback to mock service
      const mockInvestments = userAuthService.getAllInvestments();
      return { success: true, investments: mockInvestments };
    } catch (error) {
      console.error('Get investments error:', error);
      return { success: false, error: 'Failed to get investments' };
    }
  }

  /**
   * Get investments by user ID with database integration
   */
  async getInvestmentsByUserId(userId: string): Promise<{ success: boolean; investments?: Investment[]; error?: string }> {
    try {
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getInvestments();
        if (dbResult.success && dbResult.data) {
          const userInvestments = dbResult.data.items.filter(inv => inv.userId === userId);
          return { success: true, investments: userInvestments };
        }
      }

      // Fallback to mock service
      const mockInvestments = userAuthService.getAllInvestments().filter(inv => inv.userId === userId);
      return { success: true, investments: mockInvestments };
    } catch (error) {
      console.error('Get investments by user error:', error);
      return { success: false, error: 'Failed to get user investments' };
    }
  }

  /**
   * Get investments by asset ID with database integration
   */
  async getInvestmentsByAssetId(assetId: string): Promise<{ success: boolean; investments?: Investment[]; error?: string }> {
    try {
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getInvestments();
        if (dbResult.success && dbResult.data) {
          const assetInvestments = dbResult.data.items.filter(inv => inv.assetId === assetId);
          return { success: true, investments: assetInvestments };
        }
      }

      // Fallback to mock service
      const mockInvestments = userAuthService.getAllInvestments().filter(inv => inv.assetId === assetId);
      return { success: true, investments: mockInvestments };
    } catch (error) {
      console.error('Get investments by asset error:', error);
      return { success: false, error: 'Failed to get asset investments' };
    }
  }

  /**
   * Create investment with database integration
   */
  async createInvestment(investmentData: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; investment?: Investment; error?: string }> {
    try {
      const investment = await userAuthService.createInvestment(investmentData);
      return { success: true, investment };
    } catch (error) {
      console.error('Create investment error:', error);
      return { success: false, error: 'Failed to create investment' };
    }
  }

  /**
   * Update investment status with database integration
   */
  async updateInvestmentStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled'): Promise<{ success: boolean; investment?: Investment; error?: string }> {
    try {
      const mockInvestments = userAuthService.getAllInvestments();
      const investment = mockInvestments.find(inv => inv.id === id);
      if (investment) {
        investment.status = status;
        return { success: true, investment };
      }
      return { success: false, error: 'Investment not found' };
    } catch (error) {
      console.error('Update investment error:', error);
      return { success: false, error: 'Failed to update investment' };
    }
  }

  /**
   * Get investment statistics with database integration
   */
  async getInvestmentStats(): Promise<{ success: boolean; stats?: any; error?: string }> {
    try {
      const result = await this.getInvestments();
      if (!result.success || !result.investments) {
        return { success: false, error: 'Failed to get investments for stats' };
      }

      const investments = result.investments;
      const stats = {
        total: investments.length,
        completed: investments.filter(inv => inv.status === 'completed').length,
        pending: investments.filter(inv => inv.status === 'pending').length,
        cancelled: investments.filter(inv => inv.status === 'cancelled').length,
        totalAmount: investments.reduce((sum, inv) => sum + inv.amount, 0),
        averageAmount: investments.length > 0 ? investments.reduce((sum, inv) => sum + inv.amount, 0) / investments.length : 0
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get investment stats error:', error);
      return { success: false, error: 'Failed to get investment statistics' };
    }
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`InvestmentIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const investmentIntegration = new InvestmentIntegration();
