'use client';

import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import SurfableGrid from '@/components/home/SurfableGrid';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import FeaturedVendors from '@/components/home/FeaturedVendors';
import LiveActivityFeed from '@/components/home/LiveActivityFeed';
import QuickActions from '@/components/home/QuickActions';
import TrendingProducts from '@/components/home/TrendingProducts';
import CharitySection from '@/components/home/CharitySection';
import BusinessTools from '@/components/home/BusinessTools';
import InvestorSection from '@/components/home/InvestorSection';
import Newsletter from '@/components/home/Newsletter';
import Footer from '@/components/home/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LiveActivityFeed />
      <QuickActions />
      <CategoryShowcase />
      <SurfableGrid />
      <FeaturedVendors />
      <TrendingProducts />
      <Newsletter />
      <CharitySection />
      <BusinessTools />
      <InvestorSection />
      <Footer />
    </main>
  );
}
