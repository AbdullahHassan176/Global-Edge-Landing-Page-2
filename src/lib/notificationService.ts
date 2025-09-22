/**
 * Notification Service
 * Handles email notifications for investment process steps
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
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Investment Application Submitted</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0f766e, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #0f766e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Investment Application Submitted</h1>
          </div>
          <div class="content">
            <h2>Hello {{firstName}},</h2>
            <p>Thank you for your interest in investing with Global Edge. Your investment application has been successfully submitted and is now under review.</p>
            
            <h3>Investment Details:</h3>
            <ul>
              <li><strong>Asset:</strong> {{assetName}}</li>
              <li><strong>Investment Amount:</strong> ${{amount}}</li>
              <li><strong>Application ID:</strong> {{investmentId}}</li>
              <li><strong>Submitted:</strong> {{submittedDate}}</li>
            </ul>
            
            <h3>Next Steps:</h3>
            <ol>
              <li>Complete KYC verification (if required)</li>
              <li>Upload required documents</li>
              <li>Wait for approval from our team</li>
              <li>Make payment once approved</li>
            </ol>
            
            <p>You can track your investment status in your dashboard.</p>
            
            <a href="{{dashboardUrl}}" class="button">View Dashboard</a>
            
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
          </div>
          <div class="footer">
            <p>© 2025 Global Edge. All rights reserved.</p>
            <p>This email was sent to {{email}}. If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
      Hello {{firstName}},
      
      Thank you for your interest in investing with Global Edge. Your investment application has been successfully submitted and is now under review.
      
      Investment Details:
      - Asset: {{assetName}}
      - Investment Amount: ${{amount}}
      - Application ID: {{investmentId}}
      - Submitted: {{submittedDate}}
      
      Next Steps:
      1. Complete KYC verification (if required)
      2. Upload required documents
      3. Wait for approval from our team
      4. Make payment once approved
      
      You can track your investment status in your dashboard: {{dashboardUrl}}
      
      If you have any questions, please don't hesitate to contact our support team.
      
      © 2025 Global Edge. All rights reserved.
    `,
    variables: ['firstName', 'assetName', 'amount', 'investmentId', 'submittedDate', 'dashboardUrl', 'email']
  },

  kyc_required: {
    id: 'kyc_required',
    name: 'KYC Verification Required',
    subject: 'Action Required: Complete Your KYC Verification - Global Edge',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KYC Verification Required</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KYC Verification Required</h1>
          </div>
          <div class="content">
            <h2>Hello {{firstName}},</h2>
            
            <div class="warning">
              <strong>Action Required:</strong> To proceed with your investment, you must complete your Know Your Customer (KYC) verification.
            </div>
            
            <p>Your investment application for <strong>{{assetName}}</strong> (Amount: ${{amount}}) cannot be processed until your identity is verified.</p>
            
            <h3>Required Documents:</h3>
            <ul>
              <li>Valid passport or national ID</li>
              <li>Proof of address (utility bill or bank statement)</li>
              <li>Bank statement (if required)</li>
            </ul>
            
            <h3>Why KYC is Required:</h3>
            <ul>
              <li>Compliance with international regulations</li>
              <li>Protection against fraud and money laundering</li>
              <li>Ensuring secure and legitimate transactions</li>
            </ul>
            
            <a href="{{kycUrl}}" class="button">Complete KYC Verification</a>
            
            <p><strong>Important:</strong> Please complete your KYC verification within 7 days to avoid delays in processing your investment.</p>
          </div>
          <div class="footer">
            <p>© 2025 Global Edge. All rights reserved.</p>
            <p>This email was sent to {{email}}. If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
      Hello {{firstName}},
      
      ACTION REQUIRED: To proceed with your investment, you must complete your Know Your Customer (KYC) verification.
      
      Your investment application for {{assetName}} (Amount: ${{amount}}) cannot be processed until your identity is verified.
      
      Required Documents:
      - Valid passport or national ID
      - Proof of address (utility bill or bank statement)
      - Bank statement (if required)
      
      Why KYC is Required:
      - Compliance with international regulations
      - Protection against fraud and money laundering
      - Ensuring secure and legitimate transactions
      
      Complete your KYC verification here: {{kycUrl}}
      
      IMPORTANT: Please complete your KYC verification within 7 days to avoid delays in processing your investment.
      
      © 2025 Global Edge. All rights reserved.
    `,
    variables: ['firstName', 'assetName', 'amount', 'kycUrl', 'email']
  },

  kyc_approved: {
    id: 'kyc_approved',
    name: 'KYC Verification Approved',
    subject: 'Great News! Your KYC Verification is Approved - Global Edge',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KYC Verification Approved</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .success { background: #d1fae5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KYC Verification Approved</h1>
          </div>
          <div class="content">
            <h2>Congratulations {{firstName}}!</h2>
            
            <div class="success">
              <strong>Great News:</strong> Your KYC verification has been successfully approved!
            </div>
            
            <p>Your identity has been verified and you can now proceed with your investment activities on Global Edge.</p>
            
            <h3>What's Next?</h3>
            <ul>
              <li>Your investment applications will be processed faster</li>
              <li>You can access all investment opportunities</li>
              <li>Your account is now fully verified and secure</li>
            </ul>
            
            <a href="{{dashboardUrl}}" class="button">View Your Dashboard</a>
            
            <p>Thank you for choosing Global Edge for your investment needs. We're excited to help you grow your portfolio!</p>
          </div>
          <div class="footer">
            <p>© 2025 Global Edge. All rights reserved.</p>
            <p>This email was sent to {{email}}. If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
      Congratulations {{firstName}}!
      
      GREAT NEWS: Your KYC verification has been successfully approved!
      
      Your identity has been verified and you can now proceed with your investment activities on Global Edge.
      
      What's Next?
      - Your investment applications will be processed faster
      - You can access all investment opportunities
      - Your account is now fully verified and secure
      
      View your dashboard: {{dashboardUrl}}
      
      Thank you for choosing Global Edge for your investment needs. We're excited to help you grow your portfolio!
      
      © 2025 Global Edge. All rights reserved.
    `,
    variables: ['firstName', 'dashboardUrl', 'email']
  },

  investment_approved: {
    id: 'investment_approved',
    name: 'Investment Approved',
    subject: 'Your Investment Has Been Approved - Global Edge',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Investment Approved</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .success { background: #d1fae5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Investment Approved</h1>
          </div>
          <div class="content">
            <h2>Congratulations {{firstName}}!</h2>
            
            <div class="success">
              <strong>Excellent News:</strong> Your investment has been approved!
            </div>
            
            <h3>Investment Details:</h3>
            <ul>
              <li><strong>Asset:</strong> {{assetName}}</li>
              <li><strong>Investment Amount:</strong> ${{amount}}</li>
              <li><strong>Investment ID:</strong> {{investmentId}}</li>
              <li><strong>Approved Date:</strong> {{approvedDate}}</li>
            </ul>
            
            <h3>Next Steps:</h3>
            <ol>
              <li>Review the investment agreement</li>
              <li>Make your payment within 5 business days</li>
              <li>Receive your investment tokens</li>
              <li>Start earning returns</li>
            </ol>
            
            <a href="{{paymentUrl}}" class="button">Make Payment</a>
            
            <p><strong>Payment Deadline:</strong> {{paymentDeadline}}</p>
            <p>If you have any questions about your investment, please contact our support team.</p>
          </div>
          <div class="footer">
            <p>© 2025 Global Edge. All rights reserved.</p>
            <p>This email was sent to {{email}}. If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
      Congratulations {{firstName}}!
      
      EXCELLENT NEWS: Your investment has been approved!
      
      Investment Details:
      - Asset: {{assetName}}
      - Investment Amount: ${{amount}}
      - Investment ID: {{investmentId}}
      - Approved Date: {{approvedDate}}
      
      Next Steps:
      1. Review the investment agreement
      2. Make your payment within 5 business days
      3. Receive your investment tokens
      4. Start earning returns
      
      Make your payment here: {{paymentUrl}}
      
      Payment Deadline: {{paymentDeadline}}
      
      If you have any questions about your investment, please contact our support team.
      
      © 2025 Global Edge. All rights reserved.
    `,
    variables: ['firstName', 'assetName', 'amount', 'investmentId', 'approvedDate', 'paymentUrl', 'paymentDeadline', 'email']
  },

  investment_completed: {
    id: 'investment_completed',
    name: 'Investment Completed',
    subject: 'Investment Successfully Completed - Global Edge',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Investment Completed</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .success { background: #d1fae5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Investment Completed</h1>
          </div>
          <div class="content">
            <h2>Congratulations {{firstName}}!</h2>
            
            <div class="success">
              <strong>Investment Successfully Completed:</strong> Your investment is now active and earning returns!
            </div>
            
            <h3>Investment Summary:</h3>
            <ul>
              <li><strong>Asset:</strong> {{assetName}}</li>
              <li><strong>Investment Amount:</strong> ${{amount}}</li>
              <li><strong>Tokens Received:</strong> {{tokensReceived}}</li>
              <li><strong>Expected Annual Return:</strong> {{expectedReturn}}%</li>
              <li><strong>Completion Date:</strong> {{completionDate}}</li>
            </ul>
            
            <h3>What Happens Next?</h3>
            <ul>
              <li>Your investment tokens are now in your wallet</li>
              <li>Returns will be distributed according to the asset's schedule</li>
              <li>You can track performance in your dashboard</li>
              <li>You'll receive regular updates on your investment</li>
            </ul>
            
            <a href="{{dashboardUrl}}" class="button">View Investment Details</a>
            
            <p>Thank you for investing with Global Edge. We're committed to providing you with excellent returns and transparent communication throughout your investment journey.</p>
          </div>
          <div class="footer">
            <p>© 2025 Global Edge. All rights reserved.</p>
            <p>This email was sent to {{email}}. If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
      Congratulations {{firstName}}!
      
      INVESTMENT SUCCESSFULLY COMPLETED: Your investment is now active and earning returns!
      
      Investment Summary:
      - Asset: {{assetName}}
      - Investment Amount: ${{amount}}
      - Tokens Received: {{tokensReceived}}
      - Expected Annual Return: {{expectedReturn}}%
      - Completion Date: {{completionDate}}
      
      What Happens Next?
      - Your investment tokens are now in your wallet
      - Returns will be distributed according to the asset's schedule
      - You can track performance in your dashboard
      - You'll receive regular updates on your investment
      
      View investment details: {{dashboardUrl}}
      
      Thank you for investing with Global Edge. We're committed to providing you with excellent returns and transparent communication throughout your investment journey.
      
      © 2025 Global Edge. All rights reserved.
    `,
    variables: ['firstName', 'assetName', 'amount', 'tokensReceived', 'expectedReturn', 'completionDate', 'dashboardUrl', 'email']
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
   * Send SMS notification (placeholder for future implementation)
   */
  async sendSMSNotification(event: NotificationEvent): Promise<boolean> {
    try {
      // In production, this would integrate with an SMS service like Twilio
      console.log('📱 Sending SMS notification:', {
        type: event.type,
        userId: event.userId,
        priority: event.priority
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      console.error('Error sending SMS notification:', error);
      return false;
    }
  }

  /**
   * Send push notification (placeholder for future implementation)
   */
  async sendPushNotification(event: NotificationEvent): Promise<boolean> {
    try {
      // In production, this would integrate with a push notification service
      console.log('🔔 Sending push notification:', {
        type: event.type,
        userId: event.userId,
        priority: event.priority
      });

      await new Promise(resolve => setTimeout(resolve, 300));
      return true;
    } catch (error) {
      console.error('Error sending push notification:', error);
      return false;
    }
  }

  /**
   * Send notification through all channels
   */
  async sendNotification(event: NotificationEvent): Promise<{
    email: boolean;
    sms: boolean;
    push: boolean;
  }> {
    const results = await Promise.allSettled([
      this.sendEmailNotification(event),
      this.sendSMSNotification(event),
      this.sendPushNotification(event)
    ]);

    return {
      email: results[0].status === 'fulfilled' ? results[0].value : false,
      sms: results[1].status === 'fulfilled' ? results[1].value : false,
      push: results[2].status === 'fulfilled' ? results[2].value : false
    };
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
}

// Export singleton instance
export const notificationService = new NotificationService();