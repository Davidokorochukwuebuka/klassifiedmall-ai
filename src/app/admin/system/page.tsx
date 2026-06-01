'use client';

import { motion } from 'framer-motion';
import { Activity, CheckCircle, AlertTriangle, Server, Database, Wifi } from 'lucide-react';

const services = [
  { name: 'API Gateway', status: 'healthy', latency: '45ms', uptime: '99.99%', icon: Wifi },
  { name: 'DynamoDB', status: 'healthy', latency: '12ms', uptime: '99.99%', icon: Database },
  { name: 'Lambda Functions', status: 'healthy', latency: '120ms', uptime: '99.95%', icon: Server },
  { name: 'S3 Storage', status: 'healthy', latency: '30ms', uptime: '99.99%', icon: Server },
  { name: 'Cognito Auth', status: 'degraded', latency: '250ms', uptime: '99.90%', icon: Server },
];

const logs = [
  { time: '20:30:15', level: 'INFO', message: 'Deployment completed successfully' },
  { time: '20:28:42', level: 'WARN', message: 'Cognito latency spike detected (250ms)' },
  { time: '20:15:00', level: 'INFO', message: 'Scheduled backup completed' },
  { time: '19:45:22', level: 'ERROR', message: 'Lambda timeout on order-processor (retried)' },
];

export default function SystemPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Activity size={24} /> System Health</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <motion.div key={s.name} className="p-4 rounded-card bg-white dark:bg-card-dark shadow-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><s.icon size={16} className="text-gray-400" /><span className="font-medium text-sm">{s.name}</span></div>
              {s.status === 'healthy' ? <CheckCircle size={16} className="text-accent" /> : <AlertTriangle size={16} className="text-warning" />}
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>Latency: {s.latency}</span>
              <span>Uptime: {s.uptime}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="font-heading font-semibold mb-4">Recent Logs</h2>
        <div className="space-y-2 font-mono text-xs">
          {logs.map((l, i) => (
            <div key={i} className="flex gap-3 p-2 rounded bg-gray-50 dark:bg-gray-800">
              <span className="text-gray-400">{l.time}</span>
              <span className={`font-bold ${l.level === 'ERROR' ? 'text-error' : l.level === 'WARN' ? 'text-warning' : 'text-accent'}`}>{l.level}</span>
              <span className="text-gray-600 dark:text-gray-400">{l.message}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
