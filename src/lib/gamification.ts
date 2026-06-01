// Gamification Service - Points, Badges, Leaderboard

export interface UserPoints {
  userId: string;
  totalPoints: number;
  level: number;
  levelName: string;
  nextLevelPoints: number;
  badges: Badge[];
  streak: number;
  lastActiveDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  category: 'trading' | 'community' | 'achievement' | 'milestone';
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  badges: number;
}

export enum PointAction {
  FIRST_PURCHASE = 'FIRST_PURCHASE',
  COMPLETE_ORDER = 'COMPLETE_ORDER',
  LEAVE_REVIEW = 'LEAVE_REVIEW',
  REFER_USER = 'REFER_USER',
  LIST_PRODUCT = 'LIST_PRODUCT',
  COMPLETE_PROFILE = 'COMPLETE_PROFILE',
  JOIN_GROUP = 'JOIN_GROUP',
  DAILY_LOGIN = 'DAILY_LOGIN',
  FIRST_SALE = 'FIRST_SALE',
  BULK_ORDER = 'BULK_ORDER',
  NEGOTIATE_DEAL = 'NEGOTIATE_DEAL',
  BOOK_SPACE = 'BOOK_SPACE',
  HAIL_DRIVER = 'HAIL_DRIVER',
}

const POINT_VALUES: Record<PointAction, number> = {
  [PointAction.FIRST_PURCHASE]: 100,
  [PointAction.COMPLETE_ORDER]: 25,
  [PointAction.LEAVE_REVIEW]: 15,
  [PointAction.REFER_USER]: 200,
  [PointAction.LIST_PRODUCT]: 30,
  [PointAction.COMPLETE_PROFILE]: 50,
  [PointAction.JOIN_GROUP]: 10,
  [PointAction.DAILY_LOGIN]: 5,
  [PointAction.FIRST_SALE]: 150,
  [PointAction.BULK_ORDER]: 75,
  [PointAction.NEGOTIATE_DEAL]: 20,
  [PointAction.BOOK_SPACE]: 40,
  [PointAction.HAIL_DRIVER]: 15,
};

const LEVELS = [
  { level: 1, name: 'Seedling', minPoints: 0 },
  { level: 2, name: 'Sprout', minPoints: 100 },
  { level: 3, name: 'Grower', minPoints: 300 },
  { level: 4, name: 'Harvester', minPoints: 600 },
  { level: 5, name: 'Trader', minPoints: 1000 },
  { level: 6, name: 'Merchant', minPoints: 1500 },
  { level: 7, name: 'Mogul', minPoints: 2500 },
  { level: 8, name: 'Tycoon', minPoints: 4000 },
  { level: 9, name: 'Legend', minPoints: 6000 },
  { level: 10, name: 'Champion', minPoints: 10000 },
];

const ALL_BADGES: Badge[] = [
  { id: 'first_purchase', name: 'First Buy', description: 'Made your first purchase', icon: '🛒', category: 'milestone' },
  { id: 'first_sale', name: 'First Sale', description: 'Made your first sale', icon: '💰', category: 'milestone' },
  { id: 'profile_complete', name: 'All Set', description: 'Completed your profile', icon: '✅', category: 'achievement' },
  { id: 'community_joiner', name: 'Social Butterfly', description: 'Joined 5 groups', icon: '🦋', category: 'community' },
  { id: 'top_reviewer', name: 'Top Reviewer', description: 'Left 10 reviews', icon: '⭐', category: 'community' },
  { id: 'bulk_buyer', name: 'Bulk Buyer', description: 'Placed 5 bulk orders', icon: '📦', category: 'trading' },
  { id: 'negotiator', name: 'Deal Maker', description: 'Completed 10 negotiations', icon: '🤝', category: 'trading' },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day login streak', icon: '🔥', category: 'achievement' },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day login streak', icon: '🏆', category: 'achievement' },
  { id: 'referral_5', name: 'Ambassador', description: 'Referred 5 users', icon: '🌟', category: 'milestone' },
  { id: 'space_booker', name: 'Space Explorer', description: 'Booked 3 storage spaces', icon: '🏭', category: 'trading' },
  { id: 'hailing_pro', name: 'Logistics Pro', description: 'Hailed 10 drivers', icon: '🚚', category: 'trading' },
];

export function getPointsForAction(action: PointAction): number {
  return POINT_VALUES[action] || 0;
}

export function calculateLevel(totalPoints: number): { level: number; name: string; nextLevelPoints: number } {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (totalPoints >= l.minPoints) current = l;
    else break;
  }
  const nextLevel = LEVELS.find(l => l.minPoints > totalPoints);
  return {
    level: current.level,
    name: current.name,
    nextLevelPoints: nextLevel?.minPoints || current.minPoints,
  };
}

export function checkBadgeEligibility(action: PointAction, actionCount: number): Badge | null {
  switch (action) {
    case PointAction.FIRST_PURCHASE: return actionCount === 1 ? ALL_BADGES[0] : null;
    case PointAction.FIRST_SALE: return actionCount === 1 ? ALL_BADGES[1] : null;
    case PointAction.COMPLETE_PROFILE: return ALL_BADGES[2];
    case PointAction.JOIN_GROUP: return actionCount >= 5 ? ALL_BADGES[3] : null;
    case PointAction.LEAVE_REVIEW: return actionCount >= 10 ? ALL_BADGES[4] : null;
    case PointAction.BULK_ORDER: return actionCount >= 5 ? ALL_BADGES[5] : null;
    case PointAction.NEGOTIATE_DEAL: return actionCount >= 10 ? ALL_BADGES[6] : null;
    case PointAction.BOOK_SPACE: return actionCount >= 3 ? ALL_BADGES[10] : null;
    case PointAction.HAIL_DRIVER: return actionCount >= 10 ? ALL_BADGES[11] : null;
    default: return null;
  }
}

export function getAllBadges(): Badge[] {
  return ALL_BADGES;
}

export function getMockLeaderboard(): LeaderboardEntry[] {
  return [
    { rank: 1, userId: 'usr_001', name: 'Ade Farms', avatar: '👨‍🌾', points: 8750, level: 9, badges: 8 },
    { rank: 2, userId: 'usr_002', name: 'Mama Spice Co.', avatar: '👩‍🍳', points: 6200, level: 9, badges: 7 },
    { rank: 3, userId: 'usr_003', name: 'Northern Grains', avatar: '🌾', points: 5100, level: 8, badges: 6 },
    { rank: 4, userId: 'usr_004', name: 'Delta Palm Estate', avatar: '🌴', points: 4300, level: 8, badges: 5 },
    { rank: 5, userId: 'usr_005', name: 'Aqua Fresh Farms', avatar: '🐟', points: 3800, level: 7, badges: 5 },
    { rank: 6, userId: 'usr_006', name: 'Kaduna Organics', avatar: '🫚', points: 3200, level: 7, badges: 4 },
    { rank: 7, userId: 'usr_007', name: 'Green Life NG', avatar: '🍃', points: 2900, level: 7, badges: 4 },
    { rank: 8, userId: 'usr_008', name: 'Ogun Rice Mills', avatar: '🍚', points: 2400, level: 6, badges: 3 },
    { rank: 9, userId: 'usr_009', name: 'Epe Fisheries', avatar: '🐠', points: 2100, level: 6, badges: 3 },
    { rank: 10, userId: 'usr_010', name: 'Sokoto Hibiscus', avatar: '🌺', points: 1800, level: 6, badges: 2 },
  ];
}
