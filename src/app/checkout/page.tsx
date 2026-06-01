'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Check } from 'lucide-react';

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const steps = ['Delivery', 'Payment', 'Confirm'];

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold">Checkout</h1>

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
            <input type="text" placeholder="Full name" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <input type="text" placeholder="Street address" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
              <input type="text" placeholder="State" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            </div>
            <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-heading font-semibold flex items-center gap-2"><CreditCard size={18} /> Payment Method</h2>
            {['Paystack (Card)', 'Bank Transfer', 'Pay on Delivery'].map((m) => (
              <label key={m} className="flex items-center gap-3 p-4 rounded-btn border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary/50">
                <input type="radio" name="payment" className="accent-primary" />
                <span className="text-sm font-medium">{m}</span>
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
            <div className="text-sm text-gray-500 space-y-1">
              <p>3 items · ₦26,500</p>
              <p>Delivery: ₦1,500</p>
              <p className="font-heading font-bold text-lg text-gray-900 dark:text-white">Total: ₦28,000</p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="flex justify-between">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-sm text-gray-500 hover:text-primary disabled:opacity-30">← Back</button>
        <button onClick={() => step < 2 ? setStep(step + 1) : null} className="btn-primary text-sm px-6 py-2">
          {step === 2 ? 'Place Order' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
