'use client';

import { ShieldCheck, Lock, CreditCard } from 'lucide-react';
import Link from 'next/link';

const links = {
  Shop: [
    { label: 'Explore Categories', href: '/categories' },
    { label: 'Products', href: '/products' },
    { label: 'Vendors', href: '/vendors' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Services: [
    { label: 'Hail a Rider', href: '/hail' },
    { label: 'Spaces & Storage', href: '/spaces' },
    { label: 'Business Tools', href: '/tools' },
    { label: 'Courses', href: '/learn' },
  ],
  Community: [
    { label: 'Forums', href: '/community' },
    { label: 'Charity', href: '/charity' },
    { label: 'Investors', href: '/investors' },
    { label: 'Leaderboard', href: '/leaderboard' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Map', href: '/map' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-heading font-bold text-white text-xl mb-4">KlASSIFIED</h3>
            <p className="text-sm text-gray-400 mb-4">The super-app marketplace for Africa. Shop, sell, deliver, learn, invest, give.</p>
            <div className="flex gap-3">
              {['twitter', 'instagram', 'linkedin'].map((s) => (
                <a key={s} href={`https://${s}.com`} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-xs" aria-label={s}>
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 w-full px-4 py-3 rounded-btn bg-white/5 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Lock size={14} /> SSL Secured
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CreditCard size={14} /> Paystack Verified
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={14} /> Data Protected
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">© 2024 KlASSIFIED Mall. All rights reserved.</p>
      </div>
    </footer>
  );
}
