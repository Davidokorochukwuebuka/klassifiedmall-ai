'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Warehouse, MapPin, Calendar, Thermometer, Loader2, CheckCircle } from 'lucide-react';
import { getSpaces, bookSpace } from '@/lib/api';

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState<string | null>(null);
  const [booked, setBooked] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadSpaces();
  }, [filter]);

  async function loadSpaces() {
    setIsLoading(true);
    try {
      const params: any = {};
      if (filter !== 'all') params.type = filter;
      const res = await getSpaces(params);
      setSpaces(res.data?.spaces || []);
    } catch (err) {
      console.error('Failed to load spaces:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBook(space: any) {
    setBooking(space.spaceId || space.id);
    try {
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      await bookSpace({
        spaceId: space.spaceId || space.id,
        startDate,
        endDate,
      });
      setBooked(space.spaceId || space.id);
      setTimeout(() => setBooked(null), 3000);
    } catch (err) {
      console.error('Failed to book space:', err);
    } finally {
      setBooking(null);
    }
  }

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.h1 className="text-2xl font-heading font-bold flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Warehouse size={24} className="text-secondary" /> Book Storage Space
        </motion.h1>
        <p className="text-gray-500 text-sm">Reserve cold rooms and warehouse space for your products.</p>

        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'cold-room', 'storage'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-pill text-sm capitalize ${filter === f ? 'bg-primary text-white' : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700'}`}
            >
              {f === 'all' ? 'All Spaces' : f.replace('-', ' ')}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {spaces.map((s: any, i: number) => (
              <motion.div key={s.spaceId || s.id || i} className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-semibold">{s.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-pill ${s.available !== false ? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'}`}>
                    {s.available !== false ? 'Available' : 'Full'}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><MapPin size={12} />{s.location}</div>
                  <div className="flex items-center gap-2"><Thermometer size={12} />{s.type} · {s.temperature || 'Ambient'}</div>
                  <div className="flex items-center gap-2"><Calendar size={12} />₦{(s.pricePerDay || 0).toLocaleString()}/day · {s.capacity}</div>
                </div>
                {s.available !== false && (
                  <button
                    onClick={() => handleBook(s)}
                    disabled={booking === (s.spaceId || s.id)}
                    className="btn-primary text-sm px-4 py-2 mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {booked === (s.spaceId || s.id) ? (
                      <><CheckCircle size={14} /> Booked!</>
                    ) : booking === (s.spaceId || s.id) ? (
                      <><Loader2 size={14} className="animate-spin" /> Booking...</>
                    ) : (
                      'Book Now'
                    )}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

