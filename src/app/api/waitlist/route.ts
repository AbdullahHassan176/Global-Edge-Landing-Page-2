import { NextRequest, NextResponse } from 'next/server';
import { waitlistService, WaitlistSubmission } from '@/lib/waitlistService';

interface WaitlistSubmissionRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investorType: string;
  tokenInterest: string;
  heardFrom: string;
  investmentAmount: string;
  company?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistSubmissionRequest = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'investorType', 'tokenInterest', 'heardFrom', 'investmentAmount'];
    const missingFields = requiredFields.filter(field => !body[field as keyof WaitlistSubmissionRequest]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Process the waitlist submission
    const submissionData = {
      ...body,
      submittedAt: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // 1. Save to waitlist service
    const savedSubmission = waitlistService.addSubmission(submissionData);

    // 2. Log the submission for debugging
    console.log('✅ New waitlist submission saved:', savedSubmission);

    // 3. Send notification email to admin team
    try {
      await sendAdminNotification(savedSubmission);
    } catch (emailError) {
      console.error('Admin notification failed:', emailError);
    }

    // 4. Send confirmation email to user
    try {
      await sendUserConfirmation(savedSubmission);
    } catch (emailError) {
      console.error('User confirmation failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for joining our waitlist! We\'ll be in touch soon with exclusive investment opportunities.',
      submissionId: savedSubmission.id
    });

  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process waitlist submission. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = waitlistService.getAllSubmissions();
    const stats = waitlistService.getStats();
    
    return NextResponse.json({
      success: true,
      submissions,
      stats,
      message: 'Waitlist submissions retrieved successfully'
    });
  } catch (error) {
    console.error('Error retrieving waitlist submissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve waitlist submissions' },
      { status: 500 }
    );
  }
}

// Email notification functions
async function sendAdminNotification(submission: any) {
  // For now, we'll log the admin notification
  // In production, you would send an email to your admin team
  console.log('📧 ADMIN NOTIFICATION - New Waitlist Submission:');
  console.log('=====================================');
  console.log(`👤 Name: ${submission.firstName} ${submission.lastName}`);
  console.log(`📧 Email: ${submission.email}`);
  console.log(`📞 Phone: ${submission.phone}`);
  console.log(`🏢 Company: ${submission.company || 'Not provided'}`);
  console.log(`💰 Investor Type: ${submission.investorType}`);
  console.log(`💵 Investment Amount: ${submission.investmentAmount}`);
  console.log(`🎯 Token Interest: ${submission.tokenInterest}`);
  console.log(`📢 Heard From: ${submission.heardFrom}`);
  console.log(`💬 Message: ${submission.message || 'No additional message'}`);
  console.log(`🕐 Submitted: ${submission.submittedAt}`);
  console.log(`🌐 IP: ${submission.ip}`);
  console.log('=====================================');
  
  // TODO: Implement actual email sending
  // Example: await sendEmail({
  //   to: 'admin@globalnext.rocks',
  //   subject: 'New Investor Waitlist Submission',
  //   template: 'admin-waitlist-notification',
  //   data: submission
  // });
}

async function sendUserConfirmation(submission: any) {
  // For now, we'll log the user confirmation
  // In production, you would send a confirmation email to the user
  console.log('📧 USER CONFIRMATION - Waitlist Submission Received:');
  console.log('=====================================');
  console.log(`👤 To: ${submission.firstName} ${submission.lastName} (${submission.email})`);
  console.log(`📧 Subject: Welcome to Global Edge Investor Waitlist`);
  console.log(`💬 Message: Thank you for your interest in Global Edge investment opportunities.`);
  console.log(`🕐 Sent: ${new Date().toISOString()}`);
  console.log('=====================================');
  
  // TODO: Implement actual email sending
  // Example: await sendEmail({
  //   to: submission.email,
  //   subject: 'Welcome to Global Edge Investor Waitlist',
  //   template: 'user-waitlist-confirmation',
  //   data: submission
  // });
}
