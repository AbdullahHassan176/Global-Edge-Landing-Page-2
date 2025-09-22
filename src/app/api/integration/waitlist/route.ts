import { NextRequest, NextResponse } from 'next/server';
import { securityFormsIntegration } from '@/lib/integration/securityFormsIntegration';

export async function GET(request: NextRequest) {
  try {
    const result = await securityFormsIntegration.getWaitlistApplications();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await securityFormsIntegration.createWaitlistApplication(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Create waitlist application API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId, status, approvedBy, notes } = body;

    if (!applicationId || !status) {
      return NextResponse.json({
        success: false,
        error: 'Application ID and status are required'
      }, { status: 400 });
    }

    const result = await securityFormsIntegration.updateWaitlistApplicationStatus(
      applicationId, 
      status, 
      approvedBy, 
      notes
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Update waitlist application API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
