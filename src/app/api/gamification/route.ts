import { NextResponse } from 'next/server';
import { getMockLeaderboard, getAllBadges, calculateLevel } from '@/lib/gamification';

export async function GET() {
  const leaderboard = getMockLeaderboard();
  const badges = getAllBadges();

  // Mock current user stats
  const userPoints = {
    userId: 'current_user',
    totalPoints: 1250,
    ...calculateLevel(1250),
    badges: badges.slice(0, 4).map(b => ({ ...b, earnedAt: '2024-01-15T00:00:00Z' })),
    streak: 12,
    lastActiveDate: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    data: { userPoints, leaderboard, allBadges: badges },
  });
}
