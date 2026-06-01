'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#1a0533] via-[#0f172a] to-[#0c1929]">
      {/* Left branding panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <Link href="/" className="font-heading font-bold text-4xl text-white mb-6 block">
            KlASSIFIED
          </Link>
          <p className="text-gray-300 text-lg">Shop, Sell, Deliver, Learn, Invest, Give — All in One Place</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          className="w-full max-w-md bg-white dark:bg-card-dark rounded-card shadow-soft p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="lg:hidden font-heading font-bold text-2xl text-primary block text-center mb-6">
            KlASSIFIED
          </Link>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
