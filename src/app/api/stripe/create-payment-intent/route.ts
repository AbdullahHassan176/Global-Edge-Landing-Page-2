import { NextRequest, NextResponse } from 'next/server';
import { API_KEYS } from '@/lib/config/apiKeys';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd', metadata = {}, description = 'Global Edge Investment' } = await request.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create payment intent with Stripe
    const stripe = require('stripe')(API_KEYS.STRIPE.SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      description,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      paymentIntent: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret,
      },
    });

  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
