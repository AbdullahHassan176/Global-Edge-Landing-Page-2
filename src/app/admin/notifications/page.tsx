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

  // Load notifications from service
  useEffect(() => {
    const loadNotifications = () => {
      setNotifications(notificationService.getAdminNotifications());
      setEmailNotifications(notificationService.getEmailNotifications());
      setWebhookNotifications(notificationService.getWebhookNotifications());
      setStats(notificationService.getNotificationStats());
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
                      onClick={() => {
                        const newWindow = window.open('', '_blank');
                        if (newWindow) {
                          newWindow.document.write(email.template);
                          newWindow.document.title = email.subject;
                        }
                      }}
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
          {activeTab === 'stats' && stats && (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Email Statistics */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Email Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Emails:</span>
                    <span className="font-semibold">{stats.emailStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sent:</span>
                    <span className="font-semibold text-green-600">{stats.emailStats.sent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Failed:</span>
                    <span className="font-semibold text-red-600">{stats.emailStats.failed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-semibold text-yellow-600">{stats.emailStats.pending}</span>
                  </div>
                </div>
              </div>

              {/* Webhook Statistics */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Webhook Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Webhooks:</span>
                    <span className="font-semibold">{stats.webhookStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sent:</span>
                    <span className="font-semibold text-green-600">{stats.webhookStats.sent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Failed:</span>
                    <span className="font-semibold text-red-600">{stats.webhookStats.failed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-semibold text-yellow-600">{stats.webhookStats.pending}</span>
                  </div>
                </div>
              </div>

              {/* Admin Statistics */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Admin Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Notifications:</span>
                    <span className="font-semibold">{stats.adminStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New:</span>
                    <span className="font-semibold text-red-600">{stats.adminStats.new}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviewed:</span>
                    <span className="font-semibold text-yellow-600">{stats.adminStats.reviewed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processed:</span>
                    <span className="font-semibold text-green-600">{stats.adminStats.processed}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
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
