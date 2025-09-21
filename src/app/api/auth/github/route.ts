import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Exchange the code for an access token
    // 2. Use the access token to fetch user data from GitHub API
    // 3. Store user data in your database
    // 4. Create a session or JWT token

    // For now, we'll return mock data
    const mockUserData = {
      id: Math.floor(Math.random() * 100000),
      email: 'user@example.com',
      name: 'GitHub User',
      login: 'githubuser',
      avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4'
    };

    return NextResponse.json(mockUserData);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return NextResponse.json(
      { error: 'GitHub authentication failed' },
      { status: 500 }
    );
  }
}
