'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Play, Plus, Grid3X3, Film, ShoppingBag, TrendingUp, MoreHorizontal, Music2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';

type TabType = 'feeds' | 'reels' | 'products' | 'trending';

interface FeedPost {
  id: string;
  user: { name: string; avatar: string; verified: boolean; handle: string };
  content: string;
  media?: { type: 'image' | 'video' | 'reel'; url: string; thumbnail?: string };
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
  saved: boolean;
  product?: { name: string; price: string; href: string };
}

const feedPosts: FeedPost[] = [
  {
    id: '1',
    user: { name: 'Fresh Farms NG', avatar: '🥬', verified: true, handle: '@freshfarms' },
    content: 'Fresh organic tomatoes just harvested! 🍅 Farm-to-table in 24 hours. Order now and get 20% off your first purchase!',
    media: { type: 'image', url: '/feed/tomatoes.jpg' },
    likes: 342, comments: 28, shares: 15, timestamp: '2h ago', liked: false, saved: false,
    product: { name: 'Organic Tomatoes (basket)', price: '₦3,500', href: '/products/7' },
  },
  {
    id: '2',
    user: { name: 'Chef Amara', avatar: '👨‍🍳', verified: true, handle: '@chefamara' },
    content: 'Watch me make the perfect Jollof Rice! 🍚🔥 Secret ingredient revealed in this video. Drop a ❤️ if you want the full recipe!',
    media: { type: 'video', url: '/feed/jollof.mp4', thumbnail: '/feed/jollof-thumb.jpg' },
    likes: 1205, comments: 89, shares: 156, timestamp: '4h ago', liked: true, saved: true,
  },
  {
    id: '3',
    user: { name: 'StyleBox', avatar: '👗', verified: true, handle: '@stylebox' },
    content: 'New Ankara collection just dropped! 🎨 Which one is your favorite? Comment below 👇',
    media: { type: 'image', url: '/feed/ankara.jpg' },
    likes: 567, comments: 45, shares: 32, timestamp: '6h ago', liked: false, saved: false,
    product: { name: 'Ankara Dress Collection', price: '₦8,500', href: '/products/3' },
  },
  {
    id: '4',
    user: { name: 'TechHub Lagos', avatar: '📱', verified: true, handle: '@techhub' },
    content: 'Unboxing the latest Smart Watch Pro! ⌚ Full review coming tomorrow. Stay tuned!',
    media: { type: 'reel', url: '/feed/smartwatch.mp4', thumbnail: '/feed/watch-thumb.jpg' },
    likes: 890, comments: 67, shares: 44, timestamp: '8h ago', liked: false, saved: true,
    product: { name: 'Smart Watch Pro', price: '₦25,000', href: '/products/6' },
  },
  {
    id: '5',
    user: { name: 'HealthFirst', avatar: '🧴', verified: false, handle: '@healthfirst' },
    content: 'Morning skincare routine that changed my life! ✨ All products available on my store. Link in bio!',
    media: { type: 'video', url: '/feed/skincare.mp4' },
    likes: 445, comments: 34, shares: 21, timestamp: '12h ago', liked: true, saved: false,
  },
  {
    id: '6',
    user: { name: 'AgriMart', avatar: '🌾', verified: true, handle: '@agrimart' },
    content: 'Harvest season is here! 🌾 Fresh yams, cassava, and plantains available in bulk. Farmers, connect with us for wholesale pricing.',
    media: { type: 'image', url: '/feed/harvest.jpg' },
    likes: 234, comments: 19, shares: 8, timestamp: '1d ago', liked: false, saved: false,
    product: { name: 'Yam Tubers (50kg)', price: '₦18,000', href: '/products/8' },
  },
];

const reels = [
  { id: 'r1', thumbnail: '🍳', user: 'Chef Amara', views: '12.5K', caption: 'Quick breakfast hack! #cooking' },
  { id: 'r2', thumbnail: '👗', user: 'StyleBox', views: '8.2K', caption: 'Outfit of the day #fashion' },
  { id: 'r3', thumbnail: '📱', user: 'TechHub', views: '15.1K', caption: 'Gadget review #tech' },
  { id: 'r4', thumbnail: '🥬', user: 'FreshFarms', views: '5.7K', caption: 'Farm tour #organic' },
  { id: 'r5', thumbnail: '💪', user: 'FitLife', views: '9.3K', caption: 'Home workout #fitness' },
  { id: 'r6', thumbnail: '🎨', user: 'ArtisanNG', views: '6.8K', caption: 'Making pottery #craft' },
  { id: 'r7', thumbnail: '🚚', user: 'LogiPro', views: '3.4K', caption: 'Day in the life #logistics' },
  { id: 'r8', thumbnail: '🍰', user: 'BakeHouse', views: '11.2K', caption: 'Cake decorating #baking' },
  { id: 'r9', thumbnail: '🌿', user: 'GreenLife', views: '4.1K', caption: 'Plant care tips #garden' },
];

const trendingProducts = [
  { id: 'p1', name: 'Organic Honey', price: '₦4,500', image: '🍯', vendor: 'FreshFarms', sales: '500+' },
  { id: 'p2', name: 'Wireless Earbuds', price: '₦12,000', image: '🎧', vendor: 'TechHub', sales: '1.2K' },
  { id: 'p3', name: 'Ankara Dress', price: '₦8,500', image: '👗', vendor: 'StyleBox', sales: '300+' },
  { id: 'p4', name: 'Smart Watch', price: '₦25,000', image: '⌚', vendor: 'TechHub', sales: '800+' },
  { id: 'p5', name: 'Vitamin C Serum', price: '₦6,800', image: '🧴', vendor: 'HealthFirst', sales: '650+' },
  { id: 'p6', name: 'Running Shoes', price: '₦18,000', image: '👟', vendor: 'SportZone', sales: '420+' },
];

function FeedCard({ post }: { post: FeedPost }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <motion.div
      className="bg-white dark:bg-card-dark rounded-2xl shadow-soft overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">
          {post.user.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm">{post.user.name}</span>
            {post.user.verified && <span className="text-sky text-xs">✓</span>}
          </div>
          <span className="text-xs text-gray-500">{post.user.handle} · {post.timestamp}</span>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors" aria-label="More options">
          <MoreHorizontal size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <p className="px-4 text-sm leading-relaxed mb-3">{post.content}</p>

      {/* Media */}
      {post.media && (
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
          <span className="text-6xl">{post.user.avatar}</span>
          {(post.media.type === 'video' || post.media.type === 'reel') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </div>
          )}
          {post.media.type === 'reel' && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm flex items-center gap-1">
              <Film size={12} className="text-white" />
              <span className="text-[10px] text-white font-medium">Reel</span>
            </div>
          )}
        </div>
      )}

      {/* Product tag */}
      {post.product && (
        <Link href={post.product.href} className="mx-4 mt-3 flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ShoppingBag size={16} className="text-primary" />
          <div className="flex-1">
            <span className="text-sm font-medium">{post.product.name}</span>
            <span className="text-xs text-gray-500 ml-2">{post.product.price}</span>
          </div>
          <span className="text-xs text-primary font-medium">View →</span>
        </Link>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setLiked(!liked); setLikeCount(liked ? likeCount - 1 : likeCount + 1); }}
            className="flex items-center gap-1.5 group"
            aria-label="Like"
          >
            <Heart size={20} className={`transition-all ${liked ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-600 group-hover:text-red-400'}`} />
            <span className="text-xs font-medium text-gray-600">{likeCount > 999 ? `${(likeCount/1000).toFixed(1)}K` : likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5 group" aria-label="Comment">
            <MessageCircle size={20} className="text-gray-600 group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium text-gray-600">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 group" aria-label="Share">
            <Share2 size={18} className="text-gray-600 group-hover:text-accent transition-colors" />
            <span className="text-xs font-medium text-gray-600">{post.shares}</span>
          </button>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          aria-label="Save"
        >
          <Bookmark size={20} className={`transition-all ${saved ? 'text-secondary fill-secondary' : 'text-gray-600 hover:text-secondary'}`} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<TabType>('feeds');

  const tabs = [
    { id: 'feeds' as TabType, label: 'Feeds', icon: Grid3X3 },
    { id: 'reels' as TabType, label: 'Reels', icon: Film },
    { id: 'products' as TabType, label: 'Products', icon: ShoppingBag },
    { id: 'trending' as TabType, label: 'Trending', icon: TrendingUp },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <Navbar />

      <div className="pt-20 max-w-2xl mx-auto px-4">
        {/* Tabs */}
        <div className="sticky top-16 z-20 bg-gray-50/80 dark:bg-surface-dark/80 backdrop-blur-lg py-3 -mx-4 px-4">
          <div className="flex gap-1 p-1 rounded-2xl bg-white dark:bg-card-dark shadow-soft">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Create Post Button */}
        <motion.button
          className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-neon flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Create post"
        >
          <Plus size={24} />
        </motion.button>

        <AnimatePresence mode="wait">
          {/* Feeds Tab */}
          {activeTab === 'feeds' && (
            <motion.div
              key="feeds"
              className="space-y-4 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Stories/Reels row */}
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-dashed border-primary/40 flex items-center justify-center">
                    <Plus size={20} className="text-primary" />
                  </div>
                  <span className="text-[10px] text-gray-500">Your Story</span>
                </div>
                {feedPosts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-secondary via-error to-accent">
                      <div className="w-full h-full rounded-full bg-white dark:bg-card-dark flex items-center justify-center text-xl">
                        {post.user.avatar}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 max-w-[60px] truncate">{post.user.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>

              {/* Feed posts */}
              {feedPosts.map((post) => (
                <FeedCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}

          {/* Reels Tab - TikTok style grid */}
          {activeTab === 'reels' && (
            <motion.div
              key="reels"
              className="py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden">
                {reels.map((reel, i) => (
                  <motion.div
                    key={reel.id}
                    className="relative aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center cursor-pointer group overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{reel.thumbnail}</span>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={24} className="text-white" fill="white" />
                    </div>
                    {/* Info */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-[10px] font-medium truncate">{reel.caption}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-white/70 text-[9px]">@{reel.user}</span>
                        <span className="text-white/70 text-[9px] flex items-center gap-0.5"><Play size={8} fill="white" /> {reel.views}</span>
                      </div>
                    </div>
                    {/* Music indicator */}
                    <div className="absolute top-2 right-2">
                      <Music2 size={12} className="text-white/70" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Products Tab - Grid view */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              className="py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {trendingProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/products/${i + 1}`} className="block rounded-2xl bg-white dark:bg-card-dark shadow-soft overflow-hidden group hover:shadow-glow transition-all">
                      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm truncate">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.vendor}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-heading font-bold text-primary text-sm">{product.price}</span>
                          <span className="text-[10px] text-gray-400">{product.sales} sold</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Trending Tab */}
          {activeTab === 'trending' && (
            <motion.div
              key="trending"
              className="py-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-2xl bg-white dark:bg-card-dark shadow-soft p-4">
                <h3 className="font-heading font-bold mb-3 flex items-center gap-2"><TrendingUp size={18} className="text-accent" /> Trending Now</h3>
                {['#FreshProduce', '#NigerianFashion', '#TechDeals', '#HealthyLiving', '#FarmToTable'].map((tag, i) => (
                  <div key={tag} className="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <span className="text-xs text-gray-400 w-5">{i + 1}</span>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-primary">{tag}</span>
                      <p className="text-xs text-gray-500">{Math.floor(Math.random() * 5000 + 1000)} posts</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-white dark:bg-card-dark shadow-soft p-4">
                <h3 className="font-heading font-bold mb-3">Top Creators</h3>
                {feedPosts.slice(0, 4).map((post) => (
                  <div key={post.id} className="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">
                      {post.user.avatar}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium">{post.user.name}</span>
                      <p className="text-xs text-gray-500">{post.user.handle}</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

