import { computeFileHash, compareHashes, shortenHash, formatHash } from './hash';

// Mock crypto.subtle for testing
const mockCrypto = {
  subtle: {
    digest: jest.fn()
  }
};

// Mock global crypto
Object.defineProperty(global, 'crypto', {
  value: mockCrypto,
  writable: true
});

// Mock File API
global.File = class MockFile {
  constructor(public content: any[], public name: string, public options: any) {}
  
  async arrayBuffer(): Promise<ArrayBuffer> {
    const content = this.content.join('');
    // Create a simple ArrayBuffer from string
    const buffer = new ArrayBuffer(content.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < content.length; i++) {
      view[i] = content.charCodeAt(i);
    }
    return buffer;
  }
} as any;

describe('Hash utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('computeFileHash', () => {
    it('should compute SHA-256 hash of a file', async () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const mockHashBuffer = new Uint8Array([0x9f, 0x86, 0xd0, 0x81, 0x88, 0x4c, 0x7d, 0x65, 0x9a, 0x2f, 0xea, 0xa0, 0xc5, 0x5a, 0xd0, 0x15, 0xa3, 0xbf, 0x4f, 0x1b, 0x2b, 0x0b, 0x82, 0x2c, 0xd1, 0x5d, 0x6c, 0x15, 0xb0, 0xf0, 0x0a, 0x08]);
      
      mockCrypto.subtle.digest.mockResolvedValue(mockHashBuffer);
      
      const result = await computeFileHash(mockFile);
      
      expect(mockCrypto.subtle.digest).toHaveBeenCalledWith('SHA-256', expect.any(ArrayBuffer));
      expect(result).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
    });

    it('should handle empty file', async () => {
      const mockFile = new File([], 'empty.txt', { type: 'text/plain' });
      const mockHashBuffer = new Uint8Array([0xe3, 0xb0, 0xc4, 0x42, 0x98, 0xfc, 0x1c, 0x14, 0x9a, 0xfb, 0xf4, 0xc8, 0x99, 0x6f, 0xb9, 0x24, 0x27, 0xae, 0x41, 0xe4, 0x64, 0x9b, 0x93, 0x4c, 0xa4, 0x95, 0x99, 0x1b, 0x78, 0x52, 0xb8, 0x55]);
      
      mockCrypto.subtle.digest.mockResolvedValue(mockHashBuffer);
      
      const result = await computeFileHash(mockFile);
      
      expect(result).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    });
  });

  describe('compareHashes', () => {
    it('should compare hashes case-insensitively', () => {
      expect(compareHashes('abc123', 'ABC123')).toBe(true);
      expect(compareHashes('abc123', 'abc123')).toBe(true);
      expect(compareHashes('abc123', 'def456')).toBe(false);
    });

    it('should handle empty hashes', () => {
      expect(compareHashes('', '')).toBe(true);
      expect(compareHashes('abc', '')).toBe(false);
      expect(compareHashes('', 'abc')).toBe(false);
    });
  });

  describe('shortenHash', () => {
    it('should shorten long hashes', () => {
      const longHash = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
      const result = shortenHash(longHash);
      expect(result).toBe('9f86d081...0a08');
    });

    it('should return short hashes unchanged', () => {
      const shortHash = 'abc123';
      const result = shortenHash(shortHash);
      expect(result).toBe('abc123');
    });

    it('should handle empty hash', () => {
      const result = shortenHash('');
      expect(result).toBe('');
    });
  });

  describe('formatHash', () => {
    it('should format hash to lowercase', () => {
      expect(formatHash('ABC123')).toBe('abc123');
      expect(formatHash('abc123')).toBe('abc123');
      expect(formatHash('AbC123')).toBe('abc123');
    });

    it('should handle empty hash', () => {
      expect(formatHash('')).toBe('');
    });
  });
});
