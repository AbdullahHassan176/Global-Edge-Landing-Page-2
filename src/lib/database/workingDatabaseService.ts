/**
 * Working Database Service
 * 
 * This service works with the existing containers that were successfully created
 * and provides a foundation for integration with your existing services.
 */

import { cosmosClient } from './cosmosClient';
import { 
  User, Asset, Investment, 
  ApiResponse, PaginatedResponse,
  QueryOptions, AssetQueryOptions, InvestmentQueryOptions, UserQueryOptions
} from './models';

export class WorkingDatabaseService {
  private initialized = false;

  async initialize(): Promise<void> {
    if (!this.initialized) {
      await cosmosClient.initialize();
      this.initialized = true;
    }
  }

  async testConnection(): Promise<boolean> {
    return await cosmosClient.testConnection();
  }

  // ============================================================================
  // USER OPERATIONS (Using existing 'users' container)
  // ============================================================================

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<User>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('users');
      
      const newUser: User = {
        ...user,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await container.items.create(newUser);
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('users');
      const { resource } = await container.item(id, id).read();
      
      if (!resource) {
        return { success: false, error: 'User not found' };
      }
      
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getUserByEmail(email: string): Promise<ApiResponse<User>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('users');
      
      // Add timeout to prevent hanging
      const { resources } = await Promise.race([
        container.items
          .query({
            query: 'SELECT * FROM c WHERE c.email = @email',
            parameters: [{ name: '@email', value: email }]
          })
          .fetchAll(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database query timeout')), 3000)
        )
      ]) as any;

      if (resources.length === 0) {
        return { success: false, error: 'User not found' };
      }

      return { success: true, data: resources[0] };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getUsers(options: UserQueryOptions = {}): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('users');
      
      let query = 'SELECT * FROM c';
      const parameters: any[] = [];
      const conditions: string[] = [];

      // Apply filters
      if (options.role) {
        conditions.push('c.role = @role');
        parameters.push({ name: '@role', value: options.role });
      }
      if (options.status) {
        conditions.push('c.status = @status');
        parameters.push({ name: '@status', value: options.status });
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      const { resources } = await container.items
        .query({ query, parameters })
        .fetchAll();

      // Apply pagination
      const page = options.page || 1;
      const pageSize = options.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedItems = resources.slice(startIndex, endIndex);

      const result: PaginatedResponse<User> = {
        items: paginatedItems,
        totalCount: resources.length,
        page,
        pageSize,
        hasMore: endIndex < resources.length,
      };

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // ============================================================================
  // ASSET OPERATIONS (Using existing 'assets' container)
  // ============================================================================

  async createAsset(asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Asset>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('assets');
      
      const newAsset: Asset = {
        ...asset,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await container.items.create(newAsset);
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getAssetById(id: string): Promise<ApiResponse<Asset>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('assets');
      const { resource } = await container.item(id, id).read();
      
      if (!resource) {
        return { success: false, error: 'Asset not found' };
      }
      
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getAssets(options: AssetQueryOptions = {}): Promise<ApiResponse<PaginatedResponse<Asset>>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('assets');
      
      let query = 'SELECT * FROM c';
      const parameters: any[] = [];
      const conditions: string[] = [];

      // Apply filters
      if (options.type) {
        conditions.push('c.type = @type');
        parameters.push({ name: '@type', value: options.type });
      }
      if (options.status) {
        conditions.push('c.status = @status');
        parameters.push({ name: '@status', value: options.status });
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      const { resources } = await container.items
        .query({ query, parameters })
        .fetchAll();

      // Apply pagination
      const page = options.page || 1;
      const pageSize = options.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedItems = resources.slice(startIndex, endIndex);

      const result: PaginatedResponse<Asset> = {
        items: paginatedItems,
        totalCount: resources.length,
        page,
        pageSize,
        hasMore: endIndex < resources.length,
      };

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // ============================================================================
  // INVESTMENT OPERATIONS (Using 'users' container with type field)
  // ============================================================================

  async createInvestment(investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Investment>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('users'); // Using users container for now
      
      const newInvestment = {
        ...investment,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await container.items.create(newInvestment);
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getInvestments(options: InvestmentQueryOptions = {}): Promise<ApiResponse<PaginatedResponse<Investment>>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('users');
      
      const { resources } = await container.items
        .query({
          query: 'SELECT * FROM c WHERE c.type = @type',
          parameters: [{ name: '@type', value: 'investment' }]
        })
        .fetchAll();

      // Apply pagination
      const page = options.page || 1;
      const pageSize = options.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedItems = resources.slice(startIndex, endIndex);

      const result: PaginatedResponse<Investment> = {
        items: paginatedItems,
        totalCount: resources.length,
        page,
        pageSize,
        hasMore: endIndex < resources.length,
      };

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async getDatabaseStats(): Promise<any> {
    return await cosmosClient.getDatabaseStats();
  }
}

// Export singleton instance
export const workingDatabaseService = new WorkingDatabaseService();
