import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, text } = await request.json();

    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject' },
        { status: 400 }
      );
    }

    console.log('📧 EMAIL SEND REQUEST:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('HTML Content:', html ? 'Present' : 'Not provided');
    console.log('Text Content:', text ? 'Present' : 'Not provided');
    
    // For now, we'll create a simple email file that can be accessed
    // This is a development solution - in production you'd use a real email service
    
    const emailData = {
      to,
      subject,
      html,
      text,
      timestamp: new Date().toISOString(),
      messageId: `email_${Date.now()}`
    };
    
    // Store email in a simple file for development access
    try {
      const fs = require('fs');
      const path = require('path');
      
      // Create emails directory if it doesn't exist
      const emailsDir = path.join(process.cwd(), 'emails');
      if (!fs.existsSync(emailsDir)) {
        fs.mkdirSync(emailsDir, { recursive: true });
      }
      
      // Save email to file
      const emailFile = path.join(emailsDir, `email_${Date.now()}.json`);
      fs.writeFileSync(emailFile, JSON.stringify(emailData, null, 2));
      
      console.log('✅ Email saved to:', emailFile);
      console.log('📧 Email content:');
      console.log('To:', to);
      console.log('Subject:', subject);
      if (html) {
        console.log('HTML Preview:', html.substring(0, 200) + '...');
      }
      if (text) {
        console.log('Text Preview:', text.substring(0, 200) + '...');
      }
      
    } catch (fileError) {
      console.error('Error saving email file:', fileError);
    }
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      messageId: emailData.messageId,
      message: 'Email processed successfully',
      note: 'In development mode - email saved to file. Check console for details.'
    });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
