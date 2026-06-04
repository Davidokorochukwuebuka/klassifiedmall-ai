'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getCart, updateCartItem, removeFromCart } from '@/lib/api';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    setIsLoading(true);
    try {
      const res = await getCart();
      const cartData = res.data || res;
      setItems(cartData.items || []);
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateQty(item: any, delta: number) {
    const newQty = Math.max(0, (item.quantity || item.qty || 1) + delta);
    const productId = item.productId || item.id;
    setUpdating(productId);
    try {
      if (newQty === 0) {
        await removeFromCart(item.itemId, productId);
      } else {
        await updateCartItem(productId, newQty);
      }
      await loadCart();
    } catch (err) {
      console.error('Failed to update cart:', err);
    } finally {
      setUpdating(null);
    }
  }

  async function handleRemove(item: any) {
    const productId = item.productId || item.id;
    setUpdating(productId);
    try {
      await removeFromCart(item.itemId, productId);
      await loadCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
    } finally {
      setUpdating(null);
    }
  }

  const total = items.reduce((s: number, i: any) => s + (i.unitPrice || i.price || 0) * (i.quantity || i.qty || 1), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><ShoppingBag size={24} /> Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/products" className="btn-primary inline-block">Browse Products</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item: any, i: number) => {
              const price = item.unitPrice || item.price || 0;
              const qty = item.quantity || item.qty || 1;
              const productId = item.productId || item.id;
              return (
                <motion.div key={item.itemId || productId || i} className="flex gap-4 p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl shrink-0">
                    {item.imageUrl || item.image || '📦'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.title || item.name}</h3>
                    <p className="text-xs text-gray-500">{item.vendorId || item.vendor || ''}</p>
                    <p className="font-heading font-bold text-primary mt-1">₦{price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => handleRemove(item)} disabled={updating === productId} className="text-gray-400 hover:text-error disabled:opacity-50" aria-label="Remove">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2 border rounded-btn px-2 py-1">
                      <button onClick={() => handleUpdateQty(item, -1)} disabled={updating === productId} aria-label="Decrease"><Minus size={14} /></button>
                      <span className="text-sm font-medium w-5 text-center">{qty}</span>
                      <button onClick={() => handleUpdateQty(item, 1)} disabled={updating === productId} aria-label="Increase"><Plus size={14} /></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5 h-fit sticky top-20">
            <h2 className="font-heading font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal ({items.length} items)</span><span>₦{total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span>₦1,500</span></div>
              <div className="border-t pt-2 flex justify-between font-heading font-bold text-lg"><span>Total</span><span>₦{(total + 1500).toLocaleString()}</span></div>
            </div>
            <Link href="/checkout" className="btn-primary w-full mt-4 block text-center">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}

