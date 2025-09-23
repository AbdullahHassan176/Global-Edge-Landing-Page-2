/**
 * Payment Service using Stripe
 * Handles all payment processing for the platform
 */

import { API_KEYS } from '@/lib/config/apiKeys';

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'succeeded' | 'canceled';
  client_secret: string;
}

export interface CreatePaymentIntentOptions {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
  description?: string;
}

class PaymentService {
  private publishableKey: string;
  private secretKey: string;

  constructor() {
    this.publishableKey = API_KEYS.STRIPE.PUBLISHABLE_KEY;
    this.secretKey = API_KEYS.STRIPE.SECRET_KEY;
  }

  /**
   * Create a payment intent for investment
   */
  async createPaymentIntent(options: CreatePaymentIntentOptions): Promise<{ success: boolean; paymentIntent?: PaymentIntent; error?: string }> {
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: options.amount,
          currency: options.currency || 'usd',
          metadata: options.metadata || {},
          description: options.description || 'Global Edge Investment',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, paymentIntent: data.paymentIntent };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to create payment intent' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  /**
   * Get publishable key for client-side Stripe integration
   */
  getPublishableKey(): string {
    return this.publishableKey;
  }

  /**
   * Validate payment amount
   */
  validateAmount(amount: number): { isValid: boolean; error?: string } {
    if (amount <= 0) {
      return { isValid: false, error: 'Amount must be greater than 0' };
    }
    
    if (amount < 100) {
      return { isValid: false, error: 'Minimum investment amount is $100' };
    }
    
    if (amount > 1000000) {
      return { isValid: false, error: 'Maximum investment amount is $1,000,000' };
    }
    
    return { isValid: true };
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  /**
   * Calculate fees
   */
  calculateFees(amount: number): { totalFees: number; platformFee: number; processingFee: number } {
    const platformFeeRate = 0.025; // 2.5% platform fee
    const processingFeeRate = 0.029; // 2.9% + $0.30 processing fee
    
    const platformFee = amount * platformFeeRate;
    const processingFee = (amount * processingFeeRate) + 0.30;
    const totalFees = platformFee + processingFee;
    
    return {
      totalFees: Math.round(totalFees * 100) / 100,
      platformFee: Math.round(platformFee * 100) / 100,
      processingFee: Math.round(processingFee * 100) / 100,
    };
  }
}

export const paymentService = new PaymentService();
