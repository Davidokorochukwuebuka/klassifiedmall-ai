import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

// In-memory cart store (resets on server restart - fine for mock)
let cartItems: Array<{
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  seller: string;
  image: string;
}> = [
  { id: 'cart_001', productId: 'prod_001', name: 'Fresh Tomatoes', price: 900, quantity: 3, unit: 'per kg', seller: 'Ade Farms', image: '🍅' },
  { id: 'cart_002', productId: 'prod_003', name: 'Yellow Maize', price: 450, quantity: 10, unit: 'per kg', seller: 'Northern Grains Ltd', image: '🌽' },
];

export async function GET(request: NextRequest) {
  const proxied = await proxyToBackend(request, '/api/v1/orders/cart');
  if (proxied) return proxied;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 50000 ? 0 : 2500;
  const total = subtotal + deliveryFee;

  return NextResponse.json({
    success: true,
    data: {
      items: cartItems,
      summary: {
        itemCount: cartItems.length,
        subtotal,
        deliveryFee,
        total,
      },
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, name, price, quantity, unit, seller, image } = body;

    if (!productId || !name || !price) {
      return NextResponse.json(
        { success: false, error: 'Product details are required' },
        { status: 400 }
      );
    }

    // Check if already in cart
    const existing = cartItems.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      cartItems.push({
        id: 'cart_' + Math.random().toString(36).substr(2, 6),
        productId,
        name,
        price,
        quantity: quantity || 1,
        unit: unit || 'per unit',
        seller: seller || 'Unknown',
        image: image || '📦',
      });
    }

    return NextResponse.json({
      success: true,
      data: { items: cartItems, message: `${name} added to cart` },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    const productId = searchParams.get('productId');

    if (itemId) {
      cartItems = cartItems.filter(item => item.id !== itemId);
    } else if (productId) {
      cartItems = cartItems.filter(item => item.productId !== productId);
    } else {
      // Clear entire cart
      cartItems = [];
    }

    return NextResponse.json({
      success: true,
      data: { items: cartItems, message: 'Item removed from cart' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
