/**
 * Database Models for Tokenized Assets Platform
 * 
 * This file contains all TypeScript interfaces and types for the database schema
 * used in the Global Edge tokenized assets platform.
 */

// ============================================================================
// USER MANAGEMENT MODELS
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  role: 'admin' | 'issuer' | 'investor' | 'moderator';
  status: 'active' | 'pending' | 'suspended' | 'verified';
  accountType: 'individual' | 'corporate';
  kycStatus: 'pending' | 'approved' | 'rejected' | 'not_started';
  totalInvested: number;
  investmentLimit: number;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  permissions: string[];
  // Additional fields for different user types
  companyName?: string; // For corporate accounts
  taxId?: string; // For corporate accounts
  dateOfBirth?: string; // For individual accounts
  address?: Address;
  emergencyContact?: EmergencyContact;
  // Investment tracking
  assetsCreated?: number; // For issuers
  assetsUnderManagement?: number; // For issuers
  // Security
  twoFactorEnabled: boolean;
  passwordResetToken?: string;
  emailVerificationToken?: string;
  emailVerified: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

// ============================================================================
// ASSET MANAGEMENT MODELS
// ============================================================================

export interface Asset {
  id: string;
  name: string;
  type: 'container' | 'property' | 'inventory' | 'vault';
  description: string;
  value: string; // Monetary value as string
  apr: string; // Annual percentage rate as string
  risk: 'Low' | 'Medium' | 'High';
  route?: string; // For container assets
  cargo?: string; // For container assets
  status: 'active' | 'inactive' | 'pending';
  image: string;
  createdAt: string;
  updatedAt: string;
  // Additional asset details
  issuerId: string;
  tokenStandard: 'ERC-20' | 'ERC-721' | 'ERC-1155' | 'Custom';
  totalSupply: number;
  availableSupply: number;
  minimumInvestment: number;
  maximumInvestment: number;
  investmentDeadline?: string;
  // Financial details
  expectedReturn: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  maturityDate?: string;
  // Location and logistics
  location: AssetLocation;
  logistics: LogisticsInfo;
  // Compliance and legal
  complianceStatus: 'pending' | 'approved' | 'rejected';
  legalDocuments: DocumentReference[];
  // Performance metrics
  performanceMetrics: PerformanceMetrics;
  // Admin approval
  adminApproved: boolean;
  adminApprovedBy?: string;
  adminApprovedAt?: string;
  adminNotes?: string;
}

export interface AssetLocation {
  country: string;
  city: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  address?: string;
}

export interface LogisticsInfo {
  shippingCompany?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  insuranceProvider?: string;
  insuranceAmount?: number;
}

export interface DocumentReference {
  id: string;
  name: string;
  type: 'investment_agreement' | 'kyc_document' | 'proof_of_funds' | 'tax_document';
  url: string;
  uploadedAt: string;
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PerformanceMetrics {
  totalInvestments: number;
  totalInvestors: number;
  averageInvestmentSize: number;
  returnRate: number;
  volatility: number;
  lastUpdated: string;
}

// ============================================================================
// INVESTMENT MODELS
// ============================================================================

export interface Investment {
  id: string;
  userId: string;
  assetId: string;
  amount: number;
  tokens: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  // Investment details
  investmentType: 'primary' | 'secondary';
  paymentMethod: 'bank_transfer' | 'crypto' | 'credit_card';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  // KYC and compliance
  kycRequired: boolean;
  kycCompleted: boolean;
  kycStatus: 'pending' | 'approved' | 'rejected';
  // Financial tracking
  expectedReturn: number;
  actualReturn?: number;
  fees: InvestmentFees;
  // Timeline
  investmentDate?: string;
  maturityDate?: string;
  // Documents
  documents: DocumentReference[];
  // Admin tracking
  adminNotes?: string;
  adminApprovedBy?: string;
  adminApprovedAt?: string;
}

export interface InvestmentFees {
  platformFee: number;
  processingFee: number;
  managementFee: number;
  totalFees: number;
}

// ============================================================================
// KYC MODELS
// ============================================================================

export interface KYCApplication {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  // Personal information
  personalInfo: PersonalInfo;
  // Identity verification
  identityDocuments: IdentityDocument[];
  // Address verification
  addressDocuments: AddressDocument[];
  // Financial information
  financialInfo: FinancialInfo;
  // Risk assessment
  riskScore: number;
  riskFactors: string[];
  // Compliance
  complianceChecks: ComplianceCheck[];
  // Notes and comments
  adminNotes?: string;
  rejectionReason?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  occupation: string;
  employer?: string;
  annualIncome: number;
  sourceOfFunds: string;
}

export interface IdentityDocument {
  type: 'passport' | 'drivers_license' | 'national_id';
  number: string;
  country: string;
  expiryDate: string;
  documentUrl: string;
  verified: boolean;
}

export interface AddressDocument {
  type: 'utility_bill' | 'bank_statement' | 'government_letter';
  documentUrl: string;
  issueDate: string;
  verified: boolean;
}

export interface FinancialInfo {
  bankName: string;
  accountNumber: string;
  routingNumber?: string;
  swiftCode?: string;
  bankCountry: string;
  investmentExperience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

export interface ComplianceCheck {
  checkType: string;
  status: 'passed' | 'failed' | 'pending';
  details: string;
  checkedAt: string;
}

// ============================================================================
// NOTIFICATION MODELS
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: 'investment_update' | 'kyc_required' | 'kyc_approved' | 'kyc_rejected' | 'payment_required' | 'investment_completed' | 'system_alert';
  title: string;
  message: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  actionUrl?: string;
  // Additional data
  data?: Record<string, any>;
  actionText?: string;
  // Email/SMS tracking
  emailSent: boolean;
  smsSent: boolean;
  pushSent: boolean;
}

// ============================================================================
// ADMIN MODELS
// ============================================================================

export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  resourceType: 'user' | 'asset' | 'investment' | 'kyc' | 'system';
  resourceId: string;
  details: Record<string, any>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export interface AssetCreationRequest {
  id: string;
  issuerId: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  // Asset details
  basicInfo: AssetBasicInfo;
  financialDetails: FinancialDetails;
  legalCompliance: LegalCompliance;
  documents: DocumentReference[];
  // Review process
  reviewHistory: ReviewEntry[];
  adminNotes?: string;
  rejectionReason?: string;
}

export interface AssetBasicInfo {
  name: string;
  description: string;
  category: string;
  location: string;
  images: string[];
}

export interface FinancialDetails {
  valuation: {
    valuationAmount: number;
    currency: string;
    valuationDate: string;
    valuator: string;
  };
  revenueModel: {
    expectedReturn: number;
    revenueStreams: string[];
    riskAssessment: string;
  };
}

export interface LegalCompliance {
  legalStructure: string;
  regulatoryCompliance: string[];
  insuranceCoverage: string;
  riskFactors: string[];
}

export interface ReviewEntry {
  reviewerId: string;
  status: 'pending' | 'approved' | 'rejected';
  comments: string;
  timestamp: string;
}

// ============================================================================
// BRANDING AND CUSTOMIZATION MODELS
// ============================================================================

export interface IssuerBranding {
  id: string;
  issuerId: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customDomain?: string;
  customCss?: string;
  footerText?: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
  updatedAt: string;
}

// ============================================================================
// SYSTEM CONFIGURATION MODELS
// ============================================================================

export interface SystemSetting {
  id: string;
  category: 'general' | 'security' | 'notifications' | 'payments' | 'compliance';
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json';
  description: string;
  updatedAt: string;
  updatedBy: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  changes: Record<string, any>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type UserRole = 'admin' | 'issuer' | 'investor' | 'moderator';
export type AssetType = 'container' | 'property' | 'inventory' | 'vault';
export type InvestmentStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
export type KYCStatus = 'pending' | 'approved' | 'rejected' | 'under_review';
export type NotificationType = 'investment' | 'kyc' | 'asset' | 'system' | 'admin';
export type DocumentType = 'passport' | 'drivers_license' | 'national_id' | 'utility_bill' | 'bank_statement' | 'government_letter';

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// QUERY TYPES
// ============================================================================

export interface QueryOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface AssetQueryOptions extends QueryOptions {
  type?: AssetType;
  status?: string;
  issuerId?: string;
  minValue?: number;
  maxValue?: number;
  riskLevel?: string;
}

export interface InvestmentQueryOptions extends QueryOptions {
  userId?: string;
  assetId?: string;
  status?: InvestmentStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface UserQueryOptions extends QueryOptions {
  role?: UserRole;
  status?: string;
  kycStatus?: KYCStatus;
  country?: string;
}
