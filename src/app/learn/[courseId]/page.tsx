'use client';

import { motion } from 'framer-motion';
import { Star, Users, Clock, Play, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const modules = [
  { title: 'Introduction to Digital Marketing', duration: '45 min', lessons: 4 },
  { title: 'Social Media Strategy', duration: '1h 15min', lessons: 6 },
  { title: 'Content Marketing', duration: '1h', lessons: 5 },
  { title: 'Email Marketing', duration: '50 min', lessons: 4 },
  { title: 'Analytics & Measurement', duration: '1h 30min', lessons: 7 },
];

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/learn" className="inline-flex items-center gap-1 text-sm text-secondary hover:underline"><ArrowLeft size={14} /> Back to Courses</Link>

        <motion.div className="grid md:grid-cols-3 gap-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-2xl font-heading font-bold">Digital Marketing 101</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Master the fundamentals of digital marketing. Learn SEO, social media, content marketing, and analytics from scratch.</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Star size={12} className="text-secondary fill-secondary" />4.8 (128 reviews)</span>
              <span className="flex items-center gap-1"><Users size={12} />200 students</span>
              <span className="flex items-center gap-1"><Clock size={12} />6 hours</span>
            </div>
            <p className="text-sm">Instructor: <strong>Grace I.</strong></p>
          </div>
          <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5 text-center">
            <div className="text-3xl font-heading font-bold text-secondary mb-2">₦15,000</div>
            <button className="btn-primary w-full mb-2">Enroll Now</button>
            <p className="text-xs text-gray-500">30-day money-back guarantee</p>
          </div>
        </motion.div>

        <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-heading font-semibold mb-4">Course Content</h2>
          <div className="space-y-3">
            {modules.map((m, i) => (
              <div key={m.title} className="flex items-center justify-between p-3 rounded-btn bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3"><Play size={14} className="text-secondary" /><div><div className="text-sm font-medium">{m.title}</div><div className="text-xs text-gray-500">{m.lessons} lessons · {m.duration}</div></div></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
