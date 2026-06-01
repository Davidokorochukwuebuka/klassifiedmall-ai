import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL; // Set after CDK deploy

/**
 * Proxies a request to the backend API Gateway.
 * In dev mode (no BACKEND_URL), returns null so routes can fall through to mock data.
 */
export async function proxyToBackend(
  request: NextRequest,
  backendPath: string
): Promise<NextResponse | null> {
  if (!BACKEND_URL) return null; // Fall through to mock

  const url = `${BACKEND_URL}${backendPath}`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  const authHeader = request.headers.get('authorization');
  if (authHeader) headers['Authorization'] = authHeader;

  const res = await fetch(url, {
    method: request.method,
    headers,
    body: request.method !== 'GET' ? await request.text() : undefined,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
