'use client';

export interface SystemSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  value: any;
  type: 'boolean' | 'string' | 'number' | 'select' | 'password' | 'textarea' | 'json';
  options?: string[];
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  sensitive?: boolean;
  lastModified?: string;
  modifiedBy?: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'email' | 'webhook' | 'api' | 'payment' | 'analytics' | 'storage' | 'notification';
  status: 'active' | 'inactive' | 'error' | 'pending';
  lastSync: string;
  description: string;
  configuration: Record<string, any>;
  credentials?: {
    apiKey?: string;
    secret?: string;
    endpoint?: string;
    webhook?: string;
  };
  healthCheck?: {
    status: 'healthy' | 'warning' | 'error';
    lastCheck: string;
    responseTime?: number;
    error?: string;
  };
}

export interface SettingsBackup {
  id: string;
  name: string;
  description: string;
  settings: SystemSetting[];
  integrations: Integration[];
  createdAt: string;
  createdBy: string;
  version: string;
}

class SettingsService {
  private readonly SETTINGS_KEY = 'admin_settings';
  private readonly INTEGRATIONS_KEY = 'admin_integrations';
  private readonly BACKUPS_KEY = 'admin_settings_backups';

  // Default settings
  private getDefaultSettings(): SystemSetting[] {
    return [
      {
        id: 'site_name',
        category: 'General',
        name: 'Site Name',
        description: 'The name of your platform',
        value: 'Global Edge',
        type: 'string',
        required: true,
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'site_description',
        category: 'General',
        name: 'Site Description',
        description: 'Brief description of your platform',
        value: 'Tokenized Asset Investment Platform',
        type: 'textarea',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'site_url',
        category: 'General',
        name: 'Site URL',
        description: 'The main URL of your platform',
        value: 'https://globaledge.com',
        type: 'string',
        validation: {
          pattern: '^https?://.+',
          message: 'Must be a valid URL starting with http:// or https://'
        },
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'maintenance_mode',
        category: 'General',
        name: 'Maintenance Mode',
        description: 'Enable maintenance mode to restrict access',
        value: false,
        type: 'boolean',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'maintenance_message',
        category: 'General',
        name: 'Maintenance Message',
        description: 'Message shown to users during maintenance',
        value: 'We are currently performing scheduled maintenance. Please check back soon.',
        type: 'textarea',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'smtp_host',
        category: 'Email',
        name: 'SMTP Host',
        description: 'SMTP server hostname',
        value: 'smtp.gmail.com',
        type: 'string',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'smtp_port',
        category: 'Email',
        name: 'SMTP Port',
        description: 'SMTP server port',
        value: 587,
        type: 'number',
        validation: {
          min: 1,
          max: 65535,
          message: 'Port must be between 1 and 65535'
        },
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'smtp_username',
        category: 'Email',
        name: 'SMTP Username',
        description: 'SMTP authentication username',
        value: '',
        type: 'string',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'smtp_password',
        category: 'Email',
        name: 'SMTP Password',
        description: 'SMTP authentication password',
        value: '',
        type: 'password',
        sensitive: true,
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'email_notifications',
        category: 'Email',
        name: 'Email Notifications',
        description: 'Enable email notifications',
        value: true,
        type: 'boolean',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'email_from_name',
        category: 'Email',
        name: 'From Name',
        description: 'Default sender name for emails',
        value: 'Global Edge',
        type: 'string',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'email_from_address',
        category: 'Email',
        name: 'From Address',
        description: 'Default sender email address',
        value: 'noreply@theglobaledge.io',
        type: 'string',
        validation: {
          pattern: '^[^@]+@[^@]+\\.[^@]+$',
          message: 'Must be a valid email address'
        },
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'two_factor_auth',
        category: 'Security',
        name: 'Two-Factor Authentication',
        description: 'Require 2FA for admin accounts',
        value: true,
        type: 'boolean',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'session_timeout',
        category: 'Security',
        name: 'Session Timeout',
        description: 'Session timeout in minutes',
        value: 30,
        type: 'select',
        options: ['15', '30', '60', '120', '240'],
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'password_policy',
        category: 'Security',
        name: 'Password Policy',
        description: 'Password requirements configuration',
        value: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true
        },
        type: 'json',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'ip_whitelist',
        category: 'Security',
        name: 'IP Whitelist',
        description: 'Comma-separated list of allowed IP addresses',
        value: '',
        type: 'textarea',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'api_rate_limit',
        category: 'API',
        name: 'API Rate Limit',
        description: 'Requests per minute per API key',
        value: 1000,
        type: 'number',
        validation: {
          min: 1,
          max: 10000,
          message: 'Rate limit must be between 1 and 10000'
        },
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'api_documentation',
        category: 'API',
        name: 'API Documentation',
        description: 'Enable public API documentation',
        value: false,
        type: 'boolean',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'api_version',
        category: 'API',
        name: 'API Version',
        description: 'Current API version',
        value: 'v1',
        type: 'select',
        options: ['v1', 'v2', 'v3'],
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      },
      {
        id: 'cors_origins',
        category: 'API',
        name: 'CORS Origins',
        description: 'Allowed CORS origins (one per line)',
        value: 'https://globaledge.com\nhttps://app.globaledge.com',
        type: 'textarea',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system'
      }
    ];
  }

  // Default integrations
  private getDefaultIntegrations(): Integration[] {
    return [
      {
        id: 'sendgrid',
        name: 'SendGrid Email Service',
        type: 'email',
        status: 'active',
        lastSync: new Date().toISOString(),
        description: 'Primary email delivery service',
        configuration: {
          apiKey: process.env.EMAIL_API_KEY || '',
          fromEmail: process.env.EMAIL_FROM_EMAIL || 'noreply@theglobaledge.io',
          fromName: process.env.EMAIL_FROM_NAME || 'Global Edge'
        },
        healthCheck: {
          status: 'healthy',
          lastCheck: new Date().toISOString(),
          responseTime: 120
        }
      },
      {
        id: 'stripe',
        name: 'Stripe Payment Gateway',
        type: 'payment',
        status: 'active',
        lastSync: new Date().toISOString(),
        description: 'Payment processing integration',
        configuration: {
          publishableKey: process.env.NEXT_PUBLIC_PAYMENT_PUBLISHABLE_KEY || '',
          secretKey: process.env.PAYMENT_SECRET_KEY || '',
          webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET || ''
        },
        healthCheck: {
          status: 'healthy',
          lastCheck: new Date().toISOString(),
          responseTime: 85
        }
      },
      {
        id: 'slack',
        name: 'Slack Notifications',
        type: 'notification',
        status: 'active',
        lastSync: new Date().toISOString(),
        description: 'Admin notifications to Slack',
        configuration: {
          webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
          channel: process.env.SLACK_CHANNEL || '#admin-alerts',
          username: process.env.SLACK_USERNAME || 'Global Edge Bot'
        },
        healthCheck: {
          status: 'healthy',
          lastCheck: new Date().toISOString(),
          responseTime: 200
        }
      },
      {
        id: 'analytics',
        name: 'Google Analytics',
        type: 'analytics',
        status: 'inactive',
        lastSync: new Date().toISOString(),
        description: 'Website analytics tracking',
        configuration: {
          trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'G-XXXXXXXXXX',
          measurementId: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || 'G-XXXXXXXXXX',
          propertyId: process.env.GOOGLE_ANALYTICS_PROPERTY_ID || '',
          apiKey: process.env.GOOGLE_ANALYTICS_API_KEY || ''
        },
        healthCheck: {
          status: 'warning',
          lastCheck: new Date().toISOString(),
          responseTime: 0
        }
      },
      {
        id: 'aws_s3',
        name: 'AWS S3 Storage',
        type: 'storage',
        status: 'active',
        lastSync: new Date().toISOString(),
        description: 'File storage and asset management',
        configuration: {
          bucketName: '',
          region: 'us-east-1',
          accessKeyId: '',
          secretAccessKey: ''
        },
        healthCheck: {
          status: 'healthy',
          lastCheck: new Date().toISOString(),
          responseTime: 150
        }
      },
      {
        id: 'webhook_general',
        name: 'General Webhook',
        type: 'webhook',
        status: 'inactive',
        lastSync: new Date(Date.now() - 3600000).toISOString(),
        description: 'General purpose webhook for external integrations',
        configuration: {
          url: '',
          method: 'POST',
          headers: {},
          retryAttempts: 3
        },
        healthCheck: {
          status: 'warning',
          lastCheck: new Date(Date.now() - 3600000).toISOString(),
          responseTime: 500
        }
      }
    ];
  }

  // Get all settings
  getSettings(): SystemSetting[] {
    try {
      const stored = localStorage.getItem(this.SETTINGS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return this.getDefaultSettings();
    } catch (error) {
      console.error('Error loading settings:', error);
      return this.getDefaultSettings();
    }
  }

  // Get settings by category
  getSettingsByCategory(category: string): SystemSetting[] {
    return this.getSettings().filter(setting => setting.category === category);
  }

  // Get a specific setting
  getSetting(id: string): SystemSetting | null {
    const settings = this.getSettings();
    return settings.find(setting => setting.id === id) || null;
  }

  // Update a setting
  updateSetting(id: string, value: any, modifiedBy: string = 'admin'): boolean {
    try {
      const settings = this.getSettings();
      const settingIndex = settings.findIndex(setting => setting.id === id);
      
      if (settingIndex === -1) {
        return false;
      }

      // Validate the setting
      const validation = this.validateSetting(settings[settingIndex], value);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      settings[settingIndex] = {
        ...settings[settingIndex],
        value,
        lastModified: new Date().toISOString(),
        modifiedBy
      };

      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  }

  // Validate a setting value
  validateSetting(setting: SystemSetting, value: any): { isValid: boolean; error?: string } {
    if (setting.required && (value === null || value === undefined || value === '')) {
      return { isValid: false, error: `${setting.name} is required` };
    }

    if (setting.validation) {
      const { min, max, pattern, message } = setting.validation;

      if (setting.type === 'number' && typeof value === 'number') {
        if (min !== undefined && value < min) {
          return { isValid: false, error: message || `Value must be at least ${min}` };
        }
        if (max !== undefined && value > max) {
          return { isValid: false, error: message || `Value must be at most ${max}` };
        }
      }

      if (setting.type === 'string' && typeof value === 'string' && pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          return { isValid: false, error: message || 'Invalid format' };
        }
      }
    }

    return { isValid: true };
  }

  // Get all integrations
  getIntegrations(): Integration[] {
    try {
      const stored = localStorage.getItem(this.INTEGRATIONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return this.getDefaultIntegrations();
    } catch (error) {
      console.error('Error loading integrations:', error);
      return this.getDefaultIntegrations();
    }
  }

  // Get integration by ID
  getIntegration(id: string): Integration | null {
    const integrations = this.getIntegrations();
    return integrations.find(integration => integration.id === id) || null;
  }

  // Update integration
  updateIntegration(id: string, updates: Partial<Integration>): boolean {
    try {
      const integrations = this.getIntegrations();
      const integrationIndex = integrations.findIndex(integration => integration.id === id);
      
      if (integrationIndex === -1) {
        return false;
      }

      integrations[integrationIndex] = {
        ...integrations[integrationIndex],
        ...updates,
        lastSync: new Date().toISOString()
      };

      localStorage.setItem(this.INTEGRATIONS_KEY, JSON.stringify(integrations));
      return true;
    } catch (error) {
      console.error('Error updating integration:', error);
      return false;
    }
  }

  // Toggle integration status
  toggleIntegration(id: string): boolean {
    const integration = this.getIntegration(id);
    if (!integration) return false;

    const newStatus = integration.status === 'active' ? 'inactive' : 'active';
    return this.updateIntegration(id, { status: newStatus });
  }

  // Test integration connection
  async testIntegration(id: string): Promise<{ success: boolean; error?: string; responseTime?: number }> {
    const integration = this.getIntegration(id);
    if (!integration) {
      return { success: false, error: 'Integration not found' };
    }

    const startTime = Date.now();
    
    try {
      // Special validation for Google Analytics
      if (integration.type === 'analytics') {
        const { trackingId, measurementId } = integration.configuration;
        
        // Validate tracking ID format (GA4 format: G-XXXXXXXXXX)
        if (!trackingId || trackingId === 'G-XXXXXXXXXX' || !trackingId.startsWith('G-')) {
          return { 
            success: false, 
            error: 'Invalid Google Analytics tracking ID. Please enter a valid GA4 tracking ID (format: G-XXXXXXXXXX)' 
          };
        }
        
        // Validate measurement ID format
        if (!measurementId || measurementId === 'G-XXXXXXXXXX' || !measurementId.startsWith('G-')) {
          return { 
            success: false, 
            error: 'Invalid Google Analytics measurement ID. Please enter a valid GA4 measurement ID (format: G-XXXXXXXXXX)' 
          };
        }
        
        // Simulate successful validation
        await new Promise(resolve => setTimeout(resolve, 500));
        const responseTime = Date.now() - startTime;
        
        this.updateIntegration(id, {
          healthCheck: {
            status: 'healthy',
            lastCheck: new Date().toISOString(),
            responseTime
          }
        });
        return { success: true, responseTime };
      }
      
      // Simulate API call based on integration type
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 100));
      
      const responseTime = Date.now() - startTime;
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        this.updateIntegration(id, {
          healthCheck: {
            status: 'healthy',
            lastCheck: new Date().toISOString(),
            responseTime
          }
        });
        return { success: true, responseTime };
      } else {
        this.updateIntegration(id, {
          healthCheck: {
            status: 'error',
            lastCheck: new Date().toISOString(),
            error: 'Connection failed'
          }
        });
        return { success: false, error: 'Connection failed' };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateIntegration(id, {
        healthCheck: {
          status: 'error',
          lastCheck: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error', responseTime };
    }
  }

  // Create settings backup
  createBackup(name: string, description: string, createdBy: string): string {
    try {
      const backups = this.getBackups();
      const backup: SettingsBackup = {
        id: `backup_${Date.now()}`,
        name,
        description,
        settings: this.getSettings(),
        integrations: this.getIntegrations(),
        createdAt: new Date().toISOString(),
        createdBy,
        version: '1.0'
      };

      backups.push(backup);
      localStorage.setItem(this.BACKUPS_KEY, JSON.stringify(backups));
      return backup.id;
    } catch (error) {
      console.error('Error creating backup:', error);
      throw error;
    }
  }

  // Get all backups
  getBackups(): SettingsBackup[] {
    try {
      const stored = localStorage.getItem(this.BACKUPS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading backups:', error);
      return [];
    }
  }

  // Restore from backup
  restoreFromBackup(backupId: string): boolean {
    try {
      const backups = this.getBackups();
      const backup = backups.find(b => b.id === backupId);
      
      if (!backup) {
        return false;
      }

      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(backup.settings));
      localStorage.setItem(this.INTEGRATIONS_KEY, JSON.stringify(backup.integrations));
      return true;
    } catch (error) {
      console.error('Error restoring backup:', error);
      return false;
    }
  }

  // Export settings
  exportSettings(): string {
    const data = {
      settings: this.getSettings(),
      integrations: this.getIntegrations(),
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  }

  // Import settings
  importSettings(jsonData: string): { success: boolean; error?: string } {
    try {
      const data = JSON.parse(jsonData);
      
      if (!data.settings || !Array.isArray(data.settings)) {
        return { success: false, error: 'Invalid settings format' };
      }

      if (!data.integrations || !Array.isArray(data.integrations)) {
        return { success: false, error: 'Invalid integrations format' };
      }

      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(data.settings));
      localStorage.setItem(this.INTEGRATIONS_KEY, JSON.stringify(data.integrations));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid JSON format' };
    }
  }

  // Reset to defaults
  resetToDefaults(): void {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.getDefaultSettings()));
    localStorage.setItem(this.INTEGRATIONS_KEY, JSON.stringify(this.getDefaultIntegrations()));
  }

  // Clear all cache
  clearCache(): void {
    // Clear any cached data
    localStorage.removeItem('admin_cache');
    localStorage.removeItem('user_cache');
    localStorage.removeItem('asset_cache');
  }

  // Get Google Analytics setup instructions
  getAnalyticsSetupInstructions(): string {
    return `
To set up Google Analytics:

1. Go to https://analytics.google.com/
2. Create a new property for your website
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Copy the Measurement ID to the trackingId field
5. Use the same ID for measurementId field
6. Optionally, add your Property ID and API Key for advanced features

Note: Make sure to use GA4 (Google Analytics 4) format, not the older Universal Analytics format.
    `.trim();
  }
}

// Export singleton instance
export const settingsService = new SettingsService();
