export interface AssetHealth {
  oracle: {
    status: 'ok' | 'stale' | 'error';
    lastNonce: number;
    lastSeen: number;
  };
  docsCount: number;
  exceptionsCount: number;
}

export interface TimelineEvent {
  type: 'event';
  event: {
    txHash: string;
    eventType: string;
    eventTime: string;
    signer: string;
  };
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  hash: string;
}

export interface Exception {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'open' | 'resolved';
  assetKey: string;
  message: string;
  occurredAt: string;
}

// Mock tokens client for development
class MockTokensClient {
  async getTimeline(assetKey: string, options: { limit: number } = { limit: 1 }): Promise<TimelineEvent[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Mock timeline data with recent oracle signature
      const now = Date.now();
      const isRecent = Math.random() > 0.3; // 70% chance of recent signature
      const hoursAgo = isRecent ? Math.floor(Math.random() * 24) : Math.floor(Math.random() * 72) + 24;
      
      return [{
        type: 'event',
        event: {
          txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          eventType: 'OracleSignature',
          eventTime: new Date(now - hoursAgo * 60 * 60 * 1000).toISOString(),
          signer: `0x${Math.random().toString(16).substr(2, 40)}`
        }
      }];
    } catch (error) {
      console.error('Error fetching timeline:', error);
      return [];
    }
  }

  async listDocs(assetKey: string): Promise<Document[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Mock documents
      const docTypes = ['Bill of Lading', 'Insurance Certificate', 'Inspection Report', 'Compliance Document'];
      const docCount = Math.floor(Math.random() * 5) + 1; // 1-5 documents
      
      return Array.from({ length: docCount }, (_, i) => ({
        id: `doc-${assetKey}-${i}`,
        name: `${docTypes[i % docTypes.length]} ${i + 1}`,
        type: docTypes[i % docTypes.length],
        uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        hash: `0x${Math.random().toString(16).substr(2, 64)}`
      }));
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  }

  async getExceptions(params: { assetKey: string; status: string }): Promise<Exception[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Mock exceptions
      const exceptionTypes = ['SLA_BREACH', 'DOC_MISMATCH', 'COMPLIANCE_VIOLATION', 'AUDIT_FAILURE'];
      const severities: Array<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'> = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
      const statuses: Array<'open' | 'resolved'> = ['open', 'resolved'];
      
      const exceptionCount = Math.floor(Math.random() * 4); // 0-3 exceptions
      const openCount = Math.floor(Math.random() * (exceptionCount + 1)); // Some may be open
      
      return Array.from({ length: exceptionCount }, (_, i) => ({
        id: `exc-${params.assetKey}-${i}`,
        type: exceptionTypes[i % exceptionTypes.length],
        severity: severities[i % severities.length],
        status: (i < openCount ? 'open' : 'resolved') as 'open' | 'resolved',
        assetKey: params.assetKey,
        message: `Exception ${i + 1} for asset ${params.assetKey}`,
        occurredAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      })).filter(exc => exc.status === params.status);
    } catch (error) {
      console.error('Error fetching exceptions:', error);
      return [];
    }
  }
}

// Create singleton instance
const tokensClient = new MockTokensClient();

export async function getAssetHealth(assetKey: string): Promise<AssetHealth> {
  try {
    // Fetch timeline to get last oracle signature
    const timeline = await tokensClient.getTimeline(assetKey, { limit: 1 });
    const lastEvent = timeline.find(event => event.event.eventType === 'OracleSignature');
    
    let oracleStatus: 'ok' | 'stale' | 'error' = 'error';
    let lastNonce = 0;
    let lastSeen = 0;
    
    if (lastEvent) {
      const lastSignatureTime = new Date(lastEvent.event.eventTime).getTime();
      const now = Date.now();
      const hoursSinceLastSignature = (now - lastSignatureTime) / (1000 * 60 * 60);
      
      // Extract nonce from txHash (simplified)
      lastNonce = parseInt(lastEvent.event.txHash.slice(-8), 16);
      lastSeen = lastSignatureTime;
      
      if (hoursSinceLastSignature <= 24) {
        oracleStatus = 'ok';
      } else if (hoursSinceLastSignature <= 48) {
        oracleStatus = 'stale';
      } else {
        oracleStatus = 'error';
      }
    }
    
    // Fetch documents count
    const documents = await tokensClient.listDocs(assetKey);
    const docsCount = documents.length;
    
    // Fetch open exceptions count
    const exceptions = await tokensClient.getExceptions({ assetKey, status: 'open' });
    const exceptionsCount = exceptions.length;
    
    return {
      oracle: {
        status: oracleStatus,
        lastNonce,
        lastSeen
      },
      docsCount,
      exceptionsCount
    };
    
  } catch (error) {
    console.error('Error fetching asset health:', error);
    
    // Return fallback data
    return {
      oracle: {
        status: 'error',
        lastNonce: 0,
        lastSeen: 0
      },
      docsCount: 0,
      exceptionsCount: 0
    };
  }
}

// Helper function to format time ago
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

// Helper function to get oracle status color
export function getOracleStatusColor(status: 'ok' | 'stale' | 'error'): string {
  switch (status) {
    case 'ok':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'stale':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Helper function to get oracle status icon
export function getOracleStatusIcon(status: 'ok' | 'stale' | 'error'): string {
  switch (status) {
    case 'ok':
      return 'check-circle';
    case 'stale':
      return 'exclamation-triangle';
    case 'error':
      return 'x-circle';
    default:
      return 'question-mark-circle';
  }
}
