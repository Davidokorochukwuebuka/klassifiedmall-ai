import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

const mockDrivers = [
  { id: 'drv_001', name: 'Musa Abdullahi', vehicle: 'Toyota Dyna (3 Ton)', vehicleType: 'truck', rating: 4.9, trips: 234, distance: '2.3 km', eta: '8 min', price: 5000, available: true, phone: '+234 801 111 2222', location: { lat: 6.5244, lng: 3.3792 }, licensePlate: 'LAG-234-XY' },
  { id: 'drv_002', name: 'Chukwu Emeka', vehicle: 'Mitsubishi Canter (5 Ton)', vehicleType: 'truck', rating: 4.7, trips: 189, distance: '3.1 km', eta: '12 min', price: 7500, available: true, phone: '+234 802 333 4444', location: { lat: 6.5355, lng: 3.3487 }, licensePlate: 'LAG-567-AB' },
  { id: 'drv_003', name: 'Bello Sani', vehicle: 'Isuzu NPR (7 Ton)', vehicleType: 'heavy', rating: 4.8, trips: 312, distance: '4.5 km', eta: '15 min', price: 12000, available: true, phone: '+234 803 555 6666', location: { lat: 6.4531, lng: 3.3958 }, licensePlate: 'KAN-890-CD' },
  { id: 'drv_004', name: 'Adewale Ogun', vehicle: 'Mercedes Actros (15 Ton)', vehicleType: 'heavy', rating: 4.6, trips: 156, distance: '5.8 km', eta: '20 min', price: 25000, available: false, phone: '+234 804 777 8888', location: { lat: 6.5100, lng: 3.3600 }, licensePlate: 'OYO-123-EF' },
  { id: 'drv_005', name: 'Yakubu Danladi', vehicle: 'Refrigerated Van (2 Ton)', vehicleType: 'refrigerated', rating: 4.9, trips: 98, distance: '1.8 km', eta: '6 min', price: 8000, available: true, phone: '+234 805 999 0000', location: { lat: 6.5400, lng: 3.3700 }, licensePlate: 'ABJ-456-GH' },
  { id: 'drv_006', name: 'Tunde Bakare', vehicle: 'Hilux Pickup (1 Ton)', vehicleType: 'pickup', rating: 4.5, trips: 67, distance: '0.8 km', eta: '4 min', price: 3500, available: true, phone: '+234 806 111 2233', location: { lat: 6.5280, lng: 3.3750 }, licensePlate: 'LAG-789-IJ' },
  { id: 'drv_007', name: 'Aminu Garba', vehicle: 'DAF Truck (20 Ton)', vehicleType: 'heavy', rating: 4.4, trips: 445, distance: '7.2 km', eta: '25 min', price: 35000, available: true, phone: '+234 807 444 5566', location: { lat: 6.4800, lng: 3.4100 }, licensePlate: 'KAN-012-KL' },
  { id: 'drv_008', name: 'Segun Adeyemi', vehicle: 'Kia Bongo (1.5 Ton)', vehicleType: 'pickup', rating: 4.7, trips: 123, distance: '2.9 km', eta: '10 min', price: 4000, available: true, phone: '+234 808 777 8899', location: { lat: 6.5150, lng: 3.3850 }, licensePlate: 'LAG-345-MN' },
];

export async function GET(request: NextRequest) {
  const proxied = await proxyToBackend(request, `/api/v1/hailing/drivers${new URL(request.url).search}`);
  if (proxied) return proxied;

  const { searchParams } = new URL(request.url);
  const vehicleType = searchParams.get('vehicleType');
  const maxPrice = searchParams.get('maxPrice');
  const availableOnly = searchParams.get('available') !== 'false';

  let filtered = [...mockDrivers];

  if (availableOnly) {
    filtered = filtered.filter(d => d.available);
  }

  if (vehicleType) {
    filtered = filtered.filter(d => d.vehicleType === vehicleType);
  }

  if (maxPrice) {
    filtered = filtered.filter(d => d.price <= parseInt(maxPrice));
  }

  // Sort by distance
  filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

  return NextResponse.json({
    success: true,
    data: {
      drivers: filtered,
      total: filtered.length,
    },
  });
}
