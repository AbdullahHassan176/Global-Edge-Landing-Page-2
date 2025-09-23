/**
 * Asset Management Integration
 * 
 * This service integrates the existing assetService with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { assetService, Asset } from '@/lib/assetService';

export class AssetIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Get all assets with database integration
   */
  async getAssets(): Promise<{ success: boolean; assets?: Asset[]; error?: string }> {
    try {
      const assets = await assetService.getAssets();
      return { success: true, assets };
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
      const asset = await assetService.getAssetById(id);
      if (asset) {
        return { success: true, asset };
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
      const asset = await assetService.addAsset(assetData);
      return { success: true, asset };
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
      const asset = await assetService.updateAsset(id, updates);
      if (asset) {
        return { success: true, asset };
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
      const success = await assetService.deleteAsset(id);
      return { success };
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
      const allAssets = await assetService.getAssets();
      const mockAssets = allAssets.filter(asset => asset.type === type);
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
      const allAssets = await assetService.getAssets();
      const mockAssets = allAssets.filter(asset => asset.status === status);
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
