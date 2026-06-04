'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const steps = [
  { title: 'Business Info', fields: ['Business name', 'Category', 'Location'] },
  { title: 'Profile Setup', fields: ['Bio / Description', 'Profile photo URL', 'Website (optional)'] },
  { title: 'Preferences', fields: ['Currency', 'Language', 'Notification preferences'] },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.title} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${i <= current ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 ${i < current ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <h1 className="text-xl font-heading font-bold mb-1">{steps[current].title}</h1>
          <p className="text-gray-500 text-sm mb-6">Step {current + 1} of {steps.length}</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {steps[current].fields.map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary"
              />
            ))}
          </form>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
          className="btn-primary flex items-center gap-1 text-sm px-5 py-2"
        >
          {current === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

