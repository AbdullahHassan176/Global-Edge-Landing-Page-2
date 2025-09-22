'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { userAuthService, User, KycDocument } from '@/lib/userAuthService';

export default function KYCPage() {
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<KycDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const requiredDocuments = [
    { type: 'passport', name: 'Passport', description: 'Valid passport or national ID' },
    { type: 'utility_bill', name: 'Proof of Address', description: 'Utility bill or bank statement (not older than 3 months)' },
    { type: 'bank_statement', name: 'Bank Statement', description: 'Recent bank statement showing your name and address' }
  ];

  useEffect(() => {
    loadKYCData();
  }, []);

  const loadKYCData = async () => {
    try {
      const currentUser = userAuthService.getCurrentUser();
      if (!currentUser || currentUser.role !== 'investor') {
        window.location.href = '/login';
        return;
      }

      setUser(currentUser);
      setDocuments(currentUser.kycDocuments || []);
    } catch (error) {
      console.error('Error loading KYC data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, documentType: string) => {
    setUploading(documentType);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new document
      const newDocument: KycDocument = {
        id: `doc-${Date.now()}`,
        type: documentType as any,
        status: 'pending',
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(file) // In production, this would be the actual uploaded file URL
      };

      const updatedDocuments = [...documents, newDocument];
      setDocuments(updatedDocuments);

      // Update user with new documents
      await userAuthService.updateUser(user!.id, { kycDocuments: updatedDocuments });

      // Create notification
      await userAuthService.createNotification({
        userId: user!.id,
        type: 'kyc_required',
        title: 'Document Uploaded',
        message: `Your ${documentType.replace('_', ' ')} has been uploaded and is pending review.`,
        priority: 'medium',
        actionUrl: '/investor/kyc'
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(null);
    }
  };

  const handleDrop = (e: React.DragEvent, documentType: string) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], documentType);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0], documentType);
    }
  };

  const getDocumentStatus = (documentType: string) => {
    const doc = documents.find(d => d.type === documentType);
    return doc ? doc.status : 'not_uploaded';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return 'check-circle';
      case 'rejected': return 'x-circle';
      case 'pending': return 'clock';
      default: return 'document';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading KYC information...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access KYC verification.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
              <p className="text-gray-600 mt-1">Complete your identity verification to start investing</p>
            </div>
            <div className="text-right">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                user.kycStatus === 'approved' ? 'bg-green-100 text-green-800' :
                user.kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                user.kycStatus === 'pending_review' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {user.kycStatus.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Verification Progress</h2>
          <div className="space-y-4">
            {requiredDocuments.map((doc, index) => {
              const status = getDocumentStatus(doc.type);
              return (
                <div key={doc.type} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    status === 'approved' ? 'bg-green-100' :
                    status === 'rejected' ? 'bg-red-100' :
                    status === 'pending' ? 'bg-yellow-100' :
                    'bg-gray-100'
                  }`}>
                    <Icon name={getStatusIcon(status)} className={`text-sm ${
                      status === 'approved' ? 'text-green-600' :
                      status === 'rejected' ? 'text-red-600' :
                      status === 'pending' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                    {status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Document Upload Sections */}
        <div className="space-y-6">
          {requiredDocuments.map((doc) => {
            const status = getDocumentStatus(doc.type);
            const isUploading = uploading === doc.type;
            
            return (
              <div key={doc.type} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
                      <p className="text-gray-600">{doc.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                      {status.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {status === 'approved' ? (
                    <div className="text-center py-8">
                      <Icon name="check-circle" className="text-green-500 text-4xl mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Document Approved</h4>
                      <p className="text-gray-600">This document has been verified and approved.</p>
                    </div>
                  ) : status === 'rejected' ? (
                    <div className="text-center py-8">
                      <Icon name="x-circle" className="text-red-500 text-4xl mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Document Rejected</h4>
                      <p className="text-gray-600 mb-4">Please upload a new document that meets our requirements.</p>
                      <button className="bg-global-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-global-teal-dark transition-colors">
                        Upload New Document
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        dragOver ? 'border-global-teal bg-global-teal/5' : 'border-gray-300'
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => handleDrop(e, doc.type)}
                    >
                      {isUploading ? (
                        <div>
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Uploading...</h4>
                          <p className="text-gray-600">Please wait while we upload your document.</p>
                        </div>
                      ) : (
                        <div>
                          <Icon name="cloud-upload" className="text-gray-400 text-4xl mx-auto mb-4" />
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Document</h4>
                          <p className="text-gray-600 mb-4">
                            Drag and drop your {doc.name.toLowerCase()} here, or click to browse
                          </p>
                          <input
                            type="file"
                            id={`upload-${doc.type}`}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileInput(e, doc.type)}
                          />
                          <label
                            htmlFor={`upload-${doc.type}`}
                            className="bg-global-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-global-teal-dark transition-colors cursor-pointer inline-block"
                          >
                            Choose File
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Supported formats: PDF, JPG, PNG (Max 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit for Review */}
        {documents.length === requiredDocuments.length && 
         documents.every(doc => doc.status === 'pending' || doc.status === 'approved') && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mt-8">
            <div className="text-center">
              <Icon name="check-circle" className="text-green-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready for Review</h3>
              <p className="text-gray-600 mb-6">
                All required documents have been uploaded. Our team will review them within 1-2 business days.
              </p>
              <button className="bg-global-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-global-teal-dark transition-colors">
                Submit for Review
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mt-8">
          <div className="flex items-start">
            <Icon name="information-circle" className="text-blue-600 text-xl mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800 mb-4">
                If you're having trouble with the verification process, our support team is here to help.
              </p>
              <div className="space-y-2">
                <p className="text-blue-800 text-sm">
                  <strong>Email:</strong> support@globalnext.rocks
                </p>
                <p className="text-blue-800 text-sm">
                  <strong>Phone:</strong> +971 50 123 4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
