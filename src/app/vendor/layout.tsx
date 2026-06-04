'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Warehouse, GitBranch, Wallet, CreditCard, Store, Megaphone, Star, MessageSquare, TrendingUp, Wrench, Video, BarChart3, Crown } from 'lucide-react';

const nav = [
  { label: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/vendor/products', icon: Package },
  { label: 'Orders', href: '/vendor/orders', icon: ShoppingCart },
  { label: 'Inventory', href: '/vendor/inventory', icon: Warehouse },
  { label: 'Branches', href: '/vendor/branches', icon: GitBranch },
  { label: 'Wallet', href: '/vendor/wallet', icon: Wallet },
  { label: 'Cards', href: '/vendor/cards', icon: CreditCard },
  { label: 'Storefront', href: '/vendor/storefront', icon: Store },
  { label: 'Promotions', href: '/vendor/promotions', icon: Megaphone },
  { label: 'Reviews', href: '/vendor/reviews', icon: Star },
  { label: 'Negotiations', href: '/vendor/negotiations', icon: MessageSquare },
  { label: 'Investment', href: '/vendor/investment-readiness', icon: TrendingUp },
  { label: 'Tools', href: '/vendor/tools', icon: Wrench },
  { label: 'Media', href: '/vendor/media-studio', icon: Video },
  { label: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
  { label: 'Subscription', href: '/vendor/subscription', icon: Crown },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:block w-56 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark overflow-y-auto">
        <div className="p-4">
          <Link href="/vendor/dashboard" className="font-heading font-bold text-primary text-lg">Vendor Panel</Link>
        </div>
        <nav className="px-2 pb-4 space-y-0.5">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`flex items-center gap-2 px-3 py-2 rounded-btn text-sm transition-colors ${pathname === n.href ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <n.icon size={16} /> {n.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-surface-dark">{children}</main>
    </div>
  );
}

