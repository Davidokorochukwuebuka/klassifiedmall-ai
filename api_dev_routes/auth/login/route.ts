import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

export async function POST(request: NextRequest) {
  const proxied = await proxyToBackend(request, '/api/v1/auth/login');
  if (proxied) return proxied;

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock authentication - accept demo credentials or any valid-looking email
    const validCredentials =
      (email === 'demo@klassified.com' && password === 'demo123') ||
      (email.includes('@') && password.length >= 4);

    if (!validCredentials) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Determine account type based on email or default
    let accountType = 'FARMER';
    if (email.includes('supplier')) accountType = 'SUPPLIER';
    else if (email.includes('logistics')) accountType = 'LOGISTICS_PROVIDER';
    else if (email.includes('customer')) accountType = 'CUSTOMER';
    else if (email.includes('exporter')) accountType = 'EXPORTER';

    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email,
      name: email === 'demo@klassified.com' ? 'Demo User' : email.split('@')[0],
      accountType,
      phone: '+234 801 234 5678',
      location: 'Lagos, Nigeria',
      avatar: '👤',
      createdAt: '2024-01-01T00:00:00Z',
    };

    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      Buffer.from(JSON.stringify({ sub: mockUser.id, email, iat: Date.now() })).toString('base64') +
      '.mock-signature';

    return NextResponse.json({
      success: true,
      data: {
        token: mockToken,
        user: mockUser,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
