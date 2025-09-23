/**
 * User Authentication Service
 * Handles authentication for both Issuers and Investors
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'issuer' | 'investor';
  status: 'active' | 'pending' | 'suspended' | 'kyc_pending' | 'kyc_approved' | 'kyc_rejected';
  company?: string;
  phone?: string;
  country?: string;
  kycStatus: 'not_started' | 'in_progress' | 'pending_review' | 'approved' | 'rejected';
  kycDocuments?: KycDocument[];
  investmentLimit?: number;
  totalInvested?: number;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  preferences?: UserPreferences;
  branding?: WhitelabelBranding;
}

export interface KycDocument {
  id: string;
  type: 'passport' | 'drivers_license' | 'national_id' | 'utility_bill' | 'bank_statement' | 'company_registration';
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  url: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  investmentAlerts: boolean;
  marketingEmails: boolean;
  language: string;
  timezone: string;
  currency: string;
}

export interface WhitelabelBranding {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  companyName: string;
  domain?: string;
  customCss?: string;
  footerText?: string;
  supportEmail?: string;
  supportPhone?: string;
}

export interface Investment {
  id: string;
  userId: string;
  assetId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  kycRequired: boolean;
  kycCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  rejectionReason?: string;
  documents?: InvestmentDocument[];
}

export interface InvestmentDocument {
  id: string;
  type: 'investment_agreement' | 'kyc_document' | 'proof_of_funds' | 'tax_document';
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  url: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'investment_update' | 'kyc_required' | 'kyc_approved' | 'kyc_rejected' | 'payment_required' | 'investment_completed' | 'system_alert';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

// Mock data for development
const MOCK_USERS: User[] = [
  {
    id: 'demo-admin-1',
    email: 'admin@globalnext.rocks',
    firstName: 'Demo',
    lastName: 'Admin',
    role: 'investor', // Using investor role for demo purposes
    status: 'active',
    phone: '+971501234567',
    country: 'UAE',
    kycStatus: 'approved',
    investmentLimit: 1000000,
    totalInvested: 0,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-01-20T14:30:00Z',
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      investmentAlerts: true,
      marketingEmails: false,
      language: 'en',
      timezone: 'Asia/Dubai',
      currency: 'USD'
    }
  },
  {
    id: 'demo-investor-1',
    email: 'investor@globalnext.rocks',
    firstName: 'Demo',
    lastName: 'Investor',
    role: 'investor',
    status: 'active',
    phone: '+971507654321',
    country: 'UAE',
    kycStatus: 'approved',
    investmentLimit: 1000000,
    totalInvested: 250000,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-20T16:45:00Z',
    lastLogin: '2024-01-20T16:45:00Z',
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      investmentAlerts: true,
      marketingEmails: true,
      language: 'en',
      timezone: 'Asia/Dubai',
      currency: 'USD'
    }
  },
  {
    id: 'demo-issuer-1',
    email: 'issuer@globalnext.rocks',
    firstName: 'Demo',
    lastName: 'Issuer',
    role: 'issuer',
    status: 'active',
    company: 'Global Edge Demo Holdings',
    phone: '+971501234567',
    country: 'UAE',
    kycStatus: 'approved',
    investmentLimit: 0,
    totalInvested: 0,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-01-20T14:30:00Z',
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      investmentAlerts: true,
      marketingEmails: false,
      language: 'en',
      timezone: 'Asia/Dubai',
      currency: 'USD'
    },
    branding: {
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      companyName: 'Global Edge Demo Holdings',
      supportEmail: 'support@globalnext.rocks',
      supportPhone: '+971501234567'
    }
  }
];

const MOCK_INVESTMENTS: Investment[] = [
  {
    id: 'inv-1',
    userId: 'demo-investor-1',
    assetId: 'asset-1',
    amount: 50000,
    status: 'completed',
    kycRequired: true,
    kycCompleted: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
    completedAt: '2024-01-18T14:30:00Z'
  },
  {
    id: 'inv-2',
    userId: 'demo-investor-1',
    assetId: 'asset-2',
    amount: 75000,
    status: 'pending',
    kycRequired: true,
    kycCompleted: false,
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-20T09:15:00Z'
  }
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'demo-investor-1',
    type: 'investment_completed',
    title: 'Investment Completed',
    message: 'Your investment in Dubai Marina Office Tower has been successfully completed.',
    read: false,
    createdAt: '2024-01-18T14:30:00Z',
    actionUrl: '/investor/investments/inv-1',
    priority: 'high'
  },
  {
    id: 'notif-2',
    userId: 'demo-investor-1',
    type: 'kyc_required',
    title: 'KYC Verification Required',
    message: 'Please complete your KYC verification to proceed with your investment.',
    read: false,
    createdAt: '2024-01-20T09:15:00Z',
    actionUrl: '/investor/kyc',
    priority: 'urgent'
  }
];

class UserAuthService {
  private readonly SESSION_KEY = 'user_session';
  private readonly STORAGE_KEY = 'user_data';

  // Password reset methods
  async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Get all users (including newly registered ones)
      const allUsers = this.getAllUsers();
      const user = allUsers.find(u => u.email === email);
      
      if (!user) {
        // For security, don't reveal if email exists or not
        return { success: true };
      }

      // Generate reset token (in production, this would be a secure random token)
      const resetToken = this.generateResetToken();
      
      // Store reset token with expiration (in production, store in database)
      const resetData = {
        token: resetToken,
        email: user.email,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        used: false
      };
      
      localStorage.setItem(`reset_token_${resetToken}`, JSON.stringify(resetData));
      
      // Send password reset email
      try {
        const { emailService } = await import('@/lib/services/emailService');
        const emailResult = await emailService.sendPasswordResetEmail(user.email, resetToken);
        
        if (!emailResult.success) {
          console.error('Failed to send password reset email:', emailResult.error);
          // Still return success for security (don't reveal email sending issues)
        }
      } catch (emailError) {
        console.error('Email service error:', emailError);
        // Fallback to console log for development
        console.log(`Password reset token for ${email}: ${resetToken}`);
        console.log(`Reset link: ${window.location.origin}/reset-password?token=${resetToken}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Password reset request error:', error);
      return { success: false, error: 'Failed to process password reset request' };
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Get reset token data
      const resetData = localStorage.getItem(`reset_token_${token}`);
      if (!resetData) {
        return { success: false, error: 'Invalid or expired reset token' };
      }

      const tokenData = JSON.parse(resetData);
      
      // Check if token is expired
      if (new Date() > new Date(tokenData.expiresAt)) {
        localStorage.removeItem(`reset_token_${token}`);
        return { success: false, error: 'Reset token has expired' };
      }

      // Check if token is already used
      if (tokenData.used) {
        return { success: false, error: 'Reset token has already been used' };
      }

      // Get user and update password
      const allUsers = this.getAllUsers();
      const user = allUsers.find(u => u.email === tokenData.email);
      
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Update user with new password (in production, hash the password)
      user.updatedAt = new Date().toISOString();
      
      // Store the new password in localStorage for demo purposes
      // In production, you would hash and store the password securely in a database
      const storedPasswords = localStorage.getItem('user_passwords');
      const validPasswords: Record<string, string> = storedPasswords ? JSON.parse(storedPasswords) : {
        'admin@globalnext.rocks': 'DemoAdmin123!',
        'investor@globalnext.rocks': 'DemoInvestor123!',
        'issuer@globalnext.rocks': 'DemoIssuer123!'
      };
      
      // Update the password for this user
      validPasswords[user.email] = newPassword;
      
      // Save updated passwords
      localStorage.setItem('user_passwords', JSON.stringify(validPasswords));
      
      // Store updated user
      this.saveUser(user);
      
      // Mark token as used
      tokenData.used = true;
      localStorage.setItem(`reset_token_${token}`, JSON.stringify(tokenData));
      
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Failed to reset password' };
    }
  }

  private generateResetToken(): string {
    // In production, use a cryptographically secure random token
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Authentication methods
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Get all users (including newly registered ones)
      const allUsers = this.getAllUsers();
      const user = allUsers.find(u => u.email === email);
      
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Get stored passwords from localStorage
      const storedPasswords = localStorage.getItem('user_passwords');
      const validPasswords: Record<string, string> = storedPasswords ? JSON.parse(storedPasswords) : {
        'admin@globalnext.rocks': 'DemoAdmin123!',
        'investor@globalnext.rocks': 'DemoInvestor123!',
        'issuer@globalnext.rocks': 'DemoIssuer123!'
      };

      // For newly registered users, use a default password or check if they have a stored password
      const expectedPassword = validPasswords[email] || process.env.DEFAULT_USER_PASSWORD || 'Password123!'; // Default password for new users

      if (expectedPassword !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Check user status
      if (user.status === 'pending') {
        return { 
          success: false, 
          error: 'Your account is pending admin approval. Please wait for approval or contact support if not approved within 48 hours.',
          user: user,
          requiresApproval: true
        };
      }

      if (user.status === 'suspended') {
        return { 
          success: false, 
          error: 'Your account has been suspended. Please contact support for assistance.',
          user: user,
          accountSuspended: true
        };
      }

      // Create session
      const session = {
        userId: user.id,
        email: user.email,
        role: user.role,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };

      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

      // Update last login
      user.lastLogin = new Date().toISOString();
      this.saveUser(user);

      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  async register(userData: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === userData.email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email!,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        role: userData.role!,
        status: 'pending',
        kycStatus: 'not_started',
        investmentLimit: userData.role === 'investor' ? 100000 : 0,
        totalInvested: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          investmentAlerts: true,
          marketingEmails: false,
          language: 'en',
          timezone: 'Asia/Dubai',
          currency: 'USD'
        }
      };

      // Add to mock users for immediate access
      MOCK_USERS.push(newUser);
      
      // Also save to localStorage for persistence
      const storedUsers = localStorage.getItem('registered_users');
      const existingUsers = storedUsers ? JSON.parse(storedUsers) : [];
      existingUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(existingUsers));

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) return false;

    try {
      const sessionData = JSON.parse(session);
      const now = new Date();
      const expiresAt = new Date(sessionData.expiresAt);
      
      return now < expiresAt;
    } catch {
      return false;
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(this.STORAGE_KEY);
    if (!userData) return null;

    try {
      const user = JSON.parse(userData);
      // Verify user still exists in our system
      const allUsers = this.getAllUsers();
      const currentUser = allUsers.find(u => u.id === user.id);
      return currentUser || null;
    } catch {
      return null;
    }
  }

  // User management methods
  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
      if (userIndex === -1) return null;

      MOCK_USERS[userIndex] = {
        ...MOCK_USERS[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.saveUsers();
      return MOCK_USERS[userIndex];
    } catch (error) {
      console.error('Update user error:', error);
      return null;
    }
  }

  async updateKycStatus(userId: string, status: User['kycStatus'], documents?: KycDocument[]): Promise<boolean> {
    try {
      const user = await this.updateUser(userId, { 
        kycStatus: status, 
        kycDocuments: documents,
        status: status === 'approved' ? 'active' : 'kyc_pending'
      });
      return user !== null;
    } catch (error) {
      console.error('Update KYC status error:', error);
      return false;
    }
  }

  // Investment methods
  async createInvestment(investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Investment> {
    const newInvestment: Investment = {
      ...investment,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    MOCK_INVESTMENTS.push(newInvestment);
    this.saveInvestments();

    // Create notification
    await this.createNotification({
      userId: investment.userId,
      type: 'investment_update',
      title: 'Investment Created',
      message: `Your investment of $${investment.amount.toLocaleString()} has been created and is pending review.`,
      priority: 'medium',
      actionUrl: `/investor/investments/${newInvestment.id}`
    });

    return newInvestment;
  }

  async getInvestments(userId: string): Promise<Investment[]> {
    return MOCK_INVESTMENTS.filter(inv => inv.userId === userId);
  }

  async updateInvestmentStatus(investmentId: string, status: Investment['status'], reason?: string): Promise<boolean> {
    try {
      const investment = MOCK_INVESTMENTS.find(inv => inv.id === investmentId);
      if (!investment) return false;

      investment.status = status;
      investment.updatedAt = new Date().toISOString();
      
      if (status === 'completed') {
        investment.completedAt = new Date().toISOString();
      }
      
      if (reason) {
        investment.rejectionReason = reason;
      }

      this.saveInvestments();

      // Create notification
      const notificationType = status === 'completed' ? 'investment_completed' : 
                              status === 'rejected' ? 'investment_update' : 'investment_update';
      
      await this.createNotification({
        userId: investment.userId,
        type: notificationType,
        title: `Investment ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        message: `Your investment has been ${status}.${reason ? ` Reason: ${reason}` : ''}`,
        priority: status === 'rejected' ? 'high' : 'medium',
        actionUrl: `/investor/investments/${investmentId}`
      });

      return true;
    } catch (error) {
      console.error('Update investment status error:', error);
      return false;
    }
  }

  // Notification methods
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };

    MOCK_NOTIFICATIONS.push(newNotification);
    this.saveNotifications();

    return newNotification;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    return MOCK_NOTIFICATIONS.filter(notif => notif.userId === userId);
  }

  async markNotificationAsRead(notificationId: string): Promise<boolean> {
    try {
      const notification = MOCK_NOTIFICATIONS.find(notif => notif.id === notificationId);
      if (!notification) return false;

      notification.read = true;
      this.saveNotifications();
      return true;
    } catch (error) {
      console.error('Mark notification as read error:', error);
      return false;
    }
  }

  // Analytics methods
  async getUserAnalytics(userId: string): Promise<{
    totalInvestments: number;
    totalInvested: number;
    activeInvestments: number;
    completedInvestments: number;
    kycStatus: string;
    lastInvestmentDate?: string;
  }> {
    const investments = await this.getInvestments(userId);
    const user = this.getCurrentUser();

    return {
      totalInvestments: investments.length,
      totalInvested: investments.reduce((sum, inv) => sum + inv.amount, 0),
      activeInvestments: investments.filter(inv => inv.status === 'pending' || inv.status === 'approved').length,
      completedInvestments: investments.filter(inv => inv.status === 'completed').length,
      kycStatus: user?.kycStatus || 'not_started',
      lastInvestmentDate: investments.length > 0 ? investments[investments.length - 1].createdAt : undefined
    };
  }

  // Whitelabel methods
  async updateBranding(userId: string, branding: Partial<WhitelabelBranding>): Promise<boolean> {
    try {
      const user = await this.updateUser(userId, { branding: branding as WhitelabelBranding });
      return user !== null;
    } catch (error) {
      console.error('Update branding error:', error);
      return false;
    }
  }

  // Storage methods
  getAllUsers(): User[] {
    if (typeof window === 'undefined') return MOCK_USERS;
    
    // Get registered users from localStorage
    const registeredUsers = localStorage.getItem('registered_users');
    const additionalUsers = registeredUsers ? JSON.parse(registeredUsers) : [];
    
    // Combine mock users with registered users, avoiding duplicates
    const allUsers = [...MOCK_USERS];
    additionalUsers.forEach((user: User) => {
      if (!allUsers.find(u => u.id === user.id)) {
        allUsers.push(user);
      }
    });
    
    return allUsers;
  }

  private saveUsers(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_users', JSON.stringify(MOCK_USERS));
    }
  }

  private saveInvestments(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_investments', JSON.stringify(MOCK_INVESTMENTS));
    }
  }

  private saveNotifications(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_notifications', JSON.stringify(MOCK_NOTIFICATIONS));
    }
  }

  private saveUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
  }
}

// Export singleton instance
export const userAuthService = new UserAuthService();
