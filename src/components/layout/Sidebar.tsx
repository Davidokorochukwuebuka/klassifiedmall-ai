'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  accountType: string;
  onClose?: () => void;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const navItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Marketplace', href: '/marketplace', icon: '🌾' },
  { label: 'Orders', href: '/orders', icon: '📦' },
  { label: 'Community', href: '/community', icon: '👥' },
  { label: 'Hailing', href: '/hailing', icon: '🚚' },
  { label: 'Spaces', href: '/spaces', icon: '❄️' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

const accountSpecificItems: Record<string, { label: string; href: string; icon: string }[]> = {
  FARMER: [
    { label: 'My Produce', href: '/marketplace', icon: '🌱' },
    { label: 'Harvest Schedule', href: '/orders', icon: '📅' },
  ],
  SUPPLIER: [
    { label: 'Inventory', href: '/marketplace', icon: '📋' },
    { label: 'Bulk Orders', href: '/orders', icon: '🏭' },
  ],
  LOGISTICS_PROVIDER: [
    { label: 'Fleet', href: '/hailing', icon: '🚛' },
    { label: 'Routes', href: '/hailing', icon: '🗺️' },
  ],
  CUSTOMER: [
    { label: 'My Cart', href: '/marketplace', icon: '🛒' },
    { label: 'Wishlist', href: '/marketplace', icon: '❤️' },
  ],
};

export default function Sidebar({ accountType, onClose, userName, userEmail, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const extraItems = accountSpecificItems[accountType] || [];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <span className="text-2xl">🏪</span>
          <span className="font-bold text-lg text-green-800">KlASSIFIED</span>
        </Link>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      <div className="px-6 py-3 border-b border-gray-100">
        <p className="text-xs text-gray-500 capitalize">
          {accountType.toLowerCase().replace('_', ' ')} Account
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Account-specific section */}
        {extraItems.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Quick Access
            </p>
            <ul className="space-y-1">
              {extraItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors min-h-[44px]"
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">
            👤
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{userName || 'Demo User'}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail || 'demo@klassified.com'}</p>
          </div>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full mt-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left min-h-[44px] flex items-center gap-2"
          >
            <span>🚪</span> Sign Out
          </button>
        )}
      </div>
    </aside>
  );
}
