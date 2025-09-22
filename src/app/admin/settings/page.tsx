'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import IntegrationConfigModal from '@/components/admin/IntegrationConfigModal';
import SettingsBackupModal from '@/components/admin/SettingsBackupModal';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';
import Link from 'next/link';
import { settingsService, SystemSetting, Integration, SettingsBackup } from '@/lib/settingsService';

function SettingsDashboard() {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [backups, setBackups] = useState<SettingsBackup[]>([]);
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'security' | 'api' | 'integrations'>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isTestingIntegration, setIsTestingIntegration] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      const loadedSettings = settingsService.getSettings();
      const loadedIntegrations = settingsService.getIntegrations();
      const loadedBackups = settingsService.getBackups();
      
      setSettings(loadedSettings);
      setIntegrations(loadedIntegrations);
      setBackups(loadedBackups);
    } catch (error) {
      console.error('Error loading settings:', error);
      addNotification({
        type: 'error',
        title: 'Loading Error',
        message: 'Failed to load settings data. Please refresh the page.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = (settingId: string, newValue: any) => {
    const success = settingsService.updateSetting(settingId, newValue, 'admin');
    if (success) {
      setSettings(prev => prev.map(setting => 
        setting.id === settingId ? { ...setting, value: newValue } : setting
      ));
      setHasChanges(true);
      
      addNotification({
        type: 'success',
        title: 'Setting Updated',
        message: 'Setting has been updated successfully.',
        duration: 3000
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update setting. Please try again.',
        duration: 5000
      });
    }
  };

  const saveSettings = () => {
    // Settings are already saved when updated, just clear the changes flag
    setHasChanges(false);
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'All settings have been saved successfully.',
      duration: 3000
    });
  };

  const toggleIntegration = (integrationId: string) => {
    const success = settingsService.toggleIntegration(integrationId);
    if (success) {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: integration.status === 'active' ? 'inactive' : 'active',
              lastSync: new Date().toISOString()
            } 
          : integration
      ));
      
      const integration = integrations.find(i => i.id === integrationId);
      addNotification({
        type: 'success',
        title: 'Integration Updated',
        message: `${integration?.name} has been ${integration?.status === 'active' ? 'deactivated' : 'activated'}.`,
        duration: 3000
      });
    }
  };

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowIntegrationModal(true);
  };

  const handleSaveIntegration = (updatedIntegration: Integration) => {
    const success = settingsService.updateIntegration(updatedIntegration.id, updatedIntegration);
    if (success) {
      setIntegrations(prev => prev.map(integration => 
        integration.id === updatedIntegration.id ? updatedIntegration : integration
      ));
      addNotification({
        type: 'success',
        title: 'Integration Updated',
        message: `${updatedIntegration.name} configuration has been saved.`,
        duration: 3000
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Save Failed',
        message: 'Failed to save integration configuration.',
        duration: 5000
      });
    }
  };

  const handleTestIntegration = async (integrationId: string) => {
    setIsTestingIntegration(true);
    try {
      const result = await settingsService.testIntegration(integrationId);
      
      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Connection Test Successful',
          message: `Integration is working properly. Response time: ${result.responseTime}ms`,
          duration: 5000
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Connection Test Failed',
          message: result.error || 'Integration connection failed.',
          duration: 5000
        });
      }
      
      // Reload integrations to get updated health status
      setIntegrations(settingsService.getIntegrations());
      
      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Test failed'
      };
      addNotification({
        type: 'error',
        title: 'Test Error',
        message: errorResult.error,
        duration: 5000
      });
      return errorResult;
    } finally {
      setIsTestingIntegration(false);
    }
  };

  const handleCreateBackup = (name: string, description: string) => {
    try {
      const backupId = settingsService.createBackup(name, description, 'admin');
      setBackups(settingsService.getBackups());
      addNotification({
        type: 'success',
        title: 'Backup Created',
        message: `Backup "${name}" has been created successfully.`,
        duration: 3000
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Backup Failed',
        message: 'Failed to create backup. Please try again.',
        duration: 5000
      });
    }
  };

  const handleRestoreBackup = (backupId: string) => {
    const success = settingsService.restoreFromBackup(backupId);
    if (success) {
      loadData(); // Reload all data
      addNotification({
        type: 'success',
        title: 'Backup Restored',
        message: 'Settings have been restored from backup successfully.',
        duration: 5000
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Restore Failed',
        message: 'Failed to restore backup. Please try again.',
        duration: 5000
      });
    }
  };

  const handleDeleteBackup = (backupId: string) => {
    // This would need to be implemented in the settings service
    addNotification({
      type: 'info',
      title: 'Feature Coming Soon',
      message: 'Backup deletion will be available in the next update.',
      duration: 3000
    });
  };

  const handleExportSettings = () => {
    return settingsService.exportSettings();
  };

  const handleImportSettings = (jsonData: string) => {
    const result = settingsService.importSettings(jsonData);
    if (result.success) {
      loadData(); // Reload all data
      addNotification({
        type: 'success',
        title: 'Import Successful',
        message: 'Settings have been imported successfully.',
        duration: 5000
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Import Failed',
        message: result.error || 'Failed to import settings.',
        duration: 5000
      });
    }
    return result;
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      settingsService.resetToDefaults();
      loadData();
      addNotification({
        type: 'success',
        title: 'Settings Reset',
        message: 'All settings have been reset to default values.',
        duration: 5000
      });
    }
  };

  const handleClearCache = () => {
    settingsService.clearCache();
    addNotification({
      type: 'success',
      title: 'Cache Cleared',
      message: 'All cached data has been cleared successfully.',
      duration: 3000
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return 'envelope';
      case 'webhook': return 'link';
      case 'api': return 'code';
      case 'payment': return 'credit-card';
      case 'analytics': return 'chart-bar';
      case 'storage': return 'cloud';
      case 'notification': return 'bell';
      default: return 'cog';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="spinner" className="animate-spin text-global-teal text-4xl mb-4" />
          <p className="text-lg text-gray-700">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Integration Configuration Modal */}
      <IntegrationConfigModal
        isOpen={showIntegrationModal}
        onClose={() => setShowIntegrationModal(false)}
        integration={selectedIntegration}
        onSave={handleSaveIntegration}
        onTest={handleTestIntegration}
      />

      {/* Settings Backup Modal */}
      <SettingsBackupModal
        isOpen={showBackupModal}
        onClose={() => setShowBackupModal(false)}
        backups={backups}
        onCreateBackup={handleCreateBackup}
        onRestoreBackup={handleRestoreBackup}
        onDeleteBackup={handleDeleteBackup}
        onExportSettings={handleExportSettings}
        onImportSettings={handleImportSettings}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/admin" 
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <Icon name="arrow-left" className="mr-2" />
              Back to Admin
            </Link>
            <button
              onClick={() => setShowBackupModal(true)}
              className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <Icon name="archive" className="mr-2" />
              Backup & Restore
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              System Settings
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Configure system settings, integrations, and platform preferences with real-time validation and comprehensive management tools.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { key: 'general', label: 'General', count: settings.filter(s => s.category === 'General').length, icon: 'cog' },
              { key: 'email', label: 'Email', count: settings.filter(s => s.category === 'Email').length, icon: 'envelope' },
              { key: 'security', label: 'Security', count: settings.filter(s => s.category === 'Security').length, icon: 'shield-halved' },
              { key: 'api', label: 'API', count: settings.filter(s => s.category === 'API').length, icon: 'code' },
              { key: 'integrations', label: 'Integrations', count: integrations.length, icon: 'link' }
            ].map(({ key, label, count, icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-global-teal text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                <Icon name={icon} className="mr-2" />
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Settings Content */}
          {activeTab !== 'integrations' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-poppins font-bold text-charcoal capitalize">
                    {activeTab} Settings
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Configure {activeTab} settings with real-time validation
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {hasChanges && (
                    <button
                      onClick={saveSettings}
                      className="bg-global-teal text-white px-6 py-2 rounded-lg font-semibold hover:bg-global-teal-dark transition-colors flex items-center"
                    >
                      <Icon name="check" className="mr-2" />
                      Save Changes
                    </button>
                  )}
                  <button
                    onClick={() => setShowBackupModal(true)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <Icon name="archive" className="mr-2" />
                    Backup
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {filteredSettings.map((setting) => (
                  <div key={setting.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-charcoal">{setting.name}</h3>
                          {setting.required && (
                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                              Required
                            </span>
                          )}
                          {setting.sensitive && (
                            <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">
                              Sensitive
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{setting.description}</p>
                        {setting.lastModified && (
                          <p className="text-xs text-gray-500">
                            Last modified: {formatDate(setting.lastModified)} by {setting.modifiedBy}
                          </p>
                        )}
                      </div>
                      <div className="ml-6 flex-shrink-0">
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
                            placeholder={`Enter ${setting.name.toLowerCase()}`}
                          />
                        )}
                        {setting.type === 'password' && (
                          <input
                            type="password"
                            value={setting.value}
                            onChange={(e) => updateSetting(setting.id, e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent w-64"
                            placeholder="Enter password"
                          />
                        )}
                        {setting.type === 'textarea' && (
                          <textarea
                            value={setting.value}
                            onChange={(e) => updateSetting(setting.id, e.target.value)}
                            rows={3}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent w-64"
                            placeholder={`Enter ${setting.name.toLowerCase()}`}
                          />
                        )}
                        {setting.type === 'number' && (
                          <input
                            type="number"
                            value={setting.value}
                            onChange={(e) => updateSetting(setting.id, parseInt(e.target.value))}
                            min={setting.validation?.min}
                            max={setting.validation?.max}
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
                        {setting.type === 'json' && (
                          <textarea
                            value={JSON.stringify(setting.value, null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                updateSetting(setting.id, parsed);
                              } catch (error) {
                                // Invalid JSON, don't update
                              }
                            }}
                            rows={4}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent w-64 font-mono text-sm"
                            placeholder="Enter JSON configuration"
                          />
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
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-poppins font-bold text-charcoal">
                      Integrations Management
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Configure and manage third-party integrations and services
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowBackupModal(true)}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center"
                    >
                      <Icon name="archive" className="mr-2" />
                      Backup
                    </button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon name={getTypeIcon(integration.type)} className="text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-charcoal">{integration.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(integration.status)}`}>
                                {integration.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{integration.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Last sync: {formatDate(integration.lastSync)}</span>
                              {integration.healthCheck && (
                                <div className="flex items-center">
                                  <Icon 
                                    name={integration.healthCheck.status === 'healthy' ? 'check-circle' : 
                                          integration.healthCheck.status === 'warning' ? 'exclamation-triangle' : 'x-circle'} 
                                    className={`mr-1 ${getHealthStatusColor(integration.healthCheck.status)}`} 
                                  />
                                  <span className={getHealthStatusColor(integration.healthCheck.status)}>
                                    {integration.healthCheck.status}
                                  </span>
                                  {integration.healthCheck.responseTime && (
                                    <span className="ml-2">
                                      ({integration.healthCheck.responseTime}ms)
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            {integration.healthCheck?.error && (
                              <p className="text-red-600 text-sm mt-1">
                                Error: {integration.healthCheck.error}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleTestIntegration(integration.id)}
                            disabled={isTestingIntegration}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors disabled:opacity-50 flex items-center"
                          >
                            {isTestingIntegration ? (
                              <Icon name="clock" className="animate-spin mr-1" />
                            ) : (
                              <Icon name="play" className="mr-1" />
                            )}
                            Test
                          </button>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={integration.status === 'active'}
                              onChange={() => toggleIntegration(integration.id)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-global-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-global-teal"></div>
                          </label>
                          <button 
                            onClick={() => handleConfigureIntegration(integration)}
                            className="px-4 py-2 bg-global-teal text-white rounded-lg text-sm hover:bg-global-teal-dark transition-colors flex items-center"
                          >
                            <Icon name="cog" className="mr-1" />
                            Configure
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* System Information */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-poppins font-bold text-charcoal mb-6">System Information</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Icon name="tag" className="text-global-teal mr-2" />
                  <h3 className="font-semibold text-charcoal">Platform Version</h3>
                </div>
                <p className="text-gray-600">v2.1.0</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Icon name="database" className="text-global-teal mr-2" />
                  <h3 className="font-semibold text-charcoal">Database Version</h3>
                </div>
                <p className="text-gray-600">PostgreSQL 14.5</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Icon name="server" className="text-global-teal mr-2" />
                  <h3 className="font-semibold text-charcoal">Server Environment</h3>
                </div>
                <p className="text-gray-600">Production</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Icon name="archive" className="text-global-teal mr-2" />
                  <h3 className="font-semibold text-charcoal">Last Backup</h3>
                </div>
                <p className="text-gray-600">2024-12-15 02:00:00</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Icon name="chart-line" className="text-global-teal mr-2" />
                  <h3 className="font-semibold text-charcoal">Uptime</h3>
                </div>
                <p className="text-gray-600">99.9%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Icon name="memory" className="text-global-teal mr-2" />
                  <h3 className="font-semibold text-charcoal">Memory Usage</h3>
                </div>
                <p className="text-gray-600">2.1 GB / 8 GB</p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Icon name="exclamation-triangle" className="text-red-600 mr-3" />
              <h2 className="text-2xl font-poppins font-bold text-red-800">Danger Zone</h2>
            </div>
            <p className="text-red-700 mb-6">
              These actions are irreversible and can affect your entire system. Use with extreme caution.
            </p>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                <div className="flex items-center">
                  <Icon name="trash" className="text-red-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-red-800">Clear All Cache</h3>
                    <p className="text-red-600">Clear all cached data and force refresh</p>
                  </div>
                </div>
                <button 
                  onClick={handleClearCache}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Icon name="trash" className="mr-2" />
                  Clear Cache
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                <div className="flex items-center">
                  <Icon name="arrow-clockwise" className="text-red-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-red-800">Reset All Settings</h3>
                    <p className="text-red-600">Reset all settings to default values</p>
                  </div>
                </div>
                <button 
                  onClick={handleResetToDefaults}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Icon name="arrow-clockwise" className="mr-2" />
                  Reset Settings
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                <div className="flex items-center">
                  <Icon name="wrench" className="text-red-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-red-800">System Maintenance</h3>
                    <p className="text-red-600">Put the system in maintenance mode</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const maintenanceSetting = settings.find(s => s.id === 'maintenance_mode');
                    if (maintenanceSetting) {
                      updateSetting('maintenance_mode', !maintenanceSetting.value);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Icon name="wrench" className="mr-2" />
                  Toggle Maintenance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AdminAuthGuard requiredPermissions={['view_settings']}>
      <SettingsDashboard />
    </AdminAuthGuard>
  );
}
