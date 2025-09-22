/**
 * Integrated KYC API Route
 * 
 * This endpoint demonstrates KYC database integration with fallback to mock data
 */

import { NextRequest, NextResponse } from 'next/server';
import { kycIntegration } from '@/lib/integration/kycIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const userId = searchParams.get('userId');
    
    // Set integration mode
    kycIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    if (userId) {
      result = await kycIntegration.getKycApplicationByUserId(userId);
    } else {
      result = await kycIntegration.getKycApplications();
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
        applications: result.applications,
        source: useDatabase ? 'database' : 'mock',
        count: result.applications?.length || 0,
        filters: { userId }
      }
    });

  } catch (error) {
    console.error('Get KYC applications error:', error);
    
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
    const { useDatabase = true, ...applicationData } = body;
    
    // Set integration mode
    kycIntegration.setUseDatabase(useDatabase);
    
    // Validate required fields
    const requiredFields = ['userId', 'personalDetails', 'documents'];
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create KYC application
    const result = await kycIntegration.createKycApplication(applicationData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        application: result.application,
        source: useDatabase ? 'database' : 'mock'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create KYC application error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
