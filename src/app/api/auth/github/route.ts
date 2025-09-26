import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    console.log('GitHub OAuth API called with code:', code ? 'present' : 'missing');
    console.log('Environment variables:');
    console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
    console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? 'present' : 'missing');

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    // Exchange the code for an access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID || 'Ov23libFA9iThtAUjrFP',
        client_secret: process.env.GITHUB_CLIENT_SECRET || 'd48fb0c1781bc1886434e22a3c0db57209a7014a',
        code: code,
        redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theglobaledge.io'}/auth/github/callback`
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('GitHub token exchange failed:', errorText);
      throw new Error(`Failed to exchange code for access token: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('GitHub token response:', tokenData);
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error('No access token in response:', tokenData);
      throw new Error('No access token received');
    }

    // Fetch user data from GitHub API
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data from GitHub');
    }

    const userData = await userResponse.json();

    // Fetch user email (requires additional API call)
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    let email = userData.email;
    if (emailResponse.ok) {
      const emails = await emailResponse.json();
      const primaryEmail = emails.find((email: any) => email.primary);
      if (primaryEmail) {
        email = primaryEmail.email;
      }
    }

    return NextResponse.json({
      id: userData.id,
      email: email || 'no-email@github.com',
      name: userData.name || userData.login,
      login: userData.login,
      avatar_url: userData.avatar_url
    });
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return NextResponse.json(
      { error: 'GitHub authentication failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
