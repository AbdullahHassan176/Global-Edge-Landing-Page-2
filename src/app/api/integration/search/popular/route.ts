import { NextRequest, NextResponse } from 'next/server';
import { searchIntegration } from '@/lib/integration/searchIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await searchIntegration.getPopularSearches(limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Popular searches API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
