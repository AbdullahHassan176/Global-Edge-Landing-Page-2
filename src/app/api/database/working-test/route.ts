/**
 * Working Database Test API Route
 * 
 * This endpoint tests the database connection using only existing containers
 */

import { NextRequest, NextResponse } from 'next/server';
import { workingDatabaseService } from '@/lib/database/workingDatabaseService';

export async function GET(request: NextRequest) {
  try {
    // Initialize database service
    await workingDatabaseService.initialize();
    
    // Test database connection
    const connectionTest = await workingDatabaseService.testConnection();
    
    if (!connectionTest) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database connection failed',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

    // Test basic operations
    const testResults = {
      connection: 'Connected',
      timestamp: new Date().toISOString(),
      operations: {
        users: await testUsersOperations(),
        assets: await testAssetsOperations(),
        investments: await testInvestmentsOperations()
      }
    };

    return NextResponse.json({
      success: true,
      message: 'Database connection and operations successful',
      data: testResults
    });

  } catch (error) {
    console.error('Database test error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function testUsersOperations() {
  try {
    // Test getting users
    const usersResult = await workingDatabaseService.getUsers({ pageSize: 5 });
    return {
      status: 'success',
      message: `Found ${usersResult.data?.items.length || 0} users`,
      data: usersResult.data?.items || []
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function testAssetsOperations() {
  try {
    // Test getting assets
    const assetsResult = await workingDatabaseService.getAssets({ pageSize: 5 });
    return {
      status: 'success',
      message: `Found ${assetsResult.data?.items.length || 0} assets`,
      data: assetsResult.data?.items || []
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function testInvestmentsOperations() {
  try {
    // Test getting investments
    const investmentsResult = await workingDatabaseService.getInvestments({ pageSize: 5 });
    return {
      status: 'success',
      message: `Found ${investmentsResult.data?.items.length || 0} investments`,
      data: investmentsResult.data?.items || []
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
