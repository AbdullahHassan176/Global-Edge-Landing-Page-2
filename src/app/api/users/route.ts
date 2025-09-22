/**
 * Users API Route
 * 
 * This endpoint handles CRUD operations for users
 */

import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/database/databaseService';
import { User, UserQueryOptions } from '@/lib/database/models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const options: UserQueryOptions = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
      role: searchParams.get('role') as any || undefined,
      status: searchParams.get('status') || undefined,
      kycStatus: searchParams.get('kycStatus') as any || undefined,
      country: searchParams.get('country') || undefined,
    };

    const result = await databaseService.getUsers(options);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result);

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
    
    // Validate required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'country', 'role'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create user
    const userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      country: body.country,
      role: body.role,
      status: body.status || 'pending',
      accountType: body.accountType || 'individual',
      kycStatus: body.kycStatus || 'not_started',
      totalInvested: body.totalInvested || 0,
      investmentLimit: body.investmentLimit || 100000,
      permissions: body.permissions || ['view_dashboard'],
      companyName: body.companyName,
      taxId: body.taxId,
      dateOfBirth: body.dateOfBirth,
      address: body.address,
      emergencyContact: body.emergencyContact,
      assetsCreated: body.assetsCreated || 0,
      assetsUnderManagement: body.assetsUnderManagement || 0,
      twoFactorEnabled: body.twoFactorEnabled || false,
      emailVerified: body.emailVerified || false,
    };

    const result = await databaseService.createUser(userData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });

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
