/**
 * Integrated Analytics API Route
 * 
 * This endpoint provides analytics data with database integration and fallback to mock data
 */

import { NextRequest, NextResponse } from 'next/server';
import { simpleAnalyticsIntegration } from '@/lib/integration/simpleAnalyticsIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const type = searchParams.get('type'); // 'users', 'assets', 'investments', or 'all'
    
    let result;
    
    switch (type) {
      case 'users':
        result = await simpleAnalyticsIntegration.getUserAnalytics();
        break;
      case 'assets':
        result = await simpleAnalyticsIntegration.getAssetAnalytics();
        break;
      case 'investments':
        result = await simpleAnalyticsIntegration.getInvestmentAnalytics();
        break;
      default:
        result = await simpleAnalyticsIntegration.getAnalyticsData();
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
        analytics: result.data,
        source: useDatabase ? 'database' : 'mock',
        type: type || 'all',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
