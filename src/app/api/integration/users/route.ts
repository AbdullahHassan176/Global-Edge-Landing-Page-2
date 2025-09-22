/**
 * Integrated Users API Route
 * 
 * This endpoint demonstrates database integration with fallback to mock data
 */

import { NextRequest, NextResponse } from 'next/server';
import { userAuthIntegration } from '@/lib/integration/userAuthIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    
    // Set integration mode
    userAuthIntegration.setUseDatabase(useDatabase);
    
    // Get all users
    const result = await userAuthIntegration.getAllUsers();
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        users: result.users,
        source: useDatabase ? 'database' : 'mock',
        count: result.users?.length || 0
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    
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
    const { useDatabase = true, ...userData } = body;
    
    // Set integration mode
    userAuthIntegration.setUseDatabase(useDatabase);
    
    // Validate required fields
    const requiredFields = ['email', 'password', 'firstName', 'lastName', 'country'];
    for (const field of requiredFields) {
      if (!userData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Register user
    const result = await userAuthIntegration.register(userData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user: result.user,
        source: useDatabase ? 'database' : 'mock'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create user error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
