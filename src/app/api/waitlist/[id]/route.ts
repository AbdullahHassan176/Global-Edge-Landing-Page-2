import { NextRequest, NextResponse } from 'next/server';
import { waitlistService } from '@/lib/waitlistService';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }

    const validStatuses = ['new', 'contacted', 'qualified', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const success = waitlistService.updateSubmissionStatus(id, status);
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Submission status updated successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating submission status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update submission status' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const submission = waitlistService.getSubmissionById(id);
    
    if (submission) {
      return NextResponse.json({
        success: true,
        submission
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error retrieving submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve submission' },
      { status: 500 }
    );
  }
}
