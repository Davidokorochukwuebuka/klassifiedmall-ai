'use client';

import { motion } from 'framer-motion';
import { Video, Image, Upload, Wand2 } from 'lucide-react';

const media = [
  { id: '1', name: 'Product Showcase.mp4', type: 'video', size: '12.4 MB', date: 'May 28' },
  { id: '2', name: 'Banner_Summer.png', type: 'image', size: '2.1 MB', date: 'May 25' },
  { id: '3', name: 'Honey_Promo.mp4', type: 'video', size: '8.7 MB', date: 'May 20' },
  { id: '4', name: 'Logo_Transparent.png', type: 'image', size: '450 KB', date: 'May 18' },
];

export default function MediaStudioPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Video size={24} /> Media Studio</h1>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-1"><Upload size={14} /> Upload</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center">
          <Wand2 size={32} className="mx-auto text-primary mb-2" />
          <h3 className="font-heading font-semibold">AI Photo Editor</h3>
          <p className="text-xs text-gray-500 mt-1">Remove backgrounds, enhance, resize</p>
          <button className="btn-primary text-sm px-4 py-2 mt-3">Open Editor</button>
        </div>
        <div className="p-6 rounded-card bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 text-center">
          <Video size={32} className="mx-auto text-accent mb-2" />
          <h3 className="font-heading font-semibold">Video Creator</h3>
          <p className="text-xs text-gray-500 mt-1">Create product videos with templates</p>
          <button className="btn-primary text-sm px-4 py-2 mt-3">Create Video</button>
        </div>
      </div>

      <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5">
        <h2 className="font-heading font-semibold mb-4">Media Library</h2>
        <div className="space-y-2">
          {media.map((m, i) => (
            <motion.div key={m.id} className="flex items-center justify-between p-3 rounded-btn hover:bg-gray-50 dark:hover:bg-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-center gap-3">
                {m.type === 'video' ? <Video size={16} className="text-primary" /> : <Image size={16} className="text-accent" />}
                <div><div className="text-sm font-medium">{m.name}</div><div className="text-xs text-gray-500">{m.size} · {m.date}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

