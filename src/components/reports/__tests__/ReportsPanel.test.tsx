import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReportsPanel } from '../ReportsPanel';

// Mock fetch
global.fetch = jest.fn();

// Mock Icon component
jest.mock('@/components/ui/Icon', () => ({
  __esModule: true,
  default: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid={`icon-${name}`} className={className} />
  ),
}));

describe('ReportsPanel', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders with asset information', () => {
    render(<ReportsPanel assetKey="test-asset-123" assetName="Test Asset" />);
    
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Provenance Report')).toBeInTheDocument();
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
  });

  it('handles successful PDF download', async () => {
    const mockBlob = new Blob(['mock-pdf-content'], { type: 'application/pdf' });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    });

    // Mock URL.createObjectURL and revokeObjectURL
    const mockUrl = 'blob:mock-url';
    global.URL.createObjectURL = jest.fn(() => mockUrl);
    global.URL.revokeObjectURL = jest.fn();

    // Mock document.createElement and appendChild
    const mockLink = {
      href: '',
      download: '',
      click: jest.fn(),
    };
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

    render(<ReportsPanel assetKey="test-asset-123" />);
    
    const downloadButton = screen.getByText('Download PDF');
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/reports/provenance?assetKey=test-asset-123');
    });

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockLink.download).toBe('provenance-report-test-asset-123.pdf');
    expect(mockLink.click).toHaveBeenCalled();

    // Cleanup
    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('handles download errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'PDF generation failed' }),
    });

    render(<ReportsPanel assetKey="test-asset-123" />);
    
    const downloadButton = screen.getByText('Download PDF');
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(screen.getByText('PDF generation failed')).toBeInTheDocument();
    });
  });

  it('shows loading state during download', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<ReportsPanel assetKey="test-asset-123" />);
    
    const downloadButton = screen.getByText('Download PDF');
    fireEvent.click(downloadButton);

    expect(screen.getByText('Generating...')).toBeInTheDocument();
    expect(downloadButton).toBeDisabled();
  });

  it('prevents multiple simultaneous downloads', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<ReportsPanel assetKey="test-asset-123" />);
    
    const downloadButton = screen.getByText('Download PDF');
    fireEvent.click(downloadButton);
    fireEvent.click(downloadButton); // Second click should be ignored

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
