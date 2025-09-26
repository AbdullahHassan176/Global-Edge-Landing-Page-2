export interface Exception {
  id: string;
  type: 'SLA_BREACH' | 'DOC_MISMATCH' | 'COMPLIANCE_VIOLATION' | 'AUDIT_FAILURE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assetKey: string;
  assetName: string;
  message: string;
  occurredAt: string;
  resolved: boolean;
  metadata?: Record<string, any>;
}

export interface ExceptionsResponse {
  exceptions: Exception[];
  total: number;
  hasMore: boolean;
}

// Mapping exception types to user-friendly copy
export const EXCEPTION_TYPE_MAPPING: Record<string, { title: string; description: string; color: string }> = {
  SLA_BREACH: {
    title: 'SLA Breach Detected',
    description: 'Service level agreement has been breached for this asset',
    color: 'red'
  },
  DOC_MISMATCH: {
    title: 'Document Mismatch',
    description: 'Document verification failed - documents do not match expected format',
    color: 'orange'
  },
  COMPLIANCE_VIOLATION: {
    title: 'Compliance Violation',
    description: 'Asset has failed compliance requirements',
    color: 'yellow'
  },
  AUDIT_FAILURE: {
    title: 'Audit Failure',
    description: 'Asset audit has failed verification',
    color: 'purple'
  }
};

// Severity color mapping
export const SEVERITY_COLORS: Record<string, string> = {
  LOW: 'bg-gray-100 text-gray-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  CRITICAL: 'bg-red-100 text-red-800'
};

// Mock client for exceptions
export class ExceptionsClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/exceptions') {
    this.baseUrl = baseUrl;
  }

  async getExceptions(params: {
    ownerOnly?: boolean;
    severity?: string[];
    limit?: number;
    assetKey?: string;
  } = {}): Promise<ExceptionsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.ownerOnly) queryParams.set('owned', 'true');
      if (params.severity?.length) queryParams.set('severity', params.severity.join(','));
      if (params.limit) queryParams.set('limit', params.limit.toString());
      if (params.assetKey) queryParams.set('assetKey', params.assetKey);

      const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch exceptions: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching exceptions:', error);
      
      // Return mock data for development
      return this.getMockExceptions(params);
    }
  }

  private getMockExceptions(params: {
    ownerOnly?: boolean;
    severity?: string[];
    limit?: number;
    assetKey?: string;
  } = {}): ExceptionsResponse {
    const mockExceptions: Exception[] = [
      {
        id: 'exc-001',
        type: 'SLA_BREACH',
        severity: 'HIGH',
        assetKey: 'asset-123',
        assetName: 'Container GE-2024-001',
        message: 'Delivery deadline exceeded by 3 days',
        occurredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        resolved: false,
        metadata: { deadline: '2024-01-15', actualDelivery: '2024-01-18' }
      },
      {
        id: 'exc-002',
        type: 'DOC_MISMATCH',
        severity: 'MEDIUM',
        assetKey: 'asset-456',
        assetName: 'Property Token PT-2024-003',
        message: 'Insurance certificate does not match asset details',
        occurredAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        resolved: false,
        metadata: { documentType: 'Insurance Certificate', mismatchField: 'assetValue' }
      },
      {
        id: 'exc-003',
        type: 'SLA_BREACH',
        severity: 'CRITICAL',
        assetKey: 'asset-789',
        assetName: 'Shipping Container SC-2024-002',
        message: 'Critical maintenance window missed',
        occurredAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        resolved: false,
        metadata: { maintenanceWindow: '2024-01-20', status: 'overdue' }
      },
      {
        id: 'exc-004',
        type: 'DOC_MISMATCH',
        severity: 'HIGH',
        assetKey: 'asset-321',
        assetName: 'Inventory Token IT-2024-001',
        message: 'Bill of lading signature verification failed',
        occurredAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        resolved: false,
        metadata: { documentType: 'Bill of Lading', issue: 'signature_mismatch' }
      }
    ];

    // Filter by severity if specified
    let filteredExceptions = mockExceptions;
    if (params.severity?.length) {
      filteredExceptions = mockExceptions.filter(exc => 
        params.severity!.includes(exc.severity)
      );
    }

    // Filter by asset key if specified
    if (params.assetKey) {
      filteredExceptions = filteredExceptions.filter(exc => 
        exc.assetKey === params.assetKey
      );
    }

    // Apply limit
    const limit = params.limit || 10;
    const limitedExceptions = filteredExceptions.slice(0, limit);

    return {
      exceptions: limitedExceptions,
      total: filteredExceptions.length,
      hasMore: filteredExceptions.length > limit
    };
  }
}

// Create singleton instance
export const exceptionsClient = new ExceptionsClient();
