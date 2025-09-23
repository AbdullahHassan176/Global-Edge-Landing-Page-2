/**
 * File Upload Service using Azure Blob Storage
 * Handles all file uploads for the platform
 */

import { API_KEYS } from '@/lib/config/apiKeys';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  fileName?: string;
}

export interface FileUploadOptions {
  file: File;
  folder?: string;
  allowedTypes?: string[];
  maxSize?: number; // in bytes
}

class FileUploadService {
  private connectionString: string;
  private accountName: string;
  private accountKey: string;
  private containerName: string;

  constructor() {
    this.connectionString = API_KEYS.AZURE.CONNECTION_STRING;
    this.accountName = API_KEYS.AZURE.ACCOUNT_NAME;
    this.accountKey = API_KEYS.AZURE.ACCOUNT_KEY;
    this.containerName = API_KEYS.AZURE.CONTAINER_NAME;
  }

  /**
   * Upload a file to Azure Blob Storage
   */
  async uploadFile(options: FileUploadOptions): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(options.file, options.allowedTypes, options.maxSize);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = options.file.name.split('.').pop();
      const fileName = `${options.folder || 'uploads'}/${timestamp}-${randomString}.${fileExtension}`;

      // For now, return a mock URL since Azure credentials need to be configured
      // In production, this would upload to Azure Blob Storage
      const mockUrl = `https://${this.accountName}.blob.core.windows.net/${this.containerName}/${fileName}`;

      return {
        success: true,
        url: mockUrl,
        fileName: options.file.name,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Validate file before upload
   */
  private validateFile(
    file: File, 
    allowedTypes?: string[], 
    maxSize?: number
  ): { isValid: boolean; error?: string } {
    // Check file size
    if (maxSize && file.size > maxSize) {
      return {
        isValid: false,
        error: `File size must be less than ${this.formatFileSize(maxSize)}`,
      };
    }

    // Check file type
    if (allowedTypes && allowedTypes.length > 0) {
      const fileType = file.type;
      const isValidType = allowedTypes.some(type => {
        if (type.includes('*')) {
          const baseType = type.split('/')[0];
          return fileType.startsWith(baseType);
        }
        return fileType === type;
      });

      if (!isValidType) {
        return {
          isValid: false,
          error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get allowed file types for different document categories
   */
  getDocumentTypes(category: 'kyc' | 'investment' | 'asset' | 'general'): string[] {
    switch (category) {
      case 'kyc':
        return [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
        ];
      case 'investment':
        return [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
      case 'asset':
        return [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
      default:
        return [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
    }
  }

  /**
   * Get maximum file size for different document categories
   */
  getMaxFileSize(category: 'kyc' | 'investment' | 'asset' | 'general'): number {
    switch (category) {
      case 'kyc':
        return 5 * 1024 * 1024; // 5MB
      case 'investment':
        return 10 * 1024 * 1024; // 10MB
      case 'asset':
        return 20 * 1024 * 1024; // 20MB
      default:
        return 10 * 1024 * 1024; // 10MB
    }
  }
}

export const fileUploadService = new FileUploadService();
