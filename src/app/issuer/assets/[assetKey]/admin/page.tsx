'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Icon from '@/components/ui/Icon';

interface LockState {
  isLocked: boolean;
  lockedBy: string;
  lockedAt: string;
  reason: string;
}

interface HandoverWindow {
  id: string;
  from: string;
  to: string;
  carrier: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface CompliancePolicy {
  type: 'default' | 'allowlist';
  allowlist: string[];
}

export default function AdminPage() {
  const params = useParams();
  const assetKey = params.assetKey as string;
  
  // Lock state
  const [lockState, setLockState] = useState<LockState>({
    isLocked: false,
    lockedBy: '',
    lockedAt: '',
    reason: ''
  });
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockReason, setLockReason] = useState('');

  // Handover windows
  const [handoverWindows, setHandoverWindows] = useState<HandoverWindow[]>([]);
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [newHandover, setNewHandover] = useState({
    from: '',
    to: '',
    carrier: '',
    startDate: '',
    endDate: ''
  });

  // Compliance policy
  const [compliancePolicy, setCompliancePolicy] = useState<CompliancePolicy>({
    type: 'default',
    allowlist: []
  });
  const [newAllowlistEntry, setNewAllowlistEntry] = useState('');

  useEffect(() => {
    loadAdminData();
  }, [assetKey]);

  const loadAdminData = async () => {
    // Mock data loading
    try {
      // Mock lock state
      setLockState({
        isLocked: false,
        lockedBy: '',
        lockedAt: '',
        reason: ''
      });

      // Mock handover windows
      setHandoverWindows([
        {
          id: 'hw-1',
          from: 'Port of Singapore',
          to: 'Port of Los Angeles',
          carrier: 'Maersk Line',
          startDate: '2024-02-01',
          endDate: '2024-02-15',
          status: 'active'
        },
        {
          id: 'hw-2',
          from: 'Port of Los Angeles',
          to: 'Port of New York',
          carrier: 'Evergreen Marine',
          startDate: '2024-02-16',
          endDate: '2024-02-28',
          status: 'active'
        }
      ]);

      // Mock compliance policy
      setCompliancePolicy({
        type: 'default',
        allowlist: ['0x1234...5678', '0xabcd...efgh']
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const handleLockToggle = () => {
    if (lockState.isLocked) {
      // Unlock
      setLockState({
        isLocked: false,
        lockedBy: '',
        lockedAt: '',
        reason: ''
      });
      // TODO: Call unlock API
      console.log('Asset unlocked');
    } else {
      // Show lock modal
      setShowLockModal(true);
    }
  };

  const handleLockConfirm = () => {
    setLockState({
      isLocked: true,
      lockedBy: 'Current User', // TODO: Get from auth
      lockedAt: new Date().toISOString(),
      reason: lockReason
    });
    setShowLockModal(false);
    setLockReason('');
    // TODO: Call lock API
    console.log('Asset locked with reason:', lockReason);
  };

  const handleAddHandover = () => {
    if (!newHandover.from || !newHandover.to || !newHandover.carrier || !newHandover.startDate || !newHandover.endDate) {
      alert('Please fill in all fields');
      return;
    }

    const handover: HandoverWindow = {
      id: `hw-${Date.now()}`,
      from: newHandover.from,
      to: newHandover.to,
      carrier: newHandover.carrier,
      startDate: newHandover.startDate,
      endDate: newHandover.endDate,
      status: 'active'
    };

    setHandoverWindows(prev => [...prev, handover]);
    setNewHandover({ from: '', to: '', carrier: '', startDate: '', endDate: '' });
    setShowHandoverModal(false);
    // TODO: Call API to create handover window
    console.log('Handover window created:', handover);
  };

  const handleRemoveHandover = (id: string) => {
    if (confirm('Are you sure you want to remove this handover window?')) {
      setHandoverWindows(prev => prev.filter(hw => hw.id !== id));
      // TODO: Call API to remove handover window
      console.log('Handover window removed:', id);
    }
  };

  const handleCompliancePolicyChange = (type: 'default' | 'allowlist') => {
    setCompliancePolicy(prev => ({ ...prev, type }));
    // TODO: Call API to update compliance policy
    console.log('Compliance policy changed to:', type);
  };

  const handleAddAllowlistEntry = () => {
    if (!newAllowlistEntry.trim()) return;

    setCompliancePolicy(prev => ({
      ...prev,
      allowlist: [...prev.allowlist, newAllowlistEntry.trim()]
    }));
    setNewAllowlistEntry('');
    // TODO: Call API to add allowlist entry
    console.log('Allowlist entry added:', newAllowlistEntry);
  };

  const handleRemoveAllowlistEntry = (entry: string) => {
    setCompliancePolicy(prev => ({
      ...prev,
      allowlist: prev.allowlist.filter(item => item !== entry)
    }));
    // TODO: Call API to remove allowlist entry
    console.log('Allowlist entry removed:', entry);
  };

  return (
    <div className="space-y-6">
      {/* Locks Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Asset Locks</h3>
          <p className="mt-1 text-sm text-gray-500">
            Control asset access and prevent unauthorized operations
          </p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                lockState.isLocked ? 'bg-red-100' : 'bg-green-100'
              }`}>
                <Icon 
                  name={lockState.isLocked ? 'lock-closed' : 'lock-open'} 
                  className={`w-6 h-6 ${lockState.isLocked ? 'text-red-600' : 'text-green-600'}`} 
                />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">
                  {lockState.isLocked ? 'Asset is Locked' : 'Asset is Unlocked'}
                </h4>
                {lockState.isLocked && (
                  <div className="mt-1 text-sm text-gray-500">
                    <p>Locked by: {lockState.lockedBy}</p>
                    <p>Reason: {lockState.reason}</p>
                    <p>Locked at: {new Date(lockState.lockedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleLockToggle}
              className={`px-4 py-2 rounded-lg font-medium ${
                lockState.isLocked
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {lockState.isLocked ? 'Unlock Asset' : 'Lock Asset'}
            </button>
          </div>
        </div>
      </div>

      {/* Handover Windows Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Handover Windows</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage asset transfer windows and carrier assignments
              </p>
            </div>
            <button
              onClick={() => setShowHandoverModal(true)}
              className="bg-global-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-global-teal-dark"
            >
              <Icon name="plus" className="w-4 h-4 mr-2 inline" />
              Add Window
            </button>
          </div>
        </div>
        <div className="p-6">
          {handoverWindows.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="truck" className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No handover windows</h3>
              <p className="mt-2 text-sm text-gray-500">Create handover windows to manage asset transfers.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {handoverWindows.map((window) => (
                <div key={window.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="truck" className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        {window.from} → {window.to}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Carrier: {window.carrier} • {window.startDate} to {window.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      window.status === 'active' ? 'bg-green-100 text-green-800' :
                      window.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {window.status}
                    </span>
                    <button
                      onClick={() => handleRemoveHandover(window.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Icon name="trash" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compliance Policy Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Compliance Policy</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure asset compliance and access control policies
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Policy Type</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="policyType"
                    value="default"
                    checked={compliancePolicy.type === 'default'}
                    onChange={() => handleCompliancePolicyChange('default')}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700">Default Policy</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="policyType"
                    value="allowlist"
                    checked={compliancePolicy.type === 'allowlist'}
                    onChange={() => handleCompliancePolicyChange('allowlist')}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700">Allowlist Policy</span>
                </label>
              </div>
            </div>

            {compliancePolicy.type === 'allowlist' && (
              <div>
                <label className="text-sm font-medium text-gray-700">Allowed Addresses</label>
                <div className="mt-2 space-y-2">
                  {compliancePolicy.allowlist.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-mono text-gray-900">{entry}</span>
                      <button
                        onClick={() => handleRemoveAllowlistEntry(entry)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Icon name="x-mark" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newAllowlistEntry}
                      onChange={(e) => setNewAllowlistEntry(e.target.value)}
                      placeholder="Enter address (0x...)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={handleAddAllowlistEntry}
                      className="bg-global-teal text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-global-teal-dark"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button className="bg-global-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-global-teal-dark">
                Save Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lock Modal */}
      {showLockModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lock Asset</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for locking
              </label>
              <textarea
                value={lockReason}
                onChange={(e) => setLockReason(e.target.value)}
                placeholder="Enter reason for locking this asset..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLockModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLockConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Lock Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Handover Modal */}
      {showHandoverModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Handover Window</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="text"
                  value={newHandover.from}
                  onChange={(e) => setNewHandover(prev => ({ ...prev, from: e.target.value }))}
                  placeholder="Origin location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="text"
                  value={newHandover.to}
                  onChange={(e) => setNewHandover(prev => ({ ...prev, to: e.target.value }))}
                  placeholder="Destination location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                <input
                  type="text"
                  value={newHandover.carrier}
                  onChange={(e) => setNewHandover(prev => ({ ...prev, carrier: e.target.value }))}
                  placeholder="Carrier name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newHandover.startDate}
                    onChange={(e) => setNewHandover(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newHandover.endDate}
                    onChange={(e) => setNewHandover(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowHandoverModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddHandover}
                className="px-4 py-2 text-sm font-medium text-white bg-global-teal rounded-lg hover:bg-global-teal-dark"
              >
                Add Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
