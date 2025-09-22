/**
 * Integrated Investments API Route
 * 
 * This endpoint demonstrates investment database integration with fallback to mock data
 */

import { NextRequest, NextResponse } from 'next/server';
import { investmentIntegration } from '@/lib/integration/investmentIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const userId = searchParams.get('userId');
    const assetId = searchParams.get('assetId');
    
    // Set integration mode
    investmentIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    if (userId) {
      result = await investmentIntegration.getInvestmentsByUserId(userId);
    } else if (assetId) {
      result = await investmentIntegration.getInvestmentsByAssetId(assetId);
    } else {
      result = await investmentIntegration.getInvestments();
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
        investments: result.investments,
        source: useDatabase ? 'database' : 'mock',
        count: result.investments?.length || 0,
        filters: { userId, assetId }
      }
    });

  } catch (error) {
    console.error('Get investments error:', error);
    
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
    const { useDatabase = true, ...investmentData } = body;
    
    // Set integration mode
    investmentIntegration.setUseDatabase(useDatabase);
    
    // Validate required fields
    const requiredFields = ['investorId', 'assetId', 'amount', 'currency', 'status'];
    for (const field of requiredFields) {
      if (!investmentData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create investment
    const result = await investmentIntegration.createInvestment(investmentData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        investment: result.investment,
        source: useDatabase ? 'database' : 'mock'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create investment error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
