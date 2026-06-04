'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#6EC1E4' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="relative w-full md:w-[45%] h-[250px] sm:h-[300px] shrink-0">
          <Image
            src="/placeholder-product.svg"
            alt="Newsletter"
            fill
            className="object-contain object-center"
            sizes="400px"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="text-center md:text-left">
          <p className="text-white/90 text-lg font-medium mb-1">Subscribe to our</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">Newsletter</h2>
          <p className="text-white/80 mb-6">Start Shopping Right Now</p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="flex-1 px-5 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-md"
            />
            <button className="px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md hover:shadow-lg transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

