'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Check, X } from 'lucide-react';

const reservations = [
  { id: '1', name: 'Adaeze N.', date: 'May 31', time: '7:00 PM', guests: 4, status: 'Confirmed' },
  { id: '2', name: 'Chidi O.', date: 'May 31', time: '8:30 PM', guests: 2, status: 'Pending' },
  { id: '3', name: 'Fatima B.', date: 'Jun 1', time: '12:00 PM', guests: 6, status: 'Pending' },
  { id: '4', name: 'Emeka A.', date: 'Jun 1', time: '7:00 PM', guests: 3, status: 'Confirmed' },
  { id: '5', name: 'Grace I.', date: 'Jun 2', time: '6:30 PM', guests: 8, status: 'Cancelled' },
];

const statusStyle: Record<string, string> = { Confirmed: 'bg-accent/10 text-accent', Pending: 'bg-warning/10 text-warning', Cancelled: 'bg-error/10 text-error' };

export default function ReservationsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Calendar size={24} /> Table Reservations</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><div className="text-2xl font-heading font-bold">5</div><div className="text-xs text-gray-500">Today</div></div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><div className="text-2xl font-heading font-bold text-warning">2</div><div className="text-xs text-gray-500">Pending</div></div>
        <div className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft text-center"><div className="text-2xl font-heading font-bold text-accent">3</div><div className="text-xs text-gray-500">Confirmed</div></div>
      </div>

      <div className="space-y-3">
        {reservations.map((r, i) => (
          <motion.div key={r.id} className="flex items-center justify-between p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div>
              <div className="font-medium text-sm">{r.name}</div>
              <div className="text-xs text-gray-500 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><Calendar size={10} />{r.date}</span>
                <span className="flex items-center gap-1"><Clock size={10} />{r.time}</span>
                <span className="flex items-center gap-1"><Users size={10} />{r.guests} guests</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-pill ${statusStyle[r.status]}`}>{r.status}</span>
              {r.status === 'Pending' && (
                <>
                  <button className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent" aria-label="Confirm"><Check size={12} /></button>
                  <button className="w-7 h-7 rounded-full bg-error/10 flex items-center justify-center text-error" aria-label="Reject"><X size={12} /></button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
