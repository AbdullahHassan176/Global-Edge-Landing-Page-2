import { NextRequest, NextResponse } from 'next/server';
import { securityFormsIntegration } from '@/lib/integration/securityFormsIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let result;
    if (userId) {
      result = await securityFormsIntegration.getSecurityFormsByUserId(userId);
    } else {
      result = await securityFormsIntegration.getSecurityForms();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Security forms API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await securityFormsIntegration.createSecurityForm(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Create security form API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { formId, status, reviewedBy, reviewNotes } = body;

    if (!formId || !status) {
      return NextResponse.json({
        success: false,
        error: 'Form ID and status are required'
      }, { status: 400 });
    }

    const result = await securityFormsIntegration.updateSecurityFormStatus(
      formId, 
      status, 
      reviewedBy, 
      reviewNotes
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Update security form API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
