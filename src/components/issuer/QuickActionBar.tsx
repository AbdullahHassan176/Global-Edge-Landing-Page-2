'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface QuickActionBarProps {
  assetKey: string;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function ConfirmDialog({ 
  isOpen, 
  title, 
  message, 
  confirmText, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
            <Icon name="exclamation-triangle" className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
          >
            {isLoading && <Icon name="spinner" className="animate-spin w-4 h-4 mr-2" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QuickActionBar({ assetKey }: QuickActionBarProps) {
  const [showRotateDialog, setShowRotateDialog] = useState(false);
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [showBackfillDialog, setShowBackfillDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState<{
    rotateKey: 'idle' | 'success' | 'error';
    lockTransfers: 'idle' | 'success' | 'error';
    backfill: 'idle' | 'success' | 'error';
  }>({
    rotateKey: 'idle',
    lockTransfers: 'idle',
    backfill: 'idle'
  });

  const showToast = (type: 'success' | 'error', message: string) => {
    // TODO: Integrate with notification system
    console.log(`${type.toUpperCase()}: ${message}`);
    // For now, we'll use a simple alert
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const handleRotateKey = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call when endpoint is live
      const payload = { assetKey };
      console.log('Rotating Oracle Key:', payload);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success/failure
      const success = Math.random() > 0.1; // 90% success rate
      
      if (success) {
        setActionStatus(prev => ({ ...prev, rotateKey: 'success' }));
        showToast('success', 'Oracle key rotated successfully');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setActionStatus(prev => ({ ...prev, rotateKey: 'idle' }));
        }, 3000);
      } else {
        setActionStatus(prev => ({ ...prev, rotateKey: 'error' }));
        showToast('error', 'Failed to rotate oracle key');
      }
    } catch (error) {
      console.error('Error rotating oracle key:', error);
      setActionStatus(prev => ({ ...prev, rotateKey: 'error' }));
      showToast('error', 'Failed to rotate oracle key');
    } finally {
      setIsLoading(false);
      setShowRotateDialog(false);
    }
  };

  const handleLockTransfers = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call when endpoint is live
      const payload = { assetKey };
      console.log('Locking Transfers:', payload);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simulate success/failure
      const success = Math.random() > 0.05; // 95% success rate
      
      if (success) {
        setActionStatus(prev => ({ ...prev, lockTransfers: 'success' }));
        showToast('success', 'Asset transfers locked successfully');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setActionStatus(prev => ({ ...prev, lockTransfers: 'idle' }));
        }, 3000);
      } else {
        setActionStatus(prev => ({ ...prev, lockTransfers: 'error' }));
        showToast('error', 'Failed to lock transfers');
      }
    } catch (error) {
      console.error('Error locking transfers:', error);
      setActionStatus(prev => ({ ...prev, lockTransfers: 'error' }));
      showToast('error', 'Failed to lock transfers');
    } finally {
      setIsLoading(false);
      setShowLockDialog(false);
    }
  };

  const handleBackfillEvents = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call when endpoint is live
      const payload = { assetKey, hours: 48 };
      console.log('Backfilling Events:', payload);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure
      const success = Math.random() > 0.15; // 85% success rate
      
      if (success) {
        setActionStatus(prev => ({ ...prev, backfill: 'success' }));
        showToast('success', 'Events backfilled successfully for last 48 hours');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setActionStatus(prev => ({ ...prev, backfill: 'idle' }));
        }, 3000);
      } else {
        setActionStatus(prev => ({ ...prev, backfill: 'error' }));
        showToast('error', 'Failed to backfill events');
      }
    } catch (error) {
      console.error('Error backfilling events:', error);
      setActionStatus(prev => ({ ...prev, backfill: 'error' }));
      showToast('error', 'Failed to backfill events');
    } finally {
      setIsLoading(false);
      setShowBackfillDialog(false);
    }
  };

  const getButtonStatus = (status: 'idle' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
    }
  };

  const getButtonIcon = (action: string, status: 'idle' | 'success' | 'error') => {
    if (status === 'success') return 'check-circle';
    if (status === 'error') return 'exclamation-triangle';
    
    switch (action) {
      case 'rotateKey':
        return 'key';
      case 'lockTransfers':
        return 'lock-closed';
      case 'backfill':
        return 'arrow-path';
      default:
        return 'cog-6-tooth';
    }
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        {/* Rotate Oracle Key */}
        <button
          onClick={() => setShowRotateDialog(true)}
          disabled={isLoading}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${getButtonStatus(actionStatus.rotateKey)}`}
        >
          <Icon 
            name={getButtonIcon('rotateKey', actionStatus.rotateKey)} 
            className="w-4 h-4 mr-2" 
          />
          Rotate Oracle Key
        </button>

        {/* Lock Transfers */}
        <button
          onClick={() => setShowLockDialog(true)}
          disabled={isLoading}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${getButtonStatus(actionStatus.lockTransfers)}`}
        >
          <Icon 
            name={getButtonIcon('lockTransfers', actionStatus.lockTransfers)} 
            className="w-4 h-4 mr-2" 
          />
          Lock Transfers
        </button>

        {/* Backfill Events */}
        <button
          onClick={() => setShowBackfillDialog(true)}
          disabled={isLoading}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${getButtonStatus(actionStatus.backfill)}`}
        >
          <Icon 
            name={getButtonIcon('backfill', actionStatus.backfill)} 
            className="w-4 h-4 mr-2" 
          />
          Backfill Events
        </button>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={showRotateDialog}
        title="Rotate Oracle Key"
        message="This will generate a new oracle key for this asset. The old key will be invalidated immediately. Are you sure you want to continue?"
        confirmText="Rotate Key"
        onConfirm={handleRotateKey}
        onCancel={() => setShowRotateDialog(false)}
        isLoading={isLoading}
      />

      <ConfirmDialog
        isOpen={showLockDialog}
        title="Lock Asset Transfers"
        message="This will prevent all transfer operations for this asset until manually unlocked. Are you sure you want to continue?"
        confirmText="Lock Transfers"
        onConfirm={handleLockTransfers}
        onCancel={() => setShowLockDialog(false)}
        isLoading={isLoading}
      />

      <ConfirmDialog
        isOpen={showBackfillDialog}
        title="Backfill Events"
        message="This will process and backfill all events from the last 48 hours for this asset. This operation may take several minutes. Are you sure you want to continue?"
        confirmText="Backfill Events"
        onConfirm={handleBackfillEvents}
        onCancel={() => setShowBackfillDialog(false)}
        isLoading={isLoading}
      />
    </>
  );
}
