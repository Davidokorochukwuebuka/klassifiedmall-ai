'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react';

type Status = 'connected' | 'configure' | 'disconnected';

interface Service { name: string; status: Status; details: string; actions: string[] }

const initialServices: Service[] = [
  { name: 'Authentication (Cognito)', status: 'connected', details: 'User Pool ID: us-east-1_xxxxx', actions: ['Test Connection', 'Update Config'] },
  { name: 'Database (DynamoDB)', status: 'connected', details: 'Tables: 14 active', actions: ['View Tables', 'Create Table'] },
  { name: 'Storage (S3)', status: 'connected', details: 'Buckets: 4 active', actions: ['View Buckets', 'Upload Test'] },
  { name: 'API Gateway', status: 'connected', details: 'REST: https://xxx.execute-api.region.com\nWebSocket: wss://xxx.execute-api.region.com', actions: ['Test Endpoints'] },
  { name: 'AI Services (Bedrock)', status: 'configure', details: 'Model: Claude 3.5 Sonnet', actions: ['Enable', 'Test Prompt'] },
  { name: 'Voice (Polly + Transcribe)', status: 'configure', details: '', actions: ['Enable Polly', 'Enable Transcribe'] },
  { name: 'Payments (Paystack)', status: 'configure', details: 'API Key: ****_test_xxxxx', actions: ['Add Live Key', 'Test Webhook'] },
  { name: 'Payments (Flutterwave)', status: 'disconnected', details: '', actions: ['Add API Key', 'Setup Webhooks'] },
  { name: 'Cards (Sudo Africa)', status: 'disconnected', details: '', actions: ['Add API Key', 'Configure'] },
  { name: 'Phone Numbers (Twilio)', status: 'disconnected', details: '', actions: ['Add Account SID', 'Configure'] },
  { name: 'Email (SES)', status: 'connected', details: 'Verified domains: 1', actions: ['Add Domain', 'Send Test'] },
  { name: 'CDN (CloudFront)', status: 'connected', details: 'Distribution: E1XXXXX', actions: ['Invalidate Cache', 'View Metrics'] },
  { name: 'Video (MediaConvert + IVS)', status: 'configure', details: '', actions: ['Enable MediaConvert', 'Setup IVS'] },
  { name: 'Maps (Google Maps)', status: 'disconnected', details: '', actions: ['Add API Key'] },
];

const statusIcon = { connected: CheckCircle, configure: AlertCircle, disconnected: XCircle };
const statusColor = { connected: 'text-accent', configure: 'text-warning', disconnected: 'text-gray-400' };
const statusLabel = { connected: 'Connected', configure: 'Configure', disconnected: 'Not Connected' };
const statusBg = { connected: 'bg-accent/10', configure: 'bg-warning/10', disconnected: 'bg-gray-100 dark:bg-gray-800' };

export default function AWSConfigPage() {
  const [services] = useState(initialServices);
  const [testing, setTesting] = useState<string | null>(null);

  const handleTest = (name: string) => {
    setTesting(name);
    setTimeout(() => setTesting(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Cloud size={24} /> AWS Service Connections</h1>
        <button className="text-sm text-primary flex items-center gap-1 hover:underline"><RefreshCw size={14} /> Refresh All</button>
      </div>

      <div className="grid gap-4">
        {services.map((svc, i) => {
          const Icon = statusIcon[svc.status];
          return (
            <motion.div key={svc.name} className={`p-5 rounded-card bg-white dark:bg-card-dark shadow-soft border-l-4 ${svc.status === 'connected' ? 'border-accent' : svc.status === 'configure' ? 'border-warning' : 'border-gray-300'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${statusBg[svc.status]}`}>
                    <Icon size={16} className={statusColor[svc.status]} />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm">{svc.name}</div>
                    {svc.details && <div className="text-xs text-gray-500 mt-0.5 whitespace-pre-line">{svc.details}</div>}
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-pill ${statusBg[svc.status]} ${statusColor[svc.status]}`}>{statusLabel[svc.status]}</span>
              </div>
              <div className="flex gap-2 mt-3 ml-12">
                {svc.actions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleTest(svc.name)}
                    className={`text-xs px-3 py-1.5 rounded-btn border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary transition-colors ${testing === svc.name ? 'opacity-50' : ''}`}
                  >
                    {testing === svc.name ? 'Testing...' : action}
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

