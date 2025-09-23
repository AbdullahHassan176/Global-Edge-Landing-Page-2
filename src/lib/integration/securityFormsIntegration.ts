/**
 * Security Forms & Waitlist Integration
 * 
 * This service tracks security forms, waitlist applications, and user information
 * with database integration and fallback to mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { userAuthService } from '@/lib/userAuthService';

export interface SecurityForm {
  id: string;
  type: 'kyc' | 'aml' | 'compliance' | 'risk_assessment' | 'identity_verification';
  userId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected' | 'expired';
  formData: any;
  submittedAt: string;
  completedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  attachments?: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expiresAt?: string;
  metadata?: any;
}

export interface WaitlistApplication {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  role: 'investor' | 'issuer' | 'partner';
  status: 'pending' | 'approved' | 'rejected' | 'on_hold';
  submittedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  priority: 'low' | 'medium' | 'high';
  source: 'website' | 'referral' | 'event' | 'social_media' | 'other';
  notes?: string;
  metadata?: any;
}

export interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  role: 'investor' | 'issuer' | 'admin' | 'moderator';
  status: 'active' | 'pending' | 'suspended' | 'verified';
  kycStatus: 'not_started' | 'in_progress' | 'pending_review' | 'approved' | 'rejected';
  createdAt: string;
  lastLogin?: string;
  totalInvestments?: number;
  totalAssets?: number;
  complianceScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  metadata?: any;
}

export class SecurityFormsIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Get all security forms with database integration
   */
  async getSecurityForms(): Promise<{ success: boolean; forms?: SecurityForm[]; error?: string }> {
    try {
      // Use mock service for now (database integration needs proper security forms container)
      const mockForms = this.getMockSecurityForms();
      return { success: true, forms: mockForms };
    } catch (error) {
      console.error('Get security forms error:', error);
      return { success: false, error: 'Failed to get security forms' };
    }
  }

  /**
   * Get security forms by user ID
   */
  async getSecurityFormsByUserId(userId: string): Promise<{ success: boolean; forms?: SecurityForm[]; error?: string }> {
    try {
      const result = await this.getSecurityForms();
      if (result.success && result.forms) {
        const userForms = result.forms.filter(form => form.userId === userId);
        return { success: true, forms: userForms };
      }
      return result;
    } catch (error) {
      console.error('Get security forms by user ID error:', error);
      return { success: false, error: 'Failed to get security forms' };
    }
  }

  /**
   * Create new security form
   */
  async createSecurityForm(formData: Omit<SecurityForm, 'id' | 'submittedAt'>): Promise<{ success: boolean; form?: SecurityForm; error?: string }> {
    try {
      const newForm: SecurityForm = {
        ...formData,
        id: `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        submittedAt: new Date().toISOString()
      };

      // For now, just return success (in real implementation, store in database)
      return { success: true, form: newForm };
    } catch (error) {
      console.error('Create security form error:', error);
      return { success: false, error: 'Failed to create security form' };
    }
  }

  /**
   * Update security form status
   */
  async updateSecurityFormStatus(
    formId: string, 
    status: SecurityForm['status'], 
    reviewedBy?: string, 
    reviewNotes?: string
  ): Promise<{ success: boolean; form?: SecurityForm; error?: string }> {
    try {
      // In a real implementation, update the form in the database
      // For now, return success
      return { success: true };
    } catch (error) {
      console.error('Update security form status error:', error);
      return { success: false, error: 'Failed to update security form status' };
    }
  }

  /**
   * Get all waitlist applications
   */
  async getWaitlistApplications(): Promise<{ success: boolean; applications?: WaitlistApplication[]; error?: string }> {
    try {
      // Use mock service for now (database integration needs proper waitlist container)
      const mockApplications = this.getMockWaitlistApplications();
      return { success: true, applications: mockApplications };
    } catch (error) {
      console.error('Get waitlist applications error:', error);
      return { success: false, error: 'Failed to get waitlist applications' };
    }
  }

  /**
   * Create new waitlist application
   */
  async createWaitlistApplication(applicationData: Omit<WaitlistApplication, 'id' | 'submittedAt'>): Promise<{ success: boolean; application?: WaitlistApplication; error?: string }> {
    try {
      const newApplication: WaitlistApplication = {
        ...applicationData,
        id: `waitlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        submittedAt: new Date().toISOString()
      };

      // For now, just return success
      return { success: true, application: newApplication };
    } catch (error) {
      console.error('Create waitlist application error:', error);
      return { success: false, error: 'Failed to create waitlist application' };
    }
  }

  /**
   * Update waitlist application status
   */
  async updateWaitlistApplicationStatus(
    applicationId: string, 
    status: WaitlistApplication['status'], 
    approvedBy?: string, 
    notes?: string
  ): Promise<{ success: boolean; application?: WaitlistApplication; error?: string }> {
    try {
      // In a real implementation, update the application in the database
      // For now, return success
      return { success: true };
    } catch (error) {
      console.error('Update waitlist application status error:', error);
      return { success: false, error: 'Failed to update waitlist application status' };
    }
  }

  /**
   * Get comprehensive user information
   */
  async getUserInfo(): Promise<{ success: boolean; users?: UserInfo[]; error?: string }> {
    try {
      // Use mock service for now (database integration needs proper user info container)
      const mockUsers = userAuthService.getAllUsers();
      const userInfo = mockUsers.map(user => this.mapToUserInfo(user));
      return { success: true, users: userInfo };
    } catch (error) {
      console.error('Get user info error:', error);
      return { success: false, error: 'Failed to get user info' };
    }
  }

  /**
   * Get security and compliance statistics
   */
  async getSecurityStats(): Promise<{ success: boolean; stats?: any; error?: string }> {
    try {
      const [formsResult, applicationsResult, usersResult] = await Promise.all([
        this.getSecurityForms(),
        this.getWaitlistApplications(),
        this.getUserInfo()
      ]);

      const forms = formsResult.forms || [];
      const applications = applicationsResult.applications || [];
      const users = usersResult.users || [];

      const stats = {
        securityForms: {
          total: forms.length,
          pending: forms.filter(f => f.status === 'pending').length,
          inProgress: forms.filter(f => f.status === 'in_progress').length,
          completed: forms.filter(f => f.status === 'completed').length,
          rejected: forms.filter(f => f.status === 'rejected').length,
          byType: {
            kyc: forms.filter(f => f.type === 'kyc').length,
            aml: forms.filter(f => f.type === 'aml').length,
            compliance: forms.filter(f => f.type === 'compliance').length,
            risk_assessment: forms.filter(f => f.type === 'risk_assessment').length,
            identity_verification: forms.filter(f => f.type === 'identity_verification').length
          }
        },
        waitlistApplications: {
          total: applications.length,
          pending: applications.filter(a => a.status === 'pending').length,
          approved: applications.filter(a => a.status === 'approved').length,
          rejected: applications.filter(a => a.status === 'rejected').length,
          onHold: applications.filter(a => a.status === 'on_hold').length,
          byRole: {
            investors: applications.filter(a => a.role === 'investor').length,
            issuers: applications.filter(a => a.role === 'issuer').length,
            partners: applications.filter(a => a.role === 'partner').length
          }
        },
        users: {
          total: users.length,
          active: users.filter(u => u.status === 'active').length,
          pending: users.filter(u => u.status === 'pending').length,
          suspended: users.filter(u => u.status === 'suspended').length,
          verified: users.filter(u => u.status === 'verified').length,
          kycStatus: {
            notStarted: users.filter(u => u.kycStatus === 'not_started').length,
            inProgress: users.filter(u => u.kycStatus === 'in_progress').length,
            pendingReview: users.filter(u => u.kycStatus === 'pending_review').length,
            approved: users.filter(u => u.kycStatus === 'approved').length,
            rejected: users.filter(u => u.kycStatus === 'rejected').length
          }
        }
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get security stats error:', error);
      return { success: false, error: 'Failed to get security stats' };
    }
  }

  /**
   * Map database item to SecurityForm
   */
  private mapToSecurityForm(item: any): SecurityForm {
    return {
      id: item.id,
      type: item.formType || 'kyc',
      userId: item.userId || item.id,
      status: item.status || 'pending',
      formData: item.formData || {},
      submittedAt: item.submittedAt || item.createdAt,
      completedAt: item.completedAt,
      reviewedBy: item.reviewedBy,
      reviewNotes: item.reviewNotes,
      attachments: item.attachments || [],
      priority: item.priority || 'medium',
      expiresAt: item.expiresAt,
      metadata: item.metadata || {}
    };
  }

  /**
   * Map database item to WaitlistApplication
   */
  private mapToWaitlistApplication(item: any): WaitlistApplication {
    return {
      id: item.id,
      email: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      country: item.country,
      role: item.role || 'investor',
      status: item.status || 'pending',
      submittedAt: item.submittedAt || item.createdAt,
      approvedAt: item.approvedAt,
      approvedBy: item.approvedBy,
      priority: item.priority || 'medium',
      source: item.source || 'website',
      notes: item.notes,
      metadata: item.metadata || {}
    };
  }

  /**
   * Map database item to UserInfo
   */
  private mapToUserInfo(item: any): UserInfo {
    return {
      id: item.id,
      email: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      country: item.country,
      role: item.role || 'investor',
      status: item.status || 'active',
      kycStatus: item.kycStatus || 'not_started',
      createdAt: item.createdAt,
      lastLogin: item.lastLogin,
      totalInvestments: item.totalInvestments || 0,
      totalAssets: item.totalAssets || 0,
      complianceScore: item.complianceScore || 0,
      riskLevel: item.riskLevel || 'medium',
      metadata: item.metadata || {}
    };
  }

  /**
   * Get mock security forms
   */
  private getMockSecurityForms(): SecurityForm[] {
    return [
      {
        id: 'form_1',
        type: 'kyc',
        userId: 'user_1',
        status: 'completed',
        formData: { documents: ['passport', 'utility_bill'] },
        submittedAt: '2024-01-15T10:00:00Z',
        completedAt: '2024-01-16T14:30:00Z',
        reviewedBy: 'admin_1',
        reviewNotes: 'All documents verified',
        attachments: ['passport.pdf', 'utility_bill.pdf'],
        priority: 'high',
        metadata: { source: 'web_form' }
      },
      {
        id: 'form_2',
        type: 'aml',
        userId: 'user_2',
        status: 'in_progress',
        formData: { riskAssessment: 'medium' },
        submittedAt: '2024-01-20T09:00:00Z',
        priority: 'medium',
        metadata: { source: 'mobile_app' }
      }
    ];
  }

  /**
   * Get mock waitlist applications
   */
  private getMockWaitlistApplications(): WaitlistApplication[] {
    return [
      {
        id: 'waitlist_1',
        email: 'investor@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1-555-0123',
        country: 'USA',
        role: 'investor',
        status: 'approved',
        submittedAt: '2024-01-10T08:00:00Z',
        approvedAt: '2024-01-12T10:00:00Z',
        approvedBy: 'admin_1',
        priority: 'high',
        source: 'website',
        notes: 'High net worth individual'
      },
      {
        id: 'waitlist_2',
        email: 'issuer@company.com',
        firstName: 'Jane',
        lastName: 'Smith',
        country: 'UAE',
        role: 'issuer',
        status: 'pending',
        submittedAt: '2024-01-18T14:00:00Z',
        priority: 'medium',
        source: 'referral',
        notes: 'Real estate company'
      }
    ];
  }
}

// Export singleton instance
export const securityFormsIntegration = new SecurityFormsIntegration();
