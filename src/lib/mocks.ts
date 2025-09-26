/**
 * Mock implementations for development and testing
 * Controlled by NEXT_PUBLIC_API_BASE === "mock"
 */

import { FEATURE_FINANCING, FEATURE_OPS } from './flags';

// Check if we should use mock data
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_API_BASE === "mock";

/**
 * Mock timeline data generator
 */
export async function mockGetTimeline(assetKey: string, params?: { limit?: number }) {
  if (!USE_MOCK_DATA) {
    throw new Error('Mock data is disabled. Set NEXT_PUBLIC_API_BASE=mock to enable.');
  }

  const limit = params?.limit || 10;
  const now = Date.now();
  
  const mockEvents = Array.from({ length: limit }, (_, i) => ({
    type: 'event' as const,
    event: {
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      eventType: ['AssetCreated', 'OwnershipTransferred', 'StatusChanged', 'MaintenancePerformed'][i % 4],
      eventTime: new Date(now - (i * 24 * 60 * 60 * 1000)).toISOString(),
      signer: `0x${Math.random().toString(16).substr(2, 40)}`,
    },
  }));

  const mockDocs = Array.from({ length: Math.floor(limit / 3) }, (_, i) => ({
    type: 'doc' as const,
    doc: {
      docHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      kind: ['BillOfLading', 'InsuranceCertificate', 'InspectionReport'][i % 3],
    },
  }));

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    timeline: [...mockEvents, ...mockDocs].sort(() => Math.random() - 0.5).slice(0, limit),
  };
}

/**
 * Mock documents list generator
 */
export async function mockListDocs(assetKey: string) {
  if (!USE_MOCK_DATA) {
    throw new Error('Mock data is disabled. Set NEXT_PUBLIC_API_BASE=mock to enable.');
  }

  const docTypes = ['Bill of Lading', 'Insurance Certificate', 'Cargo Manifest', 'Inspection Report', 'Certificate of Origin'];
  const docCount = Math.floor(Math.random() * 5) + 1; // 1-5 documents
  
  const mockDocs = Array.from({ length: docCount }, (_, i) => ({
    id: `doc-${assetKey}-${i}`,
    name: docTypes[i % docTypes.length],
    hash: `0x${Math.random().toString(16).substr(2, 64)}`,
    size: Math.floor(Math.random() * 1000000) + 10000, // 10KB - 1MB
    uploadedAt: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)).toISOString(),
  }));

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockDocs;
}

/**
 * Mock exceptions list generator
 */
export async function mockGetExceptions(params: { assetKey?: string; status?: 'open' | 'resolved' }) {
  if (!USE_MOCK_DATA) {
    throw new Error('Mock data is disabled. Set NEXT_PUBLIC_API_BASE=mock to enable.');
  }

  const exceptionTypes = ['SLA_BREACH', 'DOC_MISMATCH', 'COMPLIANCE_VIOLATION', 'AUDIT_FAILURE'];
  const severities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  
  const exceptionCount = Math.floor(Math.random() * 4) + 1; // 1-4 exceptions
  const openCount = Math.floor(Math.random() * (exceptionCount + 1)); // Some may be open
  
  const mockExceptions = Array.from({ length: exceptionCount }, (_, i) => ({
    id: `exc-${params.assetKey || 'default'}-${i}`,
    type: exceptionTypes[i % exceptionTypes.length],
    severity: severities[i % severities.length],
    status: (i < openCount ? 'open' : 'resolved') as 'open' | 'resolved',
    assetKey: params.assetKey || 'default',
    assetName: `Asset ${params.assetKey || 'default'}`,
    message: `This is a mock exception of type ${exceptionTypes[i % exceptionTypes.length]}`,
    occurredAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    resolved: i >= openCount,
    metadata: {
      exceptionType: exceptionTypes[i % exceptionTypes.length],
      severity: severities[i % severities.length]
    }
  }));

  // Filter by status if provided
  const filteredExceptions = params.status 
    ? mockExceptions.filter(exc => exc.status === params.status)
    : mockExceptions;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 250));
  
  return filteredExceptions;
}

/**
 * Mock admin actions
 */
export async function mockAdminActions() {
  if (!USE_MOCK_DATA) {
    throw new Error('Mock data is disabled. Set NEXT_PUBLIC_API_BASE=mock to enable.');
  }

  const actions = [
    {
      id: 'rotate-key',
      name: 'Rotate Oracle Key',
      description: 'Generate new oracle signing key',
      endpoint: '/v1/admin/oracles/rotate',
      method: 'POST',
    },
    {
      id: 'lock-transfers',
      name: 'Lock Transfers',
      description: 'Lock/unlock asset transfers',
      endpoint: '/v1/assets/:key/lock',
      method: 'POST',
    },
    {
      id: 'backfill-events',
      name: 'Backfill Events',
      description: 'Backfill events from last 48h',
      endpoint: '/v1/assets/:key/backfill',
      method: 'POST',
    },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return actions;
}

/**
 * Mock asset health data
 */
export async function mockGetAssetHealth(assetKey: string) {
  if (!USE_MOCK_DATA) {
    throw new Error('Mock data is disabled. Set NEXT_PUBLIC_API_BASE=mock to enable.');
  }

  const now = Date.now();
  const lastSeen = now - Math.random() * 72 * 3600 * 1000; // Up to 72 hours ago
  const lastNonce = Math.floor(Math.random() * 100000);
  
  let oracleStatus: 'ok' | 'stale' | 'error' = 'ok';
  const hoursSinceLastSeen = (now - lastSeen) / (3600 * 1000);
  
  if (hoursSinceLastSeen <= 24) {
    oracleStatus = 'ok';
  } else if (hoursSinceLastSeen <= 48) {
    oracleStatus = 'stale';
  } else {
    oracleStatus = 'error';
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return {
    oracle: {
      status: oracleStatus,
      lastNonce,
      lastSeen,
    },
    docsCount: Math.floor(Math.random() * 5), // 0-4 docs
    exceptionsCount: Math.floor(Math.random() * 4), // 0-3 exceptions
  };
}

/**
 * Mock user data
 */
export async function mockGetUserData(userId: string) {
  if (!USE_MOCK_DATA) {
    throw new Error('Mock data is disabled. Set NEXT_PUBLIC_API_BASE=mock to enable.');
  }

  const mockUser = {
    id: userId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'investor',
    status: 'active',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockUser;
}

/**
 * Mock notifications data
 */
export async function mockGetNotifications(userId: string) {
  if (!USE_MOCK_DATA) {
    throw new Error('Mock data is disabled. Set NEXT_PUBLIC_API_BASE=mock to enable.');
  }

  const notificationTypes = ['info', 'warning', 'error', 'success'];
  const notificationCount = Math.floor(Math.random() * 10) + 1; // 1-10 notifications
  
  const mockNotifications = Array.from({ length: notificationCount }, (_, i) => ({
    id: `notif-${userId}-${i}`,
    type: notificationTypes[i % notificationTypes.length],
    title: `Notification ${i + 1}`,
    message: `This is a mock notification for user ${userId}`,
    timestamp: new Date(Date.now() - (i * 60 * 60 * 1000)).toISOString(),
    read: Math.random() > 0.5,
  }));

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockNotifications;
}

/**
 * Check if mock data is enabled
 */
export function isMockDataEnabled(): boolean {
  return USE_MOCK_DATA;
}

/**
 * Get mock data configuration
 */
export function getMockConfig() {
  return {
    enabled: USE_MOCK_DATA,
    features: {
      financing: FEATURE_FINANCING,
      ops: FEATURE_OPS,
    },
    apiBase: process.env.NEXT_PUBLIC_API_BASE,
  };
}
