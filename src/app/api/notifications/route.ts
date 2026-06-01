import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

const mockNotifications = [
  { id: 'notif_001', type: 'order', title: 'New order received', message: 'Lagos Fresh Foods ordered 50kg Fresh Tomatoes', time: '2 min ago', read: false, icon: '📦' },
  { id: 'notif_002', type: 'storage', title: 'Booking confirmed', message: 'Your cold storage booking at Lagos Cold Hub A is confirmed', time: '1 hour ago', read: false, icon: '❄️' },
  { id: 'notif_003', type: 'price', title: 'Price alert', message: 'Maize prices dropped 5% in Kano market', time: '3 hours ago', read: false, icon: '📉' },
  { id: 'notif_004', type: 'delivery', title: 'Delivery completed', message: 'Order ORD-2024-005 has been delivered successfully', time: '5 hours ago', read: true, icon: '✅' },
  { id: 'notif_005', type: 'community', title: 'New message', message: 'Ibrahim M. replied in Nigerian Farmers Network', time: '6 hours ago', read: true, icon: '💬' },
  { id: 'notif_006', type: 'system', title: 'Account verified', message: 'Your seller account has been verified. You can now list products.', time: '1 day ago', read: true, icon: '🎉' },
  { id: 'notif_007', type: 'order', title: 'Payment received', message: '₦78,000 received for order ORD-2024-003', time: '1 day ago', read: true, icon: '💰' },
  { id: 'notif_008', type: 'hailing', title: 'Driver assigned', message: 'Musa Abdullahi has been assigned to your delivery', time: '2 days ago', read: true, icon: '🚚' },
  { id: 'notif_009', type: 'price', title: 'Price alert', message: 'Tomato prices increased 12% in Lagos markets', time: '2 days ago', read: true, icon: '📈' },
  { id: 'notif_010', type: 'community', title: 'Group invite', message: 'You have been invited to join "Women in Agriculture"', time: '3 days ago', read: true, icon: '👩‍🌾' },
];

export async function GET(request: NextRequest) {
  const proxied = await proxyToBackend(request, '/api/v1/notifications');
  if (proxied) return proxied;

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return NextResponse.json({
    success: true,
    data: {
      notifications: mockNotifications,
      unreadCount,
    },
  });
}
