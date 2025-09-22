/**
 * Asset Creation Validation Service
 * Provides comprehensive validation and improvement suggestions for each step
 */

import { AssetCreationRequest, AssetCreationStep } from './assetCreationService';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  score: number; // 0-100
  completionPercentage: number;
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  suggestion?: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion: string;
}

export interface ValidationSuggestion {
  field: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  category: 'compliance' | 'financial' | 'technical' | 'legal' | 'marketing';
}

export interface StepValidationResult {
  step: AssetCreationStep;
  isValid: boolean;
  score: number;
  completionPercentage: number;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  canProceed: boolean;
  nextSteps: string[];
}

class AssetValidationService {
  /**
   * Validate entire asset creation request
   */
  validateAssetRequest(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];

    // Validate each step
    const basicInfoValidation = this.validateBasicInfo(request);
    const tokenizationValidation = this.validateTokenization(request);
    const legalValidation = this.validateLegalCompliance(request);
    const financialValidation = this.validateFinancialDetails(request);
    const technicalValidation = this.validateTechnicalSpecs(request);
    const documentValidation = this.validateDocuments(request);
    const kycValidation = this.validateKYCRequirements(request);
    const investorValidation = this.validateInvestorCriteria(request);

    // Combine all validation results
    errors.push(...basicInfoValidation.errors, ...tokenizationValidation.errors, 
                ...legalValidation.errors, ...financialValidation.errors,
                ...technicalValidation.errors, ...documentValidation.errors,
                ...kycValidation.errors, ...investorValidation.errors);

    warnings.push(...basicInfoValidation.warnings, ...tokenizationValidation.warnings,
                  ...legalValidation.warnings, ...financialValidation.warnings,
                  ...technicalValidation.warnings, ...documentValidation.warnings,
                  ...kycValidation.warnings, ...investorValidation.warnings);

    suggestions.push(...basicInfoValidation.suggestions, ...tokenizationValidation.suggestions,
                     ...legalValidation.suggestions, ...financialValidation.suggestions,
                     ...technicalValidation.suggestions, ...documentValidation.suggestions,
                     ...kycValidation.suggestions, ...investorValidation.suggestions);

    // Calculate overall score
    const stepScores = [
      basicInfoValidation.score,
      tokenizationValidation.score,
      legalValidation.score,
      financialValidation.score,
      technicalValidation.score,
      documentValidation.score,
      kycValidation.score,
      investorValidation.score
    ];

    const overallScore = Math.round(stepScores.reduce((sum, score) => sum + score, 0) / stepScores.length);
    const completionPercentage = this.calculateCompletionPercentage(request);

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score: overallScore,
      completionPercentage
    };
  }

  /**
   * Validate specific step
   */
  validateStep(request: AssetCreationRequest, step: AssetCreationStep): StepValidationResult {
    let validation: ValidationResult;

    switch (step) {
      case 'basic_info':
        validation = this.validateBasicInfo(request);
        break;
      case 'tokenization_details':
        validation = this.validateTokenization(request);
        break;
      case 'legal_compliance':
        validation = this.validateLegalCompliance(request);
        break;
      case 'financial_details':
        validation = this.validateFinancialDetails(request);
        break;
      case 'technical_specs':
        validation = this.validateTechnicalSpecs(request);
        break;
      case 'documents':
        validation = this.validateDocuments(request);
        break;
      case 'kyc_requirements':
        validation = this.validateKYCRequirements(request);
        break;
      case 'investor_criteria':
        validation = this.validateInvestorCriteria(request);
        break;
      default:
        validation = { isValid: true, errors: [], warnings: [], suggestions: [], score: 0, completionPercentage: 0 };
    }

    return {
      step,
      isValid: validation.isValid,
      score: validation.score,
      completionPercentage: validation.completionPercentage,
      errors: validation.errors,
      warnings: validation.warnings,
      suggestions: validation.suggestions,
      canProceed: validation.errors.filter(e => e.severity === 'error').length === 0,
      nextSteps: this.getNextSteps(step, validation)
    };
  }

  /**
   * Validate Basic Information step
   */
  private validateBasicInfo(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    let score = 0;

    const { basicInfo } = request;

    // Required field validation
    if (!basicInfo.name || basicInfo.name.trim().length < 3) {
      errors.push({
        field: 'name',
        message: 'Asset name is required and must be at least 3 characters',
        severity: 'error',
        suggestion: 'Use a descriptive name that clearly identifies your asset'
      });
    } else {
      score += 20;
    }

    if (!basicInfo.description || basicInfo.description.trim().length < 50) {
      errors.push({
        field: 'description',
        message: 'Description is required and should be at least 50 characters',
        severity: 'error',
        suggestion: 'Provide a detailed description including key features, location, and unique selling points'
      });
    } else {
      score += 20;
    }

    if (!basicInfo.location || basicInfo.location.trim().length < 3) {
      errors.push({
        field: 'location',
        message: 'Location is required',
        severity: 'error',
        suggestion: 'Specify the exact location including city and country'
      });
    } else {
      score += 15;
    }

    if (!basicInfo.country || basicInfo.country.trim().length < 2) {
      errors.push({
        field: 'country',
        message: 'Country is required',
        severity: 'error',
        suggestion: 'Select the country where the asset is located'
      });
    } else {
      score += 10;
    }

    // Image validation
    if (!basicInfo.images || basicInfo.images.length === 0) {
      errors.push({
        field: 'images',
        message: 'At least one image is required',
        severity: 'error',
        suggestion: 'Upload high-quality images that showcase your asset'
      });
    } else {
      score += 15;
      if (basicInfo.images.length < 3) {
        warnings.push({
          field: 'images',
          message: 'Consider adding more images for better presentation',
          suggestion: 'Upload 3-5 high-quality images from different angles'
        });
      }
    }

    // Category validation
    if (!basicInfo.category || basicInfo.category.trim().length < 2) {
      errors.push({
        field: 'category',
        message: 'Category is required',
        severity: 'error',
        suggestion: 'Select the most appropriate category for your asset'
      });
    } else {
      score += 10;
    }

    // Tags validation
    if (!basicInfo.tags || basicInfo.tags.length === 0) {
      warnings.push({
        field: 'tags',
        message: 'Tags help with discoverability',
        suggestion: 'Add relevant tags like location, type, features, etc.'
      });
    } else {
      score += 10;
    }

    // Suggestions for improvement
    if (basicInfo.description && basicInfo.description.length < 100) {
      suggestions.push({
        field: 'description',
        message: 'Enhance your description for better investor appeal',
        priority: 'medium',
        category: 'marketing'
      });
    }

    if (!basicInfo.virtualTour) {
      suggestions.push({
        field: 'virtualTour',
        message: 'Consider adding a virtual tour for better investor engagement',
        priority: 'low',
        category: 'marketing'
      });
    }

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score,
      completionPercentage: Math.round((score / 100) * 100)
    };
  }

  /**
   * Validate Tokenization Details step
   */
  private validateTokenization(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    let score = 0;

    const { tokenizationDetails } = request;

    // Token validation
    if (!tokenizationDetails.totalTokens || tokenizationDetails.totalTokens <= 0) {
      errors.push({
        field: 'totalTokens',
        message: 'Total tokens must be greater than 0',
        severity: 'error',
        suggestion: 'Set a reasonable number of tokens based on your asset value'
      });
    } else {
      score += 15;
      if (tokenizationDetails.totalTokens > 1000000000) {
        warnings.push({
          field: 'totalTokens',
          message: 'Very high token count may affect liquidity',
          suggestion: 'Consider if this many tokens are necessary for your use case'
        });
      }
    }

    if (!tokenizationDetails.tokenPrice || tokenizationDetails.tokenPrice <= 0) {
      errors.push({
        field: 'tokenPrice',
        message: 'Token price must be greater than 0',
        severity: 'error',
        suggestion: 'Set a price that reflects the asset value divided by total tokens'
      });
    } else {
      score += 15;
    }

    if (!tokenizationDetails.minimumInvestment || tokenizationDetails.minimumInvestment <= 0) {
      errors.push({
        field: 'minimumInvestment',
        message: 'Minimum investment must be greater than 0',
        severity: 'error',
        suggestion: 'Set a reasonable minimum that allows broad participation'
      });
    } else {
      score += 15;
    }

    if (!tokenizationDetails.tokenSymbol || tokenizationDetails.tokenSymbol.length < 2) {
      errors.push({
        field: 'tokenSymbol',
        message: 'Token symbol is required (2-10 characters)',
        severity: 'error',
        suggestion: 'Use a clear, memorable symbol (e.g., PROP, GOLD, SHIP)'
      });
    } else {
      score += 10;
    }

    if (!tokenizationDetails.tokenName || tokenizationDetails.tokenName.length < 3) {
      errors.push({
        field: 'tokenName',
        message: 'Token name is required',
        severity: 'error',
        suggestion: 'Use a descriptive name for your token'
      });
    } else {
      score += 10;
    }

    // Tokenomics validation
    const { tokenomics } = tokenizationDetails;
    if (tokenomics.totalSupply !== tokenizationDetails.totalTokens) {
      errors.push({
        field: 'totalSupply',
        message: 'Total supply must match total tokens',
        severity: 'error',
        suggestion: 'Ensure tokenomics total supply equals total tokens'
      });
    } else {
      score += 15;
    }

    if (tokenomics.investorTokens <= 0) {
      errors.push({
        field: 'investorTokens',
        message: 'Investor tokens must be greater than 0',
        severity: 'error',
        suggestion: 'Allocate a reasonable percentage for investors'
      });
    } else {
      score += 10;
    }

    // Liquidity plan validation
    if (!tokenizationDetails.liquidityPlan.primaryMarket) {
      warnings.push({
        field: 'primaryMarket',
        message: 'Primary market trading is recommended',
        suggestion: 'Enable primary market for better liquidity'
      });
    } else {
      score += 10;
    }

    // Suggestions
    if (tokenizationDetails.minimumInvestment > 10000) {
      suggestions.push({
        field: 'minimumInvestment',
        message: 'Consider lowering minimum investment for broader participation',
        priority: 'medium',
        category: 'financial'
      });
    }

    if (!tokenizationDetails.liquidityPlan.secondaryMarket) {
      suggestions.push({
        field: 'secondaryMarket',
        message: 'Enable secondary market trading for better liquidity',
        priority: 'high',
        category: 'financial'
      });
    }

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score,
      completionPercentage: Math.round((score / 100) * 100)
    };
  }

  /**
   * Validate Legal Compliance step
   */
  private validateLegalCompliance(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    let score = 0;

    const { legalCompliance } = request;

    // Jurisdiction validation
    if (!legalCompliance.jurisdiction || legalCompliance.jurisdiction.trim().length < 2) {
      errors.push({
        field: 'jurisdiction',
        message: 'Jurisdiction is required',
        severity: 'error',
        suggestion: 'Specify the legal jurisdiction for your asset'
      });
    } else {
      score += 20;
    }

    // Legal opinion validation
    if (!legalCompliance.legalOpinion.provided) {
      errors.push({
        field: 'legalOpinion',
        message: 'Legal opinion is required',
        severity: 'error',
        suggestion: 'Obtain a legal opinion from a qualified law firm'
      });
    } else {
      score += 25;
      if (!legalCompliance.legalOpinion.lawFirm) {
        warnings.push({
          field: 'lawFirm',
          message: 'Law firm information is recommended',
          suggestion: 'Specify the law firm that provided the legal opinion'
        });
      }
    }

    // Insurance validation
    if (!legalCompliance.insurance.required) {
      warnings.push({
        field: 'insurance',
        message: 'Insurance is highly recommended',
        suggestion: 'Consider obtaining comprehensive insurance coverage'
      });
    } else {
      score += 20;
      if (!legalCompliance.insurance.provider) {
        errors.push({
          field: 'insuranceProvider',
          message: 'Insurance provider is required',
          severity: 'error',
          suggestion: 'Specify the insurance provider'
        });
      }
    }

    // Escrow and custodian validation
    if (!legalCompliance.escrowAgent) {
      warnings.push({
        field: 'escrowAgent',
        message: 'Escrow agent is recommended for investor protection',
        suggestion: 'Appoint a qualified escrow agent'
      });
    } else {
      score += 15;
    }

    if (!legalCompliance.custodian) {
      warnings.push({
        field: 'custodian',
        message: 'Custodian is recommended for asset security',
        suggestion: 'Appoint a qualified custodian'
      });
    } else {
      score += 15;
    }

    // Compliance requirements validation
    if (!legalCompliance.complianceRequirements || legalCompliance.complianceRequirements.length === 0) {
      warnings.push({
        field: 'complianceRequirements',
        message: 'Compliance requirements should be specified',
        suggestion: 'List all relevant compliance requirements'
      });
    } else {
      score += 5;
    }

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score,
      completionPercentage: Math.round((score / 100) * 100)
    };
  }

  /**
   * Validate Financial Details step
   */
  private validateFinancialDetails(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    let score = 0;

    const { financialDetails } = request;

    // Valuation validation
    if (!financialDetails.valuation.valuationAmount || financialDetails.valuation.valuationAmount <= 0) {
      errors.push({
        field: 'valuationAmount',
        message: 'Valuation amount is required and must be greater than 0',
        severity: 'error',
        suggestion: 'Obtain a professional valuation of your asset'
      });
    } else {
      score += 25;
    }

    if (!financialDetails.valuation.valuator) {
      errors.push({
        field: 'valuator',
        message: 'Valuator is required',
        severity: 'error',
        suggestion: 'Specify the professional valuator'
      });
    } else {
      score += 15;
    }

    if (!financialDetails.valuation.valuationDate) {
      warnings.push({
        field: 'valuationDate',
        message: 'Valuation date is recommended',
        suggestion: 'Specify when the valuation was performed'
      });
    } else {
      score += 10;
    }

    // Revenue model validation
    if (financialDetails.revenueModel.expectedReturn <= 0) {
      warnings.push({
        field: 'expectedReturn',
        message: 'Expected return should be specified',
        suggestion: 'Provide realistic expected returns based on market data'
      });
    } else {
      score += 15;
      if (financialDetails.revenueModel.expectedReturn > 50) {
        warnings.push({
          field: 'expectedReturn',
          message: 'Very high expected return may be unrealistic',
          suggestion: 'Ensure expected returns are realistic and achievable'
        });
      }
    }

    // Financial projections validation
    if (!financialDetails.financialProjections || financialDetails.financialProjections.length === 0) {
      warnings.push({
        field: 'financialProjections',
        message: 'Financial projections are recommended',
        suggestion: 'Provide 3-5 year financial projections'
      });
    } else {
      score += 15;
    }

    // Tax compliance validation
    if (!financialDetails.taxCompliance.taxJurisdiction) {
      warnings.push({
        field: 'taxJurisdiction',
        message: 'Tax jurisdiction should be specified',
        suggestion: 'Specify the tax jurisdiction for compliance'
      });
    } else {
      score += 10;
    }

    if (financialDetails.taxCompliance.taxStatus === 'non_compliant') {
      errors.push({
        field: 'taxStatus',
        message: 'Tax compliance is required',
        severity: 'error',
        suggestion: 'Ensure tax compliance before proceeding'
      });
    } else {
      score += 10;
    }

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score,
      completionPercentage: Math.round((score / 100) * 100)
    };
  }

  /**
   * Validate Technical Specifications step
   */
  private validateTechnicalSpecs(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    let score = 0;

    const { technicalSpecs } = request;

    // Blockchain validation
    if (!technicalSpecs.blockchain) {
      errors.push({
        field: 'blockchain',
        message: 'Blockchain selection is required',
        severity: 'error',
        suggestion: 'Select the blockchain for your token'
      });
    } else {
      score += 20;
    }

    // Security audit validation
    if (!technicalSpecs.securityAudit.completed) {
      errors.push({
        field: 'securityAudit',
        message: 'Security audit is required',
        severity: 'error',
        suggestion: 'Complete a security audit before deployment'
      });
    } else {
      score += 30;
      if (!technicalSpecs.securityAudit.auditor) {
        warnings.push({
          field: 'auditor',
          message: 'Auditor information is recommended',
          suggestion: 'Specify the security audit firm'
        });
      }
    }

    // Contract version validation
    if (!technicalSpecs.contractVersion) {
      warnings.push({
        field: 'contractVersion',
        message: 'Contract version is recommended',
        suggestion: 'Specify the smart contract version'
      });
    } else {
      score += 15;
    }

    // Oracle integration validation
    if (technicalSpecs.oracleIntegration.required && !technicalSpecs.oracleIntegration.provider) {
      warnings.push({
        field: 'oracleProvider',
        message: 'Oracle provider is required when oracle integration is enabled',
        suggestion: 'Specify the oracle provider'
      });
    } else {
      score += 15;
    }

    // Metadata validation
    if (!technicalSpecs.metadata.attributes || technicalSpecs.metadata.attributes.length === 0) {
      warnings.push({
        field: 'metadata',
        message: 'Asset metadata is recommended',
        suggestion: 'Add relevant metadata attributes'
      });
    } else {
      score += 20;
    }

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score,
      completionPercentage: Math.round((score / 100) * 100)
    };
  }

  /**
   * Validate Documents step
   */
  private validateDocuments(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    let score = 0;

    const { documents, assetType, tokenStandard } = request;

    // Get required documents for this asset type and token standard
    const requiredDocs = this.getRequiredDocuments(assetType, tokenStandard);
    const uploadedDocs = documents.map(doc => doc.type);
    const missingDocs = requiredDocs.filter(doc => !uploadedDocs.includes(doc as any));

    if (missingDocs.length > 0) {
      errors.push({
        field: 'documents',
        message: `Missing required documents: ${missingDocs.join(', ')}`,
        severity: 'error',
        suggestion: 'Upload all required documents for your asset type and token standard'
      });
    } else {
      score += 50;
    }

    // Document status validation
    const pendingDocs = documents.filter(doc => doc.status === 'pending');
    const rejectedDocs = documents.filter(doc => doc.status === 'rejected');

    if (rejectedDocs.length > 0) {
      errors.push({
        field: 'rejectedDocuments',
        message: `${rejectedDocs.length} document(s) have been rejected`,
        severity: 'error',
        suggestion: 'Address the issues with rejected documents and re-upload'
      });
    }

    if (pendingDocs.length > 0) {
      warnings.push({
        field: 'pendingDocuments',
        message: `${pendingDocs.length} document(s) are pending review`,
        suggestion: 'Wait for document review or contact support if taking too long'
      });
    }

    // Document quality suggestions
    if (documents.length < requiredDocs.length * 0.8) {
      suggestions.push({
        field: 'documentCompleteness',
        message: 'Consider uploading additional supporting documents',
        priority: 'medium',
        category: 'compliance'
      });
    }

    score += Math.round((documents.length / requiredDocs.length) * 50);

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score,
      completionPercentage: Math.round((score / 100) * 100)
    };
  }

  /**
   * Validate KYC Requirements step
   */
  private validateKYCRequirements(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    let score = 0;

    const { kycRequirements } = request;

    // Minimum investment validation
    if (!kycRequirements.minimumInvestment || kycRequirements.minimumInvestment <= 0) {
      errors.push({
        field: 'minimumInvestment',
        message: 'Minimum investment is required',
        severity: 'error',
        suggestion: 'Set a reasonable minimum investment amount'
      });
    } else {
      score += 25;
    }

    // Investor types validation
    if (!kycRequirements.investorTypes || kycRequirements.investorTypes.length === 0) {
      warnings.push({
        field: 'investorTypes',
        message: 'Investor types should be specified',
        suggestion: 'Define which types of investors can participate'
      });
    } else {
      score += 20;
    }

    // Geographic restrictions validation
    if (!kycRequirements.geographicRestrictions || kycRequirements.geographicRestrictions.length === 0) {
      warnings.push({
        field: 'geographicRestrictions',
        message: 'Geographic restrictions should be considered',
        suggestion: 'Define geographic restrictions based on regulations'
      });
    } else {
      score += 15;
    }

    // Additional requirements validation
    if (!kycRequirements.additionalRequirements || kycRequirements.additionalRequirements.length === 0) {
      warnings.push({
        field: 'additionalRequirements',
        message: 'Additional KYC requirements may be needed',
        suggestion: 'Consider additional verification requirements'
      });
    } else {
      score += 20;
    }

    // Accreditation validation
    if (kycRequirements.accreditationRequired && kycRequirements.minimumInvestment < 100000) {
      suggestions.push({
        field: 'accreditation',
        message: 'Consider if accreditation requirement aligns with minimum investment',
        priority: 'medium',
        category: 'compliance'
      });
    }

    score += 20; // Base score for having KYC requirements

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score,
      completionPercentage: Math.round((score / 100) * 100)
    };
  }

  /**
   * Validate Investor Criteria step
   */
  private validateInvestorCriteria(request: AssetCreationRequest): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    let score = 0;

    const { investorCriteria } = request;

    // Transfer restrictions validation
    if (!investorCriteria.transferRestrictions || investorCriteria.transferRestrictions.length === 0) {
      warnings.push({
        field: 'transferRestrictions',
        message: 'Transfer restrictions should be considered',
        suggestion: 'Define transfer restrictions to comply with regulations'
      });
    } else {
      score += 30;
    }

    // Investment limits validation
    if (investorCriteria.minimumNetWorth && investorCriteria.minimumNetWorth < 100000) {
      warnings.push({
        field: 'minimumNetWorth',
        message: 'Very low minimum net worth may not be appropriate',
        suggestion: 'Consider if minimum net worth aligns with risk profile'
      });
    } else {
      score += 20;
    }

    if (investorCriteria.minimumIncome && investorCriteria.minimumIncome < 50000) {
      warnings.push({
        field: 'minimumIncome',
        message: 'Very low minimum income may not be appropriate',
        suggestion: 'Consider if minimum income aligns with investment risk'
      });
    } else {
      score += 20;
    }

    // Maximum investors validation
    if (investorCriteria.maximumInvestors && investorCriteria.maximumInvestors < 10) {
      warnings.push({
        field: 'maximumInvestors',
        message: 'Very low maximum investors may limit participation',
        suggestion: 'Consider if maximum investor limit is appropriate'
      });
    } else {
      score += 15;
    }

    // Lockup period validation
    if (investorCriteria.lockupPeriod && investorCriteria.lockupPeriod > 24) {
      warnings.push({
        field: 'lockupPeriod',
        message: 'Very long lockup period may deter investors',
        suggestion: 'Consider if lockup period is reasonable for your asset type'
      });
    } else {
      score += 15;
    }

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings,
      suggestions,
      score,
      completionPercentage: Math.round((score / 100) * 100)
    };
  }

  /**
   * Calculate overall completion percentage
   */
  private calculateCompletionPercentage(request: AssetCreationRequest): number {
    const steps = [
      'basic_info', 'tokenization_details', 'legal_compliance', 
      'financial_details', 'technical_specs', 'documents', 
      'kyc_requirements', 'investor_criteria'
    ];

    let completedSteps = 0;
    steps.forEach(step => {
      const validation = this.validateStep(request, step as AssetCreationStep);
      if (validation.completionPercentage > 80) {
        completedSteps++;
      }
    });

    return Math.round((completedSteps / steps.length) * 100);
  }

  /**
   * Get next steps based on current validation
   */
  private getNextSteps(step: AssetCreationStep, validation: ValidationResult): string[] {
    const nextSteps: string[] = [];

    if (validation.errors.length > 0) {
      nextSteps.push('Fix all errors before proceeding');
    }

    if (validation.warnings.length > 0) {
      nextSteps.push('Review and address warnings');
    }

    if (validation.suggestions.length > 0) {
      nextSteps.push('Consider implementing suggestions for better results');
    }

    if (validation.score < 70) {
      nextSteps.push('Improve completion quality before submission');
    }

    return nextSteps;
  }

  /**
   * Get required documents for asset type and token standard
   */
  private getRequiredDocuments(assetType: string, tokenStandard: string): string[] {
    // This would typically come from the assetCreationService
    // For now, return a basic list
    const documentMap: Record<string, Record<string, string[]>> = {
      'property': {
        'ERC-20': ['title_deed', 'property_survey', 'valuation_report', 'insurance_policy'],
        'ERC-721': ['title_deed', 'property_survey', 'valuation_report', 'insurance_policy'],
        'ERC-1155': ['title_deed', 'property_survey', 'valuation_report', 'insurance_policy']
      },
      'container': {
        'ERC-20': ['warehouse_receipt', 'quality_certificate', 'origin_certificate', 'insurance_policy'],
        'ERC-721': ['warehouse_receipt', 'quality_certificate', 'origin_certificate', 'insurance_policy'],
        'ERC-1155': ['warehouse_receipt', 'quality_certificate', 'origin_certificate', 'insurance_policy']
      }
    };

    return documentMap[assetType]?.[tokenStandard] || [];
  }
}

export const assetValidationService = new AssetValidationService();
