'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';

const lessons = [
  { title: 'What is Digital Marketing?', duration: '12:30', completed: true },
  { title: 'The Marketing Funnel', duration: '15:00', completed: true },
  { title: 'Setting Goals & KPIs', duration: '10:45', completed: false },
  { title: 'Your First Campaign', duration: '18:20', completed: false },
];

export default function CoursePlayerPage() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-surface-dark flex flex-col lg:flex-row">
      {/* Video area */}
      <div className="flex-1 flex flex-col">
        <div className="aspect-video bg-black flex items-center justify-center relative">
          <button onClick={() => setPlaying(!playing)} className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30" aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700"><div className="h-full bg-secondary w-1/3" /></div>
        </div>
        <div className="p-4 bg-card-dark">
          <h1 className="font-heading font-semibold text-white">Setting Goals & KPIs</h1>
          <p className="text-sm text-gray-400 mt-1">Module 1 · Lesson 3 of 4</p>
        </div>
      </div>

      {/* Sidebar playlist */}
      <div className="w-full lg:w-80 bg-card-dark border-l border-gray-800 overflow-y-auto">
        <div className="p-4 border-b border-gray-800"><h2 className="font-heading font-semibold text-white text-sm">Course Content</h2></div>
        <div className="space-y-0.5">
          {lessons.map((l, i) => (
            <motion.button key={l.title} className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-800 ${i === 2 ? 'bg-secondary/10 border-l-2 border-secondary' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              {l.completed ? <CheckCircle size={16} className="text-accent shrink-0" /> : <Circle size={16} className="text-gray-500 shrink-0" />}
              <div className="flex-1 min-w-0"><div className="text-sm text-white truncate">{l.title}</div><div className="text-xs text-gray-500">{l.duration}</div></div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
