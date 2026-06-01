import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

const mockProducts = [
  { id: 'prod_001', name: 'Fresh Tomatoes', category: 'Vegetables', price: 900, unit: 'per kg', seller: 'Ade Farms', sellerId: 'usr_001', location: 'Oyo State', rating: 4.8, image: '🍅', inStock: true, description: 'Farm-fresh tomatoes harvested daily from our organic farm in Oyo State.', reviews: 87 },
  { id: 'prod_002', name: 'Dried Red Pepper', category: 'Spices', price: 1600, unit: 'per kg', seller: 'Mama Spice Co.', sellerId: 'usr_002', location: 'Kaduna', rating: 4.5, image: '🌶️', inStock: true, description: 'Premium dried red pepper, sun-dried for maximum flavor.', reviews: 54 },
  { id: 'prod_003', name: 'Yellow Maize', category: 'Grains', price: 450, unit: 'per kg', seller: 'Northern Grains Ltd', sellerId: 'usr_003', location: 'Kano', rating: 4.7, image: '🌽', inStock: true, description: 'High-quality yellow maize suitable for flour, feed, and export.', reviews: 123 },
  { id: 'prod_004', name: 'Palm Oil (25L)', category: 'Oils', price: 28000, unit: 'per drum', seller: 'Delta Palm Estate', sellerId: 'usr_004', location: 'Delta State', rating: 4.6, image: '🫒', inStock: true, description: 'Pure unrefined palm oil from Delta State plantations.', reviews: 67 },
  { id: 'prod_005', name: 'Honey Beans', category: 'Grains', price: 800, unit: 'per kg', seller: 'Benue Harvest', sellerId: 'usr_005', location: 'Benue State', rating: 4.4, image: '🫘', inStock: false, description: 'Premium honey beans from the food basket of Nigeria.', reviews: 45 },
  { id: 'prod_006', name: 'Yam Tubers', category: 'Tubers', price: 1200, unit: 'per tuber', seller: 'Ibarapa Yam Farms', sellerId: 'usr_006', location: 'Oyo State', rating: 4.9, image: '🍠', inStock: true, description: 'Large, fresh yam tubers perfect for pounding or frying.', reviews: 156 },
  { id: 'prod_007', name: 'Catfish (Fresh)', category: 'Seafood', price: 2500, unit: 'per kg', seller: 'Aqua Fresh Farms', sellerId: 'usr_007', location: 'Lagos', rating: 4.3, image: '🐟', inStock: true, description: 'Live catfish from our aquaculture ponds in Lagos.', reviews: 34 },
  { id: 'prod_008', name: 'Organic Ginger', category: 'Spices', price: 3000, unit: 'per kg', seller: 'Kaduna Organics', sellerId: 'usr_008', location: 'Kaduna', rating: 4.7, image: '🫚', inStock: true, description: 'Certified organic ginger, perfect for export and local use.', reviews: 78 },
  { id: 'prod_009', name: 'Cashew Nuts', category: 'Nuts', price: 5500, unit: 'per kg', seller: 'Ogbomoso Cashew', sellerId: 'usr_009', location: 'Oyo State', rating: 4.8, image: '🥜', inStock: true, description: 'Raw cashew nuts, hand-picked and sorted for quality.', reviews: 92 },
  { id: 'prod_010', name: 'Plantain (Ripe)', category: 'Fruits', price: 600, unit: 'per bunch', seller: 'Ondo Plantain Hub', sellerId: 'usr_010', location: 'Ondo State', rating: 4.2, image: '🍌', inStock: true, description: 'Ripe plantains perfect for frying or roasting.', reviews: 28 },
  { id: 'prod_011', name: 'Shea Butter', category: 'Oils', price: 4000, unit: 'per kg', seller: 'Kwara Shea Women', sellerId: 'usr_011', location: 'Kwara State', rating: 4.6, image: '🧈', inStock: true, description: 'Unrefined shea butter processed by women cooperatives.', reviews: 63 },
  { id: 'prod_012', name: 'Cocoa Beans', category: 'Export', price: 7200, unit: 'per kg', seller: 'Ondo Cocoa Estate', sellerId: 'usr_012', location: 'Ondo State', rating: 4.9, image: '🫘', inStock: true, description: 'Grade A cocoa beans ready for export.', reviews: 41 },
  { id: 'prod_013', name: 'Garri (White)', category: 'Processed', price: 350, unit: 'per kg', seller: 'Ogun Cassava Mills', sellerId: 'usr_013', location: 'Ogun State', rating: 4.3, image: '🥣', inStock: true, description: 'Fine white garri processed from fresh cassava.', reviews: 112 },
  { id: 'prod_014', name: 'Groundnut Oil', category: 'Oils', price: 3200, unit: 'per 5L', seller: 'Kano Oil Mills', sellerId: 'usr_014', location: 'Kano', rating: 4.5, image: '🫗', inStock: true, description: 'Cold-pressed groundnut oil, pure and natural.', reviews: 56 },
  { id: 'prod_015', name: 'Watermelon', category: 'Fruits', price: 1500, unit: 'per piece', seller: 'Nasarawa Farms', sellerId: 'usr_015', location: 'Nasarawa', rating: 4.1, image: '🍉', inStock: true, description: 'Large sweet watermelons from Nasarawa farms.', reviews: 33 },
  { id: 'prod_016', name: 'Smoked Fish', category: 'Seafood', price: 4500, unit: 'per kg', seller: 'Epe Fisheries', sellerId: 'usr_016', location: 'Lagos', rating: 4.7, image: '🐠', inStock: true, description: 'Traditionally smoked catfish and mackerel.', reviews: 89 },
  { id: 'prod_017', name: 'Sesame Seeds', category: 'Export', price: 2800, unit: 'per kg', seller: 'Jigawa Sesame Co.', sellerId: 'usr_017', location: 'Jigawa', rating: 4.6, image: '🌰', inStock: true, description: 'Export-grade sesame seeds, cleaned and sorted.', reviews: 47 },
  { id: 'prod_018', name: 'Fresh Okra', category: 'Vegetables', price: 700, unit: 'per kg', seller: 'Plateau Fresh', sellerId: 'usr_018', location: 'Plateau State', rating: 4.4, image: '🥒', inStock: true, description: 'Fresh green okra from Jos Plateau farms.', reviews: 29 },
  { id: 'prod_019', name: 'Hibiscus (Zobo)', category: 'Beverages', price: 1800, unit: 'per kg', seller: 'Sokoto Hibiscus', sellerId: 'usr_019', location: 'Sokoto', rating: 4.8, image: '🌺', inStock: true, description: 'Dried hibiscus flowers for zobo drink and export.', reviews: 74 },
  { id: 'prod_020', name: 'Moringa Powder', category: 'Health', price: 3500, unit: 'per kg', seller: 'Green Life NG', sellerId: 'usr_020', location: 'Abuja', rating: 4.9, image: '🍃', inStock: true, description: 'Organic moringa leaf powder, rich in nutrients.', reviews: 98 },
  { id: 'prod_021', name: 'Rice (Ofada)', category: 'Grains', price: 1100, unit: 'per kg', seller: 'Ogun Rice Mills', sellerId: 'usr_021', location: 'Ogun State', rating: 4.5, image: '🍚', inStock: true, description: 'Local Ofada rice with distinctive aroma and taste.', reviews: 134 },
  { id: 'prod_022', name: 'Snails (Giant)', category: 'Livestock', price: 800, unit: 'per piece', seller: 'Abeokuta Snail Farm', sellerId: 'usr_022', location: 'Ogun State', rating: 4.2, image: '🐌', inStock: true, description: 'Giant African land snails, farm-raised.', reviews: 22 },
];

export async function GET(request: NextRequest) {
  // In production, proxy to backend Lambda
  const proxied = await proxyToBackend(request, `/api/v1/marketplace/products${new URL(request.url).search}`);
  if (proxied) return proxied;

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let filtered = [...mockProducts];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.seller.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: {
      products: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, price, unit, description, location } = body;

    if (!name || !price) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: 'prod_' + Math.random().toString(36).substr(2, 9),
      name,
      category: category || 'Other',
      price,
      unit: unit || 'per unit',
      seller: 'Your Store',
      sellerId: 'usr_current',
      location: location || 'Lagos',
      rating: 0,
      image: '📦',
      inStock: true,
      description: description || '',
      reviews: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newProduct,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
