# API Keys Setup Guide

This document provides instructions for setting up the required API keys and environment variables for the Global Edge platform.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Email Delivery (SendGrid)
```bash
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=Global Edge
```

### Stripe Payment Processing
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

### Azure Blob Storage
```bash
AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string_here
AZURE_STORAGE_ACCOUNT_NAME=your_azure_account_name_here
AZURE_STORAGE_ACCOUNT_KEY=your_azure_account_key_here
AZURE_STORAGE_CONTAINER_NAME=global-edge-uploads
```

### OAuth Providers

#### GitHub OAuth
```bash
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

#### LinkedIn OAuth
```bash
LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
```

### Application URLs
```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_DOMAIN=yourdomain.com
```

## API Key Sources

### SendGrid
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Go to Settings → API Keys
3. Create a new API key with "Full Access" permissions
4. Copy the API key to your environment variables

### Stripe
1. Sign up at [Stripe](https://stripe.com/)
2. Go to Developers → API Keys
3. Copy the Publishable key and Secret key
4. For webhooks, go to Developers → Webhooks and create an endpoint

### Azure Blob Storage
1. Create an Azure Storage Account
2. Go to Access Keys in the storage account
3. Copy the Connection string, Account name, and Account key
4. Create a container named "global-edge-uploads"

### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `https://yourdomain.com/auth/github/callback`
4. Copy the Client ID and Client Secret

### LinkedIn OAuth
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add OAuth 2.0 redirect URL: `https://yourdomain.com/auth/linkedin/callback`
4. Copy the Client ID and Client Secret

## Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Use different keys for development and production
- Monitor API usage and set up alerts for unusual activity

## Development vs Production

For development, you can use test/sandbox versions of these services:
- SendGrid: Use the sandbox mode
- Stripe: Use test keys (pk_test_* and sk_test_*)
- Azure: Use a separate development storage account
- OAuth: Use development callback URLs

## Troubleshooting

If you encounter issues:
1. Verify all environment variables are set correctly
2. Check that API keys have the correct permissions
3. Ensure callback URLs match exactly
4. Check service-specific documentation for additional setup requirements
