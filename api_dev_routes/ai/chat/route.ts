import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

const responses: Record<string, string> = {
  price: 'Based on current market data, here are today\'s prices:\n• Tomatoes: ₦900/kg (up 5% from last week)\n• Maize: ₦450/kg (stable)\n• Palm Oil: ₦28,000/25L drum\n• Beans: ₦800/kg (down 3%)\n\nWould you like me to set up price alerts for any of these?',
  storage: 'I found 3 available cold storage facilities near you:\n1. Lagos Cold Hub A - ₦2,500/ton/day (12 tons available)\n2. Port Harcourt Cold Store - ₦2,800/ton/day (20 tons available)\n3. Enugu Fresh Hub - ₦2,200/ton/day (3 tons available)\n\nWould you like me to book one of these?',
  delivery: 'For your delivery needs, I recommend:\n• Within Lagos: Tunde Bakare (Hilux Pickup) - ₦3,500, arrives in 4 min\n• Interstate: Bello Sani (Isuzu NPR 7 Ton) - ₦12,000, arrives in 15 min\n\nShall I book a driver for you?',
  order: 'Your recent orders summary:\n• 3 orders in transit\n• 2 orders delivered this week\n• Total revenue: ₦210,000\n\nYour next delivery is expected tomorrow at 10 AM. Would you like to track it?',
  help: 'I can help you with:\n• 📊 Market prices and trends\n• 🚚 Finding delivery drivers\n• ❄️ Booking storage spaces\n• 📦 Managing orders\n• 👥 Community connections\n• 💡 Business tips\n\nJust ask me anything!',
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
    return responses.price;
  }
  if (lower.includes('storage') || lower.includes('cold') || lower.includes('store') || lower.includes('space')) {
    return responses.storage;
  }
  if (lower.includes('deliver') || lower.includes('driver') || lower.includes('transport') || lower.includes('ship')) {
    return responses.delivery;
  }
  if (lower.includes('order') || lower.includes('track') || lower.includes('status')) {
    return responses.order;
  }
  if (lower.includes('help') || lower.includes('what can') || lower.includes('hi') || lower.includes('hello')) {
    return responses.help;
  }

  return `I understand you're asking about "${message}". Here are some suggestions:\n\n• Check the Marketplace for product listings and prices\n• Use the Hailing service to find delivery drivers\n• Browse Storage Spaces for cold rooms and warehouses\n• Join Community groups to connect with other traders\n\nIs there something specific I can help you with?`;
}

export async function POST(request: NextRequest) {
  const proxied = await proxyToBackend(request, '/api/v1/ai/chat');
  if (proxied) return proxied;

  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    const response = getAIResponse(message);

    return NextResponse.json({
      success: true,
      data: {
        id: 'msg_' + Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
