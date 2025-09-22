/**
 * Database Connection Test API Route
 * 
 * This endpoint tests the connection to Azure Cosmos DB
 * and returns database statistics.
 */

import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/database/databaseService';

export async function GET(request: NextRequest) {
  try {
    // Initialize database service first
    await databaseService.initialize();
    
    // Test database connection
    const connectionTest = await databaseService.testConnection();
    
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

    // Get database statistics
    const stats = await databaseService.getDatabaseStats();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        connection: 'Connected',
        timestamp: new Date().toISOString(),
        stats
      }
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
