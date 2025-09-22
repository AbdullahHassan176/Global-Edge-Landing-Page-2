'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { Integration } from '@/lib/settingsService';

interface IntegrationConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: Integration | null;
  onSave: (integration: Integration) => void;
  onTest: (integrationId: string) => Promise<{ success: boolean; error?: string; responseTime?: number }>;
}

export default function IntegrationConfigModal({
  isOpen,
  onClose,
  integration,
  onSave,
  onTest
}: IntegrationConfigModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string; responseTime?: number } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (integration) {
      setFormData(integration.configuration || {});
      setCredentials(integration.credentials || {});
      setTestResult(null);
      setErrors({});
    }
  }, [integration]);

  if (!isOpen || !integration) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCredentialChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic validation based on integration type
    switch (integration.type) {
      case 'email':
        if (!formData.fromEmail || !formData.fromEmail.includes('@')) {
          newErrors.fromEmail = 'Valid email address is required';
        }
        break;
      case 'payment':
        if (!formData.publishableKey || !formData.secretKey) {
          newErrors.publishableKey = 'API keys are required';
        }
        break;
      case 'webhook':
        if (!formData.url || !formData.url.startsWith('http')) {
          newErrors.url = 'Valid webhook URL is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const updatedIntegration: Integration = {
        ...integration,
        configuration: formData,
        credentials: credentials,
        lastSync: new Date().toISOString()
      };
      
      await onSave(updatedIntegration);
      onClose();
    } catch (error) {
      console.error('Error saving integration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const result = await onTest(integration.id);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Test failed'
      });
    } finally {
      setIsTesting(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderConfigurationFields = () => {
    switch (integration.type) {
      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Email Address
              </label>
              <input
                type="email"
                value={formData.fromEmail || ''}
                onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent ${
                  errors.fromEmail ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="noreply@globaledge.com"
              />
              {errors.fromEmail && (
                <p className="text-red-600 text-sm mt-1">{errors.fromEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Name
              </label>
              <input
                type="text"
                value={formData.fromName || ''}
                onChange={(e) => handleInputChange('fromName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="Global Edge"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={credentials.apiKey || ''}
                onChange={(e) => handleCredentialChange('apiKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="Enter your API key"
              />
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publishable Key
              </label>
              <input
                type="text"
                value={formData.publishableKey || ''}
                onChange={(e) => handleInputChange('publishableKey', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent ${
                  errors.publishableKey ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="pk_test_..."
              />
              {errors.publishableKey && (
                <p className="text-red-600 text-sm mt-1">{errors.publishableKey}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <input
                type="password"
                value={credentials.secretKey || ''}
                onChange={(e) => handleCredentialChange('secretKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="sk_test_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook Secret
              </label>
              <input
                type="password"
                value={credentials.webhookSecret || ''}
                onChange={(e) => handleCredentialChange('webhookSecret', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="whsec_..."
              />
            </div>
          </div>
        );

      case 'webhook':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={formData.url || ''}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent ${
                  errors.url ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://hooks.slack.com/services/..."
              />
              {errors.url && (
                <p className="text-red-600 text-sm mt-1">{errors.url}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTTP Method
              </label>
              <select
                value={formData.method || 'POST'}
                onChange={(e) => handleInputChange('method', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
              >
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retry Attempts
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.retryAttempts || 3}
                onChange={(e) => handleInputChange('retryAttempts', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking ID
              </label>
              <input
                type="text"
                value={formData.trackingId || ''}
                onChange={(e) => handleInputChange('trackingId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="GA-XXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Measurement ID
              </label>
              <input
                type="text"
                value={formData.measurementId || ''}
                onChange={(e) => handleInputChange('measurementId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
          </div>
        );

      case 'storage':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bucket Name
              </label>
              <input
                type="text"
                value={formData.bucketName || ''}
                onChange={(e) => handleInputChange('bucketName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="global-edge-assets"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={formData.region || 'us-east-1'}
                onChange={(e) => handleInputChange('region', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
              >
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="us-west-2">US West (Oregon)</option>
                <option value="eu-west-1">Europe (Ireland)</option>
                <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Key ID
              </label>
              <input
                type="text"
                value={credentials.accessKeyId || ''}
                onChange={(e) => handleCredentialChange('accessKeyId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="AKIA..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Access Key
              </label>
              <input
                type="password"
                value={credentials.secretAccessKey || ''}
                onChange={(e) => handleCredentialChange('secretAccessKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="Enter secret access key"
              />
            </div>
          </div>
        );

      case 'notification':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel
              </label>
              <input
                type="text"
                value={formData.channel || ''}
                onChange={(e) => handleInputChange('channel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="#admin-alerts"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username || ''}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="Global Edge Bot"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={credentials.webhook || ''}
                onChange={(e) => handleCredentialChange('webhook', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                placeholder="https://hooks.slack.com/services/..."
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Icon name="cog" className="text-gray-400 text-4xl mx-auto mb-4" />
            <p className="text-gray-600">No specific configuration required for this integration type.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <Icon name={getTypeIcon(integration.type)} className="text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Configure {integration.name}
                </h2>
                <p className="text-gray-600">{integration.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="x-mark" className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Current Status</h3>
                <p className="text-sm text-gray-600">Integration health and last sync</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(integration.status)}`}>
                  {integration.status.toUpperCase()}
                </span>
                {integration.healthCheck && (
                  <p className="text-xs text-gray-500 mt-1">
                    Last check: {new Date(integration.healthCheck.lastCheck).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Configuration Fields */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Configuration</h3>
              {renderConfigurationFields()}
            </div>

            {/* Test Result */}
            {testResult && (
              <div className={`p-4 rounded-lg ${
                testResult.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center">
                  <Icon 
                    name={testResult.success ? 'check-circle' : 'x-circle'} 
                    className={`mr-2 ${testResult.success ? 'text-green-600' : 'text-red-600'}`} 
                  />
                  <div>
                    <p className={`font-medium ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
                      {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                    </p>
                    {testResult.responseTime && (
                      <p className="text-sm text-gray-600">
                        Response time: {testResult.responseTime}ms
                      </p>
                    )}
                    {testResult.error && (
                      <p className="text-sm text-red-600">{testResult.error}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={handleTest}
              disabled={isTesting}
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
            >
              {isTesting ? (
                <Icon name="clock" className="animate-spin mr-2" />
              ) : (
                <Icon name="play" className="mr-2" />
              )}
              {isTesting ? 'Testing...' : 'Test Connection'}
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-4 py-2 bg-global-teal text-white rounded-lg hover:bg-global-teal-dark transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
