'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text: string;
  timestamp: string;
  messageId: string;
}

export default function EmailsPage() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    try {
      const response = await fetch('/api/emails/list');
      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails || []);
      }
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading emails...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-bold text-charcoal">
                Email Management
              </h1>
              <p className="text-gray-600 mt-2">
                View and manage password reset emails
              </p>
            </div>
            <Link
              href="/admin"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back to Admin
            </Link>
          </div>
        </div>

        {/* Emails List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              Recent Emails ({emails.length})
            </h2>
            
            {emails.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="envelope" className="text-gray-400 text-4xl mx-auto mb-4" />
                <p className="text-gray-600">No emails found</p>
                <p className="text-sm text-gray-500 mt-2">
                  Try requesting a password reset to generate an email
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {emails.map((email, index) => (
                  <div
                    key={email.messageId}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedEmail?.messageId === email.messageId
                        ? 'border-global-teal bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-charcoal">
                          {email.subject}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          To: {email.to}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(email.timestamp)}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Sent
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Email Preview */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              Email Preview
            </h2>
            
            {selectedEmail ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-charcoal">Subject</h3>
                  <p className="text-gray-600">{selectedEmail.subject}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-charcoal">To</h3>
                  <p className="text-gray-600">{selectedEmail.to}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-charcoal">Timestamp</h3>
                  <p className="text-gray-600">{formatDate(selectedEmail.timestamp)}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-charcoal">Message ID</h3>
                  <p className="text-gray-600 font-mono text-sm">{selectedEmail.messageId}</p>
                </div>
                
                {selectedEmail.html && (
                  <div>
                    <h3 className="font-medium text-charcoal mb-2">HTML Content</h3>
                    <div 
                      className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                    />
                  </div>
                )}
                
                {selectedEmail.text && (
                  <div>
                    <h3 className="font-medium text-charcoal mb-2">Text Content</h3>
                    <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm">{selectedEmail.text}</pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="eye" className="text-gray-400 text-4xl mx-auto mb-4" />
                <p className="text-gray-600">Select an email to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
