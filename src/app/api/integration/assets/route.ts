/**
 * Integrated Assets API Route
 * 
 * This endpoint demonstrates asset database integration with fallback to mock data
 */

import { NextRequest, NextResponse } from 'next/server';
import { assetIntegration } from '@/lib/integration/assetIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    
    // Set integration mode
    assetIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    if (type) {
      result = await assetIntegration.getAssetsByType(type);
    } else if (status) {
      result = await assetIntegration.getAssetsByStatus(status);
    } else {
      result = await assetIntegration.getAssets();
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
        assets: result.assets,
        source: useDatabase ? 'database' : 'mock',
        count: result.assets?.length || 0,
        filters: { type, status }
      }
    });

  } catch (error) {
    console.error('Get assets error:', error);
    
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
    const { useDatabase = true, ...assetData } = body;
    
    // Set integration mode
    assetIntegration.setUseDatabase(useDatabase);
    
    // Validate required fields
    const requiredFields = ['name', 'type', 'description', 'value', 'apr', 'risk', 'status'];
    for (const field of requiredFields) {
      if (!assetData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create asset
    const result = await assetIntegration.createAsset(assetData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        asset: result.asset,
        source: useDatabase ? 'database' : 'mock'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create asset error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
