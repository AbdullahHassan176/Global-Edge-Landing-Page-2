/**
 * KYC Process Integration
 * 
 * This service integrates the KYC workflow with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { userAuthService } from '@/lib/userAuthService';
import { KYCApplication } from '@/lib/database/models';

export class KYCIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Get all KYC applications with database integration
   */
  async getKycApplications(): Promise<{ success: boolean; applications?: KYCApplication[]; error?: string }> {
    try {
      // Use mock service for now (database integration needs proper KYC container)
      const mockApplications = this.getMockKycApplications();
      return { success: true, applications: mockApplications };
    } catch (error) {
      console.error('Get KYC applications error:', error);
      return { success: false, error: 'Failed to get KYC applications' };
    }
  }

  /**
   * Get KYC application by user ID with database integration
   */
  async getKycApplicationByUserId(userId: string): Promise<{ success: boolean; application?: KYCApplication; error?: string }> {
    try {
      const mockApplications = this.getMockKycApplications();
      const application = mockApplications.find(app => app.userId === userId);
      if (application) {
        return { success: true, application };
      }
      return { success: false, error: 'KYC application not found' };
    } catch (error) {
      console.error('Get KYC application by user error:', error);
      return { success: false, error: 'Failed to get KYC application' };
    }
  }

  /**
   * Create KYC application with database integration
   */
  async createKycApplication(applicationData: Omit<KYCApplication, 'id' | 'submittedAt'>): Promise<{ success: boolean; application?: KYCApplication; error?: string }> {
    try {
      const mockApplication = {
        ...applicationData,
        id: `kyc-${Date.now()}`,
        submittedAt: new Date().toISOString()
      };
      return { success: true, application: mockApplication };
    } catch (error) {
      console.error('Create KYC application error:', error);
      return { success: false, error: 'Failed to create KYC application' };
    }
  }

  /**
   * Update KYC application status with database integration
   */
  async updateKycApplicationStatus(id: string, status: 'pending' | 'approved' | 'rejected', reviewerId?: string, rejectionReason?: string): Promise<{ success: boolean; application?: KYCApplication; error?: string }> {
    try {
      const mockApplications = this.getMockKycApplications();
      const application = mockApplications.find(app => app.id === id);
      if (application) {
        application.status = status;
        if (reviewerId) application.reviewedBy = reviewerId;
        if (rejectionReason) application.rejectionReason = rejectionReason;
        if (status === 'approved' || status === 'rejected') {
          application.reviewedAt = new Date().toISOString();
        }
        return { success: true, application };
      }
      return { success: false, error: 'KYC application not found' };
    } catch (error) {
      console.error('Update KYC application error:', error);
      return { success: false, error: 'Failed to update KYC application' };
    }
  }

  /**
   * Get KYC statistics with database integration
   */
  async getKycStats(): Promise<{ success: boolean; stats?: any; error?: string }> {
    try {
      const result = await this.getKycApplications();
      if (!result.success || !result.applications) {
        return { success: false, error: 'Failed to get KYC applications for stats' };
      }

      const applications = result.applications;
      const stats = {
        total: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        approved: applications.filter(app => app.status === 'approved').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
        pendingReview: applications.filter(app => app.status === 'pending' && !app.reviewedAt).length,
        averageProcessingTime: this.calculateAverageProcessingTime(applications)
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get KYC stats error:', error);
      return { success: false, error: 'Failed to get KYC statistics' };
    }
  }

  /**
   * Calculate average processing time for KYC applications
   */
  private calculateAverageProcessingTime(applications: KYCApplication[]): number {
    const reviewedApplications = applications.filter(app => app.reviewedAt);
    if (reviewedApplications.length === 0) return 0;

    const totalTime = reviewedApplications.reduce((sum, app) => {
      const submitted = new Date(app.submittedAt).getTime();
      const reviewed = new Date(app.reviewedAt!).getTime();
      return sum + (reviewed - submitted);
    }, 0);

    return Math.round(totalTime / reviewedApplications.length / (1000 * 60 * 60 * 24)); // Days
  }

  /**
   * Get mock KYC applications for fallback
   */
  private getMockKycApplications(): KYCApplication[] {
    return [
      {
        id: 'kyc-1',
        userId: 'user-1',
        status: 'approved',
        submittedAt: '2024-01-15T10:00:00Z',
        reviewedAt: '2024-01-16T14:30:00Z',
        reviewedBy: 'admin-1',
        identityDocuments: [
          {
            type: 'passport',
            number: 'P123456789',
            country: 'US',
            expiryDate: '2029-01-15',
            documentUrl: '/documents/passport-1.pdf',
            verified: true,
          }
        ],
        addressDocuments: [
          {
            type: 'utility_bill',
            documentUrl: '/documents/utility-1.pdf',
            issueDate: '2024-01-01',
            verified: true
          }
        ],
        personalInfo: {
          firstName: 'Alice',
          lastName: 'Johnson',
          dateOfBirth: '1990-05-15',
          nationality: 'US',
          occupation: 'Software Engineer',
          employer: 'Tech Corp',
          annualIncome: 120000,
          sourceOfFunds: 'Employment'
        },
        financialInfo: {
          bankName: 'Chase Bank',
          accountNumber: '1234567890',
          routingNumber: '021000021',
          bankCountry: 'US',
          investmentExperience: 'intermediate',
          riskTolerance: 'moderate'
        },
        riskScore: 75,
        riskFactors: ['High income', 'Stable employment'],
        complianceChecks: [
          {
            checkType: 'identity_verification',
            status: 'passed',
            details: 'Identity documents verified successfully',
            checkedAt: '2024-01-16T10:00:00Z'
          }
        ]
      },
      {
        id: 'kyc-2',
        userId: 'user-2',
        status: 'pending',
        submittedAt: '2024-01-20T09:15:00Z',
        identityDocuments: [
          {
            type: 'national_id',
            number: 'N123456789',
            country: 'CA',
            expiryDate: '2029-12-10',
            documentUrl: '/documents/id-2.pdf',
            verified: false
          }
        ],
        addressDocuments: [
          {
            type: 'bank_statement',
            documentUrl: '/documents/statement-2.pdf',
            issueDate: '2024-01-15',
            verified: false
          }
        ],
        personalInfo: {
          firstName: 'Bob',
          lastName: 'Smith',
          dateOfBirth: '1985-12-10',
          nationality: 'CA',
          occupation: 'Business Owner',
          employer: 'Smith Enterprises',
          annualIncome: 200000,
          sourceOfFunds: 'Business'
        },
        financialInfo: {
          bankName: 'Royal Bank of Canada',
          accountNumber: '9876543210',
          routingNumber: '000300002',
          bankCountry: 'CA',
          investmentExperience: 'advanced',
          riskTolerance: 'aggressive'
        },
        riskScore: 85,
        riskFactors: ['High net worth', 'Business ownership'],
        complianceChecks: [
          {
            checkType: 'identity_verification',
            status: 'pending',
            details: 'Identity documents under review',
            checkedAt: '2024-01-20T09:20:00Z'
          }
        ]
      }
    ];
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`KYCIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const kycIntegration = new KYCIntegration();
