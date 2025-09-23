/**
 * API Keys Configuration
 * Centralized configuration for all external service API keys
 */

export const API_KEYS = {
  // Email Delivery (SendGrid)
  SENDGRID: {
    API_KEY: process.env.SENDGRID_API_KEY || '',
    FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL || 'noreply@globalnext.rocks',
    FROM_NAME: process.env.SENDGRID_FROM_NAME || 'Global Edge'
  },

  // Stripe Payment Processing
  STRIPE: {
    PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
    WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || ''
  },

  // Azure Blob Storage
  AZURE: {
    CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING || '',
    ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME || '',
    ACCOUNT_KEY: process.env.AZURE_STORAGE_ACCOUNT_KEY || '',
    CONTAINER_NAME: process.env.AZURE_STORAGE_CONTAINER_NAME || 'global-edge-uploads'
  },

  // OAuth Providers
  GITHUB: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
    REDIRECT_URI: '/auth/github/callback'
  },

  LINKEDIN: {
    CLIENT_ID: process.env.LINKEDIN_CLIENT_ID || '',
    CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET || '',
    REDIRECT_URI: '/auth/linkedin/callback'
  }
} as const;

// Environment-specific configurations
export const getApiKey = (service: keyof typeof API_KEYS, key: string) => {
  // In production, these should come from environment variables
  // For now, using the provided keys directly
  return API_KEYS[service][key as keyof typeof API_KEYS[typeof service]];
};

// Validation function to check if all required keys are present
export const validateApiKeys = () => {
  const missing: string[] = [];
  
  if (!API_KEYS.SENDGRID.API_KEY) missing.push('SENDGRID_API_KEY');
  if (!API_KEYS.STRIPE.PUBLISHABLE_KEY) missing.push('STRIPE_PUBLISHABLE_KEY');
  if (!API_KEYS.STRIPE.SECRET_KEY) missing.push('STRIPE_SECRET_KEY');
  
  return {
    isValid: missing.length === 0,
    missing
  };
};
