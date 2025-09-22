/**
 * Admin Authentication Service
 * Handles admin login, logout, and session management
 */

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super-admin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
}

export interface AdminLoginCredentials {
  username: string;
  password: string;
}

// Mock admin users (in production, this would be stored securely in a database)
const ADMIN_USERS: AdminUser[] = [
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@globalnext.rocks',
    role: 'super-admin',
    permissions: ['all'],
    lastLogin: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'admin-2',
    username: 'moderator',
    email: 'moderator@globalnext.rocks',
    role: 'moderator',
    permissions: ['view_users', 'view_notifications', 'view_analytics', 'manage_assets'],
    lastLogin: new Date().toISOString(),
    isActive: true
  }
];

// Mock passwords (in production, these would be hashed and stored securely)
const ADMIN_PASSWORDS: Record<string, string> = {
  'admin': 'GlobalEdge2025!',
  'moderator': 'Moderator123!'
};

class AdminAuthService {
  private readonly SESSION_KEY = 'admin_session';
  private readonly SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours

  /**
   * Authenticate admin user with username and password
   */
  async login(credentials: AdminLoginCredentials): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      // Find admin user
      const adminUser = ADMIN_USERS.find(user => 
        user.username === credentials.username && user.isActive
      );

      if (!adminUser) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Check password
      const correctPassword = ADMIN_PASSWORDS[credentials.username];
      if (credentials.password !== correctPassword) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Update last login
      adminUser.lastLogin = new Date().toISOString();

      // Create session
      const session = {
        user: adminUser,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + this.SESSION_TIMEOUT).toISOString()
      };

      // Store session in localStorage
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

      return { success: true, user: adminUser };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  /**
   * Get current admin session
   */
  getCurrentSession(): { user: AdminUser; loginTime: string; expiresAt: string } | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      
      // Check if session is expired
      if (new Date() > new Date(session.expiresAt)) {
        this.logout();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error getting admin session:', error);
      this.logout();
      return null;
    }
  }

  /**
   * Get current admin user
   */
  getCurrentUser(): AdminUser | null {
    const session = this.getCurrentSession();
    return session ? session.user : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getCurrentSession() !== null;
  }

  /**
   * Check if user has specific permission
   */
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Super admin has all permissions
    if (user.permissions.includes('all')) return true;
    
    return user.permissions.includes(permission);
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  /**
   * Logout admin user
   */
  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  /**
   * Extend session (called on activity)
   */
  extendSession(): void {
    const session = this.getCurrentSession();
    if (session) {
      session.expiresAt = new Date(Date.now() + this.SESSION_TIMEOUT).toISOString();
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }
  }

  /**
   * Get session info for display
   */
  getSessionInfo(): { user: AdminUser; timeRemaining: string } | null {
    const session = this.getCurrentSession();
    if (!session) return null;

    const timeRemaining = this.getTimeRemaining(session.expiresAt);
    return { user: session.user, timeRemaining };
  }

  /**
   * Calculate time remaining in session
   */
  private getTimeRemaining(expiresAt: string): string {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }
}

// Export singleton instance
export const adminAuthService = new AdminAuthService();

// Export types
export type { AdminUser, AdminLoginCredentials };
