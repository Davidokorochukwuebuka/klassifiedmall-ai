'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Heart, Star, ArrowRight, Filter, X } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const categories = [
  { slug: 'food', name: 'Food & Groceries', icon: '🥬', color: '#10B981', count: 245 },
  { slug: 'electronics', name: 'Electronics', icon: '📱', color: '#3B82F6', count: 189 },
  { slug: 'fashion', name: 'Fashion & Style', icon: '👗', color: '#8B5CF6', count: 312 },
  { slug: 'health', name: 'Health & Beauty', icon: '🧴', color: '#EC4899', count: 156 },
  { slug: 'services', name: 'Services', icon: '🔧', color: '#F59E0B', count: 98 },
  { slug: 'courses', name: 'Courses & Learning', icon: '🎓', color: '#6366F1', count: 67 },
  { slug: 'logistics', name: 'Logistics', icon: '🚚', color: '#14B8A6', count: 45 },
  { slug: 'agriculture', name: 'Agriculture', icon: '🌾', color: '#84CC16', count: 134 },
  { slug: 'home', name: 'Home & Living', icon: '🏠', color: '#F97316', count: 201 },
  { slug: 'automotive', name: 'Automotive', icon: '🚗', color: '#EF4444', count: 78 },
  { slug: 'sports', name: 'Sports & Fitness', icon: '⚽', color: '#06B6D4', count: 92 },
  { slug: 'books', name: 'Books & Media', icon: '📚', color: '#A855F7', count: 156 },
];

const featuredProducts = [
  { id: '1', name: 'Organic Honey', price: 4500, vendor: 'FreshFarms', category: 'food', image: '🍯', rating: 4.9 },
  { id: '2', name: 'Wireless Earbuds', price: 12000, vendor: 'TechHub', category: 'electronics', image: '🎧', rating: 4.8 },
  { id: '3', name: 'Ankara Dress', price: 8500, vendor: 'StyleBox', category: 'fashion', image: '👗', rating: 4.7 },
  { id: '4', name: 'Jollof Rice Pack', price: 3200, vendor: 'Chef Amara', category: 'food', image: '🍚', rating: 4.6 },
  { id: '5', name: 'Vitamin C Serum', price: 6800, vendor: 'HealthFirst', category: 'health', image: '🧴', rating: 4.5 },
  { id: '6', name: 'Smart Watch', price: 25000, vendor: 'TechHub', category: 'electronics', image: '⌚', rating: 4.9 },
  { id: '7', name: 'Running Shoes', price: 18000, vendor: 'SportZone', category: 'sports', image: '👟', rating: 4.4 },
  { id: '8', name: 'Bluetooth Speaker', price: 15000, vendor: 'TechHub', category: 'electronics', image: '🔊', rating: 4.7 },
  { id: '9', name: 'Palm Oil (5L)', price: 7800, vendor: 'FreshFarms', category: 'food', image: '🫒', rating: 4.3 },
  { id: '10', name: 'Laptop Stand', price: 9500, vendor: 'TechHub', category: 'electronics', image: '💻', rating: 4.6 },
  { id: '11', name: 'Shea Butter', price: 3500, vendor: 'HealthFirst', category: 'health', image: '🧈', rating: 4.8 },
  { id: '12', name: 'Agbada Set', price: 35000, vendor: 'StyleBox', category: 'fashion', image: '👔', rating: 4.9 },
  { id: '13', name: 'Rice (50kg)', price: 42000, vendor: 'FreshFarms', category: 'agriculture', image: '🌾', rating: 4.5 },
  { id: '14', name: 'Solar Panel', price: 85000, vendor: 'GreenTech', category: 'home', image: '☀️', rating: 4.7 },
  { id: '15', name: 'Fitness Band', price: 8000, vendor: 'SportZone', category: 'sports', image: '⌚', rating: 4.3 },
  { id: '16', name: 'Dried Catfish', price: 5500, vendor: 'FreshFarms', category: 'food', image: '🐟', rating: 4.6 },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = featuredProducts.filter((p) => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary-dark to-[#0f172a]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Categories
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Browse thousands of products across all categories
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-lg mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, vendors, categories..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white/15 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* Scrollable Category Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-bold">Categories</h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
              >
                <X size={14} /> Clear filter
              </button>
            )}
          </div>

          {/* Scrollable Grid of Categories */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="grid grid-flow-col auto-cols-[140px] sm:auto-cols-[160px] gap-3 min-w-min">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center ${
                    selectedCategory === cat.slug
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark hover:border-primary/50 hover:shadow-soft'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${cat.color}15` }}
                  >
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-gray-500">{cat.count} items</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold">
                {selectedCategory
                  ? categories.find((c) => c.slug === selectedCategory)?.name || 'Products'
                  : 'All Products'}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">{filteredProducts.length} products found</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <Filter size={14} /> Sort
            </button>
          </div>

          {/* Scrollable Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                className="group rounded-2xl bg-white dark:bg-card-dark shadow-soft overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                whileHover={{ y: -4 }}
                layout
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
                    >
                      <ShoppingCart size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-10">
              <button className="btn-outline inline-flex items-center gap-2">
                Load More Products <ArrowRight size={16} />
              </button>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🔍</span>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No products found</h3>
              <p className="text-sm text-gray-500 mt-1">Try a different category or search term</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

