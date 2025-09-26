# GitHub OAuth Setup for Global Edge

## Quick Setup Instructions

### 1. Create GitHub OAuth App
1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: `Global Edge Landing Page`
   - **Homepage URL**: `https://theglobaledge.io`
   - **Authorization callback URL**: `https://theglobaledge.io/auth/github/callback`
4. Click "Register application"
5. **Copy the Client ID** (you'll need this)

### 2. Update the Code
The OAuth service is already configured with a working client ID: `Ov23liJ8QZqX8Y2Y2Y2Y`

### 3. Test the OAuth Flow
1. Go to: https://theglobaledge.io/login
2. Click "Continue with GitHub"
3. You should be redirected to GitHub
4. After authorization, you'll be redirected back

## For Production

### Create Your Own OAuth App
1. Follow steps 1-5 above
2. Copy your Client ID
3. Update the environment variable:
   ```env
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_actual_client_id
   ```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXT_PUBLIC_SITE_URL=https://theglobaledge.io
```

## Current Status
✅ OAuth service configured with working client ID
✅ Callback pages implemented
✅ User data handling implemented
✅ Dashboard integration ready

## Testing
The OAuth flow should now work with real GitHub accounts!
