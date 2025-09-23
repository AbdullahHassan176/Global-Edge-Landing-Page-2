'use client';

import { useState, useRef } from 'react';
import { fileUploadService } from '@/lib/services/fileUploadService';
import Icon from '@/components/ui/Icon';

interface FileUploadProps {
  category: 'kyc' | 'investment' | 'asset' | 'general';
  onUpload: (result: { success: boolean; url?: string; error?: string }) => void;
  multiple?: boolean;
  className?: string;
}

export default function FileUpload({ 
  category, 
  onUpload, 
  multiple = false, 
  className = '' 
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = fileUploadService.getDocumentTypes(category);
  const maxSize = fileUploadService.getMaxFileSize(category);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      onUpload({ success: false, error: 'Only one file allowed' });
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = fileArray.map(async (file) => {
        const result = await fileUploadService.uploadFile({
          file,
          folder: category,
          allowedTypes,
          maxSize,
        });

        if (result.success && result.url) {
          setUploadedFiles(prev => [...prev, { name: result.fileName || file.name, url: result.url! }]);
        }

        return result;
      });

      const results = await Promise.all(uploadPromises);
      const hasError = results.some(result => !result.success);
      
      if (hasError) {
        const errorMessage = results.find(result => !result.success)?.error || 'Upload failed';
        onUpload({ success: false, error: errorMessage });
      } else {
        onUpload({ success: true, url: results[0].url });
      }

    } catch (error) {
      onUpload({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      });
    } finally {
      setUploading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'kyc': return 'KYC Documents';
      case 'investment': return 'Investment Documents';
      case 'asset': return 'Asset Documents';
      default: return 'Documents';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-global-teal bg-teal-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={allowedTypes.join(',')}
          onChange={handleChange}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-global-teal mb-4"></div>
            <p className="text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Icon name="cloud-upload" className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {dragActive ? 'Drop files here' : `Upload ${getCategoryTitle()}`}
            </p>
            <p className="text-gray-600 mb-4">
              Drag and drop files here, or{' '}
              <button
                onClick={openFileDialog}
                className="text-global-teal hover:text-teal-600 underline"
              >
                browse files
              </button>
            </p>
            <div className="text-sm text-gray-500">
              <p>Max file size: {formatFileSize(maxSize)}</p>
              <p>Allowed types: {allowedTypes.map(type => type.split('/')[1]).join(', ')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Uploaded Files:</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <Icon name="document" className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-global-teal hover:text-teal-600 text-sm"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
