import { NextRequest, NextResponse } from 'next/server';
import { searchIntegration } from '@/lib/integration/searchIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await searchIntegration.getSearchSuggestions(query, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search suggestions API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
