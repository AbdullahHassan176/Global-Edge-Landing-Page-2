/**
 * OAuth Service for GitHub and LinkedIn authentication
 * Handles OAuth login flows for the platform
 */

import { API_KEYS } from '@/lib/config/apiKeys';

export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'github' | 'linkedin';
}

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
}

class OAuthService {
  private githubConfig: OAuthConfig;
  private linkedinConfig: OAuthConfig;

  constructor() {
    this.githubConfig = {
      clientId: API_KEYS.GITHUB.CLIENT_ID,
      clientSecret: API_KEYS.GITHUB.CLIENT_SECRET,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${API_KEYS.GITHUB.REDIRECT_URI}`,
      scope: ['user:email', 'read:user'],
    };

    this.linkedinConfig = {
      clientId: API_KEYS.LINKEDIN.CLIENT_ID,
      clientSecret: API_KEYS.LINKEDIN.CLIENT_SECRET,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${API_KEYS.LINKEDIN.REDIRECT_URI}`,
      scope: ['r_liteprofile', 'r_emailaddress'],
    };
  }

  /**
   * Get GitHub OAuth URL
   */
  getGitHubAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.githubConfig.clientId,
      redirect_uri: this.githubConfig.redirectUri,
      scope: this.githubConfig.scope.join(' '),
      state: this.generateState(),
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  /**
   * Get LinkedIn OAuth URL
   */
  getLinkedInAuthUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.linkedinConfig.clientId,
      redirect_uri: this.linkedinConfig.redirectUri,
      scope: this.linkedinConfig.scope.join(' '),
      state: this.generateState(),
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  /**
   * Exchange GitHub authorization code for access token
   */
  async exchangeGitHubCode(code: string): Promise<{ success: boolean; accessToken?: string; error?: string }> {
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.githubConfig.clientId,
          client_secret: this.githubConfig.clientSecret,
          code,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, accessToken: data.access_token };
      } else {
        return { success: false, error: 'Failed to exchange authorization code' };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Exchange LinkedIn authorization code for access token
   */
  async exchangeLinkedInCode(code: string): Promise<{ success: boolean; accessToken?: string; error?: string }> {
    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.linkedinConfig.redirectUri,
          client_id: this.linkedinConfig.clientId,
          client_secret: this.linkedinConfig.clientSecret,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, accessToken: data.access_token };
      } else {
        return { success: false, error: 'Failed to exchange authorization code' };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get GitHub user information
   */
  async getGitHubUser(accessToken: string): Promise<{ success: boolean; user?: OAuthUser; error?: string }> {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Get user email if not public
        let email = data.email;
        if (!email) {
          const emailResponse = await fetch('https://api.github.com/user/emails', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          });
          
          if (emailResponse.ok) {
            const emails = await emailResponse.json();
            const primaryEmail = emails.find((e: any) => e.primary);
            email = primaryEmail?.email || emails[0]?.email;
          }
        }

        return {
          success: true,
          user: {
            id: data.id.toString(),
            email: email || '',
            name: data.name || data.login,
            avatar: data.avatar_url,
            provider: 'github',
          },
        };
      } else {
        return { success: false, error: 'Failed to get GitHub user information' };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get LinkedIn user information
   */
  async getLinkedInUser(accessToken: string): Promise<{ success: boolean; user?: OAuthUser; error?: string }> {
    try {
      const response = await fetch('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Get user email
        const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        let email = '';
        if (emailResponse.ok) {
          const emailData = await emailResponse.json();
          email = emailData.elements?.[0]?.['handle~']?.emailAddress || '';
        }

        return {
          success: true,
          user: {
            id: data.id,
            email,
            name: `${data.firstName?.localized?.en_US || ''} ${data.lastName?.localized?.en_US || ''}`.trim(),
            avatar: data.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier,
            provider: 'linkedin',
          },
        };
      } else {
        return { success: false, error: 'Failed to get LinkedIn user information' };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Generate random state for OAuth security
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  /**
   * Validate OAuth configuration
   */
  validateConfig(): { isValid: boolean; missing: string[] } {
    const missing: string[] = [];

    if (!this.githubConfig.clientId) missing.push('GITHUB_CLIENT_ID');
    if (!this.githubConfig.clientSecret) missing.push('GITHUB_CLIENT_SECRET');
    if (!this.linkedinConfig.clientId) missing.push('LINKEDIN_CLIENT_ID');
    if (!this.linkedinConfig.clientSecret) missing.push('LINKEDIN_CLIENT_SECRET');

    return {
      isValid: missing.length === 0,
      missing,
    };
  }
}

export const oauthService = new OAuthService();
