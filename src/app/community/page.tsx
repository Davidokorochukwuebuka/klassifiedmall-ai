'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Send, Image as ImageIcon, Video, Smile, MoreHorizontal, Users, Globe, Lock, ThumbsUp, Repeat2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';

type ViewMode = 'feed' | 'groups' | 'forums';

interface CommunityPost {
  id: string;
  user: { name: string; avatar: string; role: string; verified: boolean };
  content: string;
  media?: string;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: string;
  group?: string;
  liked: boolean;
}

const communityPosts: CommunityPost[] = [
  {
    id: '1',
    user: { name: 'Adebayo Farms', avatar: '🌾', role: 'Farmer', verified: true },
    content: 'Just completed our first export shipment to the UK! 🇬🇧 Thanks to the KlASSIFIED community for all the support. If you\'re looking to export, feel free to DM me for tips!',
    likes: 156, comments: 34, reposts: 12, timestamp: '1h ago', liked: true,
    group: 'Exporters Network',
  },
  {
    id: '2',
    user: { name: 'Mama Nkechi', avatar: '👩‍🍳', role: 'Food Vendor', verified: false },
    content: 'Who else is preparing for the weekend rush? 😅 My suya spice mix is selling out faster than I can make it! Any tips on scaling production without losing quality?',
    media: '🌶️',
    likes: 89, comments: 45, reposts: 5, timestamp: '3h ago', liked: false,
    group: 'Food Vendors Hub',
  },
  {
    id: '3',
    user: { name: 'TechBro Lagos', avatar: '💻', role: 'Electronics Vendor', verified: true },
    content: 'PSA: New shipment of iPhone 15 cases arriving next week. Pre-order now to secure yours! Also, anyone interested in a bulk deal for phone accessories? Let\'s connect 🤝',
    likes: 234, comments: 67, reposts: 23, timestamp: '5h ago', liked: false,
  },
  {
    id: '4',
    user: { name: 'Green Logistics', avatar: '🚛', role: 'Logistics Provider', verified: true },
    content: 'We just expanded our fleet! Now offering same-day delivery across Lagos, Abuja, and Port Harcourt. Vendors, let\'s partner up! 🚀',
    media: '🚚',
    likes: 312, comments: 56, reposts: 34, timestamp: '8h ago', liked: true,
    group: 'Logistics Partners',
  },
  {
    id: '5',
    user: { name: 'Fashion Forward', avatar: '👗', role: 'Fashion Designer', verified: false },
    content: 'Behind the scenes of our new collection shoot! 📸 Every piece is handmade with love. Supporting local artisans one stitch at a time. #MadeInNigeria',
    media: '🎨',
    likes: 445, comments: 28, reposts: 19, timestamp: '12h ago', liked: false,
  },
  {
    id: '6',
    user: { name: 'Investor Circle', avatar: '📈', role: 'Investor', verified: true },
    content: 'Looking for promising agri-tech startups to invest in. If you have a business plan and are looking for seed funding (₦5M-₦20M), drop your pitch in the comments or DM me.',
    likes: 567, comments: 89, reposts: 45, timestamp: '1d ago', liked: false,
    group: 'Investors Hub',
  },
];

const groups = [
  { id: '1', name: 'Farmers Network', members: 2340, icon: '🌾', type: 'public' },
  { id: '2', name: 'Food Vendors Hub', members: 1890, icon: '🍲', type: 'public' },
  { id: '3', name: 'Exporters Network', members: 567, icon: '🌍', type: 'private' },
  { id: '4', name: 'Tech Sellers', members: 1234, icon: '📱', type: 'public' },
  { id: '5', name: 'Logistics Partners', members: 890, icon: '🚚', type: 'public' },
  { id: '6', name: 'Investors Hub', members: 345, icon: '📈', type: 'private' },
  { id: '7', name: 'Fashion Designers', members: 1567, icon: '👗', type: 'public' },
  { id: '8', name: 'Health & Wellness', members: 789, icon: '🧴', type: 'public' },
];

function PostCard({ post }: { post: CommunityPost }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <motion.div
      className="bg-white dark:bg-card-dark rounded-2xl shadow-soft overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Group tag */}
      {post.group && (
        <div className="px-4 pt-3 pb-0">
          <span className="text-[10px] px-2 py-0.5 rounded-lg bg-primary/10 text-primary font-medium">{post.group}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center text-xl shadow-sm">
          {post.user.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm">{post.user.name}</span>
            {post.user.verified && <span className="text-sky text-xs">✓</span>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-500">{post.user.role}</span>
            <span className="text-[11px] text-gray-400">· {post.timestamp}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full" aria-label="More">
          <MoreHorizontal size={18} className="text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <p className="px-4 text-sm leading-relaxed mb-3">{post.content}</p>

      {/* Media */}
      {post.media && (
        <div className="mx-4 mb-3 aspect-video rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
          <span className="text-5xl">{post.media}</span>
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 dark:border-gray-800">
        <span>{likeCount} likes</span>
        <span>{post.comments} comments · {post.reposts} reposts</span>
      </div>

      {/* Actions - Facebook/LinkedIn style */}
      <div className="flex items-center border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => { setLiked(!liked); setLikeCount(liked ? likeCount - 1 : likeCount + 1); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${liked ? 'text-primary' : 'text-gray-600 hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5'}`}
        >
          <ThumbsUp size={18} className={liked ? 'fill-primary' : ''} />
          <span className="hidden sm:inline">Like</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
          <MessageCircle size={18} />
          <span className="hidden sm:inline">Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 hover:text-accent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
          <Repeat2 size={18} />
          <span className="hidden sm:inline">Repost</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 hover:text-secondary hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
          <Send size={18} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function CommunityPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('feed');
  const [postText, setPostText] = useState('');

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-surface-dark">
      <Navbar />

      <div className="pt-20 max-w-2xl mx-auto px-4 pb-24">
        {/* View Mode Tabs */}
        <div className="sticky top-16 z-20 bg-gray-100/80 dark:bg-surface-dark/80 backdrop-blur-lg py-3 -mx-4 px-4">
          <div className="flex gap-1 p-1 rounded-2xl bg-white dark:bg-card-dark shadow-soft">
            {[
              { id: 'feed' as ViewMode, label: 'Feed' },
              { id: 'groups' as ViewMode, label: 'Groups' },
              { id: 'forums' as ViewMode, label: 'Forums' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  viewMode === tab.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Feed View */}
          {viewMode === 'feed' && (
            <motion.div
              key="feed"
              className="space-y-4 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Create Post */}
              <div className="bg-white dark:bg-card-dark rounded-2xl shadow-soft p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder="Share something with the community..."
                      className="w-full resize-none border-0 bg-transparent text-sm focus:outline-none placeholder-gray-400 min-h-[60px]"
                      rows={2}
                    />
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Add image">
                          <ImageIcon size={18} className="text-accent" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Add video">
                          <Video size={18} className="text-primary" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Add emoji">
                          <Smile size={18} className="text-secondary" />
                        </button>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          postText.trim()
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!postText.trim()}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts */}
              {communityPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}

          {/* Groups View */}
          {viewMode === 'groups' && (
            <motion.div
              key="groups"
              className="py-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Your Groups */}
              <div className="bg-white dark:bg-card-dark rounded-2xl shadow-soft p-4">
                <h3 className="font-heading font-bold mb-3">Your Groups</h3>
                <div className="grid grid-cols-2 gap-3">
                  {groups.slice(0, 4).map((group, i) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/community/groups/${group.id}`}
                        className="block p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-soft transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{group.icon}</span>
                          {group.type === 'private' ? <Lock size={10} className="text-gray-400" /> : <Globe size={10} className="text-gray-400" />}
                        </div>
                        <h4 className="text-sm font-medium truncate">{group.name}</h4>
                        <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Users size={9} /> {group.members.toLocaleString()} members
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Discover Groups */}
              <div className="bg-white dark:bg-card-dark rounded-2xl shadow-soft p-4">
                <h3 className="font-heading font-bold mb-3">Discover Groups</h3>
                {groups.slice(4).map((group, i) => (
                  <motion.div
                    key={group.id}
                    className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xl">
                      {group.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{group.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        {group.type === 'private' ? <Lock size={9} /> : <Globe size={9} />}
                        {group.members.toLocaleString()} members
                      </p>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors">
                      Join
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Forums View */}
          {viewMode === 'forums' && (
            <motion.div
              key="forums"
              className="py-4 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Link href="/community/forums" className="block">
                {[
                  { title: 'Best practices for exporting produce', replies: 34, views: 567, author: 'Adebayo', hot: true },
                  { title: 'How to price your products competitively', replies: 23, views: 345, author: 'TechBro', hot: true },
                  { title: 'Logistics challenges in rural areas', replies: 45, views: 890, author: 'GreenLogistics', hot: false },
                  { title: 'Tips for new vendors on the platform', replies: 67, views: 1234, author: 'Admin', hot: true },
                  { title: 'Seasonal pricing strategies', replies: 12, views: 234, author: 'FashionFwd', hot: false },
                ].map((thread, i) => (
                  <motion.div
                    key={i}
                    className="bg-white dark:bg-card-dark rounded-2xl shadow-soft p-4 hover:shadow-glow transition-all cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {thread.hot && <span className="text-[10px] px-1.5 py-0.5 rounded bg-error/10 text-error font-medium">🔥 Hot</span>}
                          <h3 className="text-sm font-medium">{thread.title}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>by {thread.author}</span>
                          <span>{thread.replies} replies</span>
                          <span>{thread.views} views</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

