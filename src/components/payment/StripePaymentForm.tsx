'use client';

import { useState, useEffect } from 'react';
import { paymentService } from '@/lib/services/paymentService';
import Icon from '@/components/ui/Icon';

interface StripePaymentFormProps {
  amount: number;
  assetId: string;
  assetName: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export default function StripePaymentForm({
  amount,
  assetId,
  assetName,
  onSuccess,
  onError,
  onCancel,
}: StripePaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const [fees, setFees] = useState({ totalFees: 0, platformFee: 0, processingFee: 0 });

  useEffect(() => {
    // Calculate fees
    const calculatedFees = paymentService.calculateFees(amount);
    setFees(calculatedFees);
  }, [amount]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Validate amount
      const validation = paymentService.validateAmount(amount);
      if (!validation.isValid) {
        onError(validation.error || 'Invalid amount');
        return;
      }

      // Create payment intent
      const result = await paymentService.createPaymentIntent({
        amount,
        metadata: {
          assetId,
          assetName,
        },
        description: `Investment in ${assetName}`,
      });

      if (!result.success || !result.paymentIntent) {
        onError(result.error || 'Failed to create payment intent');
        return;
      }

      setPaymentIntent(result.paymentIntent);

      // In a real implementation, you would integrate with Stripe Elements here
      // For now, we'll simulate a successful payment
      setTimeout(() => {
        onSuccess(result.paymentIntent.id);
      }, 2000);

    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = amount + fees.totalFees;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Complete Investment</h3>
        <p className="text-gray-600 mt-2">Invest in {assetName}</p>
      </div>

      {/* Investment Summary */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Investment Amount</span>
          <span className="font-medium">{paymentService.formatAmount(amount)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>Platform Fee (2.5%)</span>
          <span>{paymentService.formatAmount(fees.platformFee)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>Processing Fee</span>
          <span>{paymentService.formatAmount(fees.processingFee)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span>{paymentService.formatAmount(totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Payment Method
        </label>
        <div className="space-y-2">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              defaultChecked
              className="mr-3"
            />
            <Icon name="credit-card" className="mr-2 text-gray-600" />
            <span>Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              className="mr-3"
            />
            <Icon name="bank" className="mr-2 text-gray-600" />
            <span>Bank Transfer</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        
        <button
          onClick={handlePayment}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-global-teal text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Pay ${paymentService.formatAmount(totalAmount)}`
          )}
        </button>
      </div>

      {/* Security Notice */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <Icon name="shield-check" className="inline mr-1" />
        Your payment is secured by Stripe
      </div>
    </div>
  );
}
