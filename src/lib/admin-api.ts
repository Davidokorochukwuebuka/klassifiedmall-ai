/**
 * Admin API client — talks to /admin/* Lambda routes.
 */
import { getAccessToken } from './auth';

const API_URL = 'https://dx45lag82l.execute-api.us-east-1.amazonaws.com/dev/api/v1';

async function adminFetch(endpoint: string, options?: RequestInit) {
  const token = await getAccessToken();
  if (!token) throw new Error('Admin authentication required');

  const res = await fetch(`${API_URL}/admin${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options?.headers as Record<string, string>),
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Admin API error: ${res.status}`);
  return data;
}

export async function getAdminUsers(params?: { limit?: number; accountType?: string; token?: string }) {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set('limit', String(params.limit));
  if (params?.accountType) qs.set('accountType', params.accountType);
  if (params?.token) qs.set('token', params.token);
  const query = qs.toString() ? `?${qs.toString()}` : '';
  return adminFetch(`/users${query}`);
}

export async function getAdminUser(userId: string) {
  return adminFetch(`/users/${userId}`);
}

export async function getAdminUserStats() {
  return adminFetch('/users/stats');
}

export async function moderateUser(userId: string, action: 'suspend' | 'reactivate', reason?: string) {
  return adminFetch(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ action, reason }),
  });
}

export async function getAcquisitionAnalytics(days?: number) {
  const query = days ? `?days=${days}` : '';
  return adminFetch(`/analytics/acquisitions${query}`);
}
