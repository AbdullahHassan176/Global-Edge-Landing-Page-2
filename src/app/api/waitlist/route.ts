import { NextRequest, NextResponse } from 'next/server';
import { waitlistService, WaitlistSubmission } from '@/lib/waitlistService';
import { emailIntegration } from '@/lib/integration/emailIntegration';

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
    const savedSubmission = await waitlistService.addSubmission(submissionData);

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
    const submissions = await waitlistService.getAllSubmissions();
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
  try {
    // Initialize email integration
    await emailIntegration.initialize();
    
    // Send admin notification email to both admins
    const adminEmails = ['abdullah.hassan@globalnext.rocks', 'mohammed.sidat@globalnext.rocks'];
    const result = await emailIntegration.sendCustomEmail(
      adminEmails,
      `New Investor Waitlist Submission - ${submission.firstName} ${submission.lastName}`,
      `
ADMIN NOTIFICATION - New Waitlist Submission

👤 Name: ${submission.firstName} ${submission.lastName}
📧 Email: ${submission.email}
📞 Phone: ${submission.phone}
🏢 Company: ${submission.company || 'Not provided'}
💰 Investor Type: ${submission.investorType}
💵 Investment Amount: ${submission.investmentAmount}
🎯 Token Interest: ${submission.tokenInterest}
📢 Heard From: ${submission.heardFrom}
💬 Message: ${submission.message || 'No additional message'}
🕐 Submitted: ${submission.submittedAt}
🌐 IP: ${submission.ip}

ACTION REQUIRED: Please review and follow up with the investor.
Contact them at: ${submission.email}

This is an admin-only notification.
      `,
      {
        priority: 'high',
        isHtml: false
      }
    );
    
    if (result.success) {
      console.log('✅ Admin notification email sent successfully');
      
      // Also send a copy to info@theglobaledge.io for record keeping
      await emailIntegration.sendCustomEmail(
        'info@theglobaledge.io',
        `Waitlist Submission Record - ${submission.firstName} ${submission.lastName}`,
        `
Waitlist submission received and admin notified:

👤 Name: ${submission.firstName} ${submission.lastName}
📧 Email: ${submission.email}
💰 Investment Amount: ${submission.investmentAmount}
🎯 Token Interest: ${submission.tokenInterest}
🕐 Submitted: ${submission.submittedAt}

Admin team has been notified for follow-up.
        `,
        {
          priority: 'normal',
          isHtml: false
        }
      );
    } else {
      console.error('❌ Failed to send admin notification email:', result.error);
    }
  } catch (error) {
    console.error('❌ Admin notification error:', error);
  }
}

async function sendUserConfirmation(submission: any) {
  try {
    // Initialize email integration
    await emailIntegration.initialize();
    
    // Send user confirmation email
    const result = await emailIntegration.sendCustomEmail(
      submission.email,
      'Welcome to Global Edge Investor Waitlist',
      `
Hello ${submission.firstName},

Thank you for your interest in Global Edge investment opportunities!

We have received your waitlist submission and will be in touch soon with exclusive investment opportunities tailored to your interests.

Your submission details:
- Name: ${submission.firstName} ${submission.lastName}
- Investor Type: ${submission.investorType}
- Investment Amount: ${submission.investmentAmount}
- Token Interest: ${submission.tokenInterest}

We'll review your application and contact you within 48 hours with next steps.

If you have any questions, please don't hesitate to contact us at info@theglobaledge.io.

Best regards,
The Global Edge Team
      `,
      {
        priority: 'normal',
        isHtml: false
      }
    );
    
    if (result.success) {
      console.log('✅ User confirmation email sent successfully');
    } else {
      console.error('❌ Failed to send user confirmation email:', result.error);
    }
  } catch (error) {
    console.error('❌ User confirmation error:', error);
  }
}
