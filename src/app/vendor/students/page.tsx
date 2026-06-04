'use client';

import { motion } from 'framer-motion';
import { Users, Search } from 'lucide-react';

const students = [
  { name: 'Adaeze N.', email: 'adaeze@email.com', course: 'Digital Marketing 101', progress: 85, enrolled: 'May 10' },
  { name: 'Chidi O.', email: 'chidi@email.com', course: 'Digital Marketing 101', progress: 60, enrolled: 'May 12' },
  { name: 'Fatima B.', email: 'fatima@email.com', course: 'Business Finance', progress: 100, enrolled: 'Apr 28' },
  { name: 'Emeka A.', email: 'emeka@email.com', course: 'Digital Marketing 101', progress: 30, enrolled: 'May 20' },
];

export default function StudentsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Users size={24} /> Students</h1>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search students..." className="w-full pl-10 pr-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
      </div>

      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800"><th className="p-4">Student</th><th className="p-4">Course</th><th className="p-4">Progress</th><th className="p-4">Enrolled</th></tr></thead>
          <tbody>
            {students.map((s, i) => (
              <motion.tr key={s.email} className="border-b dark:border-gray-800 last:border-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td className="p-4"><div className="font-medium">{s.name}</div><div className="text-xs text-gray-500">{s.email}</div></td>
                <td className="p-4">{s.course}</td>
                <td className="p-4"><div className="flex items-center gap-2"><div className="w-20 h-2 rounded-full bg-gray-200 dark:bg-gray-700"><div className="h-full rounded-full bg-primary" style={{ width: `${s.progress}%` }} /></div><span className="text-xs">{s.progress}%</span></div></td>
                <td className="p-4 text-gray-500">{s.enrolled}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

