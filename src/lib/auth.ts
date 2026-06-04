/**
 * Authentication library - Direct connection to AWS API Gateway + Cognito.
 * No mocks, no local fallback. All auth calls go to the real Lambda backend.
 */

const API_URL = 'https://dx45lag82l.execute-api.us-east-1.amazonaws.com/dev/api/v1';

// Token storage keys
const ACCESS_TOKEN_KEY = 'kl_access_token';
const REFRESH_TOKEN_KEY = 'kl_refresh_token';
const ID_TOKEN_KEY = 'kl_id_token';
const USER_KEY = 'kl_user';

export interface User {
  userId: string;
  email: string;
  name: string;
  accountType: string;
  permissions?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }

  const tokens: AuthTokens = {
    accessToken: data.data.accessToken,
    refreshToken: data.data.refreshToken,
    idToken: data.data.idToken,
    expiresIn: data.data.expiresIn,
  };

  // Store tokens
  storeTokens(tokens);

  // Decode user from ID token
  const user = decodeIdToken(tokens.idToken);
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  return { user, tokens };
}

/**
 * Register a new account
 */
export async function register(data: {
  email: string;
  password: string;
  name: string;
  accountType?: string;
  phone?: string;
}): Promise<{ userId: string; email: string; confirmed: boolean }> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || 'Registration failed');
  }

  return result.data;
}

/**
 * Logout - clear all tokens and user data
 */
export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Get the current token for API calls.
 * Uses ID token (required by API Gateway Cognito Authorizer).
 * Does NOT logout on failure — just returns null.
 */
export async function getAccessToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem(ID_TOKEN_KEY);
  if (!token) return null;

  // Check if token is expired
  if (isTokenExpired(token)) {
    // Try to refresh silently - do NOT logout on failure
    const refreshed = await refreshTokens();
    if (refreshed) {
      return localStorage.getItem(ID_TOKEN_KEY);
    }
    // Token expired and refresh failed — return null but DON'T logout
    // The user can still try to login again manually
    return null;
  }

  return token;
}

/**
 * Get the current user from stored data
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated.
 * Checks ID token (since that's what we use for API calls).
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  // Check ID token (used for API Gateway)
  const idToken = localStorage.getItem(ID_TOKEN_KEY);
  if (!idToken) return false;
  // Consider authenticated if token exists and isn't expired
  return !isTokenExpired(idToken);
}

/**
 * Refresh tokens using the refresh token.
 * Does NOT call logout() — caller decides what to do on failure.
 */
async function refreshTokens(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      // Don't logout here — token might just need re-login
      return false;
    }

    const data = await res.json();
    if (data.data?.accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
    }
    if (data.data?.idToken) {
      localStorage.setItem(ID_TOKEN_KEY, data.data.idToken);
    }
    return true;
  } catch {
    // Network error — don't logout, just return false
    return false;
  }
}

// === Helper functions ===

function storeTokens(tokens: AuthTokens): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  localStorage.setItem(ID_TOKEN_KEY, tokens.idToken);
}

function decodeIdToken(token: string): User {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name || payload['cognito:username'],
      accountType: payload['custom:primaryAccountType'] || 'Customer',
    };
  } catch {
    return { userId: '', email: '', name: '', accountType: 'Customer' };
  }
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    // Only consider expired 5 seconds before actual expiry (reduced from 60s)
    // 60 seconds was too aggressive and caused premature token invalidation
    return Date.now() >= exp - 5000;
  } catch {
    return true;
  }
}
