'use client';

interface SavedLoginCredentials {
  username?: string;
  email?: string;
  rememberMe: boolean;
  lastLogin: string;
  loginType: 'user' | 'admin';
}

class LoginStorageService {
  private readonly STORAGE_KEY = 'saved_login_credentials';
  private readonly ENCRYPTION_KEY = 'global_edge_login_2025'; // In production, use environment variable

  /**
   * Save login credentials securely
   */
  saveCredentials(credentials: Omit<SavedLoginCredentials, 'lastLogin' | 'loginType'> & { loginType: 'user' | 'admin' }): void {
    try {
      const savedCredentials: SavedLoginCredentials = {
        ...credentials,
        lastLogin: new Date().toISOString(),
      };

      // Simple obfuscation (in production, use proper encryption)
      const obfuscated = this.obfuscate(JSON.stringify(savedCredentials));
      localStorage.setItem(this.STORAGE_KEY, obfuscated);
    } catch (error) {
      console.warn('Failed to save login credentials:', error);
    }
  }

  /**
   * Get saved login credentials
   */
  getSavedCredentials(): SavedLoginCredentials | null {
    try {
      const obfuscated = localStorage.getItem(this.STORAGE_KEY);
      if (!obfuscated) return null;

      const decrypted = this.deobfuscate(obfuscated);
      const credentials = JSON.parse(decrypted) as SavedLoginCredentials;
      
      // Check if credentials are not too old (30 days)
      const lastLogin = new Date(credentials.lastLogin);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      if (lastLogin < thirtyDaysAgo) {
        this.clearSavedCredentials();
        return null;
      }

      return credentials;
    } catch (error) {
      console.warn('Failed to retrieve saved credentials:', error);
      this.clearSavedCredentials();
      return null;
    }
  }

  /**
   * Clear saved credentials
   */
  clearSavedCredentials(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear saved credentials:', error);
    }
  }

  /**
   * Check if credentials are saved for a specific login type
   */
  hasSavedCredentials(loginType: 'user' | 'admin'): boolean {
    const credentials = this.getSavedCredentials();
    return credentials !== null && credentials.loginType === loginType && credentials.rememberMe;
  }

  /**
   * Simple obfuscation (not secure, just to prevent casual inspection)
   * In production, use proper encryption libraries
   */
  private obfuscate(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      const keyChar = this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length);
      result += String.fromCharCode(char ^ keyChar);
    }
    return btoa(result);
  }

  /**
   * Simple deobfuscation
   */
  private deobfuscate(obfuscated: string): string {
    try {
      const text = atob(obfuscated);
      let result = '';
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        const keyChar = this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length);
        result += String.fromCharCode(char ^ keyChar);
      }
      return result;
    } catch (error) {
      throw new Error('Failed to deobfuscate credentials');
    }
  }

  /**
   * Get auto-fill data for login forms
   */
  getAutoFillData(loginType: 'user' | 'admin'): { username?: string; email?: string } | null {
    const credentials = this.getSavedCredentials();
    if (credentials && credentials.loginType === loginType && credentials.rememberMe) {
      return {
        username: credentials.username,
        email: credentials.email,
      };
    }
    return null;
  }
}

// Export singleton instance
export const loginStorageService = new LoginStorageService();
