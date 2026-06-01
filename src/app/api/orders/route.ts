import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

const mockOrders = [
  { id: 'ORD-2024-001', product: 'Fresh Tomatoes', quantity: '50kg', buyer: 'Lagos Fresh Foods', seller: 'Ade Farms', status: 'Delivered', amount: 45000, date: '2024-01-15', deliveryDate: '2024-01-17', trackingId: 'TRK-001' },
  { id: 'ORD-2024-002', product: 'Dried Red Pepper', quantity: '20kg', buyer: 'Mama Kitchen Supplies', seller: 'Mama Spice Co.', status: 'In Transit', amount: 32000, date: '2024-01-18', deliveryDate: '2024-01-20', trackingId: 'TRK-002' },
  { id: 'ORD-2024-003', product: 'Yam Flour', quantity: '100kg', buyer: 'ChopBar Restaurant', seller: 'Ibarapa Yam Farms', status: 'Processing', amount: 78000, date: '2024-01-19', deliveryDate: '2024-01-22', trackingId: 'TRK-003' },
  { id: 'ORD-2024-004', product: 'Palm Oil', quantity: '50L', buyer: 'Oasis Supermarket', seller: 'Delta Palm Estate', status: 'Pending', amount: 55000, date: '2024-01-20', deliveryDate: '2024-01-24', trackingId: 'TRK-004' },
  { id: 'ORD-2024-005', product: 'Yellow Maize', quantity: '200kg', buyer: 'Northern Mills', seller: 'Northern Grains Ltd', status: 'Delivered', amount: 90000, date: '2024-01-12', deliveryDate: '2024-01-14', trackingId: 'TRK-005' },
  { id: 'ORD-2024-006', product: 'Catfish (Fresh)', quantity: '30kg', buyer: 'Seafood Express', seller: 'Aqua Fresh Farms', status: 'Cancelled', amount: 75000, date: '2024-01-16', deliveryDate: '-', trackingId: null },
  { id: 'ORD-2024-007', product: 'Organic Ginger', quantity: '15kg', buyer: 'Health Foods NG', seller: 'Kaduna Organics', status: 'In Transit', amount: 45000, date: '2024-01-19', deliveryDate: '2024-01-21', trackingId: 'TRK-007' },
  { id: 'ORD-2024-008', product: 'Cashew Nuts', quantity: '25kg', buyer: 'Export Hub Ltd', seller: 'Ogbomoso Cashew', status: 'Processing', amount: 137500, date: '2024-01-20', deliveryDate: '2024-01-25', trackingId: 'TRK-008' },
  { id: 'ORD-2024-009', product: 'Shea Butter', quantity: '10kg', buyer: 'Beauty Naturals', seller: 'Kwara Shea Women', status: 'Delivered', amount: 40000, date: '2024-01-10', deliveryDate: '2024-01-12', trackingId: 'TRK-009' },
  { id: 'ORD-2024-010', product: 'Moringa Powder', quantity: '5kg', buyer: 'Wellness Store', seller: 'Green Life NG', status: 'Pending', amount: 17500, date: '2024-01-21', deliveryDate: '2024-01-26', trackingId: 'TRK-010' },
];

export async function GET(request: NextRequest) {
  const proxied = await proxyToBackend(request, `/api/v1/orders${new URL(request.url).search}`);
  if (proxied) return proxied;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let filtered = [...mockOrders];

  if (status && status !== 'All') {
    filtered = filtered.filter(o => o.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.buyer.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      orders: filtered,
      summary: {
        total: mockOrders.length,
        pending: mockOrders.filter(o => o.status === 'Pending').length,
        processing: mockOrders.filter(o => o.status === 'Processing').length,
        inTransit: mockOrders.filter(o => o.status === 'In Transit').length,
        delivered: mockOrders.filter(o => o.status === 'Delivered').length,
        cancelled: mockOrders.filter(o => o.status === 'Cancelled').length,
      },
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    const totalAmount = items.reduce((sum: number, item: { price: number; quantity: number }) =>
      sum + (item.price * item.quantity), 0
    );

    const newOrder = {
      id: 'ORD-2024-' + String(Math.floor(Math.random() * 900) + 100),
      items,
      totalAmount,
      status: 'Pending',
      shippingAddress: shippingAddress || 'Lagos, Nigeria',
      paymentMethod: paymentMethod || 'Bank Transfer',
      date: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trackingId: 'TRK-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    };

    return NextResponse.json({
      success: true,
      data: newOrder,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
