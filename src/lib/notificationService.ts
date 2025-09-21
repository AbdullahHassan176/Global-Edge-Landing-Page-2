// Notification Service for Global Edge
// Handles email notifications, webhooks, and admin notifications

export interface EmailNotification {
  id: string;
  type: 'account_created' | 'partner_application' | 'welcome' | 'verification';
  to: string;
  subject: string;
  template: string;
  data: any;
  status: 'pending' | 'sent' | 'failed';
  timestamp: string;
  retryCount: number;
}

export interface WebhookNotification {
  id: string;
  type: 'account_created' | 'partner_application';
  endpoint: string;
  payload: any;
  status: 'pending' | 'sent' | 'failed';
  timestamp: string;
  retryCount: number;
}

export interface AdminNotification {
  id: string;
  type: 'account_created' | 'partner_application';
  title: string;
  description: string;
  userEmail: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'processed';
  data: any;
  priority: 'low' | 'medium' | 'high';
}

class NotificationService {
  private emailNotifications: EmailNotification[] = [];
  private webhookNotifications: WebhookNotification[] = [];
  private adminNotifications: AdminNotification[] = [];

  // Email Templates
  private emailTemplates = {
    account_created: {
      subject: 'Welcome to Global Edge - Account Created Successfully!',
      template: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0D9488, #7C3AED); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Global Edge!</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your account has been created successfully</p>
          </div>
          <div style="padding: 40px; background: white;">
            <h2 style="color: #1F2937; margin-bottom: 20px;">Hello {{firstName}}!</h2>
            <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
              Thank you for creating your {{accountType}} account with Global Edge. You're now part of a growing community of investors earning returns from tokenized real-world assets.
            </p>
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1F2937; margin-bottom: 15px;">Next Steps:</h3>
              <ul style="color: #6B7280; line-height: 1.8;">
                <li>Verify your email address by clicking the link below</li>
                <li>Complete your KYC verification process</li>
                <li>Browse available investment opportunities</li>
                <li>Make your first investment with as little as $50</li>
              </ul>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{verificationLink}}" style="background: #0D9488; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                Verify Email Address
              </a>
            </div>
            <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
              If you have any questions, please contact our support team at info@globalnext.rocks
            </p>
          </div>
          <div style="background: #F9FAFB; padding: 20px; text-align: center; color: #6B7280; font-size: 12px;">
            <p>© 2025 Global Edge. All rights reserved.</p>
          </div>
        </div>
      `
    },
    partner_application: {
      subject: 'Partnership Application Received - Global Edge',
      template: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0D9488, #7C3AED); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Partnership Application Received</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Thank you for your interest in partnering with Global Edge</p>
          </div>
          <div style="padding: 40px; background: white;">
            <h2 style="color: #1F2937; margin-bottom: 20px;">Hello {{contactName}}!</h2>
            <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
              We've received your partnership application for <strong>{{companyName}}</strong>. Our partnership team will review your application and get back to you within 2-3 business days.
            </p>
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1F2937; margin-bottom: 15px;">Application Details:</h3>
              <ul style="color: #6B7280; line-height: 1.8;">
                <li><strong>Company:</strong> {{companyName}}</li>
                <li><strong>Industry:</strong> {{industry}}</li>
                <li><strong>Partnership Type:</strong> {{partnershipType}}</li>
                <li><strong>Website:</strong> {{website}}</li>
              </ul>
            </div>
            <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
              <h3 style="color: #92400E; margin-bottom: 10px;">What's Next?</h3>
              <p style="color: #92400E; margin: 0; line-height: 1.6;">
                Our partnership team will conduct a thorough review of your application, including due diligence and strategic fit assessment. We'll contact you within 2-3 business days with next steps.
              </p>
            </div>
            <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
              If you have any questions about your application, please contact our partnership team at partnerships@globaledge.com
            </p>
          </div>
          <div style="background: #F9FAFB; padding: 20px; text-align: center; color: #6B7280; font-size: 12px;">
            <p>© 2025 Global Edge. All rights reserved.</p>
          </div>
        </div>
      `
    },
    welcome: {
      subject: 'Welcome to Global Edge - Start Your Investment Journey',
      template: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0D9488, #7C3AED); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Global Edge!</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your investment journey starts here</p>
          </div>
          <div style="padding: 40px; background: white;">
            <h2 style="color: #1F2937; margin-bottom: 20px;">Hello {{firstName}}!</h2>
            <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
              Welcome to Global Edge! You're now part of an exclusive community of investors earning returns from tokenized real-world assets.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{dashboardLink}}" style="background: #0D9488; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                Access Your Dashboard
              </a>
            </div>
          </div>
        </div>
      `
    },
    verification: {
      subject: 'Verify Your Email - Global Edge',
      template: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0D9488, #7C3AED); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Complete your account setup</p>
          </div>
          <div style="padding: 40px; background: white;">
            <h2 style="color: #1F2937; margin-bottom: 20px;">Hello {{firstName}}!</h2>
            <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
              Please verify your email address to complete your account setup and start investing.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{verificationLink}}" style="background: #0D9488; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                Verify Email Address
              </a>
            </div>
          </div>
        </div>
      `
    }
  };

  // Webhook Endpoints Configuration (Mock URLs for Development)
  private webhookEndpoints = {
    account_created: [
      'https://mock-webhook.example.com/slack/account-created',
      'https://mock-webhook.example.com/sendgrid/mail/send',
      'https://mock-webhook.example.com/mailgun/globaledge/messages'
    ],
    partner_application: [
      'https://mock-webhook.example.com/slack/partner-application',
      'https://mock-webhook.example.com/hubspot/contacts/v1/contact',
      'https://mock-webhook.example.com/salesforce/services/data/v52.0/sobjects/Lead'
    ]
  };

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Process template with data
  private processTemplate(template: string, data: any): string {
    let processedTemplate = template;
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedTemplate = processedTemplate.replace(regex, data[key] || '');
    });
    return processedTemplate;
  }

  // Send account creation notifications
  async sendAccountCreatedNotifications(userData: any): Promise<void> {
    const timestamp = new Date().toISOString();
    const verificationLink = `https://globaledge.com/verify?token=${this.generateId()}`;
    const dashboardLink = `https://globaledge.com/dashboard`;

    // Email to user
    const userEmail: EmailNotification = {
      id: this.generateId(),
      type: 'account_created',
      to: userData.email,
      subject: this.emailTemplates.account_created.subject,
      template: this.processTemplate(this.emailTemplates.account_created.template, {
        ...userData,
        verificationLink,
        dashboardLink
      }),
      data: userData,
      status: 'pending',
      timestamp,
      retryCount: 0
    };

    // Email to admin team
    const adminEmail: EmailNotification = {
      id: this.generateId(),
      type: 'account_created',
      to: 'admin@globaledge.com',
      subject: `New ${userData.accountType} Account Created - ${userData.firstName} ${userData.lastName}`,
      template: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Account Created</h2>
          <p><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Phone:</strong> ${userData.phone}</p>
          <p><strong>Account Type:</strong> ${userData.accountType}</p>
          <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
        </div>
      `,
      data: userData,
      status: 'pending',
      timestamp,
      retryCount: 0
    };

    // Email to support team
    const supportEmail: EmailNotification = {
      id: this.generateId(),
      type: 'welcome',
      to: 'info@globalnext.rocks',
      subject: `New User Onboarding Required - ${userData.firstName} ${userData.lastName}`,
      template: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New User Onboarding</h2>
          <p>A new ${userData.accountType} account has been created and requires onboarding assistance.</p>
          <p><strong>User Details:</strong></p>
          <ul>
            <li>Name: ${userData.firstName} ${userData.lastName}</li>
            <li>Email: ${userData.email}</li>
            <li>Phone: ${userData.phone}</li>
          </ul>
          <p>Please initiate the welcome sequence and KYC process.</p>
        </div>
      `,
      data: userData,
      status: 'pending',
      timestamp,
      retryCount: 0
    };

    // Add to email queue
    this.emailNotifications.push(userEmail, adminEmail, supportEmail);

    // Create admin notification
    const adminNotification: AdminNotification = {
      id: this.generateId(),
      type: 'account_created',
      title: `New ${userData.accountType} Account Created`,
      description: `${userData.firstName} ${userData.lastName} created a new ${userData.accountType} account`,
      userEmail: userData.email,
      timestamp,
      status: 'new',
      data: userData,
      priority: userData.accountType === 'business' ? 'high' : 'medium'
    };

    this.adminNotifications.push(adminNotification);

    // Send webhooks
    await this.sendWebhooks('account_created', {
      user: userData,
      timestamp,
      verificationLink
    });

    // Simulate email sending
    await this.processEmailQueue();
  }

  // Send partner application notifications
  async sendPartnerApplicationNotifications(applicationData: any): Promise<void> {
    const timestamp = new Date().toISOString();

    // Email to applicant
    const applicantEmail: EmailNotification = {
      id: this.generateId(),
      type: 'partner_application',
      to: applicationData.email,
      subject: this.emailTemplates.partner_application.subject,
      template: this.processTemplate(this.emailTemplates.partner_application.template, applicationData),
      data: applicationData,
      status: 'pending',
      timestamp,
      retryCount: 0
    };

    // Email to partnership team
    const partnershipEmail: EmailNotification = {
      id: this.generateId(),
      type: 'partner_application',
      to: 'partnerships@globaledge.com',
      subject: `New Partnership Application - ${applicationData.companyName}`,
      template: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Partnership Application</h2>
          <p><strong>Company:</strong> ${applicationData.companyName}</p>
          <p><strong>Contact:</strong> ${applicationData.contactName}</p>
          <p><strong>Email:</strong> ${applicationData.email}</p>
          <p><strong>Phone:</strong> ${applicationData.phone}</p>
          <p><strong>Industry:</strong> ${applicationData.industry}</p>
          <p><strong>Partnership Type:</strong> ${applicationData.partnershipType}</p>
          <p><strong>Website:</strong> ${applicationData.website}</p>
          <p><strong>Description:</strong> ${applicationData.description}</p>
          <p><strong>Expected Volume:</strong> ${applicationData.expectedVolume}</p>
          <p><strong>Timeline:</strong> ${applicationData.timeline}</p>
        </div>
      `,
      data: applicationData,
      status: 'pending',
      timestamp,
      retryCount: 0
    };

    // Email to sales team
    const salesEmail: EmailNotification = {
      id: this.generateId(),
      type: 'partner_application',
      to: 'sales@globaledge.com',
      subject: `New Partnership Lead - ${applicationData.companyName}`,
      template: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Partnership Lead</h2>
          <p>A new partnership application has been submitted and requires sales follow-up.</p>
          <p><strong>Company:</strong> ${applicationData.companyName}</p>
          <p><strong>Contact:</strong> ${applicationData.contactName}</p>
          <p><strong>Email:</strong> ${applicationData.email}</p>
          <p><strong>Phone:</strong> ${applicationData.phone}</p>
          <p><strong>Expected Volume:</strong> ${applicationData.expectedVolume}</p>
          <p><strong>Timeline:</strong> ${applicationData.timeline}</p>
        </div>
      `,
      data: applicationData,
      status: 'pending',
      timestamp,
      retryCount: 0
    };

    // Add to email queue
    this.emailNotifications.push(applicantEmail, partnershipEmail, salesEmail);

    // Create admin notification
    const adminNotification: AdminNotification = {
      id: this.generateId(),
      type: 'partner_application',
      title: 'New Partnership Application',
      description: `${applicationData.companyName} submitted a partnership application`,
      userEmail: applicationData.email,
      timestamp,
      status: 'new',
      data: applicationData,
      priority: 'high'
    };

    this.adminNotifications.push(adminNotification);

    // Send webhooks
    await this.sendWebhooks('partner_application', {
      application: applicationData,
      timestamp
    });

    // Simulate email sending
    await this.processEmailQueue();
  }

  // Send webhooks
  private async sendWebhooks(type: string, payload: any): Promise<void> {
    const endpoints = this.webhookEndpoints[type as keyof typeof this.webhookEndpoints] || [];
    
    for (const endpoint of endpoints) {
      const webhook: WebhookNotification = {
        id: this.generateId(),
        type: type as any,
        endpoint,
        payload,
        status: 'pending',
        timestamp: new Date().toISOString(),
        retryCount: 0
      };

      this.webhookNotifications.push(webhook);
    }

    // Simulate webhook sending
    await this.processWebhookQueue();
  }

  // Process email queue
  private async processEmailQueue(): Promise<void> {
    const pendingEmails = this.emailNotifications.filter(email => email.status === 'pending');
    
    for (const email of pendingEmails) {
      try {
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate 95% success rate
        if (Math.random() > 0.05) {
          email.status = 'sent';
          console.log(`✅ Email sent to ${email.to}: ${email.subject}`);
        } else {
          email.status = 'failed';
          email.retryCount++;
          console.log(`❌ Email failed to ${email.to}: ${email.subject}`);
        }
      } catch (error) {
        email.status = 'failed';
        email.retryCount++;
        console.log(`❌ Email error to ${email.to}: ${error}`);
      }
    }
  }

  // Process webhook queue
  private async processWebhookQueue(): Promise<void> {
    const pendingWebhooks = this.webhookNotifications.filter(webhook => webhook.status === 'pending');
    
    for (const webhook of pendingWebhooks) {
      try {
        // Simulate webhook sending delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          webhook.status = 'sent';
          console.log(`✅ Webhook sent to ${webhook.endpoint}`);
        } else {
          webhook.status = 'failed';
          webhook.retryCount++;
          console.log(`❌ Webhook failed to ${webhook.endpoint}`);
        }
      } catch (error) {
        webhook.status = 'failed';
        webhook.retryCount++;
        console.log(`❌ Webhook error to ${webhook.endpoint}: ${error}`);
      }
    }
  }

  // Get all notifications
  getEmailNotifications(): EmailNotification[] {
    return this.emailNotifications;
  }

  getWebhookNotifications(): WebhookNotification[] {
    return this.webhookNotifications;
  }

  getAdminNotifications(): AdminNotification[] {
    return this.adminNotifications;
  }

  // Update admin notification status
  updateAdminNotificationStatus(id: string, status: 'new' | 'reviewed' | 'processed'): void {
    const notification = this.adminNotifications.find(n => n.id === id);
    if (notification) {
      notification.status = status;
    }
  }

  // Get notification statistics
  getNotificationStats() {
    const emailStats = {
      total: this.emailNotifications.length,
      sent: this.emailNotifications.filter(e => e.status === 'sent').length,
      failed: this.emailNotifications.filter(e => e.status === 'failed').length,
      pending: this.emailNotifications.filter(e => e.status === 'pending').length
    };

    const webhookStats = {
      total: this.webhookNotifications.length,
      sent: this.webhookNotifications.filter(w => w.status === 'sent').length,
      failed: this.webhookNotifications.filter(w => w.status === 'failed').length,
      pending: this.webhookNotifications.filter(w => w.status === 'pending').length
    };

    const adminStats = {
      total: this.adminNotifications.length,
      new: this.adminNotifications.filter(a => a.status === 'new').length,
      reviewed: this.adminNotifications.filter(a => a.status === 'reviewed').length,
      processed: this.adminNotifications.filter(a => a.status === 'processed').length
    };

    return { emailStats, webhookStats, adminStats };
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
