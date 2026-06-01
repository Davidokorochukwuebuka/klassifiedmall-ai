'use client';

import { useState, useEffect } from 'react';
import { getNotifications } from '@/lib/api';

interface HeaderProps {
  onMenuToggle: () => void;
  accountType: string;
  onAccountChange: (type: string) => void;
  userName?: string;
}

const accountTypes = [
  'FARMER',
  'SUPPLIER',
  'CUSTOMER',
  'LOGISTICS_PROVIDER',
  'EXPORTER',
  'DISTRIBUTOR',
];

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export default function Header({ onMenuToggle, accountType, onAccountChange, userName }: HeaderProps) {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    getNotifications()
      .then((res) => {
        setNotifications(res.data.notifications);
        setUnreadCount(res.data.unreadCount);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 lg:left-64 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className="text-xl">☰</span>
        </button>
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search products, orders, vendors..."
            className="input-field w-48 lg:w-72 text-sm"
          />
        </div>
        {userName && (
          <span className="hidden sm:inline text-sm text-gray-500 lg:hidden">
            Hi, {userName.split(' ')[0]}
          </span>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Account Type Switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowAccountMenu(!showAccountMenu); setShowNotifications(false); }}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm transition-colors min-h-[44px]"
          >
            <span className="hidden sm:inline text-xs text-gray-500">Role:</span>
            <span className="font-medium text-green-700 capitalize text-xs sm:text-sm">
              {accountType.toLowerCase().replace('_', ' ')}
            </span>
            <span className="text-gray-400 text-xs">▼</span>
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              {accountTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { onAccountChange(type); setShowAccountMenu(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 capitalize transition-colors min-h-[44px] ${
                    type === accountType ? 'text-green-700 font-medium bg-green-50' : 'text-gray-700'
                  }`}
                >
                  {type.toLowerCase().replace('_', ' ')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowAccountMenu(false); }}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Notifications"
          >
            <span className="text-xl">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-w-sm">
              <div className="p-3 border-b border-gray-100">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer ${!n.read ? 'bg-green-50/50' : ''}`}>
                    <div className="flex items-start gap-2">
                      <span className="text-sm">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100">
                <button className="w-full text-center text-sm text-green-700 hover:text-green-800 py-2 min-h-[44px]">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
