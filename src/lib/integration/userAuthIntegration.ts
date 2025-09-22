/**
 * User Authentication Integration
 * 
 * This service integrates the existing userAuthService with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { userAuthService } from '@/lib/userAuthService';
import { User } from '@/lib/database/models';

export class UserAuthIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Login user with database integration
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Use mock service first for faster login
      const mockResult = await userAuthService.login(email, password);
      if (mockResult.success) {
        // Background sync to database (non-blocking)
        if (this.useDatabase) {
          this.syncUserToDatabase(mockResult.user).catch(error => {
            console.log('Background user sync failed:', error);
          });
        }
        return { success: true, user: mockResult.user };
      }

      // Handle special error cases (pending approval, suspended account)
      if (mockResult.requiresApproval || mockResult.accountSuspended) {
        return {
          success: false,
          error: mockResult.error,
          requiresApproval: mockResult.requiresApproval,
          accountSuspended: mockResult.accountSuspended,
          user: mockResult.user
        };
      }

      // If mock login fails, try database (but with timeout)
      if (this.useDatabase) {
        try {
          const dbResult = await Promise.race([
            workingDatabaseService.getUserByEmail(email),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), 2000))
          ]) as any;
          
          if (dbResult.success && dbResult.data) {
            // Verify password with mock service
            const passwordCheck = await userAuthService.login(email, password);
            if (passwordCheck.success) {
              return { success: true, user: dbResult.data };
            }
          }
        } catch (dbError) {
          console.log('Database login failed, using mock data:', dbError);
        }
      }

      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }

  /**
   * Register user with database integration
   */
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    role?: 'investor' | 'issuer';
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Use mock service first for faster registration
      const mockResult = await userAuthService.register(userData);
      if (mockResult.success) {
        // Background sync to database (non-blocking)
        if (this.useDatabase) {
          this.syncUserToDatabase(mockResult.user).catch(error => {
            console.log('Background user sync failed:', error);
          });
        }
        return { success: true, user: mockResult.user };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  }

  /**
   * Get user by ID with database integration
   */
  async getUserById(id: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getUserById(id);
        if (dbResult.success && dbResult.data) {
          return { success: true, user: dbResult.data };
        }
      }

      // Fallback to mock service
      const mockResult = await userAuthService.getUserById(id);
      if (mockResult.success) {
        return { success: true, user: mockResult.user };
      }

      return { success: false, error: 'User not found' };
    } catch (error) {
      console.error('Get user error:', error);
      return { success: false, error: 'Failed to get user' };
    }
  }

  /**
   * Get all users with database integration
   */
  async getAllUsers(): Promise<{ success: boolean; users?: User[]; error?: string }> {
    try {
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getUsers({ pageSize: 100 });
        if (dbResult.success && dbResult.data) {
          return { success: true, users: dbResult.data.items };
        }
      }

      // Fallback to mock service
      const mockUsers = userAuthService.getAllUsers();
      return { success: true, users: mockUsers };
    } catch (error) {
      console.error('Get all users error:', error);
      return { success: false, error: 'Failed to get users' };
    }
  }

  /**
   * Sync user from mock service to database
   */
  private async syncUserToDatabase(mockUser: any): Promise<void> {
    try {
      const dbResult = await workingDatabaseService.createUser({
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        country: mockUser.country || 'UAE',
        role: mockUser.role || 'investor',
        status: mockUser.status || 'active',
        accountType: mockUser.accountType || 'individual',
        kycStatus: mockUser.kycStatus || 'not_started',
        totalInvested: mockUser.totalInvested || 0,
        investmentLimit: mockUser.investmentLimit || 100000,
        permissions: mockUser.permissions || ['view_dashboard'],
        twoFactorEnabled: mockUser.twoFactorEnabled || false,
        emailVerified: mockUser.emailVerified || false
      });

      if (dbResult.success) {
        console.log('User synced to database:', mockUser.email);
      }
    } catch (error) {
      console.error('Error syncing user to database:', error);
    }
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`UserAuthIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Update user with database integration
   */
  async updateUser(userId: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Try database first if enabled
      if (this.useDatabase) {
        try {
          const dbResult = await workingDatabaseService.updateUser(userId, updates);
          if (dbResult.success && dbResult.data) {
            // Also update in mock service for consistency
            await userAuthService.updateUser(userId, updates);
            return { success: true, user: dbResult.data };
          }
        } catch (dbError) {
          console.log('Database update failed, using mock service:', dbError);
        }
      }

      // Fallback to mock service
      const mockResult = await userAuthService.updateUser(userId, updates);
      if (mockResult) {
        // Background sync to database (non-blocking)
        if (this.useDatabase) {
          this.syncUserToDatabase(mockResult).catch(error => {
            console.log('Background user sync failed:', error);
          });
        }
        return { success: true, user: mockResult };
      }

      return { success: false, error: 'Failed to update user' };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Update failed' };
    }
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const userAuthIntegration = new UserAuthIntegration();
