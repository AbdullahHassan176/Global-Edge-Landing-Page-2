import { NextRequest, NextResponse } from 'next/server';
import { exceptionsClient } from '@/lib/exceptions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const ownerOnly = searchParams.get('owned') === 'true';
    const severity = searchParams.get('severity')?.split(',') || [];
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const assetKey = searchParams.get('assetKey');

    const response = await exceptionsClient.getExceptions({
      ownerOnly,
      severity,
      limit,
      assetKey: assetKey || undefined
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching exceptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exceptions' },
      { status: 500 }
    );
  }
}
