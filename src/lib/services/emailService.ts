/**
 * Email Service using SendGrid
 * Handles all email communications for the platform
 */

import { API_KEYS } from '@/lib/config/apiKeys';

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

class EmailService {
  private apiKey: string;
  private fromEmail: string;
  private fromName: string;

  constructor() {
    this.apiKey = API_KEYS.SENDGRID.API_KEY;
    this.fromEmail = API_KEYS.SENDGRID.FROM_EMAIL;
    this.fromName = API_KEYS.SENDGRID.FROM_NAME;
  }

  /**
   * Send a single email
   */
  async sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: Array.isArray(options.to) ? options.to.map(email => ({ email })) : [{ email: options.to }],
              subject: options.subject,
            },
          ],
          from: {
            email: options.from || this.fromEmail,
            name: this.fromName,
          },
          reply_to: options.replyTo ? { email: options.replyTo } : undefined,
          content: [
            {
              type: 'text/html',
              value: options.html,
            },
            ...(options.text ? [{
              type: 'text/plain',
              value: options.text,
            }] : []),
          ],
        }),
      });

      if (response.ok) {
        const messageId = response.headers.get('X-Message-Id');
        return { success: true, messageId: messageId || undefined };
      } else {
        const error = await response.text();
        return { success: false, error: `SendGrid API error: ${error}` };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(userEmail: string, userName: string, userRole: 'issuer' | 'investor'): Promise<{ success: boolean; error?: string }> {
    const subject = `Welcome to Global Edge - ${userRole === 'issuer' ? 'Asset Issuer' : 'Investor'} Platform`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a365d;">Welcome to Global Edge, ${userName}!</h1>
        <p>Thank you for joining our ${userRole === 'issuer' ? 'asset issuer' : 'investment'} platform.</p>
        
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d3748; margin-top: 0;">What's Next?</h3>
          ${userRole === 'issuer' ? `
            <ul>
              <li>Complete your KYC verification</li>
              <li>Create your first asset listing</li>
              <li>Set up your issuer profile</li>
            </ul>
          ` : `
            <ul>
              <li>Complete your KYC verification</li>
              <li>Browse available investment opportunities</li>
              <li>Set up your investment preferences</li>
            </ul>
          `}
        </div>
        
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; font-size: 14px;">
            Best regards,<br>
            The Global Edge Team
          </p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject,
      html,
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(userEmail: string, resetToken: string): Promise<{ success: boolean; error?: string }> {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const subject = 'Reset Your Global Edge Password';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a365d;">Password Reset Request</h1>
        <p>You requested to reset your password for your Global Edge account.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #718096; font-size: 14px;">
          If you didn't request this password reset, please ignore this email.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; font-size: 14px;">
            This link will expire in 24 hours.<br>
            Best regards,<br>
            The Global Edge Team
          </p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject,
      html,
    });
  }

  /**
   * Send investment notification email
   */
  async sendInvestmentNotification(
    userEmail: string, 
    userName: string, 
    investmentAmount: number, 
    assetName: string
  ): Promise<{ success: boolean; error?: string }> {
    const subject = `New Investment in ${assetName}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a365d;">New Investment Received!</h1>
        <p>Hello ${userName},</p>
        
        <div style="background-color: #f0fff4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38a169;">
          <h3 style="color: #22543d; margin-top: 0;">Investment Details</h3>
          <p><strong>Asset:</strong> ${assetName}</p>
          <p><strong>Amount:</strong> $${investmentAmount.toLocaleString()}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>You can view more details about this investment in your issuer dashboard.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; font-size: 14px;">
            Best regards,<br>
            The Global Edge Team
          </p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject,
      html,
    });
  }
}

export const emailService = new EmailService();
