import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    console.log('LinkedIn OAuth API called with code:', code ? 'present' : 'missing');
    console.log('Environment variables:');
    console.log('LINKEDIN_CLIENT_ID:', process.env.LINKEDIN_CLIENT_ID);
    console.log('LINKEDIN_CLIENT_SECRET:', process.env.LINKEDIN_CLIENT_SECRET ? 'present' : 'missing');

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    // Check if LinkedIn OAuth is configured
    if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'LinkedIn OAuth is not configured. Please contact support or use email/password login.' },
        { status: 400 }
      );
    }

    // Exchange the code for an access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID || '',
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
        redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theglobaledge.io'}/auth/linkedin/callback`
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('No access token received');
    }

    // Fetch user profile data from LinkedIn API
    const profileResponse = await fetch('https://api.linkedin.com/v2/people/~', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile from LinkedIn');
    }

    const profileData = await profileResponse.json();

    // Fetch user email (requires additional API call)
    const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    let email = 'no-email@linkedin.com';
    if (emailResponse.ok) {
      const emailData = await emailResponse.json();
      if (emailData.elements && emailData.elements.length > 0) {
        email = emailData.elements[0]['handle~'].emailAddress;
      }
    }

    return NextResponse.json({
      id: profileData.id,
      email: email,
      firstName: profileData.firstName?.localized?.en_US || 'LinkedIn',
      lastName: profileData.lastName?.localized?.en_US || 'User',
      profilePicture: profileData.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || 'https://media.licdn.com/dms/image/C4D03AQHxK8Y2X8Y2Y2/profile-displayphoto-shrink_400_400/0/1234567890'
    });
  } catch (error) {
    console.error('LinkedIn OAuth error:', error);
    return NextResponse.json(
      { error: 'LinkedIn authentication failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
