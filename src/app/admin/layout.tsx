'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CheckSquare, AlertTriangle, DollarSign, Shield, Cloud, Tag, Heart, Truck, Activity } from 'lucide-react';

const nav = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Approvals', href: '/admin/approvals', icon: CheckSquare },
  { label: 'Disputes', href: '/admin/disputes', icon: AlertTriangle },
  { label: 'Finance', href: '/admin/finance', icon: DollarSign },
  { label: 'Moderation', href: '/admin/moderation', icon: Shield },
  { label: 'AWS Config', href: '/admin/aws-config', icon: Cloud },
  { label: 'Pricing', href: '/admin/pricing', icon: Tag },
  { label: 'Charity', href: '/admin/charity', icon: Heart },
  { label: 'Drivers', href: '/admin/drivers', icon: Truck },
  { label: 'System', href: '/admin/system', icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:block w-52 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark overflow-y-auto">
        <div className="p-4"><Link href="/admin/dashboard" className="font-heading font-bold text-error text-lg">Admin</Link></div>
        <nav className="px-2 pb-4 space-y-0.5">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`flex items-center gap-2 px-3 py-2 rounded-btn text-sm ${pathname === n.href ? 'bg-error/10 text-error font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <n.icon size={16} /> {n.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-surface-dark">{children}</main>
    </div>
  );
}
