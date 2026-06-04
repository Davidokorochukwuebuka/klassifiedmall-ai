import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

const mockGroups = [
  { id: 'grp_001', name: 'Nigerian Farmers Network', members: 2340, description: 'Connect with farmers across Nigeria. Share tips, market prices, and best practices.', icon: '🌾', isJoined: true, lastActive: '2 min ago', category: 'Farming' },
  { id: 'grp_002', name: 'Lagos Exporters Hub', members: 890, description: 'For exporters based in Lagos. Discuss shipping, documentation, and international markets.', icon: '🚢', isJoined: true, lastActive: '15 min ago', category: 'Export' },
  { id: 'grp_003', name: 'Cold Chain Logistics', members: 456, description: 'Best practices for cold storage and temperature-controlled supply chains.', icon: '❄️', isJoined: false, lastActive: '1 hour ago', category: 'Logistics' },
  { id: 'grp_004', name: 'Organic Farming Nigeria', members: 1200, description: 'Organic certification, sustainable farming methods, and premium market access.', icon: '🌱', isJoined: false, lastActive: '30 min ago', category: 'Farming' },
  { id: 'grp_005', name: 'Agri-Tech Innovators', members: 678, description: 'Technology solutions for agriculture. IoT, drones, AI, and precision farming.', icon: '🤖', isJoined: true, lastActive: '5 min ago', category: 'Technology' },
  { id: 'grp_006', name: 'Women in Agriculture', members: 1560, description: 'Empowering women farmers and agri-business owners across Africa.', icon: '👩‍🌾', isJoined: false, lastActive: '45 min ago', category: 'Community' },
  { id: 'grp_007', name: 'Livestock Traders', members: 780, description: 'Buy and sell livestock. Discuss animal husbandry and veterinary care.', icon: '🐄', isJoined: false, lastActive: '2 hours ago', category: 'Livestock' },
  { id: 'grp_008', name: 'Abuja Agri-Business', members: 345, description: 'Networking for agricultural businesses in the FCT and surrounding states.', icon: '🏛️', isJoined: true, lastActive: '20 min ago', category: 'Business' },
];

export async function GET(request: NextRequest) {
  const proxied = await proxyToBackend(request, '/api/v1/community/groups');
  if (proxied) return proxied;

  return NextResponse.json({
    success: true,
    data: {
      groups: mockGroups,
      joinedCount: mockGroups.filter(g => g.isJoined).length,
      totalMembers: mockGroups.reduce((sum, g) => sum + g.members, 0),
    },
  });
}
