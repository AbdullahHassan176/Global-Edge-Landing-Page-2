'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import ValidationPanel from '@/components/asset/ValidationPanel';
import ErrorExplanationModal from '@/components/asset/ErrorExplanationModal';
import NotificationSystem, { useNotifications } from '@/components/ui/NotificationSystem';
import { userAuthService } from '@/lib/userAuthService';
import { assetCreationService, AssetCreationRequest, AssetCreationStep, DOCUMENT_REQUIREMENTS } from '@/lib/assetCreationService';
import { assetValidationService, ValidationResult } from '@/lib/assetValidationService';

export default function CreateAssetPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<AssetCreationStep>('basic_info');
  const [request, setRequest] = useState<AssetCreationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentValidation, setCurrentValidation] = useState<ValidationResult | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  const steps: { key: AssetCreationStep; title: string; description: string }[] = [
    { key: 'basic_info', title: 'Basic Information', description: 'Asset details and location' },
    { key: 'tokenization_details', title: 'Tokenization', description: 'Token structure and economics' },
    { key: 'legal_compliance', title: 'Legal & Compliance', description: 'Regulatory requirements' },
    { key: 'financial_details', title: 'Financial Details', description: 'Valuation and projections' },
    { key: 'technical_specs', title: 'Technical Specs', description: 'Blockchain and security' },
    { key: 'documents', title: 'Documents', description: 'Required documentation' },
    { key: 'kyc_requirements', title: 'KYC Requirements', description: 'Investor verification' },
    { key: 'investor_criteria', title: 'Investor Criteria', description: 'Investment restrictions' },
    { key: 'review_submission', title: 'Review & Submit', description: 'Final review and submission' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (request) {
      validateCurrentStep();
    }
  }, [request, currentStep]);

  const loadData = async () => {
    try {
      const currentUser = userAuthService.getCurrentUser();
      if (!currentUser || currentUser.role !== 'issuer') {
        router.push('/login');
        return;
      }

      setUser(currentUser);
      
      // Create new asset request
      const newRequest = await assetCreationService.createAssetRequest(currentUser.id);
      setRequest(newRequest);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!request) return;

    setSaving(true);
    try {
      const updatedRequest = await assetCreationService.updateAssetRequest(request.id, request);
      if (updatedRequest) {
        setRequest(updatedRequest);
        setErrors({});
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (!request) return;

    // Check validation before proceeding
    if (currentValidation && !currentValidation.isValid) {
      addNotification({
        type: 'error',
        title: 'Cannot Proceed',
        message: 'Please fix all errors before proceeding to the next step.',
        actions: [
          {
            label: 'View Errors',
            action: () => {
              setShowValidation(true);
              setShowErrorModal(true);
            },
            variant: 'primary'
          }
        ]
      });
      return;
    }

    await handleSave();
    
    const currentIndex = steps.findIndex(step => step.key === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].key);
      setShowValidation(false); // Reset validation panel for next step
      
      addNotification({
        type: 'success',
        title: 'Step Saved',
        message: 'Progress saved successfully. Moving to next step.',
        duration: 3000
      });
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.key === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].key);
    }
  };

  const handleSubmit = async () => {
    if (!request) return;

    const validation = assetCreationService.validateAssetRequest(request);
    if (!validation.valid) {
      setErrors({ submit: validation.errors.join(', ') });
      return;
    }

    setSaving(true);
    try {
      const success = await assetCreationService.submitForReview(request.id);
      if (success) {
        router.push('/issuer/assets');
      } else {
        setErrors({ submit: 'Failed to submit for review' });
      }
    } catch (error) {
      console.error('Error submitting:', error);
      setErrors({ submit: 'Error submitting for review' });
    } finally {
      setSaving(false);
    }
  };

  const validateCurrentStep = () => {
    if (!request) return;
    
    const validation = assetValidationService.validateStep(request, currentStep);
    setCurrentValidation(validation);

    // Show notifications for validation results
    if (validation.errors.length > 0) {
      addNotification({
        type: 'error',
        title: 'Validation Errors Found',
        message: `${validation.errors.length} error(s) need to be fixed before proceeding.`,
        actions: [
          {
            label: 'View Details',
            action: () => setShowErrorModal(true),
            variant: 'primary'
          }
        ]
      });
    } else if (validation.warnings.length > 0) {
      addNotification({
        type: 'warning',
        title: 'Validation Warnings',
        message: `${validation.warnings.length} warning(s) found. Consider addressing them for better results.`,
        actions: [
          {
            label: 'View Details',
            action: () => setShowErrorModal(true),
            variant: 'primary'
          }
        ]
      });
    } else if (validation.suggestions.length > 0) {
      addNotification({
        type: 'info',
        title: 'Improvement Suggestions',
        message: `${validation.suggestions.length} suggestion(s) available to improve your submission.`,
        actions: [
          {
            label: 'View Details',
            action: () => setShowErrorModal(true),
            variant: 'primary'
          }
        ]
      });
    } else {
      addNotification({
        type: 'success',
        title: 'Step Complete!',
        message: 'This step is ready to proceed.',
        duration: 3000
      });
    }
  };

  const getRequiredDocuments = () => {
    if (!request) return [];
    return assetCreationService.getRequiredDocuments(request.assetType, request.tokenStandard);
  };

  const getStepValidationStatus = (stepKey: AssetCreationStep) => {
    if (!request) return null;
    return assetValidationService.validateStep(request, stepKey);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading asset creation form...</p>
        </div>
      </div>
    );
  }

  if (!user || !request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load asset creation form.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Error Explanation Modal */}
      {currentValidation && (
        <ErrorExplanationModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          errors={currentValidation.errors}
          warnings={currentValidation.warnings}
          suggestions={currentValidation.suggestions}
          stepName={steps.find(s => s.key === currentStep)?.title || 'Current Step'}
        />
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Asset</h1>
              <p className="text-gray-600 mt-1">Tokenize your asset for investment opportunities</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Status: {request.status}</p>
                <p className="text-xs text-gray-500">Request ID: {request.id.slice(-8)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Creation Steps</h2>
              <div className="space-y-2">
                {steps.map((step, index) => {
                  const isActive = step.key === currentStep;
                  const isCompleted = steps.findIndex(s => s.key === currentStep) > index;
                  const stepValidation = getStepValidationStatus(step.key);
                  const hasErrors = stepValidation && stepValidation.errors.length > 0;
                  const hasWarnings = stepValidation && stepValidation.warnings.length > 0;
                  
                  return (
                    <button
                      key={step.key}
                      onClick={() => setCurrentStep(step.key)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-global-teal text-white' 
                          : isCompleted 
                            ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                            : hasErrors
                              ? 'bg-red-50 text-red-700 hover:bg-red-100'
                              : hasWarnings
                                ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          isActive 
                            ? 'bg-white text-global-teal' 
                            : isCompleted 
                              ? 'bg-green-500 text-white' 
                              : hasErrors
                                ? 'bg-red-500 text-white'
                                : hasWarnings
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? (
                            <Icon name="check" className="text-xs" />
                          ) : hasErrors ? (
                            <Icon name="x-circle" className="text-xs" />
                          ) : hasWarnings ? (
                            <Icon name="exclamation-triangle" className="text-xs" />
                          ) : (
                            <span className="text-xs font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col space-y-1">
                            <p className="font-medium text-sm truncate">{step.title}</p>
                            {stepValidation && (
                              <div className="flex flex-wrap gap-1">
                                {hasErrors && (
                                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full whitespace-nowrap">
                                    {stepValidation.errors.length} errors
                                  </span>
                                )}
                                {hasWarnings && (
                                  <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full whitespace-nowrap">
                                    {stepValidation.warnings.length} warnings
                                  </span>
                                )}
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {stepValidation.score}/100
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs opacity-75 mt-1 line-clamp-2">{step.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {steps.find(s => s.key === currentStep)?.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {steps.find(s => s.key === currentStep)?.description}
                </p>
              </div>

              <div className="p-6">
                {/* Step Content */}
                {currentStep === 'basic_info' && (
                  <BasicInfoStep request={request} setRequest={setRequest} errors={errors} />
                )}
                
                {currentStep === 'tokenization_details' && (
                  <TokenizationStep request={request} setRequest={setRequest} errors={errors} />
                )}
                
                {currentStep === 'legal_compliance' && (
                  <LegalComplianceStep request={request} setRequest={setRequest} errors={errors} />
                )}
                
                {currentStep === 'financial_details' && (
                  <FinancialDetailsStep request={request} setRequest={setRequest} errors={errors} />
                )}
                
                {currentStep === 'technical_specs' && (
                  <TechnicalSpecsStep request={request} setRequest={setRequest} errors={errors} />
                )}
                
                {currentStep === 'documents' && (
                  <DocumentsStep request={request} setRequest={setRequest} errors={errors} requiredDocs={getRequiredDocuments()} />
                )}
                
                {currentStep === 'kyc_requirements' && (
                  <KYCRequirementsStep request={request} setRequest={setRequest} errors={errors} />
                )}
                
                {currentStep === 'investor_criteria' && (
                  <InvestorCriteriaStep request={request} setRequest={setRequest} errors={errors} />
                )}
                
                {currentStep === 'review_submission' && (
                  <ReviewSubmissionStep request={request} errors={errors} />
                )}

                {/* Validation Panel */}
                {currentValidation && (
                  <div className="mt-6">
                    <ValidationPanel
                      validation={currentValidation}
                      stepName={steps.find(s => s.key === currentStep)?.title || 'Current Step'}
                      isExpanded={showValidation}
                      onToggle={() => setShowValidation(!showValidation)}
                    />
                    
                    {/* Quick Action Buttons */}
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => setShowErrorModal(true)}
                        className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Icon name="eye" className="mr-2" />
                        View Detailed Explanation
                      </button>
                      
                      {currentValidation.errors.length > 0 && (
                        <button
                          onClick={() => {
                            setShowValidation(true);
                            setShowErrorModal(true);
                          }}
                          className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Icon name="exclamation-triangle" className="mr-2" />
                          Fix Errors ({currentValidation.errors.length})
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 'basic_info'}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Draft'}
                    </button>

                    {currentStep === 'review_submission' ? (
                      <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-6 py-2 bg-global-teal text-white rounded-lg hover:bg-global-teal-dark disabled:opacity-50"
                      >
                        {saving ? 'Submitting...' : 'Submit for Review'}
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-global-teal text-white rounded-lg hover:bg-global-teal-dark"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function BasicInfoStep({ request, setRequest, errors }: any) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    try {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please upload only image files');
          continue;
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert('File size must be less than 10MB');
          continue;
        }
        
        // Create preview URL
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      }
      
      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      
      // Update request with images
      setRequest({
        ...request,
        basicInfo: { 
          ...request.basicInfo, 
          images: updatedImages 
        }
      });
      
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    
    setRequest({
      ...request,
      basicInfo: { 
        ...request.basicInfo, 
        images: updatedImages 
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name *</label>
          <input
            type="text"
            value={request.basicInfo.name}
            onChange={(e) => setRequest({
              ...request,
              basicInfo: { ...request.basicInfo, name: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Enter asset name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type *</label>
          <select
            value={request.assetType}
            onChange={(e) => setRequest({ ...request, assetType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
          >
            <option value="container">Container</option>
            <option value="property">Property</option>
            <option value="inventory">Inventory</option>
            <option value="vault">Vault</option>
            <option value="commodity">Commodity</option>
            <option value="artwork">Artwork</option>
            <option value="intellectual_property">Intellectual Property</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
        <select
          value={request.basicInfo.category || ''}
          onChange={(e) => setRequest({
            ...request,
            basicInfo: { ...request.basicInfo, category: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
        >
          <option value="">Select a category</option>
          <option value="real_estate">Real Estate</option>
          <option value="shipping_logistics">Shipping & Logistics</option>
          <option value="commodities">Commodities</option>
          <option value="precious_metals">Precious Metals</option>
          <option value="art_collectibles">Art & Collectibles</option>
          <option value="intellectual_property">Intellectual Property</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="agriculture">Agriculture</option>
          <option value="energy">Energy</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={request.basicInfo.description}
          onChange={(e) => setRequest({
            ...request,
            basicInfo: { ...request.basicInfo, description: e.target.value }
          })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
          placeholder="Describe your asset in detail"
        />
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Asset Images *</label>
        <p className="text-sm text-gray-600 mb-4">
          Upload high-quality images that showcase your asset. At least one image is required.
        </p>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-global-teal transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Icon name="cloud-upload" className="text-gray-400 text-4xl mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {uploading ? 'Uploading...' : 'Upload Asset Images'}
            </h4>
            <p className="text-gray-600 mb-4">
              Drag and drop your images here, or click to browse
            </p>
            <button
              type="button"
              disabled={uploading}
              className="bg-global-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-global-teal-dark transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Choose Images'}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPG, PNG, GIF, WebP (Max 10MB each)
            </p>
          </label>
        </div>

        {/* Image Preview Grid */}
        {uploadedImages.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Uploaded Images ({uploadedImages.length})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Asset image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="x" className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            value={request.basicInfo.location}
            onChange={(e) => setRequest({
              ...request,
              basicInfo: { ...request.basicInfo, location: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Asset location"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
          <input
            type="text"
            value={request.basicInfo.country}
            onChange={(e) => setRequest({
              ...request,
              basicInfo: { ...request.basicInfo, country: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
          <input
            type="text"
            value={request.basicInfo.region}
            onChange={(e) => setRequest({
              ...request,
              basicInfo: { ...request.basicInfo, region: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Region/State"
          />
        </div>
      </div>
    </div>
  );
}

function TokenizationStep({ request, setRequest, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Standard *</label>
          <select
            value={request.tokenStandard}
            onChange={(e) => setRequest({ ...request, tokenStandard: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
          >
            <option value="ERC-20">ERC-20 (Fungible)</option>
            <option value="ERC-721">ERC-721 (Non-Fungible)</option>
            <option value="ERC-1155">ERC-1155 (Multi-Token)</option>
            <option value="Custom">Custom Standard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Tokens *</label>
          <input
            type="number"
            value={request.tokenizationDetails.totalTokens}
            onChange={(e) => setRequest({
              ...request,
              tokenizationDetails: { ...request.tokenizationDetails, totalTokens: parseInt(e.target.value) || 0 }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="1000000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Price (USD) *</label>
          <input
            type="number"
            step="0.01"
            value={request.tokenizationDetails.tokenPrice}
            onChange={(e) => setRequest({
              ...request,
              tokenizationDetails: { ...request.tokenizationDetails, tokenPrice: parseFloat(e.target.value) || 0 }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="1.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Investment (USD) *</label>
          <input
            type="number"
            step="0.01"
            value={request.tokenizationDetails.minimumInvestment}
            onChange={(e) => setRequest({
              ...request,
              tokenizationDetails: { ...request.tokenizationDetails, minimumInvestment: parseFloat(e.target.value) || 0 }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="1000.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Symbol *</label>
          <input
            type="text"
            value={request.tokenizationDetails.tokenSymbol}
            onChange={(e) => setRequest({
              ...request,
              tokenizationDetails: { ...request.tokenizationDetails, tokenSymbol: e.target.value.toUpperCase() }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="ASSET"
            maxLength={10}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Name *</label>
          <input
            type="text"
            value={request.tokenizationDetails.tokenName}
            onChange={(e) => setRequest({
              ...request,
              tokenizationDetails: { ...request.tokenizationDetails, tokenName: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Asset Token"
          />
        </div>
      </div>
    </div>
  );
}

function LegalComplianceStep({ request, setRequest, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction *</label>
          <input
            type="text"
            value={request.legalCompliance.jurisdiction}
            onChange={(e) => setRequest({
              ...request,
              legalCompliance: { ...request.legalCompliance, jurisdiction: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="United Arab Emirates"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Regulatory Framework</label>
          <input
            type="text"
            value={request.legalCompliance.regulatoryFramework}
            onChange={(e) => setRequest({
              ...request,
              legalCompliance: { ...request.legalCompliance, regulatoryFramework: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="UAE Securities Law"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Escrow Agent</label>
          <input
            type="text"
            value={request.legalCompliance.escrowAgent}
            onChange={(e) => setRequest({
              ...request,
              legalCompliance: { ...request.legalCompliance, escrowAgent: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Escrow Agent Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Custodian</label>
          <input
            type="text"
            value={request.legalCompliance.custodian}
            onChange={(e) => setRequest({
              ...request,
              legalCompliance: { ...request.legalCompliance, custodian: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Custodian Name"
          />
        </div>
      </div>
    </div>
  );
}

function FinancialDetailsStep({ request, setRequest, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valuation Amount (USD) *</label>
          <input
            type="number"
            step="0.01"
            value={request.financialDetails.valuation.valuationAmount}
            onChange={(e) => setRequest({
              ...request,
              financialDetails: {
                ...request.financialDetails,
                valuation: { ...request.financialDetails.valuation, valuationAmount: parseFloat(e.target.value) || 0 }
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="1000000.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valuator *</label>
          <input
            type="text"
            value={request.financialDetails.valuation.valuator}
            onChange={(e) => setRequest({
              ...request,
              financialDetails: {
                ...request.financialDetails,
                valuation: { ...request.financialDetails.valuation, valuator: e.target.value }
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Valuation Company"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
          <input
            type="number"
            step="0.01"
            value={request.financialDetails.revenueModel.expectedReturn}
            onChange={(e) => setRequest({
              ...request,
              financialDetails: {
                ...request.financialDetails,
                revenueModel: { ...request.financialDetails.revenueModel, expectedReturn: parseFloat(e.target.value) || 0 }
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="12.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Return Frequency</label>
          <select
            value={request.financialDetails.revenueModel.returnFrequency}
            onChange={(e) => setRequest({
              ...request,
              financialDetails: {
                ...request.financialDetails,
                revenueModel: { ...request.financialDetails.revenueModel, returnFrequency: e.target.value }
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
            <option value="on_exit">On Exit</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function TechnicalSpecsStep({ request, setRequest, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blockchain</label>
          <select
            value={request.technicalSpecs.blockchain}
            onChange={(e) => setRequest({
              ...request,
              technicalSpecs: { ...request.technicalSpecs, blockchain: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="Binance Smart Chain">Binance Smart Chain</option>
            <option value="Avalanche">Avalanche</option>
            <option value="Solana">Solana</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contract Version</label>
          <input
            type="text"
            value={request.technicalSpecs.contractVersion}
            onChange={(e) => setRequest({
              ...request,
              technicalSpecs: { ...request.technicalSpecs, contractVersion: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="1.0.0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Security Audit Completed</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={request.technicalSpecs.securityAudit.completed}
              onChange={(e) => setRequest({
                ...request,
                technicalSpecs: {
                  ...request.technicalSpecs,
                  securityAudit: { ...request.technicalSpecs.securityAudit, completed: e.target.checked }
                }
              })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Security audit has been completed</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Auditor</label>
          <input
            type="text"
            value={request.technicalSpecs.securityAudit.auditor}
            onChange={(e) => setRequest({
              ...request,
              technicalSpecs: {
                ...request.technicalSpecs,
                securityAudit: { ...request.technicalSpecs.securityAudit, auditor: e.target.value }
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="Security Audit Company"
          />
        </div>
      </div>
    </div>
  );
}

function DocumentsStep({ request, setRequest, errors, requiredDocs }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Required Documents</h3>
        <p className="text-blue-800 text-sm mb-4">
          The following documents are required for {request.assetType} assets using {request.tokenStandard} standard:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {requiredDocs.map((doc: string) => (
            <div key={doc} className="flex items-center text-sm text-blue-800">
              <Icon name="document" className="mr-2 text-blue-600" />
              {doc.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Icon name="cloud-upload" className="text-gray-400 text-4xl mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Required Documents</h4>
          <p className="text-gray-600 mb-4">
            Drag and drop your documents here, or click to browse
          </p>
          <button className="bg-global-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-global-teal-dark transition-colors">
            Choose Files
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
          </p>
        </div>
      </div>
    </div>
  );
}

function KYCRequirementsStep({ request, setRequest, errors }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Investment (USD)</label>
        <input
          type="number"
          step="0.01"
          value={request.kycRequirements.minimumInvestment}
          onChange={(e) => setRequest({
            ...request,
            kycRequirements: { ...request.kycRequirements, minimumInvestment: parseFloat(e.target.value) || 0 }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
          placeholder="1000.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation Required</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={request.kycRequirements.accreditationRequired}
            onChange={(e) => setRequest({
              ...request,
              kycRequirements: { ...request.kycRequirements, accreditationRequired: e.target.checked }
            })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Require investor accreditation</span>
        </div>
      </div>
    </div>
  );
}

function InvestorCriteriaStep({ request, setRequest, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Net Worth (USD)</label>
          <input
            type="number"
            step="0.01"
            value={request.investorCriteria.minimumNetWorth || ''}
            onChange={(e) => setRequest({
              ...request,
              investorCriteria: { ...request.investorCriteria, minimumNetWorth: parseFloat(e.target.value) || undefined }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="1000000.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Income (USD)</label>
          <input
            type="number"
            step="0.01"
            value={request.investorCriteria.minimumIncome || ''}
            onChange={(e) => setRequest({
              ...request,
              investorCriteria: { ...request.investorCriteria, minimumIncome: parseFloat(e.target.value) || undefined }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="200000.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Investment Experience (Years)</label>
          <input
            type="number"
            value={request.investorCriteria.minimumInvestmentExperience || ''}
            onChange={(e) => setRequest({
              ...request,
              investorCriteria: { ...request.investorCriteria, minimumInvestmentExperience: parseInt(e.target.value) || undefined }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Investors</label>
          <input
            type="number"
            value={request.investorCriteria.maximumInvestors || ''}
            onChange={(e) => setRequest({
              ...request,
              investorCriteria: { ...request.investorCriteria, maximumInvestors: parseInt(e.target.value) || undefined }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
            placeholder="100"
          />
        </div>
      </div>
    </div>
  );
}

function ReviewSubmissionStep({ request, errors }: any) {
  const validation = assetCreationService.validateAssetRequest(request);
  
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">Review Checklist</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Icon name={request.basicInfo.name ? "check-circle" : "x-circle"} className={`mr-2 ${request.basicInfo.name ? "text-green-600" : "text-red-600"}`} />
            <span className="text-sm">Basic information completed</span>
          </div>
          <div className="flex items-center">
            <Icon name={request.tokenizationDetails.totalTokens > 0 ? "check-circle" : "x-circle"} className={`mr-2 ${request.tokenizationDetails.totalTokens > 0 ? "text-green-600" : "text-red-600"}`} />
            <span className="text-sm">Tokenization details completed</span>
          </div>
          <div className="flex items-center">
            <Icon name={request.legalCompliance.jurisdiction ? "check-circle" : "x-circle"} className={`mr-2 ${request.legalCompliance.jurisdiction ? "text-green-600" : "text-red-600"}`} />
            <span className="text-sm">Legal compliance information completed</span>
          </div>
          <div className="flex items-center">
            <Icon name={request.financialDetails.valuation.valuationAmount > 0 ? "check-circle" : "x-circle"} className={`mr-2 ${request.financialDetails.valuation.valuationAmount > 0 ? "text-green-600" : "text-red-600"}`} />
            <span className="text-sm">Financial details completed</span>
          </div>
          <div className="flex items-center">
            <Icon name={request.technicalSpecs.blockchain ? "check-circle" : "x-circle"} className={`mr-2 ${request.technicalSpecs.blockchain ? "text-green-600" : "text-red-600"}`} />
            <span className="text-sm">Technical specifications completed</span>
          </div>
        </div>
      </div>

      {!validation.valid && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Issues to Resolve</h3>
          <ul className="list-disc list-inside space-y-1">
            {validation.errors.map((error, index) => (
              <li key={index} className="text-sm text-red-800">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Submission Process</h3>
        <p className="text-blue-800 text-sm mb-4">
          Once submitted, your asset will go through a comprehensive review process:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>Initial review by our compliance team</li>
          <li>Legal review and regulatory compliance check</li>
          <li>Technical audit and security assessment</li>
          <li>Financial validation and risk assessment</li>
          <li>Final approval and listing preparation</li>
        </ol>
        <p className="text-blue-800 text-sm mt-4">
          <strong>Estimated review time:</strong> 5-10 business days
        </p>
      </div>
    </div>
  );
}
