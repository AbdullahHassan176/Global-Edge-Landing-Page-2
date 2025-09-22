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
      if (this.useDatabase) {
        // Try database first - using users container with type field
        const dbResult = await workingDatabaseService.getUsers();
        if (dbResult.success && dbResult.data) {
          // Filter KYC applications from users container
          const kycApplications = dbResult.data.items.filter(item => item.type === 'kyc_application');
          return { success: true, applications: kycApplications as any };
        }
      }

      // Fallback to mock service
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
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getUsers();
        if (dbResult.success && dbResult.data) {
          const kycApplication = dbResult.data.items.find(
            item => item.type === 'kyc_application' && item.userId === userId
          );
          return { success: true, application: kycApplication as any };
        }
      }

      // Fallback to mock service
      const mockApplications = this.getMockKycApplications();
      const application = mockApplications.find(app => app.userId === userId);
      return { success: true, application };
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
      if (this.useDatabase) {
        // Create KYC application in database using users container
        const application = {
          ...applicationData,
          id: `kyc-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          type: 'kyc_application' // Mark as KYC application type
        };

        const dbResult = await workingDatabaseService.createUser(application as any);
        if (dbResult.success && dbResult.data) {
          return { success: true, application: dbResult.data as any };
        }
      }

      // Fallback to mock service
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
      if (this.useDatabase) {
        // Update KYC application in database
        const updateData: any = { status };
        if (reviewerId) updateData.reviewerId = reviewerId;
        if (rejectionReason) updateData.rejectionReason = rejectionReason;
        if (status === 'approved' || status === 'rejected') {
          updateData.reviewedAt = new Date().toISOString();
        }

        const dbResult = await workingDatabaseService.updateUser(id, updateData);
        if (dbResult.success && dbResult.data) {
          return { success: true, application: dbResult.data as any };
        }
      }

      // Fallback to mock service
      const mockApplications = this.getMockKycApplications();
      const application = mockApplications.find(app => app.id === id);
      if (application) {
        application.status = status;
        if (reviewerId) application.reviewerId = reviewerId;
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
        reviewerId: 'admin-1',
        documents: [
          {
            type: 'passport',
            url: '/documents/passport-1.pdf',
            uploadedAt: '2024-01-15T10:05:00Z',
            status: 'approved'
          },
          {
            type: 'utility_bill',
            url: '/documents/utility-1.pdf',
            uploadedAt: '2024-01-15T10:10:00Z',
            status: 'approved'
          }
        ],
        personalDetails: {
          fullName: 'Alice Johnson',
          dateOfBirth: '1990-05-15',
          nationality: 'US',
          address: '123 Main St, New York, NY 10001'
        },
        financialDetails: {
          incomeSource: 'Employment',
          estimatedNetWorth: '$100,000 - $500,000'
        }
      },
      {
        id: 'kyc-2',
        userId: 'user-2',
        status: 'pending',
        submittedAt: '2024-01-20T09:15:00Z',
        documents: [
          {
            type: 'id_card',
            url: '/documents/id-2.pdf',
            uploadedAt: '2024-01-20T09:20:00Z',
            status: 'pending'
          }
        ],
        personalDetails: {
          fullName: 'Bob Smith',
          dateOfBirth: '1985-12-10',
          nationality: 'CA',
          address: '456 Oak Ave, Toronto, ON M5V 3A8'
        },
        financialDetails: {
          incomeSource: 'Business',
          estimatedNetWorth: '$500,000 - $1,000,000'
        }
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
