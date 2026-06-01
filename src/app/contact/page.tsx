'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section-padding max-w-5xl mx-auto">
          <motion.h1 className="text-3xl font-heading font-bold text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Contact Us</motion.h1>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div className="space-y-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-start gap-4"><Mail className="text-secondary shrink-0" size={20} /><div><h3 className="font-semibold">Email</h3><p className="text-sm text-gray-500">support@klassified.com</p></div></div>
              <div className="flex items-start gap-4"><Phone className="text-secondary shrink-0" size={20} /><div><h3 className="font-semibold">Phone</h3><p className="text-sm text-gray-500">+234 800 KLASSIFIED</p></div></div>
              <div className="flex items-start gap-4"><MapPin className="text-secondary shrink-0" size={20} /><div><h3 className="font-semibold">Office</h3><p className="text-sm text-gray-500">Lekki Phase 1, Lagos, Nigeria</p></div></div>
            </motion.div>

            <motion.form className="space-y-4 rounded-card bg-white dark:bg-card-dark shadow-soft p-6" onSubmit={(e) => e.preventDefault()} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary" />
              <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary" />
              <textarea rows={4} placeholder="Your message" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-secondary resize-none" />
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2"><Send size={16} /> Send Message</button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
