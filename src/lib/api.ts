const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('kl_token');
}

async function fetchAPI(endpoint: string, options?: RequestInit & { skipAuth?: boolean }) {
  const { skipAuth, ...fetchOptions } = options || {};
  const url = `${BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions?.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = getAuthToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...fetchOptions, headers });

  if (res.status === 401) {
    localStorage.removeItem('kl_token');
    localStorage.removeItem('kl_user');
    if (typeof window !== 'undefined') window.location.href = '/login';
    throw new Error('Session expired');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API request failed');
  return data;
}

// Auth
export async function login(email: string, password: string) {
  return fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  });
}

export async function register(data: {
  email: string;
  password: string;
  name: string;
  accountType?: string;
  phone?: string;
  location?: string;
}) {
  return fetchAPI('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  });
}

// Products
export async function getProducts(filters?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (filters?.category) params.set('category', filters.category);
  if (filters?.search) params.set('search', filters.search);
  if (filters?.page) params.set('page', String(filters.page));
  if (filters?.limit) params.set('limit', String(filters.limit));
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI(`/products${query}`);
}

export async function createProduct(data: {
  name: string;
  category: string;
  price: number;
  unit: string;
  description?: string;
  location?: string;
}) {
  return fetchAPI('/products', { method: 'POST', body: JSON.stringify(data) });
}

// Orders
export async function getOrders(filters?: { status?: string; search?: string }) {
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.search) params.set('search', filters.search);
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI(`/orders${query}`);
}

export async function createOrder(data: {
  items: Array<{ productId: string; name: string; price: number; quantity: number }>;
  shippingAddress?: string;
  paymentMethod?: string;
}) {
  return fetchAPI('/orders', { method: 'POST', body: JSON.stringify(data) });
}

// Cart
export async function getCart() {
  return fetchAPI('/cart');
}

export async function addToCart(product: {
  productId: string;
  name: string;
  price: number;
  quantity?: number;
  unit?: string;
  seller?: string;
  image?: string;
}) {
  return fetchAPI('/cart', { method: 'POST', body: JSON.stringify(product) });
}

export async function removeFromCart(itemId?: string, productId?: string) {
  const params = new URLSearchParams();
  if (itemId) params.set('itemId', itemId);
  if (productId) params.set('productId', productId);
  return fetchAPI(`/cart?${params.toString()}`, { method: 'DELETE' });
}

// Hailing / Drivers
export async function getDrivers(filters?: {
  location?: string;
  vehicleType?: string;
  maxPrice?: number;
}) {
  const params = new URLSearchParams();
  if (filters?.vehicleType) params.set('vehicleType', filters.vehicleType);
  if (filters?.maxPrice) params.set('maxPrice', String(filters.maxPrice));
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI(`/hailing/drivers${query}`);
}

export async function bookDriver(data: {
  driverId: string;
  pickup: string;
  destination: string;
  cargoType?: string;
  weight?: string;
}) {
  return fetchAPI('/hailing/requests', { method: 'POST', body: JSON.stringify(data) });
}

// Spaces
export async function getSpaces(filters?: { type?: string; location?: string }) {
  const params = new URLSearchParams();
  if (filters?.type) params.set('type', filters.type);
  if (filters?.location) params.set('location', filters.location);
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI(`/spaces${query}`);
}

export async function bookSpace(data: {
  spaceId: string;
  startDate: string;
  endDate: string;
  quantity?: number;
}) {
  return fetchAPI('/spaces', { method: 'POST', body: JSON.stringify(data) });
}

// Notifications
export async function getNotifications() {
  return fetchAPI('/notifications');
}

// Community
export async function getGroups() {
  return fetchAPI('/community/groups');
}

// AI Chat
export async function sendChatMessage(message: string) {
  return fetchAPI('/ai/chat', { method: 'POST', body: JSON.stringify({ message }) });
}
