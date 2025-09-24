// Waitlist service for managing waitlist submissions
// This service now connects to the database for persistent storage

import { workingDatabaseService } from './database/workingDatabaseService';

interface WaitlistSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investorType: string;
  tokenInterest: string;
  heardFrom: string;
  investmentAmount: string;
  company?: string;
  message?: string;
  submittedAt: string;
  ip: string;
  userAgent: string;
  status: 'new' | 'contacted' | 'qualified' | 'rejected';
}

class WaitlistService {
  private submissions: WaitlistSubmission[] = [];
  private storageKey = 'global-edge-waitlist-submissions';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          this.submissions = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Error loading waitlist submissions from storage:', error);
        this.submissions = [];
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.submissions));
      } catch (error) {
        console.error('Error saving waitlist submissions to storage:', error);
      }
    }
  }

  // Add a new waitlist submission
  async addSubmission(submissionData: Omit<WaitlistSubmission, 'id' | 'status'>): Promise<WaitlistSubmission> {
    try {
      // Try to save to database first
      const dbResult = await workingDatabaseService.createWaitlistSubmission({
        ...submissionData,
        status: 'new'
      });

      if (dbResult.success && dbResult.data) {
        console.log('✅ Waitlist submission saved to database:', dbResult.data);
        return dbResult.data;
      } else {
        console.warn('⚠️ Database save failed, falling back to localStorage:', dbResult.error);
        
        // Fallback to localStorage
        const submission: WaitlistSubmission = {
          ...submissionData,
          id: `waitlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          status: 'new'
        };

        this.submissions.unshift(submission);
        this.saveToStorage();
        
        console.log('✅ Waitlist submission added to localStorage:', submission);
        return submission;
      }
    } catch (error) {
      console.error('❌ Error saving waitlist submission:', error);
      
      // Fallback to localStorage
      const submission: WaitlistSubmission = {
        ...submissionData,
        id: `waitlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: 'new'
      };

      this.submissions.unshift(submission);
      this.saveToStorage();
      
      console.log('✅ Waitlist submission added to localStorage (fallback):', submission);
      return submission;
    }
  }

  // Get all submissions
  async getAllSubmissions(): Promise<WaitlistSubmission[]> {
    try {
      // Try to get from database first
      const dbResult = await workingDatabaseService.getWaitlistSubmissions();
      
      if (dbResult.success && dbResult.data) {
        console.log('✅ Waitlist submissions loaded from database');
        return dbResult.data;
      } else {
        console.warn('⚠️ Database load failed, using localStorage:', dbResult.error);
        return [...this.submissions]; // Return a copy from localStorage
      }
    } catch (error) {
      console.error('❌ Error loading waitlist submissions:', error);
      return [...this.submissions]; // Return a copy from localStorage
    }
  }

  // Get submissions by status
  getSubmissionsByStatus(status: WaitlistSubmission['status']): WaitlistSubmission[] {
    return this.submissions.filter(sub => sub.status === status);
  }

  // Update submission status
  updateSubmissionStatus(id: string, status: WaitlistSubmission['status']): boolean {
    const submission = this.submissions.find(sub => sub.id === id);
    if (submission) {
      submission.status = status;
      this.saveToStorage();
      console.log(`✅ Updated submission ${id} status to ${status}`);
      return true;
    }
    return false;
  }

  // Get submission by ID
  getSubmissionById(id: string): WaitlistSubmission | null {
    return this.submissions.find(sub => sub.id === id) || null;
  }

  // Search submissions
  searchSubmissions(query: string): WaitlistSubmission[] {
    const lowerQuery = query.toLowerCase();
    return this.submissions.filter(sub => 
      sub.firstName.toLowerCase().includes(lowerQuery) ||
      sub.lastName.toLowerCase().includes(lowerQuery) ||
      sub.email.toLowerCase().includes(lowerQuery) ||
      sub.company?.toLowerCase().includes(lowerQuery) ||
      sub.investorType.toLowerCase().includes(lowerQuery) ||
      sub.tokenInterest.toLowerCase().includes(lowerQuery)
    );
  }

  // Get statistics
  getStats() {
    const total = this.submissions.length;
    const newCount = this.getSubmissionsByStatus('new').length;
    const contactedCount = this.getSubmissionsByStatus('contacted').length;
    const qualifiedCount = this.getSubmissionsByStatus('qualified').length;
    const rejectedCount = this.getSubmissionsByStatus('rejected').length;

    return {
      total,
      new: newCount,
      contacted: contactedCount,
      qualified: qualifiedCount,
      rejected: rejectedCount
    };
  }

  // Clear all submissions (for testing)
  clearAllSubmissions() {
    this.submissions = [];
    this.saveToStorage();
    console.log('🗑️ All waitlist submissions cleared');
  }
}

// Create a singleton instance
export const waitlistService = new WaitlistService();

// Export the interface for use in other files
export type { WaitlistSubmission };
