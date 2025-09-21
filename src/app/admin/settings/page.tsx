'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  value: any;
  type: 'boolean' | 'string' | 'number' | 'select';
  options?: string[];
}

interface Integration {
  id: string;
  name: string;
  type: 'email' | 'webhook' | 'api' | 'payment';
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
  description: string;
}

// Mock settings data
const mockSettings: SystemSetting[] = [
  {
    id: '1',
    category: 'General',
    name: 'Site Name',
    description: 'The name of your platform',
    value: 'Global Edge',
    type: 'string'
  },
  {
    id: '2',
    category: 'General',
    name: 'Site Description',
    description: 'Brief description of your platform',
    value: 'Tokenized Asset Investment Platform',
    type: 'string'
  },
  {
    id: '3',
    category: 'General',
    name: 'Maintenance Mode',
    description: 'Enable maintenance mode to restrict access',
    value: false,
    type: 'boolean'
  },
  {
    id: '4',
    category: 'Email',
    name: 'SMTP Host',
    description: 'SMTP server hostname',
    value: 'smtp.gmail.com',
    type: 'string'
  },
  {
    id: '5',
    category: 'Email',
    name: 'SMTP Port',
    description: 'SMTP server port',
    value: 587,
    type: 'number'
  },
  {
    id: '6',
    category: 'Email',
    name: 'Email Notifications',
    description: 'Enable email notifications',
    value: true,
    type: 'boolean'
  },
  {
    id: '7',
    category: 'Security',
    name: 'Two-Factor Authentication',
    description: 'Require 2FA for admin accounts',
    value: true,
    type: 'boolean'
  },
  {
    id: '8',
    category: 'Security',
    name: 'Session Timeout',
    description: 'Session timeout in minutes',
    value: 30,
    type: 'select',
    options: ['15', '30', '60', '120']
  },
  {
    id: '9',
    category: 'API',
    name: 'API Rate Limit',
    description: 'Requests per minute per API key',
    value: 1000,
    type: 'number'
  },
  {
    id: '10',
    category: 'API',
    name: 'API Documentation',
    description: 'Enable public API documentation',
    value: false,
    type: 'boolean'
  }
];

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'SendGrid Email Service',
    type: 'email',
    status: 'active',
    lastSync: '2024-12-15T14:30:00Z',
    description: 'Primary email delivery service'
  },
  {
    id: '2',
    name: 'Stripe Payment Gateway',
    type: 'payment',
    status: 'active',
    lastSync: '2024-12-15T14:25:00Z',
    description: 'Payment processing integration'
  },
  {
    id: '3',
    name: 'Slack Notifications',
    type: 'webhook',
    status: 'active',
    lastSync: '2024-12-15T14:20:00Z',
    description: 'Admin notifications to Slack'
  },
  {
    id: '4',
    name: 'Analytics API',
    type: 'api',
    status: 'inactive',
    lastSync: '2024-12-14T10:15:00Z',
    description: 'Third-party analytics integration'
  }
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>(mockSettings);
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'security' | 'api' | 'integrations'>('general');
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (settingId: string, newValue: any) => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId ? { ...setting, value: newValue } : setting
    ));
    setHasChanges(true);
  };

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: integration.status === 'active' ? 'inactive' : 'active',
            lastSync: new Date().toISOString()
          } 
        : integration
    ));
  };

  const saveSettings = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success message
    alert('Settings saved successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return 'envelope';
      case 'webhook': return 'link';
      case 'api': return 'code';
      case 'payment': return 'credit-card';
      default: return 'cog';
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

  const filteredSettings = settings.filter(setting => {
    switch (activeTab) {
      case 'general': return setting.category === 'General';
      case 'email': return setting.category === 'Email';
      case 'security': return setting.category === 'Security';
      case 'api': return setting.category === 'API';
      default: return true;
    }
  });

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
              System Settings
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Configure system settings, integrations, and platform preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            {[
              { key: 'general', label: 'General', count: settings.filter(s => s.category === 'General').length },
              { key: 'email', label: 'Email', count: settings.filter(s => s.category === 'Email').length },
              { key: 'security', label: 'Security', count: settings.filter(s => s.category === 'Security').length },
              { key: 'api', label: 'API', count: settings.filter(s => s.category === 'API').length },
              { key: 'integrations', label: 'Integrations', count: integrations.length }
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
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Settings Content */}
          {activeTab !== 'integrations' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-poppins font-bold text-charcoal capitalize">
                  {activeTab} Settings
                </h2>
                {hasChanges && (
                  <button
                    onClick={saveSettings}
                    className="bg-global-teal text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Save Changes
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {filteredSettings.map((setting) => (
                  <div key={setting.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-charcoal mb-2">{setting.name}</h3>
                        <p className="text-gray-600 mb-4">{setting.description}</p>
                      </div>
                      <div className="ml-6">
                        {setting.type === 'boolean' && (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={setting.value}
                              onChange={(e) => updateSetting(setting.id, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                          </label>
                        )}
                        {setting.type === 'string' && (
                          <input
                            type="text"
                            value={setting.value}
                            onChange={(e) => updateSetting(setting.id, e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent w-64"
                          />
                        )}
                        {setting.type === 'number' && (
                          <input
                            type="number"
                            value={setting.value}
                            onChange={(e) => updateSetting(setting.id, parseInt(e.target.value))}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent w-32"
                          />
                        )}
                        {setting.type === 'select' && (
                          <select
                            value={setting.value.toString()}
                            onChange={(e) => updateSetting(setting.id, e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                          >
                            {setting.options?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              {integrations.map((integration) => (
                <div key={integration.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon name={getTypeIcon(integration.type)} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-charcoal">{integration.name}</h3>
                        <p className="text-gray-600">{integration.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(integration.status)}`}>
                            {integration.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">
                            Last sync: {formatDate(integration.lastSync)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={integration.status === 'active'}
                          onChange={() => toggleIntegration(integration.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                      </label>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* System Information */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-poppins font-bold text-charcoal mb-6">System Information</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Platform Version</h3>
                <p className="text-gray-600">v2.1.0</p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Database Version</h3>
                <p className="text-gray-600">PostgreSQL 14.5</p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Server Environment</h3>
                <p className="text-gray-600">Production</p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Last Backup</h3>
                <p className="text-gray-600">2024-12-15 02:00:00</p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Uptime</h3>
                <p className="text-gray-600">99.9%</p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Memory Usage</h3>
                <p className="text-gray-600">2.1 GB / 8 GB</p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-8">
            <h2 className="text-2xl font-poppins font-bold text-red-800 mb-6">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-800">Clear All Cache</h3>
                  <p className="text-red-600">Clear all cached data and force refresh</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Clear Cache
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-800">Reset All Settings</h3>
                  <p className="text-red-600">Reset all settings to default values</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Reset Settings
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-800">System Maintenance</h3>
                  <p className="text-red-600">Put the system in maintenance mode</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Enable Maintenance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
