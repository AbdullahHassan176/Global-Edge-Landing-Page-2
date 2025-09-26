import { NextRequest, NextResponse } from 'next/server';
import { mockGetExceptions } from '@/lib/mocks';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const ownerOnly = searchParams.get('owned') === 'true';
    const severity = searchParams.get('severity')?.split(',') || [];
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const assetKey = searchParams.get('assetKey');

    // Use mock data directly to avoid recursion
    const mockExceptions = await mockGetExceptions({
      assetKey: assetKey || 'default',
      status: 'open'
    });

    // Filter by severity if specified
    let filteredExceptions = mockExceptions;
    if (severity.length > 0) {
      filteredExceptions = mockExceptions.filter(exc => 
        severity.includes(exc.severity)
      );
    }

    // Apply limit
    const limitedExceptions = filteredExceptions.slice(0, limit);

    return NextResponse.json({
      exceptions: limitedExceptions,
      total: filteredExceptions.length,
      hasMore: filteredExceptions.length > limit
    });
  } catch (error) {
    console.error('Error fetching exceptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exceptions' },
      { status: 500 }
    );
  }
}
