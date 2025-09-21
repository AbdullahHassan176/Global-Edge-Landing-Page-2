# OAuth Setup Guide for GitHub and LinkedIn

This guide explains how to set up OAuth authentication for GitHub and LinkedIn in the Global Edge application.

## Overview

The application now supports OAuth login through:
- **GitHub** - For developers and technical users
- **LinkedIn** - For professional networking

## Development Mode

In development mode, the application uses mock authentication for testing purposes. No actual OAuth credentials are required for local development.

## Production Setup

### 1. GitHub OAuth App Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: Global Edge
   - **Homepage URL**: `https://yourdomain.com`
   - **Authorization callback URL**: `https://yourdomain.com/auth/github/callback`
4. Copy the **Client ID** and **Client Secret**

### 2. LinkedIn OAuth App Setup

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new app
3. Fill in the application details:
   - **App name**: Global Edge
   - **LinkedIn Page**: Your company page
   - **Privacy policy URL**: `https://yourdomain.com/privacy`
   - **App logo**: Upload your logo
4. In the "Auth" tab, add redirect URLs:
   - `https://yourdomain.com/auth/linkedin/callback`
5. Request the following scopes:
   - `r_liteprofile` (Basic profile information)
   - `r_emailaddress` (Email address)
6. Copy the **Client ID** and **Client Secret**

### 3. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# OAuth Configuration
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here

# Base URL for OAuth redirects
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# JWT Secret for session management
JWT_SECRET=your_secure_jwt_secret_here
```

### 4. API Routes

The application includes the following API routes for OAuth handling:

- `POST /api/auth/github` - Handles GitHub OAuth callback
- `POST /api/auth/linkedin` - Handles LinkedIn OAuth callback

### 5. Callback Pages

The application includes callback pages for handling OAuth redirects:

- `/auth/github/callback` - GitHub OAuth callback
- `/auth/linkedin/callback` - LinkedIn OAuth callback

## Features

### OAuth Service (`src/lib/oauthService.ts`)

- **GitHub Integration**: Full OAuth flow with user profile data
- **LinkedIn Integration**: Professional profile data access
- **Mock Authentication**: Development mode with simulated responses
- **Error Handling**: Comprehensive error handling and user feedback
- **State Management**: CSRF protection with state parameters

### Login Page Enhancements

- **OAuth Buttons**: Functional GitHub and LinkedIn login buttons
- **Loading States**: Visual feedback during OAuth process
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all device sizes

### Dashboard Integration

- **User Profile**: Displays OAuth user information
- **Provider Identification**: Shows which service was used for login
- **Session Management**: Secure user session handling
- **Logout Functionality**: Clean session termination

## Security Considerations

1. **State Parameter**: CSRF protection using random state values
2. **HTTPS Only**: OAuth should only be used over HTTPS in production
3. **Token Storage**: Access tokens should be stored securely
4. **Scope Limitation**: Request only necessary OAuth scopes
5. **Error Handling**: Don't expose sensitive information in error messages

## Testing

### Development Testing

1. Start the development server: `npm run dev`
2. Navigate to `/login`
3. Click on GitHub or LinkedIn buttons
4. Mock authentication will be used automatically
5. You'll be redirected to the dashboard with mock user data

### Production Testing

1. Set up OAuth apps as described above
2. Configure environment variables
3. Deploy to a staging environment
4. Test the full OAuth flow
5. Verify user data is correctly retrieved and stored

## Troubleshooting

### Common Issues

1. **Invalid Redirect URI**: Ensure callback URLs match exactly in OAuth app settings
2. **Scope Issues**: Verify requested scopes are approved in OAuth app settings
3. **Environment Variables**: Check that all required environment variables are set
4. **HTTPS Requirements**: OAuth requires HTTPS in production

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

This will show detailed OAuth flow information in the console.

## Next Steps

1. **Database Integration**: Store user data in a persistent database
2. **Session Management**: Implement JWT or session-based authentication
3. **User Profiles**: Allow users to update their profile information
4. **Account Linking**: Allow users to link multiple OAuth providers
5. **Admin Panel**: Add OAuth user management to the admin dashboard

## Support

For issues with OAuth setup or implementation, please refer to:
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [LinkedIn OAuth Documentation](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
