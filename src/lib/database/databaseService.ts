/**
 * Database Service Layer
 * 
 * This file contains the main database service with CRUD operations
 * for all entities in the Global Edge tokenized assets platform.
 */

import { cosmosClient } from './cosmosClient';
import { 
  User, Asset, Investment, KYCApplication, Notification, AdminLog,
  AssetCreationRequest, IssuerBranding, SystemSetting, AuditLog,
  QueryOptions, AssetQueryOptions, InvestmentQueryOptions, UserQueryOptions,
  ApiResponse, PaginatedResponse
} from './models';

export class DatabaseService {
  private initialized = false;

  /**
   * Initialize the database service
   */
  async initialize(): Promise<void> {
    if (!this.initialized) {
      await cosmosClient.initialize();
      this.initialized = true;
    }
  }

  /**
   * Test database connection
   */
  async testConnection(): Promise<boolean> {
    return await cosmosClient.testConnection();
  }

  // ============================================================================
  // USER OPERATIONS
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
      const { resources } = await container.items
        .query({
          query: 'SELECT * FROM c WHERE c.email = @email',
          parameters: [{ name: '@email', value: email }]
        })
        .fetchAll();

      if (resources.length === 0) {
        return { success: false, error: 'User not found' };
      }

      return { success: true, data: resources[0] };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async updateUser(id: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('users');
      
      const { resource: existingUser } = await container.item(id, id).read();
      if (!existingUser) {
        return { success: false, error: 'User not found' };
      }

      const updatedUser = {
        ...existingUser,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await container.item(id, id).replace(updatedUser);
      return { success: true, data: resource };
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
      if (options.kycStatus) {
        conditions.push('c.kycStatus = @kycStatus');
        parameters.push({ name: '@kycStatus', value: options.kycStatus });
      }
      if (options.country) {
        conditions.push('c.country = @country');
        parameters.push({ name: '@country', value: options.country });
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      // Apply sorting
      if (options.sortBy) {
        query += ` ORDER BY c.${options.sortBy} ${options.sortOrder || 'asc'}`;
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
  // ASSET OPERATIONS
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
      if (options.issuerId) {
        conditions.push('c.issuerId = @issuerId');
        parameters.push({ name: '@issuerId', value: options.issuerId });
      }
      if (options.minValue) {
        conditions.push('c.value >= @minValue');
        parameters.push({ name: '@minValue', value: options.minValue });
      }
      if (options.maxValue) {
        conditions.push('c.value <= @maxValue');
        parameters.push({ name: '@maxValue', value: options.maxValue });
      }
      if (options.riskLevel) {
        conditions.push('c.risk = @riskLevel');
        parameters.push({ name: '@riskLevel', value: options.riskLevel });
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      // Apply sorting
      if (options.sortBy) {
        query += ` ORDER BY c.${options.sortBy} ${options.sortOrder || 'asc'}`;
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

  async updateAsset(id: string, updates: Partial<Asset>): Promise<ApiResponse<Asset>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('assets');
      
      const { resource: existingAsset } = await container.item(id, id).read();
      if (!existingAsset) {
        return { success: false, error: 'Asset not found' };
      }

      const updatedAsset = {
        ...existingAsset,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await container.item(id, id).replace(updatedAsset);
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // ============================================================================
  // INVESTMENT OPERATIONS
  // ============================================================================

  async createInvestment(investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Investment>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('investments');
      
      const newInvestment: Investment = {
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

  async getInvestmentById(id: string): Promise<ApiResponse<Investment>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('investments');
      const { resource } = await container.item(id, id).read();
      
      if (!resource) {
        return { success: false, error: 'Investment not found' };
      }
      
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getInvestments(options: InvestmentQueryOptions = {}): Promise<ApiResponse<PaginatedResponse<Investment>>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('investments');
      
      let query = 'SELECT * FROM c';
      const parameters: any[] = [];
      const conditions: string[] = [];

      // Apply filters
      if (options.investorId) {
        conditions.push('c.investorId = @investorId');
        parameters.push({ name: '@investorId', value: options.investorId });
      }
      if (options.assetId) {
        conditions.push('c.assetId = @assetId');
        parameters.push({ name: '@assetId', value: options.assetId });
      }
      if (options.status) {
        conditions.push('c.status = @status');
        parameters.push({ name: '@status', value: options.status });
      }
      if (options.dateFrom) {
        conditions.push('c.createdAt >= @dateFrom');
        parameters.push({ name: '@dateFrom', value: options.dateFrom });
      }
      if (options.dateTo) {
        conditions.push('c.createdAt <= @dateTo');
        parameters.push({ name: '@dateTo', value: options.dateTo });
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      // Apply sorting
      if (options.sortBy) {
        query += ` ORDER BY c.${options.sortBy} ${options.sortOrder || 'desc'}`;
      } else {
        query += ' ORDER BY c.createdAt desc';
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

  async updateInvestment(id: string, updates: Partial<Investment>): Promise<ApiResponse<Investment>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('investments');
      
      const { resource: existingInvestment } = await container.item(id, id).read();
      if (!existingInvestment) {
        return { success: false, error: 'Investment not found' };
      }

      const updatedInvestment = {
        ...existingInvestment,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await container.item(id, id).replace(updatedInvestment);
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // ============================================================================
  // KYC OPERATIONS
  // ============================================================================

  async createKYCApplication(kyc: Omit<KYCApplication, 'id' | 'submittedAt'>): Promise<ApiResponse<KYCApplication>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('kyc');
      
      const newKYC: KYCApplication = {
        ...kyc,
        id: this.generateId(),
        submittedAt: new Date().toISOString(),
      };

      const { resource } = await container.items.create(newKYC);
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getKYCByUserId(userId: string): Promise<ApiResponse<KYCApplication>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('kyc');
      const { resources } = await container.items
        .query({
          query: 'SELECT * FROM c WHERE c.userId = @userId',
          parameters: [{ name: '@userId', value: userId }]
        })
        .fetchAll();

      if (resources.length === 0) {
        return { success: false, error: 'KYC application not found' };
      }

      return { success: true, data: resources[0] };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async updateKYCApplication(id: string, updates: Partial<KYCApplication>): Promise<ApiResponse<KYCApplication>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('kyc');
      
      const { resource: existingKYC } = await container.item(id, id).read();
      if (!existingKYC) {
        return { success: false, error: 'KYC application not found' };
      }

      const updatedKYC = {
        ...existingKYC,
        ...updates,
      };

      const { resource } = await container.item(id, id).replace(updatedKYC);
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // ============================================================================
  // NOTIFICATION OPERATIONS
  // ============================================================================

  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<ApiResponse<Notification>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('notifications');
      
      const newNotification: Notification = {
        ...notification,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
      };

      const { resource } = await container.items.create(newNotification);
      return { success: true, data: resource };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getNotificationsByUserId(userId: string, limit: number = 50): Promise<ApiResponse<Notification[]>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('notifications');
      const { resources } = await container.items
        .query({
          query: 'SELECT * FROM c WHERE c.userId = @userId ORDER BY c.createdAt DESC',
          parameters: [{ name: '@userId', value: userId }]
        })
        .fetchAll();

      return { success: true, data: resources.slice(0, limit) };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async markNotificationAsRead(id: string): Promise<ApiResponse<Notification>> {
    try {
      await this.initialize();
      const container = cosmosClient.getContainer('notifications');
      
      const { resource: existingNotification } = await container.item(id, id).read();
      if (!existingNotification) {
        return { success: false, error: 'Notification not found' };
      }

      const updatedNotification = {
        ...existingNotification,
        status: 'read',
        readAt: new Date().toISOString(),
      };

      const { resource } = await container.item(id, id).replace(updatedNotification);
      return { success: true, data: resource };
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
export const databaseService = new DatabaseService();
