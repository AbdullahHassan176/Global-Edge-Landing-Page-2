import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProvenanceChip } from '../ProvenanceChip';

// Mock Icon component
jest.mock('@/components/ui/Icon', () => ({
  __esModule: true,
  default: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid={`icon-${name}`} className={className} />
  ),
}));

describe.skip('ProvenanceChip', () => {
  const mockOnOpenDrawer = jest.fn();

  beforeEach(() => {
    mockOnOpenDrawer.mockClear();
  });

  it('renders with asset key', () => {
    render(
      <ProvenanceChip
        assetKey='test-asset-123'
        onOpenDrawer={mockOnOpenDrawer}
      />
    );
    expect(screen.getByText('Provenance')).toBeInTheDocument();
    expect(
      screen.getByLabelText('View provenance for asset test-asset-123')
    ).toBeInTheDocument();
  });

  it('calls onOpenDrawer when clicked', () => {
    render(
      <ProvenanceChip
        assetKey='test-asset-123'
        onOpenDrawer={mockOnOpenDrawer}
      />
    );

    const button = screen.getByText('Provenance');
    fireEvent.click(button);

    expect(mockOnOpenDrawer).toHaveBeenCalledWith('test-asset-123');
  });

  it('renders with correct styling', () => {
    render(
      <ProvenanceChip
        assetKey='test-asset-123'
        onOpenDrawer={mockOnOpenDrawer}
      />
    );

    const button = screen.getByText('Provenance');
    expect(button).toHaveClass(
      'bg-blue-50',
      'hover:bg-blue-100',
      'text-blue-700'
    );
  });

  it('renders icon', () => {
    render(
      <ProvenanceChip
        assetKey='test-asset-123'
        onOpenDrawer={mockOnOpenDrawer}
      />
    );

    expect(screen.getByTestId('icon-link')).toBeInTheDocument();
  });
});
