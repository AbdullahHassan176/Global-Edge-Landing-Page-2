import { NextRequest, NextResponse } from 'next/server';
import { searchIntegration } from '@/lib/integration/searchIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') as any;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sortBy = searchParams.get('sortBy') as any || 'relevance';
    const sortOrder = searchParams.get('sortOrder') as any || 'desc';
    const minValue = searchParams.get('minValue') ? parseFloat(searchParams.get('minValue')!) : undefined;
    const maxValue = searchParams.get('maxValue') ? parseFloat(searchParams.get('maxValue')!) : undefined;
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    if (!query.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required'
      }, { status: 400 });
    }

    const filters = {
      type,
      category,
      status,
      minValue,
      maxValue,
      dateRange: startDate && endDate ? { start: startDate, end: endDate } : undefined
    };

    const options = {
      limit,
      offset,
      sortBy,
      sortOrder
    };

    const result = await searchIntegration.search(query, filters, options);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, filters = {}, options = {} } = body;

    if (!query || !query.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required'
      }, { status: 400 });
    }

    const result = await searchIntegration.search(query, filters, options);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
