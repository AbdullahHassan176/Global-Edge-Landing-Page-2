# OAuth Setup Instructions

## GitHub OAuth Setup

### 1. Create GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `Global Edge Landing Page`
   - **Homepage URL**: `https://theglobaledge.io`
   - **Authorization callback URL**: `https://theglobaledge.io/auth/github/callback`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret**

### 2. Set Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
NEXT_PUBLIC_SITE_URL=https://theglobaledge.io
```

## LinkedIn OAuth Setup

### 1. Create LinkedIn App
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Click "Create app"
3. Fill in the details:
   - **App name**: `Global Edge Landing Page`
   - **LinkedIn Page**: Select your company page
   - **Privacy policy URL**: `https://theglobaledge.io/privacy`
   - **App logo**: Upload your logo
4. Click "Create app"

### 2. Configure OAuth 2.0
1. In your app settings, go to "Auth" tab
2. Add redirect URL: `https://theglobaledge.io/auth/linkedin/callback`
3. Request the following scopes:
   - `r_liteprofile` (Basic profile information)
   - `r_emailaddress` (Email address)
4. Copy the **Client ID** and **Client Secret**

### 3. Update Environment Variables
Add to your `.env.local` file:

```env
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
```

## Testing OAuth

### GitHub OAuth Test
1. Visit: `https://theglobaledge.io/login`
2. Click "Continue with GitHub"
3. You should be redirected to GitHub authorization page
4. After authorization, you'll be redirected back to the dashboard

### LinkedIn OAuth Test
1. Visit: `https://theglobaledge.io/login`
2. Click "Continue with LinkedIn"
3. You should be redirected to LinkedIn authorization page
4. After authorization, you'll be redirected back to the dashboard

## Troubleshooting

### Common Issues:
1. **"OAuth is not configured"** - Check environment variables
2. **"Invalid client_id"** - Verify client ID is correct
3. **"Redirect URI mismatch"** - Ensure callback URLs match exactly
4. **"Scope not authorized"** - Check requested scopes in app settings

### Debug Steps:
1. Check browser console for OAuth URLs
2. Verify environment variables are loaded
3. Test OAuth URLs manually
4. Check callback page functionality

## Production Deployment

### Environment Variables for Production:
```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_production_github_client_id
GITHUB_CLIENT_SECRET=your_production_github_client_secret
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_production_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_production_linkedin_client_secret
NEXT_PUBLIC_SITE_URL=https://theglobaledge.io
```

### Security Notes:
- Never commit `.env.local` to version control
- Use different OAuth apps for development and production
- Regularly rotate client secrets
- Monitor OAuth usage and errors
