'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowRight, Zap, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface GridItem {
  id: string;
  type: 'product' | 'vendor' | 'promo' | 'category' | 'deal';
  title: string;
  subtitle?: string;
  price?: string;
  image: string;
  imageUrl?: string;
  badge?: string;
  rating?: number;
  href: string;
  span: 'normal' | 'tall' | 'wide' | 'featured';
  gradient?: string;
}

const gridItems: GridItem[] = [
  {
    id: '1', type: 'promo', title: 'Flash Deals', subtitle: 'Up to 50% off fresh produce',
    image: '⚡', href: '/products?deal=flash', span: 'wide',
    gradient: 'from-orange-500 via-red-500 to-pink-600', badge: 'Limited Time',
  },
  {
    id: '2', type: 'product', title: 'Organic Honey', subtitle: 'FreshFarms',
    price: '₦4,500', image: '🍯', href: '/products/1', span: 'normal', rating: 4.9,
  },
  {
    id: '3', type: 'category', title: 'Fresh Fruits',
    subtitle: 'Farm fresh daily',
    image: '',
    imageUrl: 'https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/Fruits__1_-removebg-preview.png',
    href: '/categories/fresh-fruits', span: 'tall',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
  },
  {
    id: '4', type: 'product', title: 'Smart Watch Pro', subtitle: 'TechHub Lagos',
    price: '₦25,000', image: '⌚', href: '/products/6', span: 'normal', rating: 4.9,
    badge: 'Best Seller',
  },
  {
    id: '5', type: 'vendor', title: 'Chef Amara', subtitle: 'Top Rated Food Vendor',
    image: '👨‍🍳', href: '/vendors/3', span: 'normal', rating: 4.7, badge: 'Premium',
  },
  {
    id: '6', type: 'deal', title: 'Logistics & Delivery', subtitle: 'Bike, Van, Truck — Book now',
    image: '',
    imageUrl: 'https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/logistics%20group.png',
    href: '/hail', span: 'wide',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
  },
  {
    id: '7', type: 'product', title: 'Ankara Dress', subtitle: 'StyleBox',
    price: '₦8,500', image: '👗', href: '/products/3', span: 'normal', rating: 4.7,
  },
  {
    id: '8', type: 'category', title: 'Protein',
    subtitle: 'Fresh meat & fish',
    image: '',
    imageUrl: 'https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/Protein-min-scaled-1-removebg-preview.png',
    href: '/categories/protein', span: 'normal',
    gradient: 'from-red-400 via-rose-500 to-pink-600',
  },
  {
    id: '9', type: 'product', title: 'Wireless Earbuds', subtitle: 'TechHub',
    price: '₦12,000', image: '🎧', href: '/products/2', span: 'normal', rating: 4.8,
  },
  {
    id: '10', type: 'category', title: 'Packaged Foods',
    subtitle: 'Beverages & Drinks',
    image: '',
    imageUrl: 'https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/soft-drinks-removebg-preview.png',
    href: '/categories/packaged-foods', span: 'tall',
    gradient: 'from-blue-400 via-indigo-500 to-purple-600',
  },
  {
    id: '11', type: 'product', title: 'Running Shoes', subtitle: 'SportZone',
    price: '₦18,000', image: '👟', href: '/products/7', span: 'normal', rating: 4.4,
  },
  {
    id: '12', type: 'promo', title: 'Start Selling Today', subtitle: 'Zero setup fees — AMI-powered store builder',
    image: '🏪', href: '/auth/signup?type=vendor', span: 'wide',
    gradient: 'from-[#D4A017] via-[#E6B422] to-[#F59E0B]',
  },
];

function ProductCard({ item, index }: { item: GridItem; index: number }) {
  return (
    <motion.div
      className="group relative rounded-2xl bg-white dark:bg-card-dark shadow-soft overflow-hidden cursor-pointer hover:shadow-3d transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -6, rotateX: 2 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Link href={item.href} className="block">
        <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,_rgba(110,193,228,0.2)_0%,_transparent_50%)]" />
          <span className="text-5xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 drop-shadow-lg">{item.image}</span>
          {item.badge && (
            <span className="absolute top-2 left-2 px-2.5 py-1 rounded-xl bg-gradient-to-r from-secondary to-gold-dark text-white text-[10px] font-bold uppercase shadow-md">
              {item.badge}
            </span>
          )}
          <button
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-md"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={14} className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        <div className="p-3.5">
          <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.subtitle}</p>
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-2">
              {item.price && <span className="font-heading font-bold text-primary text-sm">{item.price}</span>}
              {item.rating && (
                <span className="flex items-center gap-0.5 text-xs text-gray-500">
                  <Star size={10} className="text-warning fill-warning" /> {item.rating}
                </span>
              )}
            </div>
            <button
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center hover:from-primary hover:to-accent hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Add to cart"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart size={13} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function PromoCard({ item, index }: { item: GridItem; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-3d h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <Link href={item.href} className="block h-full">
        <div className={`relative h-full min-h-[150px] bg-gradient-to-br ${item.gradient} p-5 flex items-center`}>
          {/* Animated shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="flex-1 relative z-10">
            {item.badge && (
              <span className="inline-block px-2.5 py-1 rounded-xl bg-white/20 text-white text-[10px] font-bold uppercase backdrop-blur-sm mb-2">
                {item.badge}
              </span>
            )}
            <h3 className="text-white font-heading font-bold text-lg sm:text-xl drop-shadow-md">{item.title}</h3>
            <p className="text-white/80 text-sm mt-1">{item.subtitle}</p>
            <div className="flex items-center gap-1 mt-3 text-white/90 text-sm font-medium group-hover:gap-2 transition-all">
              Shop Now <ArrowRight size={14} />
            </div>
          </div>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
            {item.imageUrl ? (
              <Image src={item.imageUrl} alt={item.title} fill className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500" sizes="96px" unoptimized />
            ) : (
              <span className="text-5xl sm:text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg block text-center leading-[80px] sm:leading-[96px]">
                {item.image}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CategoryCard({ item, index }: { item: GridItem; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-3d h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -4 }}
    >
      <Link href={item.href} className="block h-full">
        <div className={`relative h-full min-h-[180px] bg-gradient-to-br ${item.gradient} p-5 flex flex-col justify-between`}>
          {/* Animated shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <h3 className="text-white font-heading font-bold text-lg drop-shadow-md">{item.title}</h3>
            <p className="text-white/70 text-xs mt-0.5">{item.subtitle}</p>
          </div>
          <div className="relative w-24 h-24 self-end -mr-2 -mb-2">
            {item.imageUrl ? (
              <Image src={item.imageUrl} alt={item.title} fill className="object-contain drop-shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" sizes="96px" unoptimized />
            ) : (
              <span className="text-5xl drop-shadow-lg">{item.image}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function VendorCard({ item, index }: { item: GridItem; index: number }) {
  return (
    <motion.div
      className="group relative rounded-2xl bg-white dark:bg-card-dark shadow-soft overflow-hidden cursor-pointer hover:shadow-glow transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Link href={item.href} className="block p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
            {item.image}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-sm truncate">{item.title}</h3>
              {item.badge && <Zap size={12} className="text-secondary flex-shrink-0" />}
            </div>
            <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
            {item.rating && (
              <div className="flex items-center gap-1 mt-1">
                <Star size={10} className="text-warning fill-warning" />
                <span className="text-xs text-gray-600">{item.rating}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SurfableGrid() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-[#0c1222] dark:via-surface-dark dark:to-[#0c1222]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-bold flex items-center gap-2">
              <Sparkles size={24} className="text-secondary" />
              Discover
            </h2>
            <p className="text-sm text-gray-500 mt-1">Curated picks, deals, and trending items</p>
          </motion.div>
          <Link href="/products" className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1 group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento / Surfable Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" style={{ gridAutoRows: 'minmax(200px, auto)' }}>
          {gridItems.map((item, i) => {
            const spanClass =
              item.span === 'wide' ? 'col-span-2 min-h-[150px]' :
              item.span === 'tall' ? 'row-span-2 min-h-[420px]' :
              item.span === 'featured' ? 'col-span-2 row-span-2 min-h-[420px]' :
              'min-h-[200px]';

            return (
              <div key={item.id} className={`${spanClass} h-full`}>
                {item.type === 'product' && <ProductCard item={item} index={i} />}
                {(item.type === 'promo' || item.type === 'deal') && <PromoCard item={item} index={i} />}
                {item.type === 'category' && <CategoryCard item={item} index={i} />}
                {item.type === 'vendor' && <VendorCard item={item} index={i} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
