import { NextRequest, NextResponse } from 'next/server';
import { securityFormsIntegration } from '@/lib/integration/securityFormsIntegration';

export async function GET(request: NextRequest) {
  try {
    const result = await securityFormsIntegration.getSecurityStats();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Security stats API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
