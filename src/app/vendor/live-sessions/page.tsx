'use client';

import { motion } from 'framer-motion';
import { Video, Plus, Calendar, Users, Clock } from 'lucide-react';

const sessions = [
  { id: '1', title: 'Q&A: Marketing Strategies', date: 'Jun 1', time: '3:00 PM', attendees: 45, status: 'Upcoming' },
  { id: '2', title: 'Live Workshop: SEO Basics', date: 'Jun 5', time: '10:00 AM', attendees: 30, status: 'Upcoming' },
  { id: '3', title: 'Office Hours', date: 'May 28', time: '2:00 PM', attendees: 22, status: 'Completed' },
];

export default function LiveSessionsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Video size={24} /> Live Sessions</h1>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> Schedule</button>
      </div>

      <div className="space-y-3">
        {sessions.map((s, i) => (
          <motion.div key={s.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div>
              <div className="font-heading font-semibold">{s.title}</div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1"><Calendar size={10} />{s.date}</span>
                <span className="flex items-center gap-1"><Clock size={10} />{s.time}</span>
                <span className="flex items-center gap-1"><Users size={10} />{s.attendees} registered</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-pill ${s.status === 'Upcoming' ? 'bg-secondary/10 text-secondary' : 'bg-gray-200 text-gray-500'}`}>{s.status}</span>
              {s.status === 'Upcoming' && <button className="text-xs px-3 py-1.5 rounded-btn bg-primary text-white">Start</button>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

