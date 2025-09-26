'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { exceptionsClient, Exception, EXCEPTION_TYPE_MAPPING, SEVERITY_COLORS } from '@/lib/exceptions';

interface NotificationCenterProps {
  userId?: string;
  showHighPriority?: boolean;
}

interface HighPriorityException extends Exception {
  friendlyTitle: string;
  friendlyDescription: string;
  severityColor: string;
  timeAgo: string;
}

export default function NotificationCenter({ 
  userId, 
  showHighPriority = true 
}: NotificationCenterProps) {
  const [highPriorityExceptions, setHighPriorityExceptions] = useState<HighPriorityException[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exceptionsAvailable, setExceptionsAvailable] = useState(true);

  // Regular notifications (existing functionality)
  const [regularNotifications] = useState([
    {
      id: 'notif-001',
      title: 'New asset available',
      message: 'Container #GE-2024-001 is now available for investment',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      type: 'info' as const
    },
    {
      id: 'notif-002',
      title: 'Investment confirmed',
      message: 'Your investment in Property Token #PT-2024-003 has been confirmed',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      type: 'success' as const
    },
    {
      id: 'notif-003',
      title: 'Monthly report ready',
      message: 'Your monthly investment report is ready for download',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      type: 'info' as const
    }
  ]);

  useEffect(() => {
    if (showHighPriority && exceptionsAvailable) {
      loadHighPriorityExceptions();
    }
  }, [showHighPriority, exceptionsAvailable, userId]);

  const loadHighPriorityExceptions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await exceptionsClient.getExceptions({
        ownerOnly: true,
        severity: ['HIGH', 'CRITICAL'],
        limit: 5
      });

      const highPriorityExceptions = response.exceptions
        .filter(exc => exc.type === 'SLA_BREACH' || exc.type === 'DOC_MISMATCH')
        .map(exc => ({
          ...exc,
          friendlyTitle: EXCEPTION_TYPE_MAPPING[exc.type]?.title || exc.type,
          friendlyDescription: EXCEPTION_TYPE_MAPPING[exc.type]?.description || exc.message,
          severityColor: SEVERITY_COLORS[exc.severity] || SEVERITY_COLORS.MEDIUM,
          timeAgo: formatTimeAgo(new Date(exc.occurredAt))
        }));

      setHighPriorityExceptions(highPriorityExceptions);
    } catch (err) {
      console.error('Error loading high priority exceptions:', err);
      setError('Failed to load high priority notifications');
      setExceptionsAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'SLA_BREACH': return 'exclamation-triangle';
      case 'DOC_MISMATCH': return 'document-text';
      case 'COMPLIANCE_VIOLATION': return 'shield-check';
      case 'AUDIT_FAILURE': return 'clipboard';
      default: return 'bell';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'SLA_BREACH': return 'text-red-600';
      case 'DOC_MISMATCH': return 'text-orange-600';
      case 'COMPLIANCE_VIOLATION': return 'text-yellow-600';
      case 'AUDIT_FAILURE': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {/* High Priority Section */}
        {showHighPriority && exceptionsAvailable && (
          <>
            {loading ? (
              <div className="p-4 text-center">
                <Icon name="arrow-path" className="animate-spin h-5 w-5 mx-auto text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Loading high priority notifications...</p>
              </div>
            ) : error ? (
              <div className="p-4 text-center">
                <Icon name="exclamation-triangle" className="h-5 w-5 mx-auto text-red-400" />
                <p className="text-sm text-red-600 mt-2">{error}</p>
              </div>
            ) : highPriorityExceptions.length > 0 ? (
              <>
                <div className="px-4 py-2 bg-red-50 border-b border-red-200">
                  <div className="flex items-center">
                    <Icon name="exclamation-triangle" className="h-4 w-4 text-red-600 mr-2" />
                    <h4 className="text-sm font-semibold text-red-800">High Priority</h4>
                  </div>
                </div>
                
                {highPriorityExceptions.map((exception) => (
                  <div key={exception.id} className="p-4 border-b border-red-100 bg-red-50/50 hover:bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Icon 
                            name={getNotificationIcon(exception.type)} 
                            className={`h-4 w-4 mr-2 ${getNotificationColor(exception.type)}`} 
                          />
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${exception.severityColor}`}>
                            {exception.severity}
                          </span>
                        </div>
                        
                        <h5 className="text-sm font-semibold text-gray-900 mb-1">
                          {exception.friendlyTitle}
                        </h5>
                        
                        <p className="text-sm text-gray-700 mb-2">
                          {exception.assetName}
                        </p>
                        
                        <p className="text-xs text-gray-600 mb-3">
                          {exception.friendlyDescription}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {exception.timeAgo}
                          </span>
                          
                          <Link 
                            href={`/assets/${exception.assetKey}`}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                          >
                            <Icon name="eye" className="h-3 w-3 mr-1" />
                            View Asset
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </>
        )}

        {/* Regular Notifications */}
        {regularNotifications.length > 0 && (
          <>
            {highPriorityExceptions.length > 0 && (
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700">Recent Activity</h4>
              </div>
            )}
            
            {regularNotifications.map((notification) => (
              <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <Icon 
                      name={notification.type === 'success' ? 'check-circle' : 'bell'} 
                      className={`h-4 w-4 ${
                        notification.type === 'success' ? 'text-green-600' : 'text-blue-600'
                      }`} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(notification.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Empty State */}
        {highPriorityExceptions.length === 0 && regularNotifications.length === 0 && !loading && (
          <div className="p-8 text-center">
            <Icon name="bell" className="h-8 w-8 mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-500">No notifications</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/admin/notifications" 
          className="text-sm text-global-teal hover:text-edge-purple transition-colors"
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
}
