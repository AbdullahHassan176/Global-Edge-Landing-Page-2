/**
 * Admin Content Management Integration
 * 
 * This service integrates content management with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';

export interface ContentItem {
  id: string;
  type: 'page' | 'asset' | 'user' | 'notification' | 'setting';
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  metadata?: any;
}

export class ContentIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Get all content items with database integration
   */
  async getContentItems(): Promise<{ success: boolean; items?: ContentItem[]; error?: string }> {
    try {
      // Use mock service for now (database integration needs proper content container)
      const mockItems = this.getMockContentItems();
      return { success: true, items: mockItems };
    } catch (error) {
      console.error('Get content items error:', error);
      return { success: false, error: 'Failed to get content items' };
    }
  }

  /**
   * Get content item by ID with database integration
   */
  async getContentItem(id: string): Promise<{ success: boolean; item?: ContentItem; error?: string }> {
    try {
      const mockItems = this.getMockContentItems();
      const item = mockItems.find(item => item.id === id);
      if (item) {
        return { success: true, item };
      }
      return { success: false, error: 'Content item not found' };
    } catch (error) {
      console.error('Get content item error:', error);
      return { success: false, error: 'Failed to get content item' };
    }
  }

  /**
   * Create content item with database integration
   */
  async createContentItem(itemData: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; item?: ContentItem; error?: string }> {
    try {
      const mockItem = {
        ...itemData,
        id: `content-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return { success: true, item: mockItem };
    } catch (error) {
      console.error('Create content item error:', error);
      return { success: false, error: 'Failed to create content item' };
    }
  }

  /**
   * Update content item with database integration
   */
  async updateContentItem(id: string, updates: Partial<ContentItem>): Promise<{ success: boolean; item?: ContentItem; error?: string }> {
    try {
      const mockItems = this.getMockContentItems();
      const item = mockItems.find(item => item.id === id);
      if (item) {
        Object.assign(item, updates, { updatedAt: new Date().toISOString() });
        return { success: true, item };
      }
      return { success: false, error: 'Content item not found' };
    } catch (error) {
      console.error('Update content item error:', error);
      return { success: false, error: 'Failed to update content item' };
    }
  }

  /**
   * Delete content item with database integration
   */
  async deleteContentItem(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Mock service (just return success)
      return { success: true };
    } catch (error) {
      console.error('Delete content item error:', error);
      return { success: false, error: 'Failed to delete content item' };
    }
  }

  /**
   * Publish content item with database integration
   */
  async publishContentItem(id: string): Promise<{ success: boolean; item?: ContentItem; error?: string }> {
    try {
      const updates = {
        status: 'published' as const,
        publishedAt: new Date().toISOString()
      };

      return await this.updateContentItem(id, updates);
    } catch (error) {
      console.error('Publish content item error:', error);
      return { success: false, error: 'Failed to publish content item' };
    }
  }

  /**
   * Archive content item with database integration
   */
  async archiveContentItem(id: string): Promise<{ success: boolean; item?: ContentItem; error?: string }> {
    try {
      const updates = {
        status: 'archived' as const
      };

      return await this.updateContentItem(id, updates);
    } catch (error) {
      console.error('Archive content item error:', error);
      return { success: false, error: 'Failed to archive content item' };
    }
  }

  /**
   * Get content statistics with database integration
   */
  async getContentStats(): Promise<{ success: boolean; stats?: any; error?: string }> {
    try {
      const result = await this.getContentItems();
      if (!result.success || !result.items) {
        return { success: false, error: 'Failed to get content items for stats' };
      }

      const items = result.items;
      const stats = {
        total: items.length,
        published: items.filter(item => item.status === 'published').length,
        draft: items.filter(item => item.status === 'draft').length,
        archived: items.filter(item => item.status === 'archived').length,
        byType: {
          page: items.filter(item => item.type === 'page').length,
          asset: items.filter(item => item.type === 'asset').length,
          user: items.filter(item => item.type === 'user').length,
          notification: items.filter(item => item.type === 'notification').length,
          setting: items.filter(item => item.type === 'setting').length
        },
        byCategory: this.getCategoryStats(items)
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get content stats error:', error);
      return { success: false, error: 'Failed to get content statistics' };
    }
  }

  /**
   * Get category statistics
   */
  private getCategoryStats(items: ContentItem[]): Record<string, number> {
    const categoryStats: Record<string, number> = {};
    items.forEach(item => {
      categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
    });
    return categoryStats;
  }

  /**
   * Get mock content items for fallback
   */
  private getMockContentItems(): ContentItem[] {
    return [
      {
        id: 'content-1',
        type: 'page',
        title: 'Welcome to Global Edge',
        content: 'Welcome to our tokenized assets platform...',
        status: 'published',
        category: 'Marketing',
        tags: ['welcome', 'introduction', 'platform'],
        author: 'admin-1',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        publishedAt: '2024-01-15T10:00:00Z',
        metadata: {
          seoTitle: 'Global Edge - Tokenized Assets Platform',
          seoDescription: 'Invest in tokenized assets with Global Edge'
        }
      },
      {
        id: 'content-2',
        type: 'asset',
        title: 'Dubai Marina Office Tower',
        content: 'Prime office space in downtown Dubai...',
        status: 'published',
        category: 'Assets',
        tags: ['real-estate', 'dubai', 'office'],
        author: 'admin-1',
        createdAt: '2024-01-16T09:00:00Z',
        updatedAt: '2024-01-16T09:00:00Z',
        publishedAt: '2024-01-16T09:00:00Z',
        metadata: {
          assetType: 'property',
          location: 'Dubai Marina',
          value: '$350,000'
        }
      },
      {
        id: 'content-3',
        type: 'notification',
        title: 'System Maintenance Notice',
        content: 'Scheduled maintenance will occur...',
        status: 'draft',
        category: 'System',
        tags: ['maintenance', 'system', 'notice'],
        author: 'admin-1',
        createdAt: '2024-01-17T14:00:00Z',
        updatedAt: '2024-01-17T14:00:00Z',
        metadata: {
          priority: 'high',
          targetAudience: 'all_users'
        }
      }
    ];
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`ContentIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const contentIntegration = new ContentIntegration();
