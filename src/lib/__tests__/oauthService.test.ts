import { OAuthService } from '../oauthService';

// Mock environment variables
const mockEnv = {
  NEXT_PUBLIC_GITHUB_CLIENT_ID: 'test-github-client-id',
  NEXT_PUBLIC_LINKEDIN_CLIENT_ID: 'test-linkedin-client-id',
  NEXT_PUBLIC_APP_URL: 'https://test.example.com',
};

// Mock process.env
Object.defineProperty(process, 'env', {
  value: mockEnv,
  writable: true,
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

describe('OAuthService', () => {
  let oauthService: OAuthService;

  beforeEach(() => {
    oauthService = new OAuthService();
    // Reset window.location.href
    window.location.href = '';
  });

  describe('GitHub OAuth', () => {
    it('should initiate GitHub login with correct parameters', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      oauthService.initiateGitHubLogin();

      expect(window.location.href).toContain('github.com/login/oauth/authorize');
      expect(window.location.href).toContain('client_id=test-github-client-id');
      expect(window.location.href).toContain('scope=user:email');

      consoleSpy.mockRestore();
    });

    it('should handle missing GitHub client ID', () => {
      const originalEnv = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID = '';

      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      oauthService.initiateGitHubLogin();

      expect(alertSpy).toHaveBeenCalledWith(
        'GitHub OAuth is not configured. Please contact support or use email/password login.'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'GitHub OAuth not configured: NEXT_PUBLIC_GITHUB_CLIENT_ID is missing'
      );

      // Restore
      process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID = originalEnv;
      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('LinkedIn OAuth', () => {
    it('should initiate LinkedIn login with correct parameters', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      oauthService.initiateLinkedInLogin();

      expect(window.location.href).toContain('linkedin.com/oauth/v2/authorization');
      expect(window.location.href).toContain('client_id=test-linkedin-client-id');
      expect(window.location.href).toContain('scope=r_liteprofile%20r_emailaddress');

      consoleSpy.mockRestore();
    });

    it('should handle missing LinkedIn client ID', () => {
      const originalEnv = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
      process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID = '';

      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      oauthService.initiateLinkedInLogin();

      expect(alertSpy).toHaveBeenCalledWith(
        'LinkedIn OAuth is not configured. Please contact support or use email/password login.'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'LinkedIn OAuth not configured: NEXT_PUBLIC_LINKEDIN_CLIENT_ID is missing'
      );

      // Restore
      process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID = originalEnv;
      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('State Generation', () => {
    it('should generate unique state values', () => {
      const state1 = (oauthService as any).generateState();
      const state2 = (oauthService as any).generateState();

      expect(state1).toBeDefined();
      expect(state2).toBeDefined();
      expect(state1).not.toBe(state2);
      expect(typeof state1).toBe('string');
      expect(state1.length).toBeGreaterThan(0);
    });
  });
});
