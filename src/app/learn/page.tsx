'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Star, Users, Clock } from 'lucide-react';
import Link from 'next/link';

const courses = [
  { id: '1', title: 'Digital Marketing 101', instructor: 'Grace I.', price: '₦15,000', rating: 4.8, students: 200, duration: '6 hours', image: '📱' },
  { id: '2', title: 'Business Finance Basics', instructor: 'Chidi O.', price: '₦12,000', rating: 4.6, students: 85, duration: '4 hours', image: '💰' },
  { id: '3', title: 'Social Media Mastery', instructor: 'Adaeze N.', price: '₦10,000', rating: 4.7, students: 150, duration: '5 hours', image: '📸' },
  { id: '4', title: 'E-commerce Fundamentals', instructor: 'Emeka A.', price: '₦18,000', rating: 4.9, students: 320, duration: '8 hours', image: '🛒' },
  { id: '5', title: 'Photography for Products', instructor: 'Fatima B.', price: '₦8,000', rating: 4.5, students: 60, duration: '3 hours', image: '📷' },
  { id: '6', title: 'Leadership & Management', instructor: 'Grace I.', price: '₦20,000', rating: 4.8, students: 95, duration: '7 hours', image: '👔' },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-heading font-bold flex items-center justify-center gap-2"><GraduationCap size={28} className="text-secondary" /> Learn & Grow</h1>
          <p className="text-gray-500 mt-2">Courses taught by top entrepreneurs and experts.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div key={c.id} className="rounded-card bg-white dark:bg-card-dark shadow-soft overflow-hidden hover:shadow-glow transition-all" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={`/learn/${c.id}`}>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl">{c.image}</div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold mb-1">{c.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">by {c.instructor}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-0.5"><Star size={10} className="text-secondary fill-secondary" />{c.rating}</span>
                    <span className="flex items-center gap-0.5"><Users size={10} />{c.students}</span>
                    <span className="flex items-center gap-0.5"><Clock size={10} />{c.duration}</span>
                  </div>
                  <div className="font-heading font-bold text-secondary">{c.price}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
