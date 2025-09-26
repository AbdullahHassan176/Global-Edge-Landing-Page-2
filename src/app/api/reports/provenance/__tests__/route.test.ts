import { NextRequest } from 'next/server';
import { GET } from '../route';

// Mock NextRequest
global.Request = class MockRequest {
  constructor(public url: string) {}
} as any;

// Mock @react-pdf/renderer
jest.mock('@react-pdf/renderer', () => ({
  Document: ({ children }: { children: React.ReactNode }) => children,
  Page: ({ children }: { children: React.ReactNode }) => children,
  Text: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  StyleSheet: {
    create: (styles: any) => styles,
  },
  pdf: jest.fn(() => ({
    toBuffer: jest.fn().mockResolvedValue(Buffer.from('mock-pdf-content')),
  })),
}));

describe('/api/reports/provenance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return 400 when assetKey is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/reports/provenance');
      const response = await GET(request);
      
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Asset key is required');
    });

    it('should generate PDF with valid assetKey', async () => {
      const request = new NextRequest('http://localhost:3000/api/reports/provenance?assetKey=test-asset-123');
      const response = await GET(request);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('application/pdf');
      expect(response.headers.get('Content-Disposition')).toContain('provenance-report-test-asset-123.pdf');
    });

    it('should handle PDF generation errors gracefully', async () => {
      // Mock pdf function to throw an error
      const { pdf } = require('@react-pdf/renderer');
      pdf.mockImplementationOnce(() => {
        throw new Error('PDF generation failed');
      });

      const request = new NextRequest('http://localhost:3000/api/reports/provenance?assetKey=test-asset-123');
      const response = await GET(request);
      
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBe('Failed to generate provenance report');
    });

    it('should include proper headers for PDF download', async () => {
      const request = new NextRequest('http://localhost:3000/api/reports/provenance?assetKey=test-asset-123');
      const response = await GET(request);
      
      expect(response.headers.get('Content-Type')).toBe('application/pdf');
      expect(response.headers.get('Content-Disposition')).toContain('attachment');
      expect(response.headers.get('Content-Disposition')).toContain('filename="provenance-report-test-asset-123.pdf"');
      expect(response.headers.get('Cache-Control')).toBe('no-cache');
    });
  });
});
