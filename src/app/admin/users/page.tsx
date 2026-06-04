'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, MoreVertical, Ban, CheckCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import { getAdminUsers, moderateUser } from '@/lib/admin-api';

interface UserRecord {
  id: string;
  username: string;
  email: string;
  name: string;
  accountType: string;
  status: string;
  enabled: boolean;
  created: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  useEffect(() => { loadUsers(); }, [filter]);

  async function loadUsers(token?: string) {
    setLoading(true);
    try {
      const res = await getAdminUsers({ limit: 20, accountType: filter || undefined, token });
      setUsers(token ? [...users, ...res.data.users] : res.data.users);
      setNextToken(res.data.nextToken);
    } catch (err: any) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleModerate(userId: string, action: 'suspend' | 'reactivate') {
    try {
      await moderateUser(userId, action);
      setUsers(users.map((u) => u.id === userId ? { ...u, enabled: action === 'reactivate' } : u));
      setActionMenu(null);
    } catch (err: any) {
      alert(err.message);
    }
  }

  const filtered = search
    ? users.filter((u) => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))
    : users;

  const accountTypes = ['', 'Customer', 'Farmer', 'Vendor', 'Supplier', 'Distributor', 'Exporter', 'Driver', 'Chef', 'Restaurant', 'Investor', 'Admin'];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Users size={24} /> User Management</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800">
          <option value="">All Types</option>
          {accountTypes.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th className="p-4">User</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && !users.length ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading users...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No users found</td></tr>
            ) : filtered.map((u, i) => (
              <motion.tr key={u.id} className="border-b dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                <td className="p-4">
                  <div className="font-medium">{u.name || u.username}</div>
                  <div className="text-xs text-gray-500">{u.email}</div>
                </td>
                <td className="p-4"><span className="text-xs px-2 py-0.5 rounded-pill bg-primary/10 text-primary">{u.accountType}</span></td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-0.5 rounded-pill ${u.enabled ? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'}`}>
                    {u.enabled ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-xs">{u.created ? new Date(u.created).toLocaleDateString() : '—'}</td>
                <td className="p-4 relative">
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/users/${u.id}`} className="p-1 text-gray-400 hover:text-primary" title="Inspect">
                      <Eye size={16} />
                    </Link>
                    <button onClick={() => setActionMenu(actionMenu === u.id ? null : u.id)} className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  {actionMenu === u.id && (
                    <div className="absolute right-4 top-10 z-10 bg-white dark:bg-gray-800 border rounded-lg shadow-lg py-1 min-w-[140px]">
                      {u.enabled ? (
                        <button onClick={() => handleModerate(u.id, 'suspend')} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-gray-50 dark:hover:bg-gray-700">
                          <Ban size={14} /> Suspend
                        </button>
                      ) : (
                        <button onClick={() => handleModerate(u.id, 'reactivate')} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-accent hover:bg-gray-50 dark:hover:bg-gray-700">
                          <CheckCircle size={14} /> Reactivate
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {nextToken && (
        <button onClick={() => loadUsers(nextToken)} disabled={loading} className="btn-primary mx-auto block">
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
