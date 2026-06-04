'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const heroSlides = [
  {
    headline: 'The Food System Is Broken.',
    subtext: 'Good food is being wasted every day while vendors struggle to reach buyers. We built the infrastructure to fix it.',
    cta: 'Join the Movement',
    ctaLink: '/auth/signup',
    gradient: 'from-[#0f172a]/90 via-[#1a2e1a]/80 to-[#0c1929]/70',
    accent: '#61CE70',
    image: '/placeholder-product.svg',
  },
  {
    headline: 'Trust Should Be Built Into The System.',
    subtext: 'Not assumed. Every product traced, every vendor verified, every delivery tracked. Transparency from farm to table.',
    cta: 'Start Building Trust',
    ctaLink: '/auth/signup?type=vendor',
    gradient: 'from-[#1a0533]/90 via-[#0f172a]/80 to-[#0c2940]/70',
    accent: '#6EC1E4',
    image: '/placeholder-product.svg',
  },
  {
    headline: 'Your Products Deserve a Bigger Market.',
    subtext: 'Stop losing customers to invisibility. Scale beyond your physical location with a system designed for growth.',
    cta: 'Start Selling Free',
    ctaLink: '/auth/signup?type=vendor',
    gradient: 'from-[#2d1b00]/90 via-[#1a0f00]/80 to-[#0f172a]/70',
    accent: '#D4A017',
    image: '/placeholder-product.svg',
  },
  {
    headline: 'Know Where Your Food Comes From.',
    subtext: 'Buy with confidence. Every product on our platform has a transparent journey from source to your doorstep.',
    cta: 'Start Shopping',
    ctaLink: '/products',
    gradient: 'from-[#0c2940]/90 via-[#0f172a]/80 to-[#1a0533]/70',
    accent: '#EC4899',
    image: '/placeholder-product.svg',
  },
  {
    headline: 'Good Products Need Better Systems.',
    subtext: 'The problem isn\'t food production. It\'s broken logistics, hidden sourcing, and zero accountability. We fix that.',
    cta: 'Explore Solutions',
    ctaLink: '/about',
    gradient: 'from-[#0f172a]/90 via-[#1a2e1a]/80 to-[#2d1b00]/70',
    accent: '#61CE70',
    image: '/placeholder-product.svg',
  },
  {
    headline: 'Give Back. Build Community.',
    subtext: 'Buy someone groceries, send a meal, fund a need. Small acts of kindness create big impact when the system makes it easy.',
    cta: "Make Someone's Day",
    ctaLink: '/charity',
    gradient: 'from-[#1a0533]/90 via-[#2d0a1a]/80 to-[#0f172a]/70',
    accent: '#EC4899',
    image: '/placeholder-product.svg',
  },
  {
    headline: 'Invest in What Grows.',
    subtext: 'Back verified vendors, earn returns, and grow wealth together. Community-powered investment for real businesses.',
    cta: 'Start Investing',
    ctaLink: '/investors',
    gradient: 'from-[#0c2940]/90 via-[#0f172a]/80 to-[#1a2e1a]/70',
    accent: '#6EC1E4',
    image: '/placeholder-product.svg',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[current];

  return (
    <section className="relative h-[55vh] sm:h-[60vh] md:h-[65vh] flex items-center justify-center overflow-hidden mt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-all duration-1000`} />
        {/* Blockchain connectivity pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blockchain-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill={slide.accent} opacity="0.6" />
              <line x1="30" y1="30" x2="60" y2="0" stroke={slide.accent} strokeWidth="0.5" opacity="0.3" />
              <line x1="30" y1="30" x2="0" y2="60" stroke={slide.accent} strokeWidth="0.5" opacity="0.3" />
              <line x1="30" y1="30" x2="60" y2="60" stroke={slide.accent} strokeWidth="0.5" opacity="0.3" />
              <rect x="25" y="25" width="10" height="10" rx="2" fill="none" stroke={slide.accent} strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blockchain-grid)" />
        </svg>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_left,_#6EC1E4_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_right,_#61CE70_0%,_transparent_50%)]" />
      </div>

      {/* Floating blockchain nodes */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          >
            <div
              className="w-3 h-3 rounded-sm border"
              style={{ borderColor: `${slide.accent}60`, backgroundColor: `${slide.accent}20` }}
            />
          </motion.div>
        ))}
        {/* Connection lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px"
            style={{
              left: `${Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              width: `${80 + Math.random() * 120}px`,
              background: `linear-gradient(90deg, transparent, ${slide.accent}40, transparent)`,
              transform: `rotate(${-30 + Math.random() * 60}deg)`,
            }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex-1 text-center sm:text-left max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white/90 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Real Food. Real System. No Stories. — Powered by AMI
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 leading-tight">
                {slide.headline}
              </h1>

              <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-xl leading-relaxed">
                {slide.subtext}
              </p>

              <Link
                href={slide.ctaLink}
                className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                style={{ backgroundColor: slide.accent }}
              >
                {slide.cta} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Image */}
        <div className="hidden md:block relative w-[280px] lg:w-[320px] h-[280px] lg:h-[320px] flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={slide.image}
              alt={slide.headline}
              className="w-full h-full object-contain drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -30 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots - moved up */}
      <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent z-10" />
    </section>
  );
}

