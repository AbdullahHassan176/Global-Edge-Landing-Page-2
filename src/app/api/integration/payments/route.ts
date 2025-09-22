/**
 * Integrated Payments API Route
 * 
 * This endpoint provides payment processing with database integration and fallback to mock data
 */

import { NextRequest, NextResponse } from 'next/server';
import { paymentIntegration } from '@/lib/integration/paymentIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'methods', 'history', 'status'
    
    // Set integration mode
    paymentIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    switch (type) {
      case 'methods':
        if (!userId) {
          return NextResponse.json(
            { success: false, error: 'userId is required for payment methods' },
            { status: 400 }
          );
        }
        result = await paymentIntegration.getPaymentMethods(userId);
        break;
      case 'history':
        if (!userId) {
          return NextResponse.json(
            { success: false, error: 'userId is required for payment history' },
            { status: 400 }
          );
        }
        result = await paymentIntegration.getPaymentHistory(userId);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type parameter. Use: methods, history, or status' },
          { status: 400 }
        );
    }
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        source: useDatabase ? 'database' : 'mock',
        stripeEnabled: paymentIntegration.isStripeEnabled(),
        paypalEnabled: paymentIntegration.isPayPalEnabled()
      }
    });

  } catch (error) {
    console.error('Get payment data error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { useDatabase = true, action, ...data } = body;
    
    // Set integration mode
    paymentIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    switch (action) {
      case 'create_payment_intent':
        const { amount, currency, paymentMethod, description, metadata } = data;
        if (!amount || !currency || !paymentMethod || !description || !metadata) {
          return NextResponse.json(
            { success: false, error: 'Missing required fields for payment intent' },
            { status: 400 }
          );
        }
        result = await paymentIntegration.createPaymentIntent(amount, currency, paymentMethod, description, metadata);
        break;
        
      case 'process_stripe_payment':
        const { amount: stripeAmount, currency: stripeCurrency, paymentMethodId, description: stripeDescription, metadata: stripeMetadata } = data;
        if (!stripeAmount || !stripeCurrency || !paymentMethodId || !stripeDescription || !stripeMetadata) {
          return NextResponse.json(
            { success: false, error: 'Missing required fields for Stripe payment' },
            { status: 400 }
          );
        }
        result = await paymentIntegration.processStripePayment(stripeAmount, stripeCurrency, paymentMethodId, stripeDescription, stripeMetadata);
        break;
        
      case 'process_paypal_payment':
        const { amount: paypalAmount, currency: paypalCurrency, description: paypalDescription, metadata: paypalMetadata } = data;
        if (!paypalAmount || !paypalCurrency || !paypalDescription || !paypalMetadata) {
          return NextResponse.json(
            { success: false, error: 'Missing required fields for PayPal payment' },
            { status: 400 }
          );
        }
        result = await paymentIntegration.processPayPalPayment(paypalAmount, paypalCurrency, paypalDescription, paypalMetadata);
        break;
        
      case 'add_payment_method':
        const { userId, methodData } = data;
        if (!userId || !methodData) {
          return NextResponse.json(
            { success: false, error: 'Missing required fields for adding payment method' },
            { status: 400 }
          );
        }
        result = await paymentIntegration.addPaymentMethod(userId, methodData);
        break;
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: create_payment_intent, process_stripe_payment, process_paypal_payment, or add_payment_method' },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        source: useDatabase ? 'database' : 'mock',
        action,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
