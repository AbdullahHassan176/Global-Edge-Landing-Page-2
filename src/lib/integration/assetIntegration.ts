/**
 * Asset Management Integration
 * 
 * This service integrates the existing assetService with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { assetService } from '@/lib/assetService';
import { Asset } from '@/lib/database/models';

export class AssetIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Get all assets with database integration
   */
  async getAssets(): Promise<{ success: boolean; assets?: Asset[]; error?: string }> {
    try {
      if (this.useDatabase) {
        // Try database with timeout to avoid blocking
        const dbPromise = workingDatabaseService.getAssets();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 2000)
        );
        
        try {
          const dbResult = await Promise.race([dbPromise, timeoutPromise]) as any;
          if (dbResult.success && dbResult.data) {
            return { success: true, assets: dbResult.data.items };
          }
        } catch (dbError) {
          // Database failed or timed out, fall back to mock
          console.log('Database unavailable, using mock data');
        }
      }

      // Fallback to mock service
      const mockAssets = assetService.getAssets();
      return { success: true, assets: mockAssets };
    } catch (error) {
      console.error('Get assets error:', error);
      return { success: false, error: 'Failed to get assets' };
    }
  }

  /**
   * Get asset by ID with database integration
   */
  async getAssetById(id: string): Promise<{ success: boolean; asset?: Asset; error?: string }> {
    try {
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getAssetById(id);
        if (dbResult.success && dbResult.data) {
          return { success: true, asset: dbResult.data };
        }
      }

      // Fallback to mock service
      const mockAsset = assetService.getAssetById(id);
      if (mockAsset) {
        return { success: true, asset: mockAsset };
      }

      return { success: false, error: 'Asset not found' };
    } catch (error) {
      console.error('Get asset error:', error);
      return { success: false, error: 'Failed to get asset' };
    }
  }

  /**
   * Create asset with database integration
   */
  async createAsset(assetData: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; asset?: Asset; error?: string }> {
    try {
      if (this.useDatabase) {
        // Create asset in database
        const dbResult = await workingDatabaseService.createAsset(assetData);
        if (dbResult.success && dbResult.data) {
          // Also create in mock service for backward compatibility
          assetService.addAsset(dbResult.data);
          return { success: true, asset: dbResult.data };
        }
      }

      // Fallback to mock service
      const mockResult = assetService.addAsset(assetData as any);
      if (mockResult) {
        return { success: true, asset: mockResult };
      }

      return { success: false, error: 'Failed to create asset' };
    } catch (error) {
      console.error('Create asset error:', error);
      return { success: false, error: 'Failed to create asset' };
    }
  }

  /**
   * Update asset with database integration
   */
  async updateAsset(id: string, updates: Partial<Asset>): Promise<{ success: boolean; asset?: Asset; error?: string }> {
    try {
      if (this.useDatabase) {
        // Update asset in database
        const dbResult = await workingDatabaseService.updateAsset(id, updates);
        if (dbResult.success && dbResult.data) {
          // Also update in mock service for backward compatibility
          assetService.updateAsset(id, updates as any);
          return { success: true, asset: dbResult.data };
        }
      }

      // Fallback to mock service
      const mockResult = assetService.updateAsset(id, updates as any);
      if (mockResult) {
        return { success: true, asset: mockResult };
      }

      return { success: false, error: 'Failed to update asset' };
    } catch (error) {
      console.error('Update asset error:', error);
      return { success: false, error: 'Failed to update asset' };
    }
  }

  /**
   * Delete asset with database integration
   */
  async deleteAsset(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.useDatabase) {
        // Delete asset from database
        await workingDatabaseService.deleteAsset(id);
      }

      // Also delete from mock service for backward compatibility
      assetService.deleteAsset(id);

      return { success: true };
    } catch (error) {
      console.error('Delete asset error:', error);
      return { success: false, error: 'Failed to delete asset' };
    }
  }

  /**
   * Get assets by type with database integration
   */
  async getAssetsByType(type: string): Promise<{ success: boolean; assets?: Asset[]; error?: string }> {
    try {
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getAssets({ type: type as any });
        if (dbResult.success && dbResult.data) {
          return { success: true, assets: dbResult.data.items };
        }
      }

      // Fallback to mock service
      const mockAssets = assetService.getAssets().filter(asset => asset.type === type);
      return { success: true, assets: mockAssets };
    } catch (error) {
      console.error('Get assets by type error:', error);
      return { success: false, error: 'Failed to get assets by type' };
    }
  }

  /**
   * Get assets by status with database integration
   */
  async getAssetsByStatus(status: string): Promise<{ success: boolean; assets?: Asset[]; error?: string }> {
    try {
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getAssets({ status: status as any });
        if (dbResult.success && dbResult.data) {
          return { success: true, assets: dbResult.data.items };
        }
      }

      // Fallback to mock service
      const mockAssets = assetService.getAssets().filter(asset => asset.status === status);
      return { success: true, assets: mockAssets };
    } catch (error) {
      console.error('Get assets by status error:', error);
      return { success: false, error: 'Failed to get assets by status' };
    }
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`AssetIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const assetIntegration = new AssetIntegration();
