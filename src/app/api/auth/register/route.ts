import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

export async function POST(request: NextRequest) {
  const proxied = await proxyToBackend(request, '/api/v1/auth/register');
  if (proxied) return proxied;

  try {
    const body = await request.json();
    const { email, password, name, accountType, phone, location } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Simulate checking for existing user
    if (email === 'existing@klassified.com') {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email,
      name,
      accountType: accountType || 'CUSTOMER',
      phone: phone || '',
      location: location || 'Nigeria',
      avatar: '👤',
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      Buffer.from(JSON.stringify({ sub: mockUser.id, email, iat: Date.now() })).toString('base64') +
      '.mock-signature';

    return NextResponse.json({
      success: true,
      data: {
        token: mockToken,
        user: mockUser,
        message: 'Account created successfully',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
