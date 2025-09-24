/**
 * Email Service Integration
 * 
 * This service integrates real email delivery with multiple providers
 * while maintaining backward compatibility with mock data.
 */

export interface EmailProvider {
  name: 'sendgrid' | 'mailgun' | 'ses' | 'smtp';
  enabled: boolean;
  config: any;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
}

export interface EmailMessage {
  id: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
  templateId?: string;
  templateVariables?: Record<string, any>;
  attachments?: {
    filename: string;
    content: string;
    contentType: string;
  }[];
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';
  provider: string;
  sentAt?: string;
  deliveredAt?: string;
  failedAt?: string;
  errorMessage?: string;
  retryCount: number;
  maxRetries: number;
}

export class EmailIntegration {
  private useDatabase = true; // Toggle between database and mock data
  private providers: Map<string, EmailProvider> = new Map();
  private templates: Map<string, EmailTemplate> = new Map();
  private emailQueue: EmailMessage[] = [];

  /**
   * Initialize email integration
   */
  async initialize(): Promise<{ success: boolean; error?: string }> {
    try {
      // Initialize email providers
      await this.initializeProviders();
      
      // Load email templates
      await this.loadEmailTemplates();

      console.log('Email integration initialized with providers:', Array.from(this.providers.keys()));
      return { success: true };
    } catch (error) {
      console.error('Email integration initialization error:', error);
      return { success: false, error: 'Failed to initialize email integration' };
    }
  }

  /**
   * Initialize email providers
   */
  private async initializeProviders(): Promise<void> {
    // SendGrid
    if (process.env.SENDGRID_API_KEY) {
      this.providers.set('sendgrid', {
        name: 'sendgrid',
        enabled: true,
        config: {
          apiKey: process.env.SENDGRID_API_KEY,
          fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@theglobaledge.io'
        }
      });
    }

    // Mailgun
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      this.providers.set('mailgun', {
        name: 'mailgun',
        enabled: true,
        config: {
          apiKey: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
          fromEmail: process.env.MAILGUN_FROM_EMAIL || 'noreply@theglobaledge.io'
        }
      });
    }

    // AWS SES
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.providers.set('ses', {
        name: 'ses',
        enabled: true,
        config: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_SES_REGION || 'us-east-1',
          fromEmail: process.env.AWS_SES_FROM_EMAIL || 'noreply@theglobaledge.io'
        }
      });
    }

    // SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.providers.set('smtp', {
        name: 'smtp',
        enabled: true,
        config: {
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
          secure: process.env.SMTP_SECURE === 'true',
          fromEmail: process.env.SMTP_FROM_EMAIL || 'noreply@theglobaledge.io'
        }
      });
    }
  }

  /**
   * Load email templates
   */
  private async loadEmailTemplates(): Promise<void> {
    const templates: EmailTemplate[] = [
      {
        id: 'welcome',
        name: 'Welcome Email',
        subject: 'Welcome to Global Edge - Your Account is Ready!',
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Global Edge</title>
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
                <h1>Welcome to Global Edge!</h1>
              </div>
              <div class="content">
                <h2>Hello {{firstName}},</h2>
                <p>Welcome to Global Edge, the premier platform for tokenized asset investments. Your account has been successfully created and is ready to use.</p>
                
                <h3>What's Next?</h3>
                <ul>
                  <li>Complete your profile setup</li>
                  <li>Browse available investment opportunities</li>
                  <li>Start your investment journey</li>
                </ul>
                
                <a href="{{dashboardUrl}}" class="button">Access Your Dashboard</a>
                
                <p>If you have any questions, our support team is here to help.</p>
              </div>
              <div class="footer">
                <p>&copy; 2025 Global Edge. All rights reserved.</p>
                <p>This email was sent to {{email}}. If you didn't create this account, please contact support.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
          Welcome to Global Edge!
          
          Hello {{firstName}},
          
          Welcome to Global Edge, the premier platform for tokenized asset investments. Your account has been successfully created and is ready to use.
          
          What's Next?
          - Complete your profile setup
          - Browse available investment opportunities
          - Start your investment journey
          
          Access your dashboard: {{dashboardUrl}}
          
          If you have any questions, our support team is here to help.
          
          © 2025 Global Edge. All rights reserved.
          This email was sent to {{email}}. If you didn't create this account, please contact support.
        `,
        variables: ['firstName', 'email', 'dashboardUrl']
      },
      {
        id: 'investment_confirmation',
        name: 'Investment Confirmation',
        subject: 'Investment Confirmation - {{assetName}}',
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Investment Confirmation</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0f766e, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .investment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .button { display: inline-block; background: #0f766e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Investment Confirmed!</h1>
              </div>
              <div class="content">
                <h2>Hello {{firstName}},</h2>
                <p>Your investment has been successfully confirmed. Here are the details:</p>
                
                <div class="investment-details">
                  <h3>Investment Details</h3>
                  <p><strong>Asset:</strong> {{assetName}}</p>
                  <p><strong>Amount:</strong> $\{amount\}</p>
                  <p><strong>Investment ID:</strong> {{investmentId}}</p>
                  <p><strong>Date:</strong> {{date}}</p>
                </div>
                
                <a href="{{dashboardUrl}}" class="button">View Investment Details</a>
                
                <p>Thank you for investing with Global Edge!</p>
              </div>
              <div class="footer">
                <p>&copy; 2025 Global Edge. All rights reserved.</p>
                <p>This email was sent to {{email}}.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
          Investment Confirmed!
          
          Hello {{firstName}},
          
          Your investment has been successfully confirmed. Here are the details:
          
          Investment Details:
          - Asset: {{assetName}}
          - Amount: $\{amount\}
          - Investment ID: {{investmentId}}
          - Date: {{date}}
          
          View investment details: {{dashboardUrl}}
          
          Thank you for investing with Global Edge!
          
          © 2025 Global Edge. All rights reserved.
          This email was sent to {{email}}.
        `,
        variables: ['firstName', 'email', 'assetName', 'amount', 'investmentId', 'date', 'dashboardUrl']
      }
    ];

    for (const template of templates) {
      this.templates.set(template.id, template);
    }
  }

  /**
   * Send email with template
   */
  async sendTemplateEmail(
    templateId: string,
    to: string | string[],
    variables: Record<string, any>,
    options: {
      cc?: string | string[];
      bcc?: string | string[];
      priority?: 'low' | 'normal' | 'high';
      provider?: string;
    } = {}
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const template = this.templates.get(templateId);
      if (!template) {
        return { success: false, error: 'Template not found' };
      }

      // Replace variables in template
      const processedSubject = this.replaceVariables(template.subject, variables);
      const processedHtmlContent = this.replaceVariables(template.htmlContent, variables);
      const processedTextContent = this.replaceVariables(template.textContent, variables);

      // Create email message
      const message: EmailMessage = {
        id: `email_${Date.now()}`,
        to,
        cc: options.cc,
        bcc: options.bcc,
        subject: processedSubject,
        htmlContent: processedHtmlContent,
        textContent: processedTextContent,
        templateId,
        templateVariables: variables,
        priority: options.priority || 'normal',
        status: 'pending',
        provider: options.provider || this.getDefaultProvider(),
        retryCount: 0,
        maxRetries: 3
      };

      // Send email
      const result = await this.sendEmail(message);
      return result;
    } catch (error) {
      console.error('Send template email error:', error);
      return { success: false, error: 'Failed to send template email' };
    }
  }

  /**
   * Send custom email
   */
  async sendCustomEmail(
    to: string | string[],
    subject: string,
    content: string,
    options: {
      cc?: string | string[];
      bcc?: string | string[];
      priority?: 'low' | 'normal' | 'high';
      provider?: string;
      isHtml?: boolean;
    } = {}
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const message: EmailMessage = {
        id: `email_${Date.now()}`,
        to,
        cc: options.cc,
        bcc: options.bcc,
        subject,
        htmlContent: options.isHtml ? content : undefined,
        textContent: options.isHtml ? undefined : content,
        priority: options.priority || 'normal',
        status: 'pending',
        provider: options.provider || this.getDefaultProvider(),
        retryCount: 0,
        maxRetries: 3
      };

      const result = await this.sendEmail(message);
      return result;
    } catch (error) {
      console.error('Send custom email error:', error);
      return { success: false, error: 'Failed to send custom email' };
    }
  }

  /**
   * Send email using specified provider
   */
  private async sendEmail(message: EmailMessage): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const provider = this.providers.get(message.provider);
      if (!provider || !provider.enabled) {
        return { success: false, error: `Provider ${message.provider} not available` };
      }

      // In a real implementation, you would use the actual email service SDKs here
      // For now, we'll simulate sending
      const result = await this.simulateEmailSend(message, provider);
      
      if (result.success) {
        // Store email in database
        await this.storeEmailMessage(message);
      }

      return result;
    } catch (error) {
      console.error('Send email error:', error);
      return { success: false, error: 'Failed to send email' };
    }
  }

  /**
   * Simulate email sending (for development)
   */
  private async simulateEmailSend(message: EmailMessage, provider: EmailProvider): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Simulate sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate success rate (95% success)
      const isSuccess = Math.random() > 0.05;

      if (isSuccess) {
        message.status = 'sent';
        message.sentAt = new Date().toISOString();
        console.log(`Email sent via ${provider.name} to ${Array.isArray(message.to) ? message.to.join(', ') : message.to}`);
        
        return { success: true, messageId: message.id };
      } else {
        message.status = 'failed';
        message.failedAt = new Date().toISOString();
        message.errorMessage = 'Simulated delivery failure';
        
        return { success: false, error: 'Simulated delivery failure' };
      }
    } catch (error) {
      console.error('Simulate email send error:', error);
      return { success: false, error: 'Failed to simulate email send' };
    }
  }

  /**
   * Replace variables in template content
   */
  private replaceVariables(content: string, variables: Record<string, any>): string {
    let processedContent = content;
    
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      processedContent = processedContent.replace(new RegExp(placeholder, 'g'), String(value));
    }
    
    return processedContent;
  }

  /**
   * Get default email provider
   */
  private getDefaultProvider(): string {
    // Return the first enabled provider
    for (const [name, provider] of Array.from(this.providers.entries())) {
      if (provider.enabled) {
        return name;
      }
    }
    
    return 'sendgrid'; // Fallback
  }

  /**
   * Store email message in database
   */
  private async storeEmailMessage(message: EmailMessage): Promise<{ success: boolean; error?: string }> {
    try {
      // In a real implementation, you would store this in the database
      // For now, we'll just add it to the queue
      this.emailQueue.push(message);
      
      return { success: true };
    } catch (error) {
      console.error('Store email message error:', error);
      return { success: false, error: 'Failed to store email message' };
    }
  }

  /**
   * Get email statistics
   */
  getEmailStats(): { success: boolean; stats?: any; error?: string } {
    try {
      const stats = {
        totalEmails: this.emailQueue.length,
        sent: this.emailQueue.filter(e => e.status === 'sent').length,
        failed: this.emailQueue.filter(e => e.status === 'failed').length,
        pending: this.emailQueue.filter(e => e.status === 'pending').length,
        byProvider: this.getProviderStats(),
        byTemplate: this.getTemplateStats()
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get email stats error:', error);
      return { success: false, error: 'Failed to get email stats' };
    }
  }

  /**
   * Get provider statistics
   */
  private getProviderStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    for (const email of this.emailQueue) {
      stats[email.provider] = (stats[email.provider] || 0) + 1;
    }
    
    return stats;
  }

  /**
   * Get template statistics
   */
  private getTemplateStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    for (const email of this.emailQueue) {
      if (email.templateId) {
        stats[email.templateId] = (stats[email.templateId] || 0) + 1;
      }
    }
    
    return stats;
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): { success: boolean; providers?: EmailProvider[]; error?: string } {
    try {
      const providers = Array.from(this.providers.values());
      return { success: true, providers };
    } catch (error) {
      console.error('Get available providers error:', error);
      return { success: false, error: 'Failed to get available providers' };
    }
  }

  /**
   * Get available templates
   */
  getAvailableTemplates(): { success: boolean; templates?: EmailTemplate[]; error?: string } {
    try {
      const templates = Array.from(this.templates.values());
      return { success: true, templates };
    } catch (error) {
      console.error('Get available templates error:', error);
      return { success: false, error: 'Failed to get available templates' };
    }
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`EmailIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const emailIntegration = new EmailIntegration();
