/**
 * Performance Monitoring API Route
 * 
 * This endpoint provides performance monitoring and system health metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { performanceIntegration } from '@/lib/integration/performanceIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const type = searchParams.get('type') || 'stats'; // 'stats', 'health', 'metrics'
    const timeRange = searchParams.get('timeRange') || '1h';
    const category = searchParams.get('category');
    
    // Set integration mode
    performanceIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    switch (type) {
      case 'health':
        result = await performanceIntegration.getSystemHealth();
        break;
      case 'metrics':
        if (!category) {
          return NextResponse.json(
            { success: false, error: 'category is required for metrics type' },
            { status: 400 }
          );
        }
        result = await performanceIntegration.getMetricsByCategory(category, timeRange);
        break;
      default:
        result = await performanceIntegration.getPerformanceStats(timeRange);
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
        timeRange,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Performance API error:', error);
    
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
    performanceIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    switch (action) {
      case 'record_metric':
        const { name, value, unit, category: metricCategory, tags, metadata } = data;
        if (!name || value === undefined || !unit || !metricCategory) {
          return NextResponse.json(
            { success: false, error: 'name, value, unit, and category are required' },
            { status: 400 }
          );
        }
        result = await performanceIntegration.recordMetric(name, value, unit, metricCategory, tags, metadata);
        break;
        
      case 'record_api_response':
        const { endpoint, method, responseTime, statusCode } = data;
        if (!endpoint || !method || responseTime === undefined || !statusCode) {
          return NextResponse.json(
            { success: false, error: 'endpoint, method, responseTime, and statusCode are required' },
            { status: 400 }
          );
        }
        result = await performanceIntegration.recordApiResponseTime(endpoint, method, responseTime, statusCode);
        break;
        
      case 'record_database_query':
        const { query, executionTime, rowsAffected } = data;
        if (!query || executionTime === undefined || rowsAffected === undefined) {
          return NextResponse.json(
            { success: false, error: 'query, executionTime, and rowsAffected are required' },
            { status: 400 }
          );
        }
        result = await performanceIntegration.recordDatabaseQueryTime(query, executionTime, rowsAffected);
        break;
        
      case 'record_user_activity':
        const { userId, action: userAction, duration } = data;
        if (!userId || !userAction) {
          return NextResponse.json(
            { success: false, error: 'userId and action are required' },
            { status: 400 }
          );
        }
        result = await performanceIntegration.recordUserActivity(userId, userAction, duration);
        break;
        
      case 'record_business_metric':
        const { name: businessName, value: businessValue, unit: businessUnit, tags: businessTags } = data;
        if (!businessName || businessValue === undefined || !businessUnit) {
          return NextResponse.json(
            { success: false, error: 'name, value, and unit are required' },
            { status: 400 }
          );
        }
        result = await performanceIntegration.recordBusinessMetric(businessName, businessValue, businessUnit, businessTags);
        break;
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: record_metric, record_api_response, record_database_query, record_user_activity, or record_business_metric' },
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
    console.error('Performance API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
