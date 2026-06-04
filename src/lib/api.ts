/**
 * API client library - Direct connection to AWS API Gateway.
 * All calls go to the real Lambda backend. No mocks, no local fallback.
 */
import { getAccessToken } from './auth';
import { AuthenticationError } from './errors';

const API_URL = 'https://dx45lag82l.execute-api.us-east-1.amazonaws.com/dev/api/v1';

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const token = await getAccessToken();

  // If no token and not a public endpoint, try using the stored ID token directly
  // (it may still be valid even if getAccessToken thinks it's expired due to clock skew)
  let authToken = token;
  if (!authToken && typeof window !== 'undefined') {
    authToken = localStorage.getItem('kl_id_token');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    // If API returns 401 Unauthorized, the token is truly invalid
    if (res.status === 401) {
      throw new AuthenticationError('Session expired. Please sign in again.');
    }
    throw new Error(data.error || `API request failed: ${res.status}`);
  }
  return data;
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
  return fetchAPI(`/marketplace/products${query}`);
}

export async function getProduct(productId: string) {
  return fetchAPI(`/marketplace/products/${productId}`);
}

export async function createProduct(data: {
  name: string;
  category: string;
  price: number;
  unit: string;
  description?: string;
  location?: string;
}) {
  return fetchAPI('/marketplace/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProduct(productId: string, data: Record<string, any>) {
  return fetchAPI(`/marketplace/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Orders
export async function getOrders(filters?: { status?: string; search?: string }) {
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.search) params.set('search', filters.search);
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI(`/orders${query}`);
}

export async function getOrder(orderId: string) {
  return fetchAPI(`/orders/${orderId}`);
}

export async function createOrder(data: {
  items: Array<{ productId: string; name: string; price: number; quantity: number }>;
  shippingAddress?: string;
  paymentMethod?: string;
}) {
  return fetchAPI('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Cart
export async function getCart() {
  return fetchAPI('/orders/cart');
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
  return fetchAPI('/orders/cart', {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

export async function updateCartItem(productId: string, quantity: number) {
  return fetchAPI('/orders/cart', {
    method: 'PUT',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function removeFromCart(itemId?: string, productId?: string) {
  const params = new URLSearchParams();
  if (itemId) params.set('itemId', itemId);
  if (productId) params.set('productId', productId);
  return fetchAPI(`/orders/cart?${params.toString()}`, {
    method: 'DELETE',
  });
}

export async function checkout(data: { shippingAddress: string; paymentMethod: string }) {
  return fetchAPI('/orders/checkout', {
    method: 'POST',
    body: JSON.stringify(data),
  });
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
  return fetchAPI('/hailing/requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
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
  return fetchAPI('/spaces', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Payments & Wallet
export async function getWallet() {
  return fetchAPI('/payments/wallets');
}

export async function initializePayment(data: {
  orderId: string;
  amount: number;
  email: string;
  paymentMethod?: string;
}) {
  return fetchAPI('/payments/paystack', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Notifications
export async function getNotifications() {
  return fetchAPI('/notifications');
}

export async function markNotificationRead(notificationId: string) {
  return fetchAPI(`/notifications/${notificationId}`, {
    method: 'PUT',
    body: JSON.stringify({ read: true }),
  });
}

// Community
export async function getGroups() {
  return fetchAPI('/community/groups');
}

export async function getMessages(conversationId: string) {
  return fetchAPI(`/community/messages?conversationId=${conversationId}`);
}

// AI Chat
export async function sendChatMessage(message: string) {
  return fetchAPI('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

// Negotiations
export async function getNegotiations() {
  return fetchAPI('/negotiations');
}

export async function createNegotiation(data: {
  productId: string;
  vendorId: string;
  proposedPrice: number;
  message?: string;
}) {
  return fetchAPI('/negotiations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Search
export async function searchProducts(query: string, filters?: Record<string, string>) {
  const params = new URLSearchParams({ q: query, ...filters });
  return fetchAPI(`/marketplace/search?${params.toString()}`);
}

// AI Services
export async function generateDescription(name: string, category: string, details?: Record<string, any>) {
  return fetchAPI('/ai/generate-description', {
    method: 'POST',
    body: JSON.stringify({ name, category, details }),
  });
}

export async function enhanceImage(imageKey: string, background?: 'white' | 'rustic' | 'studio') {
  return fetchAPI('/ai/enhance-image', {
    method: 'POST',
    body: JSON.stringify({ imageKey, background }),
  });
}

export async function processVoice(audio?: string, text?: string, context?: string) {
  return fetchAPI('/ai/voice', {
    method: 'POST',
    body: JSON.stringify({ audio, text, context }),
  });
}

export async function moderateContent(
  title: string,
  description: string,
  category: string,
  imageKeys?: string[]
) {
  return fetchAPI('/ai/moderate', {
    method: 'POST',
    body: JSON.stringify({ title, description, category, imageKeys }),
  });
}

export async function aiNegotiate(
  negotiationId: string,
  currentPrice: number,
  proposedPrice: number,
  quantity: number,
  productCategory: string,
  buyerHistory?: Record<string, any>
) {
  return fetchAPI('/ai/negotiate', {
    method: 'POST',
    body: JSON.stringify({ negotiationId, currentPrice, proposedPrice, quantity, productCategory, buyerHistory }),
  });
}
