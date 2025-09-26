'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { computeFileHash, compareHashes, shortenHash } from '@/lib/hash';

interface Document {
  id: string;
  name: string;
  type: string;
  docHash: string;
  uploadedAt: string;
  verified: boolean;
  size: number;
}

interface DocumentsProps {
  assetKey: string;
  className?: string;
}

interface VerifyModalProps {
  isOpen: boolean;
  document: Document | null;
  onClose: () => void;
  onVerify: (file: File) => Promise<boolean>;
}

function VerifyModal({ isOpen, document, onClose, onVerify }: VerifyModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'pending' | 'pass' | 'fail' | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVerificationResult(null);
    }
  };

  const handleVerify = async () => {
    if (!selectedFile || !document) return;

    setIsVerifying(true);
    try {
      const result = await onVerify(selectedFile);
      setVerificationResult(result ? 'pass' : 'fail');
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationResult('fail');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setVerificationResult(null);
    onClose();
  };

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Verify Document</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Icon name="x" className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Document: {document.name}</p>
          <p className="text-xs text-gray-500 font-mono">
            Expected hash: {shortenHash(document.docHash)}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload your copy to verify
          </label>
          <input
            type="file"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="mt-1 text-xs text-gray-500">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>

        {verificationResult && (
          <div className={`mb-4 p-3 rounded-lg ${
            verificationResult === 'pass' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              <Icon 
                name={verificationResult === 'pass' ? 'check-circle' : 'x-circle'} 
                className={`w-5 h-5 mr-2 ${
                  verificationResult === 'pass' ? 'text-green-600' : 'text-red-600'
                }`} 
              />
              <span className={`text-sm font-medium ${
                verificationResult === 'pass' ? 'text-green-800' : 'text-red-800'
              }`}>
                {verificationResult === 'pass' ? 'PASS - Document matches!' : 'FAIL - Document does not match'}
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={!selectedFile || isVerifying}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isVerifying && <Icon name="spinner" className="animate-spin w-4 h-4 mr-2" />}
            {isVerifying ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Documents({ assetKey, className = '' }: DocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (assetKey) {
      loadDocuments();
    }
  }, [assetKey]);

  const loadDocuments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual endpoint
      const mockDocuments: Document[] = [
        {
          id: 'doc-1',
          name: 'Bill of Lading - Container GE-2024-001',
          type: 'BillOfLading',
          docHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
          uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          verified: true,
          size: 1024000
        },
        {
          id: 'doc-2',
          name: 'Insurance Certificate - Marine Coverage',
          type: 'InsuranceCertificate',
          docHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          verified: true,
          size: 512000
        },
        {
          id: 'doc-3',
          name: 'Inspection Report - Pre-shipment',
          type: 'InspectionReport',
          docHash: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
          uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          verified: false,
          size: 256000
        }
      ];

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDocuments(mockDocuments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (file: File): Promise<boolean> => {
    if (!selectedDocument) return false;

    try {
      const computedHash = await computeFileHash(file);
      return compareHashes(computedHash, selectedDocument.docHash);
    } catch (error) {
      console.error('Hash computation failed:', error);
      return false;
    }
  };

  const openVerifyModal = (document: Document) => {
    setSelectedDocument(document);
    setShowVerifyModal(true);
  };

  const closeVerifyModal = () => {
    setShowVerifyModal(false);
    setSelectedDocument(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Icon name="exclamation-triangle" className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={loadDocuments}
          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Icon name="document-text" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">No documents found</p>
      </div>
    );
  }

  return (
    <>
      <div className={`space-y-4 ${className}`}>
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <Icon name="document-text" className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span>{doc.type}</span>
                  <span>{formatFileSize(doc.size)}</span>
                  <span>{formatRelativeTime(doc.uploadedAt)}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-mono text-gray-600">
                    SHA-256: {shortenHash(doc.docHash)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(doc.docHash)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Icon name="clipboard" className="w-3 h-3" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {doc.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Icon name="check-circle" className="w-3 h-3 mr-1" />
                  Verified
                </span>
              )}
              <button
                onClick={() => openVerifyModal(doc)}
                className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
              >
                <Icon name="shield-check" className="w-3 h-3 mr-1" />
                Verify
              </button>
            </div>
          </div>
        ))}
      </div>

      <VerifyModal
        isOpen={showVerifyModal}
        document={selectedDocument}
        onClose={closeVerifyModal}
        onVerify={handleVerify}
      />
    </>
  );
}
