'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Heart, ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getProducts, addToCart } from '@/lib/api';

const categories = ['All', 'Fresh Produce', 'Groceries', 'Fashion', 'Beauty', 'Electronics', 'Food', 'Health'];

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    loadProducts();
  }, [cat]);

  async function loadProducts() {
    setIsLoading(true);
    try {
      const res = await getProducts({ category: cat === 'All' ? undefined : cat, search: query || undefined });
      setProducts(res.data?.products || res.products || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    await loadProducts();
  }

  async function handleAddToCart(product: any) {
    setAddingToCart(product.productId || product.id);
    try {
      await addToCart({
        productId: product.productId || product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        seller: product.vendorName || product.vendor,
        image: product.image || '',
      });
      setCartMessage(`${product.name} added to cart!`);
      setTimeout(() => setCartMessage(''), 3000);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setAddingToCart(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <h1 className="text-2xl font-heading font-bold">Products</h1>

        {/* Cart notification */}
        {cartMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 right-4 z-50 bg-accent text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium"
          >
            ✓ {cartMessage}
          </motion.div>
        )}

        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <button type="submit" className="px-4 py-3 rounded-btn bg-primary text-white text-sm font-medium">Search</button>
        </form>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-pill text-sm whitespace-nowrap transition-all ${cat === c ? 'bg-primary text-white' : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>{c}</button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p: any, i: number) => (
              <motion.div key={p.productId || p.id || i} className="group rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} whileHover={{ y: -4 }}>
                <Link href={`/products/${p.productId || p.id}`}>
                  <div className="relative h-36 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl">
                    {p.image || '📦'}
                    <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Wishlist" onClick={(e) => e.preventDefault()}>
                      <Heart size={14} />
                    </button>
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/products/${p.productId || p.id}`}><h3 className="font-medium text-sm truncate hover:text-primary">{p.name}</h3></Link>
                  <p className="text-xs text-gray-500">{p.vendorName || p.vendor || 'Vendor'}</p>
                  {p.location && <p className="text-xs text-gray-400">{p.location}</p>}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-heading font-bold text-primary">₦{(p.price || 0).toLocaleString()}</span>
                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={addingToCart === (p.productId || p.id)}
                      className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
                      aria-label="Add to cart"
                    >
                      {addingToCart === (p.productId || p.id) ? <Loader2 size={12} className="animate-spin" /> : <ShoppingCart size={14} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

