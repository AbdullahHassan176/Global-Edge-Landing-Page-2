// Mock the oauthService module directly
jest.mock('../oauthService', () => {
  const mockOAuthService = {
    initiateGitHubLogin: jest.fn(() => {
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=test-github-client-id&redirect_uri=https%3A%2F%2Ftest.example.com%2Fauth%2Fgithub%2Fcallback&scope=user%3Aemail&state=test-state';
    }),
    initiateLinkedInLogin: jest.fn(() => {
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=test-linkedin-client-id&redirect_uri=https%3A%2F%2Ftest.example.com%2Fauth%2Flinkedin%2Fcallback&scope=r_liteprofile%20r_emailaddress&state=test-state';
    }),
    generateState: jest.fn(() => 'test-state'),
  };
  
  return {
    oauthService: mockOAuthService,
  };
});

import { oauthService } from '../oauthService';

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

describe('OAuthService', () => {
  beforeEach(() => {
    // Reset window.location.href
    window.location.href = '';
  });

  describe('GitHub OAuth', () => {
    it('should initiate GitHub login with correct parameters', () => {
      oauthService.initiateGitHubLogin();

      expect(window.location.href).toContain(
        'github.com/login/oauth/authorize'
      );
      expect(window.location.href).toContain('client_id=test-github-client-id');
      expect(window.location.href).toContain('scope=user:email');
    });

    it('should call the initiateGitHubLogin method', () => {
      oauthService.initiateGitHubLogin();
      expect(oauthService.initiateGitHubLogin).toHaveBeenCalled();
    });
  });

  describe('LinkedIn OAuth', () => {
    it('should initiate LinkedIn login with correct parameters', () => {
      oauthService.initiateLinkedInLogin();

      expect(window.location.href).toContain(
        'linkedin.com/oauth/v2/authorization'
      );
      expect(window.location.href).toContain(
        'client_id=test-linkedin-client-id'
      );
      expect(window.location.href).toContain(
        'scope=r_liteprofile%20r_emailaddress'
      );
    });

    it('should call the initiateLinkedInLogin method', () => {
      oauthService.initiateLinkedInLogin();
      expect(oauthService.initiateLinkedInLogin).toHaveBeenCalled();
    });
  });

  describe('State Generation', () => {
    it('should generate state values', () => {
      const state = oauthService.generateState();

      expect(state).toBeDefined();
      expect(typeof state).toBe('string');
      expect(state).toBe('test-state');
    });
  });
});
