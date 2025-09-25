# OAuth Setup Guide

This guide explains how to set up GitHub and LinkedIn OAuth authentication for the Global Edge platform.

## GitHub OAuth Setup

### 1. Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: `Global Edge Platform`
   - **Homepage URL**: `https://theglobaledge.io`
   - **Authorization callback URL**: `https://theglobaledge.io/auth/github/callback`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

### 2. Environment Variables

Add these to your `.env.local` file:

```bash
# GitHub OAuth
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

## LinkedIn OAuth Setup

### 1. Create a LinkedIn App

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Click "Create app"
3. Fill in the application details:
   - **App name**: `Global Edge Platform`
   - **LinkedIn Page**: Select your company page
   - **Privacy policy URL**: `https://theglobaledge.io/privacy`
   - **App logo**: Upload your app logo
4. Click "Create app"
5. Go to the "Auth" tab
6. Add redirect URL: `https://theglobaledge.io/auth/linkedin/callback`
7. Copy the **Client ID** and **Client Secret**

### 2. Environment Variables

Add these to your `.env.local` file:

```bash
# LinkedIn OAuth
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
```

## Site URL Configuration

```bash
# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://theglobaledge.io
```

## Complete Environment File Example

```bash
# OAuth Configuration
NEXT_PUBLIC_GITHUB_CLIENT_ID=Ov23liJ8QZqX8Y2Y2Y2Y
GITHUB_CLIENT_SECRET=your_github_client_secret_here
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=86abc123def456ghi789
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
NEXT_PUBLIC_SITE_URL=https://theglobaledge.io
```

## Testing OAuth

1. Start the development server: `npm run dev`
2. Go to the login page: `http://localhost:3000/login`
3. Click "GitHub" or "LinkedIn" buttons
4. You should be redirected to the respective OAuth provider
5. After authentication, you'll be redirected back to the dashboard

## Troubleshooting

### GitHub OAuth Issues

- **404 Error**: The client ID is invalid or the OAuth app doesn't exist
- **Redirect URI mismatch**: Ensure the callback URL matches exactly
- **Scope issues**: Make sure the requested scopes are approved in your GitHub app

### LinkedIn OAuth Issues

- **Invalid client**: The client ID is incorrect
- **Redirect URI mismatch**: Check that the callback URL is added in LinkedIn app settings
- **Scope permissions**: Ensure your LinkedIn app has the required permissions

## Security Notes

- Never commit client secrets to version control
- Use environment variables for all sensitive configuration
- Regularly rotate your OAuth client secrets
- Monitor OAuth usage in your provider dashboards

## Production Deployment

1. Set up OAuth apps for your production domain
2. Update environment variables in your deployment platform
3. Test OAuth flow in production environment
4. Monitor for any authentication issues

## Support

If you encounter issues with OAuth setup:

1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Ensure OAuth apps are configured with correct callback URLs
4. Contact support with specific error messages
