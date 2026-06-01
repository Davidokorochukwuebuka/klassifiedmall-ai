'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Search, User, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'Explore', href: '/explore' },
  { label: 'Shop', href: '/categories' },
  { label: 'Logistics', href: '/hail' },
  { label: 'Wallet', href: '/wallet' },
  { label: 'Community', href: '/community' },
  { label: 'Spaces', href: '/spaces' },
];

const mobileLinks = [
  { label: 'Explore Categories', href: '/categories' },
  { label: 'Products', href: '/products' },
  { label: 'Vendors', href: '/vendors' },
  { label: 'Hail a Rider', href: '/hail' },
  { label: 'Community', href: '/community' },
  { label: 'Spaces', href: '/spaces' },
  { label: 'Learn', href: '/learn' },
  { label: 'Charity', href: '/charity' },
  { label: 'Investors', href: '/investors' },
  { label: 'Business Tools', href: '/tools' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-gray-200 dark:border-gray-700 shadow-sm'
        : 'glass border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className={`font-heading font-bold text-xl transition-colors duration-300 ${
          scrolled ? 'text-[#1E3A5F] dark:text-white' : 'text-white'
        }`}>
          KlASSIFIED Mall
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? 'text-[#1E3A5F] hover:text-[#152C4A] dark:text-gray-300 dark:hover:text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              scrolled ? 'text-[#1E3A5F] hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            href="/products"
            className={`p-2 transition-colors duration-300 ${
              scrolled ? 'text-[#1E3A5F] hover:text-[#152C4A] dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'
            }`}
            aria-label="Search"
          >
            <Search size={18} />
          </Link>
          <Link
            href="/cart"
            className={`p-2 transition-colors duration-300 relative ${
              scrolled ? 'text-[#1E3A5F] hover:text-[#152C4A] dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'
            }`}
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary rounded-full text-[9px] text-white flex items-center justify-center font-bold">0</span>
          </Link>
          <Link
            href="/auth/signin"
            className={`text-sm flex items-center gap-1 font-medium transition-colors duration-300 ${
              scrolled ? 'text-[#1E3A5F] hover:text-[#152C4A] dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            <User size={16} /> Sign In
          </Link>
          <Link href="/auth/signup" className="btn-primary text-sm px-4 py-2">Get Started</Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className={`p-2 transition-colors duration-300 ${
              scrolled ? 'text-[#1E3A5F] dark:text-white' : 'text-white'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            href="/cart"
            className={`p-2 relative transition-colors duration-300 ${
              scrolled ? 'text-[#1E3A5F] dark:text-white' : 'text-white'
            }`}
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary rounded-full text-[9px] text-white flex items-center justify-center font-bold">0</span>
          </Link>
          <button
            className={`p-2 transition-colors duration-300 ${
              scrolled ? 'text-[#1E3A5F] dark:text-white' : 'text-white'
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {mobileLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-[#1E3A5F] dark:hover:text-white py-2.5 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-3">
              <Link href="/auth/signin" className="flex-1 text-center text-gray-700 dark:text-gray-300 hover:text-[#1E3A5F] py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm" onClick={() => setOpen(false)}>
                Sign In
              </Link>
              <Link href="/auth/signup" className="flex-1 btn-primary text-sm text-center py-2.5" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
