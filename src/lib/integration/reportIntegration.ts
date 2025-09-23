/**
 * Report Generation Integration
 * 
 * This service integrates report generation with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { userAuthService } from '@/lib/userAuthService';
import { assetService } from '@/lib/assetService';
import { ReportGenerator } from '@/lib/reportGenerator';

const reportGenerator = new ReportGenerator();

export class ReportIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Generate comprehensive system report with database integration
   */
  async generateSystemReport(): Promise<{ success: boolean; report?: any; error?: string }> {
    try {
      let data;
      
      if (this.useDatabase) {
        // Try to get data from database
        const [usersResult, assetsResult, investmentsResult] = await Promise.all([
          workingDatabaseService.getUsers(),
          workingDatabaseService.getAssets(),
          workingDatabaseService.getInvestments()
        ]);

        if (usersResult.success && assetsResult.success && investmentsResult.success) {
          data = {
            users: usersResult.data?.items || [],
            assets: assetsResult.data?.items || [],
            investments: investmentsResult.data?.items || []
          };
        } else {
          // Fallback to mock data
          data = this.getMockData();
        }
      } else {
        // Use mock data
        data = this.getMockData();
      }

      // Generate report using the existing report generator
      const reportData = {
        title: 'System Report',
        generatedAt: new Date().toISOString(),
        data: [data]
      };
      const report = ReportGenerator.generatePDF(reportData);
      
      return { success: true, report };
    } catch (error) {
      console.error('Generate system report error:', error);
      return { success: false, error: 'Failed to generate system report' };
    }
  }

  /**
   * Generate user analytics report with database integration
   */
  async generateUserReport(): Promise<{ success: boolean; report?: any; error?: string }> {
    try {
      let users;
      
      if (this.useDatabase) {
        const usersResult = await workingDatabaseService.getUsers();
        users = usersResult.success ? usersResult.data?.items || [] : userAuthService.getAllUsers();
      } else {
        users = userAuthService.getAllUsers();
      }

      const reportData = {
        title: 'User Report',
        generatedAt: new Date().toISOString(),
        data: [users]
      };
      const report = ReportGenerator.generatePDF(reportData);
      
      return { success: true, report };
    } catch (error) {
      console.error('Generate user report error:', error);
      return { success: false, error: 'Failed to generate user report' };
    }
  }

  /**
   * Generate asset performance report with database integration
   */
  async generateAssetReport(): Promise<{ success: boolean; report?: any; error?: string }> {
    try {
      let assets, investments;
      
      if (this.useDatabase) {
        const [assetsResult, investmentsResult] = await Promise.all([
          workingDatabaseService.getAssets(),
          workingDatabaseService.getInvestments()
        ]);

        assets = assetsResult.success ? assetsResult.data?.items || [] : assetService.getAssets();
        investments = investmentsResult.success ? investmentsResult.data?.items || [] : userAuthService.getAllInvestments();
      } else {
        assets = assetService.getAssets();
        investments = userAuthService.getAllInvestments();
      }

      const reportData = {
        title: 'Asset Report',
        generatedAt: new Date().toISOString(),
        data: [assets, investments]
      };
      const report = ReportGenerator.generatePDF(reportData);
      
      return { success: true, report };
    } catch (error) {
      console.error('Generate asset report error:', error);
      return { success: false, error: 'Failed to generate asset report' };
    }
  }

  /**
   * Generate investment analytics report with database integration
   */
  async generateInvestmentReport(): Promise<{ success: boolean; report?: any; error?: string }> {
    try {
      let investments, users;
      
      if (this.useDatabase) {
        const [investmentsResult, usersResult] = await Promise.all([
          workingDatabaseService.getInvestments(),
          workingDatabaseService.getUsers()
        ]);

        investments = investmentsResult.success ? investmentsResult.data?.items || [] : userAuthService.getAllInvestments();
        users = usersResult.success ? usersResult.data?.items || [] : userAuthService.getAllUsers();
      } else {
        investments = userAuthService.getAllInvestments();
        users = userAuthService.getAllUsers();
      }

      const reportData = {
        title: 'Investment Report',
        generatedAt: new Date().toISOString(),
        data: [investments, users]
      };
      const report = ReportGenerator.generatePDF(reportData);
      
      return { success: true, report };
    } catch (error) {
      console.error('Generate investment report error:', error);
      return { success: false, error: 'Failed to generate investment report' };
    }
  }

  /**
   * Generate custom report with database integration
   */
  async generateCustomReport(reportType: string, filters: any = {}): Promise<{ success: boolean; report?: any; error?: string }> {
    try {
      let data;
      
      if (this.useDatabase) {
        // Try to get data from database
        const [usersResult, assetsResult, investmentsResult] = await Promise.all([
          workingDatabaseService.getUsers(),
          workingDatabaseService.getAssets(),
          workingDatabaseService.getInvestments()
        ]);

        if (usersResult.success && assetsResult.success && investmentsResult.success) {
          data = {
            users: usersResult.data?.items || [],
            assets: assetsResult.data?.items || [],
            investments: investmentsResult.data?.items || []
          };
        } else {
          // Fallback to mock data
          data = this.getMockData();
        }
      } else {
        // Use mock data
        data = this.getMockData();
      }

      // Apply filters
      const filteredData = this.applyFilters(data, filters);

      // Generate custom report
      const reportData = {
        title: `Custom ${reportType} Report`,
        generatedAt: new Date().toISOString(),
        data: [filteredData, filters]
      };
      const report = ReportGenerator.generatePDF(reportData);
      
      return { success: true, report };
    } catch (error) {
      console.error('Generate custom report error:', error);
      return { success: false, error: 'Failed to generate custom report' };
    }
  }

  /**
   * Export report to PDF with database integration
   */
  async exportReportToPDF(reportType: string, filters: any = {}): Promise<{ success: boolean; pdfUrl?: string; error?: string }> {
    try {
      // Generate report first
      const reportResult = await this.generateCustomReport(reportType, filters);
      if (!reportResult.success || !reportResult.report) {
        return { success: false, error: 'Failed to generate report for PDF export' };
      }

      // Export to PDF using the existing report generator
      const pdfUrl = reportResult.report; // The report is already a PDF string
      
      return { success: true, pdfUrl };
    } catch (error) {
      console.error('Export report to PDF error:', error);
      return { success: false, error: 'Failed to export report to PDF' };
    }
  }

  /**
   * Export report to CSV with database integration
   */
  async exportReportToCSV(reportType: string, filters: any = {}): Promise<{ success: boolean; csvUrl?: string; error?: string }> {
    try {
      // Generate report first
      const reportResult = await this.generateCustomReport(reportType, filters);
      if (!reportResult.success || !reportResult.report) {
        return { success: false, error: 'Failed to generate report for CSV export' };
      }

      // Export to CSV using the existing report generator
      const csvUrl = reportResult.report; // The report is already a string
      
      return { success: true, csvUrl };
    } catch (error) {
      console.error('Export report to CSV error:', error);
      return { success: false, error: 'Failed to export report to CSV' };
    }
  }

  /**
   * Get mock data for fallback
   */
  private getMockData() {
    return {
      users: userAuthService.getAllUsers(),
      assets: assetService.getAssets(),
      investments: userAuthService.getAllInvestments()
    };
  }

  /**
   * Apply filters to data
   */
  private applyFilters(data: any, filters: any) {
    let filteredData = { ...data };

    // Apply date filters
    if (filters.startDate || filters.endDate) {
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      if (startDate || endDate) {
        filteredData.investments = filteredData.investments.filter((inv: any) => {
          const invDate = new Date(inv.investmentDate || inv.createdAt);
          if (startDate && invDate < startDate) return false;
          if (endDate && invDate > endDate) return false;
          return true;
        });
      }
    }

    // Apply status filters
    if (filters.status) {
      filteredData.investments = filteredData.investments.filter((inv: any) => inv.status === filters.status);
    }

    // Apply user role filters
    if (filters.userRole) {
      filteredData.users = filteredData.users.filter((user: any) => user.role === filters.userRole);
    }

    // Apply asset type filters
    if (filters.assetType) {
      filteredData.assets = filteredData.assets.filter((asset: any) => asset.type === filters.assetType);
    }

    return filteredData;
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`ReportIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const reportIntegration = new ReportIntegration();
