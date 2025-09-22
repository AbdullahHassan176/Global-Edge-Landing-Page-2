/**
 * Centralized Configuration Service
 * 
 * This service manages all configurable values across the application,
 * replacing hardcoded data with environment-based configuration.
 */

export interface AppConfig {
  // Site Information
  site: {
    name: string;
    description: string;
    url: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };

  // Contact Information
  contact: {
    support: {
      email: string;
      phone: string;
      address: string;
    };
    sales: {
      email: string;
      phone: string;
    };
    legal: {
      email: string;
      phone: string;
      address: string;
    };
    privacy: {
      email: string;
      phone: string;
      address: string;
    };
    technical: {
      email: string;
      phone: string;
      twitter: string;
    };
  };

  // Business Information
  business: {
    companyName: string;
    registrationNumber: string;
    taxId: string;
    jurisdiction: string;
    headquarters: string;
    foundedYear: number;
  };

  // API Configuration
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
    endpoints: {
      auth: string;
      users: string;
      assets: string;
      investments: string;
      notifications: string;
    };
  };

  // OAuth Configuration
  oauth: {
    github: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scope: string;
    };
    linkedin: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scope: string;
    };
  };

  // Integration Configuration
  integrations: {
    email: {
      provider: 'sendgrid' | 'mailgun' | 'ses';
      apiKey: string;
      fromEmail: string;
      fromName: string;
    };
    payment: {
      provider: 'stripe' | 'paypal' | 'square';
      publishableKey: string;
      secretKey: string;
      webhookSecret: string;
    };
    analytics: {
      provider: 'google' | 'mixpanel' | 'amplitude';
      trackingId: string;
      apiKey: string;
    };
    notifications: {
      slack: {
        webhookUrl: string;
        channel: string;
        username: string;
      };
      discord: {
        webhookUrl: string;
        channel: string;
        username: string;
      };
    };
  };

  // Security Configuration
  security: {
    jwtSecret: string;
    sessionTimeout: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
    encryption: {
      algorithm: string;
      keyLength: number;
    };
  };

  // Feature Flags
  features: {
    oauth: boolean;
    adminPanel: boolean;
    issuerPortal: boolean;
    investorPortal: boolean;
    kyc: boolean;
    notifications: boolean;
    analytics: boolean;
    reports: boolean;
    maintenanceMode: boolean;
  };

  // Default Values
  defaults: {
    currency: string;
    language: string;
    timezone: string;
    dateFormat: string;
    numberFormat: string;
    pagination: {
      pageSize: number;
      maxPageSize: number;
    };
  };

  // Mock Data Configuration
  mockData: {
    enabled: boolean;
    userCount: number;
    assetCount: number;
    investmentCount: number;
    notificationCount: number;
  };
}

class ConfigService {
  private config: AppConfig;

  constructor() {
    this.config = this.loadConfiguration();
  }

  private loadConfiguration(): AppConfig {
    // Load from environment variables with fallbacks
    return {
      site: {
        name: process.env.NEXT_PUBLIC_SITE_NAME || 'Global Edge',
        description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Tokenized Asset Investment Platform',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://globaledge.com',
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        environment: (process.env.NODE_ENV as any) || 'development'
      },

      contact: {
        support: {
          email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'info@globalnext.rocks',
          phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+1 (555) 123-4567',
          address: process.env.NEXT_PUBLIC_SUPPORT_ADDRESS || 'P20, S13, Al Warsan, Dubai, UAE'
        },
        sales: {
          email: process.env.NEXT_PUBLIC_SALES_EMAIL || 'info@globalnext.rocks',
          phone: process.env.NEXT_PUBLIC_SALES_PHONE || '+1 (555) 123-4567'
        },
        legal: {
          email: process.env.NEXT_PUBLIC_LEGAL_EMAIL || 'legal@globaledge.com',
          phone: process.env.NEXT_PUBLIC_LEGAL_PHONE || '+1 (555) 123-4567',
          address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || '123 Financial District, New York, NY 10004'
        },
        privacy: {
          email: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || 'privacy@globaledge.com',
          phone: process.env.NEXT_PUBLIC_PRIVACY_PHONE || '+1 (555) 123-4567',
          address: process.env.NEXT_PUBLIC_PRIVACY_ADDRESS || '123 Financial District, New York, NY 10004'
        },
        technical: {
          email: process.env.NEXT_PUBLIC_TECH_EMAIL || 'info@globalnext.rocks',
          phone: process.env.NEXT_PUBLIC_TECH_PHONE || '+1 (555) 123-4567',
          twitter: process.env.NEXT_PUBLIC_TECH_TWITTER || '@GlobalEdgeStatus'
        }
      },

      business: {
        companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Global Edge',
        registrationNumber: process.env.NEXT_PUBLIC_REGISTRATION_NUMBER || 'REG-2024-001',
        taxId: process.env.NEXT_PUBLIC_TAX_ID || 'TAX-2024-001',
        jurisdiction: process.env.NEXT_PUBLIC_JURISDICTION || 'Dubai, UAE',
        headquarters: process.env.NEXT_PUBLIC_HEADQUARTERS || 'Dubai, UAE',
        foundedYear: parseInt(process.env.NEXT_PUBLIC_FOUNDED_YEAR || '2024')
      },

      api: {
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.globaledge.com',
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
        retryAttempts: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || '3'),
        endpoints: {
          auth: process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT || '/auth',
          users: process.env.NEXT_PUBLIC_API_USERS_ENDPOINT || '/users',
          assets: process.env.NEXT_PUBLIC_API_ASSETS_ENDPOINT || '/assets',
          investments: process.env.NEXT_PUBLIC_API_INVESTMENTS_ENDPOINT || '/investments',
          notifications: process.env.NEXT_PUBLIC_API_NOTIFICATIONS_ENDPOINT || '/notifications'
        }
      },

      oauth: {
        github: {
          clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
          clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
          redirectUri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || '/auth/github/callback',
          scope: process.env.NEXT_PUBLIC_GITHUB_SCOPE || 'user:email'
        },
        linkedin: {
          clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || '',
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
          redirectUri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || '/auth/linkedin/callback',
          scope: process.env.NEXT_PUBLIC_LINKEDIN_SCOPE || 'r_liteprofile r_emailaddress'
        }
      },

      integrations: {
        email: {
          provider: (process.env.EMAIL_PROVIDER as any) || 'sendgrid',
          apiKey: process.env.EMAIL_API_KEY || '',
          fromEmail: process.env.EMAIL_FROM_EMAIL || 'noreply@globaledge.com',
          fromName: process.env.EMAIL_FROM_NAME || 'Global Edge'
        },
        payment: {
          provider: (process.env.PAYMENT_PROVIDER as any) || 'stripe',
          publishableKey: process.env.NEXT_PUBLIC_PAYMENT_PUBLISHABLE_KEY || '',
          secretKey: process.env.PAYMENT_SECRET_KEY || '',
          webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET || ''
        },
        analytics: {
          provider: (process.env.ANALYTICS_PROVIDER as any) || 'google',
          trackingId: process.env.NEXT_PUBLIC_ANALYTICS_TRACKING_ID || '',
          apiKey: process.env.ANALYTICS_API_KEY || ''
        },
        notifications: {
          slack: {
            webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
            channel: process.env.SLACK_CHANNEL || '#admin-alerts',
            username: process.env.SLACK_USERNAME || 'Global Edge Bot'
          },
          discord: {
            webhookUrl: process.env.DISCORD_WEBHOOK_URL || '',
            channel: process.env.DISCORD_CHANNEL || '#admin-alerts',
            username: process.env.DISCORD_USERNAME || 'Global Edge Bot'
          }
        }
      },

      security: {
        jwtSecret: process.env.JWT_SECRET || 'your-secure-jwt-secret-here',
        sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '28800000'), // 8 hours
        passwordPolicy: {
          minLength: parseInt(process.env.PASSWORD_MIN_LENGTH || '8'),
          requireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE === 'true',
          requireLowercase: process.env.PASSWORD_REQUIRE_LOWERCASE === 'true',
          requireNumbers: process.env.PASSWORD_REQUIRE_NUMBERS === 'true',
          requireSpecialChars: process.env.PASSWORD_REQUIRE_SPECIAL_CHARS === 'true'
        },
        encryption: {
          algorithm: process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm',
          keyLength: parseInt(process.env.ENCRYPTION_KEY_LENGTH || '32')
        }
      },

      features: {
        oauth: process.env.NEXT_PUBLIC_FEATURE_OAUTH === 'true',
        adminPanel: process.env.NEXT_PUBLIC_FEATURE_ADMIN_PANEL === 'true',
        issuerPortal: process.env.NEXT_PUBLIC_FEATURE_ISSUER_PORTAL === 'true',
        investorPortal: process.env.NEXT_PUBLIC_FEATURE_INVESTOR_PORTAL === 'true',
        kyc: process.env.NEXT_PUBLIC_FEATURE_KYC === 'true',
        notifications: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS === 'true',
        analytics: process.env.NEXT_PUBLIC_FEATURE_ANALYTICS === 'true',
        reports: process.env.NEXT_PUBLIC_FEATURE_REPORTS === 'true',
        maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'
      },

      defaults: {
        currency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'USD',
        language: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en',
        timezone: process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE || 'UTC',
        dateFormat: process.env.NEXT_PUBLIC_DATE_FORMAT || 'MM/DD/YYYY',
        numberFormat: process.env.NEXT_PUBLIC_NUMBER_FORMAT || 'en-US',
        pagination: {
          pageSize: parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE || '10'),
          maxPageSize: parseInt(process.env.NEXT_PUBLIC_MAX_PAGE_SIZE || '100')
        }
      },

      mockData: {
        enabled: process.env.NEXT_PUBLIC_MOCK_DATA_ENABLED === 'true',
        userCount: parseInt(process.env.NEXT_PUBLIC_MOCK_USER_COUNT || '10'),
        assetCount: parseInt(process.env.NEXT_PUBLIC_MOCK_ASSET_COUNT || '20'),
        investmentCount: parseInt(process.env.NEXT_PUBLIC_MOCK_INVESTMENT_COUNT || '50'),
        notificationCount: parseInt(process.env.NEXT_PUBLIC_MOCK_NOTIFICATION_COUNT || '25')
      }
    };
  }

  // Get configuration
  getConfig(): AppConfig {
    return this.config;
  }

  // Get specific configuration section
  getSiteConfig() {
    return this.config.site;
  }

  getContactConfig() {
    return this.config.contact;
  }

  getBusinessConfig() {
    return this.config.business;
  }

  getApiConfig() {
    return this.config.api;
  }

  getOAuthConfig() {
    return this.config.oauth;
  }

  getIntegrationsConfig() {
    return this.config.integrations;
  }

  getSecurityConfig() {
    return this.config.security;
  }

  getFeaturesConfig() {
    return this.config.features;
  }

  getDefaultsConfig() {
    return this.config.defaults;
  }

  getMockDataConfig() {
    return this.config.mockData;
  }

  // Check if feature is enabled
  isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
    return this.config.features[feature];
  }

  // Get environment
  getEnvironment(): string {
    return this.config.site.environment;
  }

  // Check if in development mode
  isDevelopment(): boolean {
    return this.config.site.environment === 'development';
  }

  // Check if in production mode
  isProduction(): boolean {
    return this.config.site.environment === 'production';
  }

  // Get full API URL
  getApiUrl(endpoint: keyof AppConfig['api']['endpoints']): string {
    return `${this.config.api.baseUrl}${this.config.api.endpoints[endpoint]}`;
  }

  // Get OAuth redirect URL
  getOAuthRedirectUrl(provider: 'github' | 'linkedin'): string {
    const baseUrl = this.config.site.url;
    const redirectUri = this.config.oauth[provider].redirectUri;
    return `${baseUrl}${redirectUri}`;
  }

  // Update configuration (for runtime updates)
  updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Reset to default configuration
  resetConfig(): void {
    this.config = this.loadConfiguration();
  }
}

// Export singleton instance
export const configService = new ConfigService();

// Export types for use in other files
export type { AppConfig };
