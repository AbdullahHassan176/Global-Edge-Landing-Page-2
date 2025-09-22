/**
 * Assets API Route
 * 
 * This endpoint handles CRUD operations for assets
 */

import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/database/databaseService';
import { Asset, AssetQueryOptions } from '@/lib/database/models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const options: AssetQueryOptions = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
      type: searchParams.get('type') as any || undefined,
      status: searchParams.get('status') || undefined,
      issuerId: searchParams.get('issuerId') || undefined,
      minValue: searchParams.get('minValue') ? parseFloat(searchParams.get('minValue')!) : undefined,
      maxValue: searchParams.get('maxValue') ? parseFloat(searchParams.get('maxValue')!) : undefined,
      riskLevel: searchParams.get('riskLevel') || undefined,
    };

    const result = await databaseService.getAssets(options);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result);

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
    
    // Validate required fields
    const requiredFields = ['name', 'type', 'description', 'value', 'apr', 'risk', 'issuerId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create asset
    const assetData: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'> = {
      name: body.name,
      type: body.type,
      description: body.description,
      value: body.value,
      apr: body.apr,
      risk: body.risk,
      route: body.route,
      cargo: body.cargo,
      status: body.status || 'pending',
      image: body.image || '/images/default-asset.jpg',
      issuerId: body.issuerId,
      tokenStandard: body.tokenStandard || 'ERC-20',
      totalSupply: body.totalSupply || 1000000,
      availableSupply: body.availableSupply || 1000000,
      minimumInvestment: body.minimumInvestment || 1000,
      maximumInvestment: body.maximumInvestment || 100000,
      investmentDeadline: body.investmentDeadline,
      expectedReturn: body.expectedReturn || 0,
      riskLevel: body.riskLevel || 'Medium',
      maturityDate: body.maturityDate,
      location: body.location || {
        country: 'UAE',
        city: 'Dubai'
      },
      logistics: body.logistics || {},
      complianceStatus: body.complianceStatus || 'pending',
      legalDocuments: body.legalDocuments || [],
      performanceMetrics: body.performanceMetrics || {
        totalInvestments: 0,
        totalInvestors: 0,
        averageInvestmentSize: 0,
        returnRate: 0,
        volatility: 0,
        lastUpdated: new Date().toISOString()
      },
      adminApproved: body.adminApproved || false,
      adminApprovedBy: body.adminApprovedBy,
      adminApprovedAt: body.adminApprovedAt,
      adminNotes: body.adminNotes,
    };

    const result = await databaseService.createAsset(assetData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });

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
