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

export interface AdminRegistrationData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'moderator';
  requestedPermissions?: string[];
}

// Mock admin users (in production, this would be stored securely in a database)
const ADMIN_USERS: AdminUser[] = [
  {
    id: 'super-admin-1',
    username: 'abdullah.hassan',
    email: 'abdullah.hassan@globalnext.rocks',
    role: 'super-admin',
    permissions: ['all'],
    lastLogin: new Date().toISOString(),
    isActive: true
  }
];

// Mock passwords (in production, these would be hashed and stored securely)
// These should be moved to environment variables in production
const ADMIN_PASSWORDS: Record<string, string> = {
  'abdullah.hassan': 'Abdullah187!'
};

class AdminAuthService {
  private readonly SESSION_KEY = 'admin_session';
  private readonly STORAGE_KEY = 'admin_users';
  private readonly SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours

  /**
   * Register a new admin user
   */
  async register(registrationData: AdminRegistrationData): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      // Validate input
      if (registrationData.password !== registrationData.confirmPassword) {
        return { success: false, error: 'Passwords do not match' };
      }

      if (registrationData.password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long' };
      }

      // Get all admin users (including registered ones)
      const allUsers = this.getAllAdminUsers();

      // Check if username already exists
      if (allUsers.find(user => user.username === registrationData.username)) {
        return { success: false, error: 'Username already exists' };
      }

      // Check if email already exists
      if (allUsers.find(user => user.email === registrationData.email)) {
        return { success: false, error: 'Email already exists' };
      }

      // Create new admin user
      const newAdminUser: AdminUser = {
        id: `admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        username: registrationData.username,
        email: registrationData.email,
        role: registrationData.role,
        permissions: this.getDefaultPermissions(registrationData.role),
        lastLogin: new Date().toISOString(),
        isActive: true
      };

      // Save to localStorage
      this.saveAdminUser(newAdminUser, registrationData.password);

      return { success: true, user: newAdminUser };
    } catch (error) {
      console.error('Admin registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  /**
   * Authenticate admin user with username and password
   */
  async login(credentials: AdminLoginCredentials): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      // Get all admin users (including registered ones)
      const allUsers = this.getAllAdminUsers();
      
      // Find admin user
      const adminUser = allUsers.find(user => 
        user.username === credentials.username && user.isActive
      );

      if (!adminUser) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Check password (check both hardcoded and stored passwords)
      const correctPassword = this.getAdminPassword(credentials.username);
      if (credentials.password !== correctPassword) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Update last login
      adminUser.lastLogin = new Date().toISOString();
      this.saveAdminUser(adminUser, correctPassword);

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

  /**
   * Get all admin users (hardcoded + registered)
   */
  private getAllAdminUsers(): AdminUser[] {
    if (typeof window === 'undefined') return ADMIN_USERS;
    
    // Get registered users from localStorage
    const registeredUsers = localStorage.getItem(this.STORAGE_KEY);
    const additionalUsers = registeredUsers ? JSON.parse(registeredUsers) : [];
    
    // Combine hardcoded users with registered users, avoiding duplicates
    const allUsers = [...ADMIN_USERS];
    additionalUsers.forEach((user: AdminUser) => {
      if (!allUsers.find(u => u.id === user.id)) {
        allUsers.push(user);
      }
    });
    
    return allUsers;
  }

  /**
   * Get admin password (from hardcoded or stored)
   */
  private getAdminPassword(username: string): string | null {
    // Check hardcoded passwords first
    if (ADMIN_PASSWORDS[username]) {
      return ADMIN_PASSWORDS[username];
    }

    // Check stored passwords
    if (typeof window !== 'undefined') {
      const storedPasswords = localStorage.getItem('admin_passwords');
      if (storedPasswords) {
        const passwords = JSON.parse(storedPasswords);
        return passwords[username] || null;
      }
    }

    return null;
  }

  /**
   * Save admin user and password
   */
  private saveAdminUser(user: AdminUser, password: string): void {
    if (typeof window === 'undefined') return;

    // Save user data
    const storedUsers = localStorage.getItem(this.STORAGE_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const existingIndex = users.findIndex((u: AdminUser) => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

    // Save password
    const storedPasswords = localStorage.getItem('admin_passwords');
    const passwords = storedPasswords ? JSON.parse(storedPasswords) : {};
    passwords[user.username] = password;
    localStorage.setItem('admin_passwords', JSON.stringify(passwords));
  }

  /**
   * Get default permissions for role
   */
  private getDefaultPermissions(role: string): string[] {
    switch (role) {
      case 'admin':
        return [
          'view_users', 'view_notifications', 'view_analytics', 
          'view_content', 'view_security', 'view_settings', 'manage_assets'
        ];
      case 'moderator':
        return [
          'view_users', 'view_notifications', 'view_analytics', 'manage_assets'
        ];
      default:
        return ['view_notifications'];
    }
  }
}

// Export singleton instance
export const adminAuthService = new AdminAuthService();

