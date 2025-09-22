'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { SettingsBackup } from '@/lib/settingsService';

interface SettingsBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  backups: SettingsBackup[];
  onCreateBackup: (name: string, description: string) => void;
  onRestoreBackup: (backupId: string) => void;
  onDeleteBackup: (backupId: string) => void;
  onExportSettings: () => string;
  onImportSettings: (jsonData: string) => { success: boolean; error?: string };
}

export default function SettingsBackupModal({
  isOpen,
  onClose,
  backups,
  onCreateBackup,
  onRestoreBackup,
  onDeleteBackup,
  onExportSettings,
  onImportSettings
}: SettingsBackupModalProps) {
  const [activeTab, setActiveTab] = useState<'backups' | 'export' | 'import'>('backups');
  const [backupName, setBackupName] = useState('');
  const [backupDescription, setBackupDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; error?: string } | null>(null);

  if (!isOpen) return null;

  const handleCreateBackup = async () => {
    if (!backupName.trim()) return;
    
    setIsCreating(true);
    try {
      await onCreateBackup(backupName, backupDescription);
      setBackupName('');
      setBackupDescription('');
    } catch (error) {
      console.error('Error creating backup:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleImportSettings = async () => {
    if (!importData.trim()) return;
    
    setIsImporting(true);
    setImportResult(null);
    
    try {
      const result = onImportSettings(importData);
      setImportResult(result);
      
      if (result.success) {
        setImportData('');
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      setImportResult({
        success: false,
        error: error instanceof Error ? error.message : 'Import failed'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleExportDownload = () => {
    const data = onExportSettings();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `global-edge-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Settings Backup & Restore
              </h2>
              <p className="text-gray-600 mt-1">
                Manage settings backups and import/export configurations
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="x-mark" className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('backups')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'backups'
                  ? 'border-global-teal text-global-teal bg-global-teal/5'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="archive" className="mr-2" />
                Backups ({backups.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'export'
                  ? 'border-global-teal text-global-teal bg-global-teal/5'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="arrow-down-tray" className="mr-2" />
                Export
              </div>
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'import'
                  ? 'border-global-teal text-global-teal bg-global-teal/5'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="arrow-up-tray" className="mr-2" />
                Import
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'backups' && (
            <div className="space-y-6">
              {/* Create New Backup */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Backup</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Backup Name
                    </label>
                    <input
                      type="text"
                      value={backupName}
                      onChange={(e) => setBackupName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="e.g., Production Settings v2.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={backupDescription}
                      onChange={(e) => setBackupDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                      placeholder="Describe what this backup contains..."
                    />
                  </div>
                  <button
                    onClick={handleCreateBackup}
                    disabled={!backupName.trim() || isCreating}
                    className="px-4 py-2 bg-global-teal text-white rounded-lg hover:bg-global-teal-dark transition-colors disabled:opacity-50"
                  >
                    {isCreating ? 'Creating...' : 'Create Backup'}
                  </button>
                </div>
              </div>

              {/* Existing Backups */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Backups</h3>
                {backups.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="archive" className="text-gray-400 text-4xl mx-auto mb-4" />
                    <p className="text-gray-600">No backups found. Create your first backup above.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {backups.map((backup) => (
                      <div key={backup.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{backup.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{backup.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>Created: {formatDate(backup.createdAt)}</span>
                              <span>By: {backup.createdBy}</span>
                              <span>Version: {backup.version}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onRestoreBackup(backup.id)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                            >
                              Restore
                            </button>
                            <button
                              onClick={() => onDeleteBackup(backup.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <Icon name="arrow-down-tray" className="text-global-teal text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Settings</h3>
                <p className="text-gray-600 mb-6">
                  Download a JSON file containing all your current settings and integrations.
                </p>
                <button
                  onClick={handleExportDownload}
                  className="px-6 py-3 bg-global-teal text-white rounded-lg hover:bg-global-teal-dark transition-colors"
                >
                  Download Settings File
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Icon name="exclamation-triangle" className="text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Security Notice</h4>
                    <p className="text-sm text-yellow-700">
                      The exported file contains sensitive information like API keys and credentials. 
                      Keep it secure and don't share it with unauthorized parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Settings JSON
                    </label>
                    <textarea
                      value={importData}
                      onChange={(e) => setImportData(e.target.value)}
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent font-mono text-sm"
                      placeholder="Paste your settings JSON here..."
                    />
                  </div>

                  {importResult && (
                    <div className={`p-4 rounded-lg ${
                      importResult.success 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center">
                        <Icon 
                          name={importResult.success ? 'check-circle' : 'x-circle'} 
                          className={`mr-2 ${importResult.success ? 'text-green-600' : 'text-red-600'}`} 
                        />
                        <div>
                          <p className={`font-medium ${importResult.success ? 'text-green-800' : 'text-red-800'}`}>
                            {importResult.success ? 'Import Successful' : 'Import Failed'}
                          </p>
                          {importResult.error && (
                            <p className="text-sm text-red-600">{importResult.error}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleImportSettings}
                    disabled={!importData.trim() || isImporting}
                    className="px-4 py-2 bg-global-teal text-white rounded-lg hover:bg-global-teal-dark transition-colors disabled:opacity-50"
                  >
                    {isImporting ? 'Importing...' : 'Import Settings'}
                  </button>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Icon name="exclamation-triangle" className="text-red-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 mb-1">Warning</h4>
                    <p className="text-sm text-red-700">
                      Importing settings will overwrite your current configuration. 
                      Make sure to create a backup before importing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {activeTab === 'backups' && `${backups.length} backup(s) available`}
              {activeTab === 'export' && 'Export all settings and integrations'}
              {activeTab === 'import' && 'Import settings from JSON file'}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
