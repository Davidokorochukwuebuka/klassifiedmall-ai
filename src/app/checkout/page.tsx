'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { checkout, initializePayment } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const steps = ['Delivery', 'Payment', 'Confirm'];

  // Form state
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('paystack_card');

  async function handlePlaceOrder() {
    if (!address.fullName || !address.street || !address.city || !address.phone) {
      setError('Please fill in all delivery details');
      setStep(0);
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const res = await checkout({
        shippingAddress: `${address.fullName}, ${address.street}, ${address.city}, ${address.state}. Phone: ${address.phone}`,
        paymentMethod,
      });

      if (res.success || res.data) {
        const orderData = res.data || res;

        // If payment method is Paystack card, initialize payment and redirect
        if (paymentMethod === 'paystack_card' || paymentMethod === 'card') {
          try {
            const paymentRes = await initializePayment({
              orderId: orderData.id || orderData.orderId,
              amount: orderData.totalAmount || orderData.total || 0,
              email: user?.email || '',
              paymentMethod: 'paystack_card',
            });

            const authUrl = paymentRes?.data?.authorizationUrl || paymentRes?.data?.authorization_url;
            if (authUrl) {
              window.location.href = authUrl;
              return;
            }
          } catch (payErr: any) {
            // Payment init failed — order still exists, let user retry
            setError('Order created but payment initialization failed. Please go to Orders and retry payment.');
            return;
          }
        }

        // For non-card payments, redirect to orders
        router.push('/orders?success=true');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold">Checkout</h1>

      {error && (
        <div className="bg-error/10 text-error px-4 py-3 rounded-xl text-sm">{error}</div>
      )}

      {/* Progress */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= step ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className="text-xs hidden sm:inline">{s}</span>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 ${i < step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-heading font-semibold flex items-center gap-2"><MapPin size={18} /> Delivery Address</h2>
            <input type="text" placeholder="Full name" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <input type="text" placeholder="Street address" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
              <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            </div>
            <input type="tel" placeholder="Phone number" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-heading font-semibold flex items-center gap-2"><CreditCard size={18} /> Payment Method</h2>
            {[
              { id: 'paystack_card', label: 'Paystack (Card)' },
              { id: 'bank_transfer', label: 'Bank Transfer' },
              { id: 'wallet', label: 'Pay from Wallet' },
              { id: 'pay_on_delivery', label: 'Pay on Delivery' },
            ].map((m) => (
              <label key={m.id} className={`flex items-center gap-3 p-4 rounded-btn border cursor-pointer transition-all ${paymentMethod === m.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} className="accent-primary" />
                <span className="text-sm font-medium">{m.label}</span>
              </label>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <Check size={32} className="text-accent" />
            </div>
            <h2 className="font-heading font-semibold text-xl">Review & Confirm</h2>
            <div className="text-sm text-gray-500 space-y-2 text-left bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p><strong>Deliver to:</strong> {address.fullName || 'Not set'}</p>
              <p><strong>Address:</strong> {address.street || 'Not set'}, {address.city} {address.state}</p>
              <p><strong>Phone:</strong> {address.phone || 'Not set'}</p>
              <p><strong>Payment:</strong> {paymentMethod.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="flex justify-between">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-sm text-gray-500 hover:text-primary disabled:opacity-30">← Back</button>
        {step < 2 ? (
          <button onClick={() => setStep(step + 1)} className="btn-primary text-sm px-6 py-2">Continue</button>
        ) : (
          <button onClick={handlePlaceOrder} disabled={isSubmitting} className="btn-primary text-sm px-6 py-2 flex items-center gap-2 disabled:opacity-50">
            {isSubmitting && <Loader2 size={14} className="animate-spin" />}
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        )}
      </div>
    </div>
  );
}

