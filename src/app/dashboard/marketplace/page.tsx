'use client';

import { useState, useEffect } from 'react';
import { getProducts, addToCart, removeFromCart } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  seller: string;
  location: string;
  rating: number;
  image: string;
  inStock: boolean;
  description: string;
  reviews: number;
}

const categories = ['All', 'Vegetables', 'Grains', 'Spices', 'Oils', 'Tubers', 'Seafood', 'Nuts', 'Fruits', 'Export', 'Processed', 'Beverages', 'Health', 'Livestock'];

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [showCartAlert, setShowCartAlert] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      if (cartIds.includes(product.id)) {
        await removeFromCart(undefined, product.id);
        setCartIds(cartIds.filter((id) => id !== product.id));
        setShowCartAlert(`${product.name} removed from cart`);
      } else {
        await addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          unit: product.unit,
          seller: product.seller,
          image: product.image,
        });
        setCartIds([...cartIds, product.id]);
        setShowCartAlert(`${product.name} added to cart!`);
      }
      setTimeout(() => setShowCartAlert(''), 2500);
    } catch (err) {
      console.error('Cart error:', err);
    }
  };

  const formatPrice = (price: number) => {
    return '₦' + price.toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Cart Alert */}
      {showCartAlert && (
        <div className="fixed top-20 right-4 sm:right-6 bg-green-700 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse text-sm">
          {showCartAlert}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-sm text-gray-500 mt-1">Browse fresh produce from verified vendors across Nigeria</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2 text-sm min-h-[44px]">
            🛒 Cart ({cartIds.length})
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card !p-4 sm:!p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search products or sellers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field flex-1"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field sm:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Category Pills - scrollable on mobile */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap min-h-[36px] ${
                selectedCategory === cat
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-24 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="card !p-4 hover:shadow-md transition-shadow">
              {/* Product Image Placeholder */}
              <div className="text-center text-4xl sm:text-5xl py-4 sm:py-6 bg-gray-50 rounded-lg mb-3">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">{product.name}</h3>
                  {!product.inStock && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full whitespace-nowrap">Out of stock</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{product.seller} • {product.location}</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-xs sm:text-sm text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400 ml-1">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <span className="text-base sm:text-lg font-bold text-green-800">{formatPrice(product.price)}</span>
                    <span className="text-xs text-gray-500 ml-1">{product.unit}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[44px] min-w-[44px] ${
                      !product.inStock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : cartIds.includes(product.id)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-700 text-white hover:bg-green-800'
                    }`}
                  >
                    {cartIds.includes(product.id) ? 'Remove' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <span className="text-4xl">🔍</span>
          <p className="text-gray-500 mt-4">No products found matching your criteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="btn-secondary mt-4 min-h-[44px]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
