'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, BarChart3, Users, ArrowUpRight, ArrowDownRight, Building2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const vendorInvestments = [
  { id: 'V1', name: 'FreshFarms Lagos', sector: 'Agriculture', roi: 22, growth: 15, investors: 45, minInvest: 10000, image: '🌾' },
  { id: 'V2', name: 'Chef Amara Kitchen', sector: 'Food Service', roi: 18, growth: 28, investors: 32, minInvest: 5000, image: '👨‍🍳' },
  { id: 'V3', name: 'TechHub Electronics', sector: 'Retail', roi: 15, growth: 12, investors: 67, minInvest: 25000, image: '📱' },
  { id: 'V4', name: 'GreenLogistics', sector: 'Logistics', roi: 20, growth: 35, investors: 28, minInvest: 15000, image: '🚚' },
];

const publicStocks = [
  { id: 'S1', name: 'Dangote Cement', ticker: 'DANGCEM', price: 285.50, change: 2.3, sector: 'Industrial', logo: '🏭' },
  { id: 'S2', name: 'MTN Nigeria', ticker: 'MTNN', price: 195.00, change: -1.2, sector: 'Telecom', logo: '📡' },
  { id: 'S3', name: 'Nestle Nigeria', ticker: 'NESTLE', price: 1450.00, change: 0.8, sector: 'Consumer', logo: '🍫' },
  { id: 'S4', name: 'Airtel Africa', ticker: 'AIRTEL', price: 1680.00, change: 3.1, sector: 'Telecom', logo: '📶' },
  { id: 'S5', name: 'BUA Cement', ticker: 'BUACEMENT', price: 72.50, change: -0.5, sector: 'Industrial', logo: '🧱' },
  { id: 'S6', name: 'Zenith Bank', ticker: 'ZENITH', price: 32.80, change: 1.8, sector: 'Banking', logo: '🏦' },
];

export default function InvestorsLandingPage() {
  const [tab, setTab] = useState<'vendors' | 'stocks'>('vendors');

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-surface-dark">
        <section className="section-padding bg-gradient-to-br from-primary to-[#0D1B2A] text-white text-center">
          <motion.h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Invest in Growing Businesses
          </motion.h1>
          <motion.p className="text-lg text-white/80 max-w-2xl mx-auto mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Back verified vendors, buy stocks in top brands, track real-time performance, and earn returns.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/auth/signup?type=investor" className="btn-primary text-lg px-8 py-4">Start Investing</Link>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="section-padding max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: TrendingUp, title: '18% Avg ROI', desc: 'Average returns across portfolio' },
              { icon: Shield, title: 'Verified Only', desc: 'All businesses are vetted' },
              { icon: BarChart3, title: 'Real-time Data', desc: 'Live revenue & growth metrics' },
              { icon: Users, title: '1,000+ Investors', desc: 'Growing community' },
            ].map((f, i) => (
              <motion.div key={f.title} className="p-6 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <f.icon size={28} className="mx-auto text-secondary mb-3" />
                <h3 className="font-heading font-semibold">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <section className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="flex gap-2 mb-8 justify-center">
            <button
              onClick={() => setTab('vendors')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'vendors' ? 'bg-primary text-white shadow-glow' : 'bg-white dark:bg-card-dark text-gray-600 border border-gray-200 dark:border-gray-700'}`}
            >
              <TrendingUp size={14} className="inline mr-1" /> Vendor Investments
            </button>
            <button
              onClick={() => setTab('stocks')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'stocks' ? 'bg-primary text-white shadow-glow' : 'bg-white dark:bg-card-dark text-gray-600 border border-gray-200 dark:border-gray-700'}`}
            >
              <Building2 size={14} className="inline mr-1" /> Public Stocks
            </button>
          </div>

          {/* Vendor Investments */}
          {tab === 'vendors' && (
            <div className="grid md:grid-cols-2 gap-5">
              {vendorInvestments.map((v, i) => (
                <motion.div
                  key={v.id}
                  className="rounded-2xl bg-white dark:bg-card-dark shadow-soft p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{v.image}</span>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold">{v.name}</h3>
                      <p className="text-xs text-gray-500">{v.sector}</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-accent/10 text-accent text-xs font-bold">{v.roi}% ROI</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-[10px] text-gray-500">Growth</p>
                      <p className="text-sm font-bold text-accent">+{v.growth}%</p>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-[10px] text-gray-500">Investors</p>
                      <p className="text-sm font-bold">{v.investors}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-[10px] text-gray-500">Min. Invest</p>
                      <p className="text-sm font-bold">₦{(v.minInvest / 1000)}K</p>
                    </div>
                  </div>
                  <Link href={`/investor/business/${v.id}`} className="block w-full py-2.5 rounded-xl bg-primary text-white text-center text-sm font-bold hover:bg-primary-dark transition-colors">
                    Invest Now
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Public Stocks */}
          {tab === 'stocks' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-4 text-center">Trade stocks of top Nigerian and African companies</p>
              {publicStocks.map((stock, i) => (
                <motion.div
                  key={stock.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="text-2xl w-10 text-center">{stock.logo}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-sm">{stock.name}</h4>
                    <p className="text-xs text-gray-500">{stock.ticker} · {stock.sector}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold">₦{stock.price.toLocaleString()}</p>
                    <p className={`text-xs font-medium flex items-center gap-0.5 justify-end ${stock.change >= 0 ? 'text-accent' : 'text-error'}`}>
                      {stock.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all">
                    Buy
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

