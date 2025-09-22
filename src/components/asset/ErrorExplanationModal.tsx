'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { ValidationError, ValidationWarning, ValidationSuggestion } from '@/lib/assetValidationService';

interface ErrorExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  stepName: string;
}

export default function ErrorExplanationModal({
  isOpen,
  onClose,
  errors,
  warnings,
  suggestions,
  stepName
}: ErrorExplanationModalProps) {
  const [activeTab, setActiveTab] = useState<'errors' | 'warnings' | 'suggestions'>('errors');

  if (!isOpen) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return 'shield-check';
      case 'financial': return 'chart-line';
      case 'technical': return 'cog';
      case 'legal': return 'scale';
      case 'marketing': return 'megaphone';
      default: return 'information-circle';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {stepName} - Validation Details
              </h2>
              <p className="text-gray-600 mt-1">
                Detailed explanation of issues and how to fix them
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
              onClick={() => setActiveTab('errors')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'errors'
                  ? 'border-red-500 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="x-circle" className="mr-2" />
                Errors ({errors.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('warnings')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'warnings'
                  ? 'border-yellow-500 text-yellow-600 bg-yellow-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="exclamation-triangle" className="mr-2" />
                Warnings ({warnings.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'suggestions'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="light-bulb" className="mr-2" />
                Suggestions ({suggestions.length})
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'errors' && (
            <div className="space-y-4">
              {errors.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="check-circle" className="text-green-500 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Errors Found!</h3>
                  <p className="text-gray-600">This step is ready to proceed.</p>
                </div>
              ) : (
                errors.map((error, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(error.severity)}`}>
                    <div className="flex items-start">
                      <Icon name="x-circle" className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-2">{error.message}</h4>
                        <div className="bg-white/50 rounded-md p-3 mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Field: {error.field}</p>
                          <p className="text-xs text-gray-600">Severity: {error.severity}</p>
                        </div>
                        {error.suggestion && (
                          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <div className="flex items-start">
                              <Icon name="light-bulb" className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-blue-900 mb-1">How to Fix:</p>
                                <p className="text-sm text-blue-800">{error.suggestion}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="space-y-4">
              {warnings.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="check-circle" className="text-green-500 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Warnings!</h3>
                  <p className="text-gray-600">This step looks good.</p>
                </div>
              ) : (
                warnings.map((warning, index) => (
                  <div key={index} className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                    <div className="flex items-start">
                      <Icon name="exclamation-triangle" className="text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-2 text-yellow-800">{warning.message}</h4>
                        <div className="bg-white/50 rounded-md p-3 mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Field: {warning.field}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                          <div className="flex items-start">
                            <Icon name="light-bulb" className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-blue-900 mb-1">Recommendation:</p>
                              <p className="text-sm text-blue-800">{warning.suggestion}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div className="space-y-4">
              {suggestions.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="check-circle" className="text-green-500 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Suggestions!</h3>
                  <p className="text-gray-600">This step is optimized.</p>
                </div>
              ) : (
                suggestions.map((suggestion, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}>
                    <div className="flex items-start">
                      <Icon name={getCategoryIcon(suggestion.category)} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm flex-1 mr-3">{suggestion.message}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                              {suggestion.priority}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              {suggestion.category}
                            </span>
                          </div>
                        </div>
                        <div className="bg-white/50 rounded-md p-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Field: {suggestion.field}</p>
                          <p className="text-xs text-gray-600">Category: {suggestion.category}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-3">
                          <div className="flex items-start">
                            <Icon name="light-bulb" className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-blue-900 mb-1">Improvement:</p>
                              <p className="text-sm text-blue-800">{suggestion.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {activeTab === 'errors' && errors.length > 0 && (
                <p>⚠️ Fix all errors before proceeding to the next step.</p>
              )}
              {activeTab === 'warnings' && warnings.length > 0 && (
                <p>💡 Consider addressing warnings for better results.</p>
              )}
              {activeTab === 'suggestions' && suggestions.length > 0 && (
                <p>🚀 Implement suggestions to improve approval chances.</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-global-teal text-white rounded-lg hover:bg-global-teal-dark transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
