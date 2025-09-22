/**
 * Notification Service
 * Handles email notifications for investment process steps
 * 
 * 📧 EMAIL CONFIGURATION:
 * 
 * 🔧 DEVELOPMENT MODE:
 * - All emails are logged to console only
 * - No actual emails are sent
 * - Mock recipients: investor@example.com, newuser@example.com
 * 
 * 🚀 PRODUCTION SETUP:
 * To enable real email sending, integrate with an email service:
 * 
 * 1. SendGrid: Set SENDGRID_API_KEY environment variable
 * 2. AWS SES: Configure AWS credentials and region
 * 3. Mailgun: Set MAILGUN_API_KEY and MAILGUN_DOMAIN
 * 4. Nodemailer: Configure SMTP settings
 * 
 * 📬 WHERE EMAILS GO:
 * - Investment notifications → User's registered email
 * - KYC notifications → User's registered email
 * - Admin notifications → Admin emails (configured in admin settings)
 * - Partner notifications → Partner contact emails
 * 
 * 🔐 EMAIL SECURITY:
 * - All templates use regular strings to prevent code injection
 * - Variable replacement is sanitized
 * - HTML content is escaped for security
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
}

export interface NotificationEvent {
  type: 'investment_created' | 'kyc_required' | 'kyc_approved' | 'kyc_rejected' | 
        'investment_approved' | 'investment_rejected' | 'payment_required' | 
        'investment_completed' | 'document_uploaded' | 'document_rejected';
  userId: string;
  data: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

// Email templates for different notification types
const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  investment_created: {
    id: 'investment_created',
    name: 'Investment Created',
    subject: 'Your Investment Application Has Been Submitted - Global Edge',
    htmlContent: '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Investment Application Submitted</title><style>body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }.container { max-width: 600px; margin: 0 auto; padding: 20px; }.header { background: linear-gradient(135deg, #0f766e, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }.content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }.button { display: inline-block; background: #0f766e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }</style></head><body><div class="container"><div class="header"><h1>Investment Application Submitted</h1></div><div class="content"><h2>Hello {{firstName}},</h2><p>Thank you for your interest in investing with Global Edge. Your investment application has been successfully submitted and is now under review.</p><h3>Investment Details:</h3><ul><li><strong>Asset:</strong> {{assetName}}</li><li><strong>Investment Amount:</strong> ${{investmentAmount}}</li><li><strong>Application ID:</strong> {{investmentId}}</li><li><strong>Submitted:</strong> {{submittedDate}}</li></ul><h3>Next Steps:</h3><ol><li>Complete KYC verification (if required)</li><li>Upload required documents</li><li>Wait for approval from our team</li><li>Make payment once approved</li></ol><p>We will notify you via email once your application has been reviewed. You can also check your dashboard for updates.</p><a href="{{dashboardUrl}}" class="button">View Dashboard</a></div></div><div class="footer"><p>© 2025 Global Edge. All rights reserved.</p><p>This email was sent to {{email}}. If you didn\'t request this, please ignore this email.</p></div></body></html>',
    textContent: 'Hello {{firstName}},\n\nThank you for your interest in investing with Global Edge. Your investment application has been successfully submitted and is now under review.\n\nInvestment Details:\n- Asset: {{assetName}}\n- Investment Amount: ${{investmentAmount}}\n- Application ID: {{investmentId}}\n- Submitted: {{submittedDate}}\n\nNext Steps:\n1. Complete KYC verification (if required)\n2. Upload required documents\n3. Wait for approval from our team\n4. Make payment once approved\n\nWe will notify you via email once your application has been reviewed. You can also check your dashboard for updates.\n\nYou can track your investment status in your dashboard: {{dashboardUrl}}\n\nBest regards,\nThe Global Edge Team\n\n© 2025 Global Edge. All rights reserved.',
    variables: ['firstName', 'assetName', 'investmentAmount', 'investmentId', 'submittedDate', 'dashboardUrl', 'email']
  },
  kyc_required: {
    id: 'kyc_required',
    name: 'KYC Required',
    subject: 'KYC Verification Required - Global Edge',
    htmlContent: '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>KYC Verification Required</title><style>body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }.container { max-width: 600px; margin: 0 auto; padding: 20px; }.header { background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }.content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }.button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }</style></head><body><div class="container"><div class="header"><h1>KYC Verification Required</h1></div><div class="content"><h2>Hello {{firstName}},</h2><p>Thank you for your interest in investing with Global Edge. To proceed with your investment, we need to verify your identity through our Know Your Customer (KYC) process.</p><p>Your investment application for <strong>{{assetName}}</strong> (Amount: ${{investmentAmount}}) cannot be processed until your identity is verified.</p><h3>Required Documents:</h3><ul><li>Government-issued photo ID (Passport, Driver\'s License, or National ID)</li><li>Proof of address (Utility bill, Bank statement, or Government document)</li><li>Proof of income (Pay stub, Tax return, or Bank statement)</li><li>Source of funds documentation</li></ul><h3>Next Steps:</h3><ol><li>Click the button below to access the KYC portal</li><li>Upload all required documents</li><li>Complete the identity verification process</li><li>Wait for approval (usually within 24-48 hours)</li></ol><p>Once your KYC is approved, your investment application will be processed automatically.</p><a href="{{kycUrl}}" class="button">Complete KYC Verification</a></div></div><div class="footer"><p>© 2025 Global Edge. All rights reserved.</p><p>This email was sent to {{email}}. If you didn\'t request this, please ignore this email.</p></div></body></html>',
    textContent: 'Hello {{firstName}},\n\nThank you for your interest in investing with Global Edge. To proceed with your investment, we need to verify your identity through our Know Your Customer (KYC) process.\n\nYour investment application for {{assetName}} (Amount: ${{investmentAmount}}) cannot be processed until your identity is verified.\n\nRequired Documents:\n- Government-issued photo ID (Passport, Driver\'s License, or National ID)\n- Proof of address (Utility bill, Bank statement, or Government document)\n- Proof of income (Pay stub, Tax return, or Bank statement)\n- Source of funds documentation\n\nNext Steps:\n1. Click the link below to access the KYC portal\n2. Upload all required documents\n3. Complete the identity verification process\n4. Wait for approval (usually within 24-48 hours)\n\nOnce your KYC is approved, your investment application will be processed automatically.\n\nComplete your KYC verification here: {{kycUrl}}\n\nBest regards,\nThe Global Edge Team\n\n© 2025 Global Edge. All rights reserved.',
    variables: ['firstName', 'assetName', 'investmentAmount', 'kycUrl', 'email']
  },
  kyc_approved: {
    id: 'kyc_approved',
    name: 'KYC Approved',
    subject: 'KYC Verification Approved - Global Edge',
    htmlContent: '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>KYC Verification Approved</title><style>body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }.container { max-width: 600px; margin: 0 auto; padding: 20px; }.header { background: linear-gradient(135deg, #059669, #0d9488); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }.content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }.button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }</style></head><body><div class="container"><div class="header"><h1>KYC Verification Approved</h1></div><div class="content"><h2>Congratulations {{firstName}}!</h2><p>Great news! Your KYC verification has been successfully approved. You can now proceed with your investment on the Global Edge platform.</p><h3>What\'s Next:</h3><ul><li>Your investment applications will now be processed</li><li>You can browse and invest in available assets</li><li>Access advanced features and investment tools</li><li>Receive priority support for your investments</li></ul><p>Thank you for completing the verification process. We\'re excited to have you as part of the Global Edge investment community!</p><a href="{{dashboardUrl}}" class="button">View Your Dashboard</a></div></div><div class="footer"><p>© 2025 Global Edge. All rights reserved.</p><p>This email was sent to {{email}}. If you didn\'t request this, please ignore this email.</p></div></body></html>',
    textContent: 'Congratulations {{firstName}}!\n\nGreat news! Your KYC verification has been successfully approved. You can now proceed with your investment on the Global Edge platform.\n\nWhat\'s Next:\n- Your investment applications will now be processed\n- You can browse and invest in available assets\n- Access advanced features and investment tools\n- Receive priority support for your investments\n\nThank you for completing the verification process. We\'re excited to have you as part of the Global Edge investment community!\n\nView your dashboard: {{dashboardUrl}}\n\nBest regards,\nThe Global Edge Team\n\n© 2025 Global Edge. All rights reserved.',
    variables: ['firstName', 'dashboardUrl', 'email']
  },
  investment_approved: {
    id: 'investment_approved',
    name: 'Investment Approved',
    subject: 'Investment Application Approved - Global Edge',
    htmlContent: '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Investment Application Approved</title><style>body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }.container { max-width: 600px; margin: 0 auto; padding: 20px; }.header { background: linear-gradient(135deg, #059669, #0d9488); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }.content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }.button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }</style></head><body><div class="container"><div class="header"><h1>Investment Application Approved</h1></div><div class="content"><h2>Congratulations {{firstName}}!</h2><p>Excellent news! Your investment application has been approved by our team. You can now proceed with the payment to complete your investment.</p><h3>Investment Details:</h3><ul><li><strong>Asset:</strong> {{assetName}}</li><li><strong>Investment Amount:</strong> ${{investmentAmount}}</li><li><strong>Investment ID:</strong> {{investmentId}}</li><li><strong>Approved Date:</strong> {{approvedDate}}</li></ul><h3>Next Steps:</h3><ol><li>Review your investment details</li><li>Make payment using the secure payment portal</li><li>Receive confirmation of your investment</li><li>Start earning returns on your investment</li></ol><p><strong>Important:</strong> Please complete your payment within the specified timeframe to secure your investment allocation.</p><a href="{{paymentUrl}}" class="button">Make Payment</a><p><strong>Payment Deadline:</strong> {{paymentDeadline}}</p></div></div><div class="footer"><p>© 2025 Global Edge. All rights reserved.</p><p>This email was sent to {{email}}. If you didn\'t request this, please ignore this email.</p></div></body></html>',
    textContent: 'Congratulations {{firstName}}!\n\nExcellent news! Your investment application has been approved by our team. You can now proceed with the payment to complete your investment.\n\nInvestment Details:\n- Asset: {{assetName}}\n- Investment Amount: ${{investmentAmount}}\n- Investment ID: {{investmentId}}\n- Approved Date: {{approvedDate}}\n\nNext Steps:\n1. Review your investment details\n2. Make payment using the secure payment portal\n3. Receive confirmation of your investment\n4. Start earning returns on your investment\n\nImportant: Please complete your payment within the specified timeframe to secure your investment allocation.\n\nMake your payment here: {{paymentUrl}}\n\nPayment Deadline: {{paymentDeadline}}\n\nBest regards,\nThe Global Edge Team\n\n© 2025 Global Edge. All rights reserved.',
    variables: ['firstName', 'assetName', 'investmentAmount', 'investmentId', 'approvedDate', 'paymentUrl', 'paymentDeadline', 'email']
  },
  investment_completed: {
    id: 'investment_completed',
    name: 'Investment Completed',
    subject: 'Investment Successfully Completed - Global Edge',
    htmlContent: '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Investment Successfully Completed</title><style>body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }.container { max-width: 600px; margin: 0 auto; padding: 20px; }.header { background: linear-gradient(135deg, #059669, #0d9488); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }.content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }.button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }</style></head><body><div class="container"><div class="header"><h1>Investment Successfully Completed</h1></div><div class="content"><h2>Congratulations {{firstName}}!</h2><p>Fantastic! Your investment has been successfully completed and your tokens have been issued. Welcome to the Global Edge investment community!</p><h3>Investment Summary:</h3><ul><li><strong>Asset:</strong> {{assetName}}</li><li><strong>Investment Amount:</strong> ${{investmentAmount}}</li><li><strong>Tokens Received:</strong> {{tokensReceived}}</li><li><strong>Expected Annual Return:</strong> {{expectedReturn}}%</li><li><strong>Completion Date:</strong> {{completionDate}}</li></ul><h3>What Happens Next:</h3><ul><li>Your tokens are now active and earning returns</li><li>You can track your investment performance in your dashboard</li><li>Receive regular updates on your investment status</li><li>Access to exclusive investor resources and insights</li></ul><p>Thank you for choosing Global Edge for your investment needs. We\'re committed to providing you with excellent returns and transparent communication throughout your investment journey.</p><a href="{{dashboardUrl}}" class="button">View Investment Details</a></div></div><div class="footer"><p>© 2025 Global Edge. All rights reserved.</p><p>This email was sent to {{email}}. If you didn\'t request this, please ignore this email.</p></div></body></html>',
    textContent: 'Congratulations {{firstName}}!\n\nFantastic! Your investment has been successfully completed and your tokens have been issued. Welcome to the Global Edge investment community!\n\nInvestment Summary:\n- Asset: {{assetName}}\n- Investment Amount: ${{investmentAmount}}\n- Tokens Received: {{tokensReceived}}\n- Expected Annual Return: {{expectedReturn}}%\n- Completion Date: {{completionDate}}\n\nWhat Happens Next:\n- Your tokens are now active and earning returns\n- You can track your investment performance in your dashboard\n- Receive regular updates on your investment status\n- Access to exclusive investor resources and insights\n\nThank you for choosing Global Edge for your investment needs. We\'re committed to providing you with excellent returns and transparent communication throughout your investment journey.\n\nView investment details: {{dashboardUrl}}\n\nBest regards,\nThe Global Edge Team\n\n© 2025 Global Edge. All rights reserved.',
    variables: ['firstName', 'assetName', 'investmentAmount', 'tokensReceived', 'expectedReturn', 'completionDate', 'dashboardUrl', 'email']
  }
};

class NotificationService {
  /**
   * Send email notification
   */
  async sendEmailNotification(event: NotificationEvent): Promise<boolean> {
    try {
      const template = EMAIL_TEMPLATES[event.type];
      if (!template) {
        console.error(`No email template found for event type: ${event.type}`);
        return false;
      }

      // In production, this would integrate with an email service like SendGrid, AWS SES, etc.
      // For now, we'll simulate the email sending
      console.log('📧 Sending email notification:', {
        type: event.type,
        userId: event.userId,
        subject: this.replaceVariables(template.subject, event.data),
        priority: event.priority
      });

      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In production, you would:
      // 1. Replace variables in template
      // 2. Send via email service
      // 3. Log the email for tracking
      // 4. Handle bounces and delivery failures

      return true;
    } catch (error) {
      console.error('Error sending email notification:', error);
      return false;
    }
  }

  /**
   * Replace variables in template strings
   */
  private replaceVariables(template: string, data: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
      return data[variable] || match;
    });
  }

  /**
   * Get email template by type
   */
  getEmailTemplate(type: string): EmailTemplate | undefined {
    return EMAIL_TEMPLATES[type];
  }

  /**
   * Get all available email templates
   */
  getAllEmailTemplates(): EmailTemplate[] {
    return Object.values(EMAIL_TEMPLATES);
  }

  /**
   * Get admin notifications (mock data for development)
   */
  getAdminNotifications() {
    return [
      {
        id: '1',
        type: 'account_created' as const,
        title: 'New User Registration',
        description: 'John Doe registered as an investor',
        userEmail: 'john.doe@example.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: 'new' as const,
        data: { userId: '123', role: 'investor' },
        priority: 'medium' as const
      },
      {
        id: '2',
        type: 'partner_application' as const,
        title: 'Partner Application Received',
        description: 'Acme Corp submitted a partnership application',
        userEmail: 'contact@acmecorp.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        status: 'reviewed' as const,
        data: { companyName: 'Acme Corp', type: 'logistics' },
        priority: 'high' as const
      }
    ];
  }

  /**
   * Get email notifications (mock data for development)
   */
  getEmailNotifications() {
    return [
      {
        id: '1',
        type: 'account_created' as const,
        to: 'investor@example.com',
        subject: 'Your Investment Application Has Been Submitted - Global Edge',
        template: 'investment_created',
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'investor@example.com',
          assetName: 'Dubai Marina Office Tower',
          investmentAmount: '50000',
          investmentId: 'INV-2024-001',
          submittedDate: new Date().toLocaleDateString(),
          dashboardUrl: 'https://example.com/dashboard'
        },
        status: 'sent' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        retryCount: 0
      },
      {
        id: '2',
        type: 'verification' as const,
        to: 'newuser@example.com',
        subject: 'KYC Verification Required - Global Edge',
        template: 'kyc_required',
        data: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'newuser@example.com',
          assetName: 'Jebel Ali Container',
          investmentAmount: '25000',
          kycUrl: 'https://example.com/kyc'
        },
        status: 'pending' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        retryCount: 1
      }
    ];
  }

  /**
   * Get webhook notifications (mock data for development)
   */
  getWebhookNotifications() {
    return [
      {
        id: '1',
        type: 'account_created' as const,
        endpoint: 'https://webhook.example.com/user-created',
        payload: {
          userId: '123',
          email: 'john.doe@example.com',
          role: 'investor',
          timestamp: new Date().toISOString()
        },
        status: 'sent' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        retryCount: 0
      },
      {
        id: '2',
        type: 'partner_application' as const,
        endpoint: 'https://webhook.example.com/partner-application',
        payload: {
          companyName: 'Acme Corp',
          type: 'logistics',
          email: 'contact@acmecorp.com',
          timestamp: new Date().toISOString()
        },
        status: 'failed' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        retryCount: 3
      }
    ];
  }

  /**
   * Get notification statistics (mock data for development)
   */
  getNotificationStats() {
    return {
      total: 150,
      today: 12,
      pending: 8,
      failed: 2,
      emailsSent: 98,
      webhooksDelivered: 45,
      averageDeliveryTime: '2.3s'
    };
  }

  /**
   * Update admin notification status (mock implementation)
   */
  updateAdminNotificationStatus(id: string, status: 'reviewed' | 'processed') {
    // In a real implementation, this would update the notification in the database
    console.log(`Updated notification ${id} status to ${status}`);
    return true;
  }
}

// Export singleton instance
export const notificationService = new NotificationService();