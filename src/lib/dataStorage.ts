// Data storage utilities for the Global Edge platform
// This provides both localStorage for development and database integration patterns

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  accountType: 'individual' | 'corporate';
  kycStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  lastLogin: string;
}

export interface Investment {
  id: string;
  userId: string;
  assetId: string;
  amount: number;
  shares: number;
  purchaseDate: string;
  status: 'active' | 'sold' | 'pending';
}

export interface Asset {
  id: string;
  name: string;
  type: 'container' | 'property' | 'inventory' | 'vault';
  totalValue: number;
  availableShares: number;
  pricePerShare: number;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'sold_out' | 'coming_soon';
  description: string;
  location: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'admin' | 'email' | 'webhook';
  title: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'sent' | 'failed';
  metadata?: any;
}

// Local Storage Implementation (for development/demo)
export class LocalStorageService {
  private static getKey(entity: string): string {
    return `global_edge_${entity}`;
  }

  static save<T>(entity: string, data: T[]): void {
    try {
      localStorage.setItem(this.getKey(entity), JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${entity} to localStorage:`, error);
    }
  }

  static load<T>(entity: string): T[] {
    try {
      const data = localStorage.getItem(this.getKey(entity));
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error loading ${entity} from localStorage:`, error);
      return [];
    }
  }

  static add<T>(entity: string, item: T): void {
    const data = this.load<T>(entity);
    data.push(item);
    this.save(entity, data);
  }

  static update<T>(entity: string, id: string, updates: Partial<T>): void {
    const data = this.load<T>(entity);
    const index = data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      this.save(entity, data);
    }
  }

  static delete(entity: string, id: string): void {
    const data = this.load(entity);
    const filtered = data.filter((item: any) => item.id !== id);
    this.save(entity, filtered);
  }
}

// Database Service Interface (for production)
export interface DatabaseService {
  // User operations
  createUser(user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Promise<User>;
  getUser(id: string): Promise<User | null>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  listUsers(filters?: any): Promise<User[]>;

  // Investment operations
  createInvestment(investment: Omit<Investment, 'id'>): Promise<Investment>;
  getInvestment(id: string): Promise<Investment | null>;
  updateInvestment(id: string, updates: Partial<Investment>): Promise<Investment>;
  deleteInvestment(id: string): Promise<void>;
  listInvestments(userId?: string): Promise<Investment[]>;

  // Asset operations
  createAsset(asset: Omit<Asset, 'id' | 'createdAt'>): Promise<Asset>;
  getAsset(id: string): Promise<Asset | null>;
  updateAsset(id: string, updates: Partial<Asset>): Promise<Asset>;
  deleteAsset(id: string): Promise<void>;
  listAssets(filters?: any): Promise<Asset[]>;

  // Notification operations
  createNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Promise<Notification>;
  getNotification(id: string): Promise<Notification | null>;
  updateNotification(id: string, updates: Partial<Notification>): Promise<Notification>;
  deleteNotification(id: string): Promise<void>;
  listNotifications(filters?: any): Promise<Notification[]>;
}

// Mock Database Service (for development)
export class MockDatabaseService implements DatabaseService {
  private users: User[] = [];
  private investments: Investment[] = [];
  private assets: Asset[] = [];
  private notifications: Notification[] = [];

  // Initialize with mock data
  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock users
    this.users = [
      {
        id: 'user-1',
        email: 'alice@example.com',
        firstName: 'Alice',
        lastName: 'Johnson',
        phone: '+1 (555) 123-4567',
        accountType: 'individual',
        kycStatus: 'approved',
        createdAt: '2023-01-15T10:00:00Z',
        lastLogin: '2024-12-15T14:30:00Z'
      },
      {
        id: 'user-2',
        email: 'bob@company.com',
        firstName: 'Bob',
        lastName: 'Smith',
        phone: '+1 (555) 234-5678',
        accountType: 'corporate',
        kycStatus: 'pending',
        createdAt: '2023-03-20T09:15:00Z',
        lastLogin: '2024-12-14T16:45:00Z'
      }
    ];

    // Mock assets
    this.assets = [
      {
        id: 'asset-1',
        name: 'Shanghai-Los Angeles Container',
        type: 'container',
        totalValue: 45000,
        availableShares: 1000,
        pricePerShare: 45,
        expectedReturn: 12.5,
        riskLevel: 'medium',
        status: 'active',
        description: 'High-value electronics and textiles container',
        location: 'Shanghai → Los Angeles',
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'asset-2',
        name: 'Miami Office Building',
        type: 'property',
        totalValue: 35000,
        availableShares: 500,
        pricePerShare: 70,
        expectedReturn: 8.2,
        riskLevel: 'low',
        status: 'active',
        description: 'Prime office space in downtown Miami',
        location: 'Miami, FL',
        createdAt: '2024-02-01T00:00:00Z'
      }
    ];

    // Mock investments
    this.investments = [
      {
        id: 'inv-1',
        userId: 'user-1',
        assetId: 'asset-1',
        amount: 2250,
        shares: 50,
        purchaseDate: '2024-11-15T10:00:00Z',
        status: 'active'
      },
      {
        id: 'inv-2',
        userId: 'user-1',
        assetId: 'asset-2',
        amount: 1400,
        shares: 20,
        purchaseDate: '2024-10-20T14:30:00Z',
        status: 'active'
      }
    ];

    // Mock notifications
    this.notifications = [
      {
        id: 'notif-1',
        type: 'admin',
        title: 'New User Registration',
        message: 'Alice Johnson has registered for an individual account',
        timestamp: '2024-12-15T10:30:00Z',
        status: 'sent'
      },
      {
        id: 'notif-2',
        type: 'email',
        title: 'Welcome Email Sent',
        message: 'Welcome email sent to alice@example.com',
        timestamp: '2024-12-15T10:31:00Z',
        status: 'sent'
      }
    ];
  }

  // User operations
  async createUser(user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }

  async listUsers(filters?: any): Promise<User[]> {
    return this.users;
  }

  // Investment operations
  async createInvestment(investment: Omit<Investment, 'id'>): Promise<Investment> {
    const newInvestment: Investment = {
      ...investment,
      id: `inv-${Date.now()}`
    };
    this.investments.push(newInvestment);
    return newInvestment;
  }

  async getInvestment(id: string): Promise<Investment | null> {
    return this.investments.find(inv => inv.id === id) || null;
  }

  async updateInvestment(id: string, updates: Partial<Investment>): Promise<Investment> {
    const index = this.investments.findIndex(inv => inv.id === id);
    if (index === -1) throw new Error('Investment not found');
    this.investments[index] = { ...this.investments[index], ...updates };
    return this.investments[index];
  }

  async deleteInvestment(id: string): Promise<void> {
    this.investments = this.investments.filter(inv => inv.id !== id);
  }

  async listInvestments(userId?: string): Promise<Investment[]> {
    if (userId) {
      return this.investments.filter(inv => inv.userId === userId);
    }
    return this.investments;
  }

  // Asset operations
  async createAsset(asset: Omit<Asset, 'id' | 'createdAt'>): Promise<Asset> {
    const newAsset: Asset = {
      ...asset,
      id: `asset-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.assets.push(newAsset);
    return newAsset;
  }

  async getAsset(id: string): Promise<Asset | null> {
    return this.assets.find(asset => asset.id === id) || null;
  }

  async updateAsset(id: string, updates: Partial<Asset>): Promise<Asset> {
    const index = this.assets.findIndex(asset => asset.id === id);
    if (index === -1) throw new Error('Asset not found');
    this.assets[index] = { ...this.assets[index], ...updates };
    return this.assets[index];
  }

  async deleteAsset(id: string): Promise<void> {
    this.assets = this.assets.filter(asset => asset.id !== id);
  }

  async listAssets(filters?: any): Promise<Asset[]> {
    return this.assets;
  }

  // Notification operations
  async createNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    this.notifications.push(newNotification);
    return newNotification;
  }

  async getNotification(id: string): Promise<Notification | null> {
    return this.notifications.find(notif => notif.id === id) || null;
  }

  async updateNotification(id: string, updates: Partial<Notification>): Promise<Notification> {
    const index = this.notifications.findIndex(notif => notif.id === id);
    if (index === -1) throw new Error('Notification not found');
    this.notifications[index] = { ...this.notifications[index], ...updates };
    return this.notifications[index];
  }

  async deleteNotification(id: string): Promise<void> {
    this.notifications = this.notifications.filter(notif => notif.id !== id);
  }

  async listNotifications(filters?: any): Promise<Notification[]> {
    return this.notifications;
  }
}

// Database configuration and factory
export interface DatabaseConfig {
  type: 'local' | 'postgresql' | 'mongodb' | 'mysql';
  connectionString?: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
}

export class DatabaseFactory {
  static createService(config: DatabaseConfig): DatabaseService {
    switch (config.type) {
      case 'local':
        return new MockDatabaseService();
      case 'postgresql':
        // TODO: Implement PostgreSQL service
        throw new Error('PostgreSQL service not implemented yet');
      case 'mongodb':
        // TODO: Implement MongoDB service
        throw new Error('MongoDB service not implemented yet');
      case 'mysql':
        // TODO: Implement MySQL service
        throw new Error('MySQL service not implemented yet');
      default:
        throw new Error(`Unsupported database type: ${config.type}`);
    }
  }
}

// Global database instance
let dbService: DatabaseService | null = null;

export const getDatabase = (): DatabaseService => {
  if (!dbService) {
    // For now, use mock database
    // In production, this would read from environment variables
    const config: DatabaseConfig = {
      type: 'local'
    };
    dbService = DatabaseFactory.createService(config);
  }
  return dbService;
};

// Utility functions for common operations
export const dataUtils = {
  // Generate unique ID
  generateId: (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Format currency
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },

  // Format date
  formatDate: (date: string | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Calculate percentage
  calculatePercentage: (value: number, total: number): number => {
    return total > 0 ? (value / total) * 100 : 0;
  }
};
