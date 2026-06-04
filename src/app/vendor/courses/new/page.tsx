'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Plus } from 'lucide-react';
import Link from 'next/link';

export default function NewCoursePage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <Link href="/vendor/courses" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ArrowLeft size={14} /> Back to Courses</Link>
      <h1 className="text-2xl font-heading font-bold">Create Course</h1>

      <motion.form className="space-y-6" onSubmit={(e) => e.preventDefault()} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold">Course Details</h2>
          <input type="text" placeholder="Course title" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          <textarea rows={3} placeholder="Description" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary resize-none" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price (₦)" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <select className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
          </div>
        </div>

        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold">Thumbnail</h2>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <Upload size={24} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Upload course thumbnail</p>
          </div>
        </div>

        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold">Modules</h2>
            <button type="button" className="text-sm text-primary flex items-center gap-1"><Plus size={12} /> Add Module</button>
          </div>
          <div className="p-4 rounded-btn bg-gray-50 dark:bg-gray-800 text-sm text-gray-500 text-center">No modules yet. Add your first module to get started.</div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary">Publish Course</button>
          <button type="button" className="px-6 py-3 rounded-btn border border-gray-300 dark:border-gray-600 text-sm">Save Draft</button>
        </div>
      </motion.form>
    </div>
  );
}

