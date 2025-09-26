// OAuth Service for GitHub and LinkedIn authentication
export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'github' | 'linkedin';
}

export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

class OAuthService {
  private githubConfig: OAuthConfig = {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'Ov23liJ8QZqX8Y2Y2Y2Y',
    redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theglobaledge.io'}/auth/github/callback`,
    scope: 'user:email'
  };

  private linkedinConfig: OAuthConfig = {
    clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || '86abc123def456ghi789',
    redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theglobaledge.io'}/auth/linkedin/callback`,
    scope: 'r_liteprofile r_emailaddress'
  };

  // GitHub OAuth
  initiateGitHubLogin() {
    console.log('Initiating GitHub OAuth with client ID:', this.githubConfig.clientId);
    
    const params = new URLSearchParams({
      client_id: this.githubConfig.clientId,
      redirect_uri: this.githubConfig.redirectUri,
      scope: this.githubConfig.scope,
      state: this.generateState()
    });

    const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    console.log('GitHub OAuth URL:', githubAuthUrl);
    window.location.href = githubAuthUrl;
  }


  // LinkedIn OAuth
  initiateLinkedInLogin() {
    console.log('Initiating LinkedIn OAuth with client ID:', this.linkedinConfig.clientId);
    
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.linkedinConfig.clientId,
      redirect_uri: this.linkedinConfig.redirectUri,
      scope: this.linkedinConfig.scope,
      state: this.generateState()
    });

    const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
    console.log('LinkedIn OAuth URL:', linkedinAuthUrl);
    window.location.href = linkedinAuthUrl;
  }


  // Generate random state for CSRF protection
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Handle GitHub callback
  async handleGitHubCallback(code: string): Promise<OAuthUser> {
    try {
      // In a real application, you would exchange the code for an access token
      // and then fetch user data from GitHub's API
      const response = await fetch('/api/auth/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error('GitHub authentication failed');
      }

      const userData = await response.json();
      return {
        id: userData.id.toString(),
        email: userData.email,
        name: userData.name || userData.login,
        avatar: userData.avatar_url,
        provider: 'github'
      };
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      throw error;
    }
  }

  // Handle LinkedIn callback
  async handleLinkedInCallback(code: string): Promise<OAuthUser> {
    try {
      // In a real application, you would exchange the code for an access token
      // and then fetch user data from LinkedIn's API
      const response = await fetch('/api/auth/linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error('LinkedIn authentication failed');
      }

      const userData = await response.json();
      return {
        id: userData.id,
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        avatar: userData.profilePicture,
        provider: 'linkedin'
      };
    } catch (error) {
      console.error('LinkedIn OAuth error:', error);
      throw error;
    }
  }

  // Mock authentication for development
  async mockGitHubAuth(): Promise<OAuthUser> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: '12345',
      email: 'john.doe@github-demo.com',
      name: 'John Doe',
      avatar: 'https://avatars.githubusercontent.com/u/12345?v=4',
      provider: 'github'
    };
  }

  async mockLinkedInAuth(): Promise<OAuthUser> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: '67890',
      email: 'jane.smith@linkedin-demo.com',
      name: 'Jane Smith',
      avatar: 'https://media.licdn.com/dms/image/C4D03AQHxK8Y2X8Y2Y2/profile-displayphoto-shrink_400_400/0/1234567890',
      provider: 'linkedin'
    };
  }
}

export const oauthService = new OAuthService();
