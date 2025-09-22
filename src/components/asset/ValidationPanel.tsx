'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { ValidationResult, ValidationError, ValidationWarning, ValidationSuggestion } from '@/lib/assetValidationService';

interface ValidationPanelProps {
  validation: ValidationResult;
  stepName: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function ValidationPanel({ 
  validation, 
  stepName, 
  isExpanded = false, 
  onToggle 
}: ValidationPanelProps) {
  const [activeTab, setActiveTab] = useState<'errors' | 'warnings' | 'suggestions'>('errors');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return 'check-circle';
    if (score >= 60) return 'exclamation-triangle';
    return 'x-circle';
  };

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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getScoreColor(validation.score)}`}>
              <Icon name={getScoreIcon(validation.score)} className="text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{stepName} Validation</h3>
              <p className="text-sm text-gray-600">
                Score: {validation.score}/100 • {validation.completionPercentage}% Complete
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(validation.score)}`}>
              {validation.score}/100
            </div>
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              validation.score >= 80 ? 'bg-green-500' : 
              validation.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${validation.score}%` }}
          />
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Tabs */}
          <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('errors')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'errors' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="x-circle" className="mr-1" />
                Errors ({validation.errors.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('warnings')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'warnings' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="exclamation-triangle" className="mr-1" />
                Warnings ({validation.warnings.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'suggestions' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon name="light-bulb" className="mr-1" />
                Suggestions ({validation.suggestions.length})
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-3">
            {activeTab === 'errors' && (
              <div>
                {validation.errors.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="check-circle" className="text-green-500 text-4xl mx-auto mb-2" />
                    <p className="text-green-600 font-medium">No errors found!</p>
                    <p className="text-gray-600 text-sm">This step is ready to proceed.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {validation.errors.map((error, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(error.severity)}`}>
                        <div className="flex items-start">
                          <Icon name="x-circle" className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{error.message}</p>
                            <p className="text-xs mt-1 opacity-75">Field: {error.field}</p>
                            {error.suggestion && (
                              <p className="text-xs mt-1 font-medium">💡 {error.suggestion}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'warnings' && (
              <div>
                {validation.warnings.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="check-circle" className="text-green-500 text-4xl mx-auto mb-2" />
                    <p className="text-green-600 font-medium">No warnings!</p>
                    <p className="text-gray-600 text-sm">This step looks good.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {validation.warnings.map((warning, index) => (
                      <div key={index} className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                        <div className="flex items-start">
                          <Icon name="exclamation-triangle" className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-sm text-yellow-800">{warning.message}</p>
                            <p className="text-xs mt-1 text-yellow-700">Field: {warning.field}</p>
                            <p className="text-xs mt-1 font-medium text-yellow-800">💡 {warning.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'suggestions' && (
              <div>
                {validation.suggestions.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="check-circle" className="text-green-500 text-4xl mx-auto mb-2" />
                    <p className="text-green-600 font-medium">No suggestions!</p>
                    <p className="text-gray-600 text-sm">This step is optimized.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {validation.suggestions.map((suggestion, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${getPriorityColor(suggestion.priority)}`}>
                        <div className="flex items-start">
                          <Icon name={getCategoryIcon(suggestion.category)} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-sm flex-1 mr-2">{suggestion.message}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getPriorityColor(suggestion.priority)}`}>
                              {suggestion.priority}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Field: {suggestion.field}</p>
                          <p className="text-xs font-medium text-blue-700">💡 {suggestion.message}</p>
                        </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Step Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Completion</p>
                <p className="font-medium">{validation.completionPercentage}%</p>
              </div>
              <div>
                <p className="text-gray-600">Quality Score</p>
                <p className="font-medium">{validation.score}/100</p>
              </div>
            </div>
            {validation.score < 70 && (
              <div className="mt-3 p-2 bg-yellow-100 border border-yellow-200 rounded">
                <p className="text-xs text-yellow-800">
                  ⚠️ Consider improving this step before proceeding for better approval chances.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
