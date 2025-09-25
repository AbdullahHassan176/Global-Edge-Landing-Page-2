import { NextRequest, NextResponse } from 'next/server';
import { emailIntegration } from '@/lib/integration/emailIntegration';
import { userAuthService } from '@/lib/userAuthService';

export async function POST(request: NextRequest) {
  try {
    const { user, tempPassword, sendEmail } = await request.json();

    if (!user || !user.email) {
      return NextResponse.json(
        { error: 'User data and email are required' },
        { status: 400 }
      );
    }

    // Store the user in the authentication system with password
    try {
      const registerResult = await userAuthService.register({
        email: user.email,
        password: tempPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country || 'US',
        role: user.role || 'investor'
      });

      if (!registerResult.success) {
        console.error('Failed to register user in auth system:', registerResult.error);
        return NextResponse.json(
          { error: 'Failed to create user authentication' },
          { status: 500 }
        );
      }

      console.log(`User ${user.email} registered successfully in auth system`);
    } catch (authError) {
      console.error('Error registering user in auth system:', authError);
      return NextResponse.json(
        { error: 'Failed to create user authentication' },
        { status: 500 }
      );
    }

    // If email sending is requested
    if (sendEmail && tempPassword) {
      try {
        // Send welcome email with login details
        const emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0d9488, #7c3aed); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Welcome to Global Edge</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your account has been created successfully</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Account Details</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Login Information</h3>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> ${user.email}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Password:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${tempPassword}</code></p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Role:</strong> ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Account Type:</strong> ${user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}</p>
              </div>

              <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">🔒 Security Notice</h4>
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  Please keep your password secure and do not share it with anyone. 
                  You can change your password anytime in your account settings.
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://theglobaledge.io/login" 
                   style="background: #0d9488; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Login to Your Account
                </a>
              </div>

              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">What's Next?</h4>
                <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
                  <li>Log in with your provided password</li>
                  <li>Complete your profile setup</li>
                  <li>Explore your dashboard and features</li>
                  <li>${user.role === 'investor' ? 'Start exploring investment opportunities' : user.role === 'issuer' ? 'Begin tokenizing your assets' : 'Access your admin dashboard'}</li>
                </ul>
              </div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
                <p style="margin: 0;">If you have any questions, please contact our support team.</p>
                <p style="margin: 5px 0 0 0;">© 2025 Global Edge. All rights reserved.</p>
              </div>
            </div>
          </div>
        `;

        const emailResult = await emailIntegration.sendCustomEmail(
          user.email,
          `Welcome to Global Edge - Your Account is Ready!`,
          emailContent,
          {
            isHtml: true,
            priority: 'high'
          }
        );

        if (emailResult.success) {
          console.log(`Welcome email sent successfully to ${user.email}`);
        } else {
          console.error('Failed to send welcome email:', emailResult.error);
        }

        // Send admin notification about new user creation
        try {
          const adminNotificationContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0d9488;">
                <h2 style="color: #1f2937; margin: 0 0 15px 0;">New User Created</h2>
                <p style="color: #4b5563; margin: 0 0 10px 0;">A new user has been created in the Global Edge platform:</p>
                
                <div style="background: white; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <p style="margin: 5px 0; color: #374151;"><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
                  <p style="margin: 5px 0; color: #374151;"><strong>Email:</strong> ${user.email}</p>
                  <p style="margin: 5px 0; color: #374151;"><strong>Role:</strong> ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                  <p style="margin: 5px 0; color: #374151;"><strong>Account Type:</strong> ${user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}</p>
                  <p style="margin: 5px 0; color: #374151;"><strong>Status:</strong> ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</p>
                  <p style="margin: 5px 0; color: #374151;"><strong>Created:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <p style="color: #92400e; margin: 0; font-size: 14px;">
                    <strong>Action Required:</strong> Please review and approve this user account in the admin dashboard.
                  </p>
                </div>

                <div style="text-align: center; margin: 20px 0;">
                  <a href="https://theglobaledge.io/admin/users" 
                     style="background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                    Review User in Admin Dashboard
                  </a>
                </div>
              </div>
            </div>
          `;

          const adminResult = await emailIntegration.sendCustomEmail(
            'info@theglobaledge.io',
            `New User Created - ${user.firstName} ${user.lastName}`,
            adminNotificationContent,
            {
              isHtml: true,
              priority: 'high'
            }
          );

          if (adminResult.success) {
            console.log('Admin notification sent successfully');
          } else {
            console.error('Failed to send admin notification:', adminResult.error);
          }
        } catch (adminError) {
          console.error('Error sending admin notification:', adminError);
        }

      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't fail the entire request if email fails
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
