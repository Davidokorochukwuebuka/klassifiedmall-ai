'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Shield, Calendar, Package, Ban, CheckCircle } from 'lucide-react';
import { getAdminUser, moderateUser } from '@/lib/admin-api';

interface UserDetail {
  id: string;
  username: string;
  email: string;
  name: string;
  phone?: string;
  accountType: string;
  status: string;
  enabled: boolean;
  created: string;
  lastModified: string;
  groups: string[];
  recentOrders: any[];
}

export default function AdminUserDetail({ id }: { id: string }) {
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { if (id) loadUser(); }, [id]);

  async function loadUser() {
    try {
      const res = await getAdminUser(id);
      setUser(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleModerate(action: 'suspend' | 'reactivate') {
    if (!user) return;
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;
    try {
      await moderateUser(user.id, action);
      setUser({ ...user, enabled: action === 'reactivate' });
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) return <div className="p-6 text-center text-gray-500">Loading user details...</div>;
  if (error) return <div className="p-6 text-center text-error">{error}</div>;
  if (!user) return <div className="p-6 text-center text-gray-500">User not found</div>;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary">
        <ArrowLeft size={16} /> Back to Users
      </button>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold">{user.name || user.username}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <span className={`px-3 py-1 rounded-pill text-sm font-medium ${user.enabled ? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'}`}>
            {user.enabled ? 'Active' : 'Suspended'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <InfoCard icon={User} label="Account Type" value={user.accountType} />
          <InfoCard icon={Mail} label="Email" value={user.email} />
          <InfoCard icon={Phone} label="Phone" value={user.phone || 'Not set'} />
          <InfoCard icon={Calendar} label="Joined" value={user.created ? new Date(user.created).toLocaleDateString() : '—'} />
        </div>

        {user.groups.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1"><Shield size={14} /> Groups</h3>
            <div className="flex flex-wrap gap-2">
              {user.groups.map((g) => <span key={g} className="text-xs px-2 py-1 rounded-pill bg-primary/10 text-primary">{g}</span>)}
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t flex gap-3">
          {user.enabled ? (
            <button onClick={() => handleModerate('suspend')} className="flex items-center gap-1 px-4 py-2 text-sm rounded-btn bg-error/10 text-error hover:bg-error/20">
              <Ban size={14} /> Suspend User
            </button>
          ) : (
            <button onClick={() => handleModerate('reactivate')} className="flex items-center gap-1 px-4 py-2 text-sm rounded-btn bg-accent/10 text-accent hover:bg-accent/20">
              <CheckCircle size={14} /> Reactivate User
            </button>
          )}
        </div>
      </motion.div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="font-heading font-semibold mb-4 flex items-center gap-2"><Package size={18} /> Recent Orders</h2>
        {user.recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders found for this user.</p>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-500 border-b"><th className="pb-2">Order ID</th><th className="pb-2">Status</th><th className="pb-2">Total</th><th className="pb-2">Date</th></tr></thead>
            <tbody>
              {user.recentOrders.map((o: any) => (
                <tr key={o.orderId || o.PK} className="border-b last:border-0">
                  <td className="py-2 font-mono text-xs">{(o.orderId || o.PK || '').slice(0, 12)}...</td>
                  <td className="py-2"><span className="text-xs px-2 py-0.5 rounded-pill bg-gray-100">{o.status || 'unknown'}</span></td>
                  <td className="py-2">₦{(o.totalAmount || o.total || 0).toLocaleString()}</td>
                  <td className="py-2 text-gray-500">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <Icon size={14} className="text-gray-400 mb-1" />
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-medium truncate">{value}</div>
    </div>
  );
}
