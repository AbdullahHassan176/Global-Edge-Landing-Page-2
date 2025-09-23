/**
 * Investments API Route
 * 
 * This endpoint handles CRUD operations for investments
 */

import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/database/databaseService';
import { Investment, InvestmentQueryOptions } from '@/lib/database/models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const options: InvestmentQueryOptions = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
      userId: searchParams.get('investorId') || undefined,
      assetId: searchParams.get('assetId') || undefined,
      status: searchParams.get('status') as any || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
    };

    const result = await databaseService.getInvestments(options);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result);

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
    
    // Validate required fields
    const requiredFields = ['investorId', 'assetId', 'amount', 'tokens'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create investment
    const investmentData: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'> = {
      userId: body.investorId,
      assetId: body.assetId,
      amount: body.amount,
      tokens: body.tokens,
      type: body.type || 'container',
      status: body.status || 'pending',
      investmentType: body.investmentType || 'primary',
      paymentMethod: body.paymentMethod || 'bank_transfer',
      paymentStatus: body.paymentStatus || 'pending',
      kycRequired: body.kycRequired || true,
      kycCompleted: body.kycCompleted || false,
      kycStatus: body.kycStatus || 'pending',
      expectedReturn: body.expectedReturn || 0,
      actualReturn: body.actualReturn,
      fees: body.fees || {
        platformFee: 0,
        processingFee: 0,
        managementFee: 0,
        totalFees: 0
      },
      investmentDate: body.investmentDate,
      maturityDate: body.maturityDate,
      documents: body.documents || [],
      adminNotes: body.adminNotes,
      adminApprovedBy: body.adminApprovedBy,
      adminApprovedAt: body.adminApprovedAt,
    };

    const result = await databaseService.createInvestment(investmentData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });

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
