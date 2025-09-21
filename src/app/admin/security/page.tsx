'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';

interface SecurityEvent {
  id: string;
  type: 'login' | 'failed_login' | 'suspicious_activity' | 'data_access' | 'system_change';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  user: string;
  ip: string;
  location: string;
  timestamp: string;
  status: 'investigating' | 'resolved' | 'false_positive';
}

interface AccessLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  timestamp: string;
  success: boolean;
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  responseTime: number;
  errorRate: number;
  activeConnections: number;
  lastBackup: string;
  sslExpiry: string;
}

// Mock security data
const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'failed_login',
    severity: 'medium',
    description: 'Multiple failed login attempts detected',
    user: 'unknown@example.com',
    ip: '192.168.1.100',
    location: 'New York, US',
    timestamp: '2024-12-15T14:30:00Z',
    status: 'investigating'
  },
  {
    id: '2',
    type: 'suspicious_activity',
    severity: 'high',
    description: 'Unusual data access pattern detected',
    user: 'john.doe@example.com',
    ip: '10.0.0.50',
    location: 'San Francisco, US',
    timestamp: '2024-12-15T12:15:00Z',
    status: 'investigating'
  },
  {
    id: '3',
    type: 'login',
    severity: 'low',
    description: 'Successful admin login',
    user: 'admin@globaledge.com',
    ip: '172.16.0.10',
    location: 'London, UK',
    timestamp: '2024-12-15T10:45:00Z',
    status: 'resolved'
  },
  {
    id: '4',
    type: 'system_change',
    severity: 'medium',
    description: 'User permissions modified',
    user: 'admin@globaledge.com',
    ip: '172.16.0.10',
    location: 'London, UK',
    timestamp: '2024-12-15T09:20:00Z',
    status: 'resolved'
  }
];

const mockAccessLogs: AccessLog[] = [
  {
    id: '1',
    user: 'john.doe@example.com',
    action: 'view_dashboard',
    resource: '/dashboard',
    ip: '192.168.1.100',
    timestamp: '2024-12-15T14:30:00Z',
    success: true
  },
  {
    id: '2',
    user: 'jane.smith@company.com',
    action: 'download_report',
    resource: '/reports/investment-summary.pdf',
    ip: '10.0.0.50',
    timestamp: '2024-12-15T13:45:00Z',
    success: true
  },
  {
    id: '3',
    user: 'unknown@example.com',
    action: 'login_attempt',
    resource: '/login',
    ip: '203.0.113.1',
    timestamp: '2024-12-15T12:30:00Z',
    success: false
  },
  {
    id: '4',
    user: 'admin@globaledge.com',
    action: 'modify_user',
    resource: '/admin/users/123',
    ip: '172.16.0.10',
    timestamp: '2024-12-15T11:15:00Z',
    success: true
  }
];

const mockSystemHealth: SystemHealth = {
  status: 'healthy',
  uptime: '99.9%',
  responseTime: 120,
  errorRate: 0.1,
  activeConnections: 1247,
  lastBackup: '2024-12-15T02:00:00Z',
  sslExpiry: '2025-06-15T00:00:00Z'
};

export default function SecurityCenterPage() {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(mockSecurityEvents);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>(mockAccessLogs);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>(mockSystemHealth);
  const [activeTab, setActiveTab] = useState<'events' | 'logs' | 'health' | 'settings'>('events');
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);

  const filteredEvents = securityEvents.filter(event => 
    filter === 'all' || event.severity === filter
  );

  const handleViewDetails = (event: SecurityEvent) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return 'user';
      case 'failed_login': return 'exclamation-triangle';
      case 'suspicious_activity': return 'shield-halved';
      case 'data_access': return 'eye';
      case 'system_change': return 'cog';
      default: return 'bell';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const updateEventStatus = (eventId: string, newStatus: string) => {
    setSecurityEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, status: newStatus as any } : event
    ));
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/admin" 
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <Icon name="arrow-left" className="mr-2" />
              Back to Admin
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Security Center
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Monitor security events, access logs, and system integrity across the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Security Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Security Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="exclamation-triangle" className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">
                    {securityEvents.filter(e => e.severity === 'critical' || e.severity === 'high').length}
                  </h3>
                  <p className="text-gray-600">High Priority Events</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="clock" className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">
                    {securityEvents.filter(e => e.status === 'investigating').length}
                  </h3>
                  <p className="text-gray-600">Under Investigation</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="check-circle" className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">
                    {accessLogs.filter(l => l.success).length}
                  </h3>
                  <p className="text-gray-600">Successful Actions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Icon name="shield-halved" className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-charcoal">
                    {systemHealth.uptime}
                  </h3>
                  <p className="text-gray-600">System Uptime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            {[
              { key: 'events', label: 'Security Events', count: securityEvents.length },
              { key: 'logs', label: 'Access Logs', count: accessLogs.length },
              { key: 'health', label: 'System Health', count: null },
              { key: 'settings', label: 'Security Settings', count: null }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-global-teal text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label} {count !== null && `(${count})`}
              </button>
            ))}
          </div>

          {/* Security Events Tab */}
          {activeTab === 'events' && (
            <>
              {/* Event Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <div className="flex flex-wrap gap-4">
                  {[
                    { key: 'all', label: 'All Events', count: securityEvents.length },
                    { key: 'critical', label: 'Critical', count: securityEvents.filter(e => e.severity === 'critical').length },
                    { key: 'high', label: 'High', count: securityEvents.filter(e => e.severity === 'high').length },
                    { key: 'medium', label: 'Medium', count: securityEvents.filter(e => e.severity === 'medium').length },
                    { key: 'low', label: 'Low', count: securityEvents.filter(e => e.severity === 'low').length }
                  ].map(({ key, label, count }) => (
                    <button
                      key={key}
                      onClick={() => setFilter(key as any)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filter === key
                          ? 'bg-edge-purple text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {label} ({count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Events List */}
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name={getEventIcon(event.type)} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-charcoal">{event.description}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(event.severity)}`}>
                              {event.severity.toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                              {event.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">User:</span> {event.user}
                            </div>
                            <div>
                              <span className="font-medium">IP:</span> {event.ip}
                            </div>
                            <div>
                              <span className="font-medium">Location:</span> {event.location}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span> {formatDate(event.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <select
                          value={event.status}
                          onChange={(e) => updateEventStatus(event.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-global-teal focus:border-transparent"
                        >
                          <option value="investigating">Investigating</option>
                          <option value="resolved">Resolved</option>
                          <option value="false_positive">False Positive</option>
                        </select>
                        <button 
                          onClick={() => handleViewDetails(event)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Access Logs Tab */}
          {activeTab === 'logs' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Resource</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">IP Address</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {accessLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{log.action.replace('_', ' ')}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{log.resource}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{log.ip}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatDate(log.timestamp)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {log.success ? 'Success' : 'Failed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* System Health Tab */}
          {activeTab === 'health' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-6">System Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Overall Status</span>
                    <span className={`font-semibold ${getHealthColor(systemHealth.status)}`}>
                      {systemHealth.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-semibold text-charcoal">{systemHealth.uptime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold text-charcoal">{systemHealth.responseTime}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Error Rate</span>
                    <span className="font-semibold text-charcoal">{systemHealth.errorRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Connections</span>
                    <span className="font-semibold text-charcoal">{systemHealth.activeConnections}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-poppins font-semibold text-charcoal mb-6">Security Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Backup</span>
                    <span className="font-semibold text-charcoal">{formatDate(systemHealth.lastBackup)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">SSL Certificate</span>
                    <span className="font-semibold text-green-600">Valid</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">SSL Expiry</span>
                    <span className="font-semibold text-charcoal">{formatDate(systemHealth.sslExpiry)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Firewall Status</span>
                    <span className="font-semibold text-green-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Intrusion Detection</span>
                    <span className="font-semibold text-green-600">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-8">Security Settings</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-charcoal mb-4">Authentication</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Two-Factor Authentication</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Password Complexity</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-charcoal mb-4">Access Control</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">IP Whitelisting</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Session Timeout</span>
                      <select className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-global-teal focus:border-transparent">
                        <option value="15">15 minutes</option>
                        <option value="30" selected>30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-charcoal mb-4">Monitoring</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Real-time Alerts</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Log Retention</span>
                      <select className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-global-teal focus:border-transparent">
                        <option value="30">30 days</option>
                        <option value="90" selected>90 days</option>
                        <option value="365">1 year</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button className="bg-global-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Security Event Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Security Event Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon name="times" className="text-xl" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedEvent.severity === 'critical' ? 'bg-red-100' :
                  selectedEvent.severity === 'high' ? 'bg-orange-100' :
                  selectedEvent.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <Icon 
                    name={selectedEvent.type === 'failed_login' ? 'exclamation-triangle' : 'shield-halved'} 
                    className={`text-2xl ${
                      selectedEvent.severity === 'critical' ? 'text-red-600' :
                      selectedEvent.severity === 'high' ? 'text-orange-600' :
                      selectedEvent.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`} 
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-charcoal">{selectedEvent.type.replace('_', ' ').toUpperCase()}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(selectedEvent.severity)}`}>
                    {selectedEvent.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-charcoal bg-gray-50 p-4 rounded-lg">{selectedEvent.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
                  <p className="text-charcoal font-semibold">{selectedEvent.user}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IP Address</label>
                  <p className="text-charcoal font-semibold">{selectedEvent.ip}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <p className="text-charcoal font-semibold">{selectedEvent.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timestamp</label>
                  <p className="text-charcoal font-semibold">{new Date(selectedEvent.timestamp).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedEvent.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    selectedEvent.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedEvent.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-global-teal text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
