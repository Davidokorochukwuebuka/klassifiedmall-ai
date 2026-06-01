'use client';

import { motion } from 'framer-motion';
import { BookOpen, Plus, Users, Star } from 'lucide-react';
import Link from 'next/link';

const courses = [
  { id: '1', title: 'Digital Marketing 101', students: 200, rating: 4.8, status: 'Published', price: '₦15,000' },
  { id: '2', title: 'Business Finance Basics', students: 85, rating: 4.6, status: 'Published', price: '₦12,000' },
  { id: '3', title: 'Social Media Mastery', students: 0, rating: 0, status: 'Draft', price: '₦10,000' },
];

export default function CoursesPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><BookOpen size={24} /> My Courses</h1>
        <Link href="/vendor/courses/new" className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Plus size={14} /> New Course</Link>
      </div>

      <div className="space-y-3">
        {courses.map((c, i) => (
          <motion.div key={c.id} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft flex items-center justify-between" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div>
              <div className="font-heading font-semibold">{c.title}</div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1"><Users size={10} />{c.students} students</span>
                {c.rating > 0 && <span className="flex items-center gap-1"><Star size={10} className="text-warning" />{c.rating}</span>}
                <span>{c.price}</span>
              </div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-pill ${c.status === 'Published' ? 'bg-accent/10 text-accent' : 'bg-gray-200 text-gray-500'}`}>{c.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
