import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

const mockSpaces = [
  { id: 'sp_001', name: 'Lagos Cold Hub A', location: 'Ikeja, Lagos', type: 'Cold Room', capacity: '50 tons', available: '12 tons', pricePerDay: 2500, temperature: '2-8°C', rating: 4.8, features: ['24/7 Access', 'CCTV', 'Generator Backup'], image: '🏭', contact: '+234 801 000 1111' },
  { id: 'sp_002', name: 'Kano Freezer Complex', location: 'Sabon Gari, Kano', type: 'Freezer', capacity: '30 tons', available: '8 tons', pricePerDay: 3500, temperature: '-18°C', rating: 4.6, features: ['Deep Freeze', 'Loading Bay', 'Insurance'], image: '❄️', contact: '+234 802 000 2222' },
  { id: 'sp_003', name: 'Oyo Dry Store', location: 'Ibadan, Oyo', type: 'Dry Storage', capacity: '100 tons', available: '45 tons', pricePerDay: 800, temperature: 'Ambient', rating: 4.4, features: ['Pest Control', 'Ventilated', 'Forklift'], image: '🏗️', contact: '+234 803 000 3333' },
  { id: 'sp_004', name: 'Abuja Climate Vault', location: 'Gwagwalada, Abuja', type: 'Climate Controlled', capacity: '25 tons', available: '5 tons', pricePerDay: 4000, temperature: '10-15°C', rating: 4.9, features: ['Humidity Control', 'Smart Monitoring', 'Premium'], image: '🌡️', contact: '+234 804 000 4444' },
  { id: 'sp_005', name: 'Port Harcourt Cold Store', location: 'Trans Amadi, PH', type: 'Cold Room', capacity: '40 tons', available: '20 tons', pricePerDay: 2800, temperature: '2-8°C', rating: 4.5, features: ['Near Port', '24/7 Access', 'CCTV'], image: '🏭', contact: '+234 805 000 5555' },
  { id: 'sp_006', name: 'Enugu Fresh Hub', location: 'New Haven, Enugu', type: 'Cold Room', capacity: '20 tons', available: '3 tons', pricePerDay: 2200, temperature: '4-10°C', rating: 4.3, features: ['Generator Backup', 'Loading Bay'], image: '🏭', contact: '+234 806 000 6666' },
  { id: 'sp_007', name: 'Kaduna Grain Silo', location: 'Kaduna South', type: 'Dry Storage', capacity: '200 tons', available: '80 tons', pricePerDay: 600, temperature: 'Ambient', rating: 4.7, features: ['Fumigation', 'Weighbridge', 'Rail Access'], image: '🏗️', contact: '+234 807 000 7777' },
  { id: 'sp_008', name: 'Onne Port Freezer', location: 'Onne, Rivers', type: 'Freezer', capacity: '60 tons', available: '25 tons', pricePerDay: 4500, temperature: '-25°C', rating: 4.8, features: ['Export Ready', 'Customs Clearance', 'Container Loading'], image: '❄️', contact: '+234 808 000 8888' },
];

export async function GET(request: NextRequest) {
  const proxied = await proxyToBackend(request, `/api/v1/spaces${new URL(request.url).search}`);
  if (proxied) return proxied;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const location = searchParams.get('location');

  let filtered = [...mockSpaces];

  if (type && type !== 'All') {
    filtered = filtered.filter(s => s.type === type);
  }

  if (location) {
    const q = location.toLowerCase();
    filtered = filtered.filter(s => s.location.toLowerCase().includes(q));
  }

  return NextResponse.json({
    success: true,
    data: {
      spaces: filtered,
      total: filtered.length,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { spaceId, startDate, endDate, quantity } = body;

    if (!spaceId || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Space ID, start date, and end date are required' },
        { status: 400 }
      );
    }

    const space = mockSpaces.find(s => s.id === spaceId);
    if (!space) {
      return NextResponse.json(
        { success: false, error: 'Space not found' },
        { status: 404 }
      );
    }

    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    const totalCost = space.pricePerDay * (quantity || 1) * days;

    const booking = {
      id: 'BK-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      spaceId,
      spaceName: space.name,
      location: space.location,
      type: space.type,
      startDate,
      endDate,
      quantity: quantity || 1,
      days,
      pricePerDay: space.pricePerDay,
      totalCost,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
