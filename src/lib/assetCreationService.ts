/**
 * Asset Creation Service
 * Handles comprehensive asset creation workflow with admin approval
 */

export interface AssetCreationRequest {
  id: string;
  issuerId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'live' | 'paused' | 'completed';
  tokenStandard: 'ERC-20' | 'ERC-721' | 'ERC-1155' | 'Custom';
  assetType: 'container' | 'property' | 'inventory' | 'vault' | 'commodity' | 'artwork' | 'intellectual_property';
  basicInfo: AssetBasicInfo;
  tokenizationDetails: TokenizationDetails;
  legalCompliance: LegalCompliance;
  financialDetails: FinancialDetails;
  technicalSpecs: TechnicalSpecs;
  documents: AssetDocument[];
  kycRequirements: KYCRequirements;
  investorCriteria: InvestorCriteria;
  reviewHistory: ReviewEntry[];
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  approvedBy?: string;
}

export interface AssetBasicInfo {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  location: string;
  country: string;
  region: string;
  images: string[];
  videos?: string[];
  virtualTour?: string;
  tags: string[];
}

export interface TokenizationDetails {
  totalTokens: number;
  tokenPrice: number;
  minimumInvestment: number;
  maximumInvestment?: number;
  tokenSymbol: string;
  tokenName: string;
  decimals: number;
  tokenomics: Tokenomics;
  vestingSchedule?: VestingSchedule;
  liquidityPlan: LiquidityPlan;
}

export interface Tokenomics {
  totalSupply: number;
  circulatingSupply: number;
  reservedTokens: number;
  issuerTokens: number;
  investorTokens: number;
  platformTokens: number;
  burnMechanism?: BurnMechanism;
  stakingRewards?: StakingRewards;
}

export interface BurnMechanism {
  enabled: boolean;
  burnPercentage: number;
  burnConditions: string[];
}

export interface StakingRewards {
  enabled: boolean;
  rewardRate: number;
  lockPeriod: number;
  minimumStake: number;
}

export interface VestingSchedule {
  enabled: boolean;
  vestingPeriod: number; // in months
  cliffPeriod: number; // in months
  vestingType: 'linear' | 'cliff' | 'custom';
  customSchedule?: VestingEntry[];
}

export interface VestingEntry {
  period: number; // months
  percentage: number;
}

export interface LiquidityPlan {
  primaryMarket: boolean;
  secondaryMarket: boolean;
  liquidityPool: boolean;
  exchangeListings: string[];
  marketMaker: string;
}

export interface LegalCompliance {
  jurisdiction: string;
  regulatoryFramework: string;
  complianceRequirements: ComplianceRequirement[];
  legalOpinion: LegalOpinion;
  insurance: InsuranceDetails;
  escrowAgent: string;
  custodian: string;
}

export interface ComplianceRequirement {
  type: 'securities' | 'anti_money_laundering' | 'know_your_customer' | 'tax' | 'environmental' | 'safety';
  description: string;
  required: boolean;
  status: 'pending' | 'completed' | 'exempt';
  documents: string[];
  expiryDate?: string;
}

export interface LegalOpinion {
  provided: boolean;
  lawFirm: string;
  opinionDate: string;
  documentUrl: string;
  summary: string;
}

export interface InsuranceDetails {
  required: boolean;
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  expiryDate: string;
  documentUrl: string;
}

export interface FinancialDetails {
  valuation: ValuationDetails;
  revenueModel: RevenueModel;
  financialProjections: FinancialProjection[];
  auditReports: AuditReport[];
  taxCompliance: TaxCompliance;
}

export interface ValuationDetails {
  valuationMethod: 'comparable_sales' | 'income_approach' | 'cost_approach' | 'hybrid';
  valuationAmount: number;
  valuationDate: string;
  valuator: string;
  documentUrl: string;
  currency: string;
}

export interface RevenueModel {
  type: 'rental' | 'appreciation' | 'dividends' | 'royalties' | 'hybrid';
  expectedReturn: number;
  returnFrequency: 'monthly' | 'quarterly' | 'annually' | 'on_exit';
  revenueSharing: RevenueSharing;
}

export interface RevenueSharing {
  investorPercentage: number;
  issuerPercentage: number;
  platformPercentage: number;
  distributionMethod: 'automatic' | 'manual';
}

export interface FinancialProjection {
  year: number;
  revenue: number;
  expenses: number;
  netIncome: number;
  assumptions: string[];
}

export interface AuditReport {
  year: number;
  auditor: string;
  auditType: 'full' | 'limited' | 'review';
  opinion: 'unqualified' | 'qualified' | 'adverse' | 'disclaimer';
  documentUrl: string;
}

export interface TaxCompliance {
  taxJurisdiction: string;
  taxId: string;
  taxStatus: 'compliant' | 'pending' | 'non_compliant';
  lastFiling: string;
  nextFiling: string;
  documentUrl: string;
}

export interface TechnicalSpecs {
  blockchain: string;
  smartContractAddress?: string;
  contractVersion: string;
  securityAudit: SecurityAudit;
  oracleIntegration: OracleIntegration;
  metadata: AssetMetadata;
}

export interface SecurityAudit {
  completed: boolean;
  auditor: string;
  auditDate: string;
  findings: SecurityFinding[];
  documentUrl: string;
  score: number;
}

export interface SecurityFinding {
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  status: 'open' | 'resolved' | 'accepted';
  resolution?: string;
}

export interface OracleIntegration {
  required: boolean;
  provider: string;
  dataFeeds: string[];
  updateFrequency: string;
}

export interface AssetMetadata {
  ipfsHash?: string;
  metadataUrl?: string;
  attributes: AssetAttribute[];
}

export interface AssetAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface AssetDocument {
  id: string;
  type: AssetDocumentType;
  name: string;
  description: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  required: boolean;
  expiryDate?: string;
}

export type AssetDocumentType = 
  | 'title_deed' | 'property_survey' | 'valuation_report' | 'insurance_policy'
  | 'legal_opinion' | 'audit_report' | 'tax_certificate' | 'compliance_certificate'
  | 'technical_specification' | 'security_audit' | 'regulatory_approval'
  | 'environmental_assessment' | 'safety_certificate' | 'inspection_report'
  | 'financial_statements' | 'business_plan' | 'market_analysis'
  | 'intellectual_property_certificate' | 'export_license' | 'import_license'
  | 'warehouse_receipt' | 'quality_certificate' | 'origin_certificate';

export interface KYCRequirements {
  investorTypes: InvestorType[];
  minimumInvestment: number;
  maximumInvestment?: number;
  geographicRestrictions: GeographicRestriction[];
  accreditationRequired: boolean;
  additionalRequirements: AdditionalRequirement[];
}

export interface InvestorType {
  type: 'accredited' | 'qualified' | 'retail' | 'institutional' | 'family_office';
  description: string;
  requirements: string[];
}

export interface GeographicRestriction {
  country: string;
  restriction: 'allowed' | 'prohibited' | 'limited';
  limitations?: string[];
}

export interface AdditionalRequirement {
  type: 'source_of_funds' | 'investment_experience' | 'risk_tolerance' | 'custom';
  description: string;
  required: boolean;
  validationMethod: 'document' | 'questionnaire' | 'verification';
}

export interface InvestorCriteria {
  minimumNetWorth?: number;
  minimumIncome?: number;
  minimumInvestmentExperience?: number; // in years
  maximumInvestors?: number;
  lockupPeriod?: number; // in months
  transferRestrictions: TransferRestriction[];
}

export interface TransferRestriction {
  type: 'time_based' | 'accreditation' | 'geographic' | 'volume';
  description: string;
  duration?: number;
  conditions: string[];
}

export interface ReviewEntry {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: 'admin' | 'compliance' | 'legal' | 'technical' | 'financial';
  status: 'pending' | 'approved' | 'rejected' | 'requires_changes';
  comments: string;
  reviewedAt: string;
  requiredChanges?: string[];
  nextReviewDate?: string;
}

// Asset creation workflow states
export const ASSET_CREATION_STEPS = [
  'basic_info',
  'tokenization_details',
  'legal_compliance',
  'financial_details',
  'technical_specs',
  'documents',
  'kyc_requirements',
  'investor_criteria',
  'review_submission'
] as const;

export type AssetCreationStep = typeof ASSET_CREATION_STEPS[number];

// Document requirements by asset type and token standard
export const DOCUMENT_REQUIREMENTS: Record<string, Record<string, AssetDocumentType[]>> = {
  'property': {
    'ERC-20': [
      'title_deed', 'property_survey', 'valuation_report', 'insurance_policy',
      'legal_opinion', 'audit_report', 'tax_certificate', 'compliance_certificate',
      'environmental_assessment', 'safety_certificate', 'inspection_report'
    ],
    'ERC-721': [
      'title_deed', 'property_survey', 'valuation_report', 'insurance_policy',
      'legal_opinion', 'audit_report', 'tax_certificate', 'compliance_certificate',
      'environmental_assessment', 'safety_certificate', 'inspection_report'
    ],
    'ERC-1155': [
      'title_deed', 'property_survey', 'valuation_report', 'insurance_policy',
      'legal_opinion', 'audit_report', 'tax_certificate', 'compliance_certificate',
      'environmental_assessment', 'safety_certificate', 'inspection_report'
    ]
  },
  'container': {
    'ERC-20': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'export_license'
    ],
    'ERC-721': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'export_license'
    ],
    'ERC-1155': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'export_license'
    ]
  },
  'inventory': {
    'ERC-20': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'business_plan'
    ],
    'ERC-721': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'business_plan'
    ],
    'ERC-1155': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'business_plan'
    ]
  },
  'vault': {
    'ERC-20': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'safety_certificate'
    ],
    'ERC-721': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'safety_certificate'
    ],
    'ERC-1155': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'safety_certificate'
    ]
  },
  'commodity': {
    'ERC-20': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'market_analysis'
    ],
    'ERC-721': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'market_analysis'
    ],
    'ERC-1155': [
      'warehouse_receipt', 'quality_certificate', 'origin_certificate',
      'insurance_policy', 'legal_opinion', 'audit_report', 'tax_certificate',
      'compliance_certificate', 'inspection_report', 'market_analysis'
    ]
  },
  'artwork': {
    'ERC-721': [
      'intellectual_property_certificate', 'valuation_report', 'insurance_policy',
      'legal_opinion', 'audit_report', 'tax_certificate', 'compliance_certificate',
      'inspection_report', 'origin_certificate', 'authenticity_certificate'
    ],
    'ERC-1155': [
      'intellectual_property_certificate', 'valuation_report', 'insurance_policy',
      'legal_opinion', 'audit_report', 'tax_certificate', 'compliance_certificate',
      'inspection_report', 'origin_certificate', 'authenticity_certificate'
    ]
  },
  'intellectual_property': {
    'ERC-20': [
      'intellectual_property_certificate', 'valuation_report', 'legal_opinion',
      'audit_report', 'tax_certificate', 'compliance_certificate',
      'business_plan', 'market_analysis', 'technical_specification'
    ],
    'ERC-721': [
      'intellectual_property_certificate', 'valuation_report', 'legal_opinion',
      'audit_report', 'tax_certificate', 'compliance_certificate',
      'business_plan', 'market_analysis', 'technical_specification'
    ],
    'ERC-1155': [
      'intellectual_property_certificate', 'valuation_report', 'legal_opinion',
      'audit_report', 'tax_certificate', 'compliance_certificate',
      'business_plan', 'market_analysis', 'technical_specification'
    ]
  }
};

class AssetCreationService {
  private readonly STORAGE_KEY = 'asset_creation_requests';

  /**
   * Create a new asset creation request
   */
  async createAssetRequest(issuerId: string): Promise<AssetCreationRequest> {
    const request: AssetCreationRequest = {
      id: `asset-req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      issuerId,
      status: 'draft',
      tokenStandard: 'ERC-20',
      assetType: 'container',
      basicInfo: {
        name: '',
        description: '',
        category: '',
        subcategory: '',
        location: '',
        country: '',
        region: '',
        images: [],
        tags: []
      },
      tokenizationDetails: {
        totalTokens: 0,
        tokenPrice: 0,
        minimumInvestment: 0,
        tokenSymbol: '',
        tokenName: '',
        decimals: 18,
        tokenomics: {
          totalSupply: 0,
          circulatingSupply: 0,
          reservedTokens: 0,
          issuerTokens: 0,
          investorTokens: 0,
          platformTokens: 0
        },
        liquidityPlan: {
          primaryMarket: true,
          secondaryMarket: false,
          liquidityPool: false,
          exchangeListings: [],
          marketMaker: ''
        }
      },
      legalCompliance: {
        jurisdiction: '',
        regulatoryFramework: '',
        complianceRequirements: [],
        legalOpinion: {
          provided: false,
          lawFirm: '',
          opinionDate: '',
          documentUrl: '',
          summary: ''
        },
        insurance: {
          required: true,
          provider: '',
          policyNumber: '',
          coverageAmount: 0,
          expiryDate: '',
          documentUrl: ''
        },
        escrowAgent: '',
        custodian: ''
      },
      financialDetails: {
        valuation: {
          valuationMethod: 'comparable_sales',
          valuationAmount: 0,
          valuationDate: '',
          valuator: '',
          documentUrl: '',
          currency: 'USD'
        },
        revenueModel: {
          type: 'rental',
          expectedReturn: 0,
          returnFrequency: 'annually',
          revenueSharing: {
            investorPercentage: 80,
            issuerPercentage: 15,
            platformPercentage: 5,
            distributionMethod: 'automatic'
          }
        },
        financialProjections: [],
        auditReports: [],
        taxCompliance: {
          taxJurisdiction: '',
          taxId: '',
          taxStatus: 'pending',
          lastFiling: '',
          nextFiling: '',
          documentUrl: ''
        }
      },
      technicalSpecs: {
        blockchain: 'Ethereum',
        contractVersion: '1.0.0',
        securityAudit: {
          completed: false,
          auditor: '',
          auditDate: '',
          findings: [],
          documentUrl: '',
          score: 0
        },
        oracleIntegration: {
          required: false,
          provider: '',
          dataFeeds: [],
          updateFrequency: ''
        },
        metadata: {
          attributes: []
        }
      },
      documents: [],
      kycRequirements: {
        investorTypes: [],
        minimumInvestment: 0,
        geographicRestrictions: [],
        accreditationRequired: false,
        additionalRequirements: []
      },
      investorCriteria: {
        transferRestrictions: []
      },
      reviewHistory: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.saveAssetRequest(request);
    return request;
  }

  /**
   * Update asset creation request
   */
  async updateAssetRequest(requestId: string, updates: Partial<AssetCreationRequest>): Promise<AssetCreationRequest | null> {
    const requests = this.getAssetRequests();
    const index = requests.findIndex(req => req.id === requestId);
    
    if (index === -1) return null;

    requests[index] = {
      ...requests[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveAssetRequests(requests);
    return requests[index];
  }

  /**
   * Submit asset for review
   */
  async submitForReview(requestId: string): Promise<boolean> {
    const request = await this.updateAssetRequest(requestId, {
      status: 'submitted',
      submittedAt: new Date().toISOString()
    });

    if (request) {
      // Add initial review entry
      const reviewEntry: ReviewEntry = {
        id: `review-${Date.now()}`,
        reviewerId: 'system',
        reviewerName: 'System',
        reviewerRole: 'admin',
        status: 'pending',
        comments: 'Asset submitted for review',
        reviewedAt: new Date().toISOString()
      };

      await this.updateAssetRequest(requestId, {
        reviewHistory: [...request.reviewHistory, reviewEntry]
      });

      return true;
    }

    return false;
  }

  /**
   * Get required documents for asset type and token standard
   */
  getRequiredDocuments(assetType: string, tokenStandard: string): AssetDocumentType[] {
    return DOCUMENT_REQUIREMENTS[assetType]?.[tokenStandard] || [];
  }

  /**
   * Validate asset creation request
   */
  validateAssetRequest(request: AssetCreationRequest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic info validation
    if (!request.basicInfo.name) errors.push('Asset name is required');
    if (!request.basicInfo.description) errors.push('Asset description is required');
    if (!request.basicInfo.location) errors.push('Asset location is required');
    if (request.basicInfo.images.length === 0) errors.push('At least one image is required');

    // Tokenization validation
    if (request.tokenizationDetails.totalTokens <= 0) errors.push('Total tokens must be greater than 0');
    if (request.tokenizationDetails.tokenPrice <= 0) errors.push('Token price must be greater than 0');
    if (request.tokenizationDetails.minimumInvestment <= 0) errors.push('Minimum investment must be greater than 0');
    if (!request.tokenizationDetails.tokenSymbol) errors.push('Token symbol is required');
    if (!request.tokenizationDetails.tokenName) errors.push('Token name is required');

    // Financial validation
    if (request.financialDetails.valuation.valuationAmount <= 0) errors.push('Valuation amount must be greater than 0');
    if (!request.financialDetails.valuation.valuator) errors.push('Valuator is required');

    // Document validation
    const requiredDocs = this.getRequiredDocuments(request.assetType, request.tokenStandard);
    const uploadedDocs = request.documents.map(doc => doc.type);
    const missingDocs = requiredDocs.filter(doc => !uploadedDocs.includes(doc));
    
    if (missingDocs.length > 0) {
      errors.push(`Missing required documents: ${missingDocs.join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get asset creation requests for issuer
   */
  getAssetRequestsForIssuer(issuerId: string): AssetCreationRequest[] {
    return this.getAssetRequests().filter(req => req.issuerId === issuerId);
  }

  /**
   * Get all asset creation requests (for admin)
   */
  getAllAssetRequests(): AssetCreationRequest[] {
    return this.getAssetRequests();
  }

  /**
   * Get asset creation request by ID
   */
  getAssetRequestById(requestId: string): AssetCreationRequest | null {
    return this.getAssetRequests().find(req => req.id === requestId) || null;
  }

  // Private methods
  private getAssetRequests(): AssetCreationRequest[] {
    if (typeof window === 'undefined') return [];
    const requests = localStorage.getItem(this.STORAGE_KEY);
    return requests ? JSON.parse(requests) : [];
  }

  private saveAssetRequest(request: AssetCreationRequest): void {
    const requests = this.getAssetRequests();
    const index = requests.findIndex(req => req.id === request.id);
    
    if (index === -1) {
      requests.push(request);
    } else {
      requests[index] = request;
    }

    this.saveAssetRequests(requests);
  }

  private saveAssetRequests(requests: AssetCreationRequest[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
    }
  }
}

export const assetCreationService = new AssetCreationService();
