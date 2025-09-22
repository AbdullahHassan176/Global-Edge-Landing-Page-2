'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { notificationService } from '@/lib/notificationService';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

interface AdminNotification {
  id: string;
  type: 'account_created' | 'partner_application';
  title: string;
  description: string;
  userEmail: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'processed';
  data: any;
  priority: 'low' | 'medium' | 'high';
}

interface EmailNotification {
  id: string;
  type: 'account_created' | 'partner_application' | 'welcome' | 'verification';
  to: string;
  subject: string;
  template: string;
  data: any;
  status: 'pending' | 'sent' | 'failed';
  timestamp: string;
  retryCount: number;
}

interface WebhookNotification {
  id: string;
  type: 'account_created' | 'partner_application';
  endpoint: string;
  payload: any;
  status: 'pending' | 'sent' | 'failed';
  timestamp: string;
  retryCount: number;
}

function NotificationsDashboard() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [emailNotifications, setEmailNotifications] = useState<EmailNotification[]>([]);
  const [webhookNotifications, setWebhookNotifications] = useState<WebhookNotification[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed' | 'processed'>('all');
  const [activeTab, setActiveTab] = useState<'admin' | 'emails' | 'webhooks' | 'stats'>('admin');
  const [stats, setStats] = useState<any>(null);
  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Load notifications from service
  useEffect(() => {
    const loadNotifications = () => {
      try {
        setNotifications(notificationService.getAdminNotifications());
        setEmailNotifications(notificationService.getEmailNotifications());
        setWebhookNotifications(notificationService.getWebhookNotifications());
        setStats(notificationService.getNotificationStats());
      } catch (error) {
        console.error('Error loading notifications:', error);
        // Set default stats if loading fails
        setStats({
          emailStats: { total: 0, sent: 0, failed: 0, pending: 0 },
          webhookStats: { total: 0, sent: 0, failed: 0, pending: 0 },
          adminStats: { total: 0, new: 0, reviewed: 0, processed: 0 }
        });
      }
    };

    loadNotifications();
    
    // Refresh every 5 seconds
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || notification.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'processed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'account_created': return 'user';
      case 'partner_application': return 'handshake';
      default: return 'bell';
    }
  };

  const markAsReviewed = (id: string) => {
    notificationService.updateAdminNotificationStatus(id, 'reviewed');
    setNotifications(notificationService.getAdminNotifications());
  };

  const markAsProcessed = (id: string) => {
    notificationService.updateAdminNotificationStatus(id, 'processed');
    setNotifications(notificationService.getAdminNotifications());
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEmailStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWebhookStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePreviewEmail = (email: EmailNotification) => {
    setSelectedEmail(email);
    setShowEmailModal(true);
  };

  const formatEmailTemplate = (template: string, data: any) => {
    // Replace template variables with actual data
    let formattedTemplate = template;
    
    // Replace common variables
    if (data.firstName) formattedTemplate = formattedTemplate.replace(/\{\{firstName\}\}/g, data.firstName);
    if (data.lastName) formattedTemplate = formattedTemplate.replace(/\{\{lastName\}\}/g, data.lastName);
    if (data.email) formattedTemplate = formattedTemplate.replace(/\{\{email\}\}/g, data.email);
    if (data.companyName) formattedTemplate = formattedTemplate.replace(/\{\{companyName\}\}/g, data.companyName);
    if (data.investmentAmount) formattedTemplate = formattedTemplate.replace(/\{\{investmentAmount\}\}/g, data.investmentAmount);
    if (data.assetName) formattedTemplate = formattedTemplate.replace(/\{\{assetName\}\}/g, data.assetName);
    if (data.verificationLink) formattedTemplate = formattedTemplate.replace(/\{\{verificationLink\}\}/g, data.verificationLink || 'https://example.com/verify');
    if (data.loginLink) formattedTemplate = formattedTemplate.replace(/\{\{loginLink\}\}/g, data.loginLink || 'https://example.com/login');
    
    return formattedTemplate;
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Admin Notifications
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Monitor new account registrations and partnership applications
            </p>
          </div>
        </div>
      </section>

      {/* Notifications Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { key: 'admin', label: 'Admin Notifications', count: notifications.length },
              { key: 'emails', label: 'Email Queue', count: emailNotifications.length },
              { key: 'webhooks', label: 'Webhooks', count: webhookNotifications.length },
              { key: 'stats', label: 'Statistics', count: null }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-global-teal text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label} {count !== null && `(${count})`}
              </button>
            ))}
          </div>

          {/* Admin Notifications Tab */}
          {activeTab === 'admin' && (
            <>
              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { key: 'all', label: 'All Notifications', count: notifications.length },
                  { key: 'new', label: 'New', count: notifications.filter(n => n.status === 'new').length },
                  { key: 'reviewed', label: 'Reviewed', count: notifications.filter(n => n.status === 'reviewed').length },
                  { key: 'processed', label: 'Processed', count: notifications.filter(n => n.status === 'processed').length }
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      filter === key
                        ? 'bg-edge-purple text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label} ({count})
                  </button>
                ))}
              </div>

          {/* Notifications List */}
          <div className="space-y-6">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={getTypeIcon(notification.type)} className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-poppins font-semibold text-charcoal">
                          {notification.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(notification.status)}`}>
                          {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(notification.priority)}`}>
                          {notification.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{notification.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Icon name="user" className="mr-1" />
                          {notification.userEmail}
                        </span>
                        <span className="flex items-center">
                          <Icon name="calendar" className="mr-1" />
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {notification.status === 'new' && (
                      <button
                        onClick={() => markAsReviewed(notification.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                      >
                        Mark as Reviewed
                      </button>
                    )}
                    {notification.status === 'reviewed' && (
                      <button
                        onClick={() => markAsProcessed(notification.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Mark as Processed
                      </button>
                    )}
                  </div>
                </div>

                {/* Notification Details */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-charcoal mb-2">Details:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {Object.entries(notification.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium text-charcoal">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="bell" className="text-gray-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications found</h3>
                  <p className="text-gray-500">No notifications match your current filter.</p>
                </div>
              )}
            </>
          )}

          {/* Email Queue Tab */}
          {activeTab === 'emails' && (
            <div className="space-y-6">
              {emailNotifications.map((email) => (
                <div key={email.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="paper-plane" className="text-white text-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-poppins font-semibold text-charcoal">
                            {email.subject}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmailStatusColor(email.status)}`}>
                            {email.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">To: {email.to}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Icon name="calendar" className="mr-1" />
                            {new Date(email.timestamp).toLocaleString()}
                          </span>
                          {email.retryCount > 0 && (
                            <span className="flex items-center text-red-500">
                              <Icon name="exclamation-triangle" className="mr-1" />
                              Retries: {email.retryCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      onClick={() => handlePreviewEmail(email)}
                    >
                      Preview Email
                    </button>
                  </div>
                </div>
              ))}
              {emailNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="paper-plane" className="text-gray-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No emails in queue</h3>
                  <p className="text-gray-500">No email notifications have been sent yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Webhooks Tab */}
          {activeTab === 'webhooks' && (
            <div className="space-y-6">
              {webhookNotifications.map((webhook) => (
                <div key={webhook.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="link" className="text-white text-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-poppins font-semibold text-charcoal">
                            {webhook.type.replace('_', ' ').toUpperCase()} Webhook
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWebhookStatusColor(webhook.status)}`}>
                            {webhook.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3 break-all">{webhook.endpoint}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Icon name="calendar" className="mr-1" />
                            {new Date(webhook.timestamp).toLocaleString()}
                          </span>
                          {webhook.retryCount > 0 && (
                            <span className="flex items-center text-red-500">
                              <Icon name="exclamation-triangle" className="mr-1" />
                              Retries: {webhook.retryCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                      onClick={() => {
                        const newWindow = window.open('', '_blank');
                        if (newWindow) {
                          newWindow.document.write(`
                            <h2>Webhook Payload</h2>
                            <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; overflow: auto;">
                              ${JSON.stringify(webhook.payload, null, 2)}
                            </pre>
                          `);
                          newWindow.document.title = 'Webhook Payload';
                        }
                      }}
                    >
                      View Payload
                    </button>
                  </div>
                </div>
              ))}
              {webhookNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="link" className="text-gray-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No webhooks sent</h3>
                  <p className="text-gray-500">No webhook notifications have been sent yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div>
              {!stats ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading statistics...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
              {/* Email Statistics */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Email Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Emails:</span>
                    <span className="font-semibold">{stats?.emailStats?.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sent:</span>
                    <span className="font-semibold text-green-600">{stats?.emailStats?.sent || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Failed:</span>
                    <span className="font-semibold text-red-600">{stats?.emailStats?.failed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-semibold text-yellow-600">{stats?.emailStats?.pending || 0}</span>
                  </div>
                </div>
              </div>

              {/* Webhook Statistics */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Webhook Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Webhooks:</span>
                    <span className="font-semibold">{stats?.webhookStats?.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sent:</span>
                    <span className="font-semibold text-green-600">{stats?.webhookStats?.sent || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Failed:</span>
                    <span className="font-semibold text-red-600">{stats?.webhookStats?.failed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-semibold text-yellow-600">{stats?.webhookStats?.pending || 0}</span>
                  </div>
                </div>
              </div>

              {/* Admin Statistics */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Admin Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Notifications:</span>
                    <span className="font-semibold">{stats?.adminStats?.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New:</span>
                    <span className="font-semibold text-red-600">{stats?.adminStats?.new || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviewed:</span>
                    <span className="font-semibold text-yellow-600">{stats?.adminStats?.reviewed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processed:</span>
                    <span className="font-semibold text-green-600">{stats?.adminStats?.processed || 0}</span>
                  </div>
                </div>
              </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Email Preview Modal */}
      {showEmailModal && selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Email Preview</h2>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="x-mark" className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                {/* Email Header */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">To:</span>
                      <span className="ml-2 text-gray-900">{selectedEmail.to}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Subject:</span>
                      <span className="ml-2 text-gray-900">{selectedEmail.subject}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Type:</span>
                      <span className="ml-2 text-gray-900">{selectedEmail.type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getEmailStatusColor(selectedEmail.status)}`}>
                        {selectedEmail.status.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Sent:</span>
                      <span className="ml-2 text-gray-900">{new Date(selectedEmail.timestamp).toLocaleString()}</span>
                    </div>
                    {selectedEmail.retryCount > 0 && (
                      <div>
                        <span className="font-medium text-gray-600">Retries:</span>
                        <span className="ml-2 text-red-600">{selectedEmail.retryCount}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Content */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                    <h3 className="font-medium text-gray-700">Email Content</h3>
                  </div>
                  <div 
                    className="p-6 bg-white"
                    dangerouslySetInnerHTML={{ 
                      __html: formatEmailTemplate(selectedEmail.template, selectedEmail.data) 
                    }}
                  />
                </div>

                {/* Email Data */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                    <h3 className="font-medium text-gray-700">Template Data</h3>
                  </div>
                  <div className="p-4 bg-white">
                    <pre className="text-sm text-gray-600 overflow-auto max-h-40">
                      {JSON.stringify(selectedEmail.data, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      const formattedContent = formatEmailTemplate(selectedEmail.template, selectedEmail.data);
                      newWindow.document.write(`
                        <!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${selectedEmail.subject}</title>
                            <style>
                              * { margin: 0; padding: 0; box-sizing: border-box; }
                              body { 
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                                line-height: 1.6; 
                                color: #333; 
                                background: #f8fafc;
                                padding: 20px;
                              }
                              .email-container { 
                                max-width: 600px; 
                                margin: 0 auto; 
                                background: white;
                                border-radius: 12px;
                                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                                overflow: hidden;
                              }
                              .email-header {
                                background: linear-gradient(135deg, #0d9488, #7c3aed);
                                color: white;
                                padding: 30px;
                                text-align: center;
                              }
                              .email-header h1 {
                                font-size: 24px;
                                font-weight: 600;
                                margin-bottom: 10px;
                              }
                              .email-content { 
                                padding: 30px; 
                              }
                              .email-content h2 {
                                color: #1f2937;
                                margin-bottom: 15px;
                                font-size: 20px;
                              }
                              .email-content h3 {
                                color: #374151;
                                margin: 20px 0 10px 0;
                                font-size: 16px;
                              }
                              .email-content p {
                                margin-bottom: 15px;
                                color: #4b5563;
                              }
                              .email-content ul, .email-content ol {
                                margin: 15px 0;
                                padding-left: 20px;
                              }
                              .email-content li {
                                margin-bottom: 8px;
                                color: #4b5563;
                              }
                              .email-content strong {
                                color: #1f2937;
                                font-weight: 600;
                              }
                              .button { 
                                display: inline-block; 
                                background: #0d9488; 
                                color: white; 
                                padding: 12px 24px; 
                                text-decoration: none; 
                                border-radius: 8px; 
                                margin: 20px 0;
                                font-weight: 500;
                                transition: background-color 0.2s;
                              }
                              .button:hover { 
                                background: #0f766e; 
                              }
                              .email-footer { 
                                background: #f9fafb; 
                                padding: 20px 30px; 
                                text-align: center; 
                                font-size: 14px; 
                                color: #6b7280;
                                border-top: 1px solid #e5e7eb;
                              }
                              .email-meta {
                                background: #f3f4f6;
                                padding: 15px 30px;
                                border-bottom: 1px solid #e5e7eb;
                                font-size: 12px;
                                color: #6b7280;
                              }
                              .email-meta div {
                                margin-bottom: 5px;
                              }
                              .email-meta strong {
                                color: #374151;
                              }
                            </style>
                          </head>
                          <body>
                            <div class="email-container">
                              <div class="email-meta">
                                <div><strong>To:</strong> ${selectedEmail.to}</div>
                                <div><strong>Subject:</strong> ${selectedEmail.subject}</div>
                                <div><strong>Type:</strong> ${selectedEmail.type.replace('_', ' ').toUpperCase()}</div>
                                <div><strong>Status:</strong> ${selectedEmail.status.toUpperCase()}</div>
                                <div><strong>Sent:</strong> ${new Date(selectedEmail.timestamp).toLocaleString()}</div>
                              </div>
                              <div class="email-content">
                                ${formattedContent}
                              </div>
                              <div class="email-footer">
                                <p>© 2025 Global Edge. All rights reserved.</p>
                                <p>This email was sent to ${selectedEmail.to}. If you didn't request this, please ignore this email.</p>
                              </div>
                            </div>
                          </body>
                        </html>
                      `);
                      newWindow.document.close();
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <AdminAuthGuard requiredPermissions={['view_notifications']}>
      <NotificationsDashboard />
    </AdminAuthGuard>
  );
}
