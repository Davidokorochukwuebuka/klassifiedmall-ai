'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ArrowLeft, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const categoryData: Record<string, { name: string; icon: string; color: string }> = {
  food: { name: 'Food & Groceries', icon: '🥬', color: '#10B981' },
  electronics: { name: 'Electronics', icon: '📱', color: '#3B82F6' },
  fashion: { name: 'Fashion & Style', icon: '👗', color: '#8B5CF6' },
  health: { name: 'Health & Beauty', icon: '🧴', color: '#EC4899' },
  services: { name: 'Services', icon: '🔧', color: '#F59E0B' },
  courses: { name: 'Courses & Learning', icon: '🎓', color: '#6366F1' },
  logistics: { name: 'Logistics', icon: '🚚', color: '#14B8A6' },
  agriculture: { name: 'Agriculture', icon: '🌾', color: '#84CC16' },
  home: { name: 'Home & Living', icon: '🏠', color: '#F97316' },
  automotive: { name: 'Automotive', icon: '🚗', color: '#EF4444' },
  sports: { name: 'Sports & Fitness', icon: '⚽', color: '#06B6D4' },
  books: { name: 'Books & Media', icon: '📚', color: '#A855F7' },
};

const allProducts = [
  { id: '1', name: 'Organic Honey', price: 4500, vendor: 'FreshFarms', image: '🍯', rating: 4.9 },
  { id: '2', name: 'Jollof Rice Pack', price: 3200, vendor: 'Chef Amara', image: '🍚', rating: 4.6 },
  { id: '3', name: 'Dried Catfish', price: 5500, vendor: 'FreshFarms', image: '🐟', rating: 4.5 },
  { id: '4', name: 'Palm Oil (5L)', price: 7800, vendor: 'FreshFarms', image: '🫒', rating: 4.3 },
  { id: '5', name: 'Suya Spice Mix', price: 1500, vendor: 'SpiceKing', image: '🌶️', rating: 4.7 },
  { id: '6', name: 'Chin Chin Pack', price: 2000, vendor: 'Chef Amara', image: '🍪', rating: 4.4 },
  { id: '7', name: 'Fresh Tomatoes (basket)', price: 3500, vendor: 'FreshFarms', image: '🍅', rating: 4.8 },
  { id: '8', name: 'Garri (50kg)', price: 18000, vendor: 'AgriMart', image: '🌾', rating: 4.2 },
  { id: '9', name: 'Plantain Chips', price: 1200, vendor: 'Chef Amara', image: '🍌', rating: 4.6 },
  { id: '10', name: 'Egusi Seeds (2kg)', price: 4200, vendor: 'FreshFarms', image: '🫘', rating: 4.5 },
  { id: '11', name: 'Smoked Fish', price: 6500, vendor: 'FreshFarms', image: '🐠', rating: 4.7 },
  { id: '12', name: 'Yam Flour', price: 2800, vendor: 'AgriMart', image: '🥔', rating: 4.3 },
];

const subcategories = ['All', 'Fresh Produce', 'Packaged', 'Spices', 'Grains', 'Protein', 'Snacks'];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categoryData[slug] || { name: slug, icon: '📦', color: '#6B7280' };
  const [activeSubcat, setActiveSubcat] = useState('All');
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <Navbar />

      {/* Category Header */}
      <section
        className="pt-24 pb-8 px-4 sm:px-6 lg:px-8"
        style={{ background: `linear-gradient(135deg, ${category.color}22, ${category.color}08)` }}
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary mb-4">
            <ArrowLeft size={14} /> All Categories
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${category.color}20` }}
            >
              {category.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold">{category.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{allProducts.length} products available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategory Scrollable Chips */}
      <section className="sticky top-16 z-20 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-min">
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcat(sub)}
                  className={`px-4 py-2 rounded-pill text-sm whitespace-nowrap transition-all ${
                    activeSubcat === sub
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 dark:bg-card-dark text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Sort</span>
              <ChevronDown size={12} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-card-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                {['Newest', 'Price: Low-High', 'Price: High-Low', 'Rating', 'Popular'].map((opt) => (
                  <button key={opt} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5" onClick={() => setSortOpen(false)}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Scrollable Product Grid */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {allProducts.map((product, i) => (
              <motion.div
                key={product.id}
                className="group rounded-2xl bg-white dark:bg-card-dark shadow-soft overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-32 sm:h-36 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </span>
                    <button
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Add to wishlist"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart size={12} className="text-gray-600" />
                    </button>
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium text-sm truncate hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">{product.vendor}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={10} className="text-warning fill-warning" />
                    <span className="text-[10px] text-gray-500">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-heading font-bold text-primary text-sm">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <button
                      className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      aria-label="Add to cart"
                      onClick={(e) => e.preventDefault()}
                    >
                      <ShoppingCart size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-10">
            <button className="btn-outline inline-flex items-center gap-2 text-sm">
              Load More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
