'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Icon from '@/components/ui/Icon';

interface TimelineEvent {
  type: 'event';
  event: {
    txHash: string;
    eventType: string;
    eventTime: string;
    signer: string;
  };
}

interface TimelineDoc {
  type: 'doc';
  doc: {
    docHash: string;
    kind: string;
    uploadedAt: string;
    verified: boolean;
  };
}

type TimelineItem = TimelineEvent | TimelineDoc;

interface Document {
  id: string;
  name: string;
  type: string;
  hash: string;
  uploadedAt: string;
  verified: boolean;
  size: number;
}

export default function ProvenancePage() {
  const params = useParams();
  const assetKey = params.assetKey as string;
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProvenanceData();
  }, [assetKey]);

  const loadProvenanceData = async () => {
    setLoading(true);
    try {
      // Mock timeline data
      const mockTimeline: TimelineItem[] = [
        {
          type: 'event',
          event: {
            txHash: '0xabc123def456abc123def456abc123def456abc123def456abc123def456',
            eventType: 'AssetCreated',
            eventTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            signer: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'
          }
        },
        {
          type: 'doc',
          doc: {
            docHash: '0xdoc123hash456doc123hash456doc123hash456doc123hash456',
            kind: 'BillOfLading',
            uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            verified: true
          }
        },
        {
          type: 'event',
          event: {
            txHash: '0xdef456abc123def456abc123def456abc123def456abc123def456abc',
            eventType: 'OwnershipTransferred',
            eventTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            signer: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c'
          }
        },
        {
          type: 'doc',
          doc: {
            docHash: '0xdoc456hash789doc456hash789doc456hash789doc456hash789',
            kind: 'InsuranceCertificate',
            uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            verified: true
          }
        },
        {
          type: 'event',
          event: {
            txHash: '0x123def456abc123def456abc123def456abc123def456abc123def',
            eventType: 'MaintenancePerformed',
            eventTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            signer: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d'
          }
        }
      ];

      // Mock documents data
      const mockDocuments: Document[] = [
        {
          id: 'doc-1',
          name: 'Bill of Lading - Container GE-2024-001',
          type: 'BillOfLading',
          hash: '0xdoc123hash456doc123hash456doc123hash456doc123hash456',
          uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          verified: true,
          size: 1024000
        },
        {
          id: 'doc-2',
          name: 'Insurance Certificate - Marine Coverage',
          type: 'InsuranceCertificate',
          hash: '0xdoc456hash789doc456hash789doc456hash789doc456hash789',
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          verified: true,
          size: 512000
        },
        {
          id: 'doc-3',
          name: 'Inspection Report - Pre-shipment',
          type: 'InspectionReport',
          hash: '0xdoc789hash012doc789hash012doc789hash012doc789hash012',
          uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          verified: false,
          size: 256000
        }
      ];

      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimeline(mockTimeline);
      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Error loading provenance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  };

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  const verifyDocument = (docId: string) => {
    // TODO: Implement document verification
    console.log('Verifying document:', docId);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <Icon name="spinner" className="animate-spin h-8 w-8 text-global-teal" />
          <span className="ml-2 text-gray-600">Loading provenance data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Provenance Timeline</h3>
          <p className="mt-1 text-sm text-gray-500">
            Complete audit trail of asset events and document uploads
          </p>
        </div>
        <div className="p-6">
          {timeline.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="inbox" className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No timeline events</h3>
              <p className="mt-2 text-sm text-gray-500">No events or documents found for this asset.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {timeline.map((item, index) => (
                <li key={index} className="relative flex gap-x-4">
                  <div className="absolute left-0 top-0 flex w-6 justify-center">
                    <div className="w-px bg-gray-200" />
                  </div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    {item.type === 'event' ? (
                      <Icon name="cube" className="h-6 w-6 text-global-teal" />
                    ) : (
                      <Icon name="document-text" className="h-6 w-6 text-edge-purple" />
                    )}
                  </div>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        {item.type === 'event' ? (
                          <>
                            <span className="font-medium text-gray-900">On-chain Event:</span> {item.event?.eventType}
                          </>
                        ) : (
                          <>
                            <span className="font-medium text-gray-900">Document:</span> {item.doc?.kind}
                          </>
                        )}
                      </div>
                      <time dateTime={item.type === 'event' ? item.event?.eventTime : item.doc?.uploadedAt} className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                        {formatTimeAgo(item.type === 'event' ? item.event?.eventTime || '' : item.doc?.uploadedAt || '')}
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-700">
                      {item.type === 'event' ? (
                        <>
                          Tx Hash: <a href={`https://explorer.example.com/tx/${item.event?.txHash}`} target="_blank" rel="noopener noreferrer" className="text-global-teal hover:underline">
                            {shortenAddress(item.event?.txHash || '')}
                          </a>
                          <br />
                          Signer: {shortenAddress(item.event?.signer || '')}
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center">
                            Hash: {shortenAddress(item.doc?.docHash || '')}
                            <button
                              onClick={() => copyToClipboard(item.doc?.docHash || '')}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                              title="Copy hash"
                            >
                              <Icon name="clipboard" className="h-4 w-4" />
                            </button>
                          </span>
                          {item.doc?.verified && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Icon name="check-circle" className="w-3 h-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
          <p className="mt-1 text-sm text-gray-500">
            Attached documents with hash verification
          </p>
        </div>
        <div className="p-6">
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="document-text" className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No documents</h3>
              <p className="mt-2 text-sm text-gray-500">No documents have been uploaded for this asset.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon name="document-text" className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">
                        {doc.type} • {(doc.size / 1024).toFixed(1)} KB • {formatTimeAgo(doc.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Hash</p>
                      <p className="text-sm font-mono text-gray-900">{shortenAddress(doc.hash)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.verified ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Icon name="check-circle" className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => verifyDocument(doc.id)}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        >
                          <Icon name="exclamation-triangle" className="w-3 h-3 mr-1" />
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => copyToClipboard(doc.hash)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy hash"
                      >
                        <Icon name="clipboard" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
