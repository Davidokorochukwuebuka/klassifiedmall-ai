'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold">Shop by Category</h2>
            <p className="text-sm text-gray-500 mt-1">Real food. Real system. No stories.</p>
          </div>
          <Link href="/categories" className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1 group">
            Shop Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Row 1: Fresh + Protein (equal large cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Fresh - Only Fresh Fruits */}
          <Link href="/categories/fresh-fruits">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[320px] group cursor-pointer"
              style={{ backgroundColor: '#F59E0B' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-500">Category</span>
                  <h3 className="text-3xl sm:text-4xl font-heading font-bold mt-1 text-black">Fresh</h3>
                  <p className="text-sm mt-2 text-black/80">Starts At ₦500</p>
                </div>
                <span className="inline-block px-5 py-2.5 rounded-lg text-sm font-bold bg-gray-700 text-white w-fit">
                  Shop Now
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[75%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/Fruits__1_-removebg-preview.png?utm_source=angie-ai"
                  alt="Fresh Fruits"
                  fill
                  className="object-contain object-bottom-right"
                  sizes="300px"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>

          {/* Protein - All meats, fish, seafood, dry fish, fresh, frozen, dried */}
          <Link href="/categories/protein">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[320px] group cursor-pointer"
              style={{ backgroundColor: '#8B5CF6' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Category</span>
                  <h3 className="text-3xl sm:text-4xl font-heading font-bold mt-1 text-white">Protein</h3>
                  <p className="text-sm mt-2 text-white/80">Meat, Fish, Seafood — Fresh, Frozen & Dried</p>
                </div>
                <span className="inline-block px-5 py-2.5 rounded-lg text-sm font-bold bg-gray-900 text-white w-fit">
                  Shop Now
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[75%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/Protein-min-scaled-1-removebg-preview.png?utm_source=angie-ai"
                  alt="Protein"
                  fill
                  className="object-contain object-bottom-right"
                  sizes="300px"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Row 2: Packaged Foods (wide) + Soup Ingredients (medium) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <Link href="/categories/packaged-foods" className="md:col-span-3">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[300px] group cursor-pointer"
              style={{ backgroundColor: '#7C3AED' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium mb-2">
                    Shop From Supermarket
                  </span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-sky-300 mt-3">Category</span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
                    Packaged Foods<br />Beverages, Drinks & Tin Foods
                  </h3>
                </div>
                <span className="inline-block px-5 py-2.5 rounded-lg text-sm font-bold bg-gray-900 text-white w-fit">
                  Shop Now
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-[50%] h-[80%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/soft-drinks-removebg-preview.png?utm_source=angie-ai"
                  alt="Packaged Foods"
                  fill
                  className="object-contain object-bottom-left"
                  sizes="350px"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>

          <Link href="/categories/soup-ingredients" className="md:col-span-2">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[300px] group cursor-pointer"
              style={{ backgroundColor: '#06B6D4' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">Category</span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                    Soup Ingredients<br />& Cooking Essentials
                  </h3>
                </div>
                <span className="text-sm font-medium text-white/90 underline underline-offset-4 hover:text-white">
                  Local Market Errands →
                </span>
              </div>
              <div className="absolute top-4 right-2 w-[45%] h-[70%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/oil-removebg-preview.png?utm_source=angie-ai"
                  alt="Soup Ingredients"
                  fill
                  className="object-contain"
                  sizes="200px"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Row 3: Swallow + Food Bundles + Fresh Produce */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <Link href="/categories/grains-tubers">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[280px] group cursor-pointer bg-white border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">Category</span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mt-2">
                  Swallow<br />Grains<br />Tubers
                </h3>
                <span className="inline-block mt-4 px-5 py-2 rounded-lg text-sm font-bold bg-amber-500 text-white">
                  Shop Now
                </span>
              </div>
              <div className="absolute bottom-0 left-2 w-[45%] h-[50%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/Nigerian-and-African-Yam-Tubers-Neogric-2-removebg-preview.png?utm_source=angie-ai"
                  alt="Tubers"
                  fill
                  className="object-contain object-bottom"
                  sizes="150px"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>

          <Link href="/categories/food-bundles">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[280px] group cursor-pointer bg-white border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-500">Category</span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mt-2">
                  Food<br />Bundles
                </h3>
                <span className="text-sm font-medium text-gray-600 mt-4 underline underline-offset-4">
                  Shop Now →
                </span>
              </div>
              <div className="absolute bottom-4 right-4 w-[40%] h-[45%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/bag-removebg-review.png?utm_source=angie-ai"
                  alt="Food Bundles"
                  fill
                  className="object-contain"
                  sizes="150px"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>

          <Link href="/categories/fresh-produce">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[280px] group cursor-pointer"
              style={{ backgroundColor: '#1F2937' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/DSC_0003-2-1024x738-removebg-preview.png"
                  alt="Fresh Produce"
                  fill
                  className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                  sizes="300px"
                  unoptimized
                />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Fresh<br />Produce
                </h3>
                <span className="text-sm font-medium text-sky-300 underline underline-offset-4">
                  Shop Now →
                </span>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Row 4: Logistics (wide) + Pickup (medium) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <Link href="/hail" className="md:col-span-3">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[300px] group cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #92704F 0%, #6B4F38 100%)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Category</span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
                    Fast and Reliable<br />Logistics<br />Solutions
                  </h3>
                </div>
                <div className="text-right">
                  <span className="inline-block px-5 py-2.5 rounded-lg text-sm font-bold bg-gray-900 text-white">
                    Send Errands
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-4 w-[50%] h-[75%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/logistics%20group.png?utm_source=angie-ai"
                  alt="Logistics"
                  fill
                  className="object-contain object-bottom-left"
                  sizes="350px"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>

          <Link href="/hail" className="md:col-span-2">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[300px] group cursor-pointer"
              style={{ backgroundColor: '#A8897A' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Category</span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                    Seamless Pickup<br />and Drop-off
                  </h3>
                </div>
                <span className="text-sm font-medium text-emerald-300 underline underline-offset-4">
                  Request Delivery →
                </span>
              </div>
              <div className="absolute top-6 right-2 w-[50%] h-[55%] group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/logistics%20bike.png"
                  alt="Pickup & Drop-off"
                  fill
                  className="object-contain"
                  sizes="200px"
                  unoptimized
                />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Row 5: Group Buy (full width) */}
        <Link href="/group-buy">
          <motion.div
            className="relative rounded-2xl overflow-hidden h-[220px] sm:h-[260px] group cursor-pointer"
            style={{ backgroundColor: '#8B5CF6' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.005 }}
          >
            <div className="relative z-10 p-6 sm:p-8 h-full flex items-center">
              <div className="ml-auto max-w-md">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Group Buying</span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
                  Group Buy Tickets
                </h3>
                <p className="text-white/80 text-sm mt-2">
                  Buy specific products in bulk with others at wholesale prices. Split costs, save more.
                </p>
                <span className="inline-block mt-4 px-5 py-2.5 rounded-lg text-sm font-bold bg-gray-900 text-white">
                  Join a Group Buy
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-[50%] h-[90%] group-hover:scale-105 transition-transform duration-500">
              <Image
                src="https://bucket-1212rex4i4.s3.us-east-1.amazonaws.com/wp-content/klassifiedmall/group-five-african-womans-walking-supermarket-with-shopping-carts_627829-592-removebg-preview.png"
                alt="Group Buy"
                fill
                className="object-contain object-bottom-left"
                sizes="400px"
                unoptimized
              />
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
