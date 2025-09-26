import { render, screen, waitFor } from '@testing-library/react';
import NotificationCenter from '../NotificationCenter';

// Mock the exceptions client
jest.mock('@/lib/exceptions', () => ({
  exceptionsClient: {
    getExceptions: jest.fn()
  },
  EXCEPTION_TYPE_MAPPING: {
    SLA_BREACH: {
      title: 'SLA Breach Detected',
      description: 'Service level agreement has been breached for this asset',
      color: 'red'
    },
    DOC_MISMATCH: {
      title: 'Document Mismatch',
      description: 'Document verification failed - documents do not match expected format',
      color: 'orange'
    }
  },
  SEVERITY_COLORS: {
    HIGH: 'bg-red-100 text-red-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800'
  }
}));

// Mock Icon component
jest.mock('@/components/ui/Icon', () => {
  return function MockIcon({ name, className }: { name: string; className?: string }) {
    return <span data-testid={`icon-${name}`} className={className} />;
  };
});

describe('NotificationCenter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders high priority exceptions when available', async () => {
    const { exceptionsClient } = require('@/lib/exceptions');
    exceptionsClient.getExceptions.mockResolvedValue({
      exceptions: [
        {
          id: 'exc-001',
          type: 'SLA_BREACH',
          severity: 'HIGH',
          assetKey: 'asset-123',
          assetName: 'Container GE-2024-001',
          message: 'Delivery deadline exceeded by 3 days',
          occurredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          resolved: false
        }
      ],
      total: 1,
      hasMore: false
    });

    render(<NotificationCenter showHighPriority={true} />);

    await waitFor(() => {
      expect(screen.getByText('High Priority')).toBeInTheDocument();
      expect(screen.getByText('SLA Breach Detected')).toBeInTheDocument();
      expect(screen.getByText('Container GE-2024-001')).toBeInTheDocument();
      expect(screen.getByText('View Asset')).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching exceptions', () => {
    const { exceptionsClient } = require('@/lib/exceptions');
    exceptionsClient.getExceptions.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<NotificationCenter showHighPriority={true} />);

    expect(screen.getByText('Loading high priority notifications...')).toBeInTheDocument();
  });

  it('shows error state when exceptions fail to load', async () => {
    const { exceptionsClient } = require('@/lib/exceptions');
    exceptionsClient.getExceptions.mockRejectedValue(new Error('API Error'));

    render(<NotificationCenter showHighPriority={true} />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load high priority notifications')).toBeInTheDocument();
    });
  });

  it('renders regular notifications when no high priority exceptions', async () => {
    const { exceptionsClient } = require('@/lib/exceptions');
    exceptionsClient.getExceptions.mockResolvedValue({
      exceptions: [],
      total: 0,
      hasMore: false
    });

    render(<NotificationCenter showHighPriority={true} />);

    await waitFor(() => {
      expect(screen.getByText('New asset available')).toBeInTheDocument();
      expect(screen.getByText('Investment confirmed')).toBeInTheDocument();
    });
  });

  it('hides high priority section when showHighPriority is false', () => {
    render(<NotificationCenter showHighPriority={false} />);

    expect(screen.queryByText('High Priority')).not.toBeInTheDocument();
    expect(screen.getByText('New asset available')).toBeInTheDocument();
  });

  it('displays severity badges with correct colors', async () => {
    const { exceptionsClient } = require('@/lib/exceptions');
    exceptionsClient.getExceptions.mockResolvedValue({
      exceptions: [
        {
          id: 'exc-001',
          type: 'SLA_BREACH',
          severity: 'HIGH',
          assetKey: 'asset-123',
          assetName: 'Container GE-2024-001',
          message: 'Delivery deadline exceeded',
          occurredAt: new Date().toISOString(),
          resolved: false
        }
      ],
      total: 1,
      hasMore: false
    });

    render(<NotificationCenter showHighPriority={true} />);

    await waitFor(() => {
      const severityBadge = screen.getByText('HIGH');
      expect(severityBadge).toHaveClass('bg-red-100', 'text-red-800');
    });
  });

  it('includes view asset links with correct hrefs', async () => {
    const { exceptionsClient } = require('@/lib/exceptions');
    exceptionsClient.getExceptions.mockResolvedValue({
      exceptions: [
        {
          id: 'exc-001',
          type: 'SLA_BREACH',
          severity: 'HIGH',
          assetKey: 'asset-123',
          assetName: 'Container GE-2024-001',
          message: 'Delivery deadline exceeded',
          occurredAt: new Date().toISOString(),
          resolved: false
        }
      ],
      total: 1,
      hasMore: false
    });

    render(<NotificationCenter showHighPriority={true} />);

    await waitFor(() => {
      const viewAssetLink = screen.getByText('View Asset').closest('a');
      expect(viewAssetLink).toHaveAttribute('href', '/assets/asset-123');
    });
  });
});
